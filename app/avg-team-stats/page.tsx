"use client"

import { useState, useEffect } from "react";
import PerformanceDisplay from "./performancedisplay"

export default function AvgTeamStats() {
    const [team, setTeam] = useState('')
    const [startDate, setStartDate] = useState('')
    const [timeRange, setTimeRange] = useState('')
    const [averages, setAverages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/avg-player-stats?team=${team}&startDate=${startDate}&timeRange=${timeRange}`)

        const roster = await response.json().then(jsonData => {
            setAverages(jsonData)
        })
        console.log(response)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">A Team's Average Statistics</h1>
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
            <label htmlFor="startDate">Start Date</label>
            <input
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                type="date" 
                id="startDate" 
                name="startDate" 
                required 
            />
            <label htmlFor="timeRange">Time Range (days)</label>
            <input
                value={timeRange}
                onChange={e => setTimeRange(e.target.value)}
                type="text" 
                id="timeRange" 
                name="timeRange" 
                required 
            />
            <input type="submit" value="Submit"/>
        </form>
        <GameDisplay game={averages}/>
    </main>
    )
}