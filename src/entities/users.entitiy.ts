import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TodoModel } from "./todo.entitiy"

@Entity({
  name: "users",
})
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 63,
    nullable: false,
  })
  first_name: string

  @Column({
    length: 100,
    nullable: false,
  })
  last_name: string

  @Column({
    length: 100,
    nullable: false,
  })
  email: string

  @Column({
    length: 100,
    nullable: false,
  })
  password: string

  @OneToMany(() => TodoModel, (todo) => todo.users)
  todos: TodoModel[]
}
