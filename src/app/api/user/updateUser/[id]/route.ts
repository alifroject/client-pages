import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function PUT(req: NextRequest,
    { params }: { params: { id: string } }) {


    try {
        const userId = parseInt(params.id);

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: "Invalid user ID" },
                { status: 400 }
            );
        }
        // Parse the incoming request body
        const body = await req.json()

        // Validate required fields
        if (!body.name || !body.email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            )
        }
        // Update the user
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                name: body.name,
                email: body.email
                // Add other fields you want to update
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json(
            { error: "Failed to update user" },
            { status: 500 }
        )
    }

}