import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class item_product extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cart_id: {
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'item_product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "item_product_pkey",
        unique: true,
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  });
  }
}
