import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

const smtpPort = parseInt(process.env.SMTP_PORT || "465");
const isSecure = smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: isSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

console.log(`[SMTP] Configured: host=${process.env.SMTP_HOST || "NOT SET"}, port=${smtpPort}, secure=${isSecure}, user=${process.env.SMTP_USER || "NOT SET"}`);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/health/smtp", async (_req, res) => {
    const smtpConfig = {
      host: process.env.SMTP_HOST ? "set" : "NOT SET",
      port: smtpPort,
      user: process.env.SMTP_USER ? "set" : "NOT SET",
      password: process.env.SMTP_PASSWORD ? "set" : "NOT SET",
      sessionSecret: process.env.SESSION_SECRET ? "set" : "NOT SET",
    };

    let smtpStatus = "unknown";
    try {
      await transporter.verify();
      smtpStatus = "connected";
    } catch (err: any) {
      smtpStatus = `error: ${err.message}`;
      console.error("[SMTP] Diagnostics check failed:", err.message);
    }

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      smtp: {
        config: smtpConfig,
        connection: smtpStatus,
      },
    });
  });

  app.post("/api/order", async (req, res) => {
    try {
      const { name, phone, email, comment } = req.body;

      if (!name || !phone || !email) {
        console.error("[ORDER] Missing required fields:", { name: !!name, phone: !!phone, email: !!email });
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log(`[ORDER] New order from: ${name}, ${email}, ${phone}`);

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: `Новая заявка с сайта МООС от ${name}`,
        html: `
          <h2>Новая заявка с сайта</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Комментарий:</strong> ${comment || "Не указан"}</p>
          <hr>
          <p><em>Отправлено с сайта МООС</em></p>
        `,
      };

      await transporter.sendMail(mailOptions);

      console.log(`[ORDER] Email sent successfully for order from ${name}`);
      res.json({ success: true, message: "Order submitted successfully" });
    } catch (error: any) {
      console.error("[ORDER] Failed to send email:");
      console.error("[ORDER] Error name:", error.name);
      console.error("[ORDER] Error message:", error.message);
      console.error("[ORDER] Error code:", error.code);
      if (error.command) console.error("[ORDER] SMTP command:", error.command);
      if (error.response) console.error("[ORDER] SMTP response:", error.response);
      if (error.responseCode) console.error("[ORDER] SMTP response code:", error.responseCode);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  return httpServer;
}
