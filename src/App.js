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
    page: "list",
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
    const { page, bookmarks } = this.state;
    return (
      <main className="App">
        <h1>Bookmarks!</h1>

        <Route>
          {" "}
          <Nav clickPage={this.changePage} />
          <div className="content" aria-live="polite">
            {page === "add" && (
              <AddBookmark
                onAddBookmark={this.addBookmark}
                onClickCancel={() => this.changePage("list")}
              />
            )}
            {page === "list" && (
              <BookmarkList
                bookmarks={bookmarks}
                editBookmark={this.editBookmark}
                editPage={this.changePage}
              />
            )}
            {page === "edit" && (
              <EditBookmark
                editBookmark={this.editBookmark}
                editPage={this.changePage}
              />
            )}
          </div>
        </Route>
      </main>
    );
  }
}

export default App;
