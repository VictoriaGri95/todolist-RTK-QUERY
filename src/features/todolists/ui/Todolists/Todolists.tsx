import { useGetTodolistsQuery } from "@/features/todolists/api/todolistsApi"
import Grid from "@mui/material/Grid"
import { TodolistItem } from "./TodolistItem/TodolistItem"
import { TodolistSkeleton } from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx"
import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles"
import { DragDropProvider } from "@dnd-kit/react"
import { useEffect, useState } from "react"

export const Todolists = () => {
  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {})
  const [items, setItems] = useState(todolists ?? [])

  useEffect(() => {
    if (todolists) {
      setItems(todolists)
    }
  }, [todolists])

  const handleDragEnd = (event: any) => {
    if (event.canceled) return

    const { source, target } = event.operation
    if (!target || source.id === target.id) return

    const oldIndex = items.findIndex((i) => i.id === source.id)
    const newIndex = items.findIndex((i) => i.id === target.id)

    if (oldIndex === -1 || newIndex === -1) return

    const updated = [...items]
    const [moved] = updated.splice(oldIndex, 1)
    updated.splice(newIndex, 0, moved)

    setItems(updated)
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
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {items.map((todolist) => (
            <Grid key={todolist.id}>
              <TodolistItem todolist={todolist} />
            </Grid>
          ))}
        </div>
      </DragDropProvider>
    </>
  )
}
