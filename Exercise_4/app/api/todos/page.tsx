import { connectDB } from "@/app/lib/Todo.lib";
import Todo from "@/app/Model/Todo.model";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const todo = await Todo.find().sort({ createdAt: -1 });
    console.log("get todo from mongodb", todo);
    if (!todo) {
      return NextResponse.json(
        {
          messsage: "failed to load all todos",
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        todo: todo,
        message: "Todo Loaded successfully...",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      {
        message: "server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { title, completed, status } = await req.json();
    if (!title || typeof completed !== "boolean" || !status) {
      return NextResponse.json(
        {
          message: "fill the fiels",
        },
        {
          status: 400,
        },
      );
    }

    const todo = await Todo.create({
      title: title,
      completed: completed,
      status: status
    })

    if(!todo) {
        return NextResponse.json({
            message: "Todo not created yet"
        },
        {
            status: 400
        }
    )
    }
    return NextResponse.json({
        message: "TODO created successfully...",
        todo: todo
    },
    {
        status: 200
    }
)
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      {
        message: "server error",
      },
      {
        status: 500,
      },
    );
  }
}
