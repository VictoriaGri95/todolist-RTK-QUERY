import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const faqItems = [
  {
    question: "Что это за приложение?",
    answer:
      "Это приложение для управления списками задач, где можно создавать тудулисты и работать с задачами внутри них.",
  },
  {
    question: "Нужно ли авторизоваться для работы с задачами?",
    answer: "Да. Основной экран со списками задач доступен только после входа в систему.",
  },
  {
    question: "Можно ли создать несколько списков задач?",
    answer: "Да, приложение поддерживает создание нескольких отдельных тудулистов.",
  },
  {
    question: "Можно ли редактировать и удалять задачи?",
    answer: "Да, задачи можно изменять, отмечать выполненными и удалять.",
  },
] as const

export const FAQ = () => {
  return (
    <Container maxWidth={"md"}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: "center" }}>
        FAQ
      </Typography>

      <Stack spacing={3}>
        {faqItems.map((item) => (
          <Paper key={item.question} elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {item.question}
            </Typography>
            <Typography variant="body1">{item.answer}</Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  )
}
