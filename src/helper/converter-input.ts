import { OperationInputModel } from "../model/operation-input-model";

export function converter(input: Array<any>): Array<OperationInputModel>{
    const result: Array<OperationInputModel>= [];
    input.forEach(element => {
        let unitCost = element['unit-cost'];
        delete element['unit-cost'];

        result.push({
            ...element,
            unitCost 
        })
    });

    return result;
}