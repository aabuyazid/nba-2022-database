import { useEffect, useState } from "react"

export default function RosterDisplay({roster}){
    const DisplayData=roster.map(
        (player)=>{
            return(
                <tr>
                    <td>{player.name}</td>
                    <td>{player.birth_date}</td>
                    <td>{player.birth_country}</td>
                    <td>{player.height}</td>
                    <td>{player.weight}</td>
                    <td>{player.max_avg_min}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped" style={{alignItems: "center"}}>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Birth Date</th>
                    <th>Birth Country</th>
                    <th>Height (m)</th>
                    <th>Weight (kg)</th>
                    <th>Average Minutes</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    
    )
 }

 