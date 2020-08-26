import React, { Component } from "react";
import BookmarkItem from "../BookmarkItem/BookmarkItem";
import "./BookmarkList.css";
import Context from '../context'




class BookmarkList extends Component {
  static contextType = Context;


  render() {
    const { bookmarks } = this.context;
    console.log(bookmarks)
    return (
      <section className="BookmarkList">
        <h2>Your bookmarks</h2>
        <ul className="BookmarkList__list" aria-live="polite">
          {bookmarks.map((bookmark) => (
            <BookmarkItem key={bookmark.id} {...bookmark} />
          ))}
        </ul>
      </section>
    );
  }
}

export default BookmarkList;
