import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../config/config.js"
import { UsersModel } from "../entities/users.entitiy.js"
import { ErrorHandling } from "../exceptions/error.handling.js"
import jwt from "../lib/jwt.js"

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers
    if (!token) {
      return next(new ErrorHandling("Required token", 400))
    }
    const user_id = jwt.verify(token as string) as any

    const users = await AppDataSource.getRepository(UsersModel)
      .findOne({
        where: { id: user_id },
      })
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    if (users == null) {
      return next(new ErrorHandling("Token hato", 400))
    }
    return next()
  } catch (error) {
    return next(new ErrorHandling("The token is invalid", 500))
  }
}
