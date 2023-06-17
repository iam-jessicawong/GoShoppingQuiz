import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class order_line_item extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ord_line_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    prod_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'products',
        key: 'prod_id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'order_line_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_line_item_pkey",
        unique: true,
        fields: [
          { name: "ord_line_id" },
        ]
      },
    ]
  });
  }
}
