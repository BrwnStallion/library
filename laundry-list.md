Library App Laundry List

05/22/24 (main)
- Add styles for cards
    - Consider making the cards have a lower text area that's outside of the
      card. It could be... book title, author, genre, 
    - I don't think this is very functional for this use case
- Consider making sidebar a popup
    - This will require a transition
    - Can have the sidebar markup be created and displayed with a listener
    - Sidebar can be an overlay, or it can rearrange the page contents
        - Overlay is better; can have the rest of the contents gray out
- Look into animations for the links on the header (underlines)
- Add form controls for adding a book to the library
    - Can do popup screen when the 'add new' button is clicked
        - Blur background when the screen is up
        - Add listeners on the cancel button (and maybe the non-overlay area)
          so that the overlay goes away
    - Add transform/transition thing for opening and closing the overlay
- Add regex patterns for all of the form controls
    - Consider using listener to restrict user from being able to even input
      text when it's supposed to be numbers
- Can add other properties to each book (genre, fiction/non-fiction, era)
    - COMPLETE
- Add function that takes user's input and stores the new book objects into an
  array.
    - COMPLETE
- Add a feature that shows the count of books in the library next to the library
  title
    - COMPLETE

05/21/24 (main)
- Add function that takes user's input and stores the new book objects into an
  array.
- Consider making sidebar a popup
    - This will require a transition
    - Can have the sidebar markup be created and displayed with a listener
    - Sidebar can be an overlay, or it can rearrange the page contents
        - Overlay is better; can have the rest of the contents gray out
- Add a feature that shows the count of books in the library next to the library
  title
- Look into animations for the links on the header (underlines)
- Initialize files and directories
    - COMPLETE
- Create basic structure in index.html for book display. Create containers, etc.
    - Header, sidebar, cards?
    - COMPLETE
- Add basic styles to index.html
    - COMPLETE