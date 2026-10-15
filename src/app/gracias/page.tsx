"use client";

import { useSyncExternalStore } from "react";
import Button from "@/components/ui/Button";
import { PILOT_FOLLOW_UP } from "@/lib/constants";
import { readStoredLead, thankYouMessage } from "@/lib/pilotForm";

const safeSessionStorage = () => {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

// The stored lead never changes while the page is open, so there is
// nothing to subscribe to.
const subscribe = () => () => {};
const genericMessage = () => thankYouMessage(null, PILOT_FOLLOW_UP);
const storedMessage = () => thankYouMessage(readStoredLead(safeSessionStorage()), PILOT_FOLLOW_UP);

export default function GraciasPage() {
  // Server HTML shows the generic line; the personalised one replaces it
  // after hydration when the form stored the lead in this tab.
  const message = useSyncExternalStore(subscribe, storedMessage, genericMessage);

  return (
    <section className="min-h-[80vh] flex items-center bg-bg pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 style={{ textTransform: "none" }} className="font-heading text-3xl md:text-5xl font-bold leading-tight text-ink">
          {message}
        </h1>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/demo" variant="gold">
            Agendar demo
          </Button>
          <Button href="/" variant="outline">
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  );
}
