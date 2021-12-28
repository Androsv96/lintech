const { Op } = require('sequelize');
const PurchasesModel = require('../routes/purchases/model');

const getPurchasesPerProduct = async (productId, date) => {
  const currentSales =
    (await PurchasesModel.sum('quantity', {
      where: {
        productId: productId,
        date: { [Op.lte]: date },
      },
    })) || 0;

  return currentSales;
};

module.exports = getPurchasesPerProduct;
