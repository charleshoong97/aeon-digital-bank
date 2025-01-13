import { ReactNode } from "react"

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="flex flex-col items-center min-h-[70vh] w-full py-7">
      <span className="text-2xl mb-5 uppercase font-bold tracking-wider self-start">
        Transaction History
      </span>
      {children}
    </div>
  )
}
