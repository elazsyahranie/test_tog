const bcrypt = require('bcrypt');
const { Users } = require('@models');
const { v4: uuidv4 } = require('uuid');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      email: { type: 'email', empty: 'false' },
      password: { type: 'string', min: 8, empty: 'false' },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate,
      });
    }
    const { email, password } = req.body;

    const findUser = await Users.findOne({
      attributes: ['id', 'role', 'password'],
      where: { email },
      raw: true,
    });
    if (!findUser) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }

    const isValidPassword = await bcrypt.compare(password, findUser.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Password is wrong!' });
    }

    return res.status(200).json({
      status: 'success',
      data: { id: findUser.id, role: findUser.role },
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
