import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET(request, {params}) {
  try {
    const { id } = params;
    const purchaseHistory = await repo.getPurchaseHistory(id);
    return NextResponse.json({ purchaseHistory }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}



