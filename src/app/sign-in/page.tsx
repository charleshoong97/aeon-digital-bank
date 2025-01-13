"use client"

import { Alert, Button, Form, Input } from "@nextui-org/react"
import Image from "next/image"
import { useState } from "react"
import { emailRegexPattern } from "../constants/regex"
import { useAuthStore } from "../../store/auth"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { encryptPassword } from "../../utils/hash"

export default function SignIn() {
  const [email, setEmail] = useState<string>("")
  const [secretWords, setSecretWords] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [submitting, setSubmiting] = useState(false)
  const [error, setError] = useState<string>("")

  const { login } = useAuthStore((state) => state)
  const router = useRouter()

  const emailRegex = new RegExp(emailRegexPattern)

  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more"
    }
    if (value.includes(" ")) {
      return "Password cannot have whitespace"
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter"
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol"
    }

    return null
  }

  const getSecretWords = async (e) => {
    e.preventDefault()
    setError("")
    setSubmiting(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const response = await axios.post("/api/authentication/secret-words", {
        data,
      })

      if (response.status === 200) {
        setSecretWords(response.data.secretWords)
      } else {
        throw new Error(response.error || "An error occurred")
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data.error ??
            "Something went wrong. Please try again later"
        )
      } else {
        setError("Unknown error occurred")
      }
    }

    setSubmiting(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmiting(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const response = await axios.post("/api/authentication/signin", {
        data: {
          ...data,
          email: email,
          secretWords: secretWords,
          password: await encryptPassword(data.password.trim()),
        },
      })

      if (response.status === 200) {
        login(
          { email: email, fullname: response.data.fullname },
          response.data.accessToken
        )
        router.replace("/home")
      } else {
        throw new Error(response.error || "An error occurred")
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data.error ??
            "Something went wrong. Please try again later"
        )
      } else {
        setError("Unknown error occurred")
      }
    }

    setSubmiting(false)
  }

  return (
    <>
      <Image
        className="mb-4"
        src={"/AEON_logo.png"}
        alt="AEON"
        width={200}
        height={30}
      />
      <span className="font-bold text-xl text-center">
        Log in with your
        <br /> registered email address
      </span>
      {!secretWords && (
        <Form
          className="mt-8 w-full justify-center items-center space-y-4"
          validationBehavior="native"
          onSubmit={getSecretWords}
        >
          <div className="flex flex-col gap-4 max-w-xs w-full">
            <Input
              fullWidth
              isRequired
              label="Email Address"
              labelPlacement="outside"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
              validate={(value) => {
                if (!value) {
                  return "Please enter your email address"
                } else if (!emailRegex.test(value)) {
                  return "Please enter a valid email address"
                }
              }}
              disabled={submitting}
            />

            {error && <Alert color="danger" variant="faded" title={error} />}

            <Button
              className="w-full mt-4"
              color="primary"
              type="submit"
              isLoading={submitting}
            >
              {submitting ? "Loading..." : "Continue"}
            </Button>
          </div>
        </Form>
      )}

      {secretWords && (
        <Form
          className="mt-8 w-full justify-center items-center space-y-4"
          validationBehavior="native"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-4 max-w-xs w-full">
            <div className="flex flex-col">
              <span className="text-sm">Email Address</span>
              <span className="text-sm text-gray-400">{email}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm">Your secret words</span>
              <div className="bg-slate-800 px-4 py-3 rounded-md">
                <span>{secretWords}</span>
              </div>
              <span
                className="mt-1 text-xs text-right cursor-pointer text-blue-500"
                onClick={() => {
                  if (!submitting) {
                    setSecretWords("")
                    setEmail("")
                    setError("")
                    setPassword("")
                  }
                }}
              >
                This is not my secret word
              </span>
            </div>

            <Input
              fullWidth
              isRequired
              label="Password"
              labelPlacement="outside"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
              validate={(value) => {
                if (!value) {
                  return "Please enter your password"
                }

                return getPasswordError(value)
              }}
              disabled={submitting}
            />

            {error && <Alert color="danger" variant="faded" title={error} />}

            <Button
              className="w-full mt-4"
              color="primary"
              type="submit"
              isLoading={submitting}
            >
              {submitting ? "Loading..." : "Login"}
            </Button>
          </div>
        </Form>
      )}
    </>
  )
}
