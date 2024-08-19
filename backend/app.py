import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos os domínios em desenvolvimento
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Book(BaseModel):
    id: int
    title: str
    author: str
    genre: str

def load_books():
    with open('books.json', 'r') as file:
        return json.load(file)

def save_books(books):
    with open('books.json', 'w') as file:
        json.dump(books, file, indent=4)

@app.get("/", response_model=List[Book])
async def get_books():
    return load_books()

@app.post('/books', status_code=201)
async def add_book(book: Book):
    books = load_books()
    books.append(book.dict())
    save_books(books)
    return {'message': 'Book added successfully'}

@app.delete('/books/{book_id}', status_code=204)
async def delete_book(book_id: int):
    books = load_books()
    books = [book for book in books if book['id'] != book_id]
    save_books(books)
    return {'message': 'Book deleted successfully'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
