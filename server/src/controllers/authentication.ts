import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

export function login(req: Request, res: Response) {
  const { username, password } = req.body
  if (username !== "admin" || password !== "admin") {
    return res.status(401).json({ error: "Usuário ou senha inválidos" })
  }

  const payload = { username: req.body.username }
  const token = jwt.sign(payload, JWT_SECRET)
  res.json({
    access_token: token,
  })
}

export function register(req: Request, res: Response) {
  res.send("register")
}
