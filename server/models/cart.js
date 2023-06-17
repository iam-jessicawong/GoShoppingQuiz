import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cart extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    cart: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cart',
    schema: 'public',
    timestamps: false
  });
  }
}
