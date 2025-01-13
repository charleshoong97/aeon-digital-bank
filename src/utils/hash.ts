import CryptoJS from "crypto-js"

export const encryptPassword = async (password: string) => {
  return CryptoJS.SHA256(password).toString()
}
