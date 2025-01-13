import axios from "axios"
import { mockJSONData } from "../../../../constants/mock-data"

interface CredentialInterface {
  email: string
  password: string
  secretWords: string
  fullname: string
}

export async function POST(request: Request) {
  const body = await request.json()

  const result = await axios.get(mockJSONData)

  if (result) {
    const credential = result.data.loginCredential as CredentialInterface[]

    const matched = credential.filter(
      (c) =>
        c.email === body.data.email &&
        c.password === body.data.password &&
        c.secretWords === body.data.secretWords
    )

    if (matched.length > 0) {
      return Response.json(
        {
          fullname: matched[0].fullname,
          accessToken: btoa(body.data.email),
        },
        { status: 200 }
      )
    } else {
      return Response.json(
        { error: "Incorrect email or password" },
        { status: 400 }
      )
    }
  }

  return Response.json({ error: "Invalid access" }, { status: 400 })
}
