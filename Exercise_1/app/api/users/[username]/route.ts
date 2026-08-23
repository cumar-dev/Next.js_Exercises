import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export async function GET({ params }: Props) {
  const { username } = await params;

  return NextResponse.json({
    status: "success",
    username,
  });
}