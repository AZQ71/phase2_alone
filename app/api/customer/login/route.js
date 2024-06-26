import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const customer = await repo.getCustomerLogin(username, password);
    if (customer.error) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }
    return NextResponse.json({ customer }, { status: 200 });

  } catch (error) {
    console.log(error);
  }
}
// PUT function to update the users balance after a purchase
export async function PUT(request) {
  try {
    const { username, amount } = await request.json();
    const customer = await repo.updateBalance(username, amount);
    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}


