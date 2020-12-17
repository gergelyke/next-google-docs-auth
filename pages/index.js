import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [ session, loading ] = useSession()

  if (!session) {
    return (
      <>
        Not signed in <br/>
        <button onClick={signIn}>Sign in</button>
      </>
    )
  }

  fetch('https://docs.googleapis.com/v1/documents/15_e8AOnTH8gUiTamNXkfJsPQLen6gjor7I4N3eX-d0o', {
    headers: {
      Authorization: `Bearer ${session.accessToken}`
    }
  }).then(response => response.json()).then(console.log)

  return (
    <>
      Signed in as {session.user.email} <br/>
      <button onClick={signOut}>Sign out</button>
    </>
  )
}
