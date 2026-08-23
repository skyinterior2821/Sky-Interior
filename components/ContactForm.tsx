'use client';

import { useState } from "react";
import { Button } from "@/components/ui";

// Google Apps Script Web App URL for form submission
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyrXGwSxW6AOzOJUQZA-b5SNKptlMy_YcFoMdmju9LtKb1LCIarSkUv50-4BB07UVH6/exec";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      if (GOOGLE_SCRIPT_URL === "YOUR_WEB_APP_URL_HERE") {
        throw new Error("Please add your Google Script URL to the code first.");
      }

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Required for Google Apps Script to avoid CORS errors
      });

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-surface/50 border border-border/50 rounded-3xl p-8 text-center space-y-4">
        <h3 className="font-serif text-[length:var(--text-h3)] text-ink">Thank you!</h3>
        <p className="text-ink-muted font-light">We&apos;ve received your inquiry and will be in touch shortly.</p>
        <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-12" onSubmit={handleSubmit}>
      <div className="relative group mt-8">
        <input 
          type="text" 
          id="name" 
          name="name"
          required 
          pattern="^[A-Za-z\s]+$" 
          title="Only letters and spaces are allowed. No numbers or special characters." 
          className="peer w-full bg-transparent border-b border-border/60 py-4 text-ink focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:border-accent-deep transition-colors placeholder-transparent" 
          placeholder="Name" 
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
          }}
        />
        <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-ink-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent-deep peer-focus:uppercase peer-focus:tracking-widest cursor-text">Name</label>
      </div>
      
      <div className="relative group mt-8">
        <input 
          type="email" 
          id="email" 
          name="email"
          required 
          className="peer w-full bg-transparent border-b border-border/60 py-4 text-ink focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:border-accent-deep transition-colors placeholder-transparent" 
          placeholder="Email" 
        />
        <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-ink-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent-deep peer-focus:uppercase peer-focus:tracking-widest cursor-text">Email Address</label>
      </div>

      <div className="relative group mt-8">
        <input 
          type="tel" 
          id="phone" 
          name="phone"
          required 
          maxLength={10}
          pattern="^[0-9]{10}$" 
          title="Please enter exactly 10 digits." 
          className="peer w-full bg-transparent border-b border-border/60 py-4 text-ink focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:border-accent-deep transition-colors placeholder-transparent" 
          placeholder="Phone Number" 
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
          }}
        />
        <label htmlFor="phone" className="absolute left-0 -top-3.5 text-sm text-ink-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent-deep peer-focus:uppercase peer-focus:tracking-widest cursor-text">Phone Number</label>
      </div>
      
      <div className="relative group mt-8">
        <input 
          type="text" 
          id="project" 
          name="project"
          required 
          className="peer w-full bg-transparent border-b border-border/60 py-4 text-ink focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:border-accent-deep transition-colors placeholder-transparent" 
          placeholder="Project Type & Location" 
        />
        <label htmlFor="project" className="absolute left-0 -top-3.5 text-sm text-ink-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent-deep peer-focus:uppercase peer-focus:tracking-widest cursor-text">Project Type & Location (e.g. Residential, Ahmedabad)</label>
      </div>
      
      <div className="relative group mt-8">
        <textarea 
          id="details" 
          name="details"
          rows={4} 
          required 
          className="peer w-full bg-transparent border-b border-border/60 py-4 text-ink focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:border-accent-deep transition-colors placeholder-transparent resize-none" 
          placeholder="Details" 
        />
        <label htmlFor="details" className="absolute left-0 -top-3.5 text-sm text-ink-muted transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent-deep peer-focus:uppercase peer-focus:tracking-widest cursor-text">Project Details & Budget Range</label>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" variant="solid" disabled={isSubmitting} className="bg-ink text-surface px-12 py-5 rounded-full hover:bg-accent transition-colors duration-500 w-full lg:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </Button>
    </form>
  );
}
