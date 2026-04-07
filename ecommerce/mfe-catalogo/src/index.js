import { adicionarAoCarrinho } from "../../shared-communication/src/index.js";
import { botao, cartao, injetarEstilosBase, moedaFormatada } from "../../shared-ui/src/index.js";

const produtos = [
  { id: "sku-1", nome: "Notebook Pro", preco: 4599.9 },
  { id: "sku-2", nome: "Mouse Vertical", preco: 189.9 },
  { id: "sku-3", nome: "Teclado Mecânico", preco: 389.9 },
  { id: "sku-4", nome: 'Monitor 27"', preco: 1499.9 },
];

function construirGrid() {
  const embrulho = document.createElement("div");
  embrulho.className = "catalog-grid";

  produtos.forEach((produto) => {
    const corpo = document.createElement("div");
    corpo.innerHTML = `
      <h3>${produto.nome}</h3>
      <p class="ui-muted">Entrega em até 3 dias úteis</p>
      <p><strong>${moedaFormatada(produto.preco)}</strong></p>
    `;

    const botaoAdicionar = botao("Adicionar ao carrinho");
    botaoAdicionar.addEventListener("click", () => adicionarAoCarrinho(produto));
    corpo.appendChild(botaoAdicionar);

    embrulho.appendChild(cartao(corpo));
  });

  return embrulho;
}

export default {
  nome: "mfe-catalogo",
  rota: "/catalogo",
  montar(conteiner) {
    injetarEstilosBase();

    const no = document.createElement("section");
    no.innerHTML = `
      <h2>Catálogo</h2>
      <p class="ui-muted">Escolha os itens para o pedido interno.</p>
    `;
    no.appendChild(construirGrid());

    conteiner.replaceChildren(no);

    return () => conteiner.replaceChildren();
  },
};
