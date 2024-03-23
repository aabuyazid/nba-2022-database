import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-lg">Gain insight into the statistics of the NBA 2022 Season</h1>
      <h1 className="text-md">Click and try out the features below</h1>
      <p>
        <br/>
        <br/>
      </p>
      <Link href={"/roster"}>
          <h1 className="text-md">Team's Roster</h1>
      </Link>
      <Link href={"/worst-game-player"}>
          <h1 className="text-md">Player's Least Impactful Game</h1>
      </Link>
      <Link href={"/best-game-player"}>
          <h1 className="text-md">Player's Most Impactful Game</h1>
      </Link>
      <Link href={"/best-game-team"}>
          <h1 className="text-md">Team's Best Game</h1>
      </Link>
      <Link href={"/worst-game-team"}>
          <h1 className="text-md">Team's Worst Game </h1>
      </Link>
      <Link href={"/avg-player-stats"}>
          <h1 className="text-md">Player Moving Average Stats</h1>
      </Link>
      <Link href={"/avg-team-stats"}>
          <h1 className="text-md">Team Moving Average Stats</h1>
      </Link>
      <Link href={"/team-most-relied"}>
          <h1 className="text-md">Team's Most Relied-Upon Player</h1>
      </Link>
    </main>
  );
}
