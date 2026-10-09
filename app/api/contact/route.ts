import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Log the contact submission
    console.log("Transmission received:", {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: subject || "No Subject",
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully. Heel Soni will respond promptly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to transmit message. Please try again or use direct email." },
      { status: 500 }
    );
  }
}
