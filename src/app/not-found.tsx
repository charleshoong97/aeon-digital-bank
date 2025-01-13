"use client"

import { Button } from "@nextui-org/button"
import Image from "next/image"
import { useAuthStore } from "../store/auth"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const { isAuthenticated } = useAuthStore()

  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="max-w-[80vw] mb-3"
        src={"/error-404.png"}
        height={300}
        width={300}
        alt="404"
        color="white"
      />
      <span className="text-xl">
        The page that you are looking cannot be found.
      </span>
      <Button
        className="px-5 mt-5"
        variant="solid"
        color="primary"
        onPress={() => router.push(isAuthenticated ? "/home" : "/")}
      >
        Back to home
      </Button>
    </div>
  )
}
