export default function PerformanceDisplay({performance}){
    const DisplayData=performance.map(
        (game)=>{
            return(
                <tr>
                    <td>{game.min}</td>
                    <td>{game.fga}</td>
                    <td>{game.fgm}</td>
                    <td>{game.fgp}</td>
                    <td>{game.fta}</td>
                    <td>{game.ftm}</td>
                    <td>{game.ftp}</td>
                    <td>{game.tpa}</td>
                    <td>{game.tpm}</td>
                    <td>{game.tpp}</td>
                    <td>{game.steals}</td>
                    <td>{game.assists}</td>
                    <td>{game.turnovers}</td>
                    <td>{game.blocks}</td>
                    <td>{game.plus_minus}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped" style={{alignItems: "center"}}>
                <thead>
                    <tr>
                    <th>Minutes</th>
                    <th>Field Goal Attempts</th>
                    <th>Field Goal Makes</th>
                    <th>Field Goal Percentage</th>
                    <th>Free Throw Attempts</th>
                    <th>Free Throw Makes</th>
                    <th>Free Throw Percentage</th>
                    <th>Three Point Attempts</th>
                    <th>Three Point Makes</th>
                    <th>Three Point Percentage</th>
                    <th>Steals</th>
                    <th>Assists</th>
                    <th>Turnovers</th>
                    <th>Blocks</th>
                    <th>Plus Minus</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    
    )
 }

 