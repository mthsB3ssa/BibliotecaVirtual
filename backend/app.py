from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos os domínios em desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    title: str
    author: str
    genre: str

def get_db_connection():
    conn = sqlite3.connect('database/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.get("/")
async def root():
    return {"message": "Welcome to the Virtual Library"}

@app.get('/api/books')
async def get_books():
    conn = get_db_connection()
    books = conn.execute('SELECT * FROM books').fetchall()
    conn.close()
    return [dict(book) for book in books]

@app.post('/api/books', status_code=201)
async def add_book(book: Book):
    conn = get_db_connection()
    conn.execute('INSERT INTO books (title, author, genre) VALUES (?, ?, ?)',
                 (book.title, book.author, book.genre))
    conn.commit()
    conn.close()
    return {'message': 'Book added successfully'}

@app.delete('/api/books/{id}', status_code=204)
async def delete_book(id: int):
    conn = get_db_connection()
    conn.execute('DELETE FROM books WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return {'message': 'Book deleted successfully'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5000)
