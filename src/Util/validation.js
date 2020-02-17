export const isValidEmail = email => {
  return !!email && email.indexOf("@") > 0 && email.length > 3;
};
