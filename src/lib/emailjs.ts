"use client";

import emailjs from "@emailjs/browser";
import { EMAILJS } from "@/lib/constants";

export async function sendContactEmail(form: HTMLFormElement) {
  return emailjs.sendForm(
    EMAILJS.serviceId,
    EMAILJS.templateId,
    form,
    EMAILJS.publicKey
  );
}
