import ErrorRota404 from "../errors/ErrorRota404.js";

function errorRotas404(req, resp, next) {
  const erro404 = new ErrorRota404();
  next(erro404);
}

export default errorRotas404;
