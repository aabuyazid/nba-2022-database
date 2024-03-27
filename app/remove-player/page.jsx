"use client"

import { useState, useEffect } from "react";

export default function BestGamePlayer() {
    const [playerName, setPlayerName] = useState('')
    const [teamName, setTeamName] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/remove-player`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "playerName": playerName,
                "teamName": teamName,
            }),
        })

        const roster = await response.json().then(jsonData => {
            setMessage(jsonData.message)
        })
        console.log(response)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">Remove a player to the database</h1>
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
            <label htmlFor="teamName">Team Name</label>
            <input
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                type="text" 
                id="teamName" 
                name="teamName" 
                required 
            />
            <input type="submit" value="Submit"/>
        </form>
        <h1>{message}</h1>
    </main>
    )
}