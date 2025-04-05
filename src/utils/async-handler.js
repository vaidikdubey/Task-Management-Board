//To avoid using try catch every time we use async handlers
function asyncHandler(requestHandler) {
  return function (req, res, next) {
    Promise.resolve(requestHandler(req, res, next)).catch(function (err) {
      next(err);
    });
  };
}

export { asyncHandler };
