const { Op } = require('sequelize');
const SalesModal = require('../routes/sales/model');

const getSalesPerProduct = async (productId, date) => {
  const currentSales =
    (await SalesModal.sum('quantity', {
      where: {
        productId: productId,
        date: { [Op.lte]: date },
      },
    })) || 0;

  return currentSales;
};

module.exports = getSalesPerProduct;
