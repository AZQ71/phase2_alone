import { NextResponse } from "next/server";
import * as repo from "@/app/lib/repo";

export async function GET(request, { params }) {
  try {
    const  {id}  = params;
    const item = await repo.getItem(id);
    return NextResponse.json(item);
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const item = await repo.updateItem(id, body);
    return NextResponse.json({ item });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const item = await repo.deleteItem(id);
    return NextResponse.json({ item });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}

// // Route to get items currently being sold by a seller
// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
//     const items = await repo.getSellerItems(id);
//     return NextResponse.json({ items });
//   } catch (error) {
//     console.log(error);
//   }
// }

// Route to get items that have been sold by a seller
// export async function GET(request, { params }) {
//   try {
//     const { id } = params;
//     const items = await repo.getSoldItems(id);
//     return NextResponse.json({ items });
//   } catch (error) {
//     console.log(error);
//   }
// }
