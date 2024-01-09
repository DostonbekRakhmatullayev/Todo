import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { TodoModel } from "../../entities/todo.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"
import jwt from "../../lib/jwt"

const host = `http://localhost:3030/`

const TODO_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req?.headers as any
    const id = jwt.verify(token) as string | undefined | any
    const data = (await AppDataSource.getRepository(TodoModel)
      .find({
        where: {
          users: {
            id: id,
          },
        },
        relations: {
          users: true,
        },
      })
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))) as any

    res.status(200).json({
      status: 200,
      message: "Succsseful",
      data: data,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const TODO_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { text } = req?.result
    const { token } = req?.headers
    console.log(token)

    if (!token) {
      return next(new ErrorHandling("Required token", 400))
    }
    const id = jwt.verify(token as string) as any
    const products = await AppDataSource.getRepository(TodoModel)
      .createQueryBuilder()
      .insert()
      .into(TodoModel)
      .values({ text, users: id })
      .returning("*")
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 201,
      message: "Succsseful",
      data: products?.raw[0],
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const TODO_UPDATE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { text } = req.result
    const users = await AppDataSource.getRepository(TodoModel)
      .createQueryBuilder()
      .update(TodoModel)
      .set({
        text,
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

const TODO_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    console.log(id)

    const data = await AppDataSource.getRepository(TodoModel)
      .createQueryBuilder()
      .delete()
      .from(TodoModel)
      .where("id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    if (!data?.raw?.length) {
      console.log("error")
      return next(new ErrorHandling("Not found", 404))
    }
    res.status(200).json({
      status: 200,
      message: "Successful",
      data: data?.raw,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

export { TODO_POST, TODO_UPDATE, TODO_DELETE, TODO_GET }
