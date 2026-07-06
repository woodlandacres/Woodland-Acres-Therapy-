// Vercel serverless function to forward contact form inquiries via ctomail.io
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, state, subject, contact_method, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields (name, email, message)" });
  }

  try {
    const response = await fetch("https://api.ctomail.io/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "woodland-acres-therapy-llc-af9ceb6d@ctomail.io",
        to: "weaveraemily@gmail.com",
        subject: `New Website Inquiry: ${subject || "General"} from ${name}`,
        body: `New inquiry from woodlandacrestherapy.com

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
State: ${state || "Not provided"}
Subject: ${subject || "General"}
Preferred Contact Method: ${contact_method || "Email"}

Message:
${message}

---
Sent via Woodland Acres Therapy contact form`,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "Unknown error");
      console.error("ctomail error:", response.status, errText);
      return res.status(500).json({ error: "Failed to send email" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Send inquiry error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}