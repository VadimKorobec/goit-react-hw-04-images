import PropTypes from 'prop-types';
import { Search } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmitForm = event => {
    event.preventDefault();

    onSubmit(event.currentTarget.query.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <Search />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
