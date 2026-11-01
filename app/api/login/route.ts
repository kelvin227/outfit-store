import { NextResponse } from "next/server";
import { Login } from "@/lib/actions";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid request body" },
            { status: 400 },
        );
    }

    if (!body || typeof body !== "object") {
        return NextResponse.json(
            { success: false, message: "Email and password are required" },
            { status: 403 },
        );
    }

    const { email, password } = body as Record<string, unknown>;
    if (
        typeof email !== "string" ||
        !email.trim() ||
        typeof password !== "string" ||
        !password
    ) 
    {

        return NextResponse.json(
            { success: false, message: "Email and password are required" },
            { status: 402 },
        );
    }

    const result = await Login(email.trim(), password);

    if (!result.success) {
        return NextResponse.json(
            { success: false, message: result.message },
            { status: result.message === "User does not exist" ? 409 : 500 },
        );
    }

    return NextResponse.json(
        { success: true, message: result.message, },
        { status: 201 },
    );
}

