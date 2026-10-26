'use client';

import { useState } from "react";
import { siteConfig } from "@/lib/site";

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

    // Honeypot anti-spam check
    const honeypot = formData.get("website");
    if (honeypot && honeypot.toString().trim() !== "") {
      // Quietly succeed without sending spam to Google Sheet
      setIsSuccess(true);
      form.reset();
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Required for Google Apps Script to avoid CORS errors
      });

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please reach out to us directly via WhatsApp or phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] p-8 text-center space-y-4 rounded-sm">
        <h3 className="font-serif text-2xl text-[#1C1B19]">Thank you</h3>
        <p className="font-sans text-sm text-[#736F69] font-light leading-relaxed max-w-md mx-auto">
          We have received your project details. Harshit or Palak will be in touch within 24 to 48 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 px-6 py-2.5 border border-[#1C1B19] text-[#1C1B19] text-xs uppercase tracking-wider rounded-sm hover:bg-[#1C1B19] hover:text-[#F5F2EC] transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {/* Honeypot field for bot protection */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="relative group">
        <input 
          type="text" 
          id="name" 
          name="name"
          required 
          pattern="^[A-Za-z\s]+$" 
          title="Only letters and spaces are allowed." 
          className="peer w-full bg-transparent border-b border-[#E5DFD5] py-3 text-sm text-[#1C1B19] focus:outline-none focus:border-[#9C5B3F] transition-colors placeholder-transparent" 
          placeholder="Name" 
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^A-Za-z\s]/g, '');
          }}
        />
        <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-[#736F69] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9C5B3F] cursor-text">
          Your Name *
        </label>
      </div>
      
      <div className="relative group">
        <input 
          type="tel" 
          id="phone" 
          name="phone"
          required 
          maxLength={10}
          pattern="^[0-9]{10}$" 
          title="Please enter a valid 10-digit mobile number." 
          className="peer w-full bg-transparent border-b border-[#E5DFD5] py-3 text-sm text-[#1C1B19] focus:outline-none focus:border-[#9C5B3F] transition-colors placeholder-transparent" 
          placeholder="Phone Number" 
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
          }}
        />
        <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-[#736F69] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9C5B3F] cursor-text">
          Mobile Number (10 digits) *
        </label>
      </div>

      <div className="relative group">
        <input 
          type="email" 
          id="email" 
          name="email"
          required 
          className="peer w-full bg-transparent border-b border-[#E5DFD5] py-3 text-sm text-[#1C1B19] focus:outline-none focus:border-[#9C5B3F] transition-colors placeholder-transparent" 
          placeholder="Email Address" 
        />
        <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-[#736F69] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9C5B3F] cursor-text">
          Email Address *
        </label>
      </div>

      <div className="relative group">
        <input 
          type="text" 
          id="project" 
          name="project"
          required 
          className="peer w-full bg-transparent border-b border-[#E5DFD5] py-3 text-sm text-[#1C1B19] focus:outline-none focus:border-[#9C5B3F] transition-colors placeholder-transparent" 
          placeholder="Project Type & City" 
        />
        <label htmlFor="project" className="absolute left-0 -top-3.5 text-xs text-[#736F69] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9C5B3F] cursor-text">
          Project Type &amp; City (e.g. 3BHK Apartment, Ahmedabad) *
        </label>
      </div>
      
      <div className="relative group">
        <textarea 
          id="details" 
          name="details"
          rows={4} 
          required 
          className="peer w-full bg-transparent border-b border-[#E5DFD5] py-3 text-sm text-[#1C1B19] focus:outline-none focus:border-[#9C5B3F] transition-colors placeholder-transparent resize-none" 
          placeholder="Tell us about your space" 
        />
        <label htmlFor="details" className="absolute left-0 -top-3.5 text-xs text-[#736F69] transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9C5B3F] cursor-text">
          Project Details, Timeline &amp; Budget Parameters *
        </label>
      </div>
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-[#1C1B19] text-[#F5F2EC] hover:bg-[#9C5B3F] transition-colors px-10 py-4 text-xs uppercase tracking-wider font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>

        <p className="font-sans text-xs text-[#736F69]">
          Prefer direct messaging?{" "}
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1C1B19] underline hover:text-[#9C5B3F]"
          >
            WhatsApp us
          </a>
        </p>
      </div>
    </form>
  );
}
