exports.success = (message, data) => {
  return {
    message,
    data,
  };
};

exports.sendError = (res, status, message, error) => {
  return res.status(status).json({ message, error });
};
