import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET(request, { params }) {
  try {
    const { username } = params;
    const user = await repo.getUser2(username);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { username } = params;
    // console.log(username);
    const user = await request.json();
    // console.log(user);
    await repo.updateUser(username, user);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
