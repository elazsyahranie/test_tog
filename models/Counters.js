module.exports = (Sequelize, DataTypes) => {
  const Counters = Sequelize.define(
    'Counters',
    {
      id: {
        allowNull: false,
        unsigned: true,
        primaryKey: true,
        type: DataTypes.STRING(120),
      },
      updatedAt: {
        field: 'last_update',
        allowNull: false,
        type: DataTypes.DATE,
      },
      last_number: {
        type: DataTypes.BIGINT,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'counters',
      timestamps: true,
    },
  );
  return Counters;
};
