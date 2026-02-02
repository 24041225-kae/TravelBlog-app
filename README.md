# Project Documentation

## Enhancements

- Moved HTML layout into a NavBar function for easy reusability.
- Individual routes for about and contact pages.
- Used bootstrap for layout and styling.
- Centered content vertically for readability.
- Used background images to make the home and about page more engaging.
- Added "view travel details" with a separate card for each trip.
- Used 'express.static' to access public folders so I can add images to my website.
- Let users input external URL images when adding travel entries, so a database is not necessary.
- Added 'required' attributes to form fields for basic form validation.
- Added a search bar for easy access to routes.
- Allow users to post comments in separate travel entries, add comments from the travel list. Comments are stored in array and posted to user after the button is clicked.
- Added comment section as a separate route, allow users to post general comments separate from the travel entry comments.

## Express.js Application Details

### Overview
This is a Node.js web application built with Express.js that serves as a personal travel blog. It allows users to view, add, edit, and delete travel entries, as well as post comments.

### Features
- **Dynamic HTML Generation**: Uses a custom `NavBar` function to maintain consistent layout across pages.
- **Routing**: Valid routes include Home (`/`), About (`/about`), Contact (`/contact`), Travel List (`/travelList`), and Comments (`/comment`).
- **CRUD Operations**: Users can Create, Read, Update, and Delete travel records.
- **Search**: Built-in search functionality to navigate to specific sections.
- **Comments**: Supports both general site comments and specific comments for travel entries.
- **Styling**: Utilizes Bootstrap 5 for responsive design and custom CSS for specific page styling.

### Tech Stack
- **Framework**: Express.js
- **Templating**: HTML with JavaScript Template Literals
- **Styling**: Bootstrap 5, CSS
- **Data Storage**: In-memory arrays (Note: Data is not persistent across server restarts).

### Setup & Running
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the server:
   ```bash
   node app.js
   ```
   (Note: `package.json` specifies `"main": "index.js"`, but the application entry point is `app.js`).
3. Access the application at `http://localhost:3000`.

### Dependencies
- `express`: Web framework used for server creation, routing, and middleware.

