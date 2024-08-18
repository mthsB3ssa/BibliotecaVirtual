-- Cria a tabela 'books' se ela não existir
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL
);

-- Insere alguns dados iniciais na tabela 'books' para testes
INSERT INTO books (title, author, genre) VALUES ('1984', 'George Orwell', 'Fiction');
INSERT INTO books (title, author, genre) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic');
INSERT INTO books (title, author, genre) VALUES ('To Kill a Mockingbird', 'Harper Lee', 'Historical Fiction');
