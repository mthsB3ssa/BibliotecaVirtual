import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/books', newBook);
      setNewBook({ title: '', author: '', genre: '' });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      <h1>Biblioteca Virtual</h1>
      <form onSubmit={addBook}>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
          placeholder="Título"
          required
        />
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
          placeholder="Autor"
          required
        />
        <input
          type="text"
          name="genre"
          value={newBook.genre}
          onChange={handleInputChange}
          placeholder="Gênero"
          required
        />
        <button type="submit">Adicionar Livro</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} por {book.author} ({book.genre})
            <button onClick={() => deleteBook(book.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;