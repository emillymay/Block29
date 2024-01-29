import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllPlayers, deletePlayer } from "../api/index";
import PropTypes from 'prop-types';

export default function AllPlayers({ searchQuery }) {
    const [players, setPlayers] = useState([]);
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function allPlayersHandler() {
            const result = await fetchAllPlayers();
            setPlayers(result.players);
            setFilteredPlayers(result.players);
        }
        allPlayersHandler();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = players.filter((player) =>
                player.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPlayers(filtered);
        } else {
            setFilteredPlayers(players);
        }
    }, [players, searchQuery]);

    async function handleDeletePlayer(playerId) {
        const confirmed = window.confirm("Are you sure you want to delete this player? Just checking...");
        if (confirmed) {
            try {
                await deletePlayer(playerId);
                const updatePlayers = await fetchAllPlayers();
                setPlayers(updatePlayers.players);
            } catch (error) {
                console.error("Error deleting player:", error);
            }
        }
    }

    function renderAllPlayers() {
        return filteredPlayers.map((player) => (
            <div className="player-card" key={player.id}>
                <p className="id-tag">{`#${player.id}`}</p>
                <h3 className="name-tag full-width">{player.name}</h3>
                <p className="full-width">Breed: {player.breed}</p>
                <p className="full-width">Status: {player.status}</p>
                <div className="image-container full-width">
                    <img src={player.imageUrl} alt={`${player.name}'s picture is missing`} />
                </div>
                <button className="buttons button1" onClick={() => navigate(`/players/${player.id}`)}>See Details</button>
                <button className="buttons button2" onClick={() => handleDeletePlayer(player.id)}>Delete Player</button>
            </div>
        ));
    }

    if (!players) {
        return <p>Loading Content...</p>
    }

    return (
        <div>
            <h1 className="titles main-title">Welcome to Puppy Bowl!</h1>
            <div className="players-container">
                {renderAllPlayers()}
            </div>
        </div>
    )
}

AllPlayers.propTypes = {
    searchQuery: PropTypes.string.isRequired,
};
