# Portal interno de e-commerce com microfrontends

## Resumo executivo

Este projeto implementa um portal interno de compras com arquitetura de microfrontends para permitir autonomia de squads por domínio (catálogo, carrinho e checkout), mantendo experiência unificada no shell.

Os três MFEs compartilham uma biblioteca de componentes base (`shared-ui`) e uma camada comum para comunicação, componentização e roteamento, escolhida para equilibrar desacoplamento técnico, consistência visual e governança de navegação.

## Estrutura

- `shell`: layout global, navegação e roteamento entre domínios.
- `mfe-catalogo`: grid de produtos e ação de adicionar ao carrinho.
- `mfe-carrinho`: visualização de itens, ajuste de quantidade e total.
- `mfe-checkout`: formulário de endereço e confirmação de pedido.
- `shared-ui`: biblioteca de componentes base e tokens visuais.
- `shared-communication`: camada de comunicação entre MFEs por eventos.

## Três pilares adotados

### Justificativa consolidada da escolha

- Comunicação: Event Bus via `EventTarget` por reduzir acoplamento entre squads e formalizar contratos de eventos de domínio.
- Componentização: biblioteca compartilhada `shared-ui` para garantir padrão visual e reutilização sem bloquear evolução local de cada MFE.
- Roteamento: shell central para controlar URLs e fluxo global, com carregamento dinâmico dos MFEs e possibilidade de evolução gradual da plataforma.

### 1) Comunicação entre MFEs

Escolha: Event Bus baseado em `EventTarget` no pacote `shared-communication`.

Justificativa:

- Baixo acoplamento entre squads: nenhum MFE importa implementação interna de outro.
- Contratos claros de domínio por eventos (`cart:updated`, `checkout:confirmed`).
- Fácil troca futura por solução corporativa (ex: pub/sub externo) sem alterar telas.

### 2) Componentização

Escolha: pacote compartilhado `shared-ui` com componentes primitivos (`card`, `button`, `field`) e tokens CSS.

Justificativa:

- Consistência visual sem impedir autonomia de cada squad.
- Reuso de formatação de moeda e estilo base.
- Evolução incremental: cada MFE pode compor primitives com layout próprio.

### 3) Roteamento

Escolha: shell com roteamento centralizado por hash (`#/catalogo`, `#/carrinho`, `#/checkout`).

Justificativa:

- Governança clara de URL e fluxo global em um único ponto.
- Carregamento sob demanda dos MFEs via `import()`.
- Permite migração gradual para roteador mais robusto (single-spa, Module Federation + router do shell) mantendo contrato de `mount`.

## Contrato de integração dos MFEs

Cada microfrontend expõe:

```js
export default {
  name: "mfe-nome",
  route: "/rota",
  mount(container) {
    // render
    return () => {
      // unmount
    };
  },
};
```

Esse contrato mantém os times independentes e facilita observabilidade, testes de contrato e troca de tecnologia por domínio.

## Como executar localmente

1. Na pasta `ecommerce`, suba um servidor estático.
2. Exemplo com Node:

```bash
npx serve .
```

3. Abra no navegador:

- `http://localhost:3000/shell/` (ou porta informada pelo `serve`).
