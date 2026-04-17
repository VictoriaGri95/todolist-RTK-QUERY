import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useAddTaskMutation } from "@/features/todolists/api/tasksApi"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "@/features/todolists/lib/types"
import Paper from "@mui/material/Paper"
import { useDraggable, useDroppable } from "@dnd-kit/react"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [addTask] = useAddTaskMutation()

  const { ref: dragRef } = useDraggable({
    id: todolist.id,
  })

  const { ref: dropRef } = useDroppable({
    id: todolist.id,
  })

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  return (
    <div ref={dropRef}>
      <Paper ref={dragRef} sx={{ p: "0 20px 20px 20px", cursor: "grab" }}>
        <TodolistTitle todolist={todolist} />
        <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"} />
        <Tasks todolist={todolist} />
        <FilterButtons todolist={todolist} />
      </Paper>
    </div>
  )
}