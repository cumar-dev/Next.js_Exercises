import { connectDB } from "@/app/lib/Todo.lib";
import Todo from "@/app/Model/Todo.model";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          message: "ID not passed yet",
        },
        {
          status: 400,
        },
      );
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return NextResponse.json(
        {
          message: "Todo not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Todo found",
        todo,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("error", error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  try {
    await connectDB();
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "ID not pass yet",
        },
        {
          status: 400,
        },
      );
    }
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
    const todo = await Todo.findByIdAndUpdate(
      id,
      {
        title: title,
        completed: completed,
        status: status,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return NextResponse.json(
      {
        message: "todo updated not yet...",
        todo: todo,
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

export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "ID not pass yet",
        },
        {
          status: 400,
        },
      );
    }
    const todo = await Todo.findByIdAndDelete(id);
    return NextResponse.json(
      {
        message: "TODO deleted successfully...",
        todo: todo,
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
