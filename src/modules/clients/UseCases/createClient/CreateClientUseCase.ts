import { prisma } from "../../../../database/PrismaClient";
import { hash } from 'bcrypt'
 
interface ICreateClient {
    username: string;
    password: string;
}

export class CreateClientUseCase {
    async execute({ password, username }: ICreateClient){
        const clientExists = await prisma.clients.findUnique({
            where: {
                username
            }
        })

        if (clientExists){
            throw new Error("Client already exists!")
        }

        const hashPassword = await hash(password, 10)

        const client = await prisma.clients.create({
            data: {
                username,
                password: hashPassword
            }
        })

        return client
    }
}