import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";



export async function GET() {
  try {
    const items = await repo.getItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const item = await repo.addItem(body);
    return NextResponse.json({ item });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}
