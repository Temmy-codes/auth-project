export const isValidEmail = (s) => /\S+@\S+\.\S+/.test(s);

export const isStrongPassword = (p) => {
  if (!p || p.length < 8) return false;
  if (!/[0-9]/.test(p)) return false;
  if (!/[A-Za-z]/.test(p)) return false;
  return true;
};
