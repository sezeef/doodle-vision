import { type NextRequest, NextResponse } from "next/server";

export const API = "https://api.replicate.com/v1/predictions";
export const API_TOKEN = process.env.REPLICATE_API_TOKEN;
const MODEL_VERSION =
  "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117";

export async function POST(req: NextRequest) {
  const input = await req.json();

  const startPredictionRequest = await fetch(API, {
    method: "POST",
    headers: {
      Authorization: `Token ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input,
    }),
  });

  if (!startPredictionRequest.ok) {
    const error = await startPredictionRequest.json();
    return NextResponse.json({ error }, { status: 500 });
  }

  const startPredictionRequestBody = await startPredictionRequest.json();
  const outputId = startPredictionRequestBody.id;
  const status = startPredictionRequestBody.status;

  return NextResponse.json({ outputId, status }, { status: 201 });
}
