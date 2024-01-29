import { useState } from "react";
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    // Handles changes made to the SearchBar component's input field, updating the searchQuery state live, not onClick
    const handleSearchChange = (event) => {
        const newQuery = event.target.value;
        setSearchQuery(newQuery);
        if (onSearch) {
            onSearch(newQuery);
        }
    };

    return (
        <div className="search-bar">
            <p className="search-hint">Search For A Puppy By Name</p>
            <input
                className="search-input"
                type="text"
                placeholder="Search for a puppy..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
