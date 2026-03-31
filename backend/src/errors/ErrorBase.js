class ErrorBase extends Error {
  constructor(status = 500, mensagem = "Ocorreu um erro interno") {
    super();
    this.status = status;
    this.mensagem = mensagem;
  }

  enviarResposta(resp) {
    resp.status(this.status).json({
      status: this.status,
      message: this.mensagem,
    });
  }
}

export default ErrorBase;
