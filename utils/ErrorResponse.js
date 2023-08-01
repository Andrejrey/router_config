class ErrorResponse extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
  }
}

export default ErrorResponse;
