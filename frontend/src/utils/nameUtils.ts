/**
 * Utility functions for handling user names
 */

/**
 * Format user name to show only the last 2 parts if the name is long
 * @param fullName - The full name of the user
 * @returns Formatted name string
 */
export const formatDisplayName = (fullName: string): string => {
  if (!fullName) return "";

  // Split the name by spaces
  const nameParts = fullName.trim().split(/\s+/);

  // If name has 3 or more parts, show only the last 2
  if (nameParts.length >= 3) {
    return nameParts.slice(-2).join(" ");
  }

  // If name has 1 or 2 parts, show the full name
  return fullName;
};

/**
 * Get the full name for tooltip or detailed display
 * @param fullName - The full name of the user
 * @returns The full name as is
 */
export const getFullName = (fullName: string): string => {
  return fullName || "";
};
