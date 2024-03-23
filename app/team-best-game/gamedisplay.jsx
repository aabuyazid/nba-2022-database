export default function GameDisplay({game}){
    const DisplayData=game.map(
        (g)=>{
            return(
                <tr>
                    <td>{g.home_team}</td>
                    <td>{g.visitor_team}</td>
                    <td>{g.home_points}</td>
                    <td>{g.visitor_points}</td>
                    <td>{g.times_tied}</td>
                    <td>{g.lead_changes}</td>
                    <td>{g.date}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped" style={{alignItems: "center"}}>
                <thead>
                    <tr>
                    <th>Home Team</th>
                    <th>Visitor Team</th>
                    <th>Home Points</th>
                    <th>Visitor Points</th>
                    <th>Times Tied</th>
                    <th>Lead Changes</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    
    )
 }

 