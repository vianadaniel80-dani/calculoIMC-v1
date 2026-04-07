import { eventos, inscrever } from "../../shared-communication/src/index.js";
import { injetarEstilosBase } from "../../shared-ui/src/index.js";
import { obterRotas, renderizarRotaAtual } from "./router.js";

injetarEstilosBase();

const aplicacao = document.querySelector("#app");

aplicacao.innerHTML = `
  <header class="shell-header">
    <h1>Portal Interno de Compras</h1>
    <p>Arquitetura de microfrontends com shell + domínio por squad.</p>
    <div class="impacta-badge">Atividade Aula 3</div>
  </header>

  <nav class="shell-nav" id="shell-nav"></nav>

  <main class="shell-main" id="mfe-host"></main>

  <footer class="shell-footer">
    <p>Teste <a href="#" target="_blank" rel="noopener"></a></p>
  </footer>
`;

const navegacao = aplicacao.querySelector("#shell-nav");
const hospedagem = aplicacao.querySelector("#mfe-host");

function renderizarNavegacao() {
  const rotaAtual = (window.location.hash || "#/catalogo").replace("#", "");

  navegacao.replaceChildren();

  obterRotas().forEach(({ rota, titulo }) => {
    const link = document.createElement("a");
    link.href = `#${rota}`;
    link.textContent = titulo;
    link.className = rotaAtual === rota ? "active" : "";
    navegacao.appendChild(link);
  });
}

function sincronizarRota() {
  renderizarNavegacao();
  renderizarRotaAtual(hospedagem);
}

window.addEventListener("hashchange", sincronizarRota);

inscrever(eventos.CARRINHO_ATUALIZADO, ({ itens }) => {
  const idContador = "cart-counter";
  let insignia = document.getElementById(idContador);

  if (!insignia) {
    insignia = document.createElement("span");
    insignia.id = idContador;
    insignia.className = "cart-counter";
    aplicacao.querySelector("h1").appendChild(insignia);
  }

  const quantidade = itens.reduce((acumulado, elemento) => acumulado + elemento.quantidade, 0);
  insignia.textContent = quantidade ? ` (${quantidade})` : "";
});

sincronizarRota();
