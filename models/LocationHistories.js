module.exports = (Sequelize, DataTypes) => {
  const LocationHistories = Sequelize.define(
    'LocationHistories',
    {
      location_id: {
        allowNull: false,
        unsigned: true,
        primaryKey: true,
        type: DataTypes.STRING(120),
      },
      vehicle_id: {
        allowNull: false,
        unsigned: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'vehicles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      location: {
        type: DataTypes.GEOMETRY('POINT'),
      },
      speed: {
        type: DataTypes.FLOAT(10, 6),
        defaultValue: 0,
      },
      direction: {
        type: DataTypes.FLOAT(10, 6),
        allowNull: false,
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
      tableName: 'location_histories',
      timestamps: true,
    },
  );
  return LocationHistories;
};
