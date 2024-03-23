"use client"

import { useState, useEffect } from "react";
import PerformanceDisplay from "./performancedisplay"

export default function BestGamePlayer() {
    const [playerName, setPlayerName] = useState('')
    const [performance, setPerformance] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/player-best-game?playerName=${playerName}`)

        const roster = await response.json().then(jsonData => {
            setPerformance(jsonData)
        })
        console.log(response)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">A Player's Most Impactful Game</h1>
        <p><br/></p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="playerName">Player's Name</label>
            <input
                autoFocus
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                type="text" 
                id="playerName" 
                name="playerName" 
                required 
            />
            <input type="submit" value="Submit"/>
        </form>
        <PerformanceDisplay performance={performance}/>
    </main>
    )
}