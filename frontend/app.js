import './styles/app.css';
//import BookService from './services/BookService';
import UI from './UI';

document.addEventListener("DOMContentLoaded", e => {
  const ui = new UI();
  ui.renderBooks();
})

document.getElementById('book-form')
  .addEventListener('submit', e => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('image', image[0]);
    
    const ui = new UI();
    ui.addANewBooks(formData);
    ui.renderMessage("New Book Added", "success", 3000);
    e.preventDefault();
  });

document.getElementById('books-cards')
  .addEventListener('click', e => {
    const ui = new UI();
    if(e.target.classList.contains('delete')) {
      ui.deleteBook(e.target.getAttribute('_id'));
      ui.renderMessage("Book removed", "danger", 3000)
    }
    e.preventDefault();
  })