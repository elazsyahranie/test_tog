const { Vehicles, LocationHistories, Counters } = require('../../../models');
const { fn, literal } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  let location_id;
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

    let countRows = await LocationHistories.findAll({
      attributes: ['location_id'],
      raw: true,
    });
    countRows = countRows.length;

    function convertToPaddedNumber(number, totalDigits) {
      const numberStr = (number + 1).toString();
      if (numberStr.length < totalDigits) {
        return numberStr.padStart(totalDigits, '0');
      }
      return numberStr;
    }

    const paddedNumber = convertToPaddedNumber(countRows, 4);
    location_id = `${new Date()
      .toISOString()
      .split('T')[0]
      .replace(/[^a-zA-Z0-9 ]/g, '')}-${paddedNumber}`;

    let { location } = req.body;
    location = location.split(' ');
    location = fn(
      'ST_PointFromText',
      literal(`'POINT(${parseFloat(location[0])} ${parseFloat(location[1])})'`),
    );

    const { vehicle_id } = req.body;
    const checkVehicleId = await Vehicles.findOne({
      attributes: ['id'],
      where: { id: vehicle_id },
      raw: true,
    });
    if (!checkVehicleId) {
      return res.status(404).json({
        message: 'Vehicle not found!',
      });
    }

    await LocationHistories.create({ location_id, ...req.body, location });

    const counterId = uuidv4()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .slice(0, 10);

    const checkCounter = await Counters.findOne({ raw: true });
    countRows = countRows + 1;
    if (!checkCounter) {
      await Counters.create({ id: counterId, last_number: countRows });
    } else {
      await Counters.update(
        { last_number: countRows },
        { where: { id: checkCounter.id } },
      );
    }

    return res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    if (location_id) {
      await LocationHistories.destroy({ where: { location_id } }).catch(
        (err) => {
          console.log(err);
        },
      );
    }

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
