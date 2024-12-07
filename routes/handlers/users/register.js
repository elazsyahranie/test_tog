const bcrypt = require('bcrypt');
const { Users } = require('@models');
const { Op } = require('sequelize');
const Validator = require('fastest-validator');
const v = new Validator();

const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  try {
    const schema = {
      email: { type: 'string', empty: 'false' },
      password: { type: 'string', min: 8, empty: 'false' },
      gender: { type: 'string', empty: 'false' },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate,
      });
    }

    const { email, password, gender } = req.body;
    const first_name = req.body.first;
    const last_name = req.body.last;
    const role = req.body.role || 'user';
    const country_phone = req.body.phone.substring(0, 3);
    const phone = req.body.phone.slice(3);
    const full_phone = `${country_phone} ${phone}`;

    const role_values = Users.rawAttributes.role.values;
    const gender_values = Users.rawAttributes.gender.values;
    if (
      !role_values.includes(role) ||
      (gender && !gender_values.includes(gender))
    ) {
      return res.status(400).json({
        message: 'Invalid value!',
      });
    }

    const userId = uuidv4();

    await Promise.all([
      Users.findOne({
        attributes: ['id'],
        where: { id: { [Op.not]: userId }, full_phone },
        raw: true,
      })
        .then((duplicate) => {
          if (duplicate)
            throw {
              response: {
                status: 409,
                data: {
                  status: 'error',
                  message: 'Phone number already used!',
                },
              },
            };
        })
        .catch((error) => {
          throw error;
        }),
      Users.findOne({
        attributes: ['id'],
        where: { email: req.body.email },
        raw: true,
      })
        .then((duplicate) => {
          if (duplicate)
            throw {
              response: {
                status: 409,
                data: {
                  status: 'error',
                  message: 'Email already exists!',
                },
              },
            };
        })
        .catch((error) => {
          throw error;
        }),
    ]);

    const hashedPassword = await bcrypt.hash(password, 10);

    const setData = {
      id: userId,
      first_name,
      last_name,
      full_name: `${first_name} ${last_name}`,
      password: hashedPassword,
      email,
      country_phone,
      phone,
      full_phone,
      role,
      gender,
    };

    await Users.create(setData);

    return res.status(201).json({
      status: 'success',
      userId,
      role,
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
