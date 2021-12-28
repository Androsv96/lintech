const { DataTypes, UUIDV1 } = require('sequelize');
const { sequelize } = require('../../services/sequelize');

const PurchasesModel = sequelize.define('purchases', {
  purchaseId: {
    type: DataTypes.UUID,
    defaultValue: UUIDV1,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = PurchasesModel;
