import React, { useRef } from "react";

import classes from "./AddMovies.module.css";

const AddMovies = (props) => {
  let titleRef = useRef("");
  let openingTextRef = useRef("");
  let releaseDateRef = useRef("");

  const submitHandler = (event) => {
      event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

      props.onAddMovie(movie);
    };
    

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" ref={titleRef} required/>
        </div>
        <div className={classes.control}>
          <label htmlFor="opening-text">Opening Text</label>
          <textarea
            rows={5}
            id="opening-text"
            ref={openingTextRef}
            required
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Release Date</label>
          <input type="text" id="date" ref={releaseDateRef} required />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </>
  );
};

export default AddMovies;
