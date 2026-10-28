import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import ProjectFilter from './components/ProjectFilter';
import ProjectList from './components/ProjectList';
import ProjectModal from './components/ProjectModal';
import VirtualDomVisualizer from './components/VirtualDomVisualizer';
import ConceptGuide from './components/ConceptGuide';
import Toast from './components/Toast';
import { initialProjects, CATEGORIES, STATUS_OPTIONS } from './data/initialProjects';
import { FolderGit2, Cpu, BookOpen } from 'lucide-react';

export default function App() {
  // Estado de Tema (Light / Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'light';
  });

  // Estado dos Projetos
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('react-projects-data');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // Estados de Navegação e Filtros
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'vdom' | 'guide'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Estados do Modal e Toast
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  // Efeito para persistência de tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Efeito para persistência dos dados
  useEffect(() => {
    localStorage.setItem('react-projects-data', JSON.stringify(projects));
  }, [projects]);

  // Alternador de Tema
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Helper para disparar mensagens toast
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
  };

  // Ações de gerenciamento de lista
  const handleToggleFavorite = (id) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, favorite: !proj.favorite } : proj
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === id) {
          const isDone = newStatus === 'concluido';
          return {
            ...proj,
            status: newStatus,
            progress: isDone ? 100 : proj.progress === 100 ? 50 : proj.progress
          };
        }
        return proj;
      })
    );
    showToast('Status do projeto atualizado!', 'info');
  };

  const handleDeleteProject = (id) => {
    const item = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast(`Projeto "${item?.title || ''}" removido com sucesso.`, 'danger');
  };

  const handleSaveProject = (projectData) => {
    if (projectToEdit) {
      // Atualização
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === projectToEdit.id ? { ...proj, ...projectData } : proj
        )
      );
      showToast('Projeto atualizado com sucesso!', 'success');
    } else {
      // Inserção de novo projeto
      const newProject = {
        ...projectData,
        id: `proj-${Date.now()}`,
        favorite: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProjects((prev) => [newProject, ...prev]);
      showToast('Novo projeto cadastrado com sucesso!', 'success');
    }
  };

  const handleSelectProject = (project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleOpenNewModal = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  // Filtragem e busca da lista com useMemo para otimizar renderizações
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.author && project.author.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategory === 'Todas' || project.category === selectedCategory;

      const matchStatus =
        selectedStatus === 'todos' || project.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  const completedProjectsCount = projects.filter((p) => p.status === 'concluido').length;

  return (
    <div className="app-container">
      {/* Componente Header com Props e callbacks */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        totalProjects={projects.length}
        completedCount={completedProjectsCount}
      />

      {/* Navegação por Abas demonstrando Renderização Condicional */}
      <nav className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <FolderGit2 size={18} />
          <span>Projetos & Aplicação</span>
          <span className="tab-count">{projects.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'vdom' ? 'active' : ''}`}
          onClick={() => setActiveTab('vdom')}
        >
          <Cpu size={18} />
          <span>Simulador Virtual DOM</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
          onClick={() => setActiveTab('guide')}
        >
          <BookOpen size={18} />
          <span>Guia de Conceitos</span>
        </button>
      </nav>

      {/* Renderização Condicional do conteúdo principal de acordo com activeTab */}
      <main>
        {activeTab === 'projects' && (
          <section>
            {/* Componente de Métricas com Props */}
            <StatsOverview projects={projects} />

            {/* Barra de Filtros com Props controladas e callbacks */}
            <ProjectFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              categories={CATEGORIES}
              statusOptions={STATUS_OPTIONS}
              viewMode={viewMode}
              onToggleViewMode={() =>
                setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'))
              }
              onOpenNewModal={handleOpenNewModal}
            />

            {/* Lista de Projetos com Renderização de Listas e Condicionais */}
            <ProjectList
              projects={filteredProjects}
              viewMode={viewMode}
              onToggleFavorite={handleToggleFavorite}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteProject}
              onSelect={handleSelectProject}
              onResetFilters={() => {
                setSearchTerm('');
                setSelectedCategory('Todas');
                setSelectedStatus('todos');
              }}
            />
          </section>
        )}

        {activeTab === 'vdom' && <VirtualDomVisualizer />}

        {activeTab === 'guide' && <ConceptGuide />}
      </main>

      {/* Modal de Criação / Edição com Renderização Condicional interna */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
        categories={CATEGORIES}
      />

      {/* Toast Feedback com Renderização Condicional */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
