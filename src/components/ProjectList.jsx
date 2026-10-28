import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import ProjectCard from './ProjectCard';

/**
 * Componente ProjectList
 * Demonstra:
 * - Listas em React: Renderização eficiente com .map() e atributo 'key' único
 * - Renderização Condicional:
 *   1. Se a lista estiver vazia (Empty State com botão de reset)
 *   2. Alternância dinâmica de layout CSS (Grid vs List View)
 * - Prop Drilling saudável / repasse de callbacks para componentes filhos
 */
export default function ProjectList({
  projects = [],
  viewMode = 'grid',
  onToggleFavorite,
  onStatusChange,
  onDelete,
  onSelect,
  onResetFilters
}) {
  // Renderização Condicional: Estado vazio (Empty State)
  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <SearchX size={48} />
        </div>
        <h3 className="empty-title">Nenhum projeto encontrado</h3>
        <p className="empty-text">
          Não localizamos nenhum projeto correspondente aos filtros atuais. Tente ajustar os termos de busca ou filtros selecionados.
        </p>
        <button onClick={onResetFilters} className="btn-secondary" style={{ margin: '0 auto' }}>
          <RotateCcw size={16} />
          <span>Restaurar Filtros</span>
        </button>
      </div>
    );
  }

  // Renderização de Lista com .map e chave 'key' obrigatória
  return (
    <div className={viewMode === 'grid' ? 'project-grid' : 'project-list-view'}>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onToggleFavorite={onToggleFavorite}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
