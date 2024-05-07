import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from 'next/link'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <Link href="/api/auth/signout"><button >Sign out</button></Link>
      </>
    )
  }
  else {
    return (
      <>
        Not signed in <br />
        <Link href="/api/auth/signin"><button>Sign in</button></Link>
      </>
    )
  }
}