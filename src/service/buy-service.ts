import { OperationInputModel } from "../model/operation-input-model";
import { ProcessBuyResult } from "../model/process-buy-result-model";

export class BuyService {
  private className: string = "BuyService";

  processBuy(
    totalBuy: number,
    totalSell: number,
    averagePrice: number,
    operation: OperationInputModel
  ): ProcessBuyResult {
    const newAveragePrice = this.calculateAveragePrice(
      totalBuy,
      totalSell,
      operation.unitCost,
      operation.quantity,
      averagePrice
    );

    const newTotalBuy = Number(operation.quantity) + totalBuy;

    return {
      averagePrice: newAveragePrice,
      totalBuy: newTotalBuy,
    } as ProcessBuyResult;
  }

  calculateAveragePrice(
    totalBuy: number,
    totalSell: number,
    unitCost: number,
    quantity: number,
    averagePrice: number
  ): number {
    if (totalBuy === 0) {
      //calcula preço medio
      averagePrice = unitCost;
    } else {
      // atualiza preço medio
      averagePrice =
        ((totalBuy - totalSell) * averagePrice + quantity * unitCost) /
        (totalBuy - totalSell + quantity);
    }
    return parseFloat(averagePrice.toFixed(2));
  }
}
