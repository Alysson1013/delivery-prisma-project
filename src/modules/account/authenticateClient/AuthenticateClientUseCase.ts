import { prisma } from "../../../database/PrismaClient";
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken'

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ password, username }: IAuthenticateClient){
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client){
            throw new Error("Username or password invalid")
        }

        const passwordMatch = await compare(password, client.password)

        if (!passwordMatch){
            throw new Error("Username or password invalid")
        }

        const token = sign({ username }, "1b2b8034e18e905f47b5cbf629f197517031405b", {
            subject: client.id,
            expiresIn: "1d"
        })

        return token
    }
}