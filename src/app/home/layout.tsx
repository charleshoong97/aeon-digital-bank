import { ReactNode } from "react"

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full py-7">
      {children}
    </div>
  )
}
