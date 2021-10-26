import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    //vERIFICAR SE O EMAIL EXISTE

    const userRepositories = getCustomRepository(UsersRepositories);
    const user = await userRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    //SE EXISTE VERIFICAR SE A SENHA ESTA CORRETA

    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("Email/Password incorrect");
    }

    //GERAR O ToKEN

    const token = sign(
      {
        email: user.email,
      },
      "40305fde45b0287b9275ec1a46d8ab38",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
