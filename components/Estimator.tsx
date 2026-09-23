"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui";
import { 
  CalculatorState, 
  PropertyType, 
  HomeSize, 
  RoomType, 
  FinishLevel, 
  AddonType, 
  calculateEstimate, 
  formatCurrency 
} from "@/lib/calculator";
import { useRouter, useSearchParams } from "next/navigation";

const PROPERTY_OPTIONS: PropertyType[] = ["Full Home", "Kitchen", "Wardrobe", "Living Room", "Bedroom", "Multiple Spaces"];
const SIZE_OPTIONS: HomeSize[] = ["1 BHK", "2 BHK", "3 BHK", "4 BHK+"];
const ROOM_OPTIONS: RoomType[] = ["Kitchen", "Living Room", "Master Bedroom", "Bedroom", "Wardrobe", "Study", "Dining", "Bathroom"];
const FINISH_OPTIONS: { level: FinishLevel; desc: string }[] = [
  { level: "Standard", desc: "Balanced materials and practical finishes." },
  { level: "Premium", desc: "More refined finishes and expanded customization." },
  { level: "Luxury", desc: "Higher-end finish selections and greater customization." }
];
const ADDON_OPTIONS: AddonType[] = ["Additional Storage", "Lighting Package", "TV Unit", "Study Area", "Custom Feature Wall"];

const STEP_IDS = ["property", "scope", "finish", "addons", "result"] as const;
type StepId = typeof STEP_IDS[number];

export function Estimator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL if present, otherwise default
  const [state, setState] = useState<CalculatorState>(() => {
    return {
      propertyType: (searchParams.get("type") as PropertyType) || null,
      homeSize: (searchParams.get("size") as HomeSize) || null,
      rooms: searchParams.get("rooms") ? (searchParams.get("rooms")?.split(",") as RoomType[]) : [],
      finishLevel: (searchParams.get("tier") as FinishLevel) || null,
      addons: searchParams.get("addons") ? (searchParams.get("addons")?.split(",") as AddonType[]) : [],
    };
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Sync state to URL without reloading
  useEffect(() => {
    const params = new URLSearchParams();
    if (state.propertyType) params.set("type", state.propertyType);
    if (state.homeSize) params.set("size", state.homeSize);
    if (state.rooms.length > 0) params.set("rooms", state.rooms.join(","));
    if (state.finishLevel) params.set("tier", state.finishLevel);
    if (state.addons.length > 0) params.set("addons", state.addons.join(","));
    
    // Only update if we have meaningful state to avoid noisy history
    if (params.toString()) {
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [state, router]);

  const calcResult = calculateEstimate(state);
  const currentStepId = STEP_IDS[currentStepIndex];

  const handleNext = () => {
    let nextIndex = currentStepIndex + 1;
    // Skip "scope" step if property type is a singular room
    if (STEP_IDS[nextIndex] === "scope" && state.propertyType && !["Full Home", "Multiple Spaces"].includes(state.propertyType)) {
      nextIndex++;
    }
    if (nextIndex < STEP_IDS.length) {
      setCurrentStepIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    let prevIndex = currentStepIndex - 1;
    if (STEP_IDS[prevIndex] === "scope" && state.propertyType && !["Full Home", "Multiple Spaces"].includes(state.propertyType)) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      setCurrentStepIndex(prevIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setState({
      propertyType: null,
      homeSize: null,
      rooms: [],
      finishLevel: null,
      addons: []
    });
    setCurrentStepIndex(0);
    router.push("?", { scroll: false });
  };

  const isStepValid = () => {
    if (currentStepId === "property") return state.propertyType !== null;
    if (currentStepId === "scope") {
      if (state.propertyType === "Full Home") return state.homeSize !== null;
      if (state.propertyType === "Multiple Spaces") return state.rooms.length > 0;
      return true; // Single rooms skipped anyway
    }
    if (currentStepId === "finish") return state.finishLevel !== null;
    return true; // addons optional
  };

  const renderStepContent = () => {
    switch (currentStepId) {
      case "property":
        return (
          <div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-12 leading-[1.1]">What are you designing?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PROPERTY_OPTIONS.map(opt => {
                const isSelected = state.propertyType === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setState(s => ({ ...s, propertyType: opt, homeSize: null, rooms: [] }));
                      setTimeout(() => handleNext(), 400);
                    }}
                    className={`group relative p-8 text-left border transition-all duration-500 flex justify-between items-start ${
                      isSelected 
                        ? 'border-[var(--color-ink)] bg-[var(--color-paper)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-surface-muted)]'
                    }`}
                    aria-selected={isSelected}
                    role="radio"
                  >
                    <span className="font-serif text-2xl text-[var(--color-ink)]">{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-4 ${
                      isSelected ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-ink)]'
                    }`}>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 5L4 7L8 3" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case "scope":
        if (state.propertyType === "Full Home") {
          return (
            <div>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-12 leading-[1.1]">What is the size of your home?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {SIZE_OPTIONS.map(opt => {
                  const isSelected = state.homeSize === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setState(s => ({ ...s, homeSize: opt }));
                        setTimeout(() => handleNext(), 400);
                      }}
                      className={`group relative p-8 text-left border transition-all duration-500 flex justify-between items-start ${
                        isSelected 
                          ? 'border-[var(--color-ink)] bg-[var(--color-paper)]'
                          : 'border-[var(--color-border)] hover:border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-surface-muted)]'
                      }`}
                      aria-selected={isSelected}
                      role="radio"
                    >
                      <span className="font-serif text-2xl text-[var(--color-ink)]">{opt}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-4 ${
                        isSelected ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-ink)]'
                      }`}>
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 5L4 7L8 3" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }
        if (state.propertyType === "Multiple Spaces") {
          return (
            <div>
              <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-[1.1]">Select spaces to design</h2>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-12">{state.rooms.length} spaces selected</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ROOM_OPTIONS.map(opt => {
                  const isSelected = state.rooms.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        setState(s => {
                          const newRooms = isSelected 
                            ? s.rooms.filter(r => r !== opt)
                            : [...s.rooms, opt];
                          return { ...s, rooms: newRooms };
                        });
                      }}
                      className={`group relative p-8 text-left border transition-all duration-500 flex justify-between items-start ${
                        isSelected 
                          ? 'border-[var(--color-ink)] bg-[var(--color-paper)]'
                          : 'border-[var(--color-border)] hover:border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-surface-muted)]'
                      }`}
                      aria-selected={isSelected}
                      role="checkbox"
                    >
                      <span className="font-serif text-2xl text-[var(--color-ink)]">{opt}</span>
                      <div className={`w-5 h-5 border flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-4 ${
                        isSelected ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-ink)]'
                      }`}>
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 5L4 7L8 3" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }
        return null;

      case "finish":
        return (
          <div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-12 leading-[1.1]">Select your material finish</h2>
            <div className="flex flex-col gap-6">
              {FINISH_OPTIONS.map(opt => {
                const isSelected = state.finishLevel === opt.level;
                return (
                  <button
                    key={opt.level}
                    onClick={() => {
                      setState(s => ({ ...s, finishLevel: opt.level }));
                      setTimeout(() => handleNext(), 400);
                    }}
                    className={`group relative p-8 md:p-10 text-left border transition-all duration-500 flex justify-between items-start ${
                      isSelected 
                        ? 'border-[var(--color-ink)] bg-[var(--color-paper)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-surface-muted)]'
                    }`}
                    aria-selected={isSelected}
                    role="radio"
                  >
                    <div>
                      <span className="block font-serif text-3xl mb-4 text-[var(--color-ink)]">
                        {opt.level}
                      </span>
                      <span className="block font-sans text-lg font-light leading-relaxed text-[var(--color-ink-muted)] max-w-lg">
                        {opt.desc}
                      </span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-4 mt-2 ${
                      isSelected ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-ink)]'
                    }`}>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 5L4 7L8 3" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case "addons":
        return (
          <div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-[var(--color-ink)] mb-6 leading-[1.1]">Any optional additions?</h2>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-12">Select any extras (Optional)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ADDON_OPTIONS.map(opt => {
                const isSelected = state.addons.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setState(s => {
                        const newAddons = isSelected 
                          ? s.addons.filter(a => a !== opt)
                          : [...s.addons, opt];
                        return { ...s, addons: newAddons };
                      });
                    }}
                    className={`group relative p-8 text-left border transition-all duration-500 flex justify-between items-start ${
                      isSelected 
                        ? 'border-[var(--color-ink)] bg-[var(--color-paper)]'
                        : 'border-[var(--color-border)] hover:border-[var(--color-ink)] bg-transparent hover:bg-[var(--color-surface-muted)]'
                    }`}
                    aria-selected={isSelected}
                    role="checkbox"
                  >
                    <span className="font-serif text-2xl text-[var(--color-ink)]">{opt}</span>
                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors duration-500 flex-shrink-0 ml-4 ${
                      isSelected ? 'border-[var(--color-accent)] bg-[var(--color-accent)]' : 'border-[var(--color-border)] group-hover:border-[var(--color-ink)]'
                    }`}>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 5L4 7L8 3" stroke="var(--color-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case "result":
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-accent)] block mb-6">Your Indicative Estimate</span>
            <h2 className="font-serif text-[clamp(3.5rem,5vw,5rem)] text-[var(--color-ink)] mb-4 leading-none">
              {formatCurrency(calcResult.total)}
            </h2>
            <p className="text-[var(--color-ink-muted)] font-light text-lg mb-12">
              Based on your selections
            </p>

            <div className="bg-[var(--color-paper)] p-8 md:p-12 border-t border-[var(--color-ink)] mb-12">
              <div className="space-y-6">
                {calcResult.breakdown.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex justify-between items-end border-b border-[var(--color-border)] pb-4">
                    <span className="font-sans text-lg font-light text-[var(--color-ink)]">{item.label}</span>
                    <span className="font-serif text-2xl text-[var(--color-ink)]">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-end pt-4">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink)]">Indicative Estimate</span>
                  <span className="font-serif text-3xl text-[var(--color-ink)]">{formatCurrency(calcResult.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--color-surface-muted)] p-8 border border-[var(--color-border)] mb-12">
              <p className="font-sans text-sm text-[var(--color-ink)] font-medium mb-2">Important Disclaimer</p>
              <p className="font-sans text-sm text-[var(--color-ink-muted)] font-light leading-relaxed">
                Prices are purely indicative and for planning purposes only. This is not a final quotation or a guaranteed price.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                href={`/consultation?type=${state.propertyType || ""}&tier=${state.finishLevel || ""}`}
                className="w-full sm:w-auto px-10 py-5 uppercase tracking-[0.2em] text-[10px] font-medium bg-[var(--color-ink)] text-[var(--color-surface)] hover:bg-[var(--color-accent-deep)]"
              >
                Discuss Your Project
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
      {/* LEFT: Main Steps */}
      <div className="lg:col-span-8 flex flex-col min-h-[500px]">
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar">
            {STEP_IDS.map((id, index) => {
              const isActive = index === currentStepIndex;
              const isPast = index < currentStepIndex;
              return (
                <div key={id} className="flex items-center gap-4">
                  <span className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-[var(--color-ink)] font-medium' : isPast ? 'text-[var(--color-ink-muted)]' : 'text-[var(--color-border-strong)]'}`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  {index < STEP_IDS.length - 1 && (
                    <span className={`w-8 h-px transition-colors duration-500 ${isPast ? 'bg-[var(--color-ink-muted)]' : 'bg-[var(--color-border-strong)] opacity-30'}`} />
                  )}
                </div>
              );
            })}
          </div>
          <button 
            onClick={handleReset}
            className="text-[10px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] tracking-[0.2em] uppercase transition-colors ml-8 flex-shrink-0"
          >
            Reset
          </button>
        </div>

        {/* Step Content */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Summary */}
        {currentStepId !== "result" && calcResult.total > 0 && (
          <div className="block lg:hidden border-t border-[var(--color-border)] pt-8 mt-12">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] block mb-2">
              Your Current Estimate
            </span>
            <div className="font-serif text-3xl text-[var(--color-ink)]">
              {formatCurrency(calcResult.total)}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        {currentStepId !== "result" && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--color-border)]">
            <div>
              {currentStepIndex > 0 ? (
                <button 
                  onClick={handleBack}
                  className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors py-4 px-2 -ml-2"
                >
                  ← Back
                </button>
              ) : <div />}
            </div>
            <button 
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`font-sans text-[10px] tracking-[0.2em] uppercase transition-colors py-4 px-2 -mr-2 ${
                isStepValid() ? 'text-[var(--color-ink)] hover:text-[var(--color-accent)]' : 'text-[var(--color-border-strong)] cursor-not-allowed'
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* RIGHT: Persistent Summary (Desktop) */}
      <div className="lg:col-span-4 relative hidden lg:block">
        <div className="sticky top-40 bg-[var(--color-paper)] p-10 border-t border-[var(--color-ink)]">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] block mb-8">
            Your Configuration
          </span>
          
          <div className="font-serif text-4xl text-[var(--color-ink)] mb-10">
            {formatCurrency(calcResult.total)}
          </div>

          <div className="space-y-4 text-sm font-light">
            {state.propertyType && (
              <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                <span className="text-[var(--color-ink-muted)]">Property</span>
                <span className="text-[var(--color-ink)] text-right">{state.propertyType}</span>
              </div>
            )}
            {state.homeSize && state.propertyType === "Full Home" && (
              <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                <span className="text-[var(--color-ink-muted)]">Size</span>
                <span className="text-[var(--color-ink)] text-right">{state.homeSize}</span>
              </div>
            )}
            {state.rooms.length > 0 && state.propertyType === "Multiple Spaces" && (
              <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                <span className="text-[var(--color-ink-muted)]">Spaces</span>
                <span className="text-[var(--color-ink)] text-right">{state.rooms.length} selected</span>
              </div>
            )}
            {state.finishLevel && (
              <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                <span className="text-[var(--color-ink-muted)]">Finish</span>
                <span className="text-[var(--color-ink)] text-right">{state.finishLevel}</span>
              </div>
            )}
            {state.addons.length > 0 && (
              <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
                <span className="text-[var(--color-ink-muted)]">Add-ons</span>
                <span className="text-[var(--color-ink)] text-right">{state.addons.length} selected</span>
              </div>
            )}
          </div>

          {!calcResult.isComplete && (
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mt-10">
              Continue configuring...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
