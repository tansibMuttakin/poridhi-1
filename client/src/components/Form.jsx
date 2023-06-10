"use client";

import React from "react";

const Form = ({ userInput, setUserInput, handleSubmit }) => {
  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Type here..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        required
      />
      <button>Add News</button>
    </form>
  );
};

export default Form;
