const { Vehicles } = require('../../../models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    let { type_vehicle, code_vehicle, vehicle_number } = req.body;

    const type_vehicle_values = Vehicles.rawAttributes.type_vehicle.values;
    if (type_vehicle && !type_vehicle_values.includes(type_vehicle)) {
      return res.status(400).json({
        message: 'Invalid value!',
      });
    }

    const whereFilter = {};
    whereFilter.id = { [Op.not]: id };
    if (type_vehicle) whereFilter.type_vehicle = type_vehicle;
    if (code_vehicle) whereFilter.code_vehicle = code_vehicle;
    if (vehicle_number) whereFilter.vehicle_number = vehicle_number;

    const findDuplicate = await Vehicles.findOne({
      where: whereFilter,
      raw: true,
    });
    if (findDuplicate) {
      if (findDuplicate.code_vehicle === code_vehicle) {
        return res.status(409).json({
          message: 'Code vehicle already exists!',
        });
      }
      if (findDuplicate.vehicle_number === vehicle_number) {
        return res.status(409).json({
          message: 'Vehicle number already exists!',
        });
      }
    }

    const setData = {};
    if (type_vehicle) setData.type_vehicle = type_vehicle;
    if (code_vehicle) setData.code_vehicle = code_vehicle;
    if (vehicle_number) setData.vehicle_number = vehicle_number;

    await Vehicles.update(setData, { where: { id } });

    return res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
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
