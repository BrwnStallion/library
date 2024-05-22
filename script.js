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
    init: function(title, author, pages, genre, type, yearPublished, read,
      yearRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
        this.type = type;
        this.yearPublished = yearPublished;
        this.read = read;
        this.yearRead = yearRead;
        return this; // allows to chain .create with .init
  },
}

// Add info method to book master
bookMaster.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages,` +
    ` ${this.read}.`;
};


function addBookToLibrary(title, author, pages, genre, type, yearPublished,
  read, yearRead) {
    const book = Object.create(bookMaster).init(
      title, author, pages, genre, type, yearPublished, read, yearRead);

    myLibrary.push(book);
}

function getEachBook(library) {
    
    let cardContainer = document.querySelector('.card-container');

    // Loop through each book
    library.forEach((item)=> {
        
        // Create card element
        let card = makeElement('div','book-card');
        // Create card sub-divs
        let info = makeElement('div', 'info');
        let buttons = makeElement('div', 'buttons');

        // Loop through each property on current book
        for (let prop in item) {
            
            // Property is on the book (and not prototype)
            let isOwn = item.hasOwnProperty(prop);
            
            // Property wasn't left blank
            let isBlank;
            (item[prop] === '')
                ? isBlank = true
                : isBlank = false;

            // Only display these properties
            if (isOwn && !isBlank) {
                let element;

                // Add content to the card
                if (prop === 'title') {

                    element = makeElement('h2', 'title');
                    element.textContent = item[prop];
                    card.appendChild(element);

                } else {
                    
                    element = makeElement('p');
                    element.textContent = item[prop];
                    info.appendChild(element);
                }
                
            };
        };

        // Append info to the card
        card.appendChild(info);

        // Create and append buttons to the button div
        addElement(buttons, 'button', 'read', 'Mark Read');
        addElement(buttons, 'button', 'remove', 'Remove')

        // Append buttons div to the card
        card.appendChild(buttons);

        // Append card to the card-container
        cardContainer.appendChild(card);

    });
}

// Creates and appends an element with content to a parent
function addElement(parent, tag, eleClass, content) {
    let element = makeElement(tag, eleClass)
    element.textContent = content;
    parent.appendChild(element);
}

// Creates an element
function makeElement(tag, eleClass) {
    const element = document.createElement(tag);
    element.classList.toggle(eleClass);
    return element;
}
