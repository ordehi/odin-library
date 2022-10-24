const title = document.getElementById('title');
const author = document.getElementById('author');
const read = document.getElementById('read');
const newBook = document.getElementById('newBook');
const submitBook = document.getElementById('submitBook');
const bookShelf = document.getElementById('bookShelf');
const newBookModal = document.querySelector('.new-book-modal');

const myLibrary = [];
let lastId = 0;

class Book {
  constructor(title = String, author = String, read = Boolean, id = Number) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = id;
  }
}

function buildBook(book) {
  const bookNode = document.createElement('div');
  bookNode.classList.add('book');
  bookNode.id = `b${book.id}`;
  const titleNode = createSpan(['title']);
  const authorNode = createSpan(['author']);
  const readNode = createSpan(['read']);
  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Delete';
  removeBtn.addEventListener('click', (e) => {
    // let id = e.target.parentElement.id.substring(1) * 1;
    removeBookFromLibrary(book.id);
  });

  titleNode.textContent = book.title;
  authorNode.textContent = book.author;
  readNode.textContent = book.read ? 'Have read' : "Haven't read";

  bookNode.append(titleNode, authorNode, readNode, removeBtn);

  return bookNode;
}

function renderLibrary(booksNode, library) {
  if (booksNode.childElementCount < library.length) {
    library.map((book) => {
      if (booksNode.querySelector(`#b${book.id}`) === null) {
        let bookToInsert = buildBook(book);
        booksNode.insertBefore(
          bookToInsert,
          booksNode.querySelector('#b' + book.id + 1)
        );
      }
    });
  } else if (booksNode.childElementCount > library.length) {
    [...booksNode.childNodes].map((book) => {
      let bookId = book.id.substring(1) * 1;
      let idx = library.findIndex((bookEl) => bookEl.id === bookId);
      if (idx < 0) {
        book.remove();
      }
    });
  }
}

function addBookToLibrary(title, author, read) {
  let bookId = lastId++;
  let book = new Book(title, author, read, bookId);
  myLibrary.push(book);
  renderLibrary(bookShelf, myLibrary);
}

function removeBookFromLibrary(bookId) {
  let idx = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(idx, 1);
  renderLibrary(bookShelf, myLibrary);
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
