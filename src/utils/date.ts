export const getDisplayDate = (UTCDateTime: string) => {
  return new Date(UTCDateTime)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kuala_Lumpur",
    })
    .replace(",", "")
}

export const getDisplay24Time = (UTCDateTime: string) => {
  return new Date(UTCDateTime).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kuala_Lumpur",
  })
}
