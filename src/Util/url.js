const hasWindow = () => {
  return typeof window !== "undefined" && window;
};

export const hasConfirmationTokenInHash = () =>
  hasWindow() &&
  window.location &&
  window.location.hash &&
  window.location.hash.indexOf("confirmation_token=") >= 0;

export const hasRecoveryTokenInHash = () =>
  hasWindow() &&
  window.location &&
  window.location.hash &&
  window.location.hash.indexOf("recovery_token=") >= 0;

export const getConfirmationTokenFromHash = () => {
  if (hasConfirmationTokenInHash()) {
    const hash = window.location.hash;
    return hash.substring(hash.indexOf("=") + 1);
  }
  return null;
};

export const getRecoveryTokenFromHash = () => {
  if (hasRecoveryTokenInHash()) {
    const hash = window.location.hash;
    return hash.substring(hash.indexOf("=") + 1);
  }
  return null;
};
