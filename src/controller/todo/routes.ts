import { Router } from "express"
import chektoken from "../../middleware/chektoken"
import validateMiddleware from "../../middleware/validate.middleware"
import { todo, todo_update } from "../../validate/validate"
import { TODO_DELETE, TODO_GET, TODO_POST, TODO_UPDATE } from "./todo"

const router = Router()

router.post("/todo/create", validateMiddleware(todo), chektoken, TODO_POST)
router.put("/todo/update/:id", chektoken, validateMiddleware(todo_update), TODO_UPDATE)
router.get("/todo/all", chektoken, TODO_GET)
router.delete("/todo/delete/:id", chektoken, TODO_DELETE)

export default router
