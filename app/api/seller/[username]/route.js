import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET(request, { params }) {
  try {
    const { username } = params;
    const seller = await repo.getSeller(username);
    return NextResponse.json({ seller }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { username } = params;
    const seller = await request.json();
    await repo.updateSeller(username, seller);
    return NextResponse.json({ seller }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
