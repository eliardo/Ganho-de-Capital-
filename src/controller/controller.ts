import { HandlerService } from "../service/handler-service";

const service = new HandlerService();

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", async function (chunk) {  
  let input = "";
  input += chunk.toString().split("\r")[0];

  if (chunk.toString().split("\r")[0] === "") {
    //finaliza o serviço
    process.exit();
  }
  //cada linha deve ter operações de compra e venda
  const taxValues = service.processTax(input);
  console.log(taxValues);
});
