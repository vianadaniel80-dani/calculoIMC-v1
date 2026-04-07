const barramento = new EventTarget();

const CARRINHO_ATUALIZADO = "carrinho:atualizado";
const CHECKOUT_CONFIRMADO = "checkout:confirmado";

const estadoCarrinho = {
  itens: [],
};

function clonarItens(itens) {
  return itens.map((item) => ({ ...item }));
}

function calcularTotal(itens = estadoCarrinho.itens) {
  return itens.reduce((acumulado, item) => acumulado + item.preco * item.quantidade, 0);
}

function emitirAtualizacaoCarrinho() {
  barramento.dispatchEvent(
    new CustomEvent(CARRINHO_ATUALIZADO, {
      detail: {
        itens: clonarItens(estadoCarrinho.itens),
        total: calcularTotal(),
      },
    }),
  );
}

export function inscrever(nomeEvento, manipulador) {
  const embrulhado = (evento) => manipulador(evento.detail);
  barramento.addEventListener(nomeEvento, embrulhado);
  return () => barramento.removeEventListener(nomeEvento, embrulhado);
}

export function adicionarAoCarrinho(produto) {
  const existente = estadoCarrinho.itens.find((item) => item.id === produto.id);

  if (existente) {
    existente.quantidade += 1;
  } else {
    estadoCarrinho.itens.push({ ...produto, quantidade: 1 });
  }

  emitirAtualizacaoCarrinho();
}

export function atualizarQuantidadeCarrinho(idProduto, quantidade) {
  const normalizado = Number(quantidade);

  if (Number.isNaN(normalizado)) return;

  if (normalizado <= 0) {
    estadoCarrinho.itens = estadoCarrinho.itens.filter((item) => item.id !== idProduto);
  } else {
    estadoCarrinho.itens = estadoCarrinho.itens.map((item) => (item.id === idProduto ? { ...item, quantidade: normalizado } : item));
  }

  emitirAtualizacaoCarrinho();
}

export function limparCarrinho() {
  estadoCarrinho.itens = [];
  emitirAtualizacaoCarrinho();
}

export function obterFotoCarrinho() {
  return {
    itens: clonarItens(estadoCarrinho.itens),
    total: calcularTotal(),
  };
}

export function emitirCheckoutConfirmado(pedido) {
  barramento.dispatchEvent(
    new CustomEvent(CHECKOUT_CONFIRMADO, {
      detail: pedido,
    }),
  );
}

export const eventos = {
  CARRINHO_ATUALIZADO,
  CHECKOUT_CONFIRMADO,
};
