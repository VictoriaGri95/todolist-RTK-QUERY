import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm"
import { useAddTaskMutation } from "@/features/todolists/api/tasksApi"
import { FilterButtons } from "./FilterButtons/FilterButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { DomainTodolist } from "@/features/todolists/lib/types"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Paper from "@mui/material/Paper"

type Props = {
  todolist: DomainTodolist
}

export const TodolistItem = ({ todolist }: Props) => {
  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: todolist.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Paper
        {...attributes}
        {...listeners}
        sx={{ p: 2, cursor: "grab" }}
      >
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
        </Paper>
    </div>
  )
}
