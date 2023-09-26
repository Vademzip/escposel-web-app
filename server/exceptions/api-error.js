module.exports = class ApiError extends Error {
  constructor(status, message, type, errors) {
    super(message);
    this.status = status;
    this.type = type;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest(message, type = null, errors = []) {
    return new ApiError(400, message, type, errors);
  }

}