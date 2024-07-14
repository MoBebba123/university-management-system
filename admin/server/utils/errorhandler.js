const ErrorHandler = (message, status) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

export default ErrorHandler;
