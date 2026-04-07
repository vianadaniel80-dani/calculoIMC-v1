const registro = [
  {
    rota: "/catalogo",
    titulo: "Catálogo",
    carregador: () => import("../../mfe-catalogo/src/index.js"),
  },
  {
    rota: "/carrinho",
    titulo: "Carrinho",
    carregador: () => import("../../mfe-carrinho/src/index.js"),
  },
  {
    rota: "/checkout",
    titulo: "Checkout",
    carregador: () => import("../../mfe-checkout/src/index.js"),
  },
];

let desmontarAtivo = null;

function normalizarHash() {
  const hash = window.location.hash || "#/catalogo";
  return hash.replace("#", "") || "/catalogo";
}

export function obterRotas() {
  return registro.map(({ rota, titulo }) => ({ rota, titulo }));
}

export async function renderizarRotaAtual(alvo) {
  const caminho = normalizarHash();
  const correspondencia = registro.find((entrada) => entrada.rota === caminho) || registro[0];

  if (desmontarAtivo) {
    desmontarAtivo();
    desmontarAtivo = null;
  }

  const modulo = await correspondencia.carregador();
  desmontarAtivo = modulo.default.montar(alvo);
}
