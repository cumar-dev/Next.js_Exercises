import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/Todo.lib";
import Todo from "@/app/Model/Todo.model";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          message: "No todos selected",
        },
        {
          status: 400,
        },
      );
    }

    const result = await Todo.deleteMany({
      _id: {
        $in: ids,
      },
    });

    return NextResponse.json(
      {
        message: "Todos deleted successfully",
        deletedCount: result.deletedCount,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Bulk delete error:", error);

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

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { ids, completed } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          message: "No todos selected",
        },
        {
          status: 400,
        },
      );
    }

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        {
          message: "Completed must be true or false",
        },
        {
          status: 400,
        },
      );
    }

    const result = await Todo.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        $set: {
          completed,
        },
      },
    );

    return NextResponse.json(
      {
        message: completed
          ? "Todos marked complete"
          : "Todos marked incomplete",
        modifiedCount: result.modifiedCount,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Bulk update error:", error);

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
