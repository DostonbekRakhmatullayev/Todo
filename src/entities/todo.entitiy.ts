import { Column, Entity, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UsersModel } from "./users.entitiy"

@Entity({
  name: "todo",
})
export class TodoModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date

  @ManyToOne(() => UsersModel, (user) => user.todos)
  users: UsersModel
}
