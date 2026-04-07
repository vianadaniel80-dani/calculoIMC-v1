import { limparCarrinho, emitirCheckoutConfirmado, obterFotoCarrinho } from "../../shared-communication/src/index.js";
import { botao, cartao, campo, injetarEstilosBase, moedaFormatada } from "../../shared-ui/src/index.js";

function construirFormulario(aoEnviar) {
  const formulario = document.createElement("form");
  const campoProprio = campo({ rotulo: "Responsável", nome: "responsavel", obrigatorio: true });
  const campoEndereco = campo({ rotulo: "Endereço", nome: "endereco", obrigatorio: true });
  const campoNotas = campo({ rotulo: "Observações", nome: "observacoes", tipo: "textarea" });

  formulario.appendChild(campoProprio.embrulho);
  formulario.appendChild(campoEndereco.embrulho);
  formulario.appendChild(campoNotas.embrulho);

  const botaoEnviar = botao("Confirmar pedido");
  botaoEnviar.type = "submit";
  formulario.appendChild(botaoEnviar);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const dadosFormulario = new FormData(formulario);
    aoEnviar({
      responsavel: dadosFormulario.get("responsavel"),
      endereco: dadosFormulario.get("endereco"),
      observacoes: dadosFormulario.get("observacoes"),
    });
  });

  return formulario;
}

export default {
  nome: "mfe-checkout",
  rota: "/checkout",
  montar(conteiner) {
    injetarEstilosBase();

    const { itens, total } = obterFotoCarrinho();
    const visao = document.createElement("section");

    if (!itens.length) {
      visao.appendChild(cartao("<p class='ui-danger'>Não há itens no carrinho para checkout.</p>"));
      const voltarCatalogo = botao("Voltar ao catálogo", "ghost");
      voltarCatalogo.addEventListener("click", () => {
        window.location.hash = "#/catalogo";
      });
      visao.appendChild(voltarCatalogo);
      conteiner.replaceChildren(visao);
      return () => conteiner.replaceChildren();
    }

    visao.innerHTML = `
      <h2>Checkout</h2>
      <p class="ui-muted">Total da compra: <strong>${moedaFormatada(total)}</strong></p>
    `;

    const status = document.createElement("div");
    const cartaoFormulario = cartao(
      construirFormulario((carga) => {
        const pedido = {
          ...carga,
          itens,
          total,
          criadoEm: new Date().toISOString(),
        };

        emitirCheckoutConfirmado(pedido);
        limparCarrinho();

        status.innerHTML = `
        <div class="ui-card">
          <h3>Pedido confirmado!</h3>
          <p class="ui-muted">Responsável: ${pedido.responsavel}</p>
          <p class="ui-muted">Endereço: ${pedido.endereco}</p>
          <p><strong>Total: ${moedaFormatada(pedido.total)}</strong></p>
        </div>
      `;
        cartaoFormulario.remove();
      }),
    );

    visao.appendChild(cartaoFormulario);
    visao.appendChild(status);
    conteiner.replaceChildren(visao);

    return () => conteiner.replaceChildren();
  },
};
