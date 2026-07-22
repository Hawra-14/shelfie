# 📚 Shelfie

Shelfie is a full-stack book tracking and lending app. Users can catalog the books they own, track their reading status, and make books available for others to borrow with an approval-based borrow request system.

## Features

- **User authentication**: sign up, sign in, and sign out with session-based auth
- **My Shelf**: add, edit, and delete books you own; track reading status (Want to Read, Currently Reading, Read, DNF) and ownership status (Owned, Want to Buy)
- **Ratings & reviews**: rate and review your own books (visible to everyone)
- **To Borrow**: browse books other users have made available to borrow, viewable by guests and signed-in users alike
- **Borrow requests**: signed-in users can request to borrow a book; the owner can accept or reject the request from their dashboard
- **Dashboard**: owners see and manage incoming borrow requests for their books
- **Borrowed**: track books you're currently borrowing and return them when done
- **Guest access**: users who aren't signed in can browse available books but must sign in to request a borrow

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Templating:** EJS
- **Frontend:** HTML, CSS
- **Auth:** Express sessions

## Models

- **User**: username, password (hashed)
- **Book**: title, author, description, image, status, ownershipStatus, rate, review, genres, isBorrowable, isBorrowed, owner (ref: User)
- **Borrow**: bookId (ref: Book), userId (ref: User), status (pending/borrowed/returned/rejected), requestDate

## Routes

| Method | Route | Description |
|--------|-------|--------------|
| GET | `/` | Home page |
| GET | `/auth/sign-up` | Sign-up form |
| POST | `/auth/sign-up` | Create a new account |
| GET | `/auth/sign-in` | Sign-in form |
| POST | `/auth/sign-in` | Sign in |
| DELETE | `/auth/sign-out` | Sign out |
| GET | `/books` | My Shelf (index) |
| GET | `/books/new` | New book form |
| POST | `/books` | Create a book |
| GET | `/books/:bookId` | Book details (owner view) |
| GET | `/books/:bookId/edit` | Edit book form |
| PUT | `/books/:bookId` | Update a book |
| DELETE | `/books/:bookId` | Delete a book |
| PUT | `/books/:bookId/borrow-status` | Toggle whether a book is borrowable |
| GET | `/to-borrow` | Browse borrowable books |
| GET | `/to-borrow/:bookId` | Book details (borrower view) |
| POST | `/to-borrow/:bookId` | Request to borrow a book |
| POST | `/to-borrow/:bookId/return` | Return a borrowed book |
| GET | `/dashboard` | View incoming borrow requests |
| PUT | `/dashboard/:bookId/:borrowId` | Accept a borrow request |
| PUT | `/dashboard/:bookId/:borrowId/reject` | Reject a borrow request |
| GET | `/borrowed` | View books you're currently borrowing |

## Getting Started

1. Clone the repo
   ```bash
   git clone https://github.com/Hawra-14/shelfie.git
   cd shelfie
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file
   ```
   MONGODB_URI=
   SESSION_SECRET=
   ```
4. Run the app
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:3000` in any browser

## Future Enhancements

- Notifications when a borrow request is accepted/rejected
- Search and filter books by genre, title, or author
- Wishlist ("Wish to Borrow") for books not currently available
- Borrow history view for both owners and borrowers
