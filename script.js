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

function addBookToLibrary(title, author, pages, yearPublished, genre, type,
    status, yearRead) {
    const book = Object.create(bookMaster).init(
      title, author, pages, yearPublished, genre, type, status, yearRead);

    myLibrary.push(book);
}

// Print library contents to card elements; all books, or last book
    // Situation: 'all' (DOM load) or 'last' (form submit)
function printLibraryToCards(library, situation) {
    
    switch (situation) {
        case 'all':

            // Loop through each book
            library.forEach((item) => {
                
                // Create card element
                printBookToCard(item);
            });
        break;
        case 'last':

            // Create card element for last object in the library
            printBookToCard(library[library.length - 1]);
        break;
    };

    // Renumber all book cards to match myLibrary index
    renumberCardAttrib();
}

// Takes an inputted book object and prints its contents to a card element
function printBookToCard(bookObject) {

    let cardContainer = document.querySelector('.card-container');

    // Create card element
    let card = makeElement('div','book-card');
    // Create card sub-divs
    let info = makeElement('div', 'info');
    let buttons = makeElement('div', 'buttons');
    
    // Loop through each property on current book
    for (let prop in bookObject) {
        
        // Property is on the book (and not prototype)
        let isOwn = bookObject.hasOwnProperty(prop);
        
        // Property wasn't left blank
        let isBlank;
        (bookObject[prop] === '')
            ? isBlank = true
            : isBlank = false;
    
        // Only display these properties
        if (isOwn && !isBlank) {
            let element;
    
            // Add content to the card
            if (prop === 'title') {
    
                element = makeElement('h2', 'title');
                element.textContent = bookObject[prop];
                card.appendChild(element);
    
            } else {
                
                element = makeElement('p', '');

                // Span will go inside the <p>
                let key = makeElement('span', '');

                // Span has the book object keys
                key.textContent = `${convertProperty(prop)}: `
                element.appendChild(key);

                // Book object values go after the span
                key.after(`${convertRadioValue(bookObject[prop])}`);
                info.appendChild(element);
            };
        };
    };
    
    // Append info to the card
    card.appendChild(info);
    
    // Create and append buttons to the button div
    addElement(buttons, 'button', `read`, 'Mark Read');
    addElement(buttons, 'button', `remove`, 'Remove')
    
    // Append buttons div to the card
    card.appendChild(buttons);
    
    // Append card to the card-container
    cardContainer.appendChild(card);
}

// Renumbers all book card elements to match myLibrary index
function renumberCardAttrib() {

    // Create nodeList of book cards
    const bookCardList = document.querySelectorAll('.book-card');

    // Iterate through book card nodeList (starting at i = 0)
    for (let i = 0; i < bookCardList.length; i++) {
        
        // Set data-attribute corresponding to iteration index
            // attribute should match myLibrary index
            // 'data-card-index = X' where 'X' is index
        bookCardList[i].dataset.cardIndex = i;
    };

}

// Converts book property name to pretty format for the card element
function convertProperty(prop) {
    switch (prop) {
        case 'author': return 'Author';
        case 'pages': return 'Pages';
        case 'yearPublished': return 'Year Published';
        case 'genre': return 'Genre';
        case 'type': return 'Type';
        case 'status': return 'Status';
    };
}

// Converts radio value to pretty format for the card element
function convertRadioValue(value) {
    switch (value) {
        case 'read': return 'Read';
        case 'not-read': return 'Not read';
        case 'in-progress': return 'In progress';
        default:
            return value;
    };
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

    // Avoids 'undefined' class if 'eleClass' left blank
    if (eleClass !== '') {
        element.classList.toggle(eleClass);
    }
    return element;
}

// Append library size to title
function appendTitle() {
    let title = document.querySelector('h1.title');
    title.textContent = `Your Library (${myLibrary.length})`;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Execution ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const myLibrary = [];

const bookMaster = {
    // init method for adding properties to books
    init: function(title, author, pages, yearPublished, genre, type, status,
      yearRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.yearPublished = yearPublished;
        this.genre = genre;
        this.type = type;
        this.status = status;
        this.yearRead = yearRead;
        return this; // allows to chain .create with .init
  },
};

// Add info method to book master
bookMaster.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages,` +
    ` ${this.status}.`;
};

// Start the library off with some books so that the page isn't blank on load
addBookToLibrary('Bleak House', 'Charles Dickens', 894, 1852,
    'Novel', 'Fiction', 'Read', '');

addBookToLibrary('The Idiot', 'Fyodor Dostoyevsky', 658, 1868, 'Novel',
    'Fiction', 'Read', '');

addBookToLibrary('Labyrinths', 'Jorge Luis Borges', 260, 1962, 'Short Stories',
    'Fiction', 'Read', '');

// DOMContentLoaded Listener; for loading existing cards, adding library count
document.addEventListener('DOMContentLoaded', () => {
    
    printLibraryToCards(myLibrary, 'all');

    // Show the library size count
    appendTitle();
});

// Listener to open the form dialog box
const addBtn = document.querySelector('#add-book');
const formDialog = document.querySelector('.form-overlay');
addBtn.addEventListener('click', () => {
    formDialog.showModal();
});

// Form submit button listener; for updating cards, updating library count
const btnSubmit = document.querySelector('.form-overlay #submit');
btnSubmit.addEventListener('click', (e) => {
    
    // Stop form from submitting (don't have server capability)
    e.preventDefault();

    // Declare object for storing form input elements
    const formElements = {};
    formElements.title = document.querySelector('input#title');
    formElements.author = document.querySelector('input#author');
    formElements.pages = document.querySelector('input#pages');
    formElements.yearPub = document.querySelector('input#year');
    formElements.genre = document.querySelector('input#genre');
    formElements.type = document.querySelector('input#type');
    formElements.status = document.querySelector(
        `input[name='read-status']:checked`);
    
    // Check if all of the fields satisfy the pattern requirements


    // Store information in a book object, add that book to the library
    addBookToLibrary(
        formElements.title.value,
        formElements.author.value,
        formElements.pages.value,
        formElements.yearPub.value,
        formElements.genre.value,
        formElements.type.value,
        formElements.status.value, '');

    // Close the dialog
    formDialog.close();

    // Clear the dialog contents
        // Create array of formElements' keys, then iterate through each key
        // accessing the the property on formElements.
    Object.keys(formElements).forEach((prop) => {
        formElements[prop].value = '';
    });

    // Add the book to a new card
    printLibraryToCards(myLibrary, 'last');

    // Update the library count
    appendTitle();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Testing ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Listener on container for read/remove button clicks
const cardContainer = document.querySelector('.card-container');
cardContainer.addEventListener('click', (e) => {
    
    // 'Mark Read' button click
    if (e.target.className === 'read') {

        // Access the card's attribute


        // Go to myLibrary and edit the corresponding book's key-value pair


        // Disable the 'Mark Read' button for this book


    // 'Remove' button click
    } else if (e.target.className === 'remove') {
        
        // Access the card's attribute


        // Remove the card using its attribute


        // Renumber card data-attributes to match myLibrary index
        renumberCardAttrib();
    };

    console.log(e.target.parentElement.parentElement);

});