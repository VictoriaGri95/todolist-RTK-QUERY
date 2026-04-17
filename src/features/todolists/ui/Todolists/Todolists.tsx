import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles"
import { useEffect, useState } from "react"

import {
  closestCenter,
  DndContext,
  DragEndEvent, DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
    // pollingInterval: 3000,
    // skipPollingIfUnfocused: true,
  }) // автоматически повторять запросы через определённые интервалы времени
  const [items, setItems] = useState(todolists ?? [])
  const [activeItem, setActiveItem] = useState<any>(null)

  const sensors = useSensors(useSensor(PointerSensor))

  // sync API → local state
  useEffect(() => {
    if (todolists) {
      setItems(todolists)
    }
  }, [todolists])

  const handleDragStart = (event: DragStartEvent) => {
    const item = items.find((i) => i.id === event.active.id)
    setActiveItem(item)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      setActiveItem(null)
      return
    }

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    setItems((items) => arrayMove(items, oldIndex, newIndex))
    setActiveItem(null)
  }

  if (isLoading) {
    return (
      <Box sx={containerSx} style={{ gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </Box>
    )
  }
  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
          {todolists?.map((todolist) => (
            <Grid key={todolist.id}>
              <Paper sx={{ p: "0 20px 20px 20px" }}>
                <TodolistItem todolist={todolist} />
              </Paper>
            </Grid>
          ))}
        </SortableContext>
        <DragOverlay>
          {activeItem ? (
            <Paper sx={{ p: "20px", opacity: 0.8 }}>
              <TodolistItem todolist={activeItem} />
            </Paper>
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  )
}
