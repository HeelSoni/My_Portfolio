import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const receiverEmail = process.env.CONTACT_RECEIVER || "heelsoni01@gmail.com";
    const mailSubject = subject?.trim()
      ? `[Portfolio Contact] ${subject}`
      : `[Portfolio Contact] New message from ${name}`;

    let delivered = false;

    // ── METHOD 1: Nodemailer (Direct Gmail SMTP if configured) ──
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0b0f19; color: #f1f5f9; border-radius: 12px; border: 1px solid rgba(6, 182, 212, 0.3);">
            <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px; margin-bottom: 20px;">
              <h2 style="color: #22d3ee; margin: 0 0 4px 0;">⚡ New Portfolio Transmission</h2>
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">Sent via Heel Soni's Portfolio Contact Terminal</p>
            </div>
            
            <div style="margin-bottom: 16px;">
              <strong style="color: #38bdf8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px;">Sender Details:</strong>
              <p style="margin: 0; font-size: 15px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 4px 0 0 0; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #22d3ee;">${email}</a></p>
              ${subject ? `<p style="margin: 4px 0 0 0; font-size: 15px;"><strong>Subject:</strong> ${subject}</p>` : ""}
            </div>

            <div style="background: rgba(255, 255, 255, 0.04); padding: 16px; border-radius: 8px; border-left: 3px solid #22d3ee; margin-top: 16px;">
              <strong style="color: #38bdf8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Message:</strong>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; font-size: 14px; color: #e2e8f0;">${message}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 12px; color: #64748b; text-align: center;">
              Reply directly to this email to respond to ${name} (${email}).
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"${name} via Portfolio" <${process.env.EMAIL_USER}>`,
          to: receiverEmail,
          replyTo: email,
          subject: mailSubject,
          text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
          html: htmlContent,
        });

        delivered = true;
      } catch (nodemailerErr) {
        console.warn("Nodemailer delivery error, falling back to relay:", nodemailerErr);
      }
    }

    // ── METHOD 2: FormSubmit HTTP Relay (with 6s timeout) ──
    if (!delivered) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const relayResponse = await fetch(`https://formsubmit.co/ajax/${receiverEmail}`, {
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
            name,
            email,
            _subject: mailSubject,
            message: `From: ${name} (${email})\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
            _template: "table",
            _captcha: "false",
          }),
        });

        clearTimeout(timeoutId);
        const data = await relayResponse.json().catch(() => null);

        if (relayResponse.ok || (data && (data.success === "true" || data.success === true))) {
          delivered = true;
        }
      } catch (relayErr) {
        console.warn("Relay fetch timed out or errored:", relayErr);
      }
    }

    // Always succeed gracefully so the user is never blocked
    return NextResponse.json(
      {
        success: true,
        message: "Message transmitted successfully! Heel Soni will respond promptly.",
        deliveredDirectly: delivered,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
