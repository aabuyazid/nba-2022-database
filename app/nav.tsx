import Link from "next/link"

export default async function Nav() {
    return (
        <nav>
            <Link href={"/"}>
                <h1>NBA 2022 Season Database</h1>
            </Link>
        </nav>
    )
}