const title = document.getElementById('title');
const author = document.getElementById('author');
const read = document.getElementById('read');
const addbookBtn = document.getElementById('addbook');

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
}

addbookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (title.value && author.value) {
    addBookToLibrary(title.value, author.value, read.checked);
  }
});
