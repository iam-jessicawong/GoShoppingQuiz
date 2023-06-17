import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
