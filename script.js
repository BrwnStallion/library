// ----------------------- Library App JavaScript ------------------------------

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Pseudocode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* 
- Write constructor for 'Book' objects. Should have title, author, number of
  pages, and whether or not it's been read by the user
- All of the book objects are going to be stored in a library (library aray)
- User should be able to add books to the library. They won't be adding a book
  unless they also want to add it to the library
- Write a function that takes the users input and stores it in a new book, and
  puts that new book into the library
    - This function should use the constructor
- All of the books should be displayed in a table on the HTML
    - Use a function that loops through the library array and displays each book
        - Can be in a table, or on cards, or something like that
    - Creates DOM elements and places them in the correct container
    - This function should run when the page loads, I think. The server should
      already have the user's books saved, and they should be displayed
    - The display will update when a user enters a new book to the library
*/


"use strict";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Execution ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Testing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const myLibrary = [];

const bookMaster = {
    // init method for adding properties to books
    init: function(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        return this; // allows to chain .create with .init
  },
}

// Add info method to book master
bookMaster.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages,` +
    ` ${this.read}.`;
};


function addBookToLibrary(title, author, pages, read) {
    const book = Object.create(bookMaster).init(
            title, author, pages, read);

    myLibrary.push(book);
}