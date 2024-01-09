import { NextFunction, Request, Response } from "express"
import { ErrorHandling } from "../exceptions/error.handling"

const ErrorMiddleare = async (error: ErrorHandling, req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(error.status).json({
      message: error.message,
      status: error.status,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

export { ErrorMiddleare }
