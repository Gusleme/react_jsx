import React from 'react';
import { Code, Box, Share2, Layers, ListOrdered, GitBranch } from 'lucide-react';

/**
 * Componente ConceptGuide
 * Exibe cartões didáticos interativos documentando cada um dos conceitos estudados,
 * com exemplos práticos de código e sua aplicação nesta aplicação.
 */
export default function ConceptGuide() {
  const concepts = [
    {
      id: 'jsx',
      title: '1. JSX (JavaScript XML)',
      icon: <Code size={20} />,
      description: 'Extensão de sintaxe que permite escrever código visual com formato de marcação diretamente dentro do JavaScript. É compilado para chamadas React.createElement().',
      snippet: `// Interpolação de expressões {} e fragments <>
const Greeting = ({ name }) => (
  <>
    <h1>Olá, {name}!</h1>
    <p>Hoje é {new Date().toLocaleDateString()}</p>
  </>
);`
    },
    {
      id: 'componentes',
      title: '2. Componentes Funcionais',
      icon: <Box size={20} />,
      description: 'Blocos de construção reutilizáveis e independentes. Recebem entradas (props) e retornam elementos React descrevendo o que deve aparecer na tela.',
      snippet: `// Componente funcional modular
function ProjectCard(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
    </div>
  );
}`
    },
    {
      id: 'props',
      title: '3. Props & Comunicação',
      icon: <Share2 size={20} />,
      description: 'Mecanismo de transferência de dados e callbacks de componentes pais para filhos (fluxo unidirecional de dados), mantendo as funções puras em relação às suas entradas.',
      snippet: `// Desestruturação de props e passagem de callbacks
function Button({ onClick, children, variant = 'primary' }) {
  return (
    <button onClick={onClick} className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
}`
    },
    {
      id: 'virtual-dom',
      title: '4. Virtual DOM & Diffing',
      icon: <Layers size={20} />,
      description: 'Uma representação leve em memória da árvore DOM. O React compara a árvore anterior com a nova (diffing) e aplica apenas as mutações estritamente necessárias no DOM real.',
      snippet: `// Estado atualiza -> Nova árvore VDOM criada
// React reconcilia e faz patch cirúrgico apenas no nó alterado:
const [count, setCount] = useState(0);
<span key="counter">{count}</span>`
    },
    {
      id: 'listas',
      title: '5. Listas e Chaves (Keys)',
      icon: <ListOrdered size={20} />,
      description: 'Renderização dinâmica de arrays através de .map(). O uso de chaves (keys) únicas e estáveis é essencial para que o algoritmo de reconciliação identifique quais itens mudaram, foram adicionados ou removidos.',
      snippet: `// Renderização de lista com key única e imutável
<ul>
  {projects.map((item) => (
    <li key={item.id}>{item.title}</li>
  ))}
</ul>`
    },
    {
      id: 'condicionais',
      title: '6. Renderização Condicional',
      icon: <GitBranch size={20} />,
      description: 'Apresentação de diferentes elementos visuais com base no estado da aplicação, utilizando operadores lógicos (&&), ternários (?:) ou retornos antecipados (early returns).',
      snippet: `// Operador ternário e operador lógico &&
{isOpen ? <Modal onClose={handleClose} /> : null}

{hasError && <p className="error">Ocorreu uma falha!</p>}

{items.length === 0 ? <EmptyState /> : <List items={items} />}`
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          Guia de Conceitos Fundamentais do React
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Todos os tópicos essenciais implementados e demonstrados no ecossistema deste projeto.
        </p>
      </div>

      <div className="guide-grid">
        {concepts.map((concept) => (
          <div key={concept.id} className="guide-card">
            <div className="guide-card-header">
              <div className="guide-card-icon">{concept.icon}</div>
              <h3 className="guide-card-title">{concept.title}</h3>
            </div>
            <p className="guide-card-text">{concept.description}</p>
            <pre className="guide-code-example">
              <code>{concept.snippet}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
