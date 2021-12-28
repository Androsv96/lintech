const SalesModel = require('./model');

const getSalesPerProduct = require('../../utils/salesHelper');
const getPurchasesPerProduct = require('../../utils/purchasesHelper');

const createSale = async (date, quantity, productId, productName) => {
  const purchasesPerProduct = await getPurchasesPerProduct(productId, date);
  const salesPerProduct = await getSalesPerProduct(productId, date);
  const finalStock = purchasesPerProduct - salesPerProduct;
  if (finalStock - quantity >= 0) {
    return await SalesModel.create({
      date,
      productId,
      productName,
      quantity: quantity,
    });
  } else {
    const errorMessage = {
      code: 202,
      error: `There is not enough stock to process this sale. Current stock is: ${
        purchasesPerProduct - salesPerProduct
      }`,
    };
    throw errorMessage;
  }
};

module.exports = { createSale };
