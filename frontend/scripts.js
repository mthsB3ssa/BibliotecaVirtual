document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/books')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('book-list');
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.title} by ${book.author} (Genre: ${book.genre})`;
                li.dataset.id = book.id;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    fetch(`/api/books/${book.id}`, {
                        method: 'DELETE'
                    }).then(() => {
                        li.remove();
                    });
                });

                li.appendChild(deleteButton);
                bookList.appendChild(li);
            });
        });

    const form = document.getElementById('book-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const genre = document.getElementById('genre').value;

        fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, genre })
        }).then(response => response.json())
        .then(book => {
            const bookList = document.getElementById('book-list');
            const li = document.createElement('li');
            li.textContent = `${book.title} by ${book.author} (Genre: ${book.genre})`;
            li.dataset.id = book.id;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                fetch(`/api/books/${book.id}`, {
                    method: 'DELETE'
                }).then(() => {
                    li.remove();
                });
            });

            li.appendChild(deleteButton);
            bookList.appendChild(li);

            form.reset();
        });
    });
});
