import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SearchPage extends React.Component {
  // Simple method to clear input once user quits search page
  clearInput() {
    this.setState({
      query: ""
    });
  }

  render() {
    // Destructure props object
    const { state, update, search } = this.props;

    let displayResults = [];

    // If results for query were found
    if (state.results.length > 0 && state.query !== "") {
      // Map over all results and add each result to display array
      state.results.forEach(result => {
        /* Search results were not displaying correct shelf if previously added to library. The fix is to filter all library books and match them against the search results. If a match is found, push the library info (with shelf) to displaying results, and afterwards push the remaining search results. */
        const matchingResults = state.books.filter(book => book.id === result.id);
        if (matchingResults.length > 0) {
          /* The spread operator makes sure matching results are copied together with all their properties over to the displayResults array. Without it, we get an error about those results missing their unique key identifier. */
          displayResults.push(...matchingResults);
        } else {
          displayResults.push(result);
        }
      });
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={this.clearInput}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* Listen to input changes in order to set state. Afterwards state sets input value */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={state.query}
              onChange={event => search(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {/* Render SearchResults component, passing props */}
          <ol className="books-grid">
        {displayResults.map(eachBook => (
          <li key={eachBook.id}>
            <div className="book">
              <div className="book-top">
                {/* If book contains image links, render it's cover image */}
                {eachBook.imageLinks && (
                  <img
                    src={eachBook.imageLinks.thumbnail}
                    className="book-cover"
                    alt={eachBook.title}
                    style={{ width: 128 }}
                  />
                )}
                {/* If cover image is not found, render a simple placeholder */}
                {!eachBook.imageLinks && (
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 182,
                      backgroundColor: "#aaa",
                      color: "#ccc",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      textTransform: "uppercase"
                    }}
                  >
                    No Image
                  </div>
                )}
                <div className="book-shelf-changer">
                  {/* If book is not on any shelf, give dropdown an empty value; otherwise set it's value to shelf name. On menu change, call the update props method to change shelf */}
                  <select
                    id={eachBook.id}
                    value={eachBook.shelf ? eachBook.shelf : "none"}
                    onChange={e => update(eachBook, e.target.value)}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{eachBook.title}</div>
              {/* Books with multiple authors were concatenating results in one line. The fix is to map over authors array and output each result on it's own div */}
              {eachBook.authors &&
                eachBook.authors.map(author => (
                  <div className="book-authors" key={author}>
                    {author}
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ol>
          
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  state: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  update: PropTypes.func,
  search: PropTypes.func
};

export default SearchPage;
