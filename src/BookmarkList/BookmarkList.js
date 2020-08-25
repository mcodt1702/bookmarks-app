import React from "react";
import BookmarkItem from "../BookmarkItem/BookmarkItem";
import "./BookmarkList.css";

export default function BookmarkList(bookmarks) {
  console.log(bookmarks);
  const flash = bookmarks.map((bookmark) => (
    <BookmarkItem key={bookmark.id} {...bookmark} />
  ));

  return (
    <section className="BookmarkList">
      <h2>Your bookmarks</h2>
      <ul className="BookmarkList__list" aria-live="polite">
        {flash}
      </ul>
    </section>
  );
}
