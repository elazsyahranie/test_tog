module.exports = (Sequelize, DataTypes) => {
  const Vehicles = Sequelize.define(
    'Vehicles',
    {
      id: {
        allowNull: false,
        unsigned: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      type_vehicle: {
        type: DataTypes.ENUM,
        values: ['car', 'truck', 'bus', 'van', 'motorcycle'],
        allowNull: false,
      },
      code_vehicle: {
        type: DataTypes.STRING(22),
      },
      vehicle_number: {
        type: DataTypes.STRING(10),
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'vehicles',
      timestamps: true,
    },
  );
  return Vehicles;
};
