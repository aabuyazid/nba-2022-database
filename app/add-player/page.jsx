"use client"

import { useState, useEffect } from "react";

export default function BestGamePlayer() {
    const [playerName, setPlayerName] = useState('')
    const [teamName, setTeamName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [birthCountry, setBirthCountry] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/add-player`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "playerName": playerName,
                "teamName": teamName,
                "birthDate": birthDate,
                "birthCountry": birthCountry,
                "height": height,
                "weight": weight
            }),
        })

        const roster = await response.json().then(jsonData => {
            setMessage(jsonData.message)
        })
        console.log(response)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">Add a player to the database</h1>
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
            <label htmlFor="birthDate">Birth Date</label>
            <input
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
                type="date" 
                id="birthDate" 
                name="birthDate" 
            />
            <label htmlFor="birthCountry">Birth Country</label>
            <input
                value={birthCountry}
                onChange={e => setBirthCountry(e.target.value)}
                type="text" 
                id="birthCountry" 
                name="birthCountry" 
            />
            <label htmlFor="weight">Weight</label>
            <input
                value={weight}
                onChange={e => setWeight(e.target.value)}
                type="text" 
                id="weight" 
                name="weight" 
            />
            <label htmlFor="height">Height</label>
            <input
                value={height}
                onChange={e => setHeight(e.target.value)}
                type="text" 
                id="height" 
                name="height" 
            />
            <input type="submit" value="Submit"/>
        </form>
        <h1>{message}</h1>
    </main>
    )
}