import { converter } from "../../src/helper/converter-input";
import { OperationInputModel } from "../../src/model/operation-input-model";
import { BuyService } from "../../src/service/buy-service";

describe('Buy service', () => {
  let operation: Array<OperationInputModel>;

  beforeAll(()=>{
    operation = converter([{"operation":"buy", "unit-cost":10.00, "quantity": 10000},{"operation":"sell", "unit-cost":15.00, "quantity": 10000}])
  });


  it('Should calculate first avarage Price', async () => {
    expect.assertions(1);
    
    const service = new BuyService();
    const avaragePrice = service.calculateAveragePrice(
      0,
      0,
      10,
      1000,
      0)
    expect(avaragePrice).toEqual(10);
    
  });

  it('Should calculate avarage Price after sell part', async () => {
    expect.assertions(1);
    //comprou 1000 a preço medio de 5.00
    //vendeu 500
    //comprou mais 1000 a preço medio de 2.50
    const service = new BuyService();
    const avaragePrice = service.calculateAveragePrice(
      1000,
      500,
      2.50,
      1000,
      5)
    expect(avaragePrice).toEqual(3.33);
    
  });
  
  it('Should calculate quantity in custody and price (first buy)', async () => {
    expect.assertions(2);
    const service = new BuyService();
    const {totalBuy, averagePrice} = service.processBuy(
      0,
      0,
      0,
      operation[0])
    expect(averagePrice).toEqual(10);
    expect(totalBuy).toEqual(10000);
  });


  it('Should calculate quantity in custody and price (secound buy)', async () => {
    expect.assertions(2);
    const service = new BuyService();
    //possui 2000 ações a preço medio de 4.00
    //comprou mais 10000 a preco medio de 10.00
    const {totalBuy, averagePrice} = service.processBuy(
      2000,
      0,
      4.00,
      operation[0])
    expect(averagePrice).toEqual(9);
    expect(totalBuy).toEqual(12000);
  });
  
});