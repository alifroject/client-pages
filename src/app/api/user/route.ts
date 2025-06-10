import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";


const prisma = new PrismaClient()


export async function POST(req: Request) {
    const { email, name } = await req.json()


    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })


    try {
        const user = await prisma.user.create({ data: { email, name } })
        return NextResponse.json(user)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}



export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(users)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })

    }
}