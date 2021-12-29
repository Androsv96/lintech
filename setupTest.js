const supertest = require('supertest');

const app = require('./');
const api = supertest(app);

jest.mock('sequelize', () => {
  const actualSequelize = jest.requireActual('sequelize');
  const SequelizeMock = require('sequelize-mock');

  SequelizeMock.literal = jest.fn((string) => string);
  SequelizeMock.prototype.transaction = async function () {
    const fn = async function (t) {
      return t;
    };
    return fn({ commit: fn, rollback: fn });
  };
  return {
    ...actualSequelize,
    Sequelize: SequelizeMock,
  };
});

jest.mock('./src/services/sequelize.js', () => {
  return {
    sequelize: null,
    initSequelize: () => Promise.resolve(true),
  };
});

jest.mock('./src/routes/purchases/model.js', () => {
  const SequelizeMock = require('sequelize-mock');
  const PurchasesMock = require('./src/routes/purchases/__tests__/mock');
  var dbMock = new SequelizeMock();
  const PurchasesModel = dbMock.define('purchases', PurchasesMock);
  jest.spyOn(PurchasesModel, 'sum').mockImplementation(async () => {
    const stock = PurchasesMock.reduce((acc, val) => acc + val.quantity, 0);
    return Promise.resolve(stock);
  });
  jest.spyOn(PurchasesModel, 'create').mockImplementation(async (data) => {
    return Promise.resolve(data);
  });

  return PurchasesModel;
});

jest.mock('./src/routes/sales/model.js', () => {
  const SequelizeMock = require('sequelize-mock');
  const SalesMock = require('./src/routes/sales/__tests__/mock');
  var dbMock = new SequelizeMock();
  const SalesModel = dbMock.define('sales', SalesMock);
  jest.spyOn(SalesModel, 'sum').mockImplementation(async (data) => {
    const stock = SalesMock.reduce((acc, val) => acc + val.quantity, 0);
    return Promise.resolve(stock);
  });
  jest.spyOn(SalesModel, 'create').mockImplementation(async (data) => {
    return Promise.resolve(data);
  });
  return SalesModel;
});

module.exports = { api };
