import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Order form submission endpoint
  app.post("/api/order", async (req, res) => {
    try {
      const { name, phone, email, comment } = req.body;

      if (!name || !phone || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

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

      res.json({ success: true, message: "Order submitted successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  return httpServer;
}
