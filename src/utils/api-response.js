class ApiResponse {
  constructor(statusCode, data, message = "Success!!") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; //Validation implemented by checking if the status code is < 400
  }
}

export { ApiResponse };
