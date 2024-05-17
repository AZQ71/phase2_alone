import { getSellHistory } from "../../../../lib/repo.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const items = await getSellHistory(id);
    return NextResponse.json({ items: items });
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting seller items" },
      { status: 500 }
    );
  }
}

// Route to POST items that have been sold by a seller
export async function POST(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const item = await updateSellHistory(id, body);
    return NextResponse.json({ message: "Successful sale", item: item });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding sold item" },
      { status: 500 }
    );
  }
}
