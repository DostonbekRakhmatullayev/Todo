import JWT from "jsonwebtoken"
import { SECRET_KEY } from "../config/config"

export default {
  sign: (payload: string) => JWT.sign(payload, String(process.env.SECRET_KEY)),
  verify: (token: string) => JWT.verify(token, String(process.env.SECRET_KEY)),
}
