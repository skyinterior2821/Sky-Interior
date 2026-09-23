export type PropertyType = "Full Home" | "Kitchen" | "Wardrobe" | "Living Room" | "Bedroom" | "Multiple Spaces";
export type HomeSize = "1 BHK" | "2 BHK" | "3 BHK" | "4 BHK+";
export type RoomType = "Kitchen" | "Living Room" | "Master Bedroom" | "Bedroom" | "Wardrobe" | "Study" | "Dining" | "Bathroom";
export type FinishLevel = "Standard" | "Premium" | "Luxury";
export type AddonType = "Additional Storage" | "Lighting Package" | "TV Unit" | "Study Area" | "Custom Feature Wall";

export interface CalculatorState {
  propertyType: PropertyType | null;
  homeSize: HomeSize | null;
  rooms: RoomType[];
  finishLevel: FinishLevel | null;
  addons: AddonType[];
  areaSqFt?: number | null;
}

export interface LineItem {
  id: string;
  label: string;
  amount: number;
}

export interface CalculationResult {
  isComplete: boolean;
  subtotal: number;
  breakdown: LineItem[];
  total: number;
  assumptions: string[];
}

const BASE_COSTS = {
  "Full Home": 0, // Calculated via Home Size
  "Kitchen": 200000,
  "Wardrobe": 80000,
  "Living Room": 150000,
  "Bedroom": 120000,
  "Multiple Spaces": 0 // Calculated via Rooms
};

const HOME_SIZE_COSTS: Record<HomeSize, number> = {
  "1 BHK": 500000,
  "2 BHK": 800000,
  "3 BHK": 1200000,
  "4 BHK+": 1800000,
};

const ROOM_COSTS: Record<RoomType, number> = {
  "Kitchen": 200000,
  "Living Room": 150000,
  "Master Bedroom": 140000,
  "Bedroom": 120000,
  "Wardrobe": 80000,
  "Study": 75000,
  "Dining": 60000,
  "Bathroom": 100000,
};

const FINISH_MULTIPLIERS: Record<FinishLevel, number> = {
  "Standard": 1.0,
  "Premium": 1.3,
  "Luxury": 1.7,
};

const ADDON_COSTS: Record<AddonType, number> = {
  "Additional Storage": 60000,
  "Lighting Package": 45000,
  "TV Unit": 50000,
  "Study Area": 40000,
  "Custom Feature Wall": 35000,
};

export function calculateEstimate(state: CalculatorState): CalculationResult {
  const breakdown: LineItem[] = [];
  let baseAmount = 0;

  // 1. Base Scope
  if (state.propertyType === "Full Home" && state.homeSize) {
    baseAmount = HOME_SIZE_COSTS[state.homeSize];
    breakdown.push({ id: "base", label: `${state.homeSize} Base Scope`, amount: baseAmount });
  } else if (state.propertyType === "Multiple Spaces" && state.rooms.length > 0) {
    let roomTotal = 0;
    state.rooms.forEach(room => {
      roomTotal += ROOM_COSTS[room];
    });
    baseAmount = roomTotal;
    breakdown.push({ id: "base", label: `Selected Rooms (${state.rooms.length})`, amount: baseAmount });
  } else if (state.propertyType && state.propertyType !== "Full Home" && state.propertyType !== "Multiple Spaces") {
    baseAmount = BASE_COSTS[state.propertyType];
    breakdown.push({ id: "base", label: `${state.propertyType} Base Scope`, amount: baseAmount });
  }

  // 2. Finish Level Multiplier
  let finishPremium = 0;
  if (state.finishLevel && baseAmount > 0) {
    const multiplier = FINISH_MULTIPLIERS[state.finishLevel];
    if (multiplier > 1.0) {
      finishPremium = Math.round(baseAmount * (multiplier - 1.0));
      breakdown.push({ id: "finish", label: `${state.finishLevel} Material Upgrade`, amount: finishPremium });
    }
  }

  let subtotal = baseAmount + finishPremium;

  // 3. Add-ons
  let addonsTotal = 0;
  if (state.addons.length > 0) {
    state.addons.forEach(addon => {
      addonsTotal += ADDON_COSTS[addon];
    });
    breakdown.push({ id: "addons", label: `Options & Add-ons (${state.addons.length})`, amount: addonsTotal });
  }

  const total = subtotal + addonsTotal;

  // Check if calculation is conceptually complete enough to display
  const isComplete = Boolean(
    state.propertyType && 
    (state.propertyType !== "Full Home" || state.homeSize) &&
    (state.propertyType !== "Multiple Spaces" || state.rooms.length > 0)
  );

  return {
    isComplete,
    subtotal,
    breakdown,
    total,
    assumptions: [
      "Prices are purely indicative and for planning purposes only.",
      "Final cost varies based on actual site dimensions and civil work required.",
      "Material choices and hardware brands will impact the final quotation."
    ]
  };
}

export function formatCurrency(amount: number): string {
  if (amount === 0) return "₹0";
  // Convert to Lakhs for readability if > 1,00,000
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    // Format to 1 or 2 decimal places, rounding appropriately
    return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)}L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
