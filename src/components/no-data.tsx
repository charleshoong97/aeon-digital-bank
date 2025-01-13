import Image from "next/image"

interface NoDataInterface {
  description: string
}

export default function NoData(props: NoDataInterface) {
  const { description } = props

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        className="max-w-[80vw] mb-3"
        src={"/no-data.png"}
        height={200}
        width={200}
        alt="no-data"
        color="white"
      />
      <span className="text-xl">{description}</span>
    </div>
  )
}
