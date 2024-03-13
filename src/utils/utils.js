export const tryCatch = (f, errorHandler) => {
  try {
    return f();
  } catch (error) {
    return errorHandler(error);
  }
};

export const IfElse = (then, test, ELSE) => {
  if (test) return then();
  else return ELSE();
};
