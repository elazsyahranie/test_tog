const { Vehicles } = require('@models');

module.exports = async (req, res) => {
  try {
    const getVehicle = await Vehicles.findAll({ raw: true });
    if (!getVehicle.length) {
      return res.status(404).json({
        message: 'Not found!',
      });
    }

    return res.status(201).json({
      status: 'success',
      data: getVehicle,
    });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      return res.status(500).json({
        status: 'error',
        message: 'Service unavailable',
      });
    } else {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
};
