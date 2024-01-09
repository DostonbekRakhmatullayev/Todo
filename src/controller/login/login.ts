import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { UsersModel } from "../../entities/users.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"
import jwt from "../../lib/jwt"

const LOGIN_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.result

    const users = (await AppDataSource.getRepository(UsersModel).findOne({
      where: { email, password },
    })) as any
    if (!users) {
      return next(new ErrorHandling("Not found user", 404))
    }
    if (users) {
      console.log(jwt.sign(users?.id))

      res.status(200).json({
        message: "Successful",
        status: 200,
        token: jwt.sign(users?.id),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

export { LOGIN_POST }
