import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BookBase(BaseModel):
    title: str
    author: str
    genre: str

class Book(BookBase):
    id: int

class BookCreate(BookBase):
    pass

DATABASE_NAME = "library.db"

def get_db():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            genre TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.on_event("startup")
async def startup_event():
    init_db()

@app.get("/books", response_model=List[Book])
async def get_books():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM books")
    books = [dict(row) for row in cursor.fetchall()]
    db.close()
    return books

@app.post('/books', response_model=Book, status_code=201)
async def add_book(book: BookCreate):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO books (title, author, genre) VALUES (?, ?, ?)",
                   (book.title, book.author, book.genre))
    book_id = cursor.lastrowid
    db.commit()
    db.close()
    return {**book.dict(), "id": book_id}

@app.delete('/books/{book_id}', status_code=204)
async def delete_book(book_id: int):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM books WHERE id = ?", (book_id,))
    db.commit()
    db.close()
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="Book not found")
    return {'message': 'Book deleted successfully'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)