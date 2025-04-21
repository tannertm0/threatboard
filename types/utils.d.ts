// Type declarations for utils module
declare module '@/lib/utils' {
  /**
   * Converts a string to a URL-friendly slug
   * @param text The text to convert to a slug
   * @returns A URL-friendly slug
   */
  export function slugify(text: string): string;
  
  /**
   * Merges class names with Tailwind CSS classes
   * @param inputs Class names to merge
   * @returns Merged class names
   */
  export function cn(...inputs: any[]): string;
} 