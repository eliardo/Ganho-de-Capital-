import { ProcessSellResult } from "../model/process-sell-result-model";

const TAX_PERCENT = 0.2;
const VALUE_LIMIT_APPLY_TAX = 20000.0;

export class SellService {
  private className: string = "SellService";

  processSell(
    totalSell: number,
    averagePrice: number,
    unitCost: number,
    quantity: number,
    lossAmount: number,
    tax: number
  ): ProcessSellResult {
    // atualiza qtd de venda
    totalSell += Number(quantity);

    if (unitCost < averagePrice) {
      //atualiza prejuízo
      lossAmount += (averagePrice - unitCost) * quantity;
    } else if (unitCost > averagePrice && unitCost * quantity > VALUE_LIMIT_APPLY_TAX) {
      //lucro: calcula imposto a pagar
      let diff = 0;
      if (lossAmount > 0) {
        //desconta prejuizo passado
        let gain = (unitCost - averagePrice) * quantity;
        if (gain > lossAmount) {
          //calcula imposto a pagar com a diferença entre desconto e lucro
          diff = gain - lossAmount;
          lossAmount = 0;
          tax = this.calculateTax(diff, tax);
        } else {
          //atualiza valor de perda
          lossAmount -= gain;
        }
      } else {
        //calcula imposto a pagar com total do lucro
        diff = (unitCost - averagePrice) * quantity;
        tax = this.calculateTax(diff, tax);
      }
    }
  
    return { lossAmount, tax, totalSell } as ProcessSellResult;
  }

  calculateTax(amount: number, oldTaxAmount:number): number {
    const tax = (amount * TAX_PERCENT) + oldTaxAmount;
    return parseFloat(tax.toFixed(2));
  }
}
