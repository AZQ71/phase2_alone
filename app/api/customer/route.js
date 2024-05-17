import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET() {
  try {
    const customers = await repo.getCustomers();
    return NextResponse.json({ customers }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}


export async function POST(request) {
    try {
      const body = await request.json();
      const customer = await repo.addCustomer(body);
      return NextResponse.json({ customer }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.error({ message: error.message }, { status: 500 });
    }
  }
