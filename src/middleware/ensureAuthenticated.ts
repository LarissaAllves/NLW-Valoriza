import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //receber o token

  //Verificar se o token é válido
  const authtoken = request.headers.authorization;
  if (!authtoken) {
    return response.status(401).end();
  }
  const [, token] = authtoken.split(" ");

  try {
    //validar se o token esta preenchido
    const { sub } = verify(
      token,
      "40305fde45b0287b9275ec1a46d8ab38"
    ) as IPayload;

    //Recuperar informações do usuario
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
