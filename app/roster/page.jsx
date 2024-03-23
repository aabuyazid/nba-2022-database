"use client"

import { useState, useEffect } from "react";
import RosterDisplay from "./rosterdisplay"

export default function Roster() {
    const [team, setTeam] = useState('')
    const [roster, setRoster] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/roster?team=${team}`)

        const roster = await response.json().then()
        console.log(response)
        setRoster(roster)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">A Team's Roster</h1>
        <p><br/></p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="team">Team  </label>
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
        <RosterDisplay roster={roster}/>
    </main>
    )
}