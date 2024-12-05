module.exports = (Sequelize, DataTypes) => {
  const Users = Sequelize.define(
    'Users',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        default: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false,
        validate: {
          isIn: {
            args: [['user', 'admin']],
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['male', 'female']],
          },
        },
      },
      about: {
        type: DataTypes.TEXT,
      },
      country_phone: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      full_phone: {
        type: DataTypes.STRING,
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
      deleted_at: {
        defaultValue: null,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      paranoid: true,
      deletedAt: 'deleted_at',
    },
  );
  //   Users.associate = (models) => {
  //     Users.hasMany(models.Skills, { foreignKey: 'id' });
  //     Users.hasMany(models.SkillExperiences, { foreignKey: 'id' });
  //     Users.hasMany(models.ForeignSkillsProjects, { foreignKey: 'skill_id' });
  //   };
  return Users;
};
