
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import PropTypes from 'prop-types';

export default function NavBar({ onSearch }) {

    return (
        <div className="navbar">
            <Link className="titles links" to='/'>Go Home</Link>
            <SearchBar onSearch={onSearch} />
            <Link className="titles links" to='/new_player_form'>Add A Puppy</Link>
        </div>
    );
}

NavBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
