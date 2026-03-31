import ErrorBase from "../errors/ErrorBase.js";
import ErrorRota404 from "../errors/ErrorRota404.js";

function manipuladorError(error, req, resp, next) {
  if (error instanceof ErrorRota404) {
    error.enviarResposta(resp);
  } else {
    new ErrorBase().enviarResposta(resp);
  }
}

export default manipuladorError;
