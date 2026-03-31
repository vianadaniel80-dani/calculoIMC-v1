import ErrorBase from "../errors/ErrorBase.js";

class ImcController {
  static calculcarIMC = (req, resp, next) => {
    try {
      const { peso, altura } = req.body;

      if (Number.isNaN(parseFloat(altura))) {
        new ErrorBase(400, "A requisição contém valores inválidos").enviarResposta(resp);
        return;
      }
      // else if (Number.isInteger(parseFloat(altura))) {
      //   new ErrorBase(400, "A altura deve ser enviada em metros (ex: 1.75)").enviarResposta(resp);
      //   return;
      // }

      const imc = parseFloat(peso) / parseFloat(altura) ** 2;

      if (imc <= 10) {
        new ErrorBase(400, "A requisição contém valores inválidos").enviarResposta(resp);
      }

      let classificacao = "";

      if (imc < 18.5) {
        classificacao = "Magreza";
      } else if (imc >= 18.5 && imc <= 24.9) {
        classificacao = "Normal";
      } else if (imc > 24.9 && imc <= 30) {
        classificacao = "Sobrepeso";
      } else {
        // Para qualquer valor maior que 30
        classificacao = "Obesidade";
      }

      resp.status(200).json({
        imc: imc.toFixed(2),
        classificacao: classificacao,
      });
      // new ErrorBase().enviarResposta(resp);
    } catch (error) {
      next(error);
    }
  };
}

export default ImcController;
