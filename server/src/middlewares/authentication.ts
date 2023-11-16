import { Request, Response, NextFunction } from "express"
import { JWT_SECRET } from "../config"
import jwt from "jsonwebtoken"
import { AuthenticatedRequest } from "../types"

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1]

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403)
      }

      ; (req as AuthenticatedRequest).user = payload

      next()
    })
  } else {
    res.sendStatus(401)
  }
}

export default authenticateJWT
