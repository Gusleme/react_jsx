# React Mastery Hub - Demonstração Completa de Conceitos React

Uma aplicação moderna e interativa desenvolvida em **React 18** e **Vite**, projetada para exemplificar de forma prática, didática e visual os conceitos fundamentais do React estudados em aula.

---

## 📌 Sumário
- [Descrição do Projeto](#-descrição-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Conceitos do React Utilizados](#-conceitos-do-react-utilizados)
  - [1. JSX (JavaScript XML)](#1-jsx-javascript-xml)
  - [2. Componentes Funcionais](#2-componentes-funcionais)
  - [3. Props & Comunicação entre Componentes](#3-props--comunicação-entre-componentes)
  - [4. Virtual DOM & Algoritmo de Reconciliação](#4-virtual-dom--algoritmo-de-reconciliação)
  - [5. Listas e a Chave `key`](#5-listas-e-a-chave-key)
  - [6. Renderização Condicional](#6-renderização-condicional)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Padrão Gitflow e Commits](#-padrão-gitflow-e-commits)

---

## 📖 Descrição do Projeto

O **React Mastery Hub** é um gerenciador de projetos e central de aprendizado React. A aplicação permite cadastrar, filtrar, editar, favoritar e acompanhar o progresso de iniciativas de desenvolvimento, ao mesmo tempo em que oferece um **Simulador Interativo do Virtual DOM** e um **Guia de Conceitos Fundamentais** integrado à interface.

O projeto foi concebido seguindo as melhores práticas da comunidade:
- Componentização desacoplada e reutilizável.
- Fluxo unidirecional de dados (One-Way Data Flow).
- Imutabilidade na manipulação de estados.
- Design responsivo com suporte a **Tema Claro (Light)** e **Tema Escuro (Dark)**.
- Persistência dos dados no `localStorage`.

---

## 🚀 Funcionalidades

1. **Gestão de Projetos:**
   - Listagem em modo **Grade (Grid)** ou **Lista (List)**.
   - Cadastro de novos projetos via janela modal flutuante.
   - Edição de projetos existentes.
   - Exclusão com feedback interativo.
   - Alteração rápida de status (*Planejado*, *Em Andamento*, *Concluído*).
   - Marcação de itens favoritos.
   - Controle dinâmico de barra de progresso (0% a 100%).

2. **Filtros e Busca em Tempo Real:**
   - Busca por texto (título, descrição, tags ou autor).
   - Filtro seletivo por Categoria (*Frontend*, *Fullstack*, *Design System*, *Educacional*, *Mobile*).
   - Filtro por Status.
   - Botão para limpar/restaurar filtros com um clique.

3. **Painel de Métricas (Dashboard):**
   - Contadores em tempo real de projetos totais, concluídos, em andamento e planejados.
   - Indicador de taxa de conclusão percentual no topo.
   - Alerta comemorativo quando 100% dos projetos são concluídos.

4. **Simulador Didático do Virtual DOM:**
   - Visualização lado a lado da árvore do **Virtual DOM (em memória JS)** e do **Real DOM (no navegador)**.
   - Contador de ciclos de reconciliação.
   - Realce visual do nó alterado (*Diffing*) e do patch pontual aplicado no DOM real, evidenciando a economia de reflows/repaints.

5. **Notificações Flutuantes (Toast):**
   - Alertas visuais temporizados (*Sucesso*, *Informação*, *Alerta/Exclusão*) com opção de fechamento manual.

---

## 💡 Conceitos do React Utilizados

### 1. JSX (JavaScript XML)
O JSX permite escrever elementos de interface com sintaxe similar ao HTML diretamente dentro de arquivos JavaScript.
- **Interpolação de expressões `{}`:** Inclusão dinâmica de variáveis, cálculos (ex: porcentagem de conclusão), operadores matemáticos e formatação de datas.
- **Fragmentos (`<> ... </>`):** Agrupamento de nós filhos sem adicionar nós extras desnecessários ao DOM.
- **Atributos em camelCase:** Uso de `className` em vez de `class`, `onClick` em vez de `onclick`, `htmlFor` em vez de `for`.
- **Estilos inline com objetos:** Manipulação dinâmica de cores e dimensões (ex: largura da barra de progresso baseada em porcentagem `style={{ width: `${progress}%` }}`).

### 2. Componentes Funcionais
A aplicação adota exclusivamente componentes funcionais modernos com React Hooks (`useState`, `useEffect`, `useMemo`).
- **Modularidade:** A interface é dividida em blocos com responsabilidade única:
  - `Header`: Apresentação da marca, progresso global e alternador de tema.
  - `StatsOverview`: Apresentação e cálculo das métricas.
  - `ProjectFilter`: Controles de busca, categorias, status e layout.
  - `ProjectList` e `ProjectCard`: Apresentação dos itens e interações.
  - `ProjectModal`: Formulário controlado para inserção e edição de dados.
  - `VirtualDomVisualizer`: Módulo educacional interativo sobre o Virtual DOM.
  - `ConceptGuide`: Cartões de estudo sobre os tópicos de React.
  - `Toast`: Feedback visual de ações do usuário.

### 3. Props & Comunicação entre Componentes
As **props** (propriedades) viabilizam o fluxo unidirecional de dados (do componente pai para os filhos):
- **Desestruturação de Props:** Parâmetros recebidos de forma limpa como `{ project, onToggleFavorite, onDelete }`.
- **Valores Padrão (Default Props):** Fallbacks seguros como `totalProjects = 0`, `viewMode = 'grid'`.
- **Passagem de Funções Callback:** Os componentes filhos notificam o componente pai sobre ações do usuário (ex: disparar `onDelete(id)` ou `onStatusChange(id, newStatus)` a partir do `ProjectCard`).
- **Prop `children`:** Utilizada em wrappers e botões modulares.

### 4. Virtual DOM & Algoritmo de Reconciliação
O Virtual DOM é uma cópia leve e em memória da estrutura real do navegador:
1. **Geração da Árvore Virtual:** A cada modificação de estado (`setState`), o React gera uma nova árvore virtual de elementos.
2. **Diffing:** O React compara a árvore anterior com a nova árvore de forma ultrarrápida.
3. **Patch Cirúrgico:** Apenas os nós e atributos que sofreram alteração real são aplicados no DOM do navegador, evitando recalcular todo o layout da página.
4. **Demonstração Prática:** O simulador na aba **"Simulador Virtual DOM"** permite interagir e inspecionar exatamente quais nós sofrem diff e patch em tempo real.

### 5. Listas e a Chave `key`
A renderização de coleções é realizada através do método JavaScript `.map()`:
- **Uso obrigatório de `key` única:** Cada item da lista recebe uma chave estável e única (ex: `key={project.id}`).
- **Por que a `key` é fundamental?** A chave permite que o algoritmo de reconciliação do Virtual DOM identifique com precisão quais itens foram adicionados, removidos, reordenados ou atualizados, evitando re-renderizações desnecessárias e perda de foco/estado em elementos filhos.
- **Tratamento de Sublistas:** A coleção de tags de cada projeto é mapeada com sua respectiva chave (`key={`${id}-tag-${index}`}`).

### 6. Renderização Condicional
A interface adapta-se dinamicamente às condições e estados:
- **Operador Ternário (`condicao ? <A/> : <B/>`):**
  - Alternância de ícones (Sol/Lua de acordo com o tema claro/escuro).
  - Ícone de favorito (preenchido se favorito, contorno se não favorito).
  - Alternância de visualização entre **Grade** e **Lista**.
  - Título do modal ("Cadastrar Novo Projeto" vs "Detalhes / Editar Projeto").
- **Operador Lógico `&&` (`condicao && <Elemento/>`):**
  - Exibição do botão "Limpar Filtros" apenas quando há algum filtro preenchido.
  - Exibição de mensagens de erro de validação nos campos do formulário.
  - Alerta especial quando 100% dos projetos estão concluídos.
- **Early Return (`if (!isOpen) return null`):**
  - O componente `ProjectModal` não renderiza nada no DOM quando está fechado.
  - O componente `Toast` não renderiza markup quando não há mensagem ativa.
- **Empty State Condicional:**
  - Se a lista filtrada tiver tamanho 0 (`projects.length === 0`), exibe-se um componente especial de busca sem resultados com botão para resetar os filtros.
- **Renderização por Abas Ativas:**
  - Exibição exclusiva do conteúdo das abas selecionadas (`activeTab === 'projects'`, `activeTab === 'vdom'` ou `activeTab === 'guide'`).

---

## 📁 Estrutura do Projeto

```text
react_jsx/
├── index.html                     # Arquivo HTML principal da aplicação
├── package.json                   # Dependências e scripts do projeto
├── vite.config.js                 # Configurações do empacotador Vite
├── .gitignore                     # Arquivos ignorados pelo Git
├── README.md                      # Documentação completa do projeto
└── src/
    ├── main.jsx                   # Ponto de entrada (ReactDOM.createRoot)
    ├── App.jsx                    # Componente raiz e gestão de estado global
    ├── components/
    │   ├── Header.jsx             # Cabeçalho, progresso e tema
    │   ├── StatsOverview.jsx      # Painel de métricas e indicadores
    │   ├── ProjectFilter.jsx      # Barra de pesquisa, seletores e alternador de visão
    │   ├── ProjectCard.jsx        # Cartão individual de projeto
    │   ├── ProjectList.jsx        # Lista com .map e empty state
    │   ├── ProjectModal.jsx       # Modal controlado de cadastro/edição
    │   ├── VirtualDomVisualizer.jsx # Simulador didático do Virtual DOM
    │   ├── ConceptGuide.jsx       # Cartões de documentação dos conceitos
    │   └── Toast.jsx              # Notificações de feedback
    ├── data/
    │   └── initialProjects.js     # Dados iniciais mockados e opções de categorias
    └── styles/
        └── index.css              # Estilização completa, variáveis CSS e temas
```

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 16.x ou superior)
- Gerenciador de pacotes **npm**, **yarn** ou **pnpm**

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd react_jsx
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Executar em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   O servidor iniciará localmente. Abra a URL exibida no terminal (normalmente `http://localhost:3000`).

4. **Gerar Build de Produção:**
   ```bash
   npm run build
   ```

5. **Visualizar a Build de Produção:**
   ```bash
   npm run preview
   ```

---

## 🔀 Padrão Gitflow e Commits

O desenvolvimento deste projeto seguiu o modelo **Gitflow**:

- **`main`**: Branch contendo o código de produção consolidado e estável.
- **`develop`**: Branch de integração para as funcionalidades desenvolvidas.
- **`feature/site`**: Branch temática de desenvolvimento onde todos os componentes, estilos, dados e simuladores foram implementados com commits atômicos e mensagens no padrão [Conventional Commits](https://www.conventionalcommits.org/):

| Hash Commit | Tipo / Mensagem |
|---|---|
| `07b338e` | `Initial commit` |
| `733d0e1` | `chore: setup initial Vite and React 18 configuration` |
| `71664ad` | `feat: implement core components, props flow, list rendering, and styling` |
| Próximo | `docs: add comprehensive README with concepts, architecture, and instructions` |

Após a conclusão da feature, a branch `feature/site` é integrada na branch `develop` e posteriormente na branch `main`.

---

Desenvolvido para fins de consolidação e estudo prático do ecossistema React.
