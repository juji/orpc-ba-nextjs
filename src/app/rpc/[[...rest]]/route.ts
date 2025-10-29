import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import { auth } from "@/lib/auth";
import { orpcRouter } from "@/lib/orpc";

const handler = new OpenAPIHandler(orpcRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

async function handleRequest(request: Request) {
  // Extract user session from Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { response } = await handler.handle(request, {
    prefix: "/rpc",
    context: {
      user: session?.user,
      session,
    }, // Provide authenticated user context
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
