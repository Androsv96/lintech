const { Op } = require('sequelize');
const PurchasesModel = require('./model');

const getEndDate = (date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split('T')[0];
};

const createPurchase = async (date, quantity, productId, productName) => {
  const purchaseDate = new Date(date);
  const initMonth = `${purchaseDate.getFullYear()}-${
    purchaseDate.getMonth() + 1
  }-01`;
  const endDate = getEndDate(
    new Date(purchaseDate.getFullYear(), purchaseDate.getMonth() + 1, 0)
  );

  const currentStock =
    (await PurchasesModel.sum('quantity', {
      where: {
        productId: productId,
        date: { [Op.between]: [initMonth, endDate] },
      },
    })) || 0;

  if (currentStock + quantity > 30) {
    const errorMessage = {
      code: 202,
      error: 'Max purchases per month hit for this product.',
    };
    throw errorMessage;
  }

  return await PurchasesModel.create({
    date,
    quantity,
    productId,
    productName,
  });
};

module.exports = {
  createPurchase,
};
