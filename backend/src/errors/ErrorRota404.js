import ErrorBase from "./ErrorBase.js";

class ErrorRota404 extends ErrorBase {
  constructor(messagem = "Rota não encontrada") {
    super(404, messagem);
  }
}

export default ErrorRota404;
