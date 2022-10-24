const title = document.getElementById('title');
const author = document.getElementById('author');
const read = document.getElementById('read');
const newBook = document.getElementById('newBook');
const submitBook = document.getElementById('submitBook');
const bookShelf = document.getElementById('bookShelf');
const newBookModal = document.querySelector('.new-book-modal');

const myLibrary = [];

class Book {
  constructor(title = String, author = String, read = Boolean, id = String) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = id;
  }
}

function buildBook(book) {
  const bookNode = document.createElement('div');
  bookNode.classList.add('book');
  bookNode.id = book.id;
  const titleNode = createSpan(['title']);
  const authorNode = createSpan(['author']);
  const readNode = createSpan(['read']);
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Delete';

  titleNode.textContent = book.title;
  authorNode.textContent = book.author;
  readNode.textContent = book.read ? 'Have read' : "Haven't read";

  bookNode.append(titleNode, authorNode, readNode, removeBtn);

  return bookNode;
}

function addBookToLibrary(title, author, read) {
  let bookId = `b${myLibrary.length}`;
  let book = new Book(title, author, read, bookId);
  myLibrary.push(book);
  console.log(myLibrary);
  let bookNode = buildBook(book);
  bookShelf.appendChild(bookNode);
}

function createSpan(classList) {
  let span = document.createElement('span');
  span.classList.add(...classList);
  return span;
}

newBook.addEventListener('click', () => {
  if (newBookModal.classList.contains('hide')) {
    newBookModal.classList.remove('hide');
  }
});

submitBook.addEventListener('click', (e) => {
  if (title.value && author.value) {
    addBookToLibrary(title.value, author.value, read.checked);
    e.target.parentElement.reset();
    newBookModal.classList.add('hide');
  }
});

// Add a button on each book’s display to remove the book from the library.
