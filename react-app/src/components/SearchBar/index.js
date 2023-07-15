import React from "react";

function SearchBar({ item }) {
  const placeholder = `Search ${item}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Feature coming Soon!`);
  };

  return (
    <form className="home__search__cont" onSubmit={handleSubmit}>
      <input className="home__search" type="search" placeholder={placeholder} />
    </form>
  );
}

export default SearchBar;
