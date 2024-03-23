"use client"

import { useState, useEffect } from "react";
import PerformanceDisplay from "./performancedisplay"

export default function AvgPlayerStats() {
    const [playerName, setPlayerName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [timeRange, setTimeRange] = useState('')
    const [averages, setAverages] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/avg-player-stats?playerName=${playerName}&startDate=${startDate}&timeRange=${timeRange}`)

        const roster = await response.json().then(jsonData => {
            setAverages(jsonData)
        })
        console.log(response)
    }
    return (
    <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="test-lg">A Player's Average Statistics</h1>
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
        <PerformanceDisplay performance={averages}/>
    </main>
    )
}