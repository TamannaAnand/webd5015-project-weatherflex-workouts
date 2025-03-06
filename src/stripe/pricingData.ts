import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    unit_amount: 0 * 100,
    nickname: "Free",
    offers: ["1 AI-generated workout per request", "Basic weather insights"],
  },
  {
    id: "price_1Qzfe0FKB8VC7JUerpGTuwKe",
    unit_amount: 1 * 100,
    nickname: "Basic",
    offers: [
      "2 AI-generated workouts per request",
      "Daily weather-based fitness tips",
      "Custom workout preferences",
    ],
  },
  {
    id: "price_1QzfkQFKB8VC7JUeTvmH6wxv",
    unit_amount: 2 * 100,
    nickname: "Premium",
    offers: [
      "All Basic Plan features",
      "Workout tracking",
      "Personalized recommendations",
      "Advanced weather insights",
    ],
  },
];
