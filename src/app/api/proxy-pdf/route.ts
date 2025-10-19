export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return new Response("Missing fileId parameter", { status: 400 });
  }

  try {
    const response = await fetch(`https://drive.google.com/uc?export=pdf&id=${fileId}`);

    if (!response.ok) {
      return new Response("Failed to fetch PDF", { status: response.status });
    }

    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(message, { status: 500 });
  }
}
