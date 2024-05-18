import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET() {
  try {
    const sellers = await repo.getSellers();
    return NextResponse.json({ sellers }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}


export async function POST(request) {
    try {
      const body = await request.json();
      const seller = await repo.addSeller(body);
      return NextResponse.json({ seller }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.error({ message: error.message }, { status: 500 });
    }
  }
