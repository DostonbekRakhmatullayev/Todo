import { NextFunction, Request, Response } from "express"
import Joi, { any } from "joi"

export default (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = schema.validate(req.body)

      if (error) {
        next(
          res.json({
            messaga: error.message,
          }),
        )
      }

      req.result = value
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
