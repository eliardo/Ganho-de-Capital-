import { converter } from "../../src/helper/converter-input";
import { OperationInputModel } from "../../src/model/operation-input-model";
import { HandlerService } from "../../src/service/handler-service";

describe("Integrated test", () => {
  const service = new HandlerService();

  it("Case 1 of espec", async () => {
    expect.assertions(1);
    const input =
      '[{"operation":"buy", "unit-cost":10.00, "quantity": 100},{"operation":"sell", "unit-cost":15.00, "quantity": 50},{"operation":"sell", "unit-cost":15.00, "quantity": 50}]';

    const tax = service.processTax(input);
    expect(tax).toEqual([{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }]);
  });

  it("Case 2 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]`;

    const tax = service.processTax(input);
    expect(tax).toEqual([{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }]);
  });

  it("Case 1 + case 2 of espec", async () => {
    expect.assertions(2);
    const input1 = `[{"operation":"buy", "unit-cost":10.00, "quantity": 100},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50},
    {"operation":"sell", "unit-cost":15.00, "quantity": 50}]`;

    const input2 = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000}]`;

    const tax1 = service.processTax(input1);
    const tax2 = service.processTax(input2);
    expect(tax1).toEqual([{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }]);
    expect(tax2).toEqual([{ tax: 0.0 }, { tax: 10000.0 }, { tax: 0.0 }]);
  });

  it("Case 3 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":5.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 3000}]`;

    const tax = service.processTax(input);
    expect(tax).toEqual([{ tax: 0.0 }, { tax: 0.0 }, { tax: 1000.0 }]);
  });

  it("Case 4 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":15.00, "quantity": 10000}]`;
    

    const tax = service.processTax(input);
    expect(tax).toEqual([{ tax: 0.0 }, { tax: 0.0 }, { tax: 0.0 }]);
  });

  it("Case 5 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"buy", "unit-cost":25.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":15.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":25.00, "quantity": 5000}]`;

    const tax = service.processTax(input);
    expect(tax).toEqual([
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 10000.0 },
    ]);
  });

  it("Case 6 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":25.00, "quantity": 1000}]`;

    const tax = service.processTax(input);
    expect(tax).toEqual([
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3000.0 },
    ]);
  });

  it("Case 7 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":2.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":20.00, "quantity": 2000},
    {"operation":"sell", "unit-cost":25.00, "quantity": 1000},
    {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":15.00, "quantity": 5000},
    {"operation":"sell", "unit-cost":30.00, "quantity": 4350},
    {"operation":"sell", "unit-cost":30.00, "quantity": 650}]`;

    const tax = service.processTax(input);
    expect(tax).toEqual([
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3000.0 },
      { tax: 0.0 },
      { tax: 0.0 },
      { tax: 3700.0 },
      { tax: 0.0 },
    ]);
  });

  it("Case 8 of espec", async () => {
    expect.assertions(1);
    const input = `[{"operation":"buy", "unit-cost":10.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":50.00, "quantity": 10000},
    {"operation":"buy", "unit-cost":20.00, "quantity": 10000},
    {"operation":"sell", "unit-cost":50.00, "quantity": 10000}]`;

    const tax = service.processTax(input);
    expect(tax).toEqual([
      { tax: 0.0 },
      { tax: 80000.0 },
      { tax: 0.0 },
      { tax: 60000.0 },
    ]);
  });

});
