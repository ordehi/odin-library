const title = document.getElementById('title');
const author = document.getElementById('author');
const read = document.getElementById('read');
const newBook = document.getElementById('newBook');
const submitBook = document.getElementById('submitBook');
const bookShelf = document.getElementById('bookShelf');
const newBookModal = document.querySelector('.new-book-modal');

const myLibrary = [];

class Book {
  constructor(title = String, author = String, read = Boolean) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

function addBookToLibrary(title, author, read) {
  let book = new Book(title, author, read);
  myLibrary.push(book);
  console.log(myLibrary);
  let bookNode = buildBook(title, author, read);
  bookShelf.appendChild(bookNode);
}

function createSpan(classList) {
  let span = document.createElement('span');
  span.classList.add(...classList);
  return span;
}

function buildBook(title, author, read) {
  const book = document.createElement('div');
  book.classList.add('book');
  const titleNode = createSpan(['title']);
  const authorNode = createSpan(['author']);
  const readNode = createSpan(['read']);

  titleNode.textContent = title;
  authorNode.textContent = author;
  readNode.textContent = read ? 'Have read' : "Haven't read";

  book.append(titleNode, authorNode, readNode);

  return book;
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
