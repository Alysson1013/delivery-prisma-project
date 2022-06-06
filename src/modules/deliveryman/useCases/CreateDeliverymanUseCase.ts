import { hash } from "bcrypt";
import { prisma } from "../../../database/PrismaClient";

interface ICreateDeliverymanUseCase {
    username: string;
    password: string;
}

export class CreateDeliverymanUseCase {

    async execute({ username, password }: ICreateDeliverymanUseCase) {
        const deliverymanExists = await prisma.deliveryman.findUnique({
            where: {
                username
            }
        })

        if (deliverymanExists) {
            throw new Error("Deliveryman already exists!")
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