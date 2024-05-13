import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getColor(color: string) {
  switch(color) {
    case "Common":
      return {text: "text-common", border: "border-common", bg: "bg-common", shadow: "shadow-common"};
    case "Uncommon":
      return {text: "text-uncommon", border: "border-uncommon", bg: "bg-uncommon", shadow: "shadow-uncommon"};
    case "Rare":
      return {text: "text-rare", border: "border-rare", bg: "bg-rare", shadow: "shadow-rare"};
    case "Epic":
      return {text: "text-epic", border: "border-epic", bg: "bg-epic", shadow: "shadow-epic"};
    case "Legendary":
      return {text: "text-legendary", border: "border-legendary", bg: "bg-legendary", shadow: "shadow-legendary"};
    case "Special":
      return {text: "text-special", border: "border-special", bg: "bg-special", shadow: "shadow-special"};
    default:
      return {text: "text-black", border: "border-epic", bg: "bg-epic", shadow: "shadow-epic"};
  }
}