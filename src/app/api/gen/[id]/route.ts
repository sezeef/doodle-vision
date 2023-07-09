import { NextRequest, NextResponse } from "next/server";
import { API, API_TOKEN } from "../route";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`${API}/${params.id}`, {
    headers: {
      Authorization: `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  const prediction = await response.json();

  if (response.status !== 200) {
    return NextResponse.json(prediction.detail);
  }

  return NextResponse.json(prediction);
}
