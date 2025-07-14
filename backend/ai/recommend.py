import mysql.connector
import pandas as pd
import json
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from decimal import Decimal

# Connect to MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root123",
    database="movies"
)

cursor = conn.cursor(dictionary=True)
cursor.execute("SELECT * FROM movielist")
rows = cursor.fetchall()
df = pd.DataFrame(rows)

if df.empty:
    print(json.dumps({"error": "No data"}))
    sys.exit()

# Clean column names
df.columns = df.columns.str.strip()

# Combine relevant features into one string per row
columns_to_combine = ['genre', 'rating', 'description', 'producer']
df['combined'] = df[columns_to_combine].fillna('').astype(str).agg(' '.join, axis=1)

# Vectorize the combined data
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['combined'])

# Compute cosine similarity matrix
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# Build title-to-index map
title_to_index = pd.Series(df.index, index=df['title'].str.lower())

# Serialize for JSON output
def serialize_row(row):
    return {
        key: float(value) if isinstance(value, Decimal) else value
        for key, value in row.items()
        if key not in ['id', 'created_at']
    }

# Recommendation function
def recommend(title):
    title = title.lower().strip()

    if title not in title_to_index:
        print(json.dumps({"error": "Movie not found in the database."}))
        return

    idx = title_to_index[title]
    target_genre = str(df.loc[idx, 'genre']).lower().strip()

    sim_scores = list(enumerate(cosine_sim[idx]))

    filtered = []
    for i, score in sim_scores:
        if i == idx or score == 0:
            continue
        movie_genre = str(df.loc[i, 'genre']).lower().strip()
        genre_match = 1 if movie_genre == target_genre else 0
        total_score = score + genre_match * 0.8
        filtered.append((i, total_score))

    # Sort and select top 10
    top_matches = sorted(filtered, key=lambda x: x[1], reverse=True)[:10]

    result = []
    for i, s in top_matches:
        result.append(serialize_row(df.iloc[i]))

    print(json.dumps({"recommended": result}, indent=2))


# CLI entry point
if __name__ == "__main__":
    if len(sys.argv) > 1:
        recommend(sys.argv[1])
    else:
        print(json.dumps({"error": "No title given"}))
