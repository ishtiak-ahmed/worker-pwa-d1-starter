import { getDb } from "@/db";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const db = await getDb();
    const result = await db.select().from(items);

    return Response.json(result);
  } catch (error: any) {
    console.error("GET /api/items Error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch items from database" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const title = body?.title;

    if (!title || typeof title !== "string") {
      return Response.json(
        { error: "Item title is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const newItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    };

    await db.insert(items).values(newItem);
    return Response.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/items Error:", error);
    return Response.json(
      { error: error.message || "Failed to create item in database" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const id = body?.id;
    const completed = body?.completed;

    if (typeof id !== "string" || typeof completed !== "boolean") {
      return Response.json(
        { error: "Item ID (string) and completed (boolean) are required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    await db.update(items).set({ completed }).where(eq(items.id, id));
    return Response.json({ success: true });
  } catch (error: any) {
    console.error("PATCH /api/items Error:", error);
    return Response.json(
      { error: error.message || "Failed to update item in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Item ID is required" }, { status: 400 });
    }

    const db = await getDb();

    await db.delete(items).where(eq(items.id, id));
    return Response.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/items Error:", error);
    return Response.json(
      { error: error.message || "Failed to delete item from database" },
      { status: 500 }
    );
  }
}
