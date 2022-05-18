import { converter } from "../../src/helper/converter-input";
import { OperationInputModel } from "../../src/model/operation-input-model";
import { SellService } from "../../src/service/sell-service";

describe("Sell service", () => {
  let operation: Array<OperationInputModel>;

  beforeAll(() => {
    operation = converter([
      { operation: "buy", "unit-cost": 10.0, quantity: 10000 },
      { operation: "sell", "unit-cost": 15.0, quantity: 10000 },
    ]);
  });

  it("Should calculate first tax sell", async () => {
    expect.assertions(1);
    const service = new SellService();
    const tax = service.calculateTax(10000.0, 0);
    expect(tax).toEqual(2000);
  });

  it("Should calculate tax sellamount tax before > 0", async () => {
    expect.assertions(1);
    const service = new SellService();
    const tax = service.calculateTax(50000.0, 40000.0);
    expect(tax).toEqual(50000);
  });

  it("Should process sell gain < 20.000", async () => {
    expect.assertions(3);
    const service = new SellService();
    //vendendo 100 acoes a 10 reais, prço de compra 7 reais
    const {tax, lossAmount, totalSell} = service.processSell(
      0,
      7,
      10,
      100,
      0,
      0
    );
    expect(tax).toEqual(0);
    expect(lossAmount).toEqual(0);
    expect(totalSell).toEqual(100)
  });


  it("Should process sell gain > 20.000", async () => {
    expect.assertions(3);
    const service = new SellService();
    //vendendo 10000 acoes a 10 reais, prço de compra 5 reais
    const {tax, lossAmount, totalSell} = service.processSell(
      0,
      5,
      10,
      10000,
      0,
      0
    );
    expect(tax).toEqual(10000);
    expect(lossAmount).toEqual(0);
    expect(totalSell).toEqual(10000)
  });

  it("Should process sell with loss", async () => {
    expect.assertions(3);
    const service = new SellService();
    //vendendo 10000 acoes a 5 reais, prço de compra 10 reais
    const {tax, lossAmount, totalSell} = service.processSell(
      0,
      10,
      5,
      10000,
      0,
      0
    );
    expect(tax).toEqual(0);
    expect(lossAmount).toEqual(50000);
    expect(totalSell).toEqual(10000)
  });


  it("Should process sell with gain, but with loos at old operation equal current gain", async () => {
    expect.assertions(3);
    const service = new SellService();
    //vendendo 10000 acoes a 10 reais, prço de compra 5 reais
    const {tax, lossAmount, totalSell} = service.processSell(
      0,
      5,
      10,
      10000,
      50000,
      0
    );
    expect(tax).toEqual(0);
    expect(lossAmount).toEqual(0);
    expect(totalSell).toEqual(10000)
  });


  it("Should process sell with gain, but with loos at old operation < gain current", async () => {
    expect.assertions(3);
    const service = new SellService();
    //vendendo 10000 acoes a 10 reais, prço de compra 5 reais
    const {tax, lossAmount, totalSell} = service.processSell(
      0,
      5,
      10,
      10000,
      20000,
      0
    );
    expect(tax).toEqual(6000);
    expect(lossAmount).toEqual(0);
    expect(totalSell).toEqual(10000)
  });


  it("Should process sell with gain and tax at old operation", async () => {
    expect.assertions(3);
    const service = new SellService();
    //vendendo 10000 acoes a 10 reais, prço de compra 5 reais
    const {tax, lossAmount, totalSell} = service.processSell(
      0,
      5,
      10,
      10000,
      0,
      1
    );
    expect(tax).toEqual(10001);
    expect(lossAmount).toEqual(0);
    expect(totalSell).toEqual(10000)
  });
});
