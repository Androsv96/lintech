const { api } = require('../../../../setupTest');
const { notEnoughStockProduct, existingProduct } = require('./constants');

describe('testing sales', () => {
  it('should get 401 because no data was given', async () => {
    await api.post('/sales').expect(401);
  });
  it('should get 202 because there is no stock for this product', async () => {
    await api
      .post('/sales')
      .set('accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(notEnoughStockProduct)
      .expect(202)
      .expect({
        data: [],
        error:
          'There is not enough stock to process this sale. Current stock is: 17',
      });
  });
  it('should register sales', async () => {
    await api
      .post('/sales')
      .set('accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(existingProduct)
      .expect(201)
      .expect({
        data: existingProduct,
        error: '',
      });
  });
});
