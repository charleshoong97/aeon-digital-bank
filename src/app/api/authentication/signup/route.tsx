import axios from "axios"
import { mockJSONData } from "../../../constants/mock-data"

interface CredentialInterface {
  email: string
  password: string
}

export async function POST(request: Request) {
  const body = await request.json()

  const result = await axios.get(mockJSONData)

  if (result) {
    const credential = result.data.loginCredential as CredentialInterface[]

    if (credential.some((c) => c.email === body.data.email)) {
      return Response.json(
        {
          error:
            "Existing account found. Log in with your username and password.",
        },
        { status: 400 }
      )
    } else {
      const newJsonFile = {
        ...result.data,
        loginCredential: [
          ...credential,
          {
            fullname: body.data.fullname,
            secretWords: body.data.secretWords,
            email: body.data.email,
            password: body.data.password,
          },
        ],
      }

      await axios.post(mockJSONData, newJsonFile, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      return Response.json(
        {
          fullname: body.data.fullname,
          accessToken: btoa(body.data.email),
        },
        { status: 200 }
      )
    }
  }

  return Response.json({ error: "Invalid access" }, { status: 400 })
}
