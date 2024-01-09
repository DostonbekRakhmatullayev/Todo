import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { login_joi } from "../../validate/validate"
import { LOGIN_POST } from "./login"

const router = Router()

router.post("/login", validateMiddleware(login_joi), LOGIN_POST)

export default router
