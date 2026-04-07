const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

let injetado = false;

export function injetarEstilosBase() {
  if (injetado) return;

  const estilo = document.createElement("style");
  estilo.textContent = `
    :root {
      --bg: #f6f7f9;
      --surface: #ffffff;
      --ink: #0e1726;
      --muted: #5f6b7a;
      --brand: #0d9488;
      --brand-ink: #ffffff;
      --line: #dde2e8;
      --danger: #dc2626;
      --radius: 14px;
      --shadow: 0 16px 30px rgba(13, 22, 38, 0.08);
    }

    .ui-card {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: 1rem;
    }

    .ui-button {
      border: 0;
      border-radius: 999px;
      padding: 0.65rem 1rem;
      cursor: pointer;
      font-weight: 700;
      transition: transform 150ms ease, opacity 150ms ease;
    }

    .ui-button:hover {
      transform: translateY(-1px);
      opacity: 0.95;
    }

    .ui-button.primary {
      background: var(--brand);
      color: var(--brand-ink);
    }

    .ui-button.ghost {
      background: transparent;
      color: var(--ink);
      border: 1px solid var(--line);
    }

    .ui-field {
      display: grid;
      gap: 0.35rem;
      margin-bottom: 0.8rem;
    }

    .ui-field label {
      color: var(--muted);
      font-size: 0.9rem;
      font-weight: 600;
    }

    .ui-field input,
    .ui-field textarea {
      border: 1px solid var(--line);
      border-radius: 10px;
      padding: 0.65rem 0.75rem;
      font: inherit;
      color: var(--ink);
      background: #fff;
    }

    .ui-muted {
      color: var(--muted);
    }

    .ui-danger {
      color: var(--danger);
    }
  `;

  document.head.appendChild(estilo);
  injetado = true;
}

export function moedaFormatada(valor) {
  return moeda.format(valor);
}

export function cartao(conteudo) {
  const no = document.createElement("section");
  no.className = "ui-card";
  if (typeof conteudo === "string") {
    no.innerHTML = conteudo;
  } else if (conteudo instanceof Node) {
    no.appendChild(conteudo);
  }
  return no;
}

export function botao(rotulo, tipo = "primary") {
  const no = document.createElement("button");
  no.type = "button";
  no.className = `ui-button ${tipo}`;
  no.textContent = rotulo;
  return no;
}

export function campo({ rotulo, nome, tipo = "text", dica = "", obrigatorio = false }) {
  const embrulho = document.createElement("div");
  embrulho.className = "ui-field";

  const noRotulo = document.createElement("label");
  noRotulo.setAttribute("for", nome);
  noRotulo.textContent = rotulo;

  const entrada = document.createElement(tipo === "textarea" ? "textarea" : "input");
  entrada.id = nome;
  entrada.name = nome;
  if (tipo !== "textarea") entrada.type = tipo;
  entrada.placeholder = dica;
  entrada.required = obrigatorio;

  embrulho.appendChild(noRotulo);
  embrulho.appendChild(entrada);

  return { embrulho, entrada };
}
