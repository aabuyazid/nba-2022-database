"use client"

import { useState, useEffect } from "react";
import GameDisplay from "./gamedisplay"

export default function BestGameTeam() {
    const [team, setTeam] = useState('')
    const [game, setGame] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/team-best-game?team=${team}`)

        const roster = await response.json().then(jsonData => {
            setGame(jsonData)
        })
        console.log(response)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">A Team's Best Game</h1>
        <p><br/></p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="team">Team Name</label>
            <input
                autoFocus
                value={team}
                onChange={e => setTeam(e.target.value)}
                type="text" 
                id="team" 
                name="team" 
                required 
            />
            <input type="submit" value="Submit"/>
        </form>
        <GameDisplay game={game}/>
    </main>
    )
}