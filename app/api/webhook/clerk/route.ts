import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "@/db/index";
import { users, carts, cartItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || "";
  
  if (!webhookSecret) {
    console.error("Error: Missing CLERK_WEBHOOK_SECRET");
    return new Response("Error: Missing CLERK_WEBHOOK_SECRET", {
      status: 500,
    });
  }

  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the webhook payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    try {
      // Create user in database
      await db.insert(users).values({
        id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        profileImage: image_url,
        isAdmin: false, // Default to non-admin
      });

      // Create an empty cart for the user
      await db.insert(carts).values({
        userId: id,
      });

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error creating user in database:", error);
      return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    try {
      // Update user in database
      await db.update(users)
        .set({
          email: email_addresses[0].email_address,
          firstName: first_name,
          lastName: last_name,
          profileImage: image_url,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id as string));

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error updating user in database:", error);
      return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      // The CASCADE will handle deleting associated carts and cart items
      await db.delete(users).where(eq(users.id, id as string));

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting user from database:", error);
      return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
    }
  }

  // Return a response for any other event types
  return NextResponse.json({ success: true });
}