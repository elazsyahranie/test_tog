const { LocationHistories } = require('../../../models');
const { fn, literal } = require('sequelize');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      vehicle_id: {
        type: 'number',
        positive: true,
        empty: 'false',
        integer: true,
      },
      direction: {
        type: 'number',
        positive: true,
        empty: 'false',
        integer: true,
      },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate,
      });
    }

    let { location } = req.body;
    location = location.split(' ');
    location = fn(
      'ST_PointFromText',
      literal(`'POINT(${parseFloat(location[0])} ${parseFloat(location[1])})'`),
    );

    await LocationHistories.create({ ...req.body, location });

    return res.status(201).json({
      status: 'success',
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
