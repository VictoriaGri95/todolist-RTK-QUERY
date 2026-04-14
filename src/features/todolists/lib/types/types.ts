import { RequestStatus } from "@/common/types"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"