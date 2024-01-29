import  { useState, useEffect } from "react";
import { fetchAllTeams } from  "../api/index";


export default function TeamBoard() {
    const [teams, setTeams] = useState([])


    useEffect(() => {
        handleTeams()
        async function handleTeams() {
            try {
                const teams = await fetchAllTeams();
                console.log("HandleTeams:", teams)
                setTeams(teams);
            } catch (error) {
                console.error("Problem handling teams:", error);
            }
        }
    }, [])

    return (
        <div>
            <h2 className="titles board-title">Here Are The Teams And Their Available Puppies</h2>
            <div className="board-container">
                {teams.map((team) => (
                <table key={team.id} className="team-table">
                    <thead>
                    <tr>
                        <th colSpan="2" className="table-title">{team.name.toUpperCase()}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {team.players.map((player) => (
                        <tr key={player.id}>
                            <td className="table-row">{player.name}</td>
                            <td className="table-row status">{player.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                ))}
            </div>

        </div>
    );
}