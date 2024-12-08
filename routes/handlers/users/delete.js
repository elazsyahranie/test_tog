const { Users } = require('@models');

module.exports = async (req, res) => {
  try {
    const { user } = req.params;
    const { force } = req.query;

    await Users.findOne({
      attributes: ['id'],
      where: { id: user },
      raw: true,
      paranoid: false,
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
      });

    const sqlOptions = {};
    sqlOptions.where = { id: user };
    if (force) sqlOptions.force = true;

    await Users.destroy(sqlOptions);

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
