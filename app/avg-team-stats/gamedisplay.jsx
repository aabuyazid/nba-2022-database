export default function GameDisplay({game}){
    const DisplayData=game.map(
        (g)=>{
            return(
                <tr>
                    <td>{g.points}</td>
                    <td>{g.times_tied}</td>
                    <td>{g.lead_changes}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped" style={{alignItems: "center"}}>
                <thead>
                    <tr>
                    <th>Average Points</th>
                    <th>Average Times Tied</th>
                    <th>Average Lead Changes</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    
    )
 }

 