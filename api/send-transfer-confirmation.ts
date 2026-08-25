import "dotenv/config";
import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD" }).format(value);

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="220" height="58" viewBox="0 0 220 58" role="img" aria-label="Crédit Agricole du Maroc">
  <rect width="220" height="58" rx="8" fill="#006b4f"/>
  <g transform="translate(14 13)">
    <path d="M17 27c-7-2-12-7-14-14 8 0 14 4 17 10 0-8 3-14 9-20 4 7 2 15-4 20-2 2-5 4-8 4Z" fill="#70be44"/>
    <path d="M1 31h30" stroke="#e3313d" stroke-width="5" stroke-linecap="round"/>
  </g>
  <text x="56" y="23" fill="#b7d9cf" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="2">GROUPE</text>
  <text x="56" y="37" fill="#ffffff" font-family="Arial, sans-serif" font-size="14" font-weight="700">CRÉDIT AGRICOLE</text>
  <text x="56" y="49" fill="#b7d9cf" font-family="Arial, sans-serif" font-size="8" font-weight="700" letter-spacing="2">DU MAROC</text>
</svg>`;

const createEmailHtml = ({
  firstName,
  lastName,
  iban,
  swift,
  bankCode,
  amount,
  label,
}: {
  firstName: string;
  lastName: string;
  iban: string;
  swift: string;
  bankCode: string;
  amount: number;
  label?: string;
}) => {
  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeIban = escapeHtml(iban);
  const safeSwift = escapeHtml(swift);
  const safeBankCode = escapeHtml(bankCode);
  const safeLabel = escapeHtml(label || "Virement");
  const formattedAmount = escapeHtml(formatCurrency(amount));
  const date = new Intl.DateTimeFormat("fr-MA", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;background:#f3f7f5;color:#18332c;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased">
    <div style="padding:32px 16px">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #dceae5;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,78,58,.08)">
        <div style="height:6px;background:#e3313d"></div>
        <div style="padding:28px 32px;background:#006b4f">
          <img src="cid:cam-logo" width="220" height="58" alt="Crédit Agricole du Maroc" style="display:block;width:220px;height:58px;border:0" />
        </div>
        <div style="padding:32px">
          <div style="display:inline-block;padding:7px 11px;border-radius:999px;background:#eaf6f1;color:#006b4f;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase">Opération confirmée</div>
          <h1 style="margin:18px 0 10px;color:#153a30;font-size:26px;line-height:1.2">Votre virement a bien été enregistré</h1>
          <p style="margin:0;color:#5d746c;font-size:15px;line-height:1.7">Bonjour ${safeFirstName} ${safeLastName},</p>
          <p style="margin:12px 0 26px;color:#5d746c;font-size:15px;line-height:1.7">Nous vous confirmons la prise en compte de votre opération depuis votre espace bancaire Crédit Agricole du Maroc.</p>

          <div style="padding:22px;border:1px solid #dceae5;border-radius:14px;background:#fbfdfc">
            <div style="margin-bottom:14px;color:#006b4f;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">Détails de l’opération</div>
            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#71857e">Montant</td><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#153a30;text-align:right;font-size:18px;font-weight:700">${formattedAmount}</td></tr>
              <tr><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#71857e">Libellé</td><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#153a30;text-align:right;font-weight:600">${safeLabel}</td></tr>
              <tr><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#71857e">IBAN bénéficiaire</td><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#153a30;text-align:right;font-weight:600;word-break:break-all">${safeIban}</td></tr>
              <tr><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#71857e">Code banque</td><td style="padding:11px 0;border-bottom:1px solid #e8f0ed;color:#153a30;text-align:right;font-weight:600">${safeBankCode}</td></tr>
              <tr><td style="padding:11px 0;color:#71857e">Code SWIFT / BIC</td><td style="padding:11px 0;color:#153a30;text-align:right;font-weight:600">${safeSwift}</td></tr>
            </table>
          </div>

          <div style="margin-top:24px;padding:16px 18px;border-left:4px solid #e3313d;background:#fff7f7;border-radius:8px;color:#735157;font-size:13px;line-height:1.6">
            <strong style="color:#5b2931">Rappel de sécurité</strong><br />
            Le Crédit Agricole du Maroc ne vous demandera jamais votre code personnel ou vos codes de validation par email. En cas de doute, contactez directement votre agence.
          </div>
          <p style="margin:24px 0 0;color:#91a29c;font-size:12px;line-height:1.6">Opération enregistrée le ${escapeHtml(date)}. Cet email est généré automatiquement, merci de ne pas y répondre.</p>
        </div>
        <div style="padding:22px 32px;background:#f5faf8;border-top:1px solid #e3efeb;color:#71857e;font-size:12px;line-height:1.7">
          <strong style="color:#006b4f">Crédit Agricole du Maroc</strong><br />
          Votre banque, à vos côtés.<br />
          Pour toute question, contactez votre agence ou connectez-vous à votre espace bancaire sécurisé.
        </div>
      </div>
      <p style="max-width:640px;margin:16px auto 0;text-align:center;color:#a0afaa;font-size:11px">© 2026 Crédit Agricole du Maroc · Message confidentiel</p>
    </div>
  </body>
</html>`;
};

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
      from: `Crédit Agricole du Maroc <${fromAddress}>`,
      to: email,
      subject: "Confirmation de votre virement — Crédit Agricole du Maroc",
      text: [
        `Bonjour ${firstName} ${lastName},`,
        "",
        "Votre virement a bien été enregistré depuis votre espace Crédit Agricole du Maroc.",
        `Montant : ${formatCurrency(transferAmount)}`,
        `IBAN bénéficiaire : ${iban}`,
        `Code Swift / BIC : ${swift}`,
        `Code banque : ${bankCode}`,
        `Libellé : ${label || "Virement"}`,
        "",
        "Ne communiquez jamais vos codes personnels par email.",
        "Crédit Agricole du Maroc — Votre banque, à vos côtés.",
      ].join("\n"),
      html: createEmailHtml({ firstName, lastName, iban, swift, bankCode, amount: transferAmount, label }),
      attachments: [{ filename: "credit-agricole-du-maroc-logo.svg", content: logoSvg, contentType: "image/svg+xml", cid: "cam-logo" }],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("SMTP transfer confirmation error:", error);
    return res.status(502).json({ message: "L’email de confirmation n’a pas pu être envoyé." });
  }
}
