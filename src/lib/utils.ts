/**
 * @fileoverview Utility Functions
 * @description Core utility functions used throughout the application.
 *              Includes className merging with Tailwind support.
 * 
 * @module lib/utils
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - Merge class names with Tailwind CSS conflict resolution
 * 
 * Combines clsx (conditional classes) with tailwind-merge (Tailwind conflict resolution).
 * Use this instead of raw template strings for className construction.
 * 
 * Features:
 * - Handles conditional classes (via clsx)
 * - Resolves Tailwind conflicts (later classes win)
 * - Filters out falsy values
 * 
 * @function
 * @example
 * // Basic usage
 * cn("px-4 py-2", "bg-primary", className)
 * 
 * @example
 * // Conditional classes
 * cn("base-class", isActive && "active-class", variant === "large" && "text-lg")
 * 
 * @example
 * // Tailwind conflict resolution (later wins)
 * cn("px-4", "px-8") // => "px-8"
 * cn("text-red-500", "text-blue-500") // => "text-blue-500"
 * 
 * @param {...ClassValue[]} inputs - Class values to merge
 * @returns {string} Merged className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
