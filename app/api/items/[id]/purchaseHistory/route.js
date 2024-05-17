import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

// api/items/2/purchaseHistory
export async function GET(request, params) {
  try {
    const { id } = params;
    const purchaseHistory = await repo.getPurchaseHistory(id);
    return NextResponse.json({ purchaseHistory });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}
