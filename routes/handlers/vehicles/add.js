const { Vehicles } = require('../../../models');
const { Op } = require('sequelize');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      type_vehicle: { type: 'string', empty: 'false' },
      code_vehicle: { type: 'string', max: 22, empty: 'false' },
      vehicle_number: { type: 'string', max: 10, empty: 'false' },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate,
      });
    }

    const { type_vehicle, code_vehicle, vehicle_number } = req.body;

    const type_vehicle_values = Vehicles.rawAttributes.type_vehicle.values;
    if (!type_vehicle_values.includes(type_vehicle)) {
      return res.status(400).json({
        message: 'Invalid value!',
      });
    }

    const findDuplicate = await Vehicles.findOne({
      where: { [Op.or]: { type_vehicle, code_vehicle, vehicle_number } },
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

    await Vehicles.create({ type_vehicle, code_vehicle, vehicle_number });

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
