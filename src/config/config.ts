import path from "path"
import { DataSource } from "typeorm"
import { TodoModel } from "../entities/todo.entitiy"
import { UsersModel } from "../entities/users.entitiy"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "drona.db.elephantsql.com",
  password: "refH38UfOUaDBVuRxLYASKRfxyOv5TAR",
  port: 5432,
  username: "okxqmiwp",
  database: "okxqmiwp",
  entities: [UsersModel, TodoModel],
  migrations: [path.resolve(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: false,
  synchronize: true,
})

const SECRET_KEY = String(process.env.SECRET_KEY) || "(*‿*)"

export { AppDataSource, SECRET_KEY }

// psql postgres://okxqmiwp:refH38UfOUaDBVuRxLYASKRfxyOv5TAR@drona.db.elephantsql.com/okxqmiwp
