import Context from '../context'
import React, { Component } from "react";
const Required = () => <span className="AddBookmark__required">*</span>;


export default class EditBookmark extends Component {
 
 
 static contextType = Context

   
  

  render() {
    const { onClickCancel } = this.props;
    return (
      <section className="AddBookmark">
        <h2>Edit a bookmark {this.props.match.params.id}</h2>
        <form className="AddBookmark__form" onSubmit={e => {this.context.editBookmark(e,this.props.match.params.id)}}>
          <div className="AddBookmark__error" role="alert" />
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Great website!"
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://www.great-website.com/"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" />
          </div>
          <div>
            <label htmlFor="rating">
              Rating <Required />
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              defaultValue="1"
              min="1"
              max="5"
              required
            />
          </div>
          <div className="AddBookmark__buttons">
            <button type="button" onClick={onClickCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Save Edited Bookmark</button>
          </div>
        </form>
      </section>
    );
  }
}
