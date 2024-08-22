import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ id: '', title: '', author: '', genre: '' });

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  const addBook = () => {
    axios.post('http://localhost:8000/books', newBook)
      .then(response => {
        setBooks([...books, newBook]);
        setNewBook({ id: '', title: '', author: '', genre: '' });
      })
      .catch(error => {
        console.error('There was an error adding the book!', error);
      });
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:8000/books/${id}`)
      .then(response => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the book!', error);
      });
  };

  return (
    <div>
      <h1>Library</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} - {book.genre}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add a new book</h2>
      <input type="text" placeholder="ID" value={newBook.id} onChange={e => setNewBook({ ...newBook, id: e.target.value })} />
      <input type="text" placeholder="Title" value={newBook.title} onChange={e => setNewBook({ ...newBook, title: e.target.value })} />
      <input type="text" placeholder="Author" value={newBook.author} onChange={e => setNewBook({ ...newBook, author: e.target.value })} />
      <input type="text" placeholder="Genre" value={newBook.genre} onChange={e => setNewBook({ ...newBook, genre: e.target.value })} />
      <button onClick={addBook}>Add Book</button>
    </div>
  );
}

export default App;
