import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET(request, { params }) {
  try {
    const { username } = params;
    const customer = await repo.getCustomer(username);
    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request, { params }) {
  try {
    const { username } = params;
    const balance = await repo.getBalance(username);
    return NextResponse.json({ customer_Balance : balance }, { status: 200 });

  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { username } = params;
    const customer = await request.json();
    await repo.updateCustomer(username, customer);
    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
