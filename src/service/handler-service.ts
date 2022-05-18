const BUY = "buy";
const SELL = "sell";
import { OperationInputModel } from "../model/operation-input-model";
import { OperationOutputModel } from "../model/operation-output-model";
import { BuyService } from "./buy-service";
import { SellService } from "./sell-service";
import { converter } from "../helper/converter-input"
import { CountStocksModel } from "../model/count-stocks";

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

    let lossAmountGlobal = 0; //somatório de prejuízo
    
    const arrayStocks: Array<CountStocksModel> = [];

    const taxValues: Array<OperationOutputModel> = [];

    for (const currentOperation of inputObject) {
      const stockIndex = arrayStocks.findIndex( currentStock => {
        return currentStock.ticker === currentOperation.ticker;
      });

      let stock: CountStocksModel;
      if(stockIndex === -1){
        stock = {
          ticker: currentOperation.ticker,
          tax: 0,
          totalBuy: 0,
          totalSell: 0,
          averagePrice: 0
        };
      }else{
        stock = arrayStocks[stockIndex];
      }

      if (currentOperation.operation === BUY) {
        const {averagePrice, totalBuy} = this.buyService.processBuy(
          stock.totalBuy,
          stock.totalSell,
          stock.averagePrice,
          currentOperation
        );

        if(stockIndex === -1){
          stock.averagePrice = averagePrice;
          stock.totalBuy = totalBuy;
          arrayStocks.push(stock);
        }else{
          arrayStocks[stockIndex].averagePrice = averagePrice;
          arrayStocks[stockIndex].totalBuy = totalBuy;
        }

      } else if (currentOperation.operation === SELL) {
        
         const {lossAmount, tax, totalSell} = this.sellService.processSell(
          stock.totalSell,
          stock.averagePrice,
          currentOperation.unitCost,
          currentOperation.quantity,
          lossAmountGlobal,
          stock.tax
        );
        
        lossAmountGlobal = lossAmount;
        arrayStocks[stockIndex].tax = tax;
        arrayStocks[stockIndex].totalSell = totalSell;

      } else {
        // entrada invalida
        console.log("Operation invalid");
        return;
      }

      taxValues.push({
        tax: parseFloat(stock.tax.toFixed(2)),
      });

    }
    return taxValues;
  }
}
