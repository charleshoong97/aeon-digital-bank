import axios from "axios"
import { NextRequest } from "next/server"
import { getCookie } from "../../../../utils/server"
import { mockJSONData } from "../../../../constants/mock-data"

interface obj {
  [key: string]: unknown[]
}

export async function GET(request: NextRequest) {
  const token = getCookie(request.headers.get("cookie"), "auth-token")

  if (!token) return Response.json({ error: "Invalid access" }, { status: 400 })

  const email = atob(token)

  const result = await axios.get(mockJSONData)

  if (result && email) {
    const transaction = result.data.transactionData as obj[]

    const matched = Object.entries(transaction)
      .find(([key]) => key === email)
      ?.at(1)

    return Response.json(
      {
        transactions: matched,
      },
      { status: 200 }
    )
  }

  return Response.json({ error: "Invalid access" }, { status: 400 })
}
