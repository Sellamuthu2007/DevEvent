import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { error } from "console";
import { Event } from "@/database/event.model";
 

export async function POST(req:NextRequest){
    try{
        await connectToDatabase();

        const formData = await req.formData();

        let event;

        try{
            event = Object.fromEntries(formData.entries());
        }
        catch(e){
            console.error(e);
            return NextResponse.json({"message":"Invalid JSON format"},{status : 400});  
        }

        const createdEvent = await Event.create(event);

        return NextResponse.json({ message: "Event created successfully", event }, { status: 201 });        

    }
    catch(e){
        console.error(e);
        return NextResponse.json({messsage : "Event creation failed!",error : e instanceof Error ? e.message : "Unknown"});
        
    }
}