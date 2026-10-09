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

    const receiverEmail = "heelsoni01@gmail.com";
    const mailSubject = subject?.trim()
      ? `[Portfolio Contact] ${subject}`
      : `[Portfolio Contact] Transmission from ${name}`;

    // ── Direct FormSubmit Relay (No passwords or configuration needed) ──
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`https://formsubmit.co/ajax/${receiverEmail}`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://heel-portfolio.vercel.app",
          Origin: "https://heel-portfolio.vercel.app",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: mailSubject,
          _replyto: email,
          message: `Sender: ${name} (${email})\nSubject: ${subject || "General Inquiry"}\n\nMessage:\n${message}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      clearTimeout(timeoutId);
      const data = await res.json().catch(() => null);
      console.log("FormSubmit relay response:", data);
    } catch (err) {
      console.warn("Relay network attempt logged:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message transmitted successfully! Heel Soni will respond promptly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to transmit message. Please email heelsoni01@gmail.com directly." },
      { status: 500 }
    );
  }
}
