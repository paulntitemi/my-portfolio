import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  function validateEmail(e: string) {
    // basic validation
    return /\S+@\S+\.\S+/.test(e);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !message) {
      alert("Please provide your email and a message.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // EmailJS configuration from environment variables
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
    // Optional recipient override via env (so you can change recipient without editing code)
    const RECIPIENT = import.meta.env.VITE_CONTACT_RECIPIENT || "paulntitemi@gmail.com";

    // Basic runtime check for environment variables
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert(
        "EmailJS is not configured. Please ensure .env.local contains VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY, then restart the dev server."
      );
      console.warn("EmailJS env vars missing:", {
        hasService: Boolean(SERVICE_ID),
        hasTemplate: Boolean(TEMPLATE_ID),
        hasKey: Boolean(PUBLIC_KEY),
      });
      return;
    }

    // Log presence (do not log the actual secret values)
    console.debug("EmailJS configured:", {
      serviceId: SERVICE_ID ? "present" : "missing",
      templateId: TEMPLATE_ID ? "present" : "missing",
      publicKey: PUBLIC_KEY ? "present" : "missing",
    });

    const templateParams = {
      from_name: name || "Anonymous",
      from_email: email,
      // Provide multiple common recipient keys so the template picks up whichever name it expects
      to_email: RECIPIENT,
      to: RECIPIENT,
      recipient_email: RECIPIENT,
      to_email_address: RECIPIENT,
      to_name: "Paul Nti",
      // Helpful for templates that use reply_to
      reply_to: email,
      subject: subject || "Contact from portfolio website",
      message: message,
    };

    // Log the payload so you can inspect the Network request and confirm the template keys
    console.debug("EmailJS template params:", templateParams);

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      alert("Message sent — thank you! I'll get back to you soon.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      // Surface error details to help debugging
      console.error("EmailJS send error:", err);
      const status = err?.status || err?.statusCode || null;
      const text = err?.text || err?.message || JSON.stringify(err);
      alert(`EmailJS error${status ? ` (status ${status})` : ""}: ${text}`);

      // fallback to mailto if EmailJS fails
      const to = "paulntitemi@gmail.com";
      const mailSubject = subject || "Contact from portfolio website";
      const bodyLines = [`Name: ${name}`, `Email: ${email}`, "", message];
      const body = encodeURIComponent(bodyLines.join("\n"));
      const mailto = `mailto:${to}?subject=${encodeURIComponent(
        mailSubject
      )}&body=${body}`;
      // only fallback after user acknowledges the error alert
      window.location.href = mailto;
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your next project to life? Let's discuss how my expertise 
            in full-stack development and DevOps can help achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <h4>Email</h4>
                    <p className="text-muted-foreground">paulntitemi@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <h4>Phone</h4>
                    <p className="text-muted-foreground">+44 (793) 716-7634</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <h4>Location</h4>
                    <p className="text-muted-foreground">Available for Remote Work</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Your name"
                  />
                  <Input
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Your email"
                    required
                  />
                </div>
                <Input
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  aria-label="Subject"
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Your message"
                  required
                />
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}