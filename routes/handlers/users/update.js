const { Users } = require('@models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    const { user } = req.params;

    const first_name = req.body.first || findUser.first_name;
    const last_name = req.body.last || findUser.last_name;
    const full_name = `${first_name} ${last_name}`;
    const { email, gender, about } = req.body;

    const checkQueries = [];
    checkQueries.push(
      // Does user exists?
      Users.findOne({
        attributes: ['id', 'first_name', 'last_name'],
        where: { id: user },
        raw: true,
      })
        .then((res) => {
          if (!res) {
            throw {
              response: {
                status: 404,
                data: {
                  status: 'error',
                  message: 'User not found!',
                },
              },
            };
          }
        })
        .catch((err) => {
          throw err;
        }),
    );

    if (email) {
      checkQueries.push(
        Users.findOne({
          attributes: ['id'],
          where: { id: { [Op.not]: user }, email },
        })
          .then((res) => {
            if (res) {
              throw {
                response: {
                  status: 409,
                  data: {
                    status: 'error',
                    message: 'Email already used!',
                  },
                },
              };
            }
          })
          .catch((err) => {
            throw err;
          }),
      );
    }

    let country_phone;
    let phone;
    let full_phone;
    if (req.body.phone) {
      country_phone = req.body.phone.substring(0, 3);
      phone = req.body.phone.slice(3);
      full_phone = `${country_phone}${phone}`;

      // Is the phone number already used?
      checkQueries.push(
        Users.findOne({
          attributes: ['id'],
          where: { id: { [Op.not]: user }, full_phone },
          raw: true,
        })
          .then((res) => {
            if (res) {
              throw {
                response: {
                  status: 409,
                  data: {
                    status: 'error',
                    message: 'Phone number already used!',
                  },
                },
              };
            }
          })
          .catch((err) => {
            throw err;
          }),
      );
    } else {
      checkQueries.push(null);
    }

    await Promise.all(checkQueries);

    const setData = {};
    setData.first_name = first_name;
    setData.last_name = last_name;
    setData.full_name = full_name;
    if (email) {
      setData.email = email;
      setData.isVerified = false;
    }
    if (gender) {
      const gender_values = Users.rawAttributes.gender.values;
      if (!gender_values.include(gender)) {
        return res.status(400).json({
          message: 'Invalid value!',
        });
      }

      setData.gender = gender;
    }

    if (country_phone) setData.country_phone = country_phone;
    if (phone) setData.phone = phone;
    if (full_phone) setData.full_phone = full_phone;
    if (about) setData.about = about;

    await Users.update(setData, { where: { id: user } });

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
