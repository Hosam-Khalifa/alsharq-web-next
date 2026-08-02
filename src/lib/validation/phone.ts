/** International phone: optional +, digits/spaces/dashes/parentheses, 8–15 digits. */
export const INTERNATIONAL_PHONE_REGEX = /^\+?[\d\s().-]{8,20}$/;

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (!INTERNATIONAL_PHONE_REGEX.test(trimmed)) {
    return false;
  }

  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
