import express, { Application } from "express"
import dotenv from "dotenv/config"
import { ErrorMiddleare } from "./middleware/error.middleware"
import model from "./controller"
import { AppDataSource } from "./config/config"
import cors from "cors"
import path from "path"
const app: Application = express()
app.use(path.join(process.cwd(), "src", "uploads"), express.static("uploads"))
app.use(
  cors({
    origin: "*",
  }),
)

app.use(express.json())

AppDataSource.initialize()
  .then((): void => console.log("Connectd"))
  .catch((error: unknown): void => console.log(error))

app.use(model)

app.use(ErrorMiddleare)
app.use("/*", (req, res, next) => {
  res.status(500).json({
    message: req.url + "is not found",
  })
})

app.listen(3030, (): void => {
  console.log(3030)
})
