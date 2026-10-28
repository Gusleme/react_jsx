export const initialProjects = [
  {
    id: 'proj-1',
    title: 'E-commerce Moderno com React & Redux',
    category: 'Frontend',
    description: 'Interface de loja virtual com catálogo de produtos, carrinho de compras reativo e checkout.',
    status: 'concluido',
    tags: ['React', 'Redux', 'Tailwind', 'JSX'],
    priority: 'Alta',
    favorite: true,
    progress: 100,
    createdAt: '2026-09-15',
    author: 'Equipe Alpha'
  },
  {
    id: 'proj-2',
    title: 'Dashboard de Análise de Métricas em Tempo Real',
    category: 'Fullstack',
    description: 'Painel corporativo com gráficos interativos, websockets para telemetria e renderização de listas em lote.',
    status: 'em-andamento',
    tags: ['React', 'WebSockets', 'ChartJS', 'Virtual DOM'],
    priority: 'Urgente',
    favorite: true,
    progress: 65,
    createdAt: '2026-10-01',
    author: 'Gustavo Castro'
  },
  {
    id: 'proj-3',
    title: 'Design System & Componentes Reutilizáveis',
    category: 'Design System',
    description: 'Biblioteca interna de componentes funcionais com foco em tipagem estrita de props, acessibilidade e temas.',
    status: 'em-andamento',
    tags: ['Componentes', 'Props', 'Storybook', 'UI/UX'],
    priority: 'Média',
    favorite: false,
    progress: 40,
    createdAt: '2026-10-10',
    author: 'UX Lab'
  },
  {
    id: 'proj-4',
    title: 'Simulador Didático de Reconciliação do Virtual DOM',
    category: 'Educacional',
    description: 'Ferramenta interativa para demonstrar como o algoritmo de Diffing e patch funciona internamente no React.',
    status: 'concluido',
    tags: ['Virtual DOM', 'Diffing', 'Algoritmos', 'Didática'],
    priority: 'Alta',
    favorite: true,
    progress: 100,
    createdAt: '2026-10-18',
    author: 'Time de Ensino'
  },
  {
    id: 'proj-5',
    title: 'Aplicativo Mobile Híbrido com React Native',
    category: 'Mobile',
    description: 'Migração de componentes da web para o ecossistema mobile com reaproveitamento de regras de negócio.',
    status: 'planejado',
    tags: ['React Native', 'Mobile', 'Componentes'],
    priority: 'Baixa',
    favorite: false,
    progress: 10,
    createdAt: '2026-10-22',
    author: 'Squad Mobile'
  },
  {
    id: 'proj-6',
    title: 'Gerenciador de Tarefas com Renderização Condicional',
    category: 'Frontend',
    description: 'Exemplo prático de alternância dinâmica de visões, empty states inteligentes e filtros reativos.',
    status: 'planejado',
    tags: ['Renderização Condicional', 'Listas', 'Hooks'],
    priority: 'Média',
    favorite: false,
    progress: 0,
    createdAt: '2026-10-25',
    author: 'Gustavo Castro'
  }
];

export const CATEGORIES = ['Todas', 'Frontend', 'Fullstack', 'Design System', 'Educacional', 'Mobile'];
export const STATUS_OPTIONS = [
  { value: 'todos', label: 'Todos os Status' },
  { value: 'concluido', label: 'Concluído' },
  { value: 'em-andamento', label: 'Em Andamento' },
  { value: 'planejado', label: 'Planejado' }
];
