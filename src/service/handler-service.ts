const BUY = "buy";
const SELL = "sell";
import { OperationInputModel } from "../model/operation-input-model";
import { OperationOutputModel } from "../model/operation-output-model";
import { BuyService } from "./buy-service";
import { SellService } from "./sell-service";
import { converter } from "../helper/converter-input"

export class HandlerService {
  private buyService: BuyService;
  private sellService: SellService;

  constructor() {
    this.buyService = new BuyService();
    this.sellService = new SellService();
  }

  public processTax(input: string): Array<OperationOutputModel> {
    
    let parseInput;
    try {
      parseInput = JSON.parse(input);
    } catch (error) {
      console.log("Entrada inválida. A entrada deve ser um JSON válido!");
      return;
    }
    const inputObject: Array<OperationInputModel> = converter(parseInput);

    let lossAmount = 0; //somatório de prejuízo
    let tax = 0; //taxa a ser paga por uma venda
    let totalBuy = 0; //somatório de ações compradas
    let totalSell = 0; //somatório de ações vendidas
    let averagePrice = 0; // preço médio
    const taxValues: Array<OperationOutputModel> = [];

    for (const currentOperation of inputObject) {
      if (currentOperation.operation === BUY) {
        ({averagePrice, totalBuy} = this.buyService.processBuy(
          totalBuy,
          totalSell,
          averagePrice,
          currentOperation
        ));

      } else if (currentOperation.operation === SELL) {
        
        ({lossAmount, tax, totalSell} = this.sellService.processSell(
          totalSell,
          averagePrice,
          currentOperation.unitCost,
          currentOperation.quantity,
          lossAmount,
          tax
        ));

      } else {
        // entrada invalida
        console.log("Operation invalid");
        return;
      }

      taxValues.push({
        tax: parseFloat(tax.toFixed(2)),
      });
      tax = 0.00;
    }
    return taxValues;
  }
}
