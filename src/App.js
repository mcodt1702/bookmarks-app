import React, { Component } from "react";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import { Route } from "react-router-dom";
import EditBookmark from "./EditBookmark/EditBookmark";

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  addBookmark = (bookmark) => {
    fetch(config.API_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        body: JSON.stringify(bookmark),
      },
    });
  };

  editBookmark = (bookmark) => {
    fetch(config.APO_ENDPOING_EDIT, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        body: JSON.stringify(bookmark),
      },
    });
  };
  componentDidMount() {
    fetch("http://localhost:8000/api/bookmarks/")
      .then((res) => res.json())
      .then((bookmarks) => this.setState({ bookmarks }));
  }

  render() {
    return (
      <main className="App">
        <h1>Bookmarks!</h1>

        <Route path="/" render={(rprops) => <Nav />} />

        <Route
          path="/add"
          render={(rprops) => (
            <AddBookmark
              onAddBookmark={this.addBookmark}
              onClickCancel={() => this.changePage("list")}
            />
          )}
        />
        <Route
          path="/list"
          render={(rprops) => <BookmarkList bookmarks={this.state.bookmarks} />}
        />
        <Route
          path="/edit/id"
          render={(rprops) => (
            <EditBookmark
              editBookmark={this.editBookmark}
              editPage={this.changePage}
            />
          )}
        />
      </main>
    );
  }
}

export default App;
