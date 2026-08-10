import "dotenv/config";
import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée." });
  }

  const { firstName, lastName, iban, swift, bankCode, amount, email, label } = req.body ?? {};
  const transferAmount = Number(amount);
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const fromAddress = process.env.SMTP_FROM || smtpUser;

  if (!firstName || !lastName || !iban || !swift || !bankCode || !email || !Number.isFinite(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({ message: "Les informations du virement sont incomplètes." });
  }

  if (!smtpUser || !smtpPassword || !fromAddress) {
    return res.status(503).json({
      message: "Le service email n’est pas configuré. Ajoutez SMTP_USER, SMTP_PASSWORD et SMTP_FROM dans Vercel.",
    });
  }

  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: smtpPort,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPassword },
  });

  try {
    await transporter.sendMail({
      from: `Groupe Crédit Agricole <${fromAddress}>`,
      to: email,
      subject: "Confirmation de votre virement",
      text: [
        `Bonjour ${firstName} ${lastName},`,
        "",
        "Votre virement a été effectué avec succès.",
        `Montant : ${formatCurrency(transferAmount)}`,
        `IBAN destinataire : ${iban}`,
        `Code Swift / BIC : ${swift}`,
        `Code banque : ${bankCode}`,
        `Libellé : ${label || "Virement"}`,
        "",
        "Merci de votre confiance.",
        "Groupe Crédit Agricole",
      ].join("\n"),
      html: `<div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#1f2937"><div style="padding:24px;background:#006b4f;color:#fff;border-radius:12px 12px 0 0"><strong>GROUPE CRÉDIT AGRICOLE</strong></div><div style="padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px"><h2>Confirmation de votre virement</h2><p>Bonjour ${firstName} ${lastName},</p><p>Votre virement a été effectué avec succès.</p><table style="border-collapse:collapse;width:100%"><tr><td style="padding:8px 0;color:#6b7280">Montant</td><td style="padding:8px 0;font-weight:bold">${formatCurrency(transferAmount)}</td></tr><tr><td style="padding:8px 0;color:#6b7280">IBAN destinataire</td><td style="padding:8px 0">${iban}</td></tr><tr><td style="padding:8px 0;color:#6b7280">Code Swift / BIC</td><td style="padding:8px 0">${swift}</td></tr><tr><td style="padding:8px 0;color:#6b7280">Code banque</td><td style="padding:8px 0">${bankCode}</td></tr><tr><td style="padding:8px 0;color:#6b7280">Libellé</td><td style="padding:8px 0">${label || "Virement"}</td></tr></table><p style="margin-top:24px">Merci de votre confiance.</p></div></div>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SMTP transfer confirmation error:", error);
    return res.status(502).json({ message: "L’email de confirmation n’a pas pu être envoyé." });
  }
}
