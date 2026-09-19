import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact";
import { site } from "@/content/site";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Please check the form", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;
  // Honeypot filled: pretend success so bots don't retry.
  if (data.website) return Response.json({ ok: true });

  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Company", data.company],
    ["Service", data.service],
  ];
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${data.message}`;
  const html =
    rows.filter(([, v]) => v).map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v!)}</p>`).join("") +
    `<p style="white-space:pre-wrap">${escape(data.message)}</p>`;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;

  // Without SMTP configured (local dev), log the enquiry instead of sending it.
  if (!SMTP_HOST) {
    console.log("[contact] SMTP_HOST not set; enquiry not emailed:\n" + text);
    return Response.json({ ok: true, simulated: true });
  }

  try {
    const port = Number(SMTP_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    await transporter.sendMail({
      from: CONTACT_FROM ?? SMTP_USER ?? site.email,
      to: CONTACT_TO ?? site.email,
      replyTo: data.email,
      subject: `New enquiry from ${data.name}${data.service ? ` · ${data.service}` : ""}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return Response.json({ ok: false, error: "Could not send your message. Please email us directly." }, { status: 502 });
  }
}
