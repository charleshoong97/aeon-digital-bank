import axios from "axios"
import { mockJSONData } from "../../../constants/mock-data"

interface CredentialInterface {
  email: string
  password: string
}

const dummySecret = ["apple", "orange", "grape", "watermelon"]

export async function POST(request: Request) {
  const body = await request.json()

  const result = await axios.get(mockJSONData)

  if (result) {
    const credential = result.data.loginCredential as CredentialInterface[]

    const matched = credential.filter((c) => c.email === body.data.email)

    if (matched.length > 0) {
      return Response.json(
        {
          secretWords: matched[0].secretWords,
        },
        { status: 200 }
      )
    } else {
      return Response.json(
        {
          secretWords:
            dummySecret[Math.floor(Math.random() * dummySecret.length)],
        },
        { status: 200 }
      )
    }
  }

  return Response.json({ error: "Invalid access" }, { status: 400 })
}
