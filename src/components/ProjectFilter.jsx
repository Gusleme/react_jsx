import React from 'react';
import { Search, Plus, LayoutGrid, List, X } from 'lucide-react';

/**
 * Componente ProjectFilter
 * Demonstra:
 * - Props: Recebe múltiplos valores e funções de callback para atualizar o estado no componente pai
 * - Listas em JSX: Mapeamento do array de categorias e status para tags <option>
 * - Renderização Condicional: Exibe o botão "Limpar Filtros" somente quando há filtros aplicados
 */
export default function ProjectFilter({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  categories = [],
  statusOptions = [],
  viewMode,
  onToggleViewMode,
  onOpenNewModal
}) {
  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'Todas' || selectedStatus !== 'todos';

  const handleClearFilters = () => {
    onSearchChange('');
    onCategoryChange('Todas');
    onStatusChange('todos');
  };

  return (
    <div className="filter-bar">
      <div className="filter-inputs">
        {/* Campo de Busca */}
        <div className="search-wrapper">
          <Search size={16} className="search-icon-pos" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por título, tag ou autor..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filtro por Categoria usando .map em JSX */}
        <select
          className="select-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              Categoria: {cat}
            </option>
          ))}
        </select>

        {/* Filtro por Status usando .map em JSX */}
        <select
          className="select-filter"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Renderização Condicional: Botão limpar filtros com operador && */}
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="btn-secondary"
            style={{ padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            title="Limpar todos os filtros"
          >
            <X size={15} />
            <span>Limpar</span>
          </button>
        )}
      </div>

      <div className="filter-actions">
        {/* Alternador de Visão Grid / Lista com operador ternário para ícone e estilo */}
        <button
          onClick={onToggleViewMode}
          className="btn-icon"
          title={`Alternar para visão de ${viewMode === 'grid' ? 'lista' : 'grade'}`}
        >
          {viewMode === 'grid' ? <List size={18} /> : <LayoutGrid size={18} />}
        </button>

        {/* Botão de Criação */}
        <button onClick={onOpenNewModal} className="btn-primary">
          <Plus size={16} />
          <span>Novo Projeto</span>
        </button>
      </div>
    </div>
  );
}
