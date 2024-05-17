import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const user = await repo.getUser(username, password);
    if (user.error) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

