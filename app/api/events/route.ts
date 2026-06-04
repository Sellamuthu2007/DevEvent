import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Event } from "@/database";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const contentType = req.headers.get("content-type") || "";
    let event;

    try {
      if (contentType.includes("application/json")) {
        event = await req.json();
      } else if (
        contentType.includes("multipart/form-data") ||
        contentType.includes("application/x-www-form-urlencoded")
      ) {
        const formData = await req.formData();
        event = Object.fromEntries(formData.entries());
      } else {
        return NextResponse.json(
          { message: "Unsupported Content-Type" },
          { status: 415 }
        );
      }
    } catch (e) {
      console.error(e);
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { messsage: "Event creation failed!", error: e instanceof Error ? e.message : "Unknown" },
      { status: 500 }
    );
  }
}
