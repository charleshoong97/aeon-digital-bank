"use client"

import { Alert, Button, Form, Input } from "@nextui-org/react"
import { useState } from "react"
import { emailRegexPattern } from "../constants/regex"
import Image from "next/image"
import axios, { AxiosError } from "axios"
import { useAuthStore } from "../../store/auth"
import { useRouter } from "next/navigation"
import { encryptPassword } from "../../utils/hash"

export default function SignUp() {
  const [fullname, setFullname] = useState<string>("")
  const [secretWord, setSecretWord] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
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

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmiting(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const response = await axios.post("/api/authentication/signup", {
        data: {
          ...data,
          secretWords: data.secretWords.trim(),
          password: await encryptPassword(data.password.trim()),
        },
      })

      if (response.status === 200) {
        login(
          { email: data.email, fullname: data.fullname },
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
      <span className="font-bold text-xl text-center">Create Account</span>
      <span className="mt-3 text-small text-center max-w-72">
        No credit card is required to create an account. You only need to create
        an account to use our feature.
      </span>
      <Form
        className="mt-8 w-full justify-center items-center space-y-4"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-4 max-w-xs w-full">
          <Input
            fullWidth
            isRequired
            label="Full name"
            labelPlacement="outside"
            name="fullname"
            placeholder="Enter your full name"
            type="text"
            value={fullname}
            onValueChange={setFullname}
            validate={(value) => {
              if (!value || !value.trim()) {
                return "Please enter your full name"
              }
            }}
            disabled={submitting}
          />

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

          <Input
            fullWidth
            isRequired
            label="Secret Words"
            labelPlacement="outside"
            name="secretWords"
            placeholder="Enter your secret words"
            type="text"
            value={secretWord}
            onValueChange={setSecretWord}
            validate={(value) => {
              if (!value || !value.trim()) {
                return "Please enter your secret words"
              } else if (value.trim().length > 20) {
                return "Secret words maximum length is 20 characters"
              }
            }}
            disabled={submitting}
          />

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

          <Input
            fullWidth
            isRequired
            label="Confirm Password"
            labelPlacement="outside"
            name="confirm-password"
            placeholder="Re-enter your password"
            type="password"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            validate={(value) => {
              if (!value) {
                return "Please enter your confirm password"
              } else if (value != password) {
                return "Confirm password is not same as your password"
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
            {submitting ? "Loading..." : "Create Now"}
          </Button>
        </div>
      </Form>
    </>
  )
}
