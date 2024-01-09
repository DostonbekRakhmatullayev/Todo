import { Router } from "express"
import upload from "../../lib/multer"
import validateMiddleware from "../../middleware/validate.middleware"
import { users_joi, users_pacht } from "../../validate/validate"
import { USER_PATCH, USER_POST, USER_TOKEN } from "./registrasiya"

const router = Router()

router.post("/user/create", validateMiddleware(users_joi), USER_POST)
router.get("/user/get", USER_TOKEN)

router.patch("/user/update", validateMiddleware(users_pacht), USER_PATCH)
export default router
