export class ErrorHandling extends Error {
  public readonly message: string
  public readonly status: number

  constructor(message: string, status: number) {
    super()
    ;(this.message = message), (this.status = status)
  }
}
