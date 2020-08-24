import React, { Component } from "react";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import { Route } from "react-router-dom";
import EditBookmark from "./EditBookmark/EditBookmark";

const bookmarks = [];

class App extends Component {
  state = {
    bookmarks,
    error: null,
  };

  changePage = (page) => {
    this.setState({ page });
  };

  setBookmarks = (bookmarks) => {
    this.setState({
      bookmarks,
      error: null,
      page: "list",
    });
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
    fetch(config.API_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch((error) => this.setState({ error }));
  }

  render() {
    return (
      <main className="App">
        <h1>Bookmarks!</h1>

        <Route
          path="/"
          render={(rprops) => <Nav clickPage={this.changePage} />}
        />

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
          path="/"
          render={(rprops) => <BookmarkList bookmarks={bookmarks} />}
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
