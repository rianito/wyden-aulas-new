import express from "express"
import { PORT } from "./config"

import aulasRoutes from "./routes/courses"
import authenticationRoutes from "./routes/authentication"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    res.status(200).send()
  } else {
    next()
  }
})

app.use("/api/aulas", aulasRoutes)
app.use("/api/auth", authenticationRoutes)

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "public" })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
