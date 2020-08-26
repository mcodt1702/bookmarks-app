import React, { Component } from "react";
import AddBookmark from "./AddBookmark/AddBookmark";
import BookmarkList from "./BookmarkList/BookmarkList";
import Nav from "./Nav/Nav";
import config from "./config";
import "./App.css";
import { Route } from "react-router-dom";
import EditBookmark from "./EditBookmark/EditBookmark";
import Context from "./context"

class App extends Component {
  state = {
    bookmarks: ["hello im passing"],
    error: null,

    addBookmark: (e) => {
      e.preventDefault();

      const { title, url, description, rating } = e.target;
      const newbookmark = {
        title: title.value,
        url: url.value,
        description: description.value,
        rating: rating.value,
      };

      fetch(config.API_ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          body: JSON.stringify(newbookmark),
          authorization: `bearer ${config.API_KEY}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            // get the error message from the response,
            return res.json().then((error) => {
              // then throw it
              throw error;
            });
          }
        })
        .then((newbookmark) => {
          this.setState({
            bookmarks: [...this.state.bookmarks, newbookmark],
          });
        });
    },

    editBookmark: (bookmark) => {
      fetch(config.APO_ENDPOING_EDIT, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          body: JSON.stringify(bookmark),
        },
      });
    },


    componentDidMount() {
      fetch(config.API_ENDPOINT)
        .then((res) => res.json())
        .then((bookmarks) => this.setState({ bookmarks }));
  
    }

  };
  

  render() {
    return (
      <Context.Provider value={this.state}>
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
            render={(rprops) => (
              <BookmarkList bookmarks={this.state.bookmarks} />
            )}
          />
          <Route
            path="/edit/:id"
            render={(rprops) => (
              <EditBookmark
                {...rprops}
                submitEditBookmark={this.editBookmark}
              />
            )}
          />
      
      </main>
        </Context.Provider>
    );
  }
}

export default App;
