const { api } = require('../../../../setupTest');
const { mockedNewPurchase, mockedExistingProduct } = require('./constants');

describe('testing purchases', () => {
  it('should get 401 because no data was given', async () => {
    await api
      .post('/purchases')
      .set('Content-type', 'application/json')
      .expect(401)
      .expect({ data: [], error: 'Data is missing' });
  });

  it('should get 202 because hit max purchases for this product', async () => {
    await api
      .post('/purchases')
      .set('accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(mockedExistingProduct)
      .expect(202)
      .expect({
        data: [],
        error: 'Max purchases per month hit for this product.',
      });
  });
  it('should register new product purchase', async () => {
    await api
      .post('/purchases')
      .set('accept', 'application/json')
      .set('Content-type', 'application/json')
      .send(mockedNewPurchase)
      .expect(201)
      .expect({
        data: mockedNewPurchase,
        error: '',
      });
  });
});
