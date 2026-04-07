import { eventos, obterFotoCarrinho, inscrever, atualizarQuantidadeCarrinho } from "../../shared-communication/src/index.js";
import { botao, cartao, injetarEstilosBase, moedaFormatada } from "../../shared-ui/src/index.js";

function renderizarCarrinho(conteiner) {
  const { itens, total } = obterFotoCarrinho();
  conteiner.replaceChildren();

  const titulo = document.createElement("div");
  titulo.innerHTML = '<h2>Carrinho</h2><p class="ui-muted">Revise os itens antes de fechar.</p>';
  conteiner.appendChild(titulo);

  if (!itens.length) {
    const vazio = cartao('<p class="ui-muted">Seu carrinho está vazio.</p>');
    conteiner.appendChild(vazio);
    return;
  }

  const tabela = document.createElement("table");
  tabela.className = "cart-table";
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Subtotal</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const corpo = tabela.querySelector("tbody");

  itens.forEach((item) => {
    const linha = document.createElement("tr");
    const subtotal = item.preco * item.quantidade;

    linha.innerHTML = `
      <td>${item.nome}</td>
      <td><input type="number" min="0" step="1" value="${item.quantidade}" data-id="${item.id}" /></td>
      <td>${moedaFormatada(subtotal)}</td>
      <td></td>
    `;

    const entrada = linha.querySelector("input");
    entrada.addEventListener("change", (evento) => {
      atualizarQuantidadeCarrinho(item.id, Number(evento.target.value));
    });

    const celularemocao = linha.querySelector("td:last-child");
    const botaoRemover = botao("Remover", "ghost");
    botaoRemover.classList.add("ui-danger");
    botaoRemover.addEventListener("click", () => {
      atualizarQuantidadeCarrinho(item.id, 0);
    });
    celularemocao.appendChild(botaoRemover);

    corpo.appendChild(linha);
  });

  const embrulho = cartao(tabela);
  conteiner.appendChild(embrulho);

  const resumo = cartao(`<p>Total: <strong>${moedaFormatada(total)}</strong></p>`);
  const irCheckout = botao("Ir para checkout", "ghost");
  irCheckout.addEventListener("click", () => {
    window.location.hash = "#/checkout";
  });
  resumo.appendChild(irCheckout);
  conteiner.appendChild(resumo);
}

export default {
  nome: "mfe-carrinho",
  rota: "/carrinho",
  montar(conteiner) {
    injetarEstilosBase();

    const visao = document.createElement("section");
    conteiner.replaceChildren(visao);

    renderizarCarrinho(visao);
    const desinscrever = inscrever(eventos.CARRINHO_ATUALIZADO, () => renderizarCarrinho(visao));

    return () => {
      desinscrever();
      conteiner.replaceChildren();
    };
  },
};
