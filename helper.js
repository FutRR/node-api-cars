exports.success = (message, data) => {
  return {
    message,
    data,
  };
};

exports.getUniqueId = (cars) => {
  const maxId = Math.max(...cars.map((car) => car.id));
  const uniqueId = maxId + 1;
  return uniqueId;
};
