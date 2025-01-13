"use client"

import { Snippet } from "@nextui-org/snippet"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start mt-[6vh]">
      <Image
        className="mb-4"
        src={"/AEON_logo.png"}
        alt="AEON"
        width={200}
        height={30}
      />
      <span className="text-3xl text-center mt-5">
        Welcome to <br />
        AEON Digital Banking Assessment
      </span>
      <span className="text-md text-center max-w-[400px] mt-6">
        You can create a new account to proceed or login with following
        credentials to have a view of transaction page with records
      </span>

      <div className="border-solid border-1 px-6 py-4 rounded-md max-w-md w-full mt-3">
        <span>Email Address</span>
        <br />
        <Snippet className="w-full" hideSymbol>
          charles@dattel.asia
        </Snippet>

        <br />
        <br />
        <span>Password</span>
        <br />
        <Snippet className="w-full" hideSymbol>
          Karhoong!
        </Snippet>
      </div>
    </div>
  )
}
