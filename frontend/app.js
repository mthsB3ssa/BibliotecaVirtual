document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    addBook({ title, author, genre });
});

async function fetchBooks() {
    const response = await fetch('/api/books');
    const books = await response.json();
    const booksList = document.getElementById('booksList');
    booksList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (${book.genre}) `;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteBook(book.id);
        li.appendChild(deleteButton);
        booksList.appendChild(li);
    });
}

async function addBook(book) {
    await fetch('/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    fetchBooks(); // Refresh the list after adding
}

async function deleteBook(id) {
    await fetch(`/api/books/${id}`, {
        method: 'DELETE'
    });
    fetchBooks(); // Refresh the list after deleting
}

fetchBooks(); // Initial fetch of books
