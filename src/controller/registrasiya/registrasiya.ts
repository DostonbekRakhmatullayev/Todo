import { NextFunction, Request, Response } from "express"
import { AppDataSource, SECRET_KEY } from "../../config/config"
import { UsersModel } from "../../entities/users.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"
import jwt from "../../lib/jwt"

const USER_TOKEN = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req?.headers as any
    const id = jwt.verify(token) as string | undefined | any

    const users = await AppDataSource.getRepository(UsersModel).find({
      where: {
        id,
      },
    })

    if (!users.length) {
      return next(new ErrorHandling("Token xato", 400))
    }
    res.status(200).json({
      message: "Successful",
      status: 200,
      data: users,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const USER_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password } = req.result
    console.log(req)

    const conplic = await AppDataSource.getRepository(UsersModel).find({
      where: { email: email, password: password },
    })
    console.log(conplic, "ok")

    if (conplic.length) {
      return next(new ErrorHandling("email va password uzgartirnig", 409))
    }
    const {
      raw: [{ id }],
    } = await AppDataSource.getRepository(UsersModel)
      .createQueryBuilder()
      .insert()
      .into(UsersModel)
      .values({
        first_name,
        last_name,
        email,
        password,
      })
      .execute()
    res.status(200).json({
      message: "Successful",
      status: 201,
      token: jwt.sign(id),
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const USER_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req?.headers as any
    const id = jwt.verify(token) as any

    const user = await AppDataSource.getRepository(UsersModel)
      .findOne({
        where: { id: id },
      })
      .catch((error) => next(new ErrorHandling(error.message, 400)))
    const { first_name, last_name, email, password } = req.result as any

    const users = await AppDataSource.getRepository(UsersModel)
      .createQueryBuilder()
      .update(UsersModel)
      .set({
        email,
        first_name,
        last_name,
        password,
      })
      .where("id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))

    if (!users?.raw?.length) {
      console.log("error")
      return next(new ErrorHandling("Not found", 404))
    }

    res.status(200).json({
      message: "Succcessful",
      status: 201,
      data: users?.raw,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

export { USER_POST, USER_PATCH, USER_TOKEN }
