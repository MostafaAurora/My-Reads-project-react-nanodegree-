import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./components/SearchView";
import Shelves from "./components/Shelves";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    query: "",
    books: [],
    results: []
  };
// get books from the API and push them to state
  componentDidMount() {
     BooksAPI.getAll().then(data =>{
      this.setState({ books: data });
    });
  }

// Set the query state to match the user input
  Search = query => {
    this.setState({ query: query });

// Retrieve query data from API and set state for search results
    if (query.length > 0) {
      BooksAPI.search(query).then(data => {
        this.setState({
          results: data
        });
      });
    };
  };
// setting correct book shelves in book objects 
  ShelfUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState(prevState => ({ 
        books: prevState.books.filter(b => {
          if (b.id === book.id) {
            return (book.shelf = shelf);
          } else {
            return book;
          };
        })
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelves state={this.state} update={this.ShelfUpdate} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              state={this.state}
              update={this.ShelfUpdate}
              search={this.Search}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
