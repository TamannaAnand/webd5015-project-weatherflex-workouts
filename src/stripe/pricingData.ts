import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    unit_amount: 0 * 100,
    nickname: "Free",
    offers: ["1 AI-generated workout per request", "Basic weather insights"],
  },

  {
    id: "price_1R9uLNFKB8VC7JUesluQLACp",
    unit_amount: 19.99 * 100,
    nickname: "Premium",
    offers: [
      "All Basic Plan features",
      "Workout tracking",
      "Personalized recommendations",
      "Advanced weather insights",
    ],
  },
];
