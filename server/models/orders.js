import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    order_no: {
      type: DataTypes.STRING(7),
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('ord_no')
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    totalprice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(9),
      allowNull: true,
      defaultValue: "OPEN"
    }
  }, {
    sequelize,
    tableName: 'orders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "orders_pkey",
        unique: true,
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
  }
}
