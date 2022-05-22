import React from "react";
import { Link } from "react-router-dom";
import BookLook from "./BookLook";
import PropTypes from "prop-types";

class Shelves extends React.Component {
  render() {
    const { state, update } = this.props;

// creating variables to hold each shelf's books by filerting all books 
    let booksReading = state.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let booksWantToRead = state.books.filter(
      book => book.shelf === "wantToRead"
    );
    let booksRead = state.books.filter(book => book.shelf === "read");

// each book shelf will render if that shelf currently has books in it 
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {booksReading.length > 0 && (
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <BookLook books={booksReading} update={update} />
                </div>
              </div>
            )}
          </div>
          <div>
            {booksWantToRead.length > 0 && (
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <BookLook books={booksWantToRead} update={update} />
                </div>
              </div>
            )}
          </div>
          <div>
            {booksRead.length > 0 && (
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <BookLook books={booksRead} update={update} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <Link to="/search" className="open-search search-link">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

Shelves.propTypes = {
  state: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  update: PropTypes.func
};

export default Shelves;
