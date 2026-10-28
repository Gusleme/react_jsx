import React from 'react';
import { Star, CheckCircle, Clock, CircleDot, Trash2, Calendar, User, Eye } from 'lucide-react';

/**
 * Componente ProjectCard
 * Demonstra:
 * - Desestruturação de Props complexa
 * - Callbacks passados via props para disparar mutações no pai
 * - Renderização Condicional múltipla:
 *   1. Ícone e classe do status (Switch/Ternário)
 *   2. Cor e ícone do botão favoritar
 *   3. Barra de progresso visual
 * - Listas em JSX: Mapeamento da lista de tags com chave 'key' única
 */
export default function ProjectCard({
  project,
  onToggleFavorite,
  onStatusChange,
  onDelete,
  onSelect
}) {
  const { id, title, category, description, status, tags = [], priority, favorite, progress, createdAt, author } = project;

  // Função auxiliar para renderização condicional do Badge de Status
  const renderStatusBadge = () => {
    switch (status) {
      case 'concluido':
        return (
          <span className="status-badge status-concluido">
            <CheckCircle size={13} />
            Concluído
          </span>
        );
      case 'em-andamento':
        return (
          <span className="status-badge status-em-andamento">
            <Clock size={13} />
            Em Andamento
          </span>
        );
      case 'planejado':
      default:
        return (
          <span className="status-badge status-planejado">
            <CircleDot size={13} />
            Planejado
          </span>
        );
    }
  };

  return (
    <div className="project-card">
      <div>
        <div className="card-top">
          <span className="category-tag">{category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {/* Renderização Condicional de Status Badge */}
            {renderStatusBadge()}

            {/* Botão de Favoritar com renderização condicional de ícone */}
            <button
              onClick={() => onToggleFavorite(id)}
              className="btn-icon"
              style={{
                padding: '0.3rem',
                border: 'none',
                background: 'transparent',
                color: favorite ? '#eab308' : 'var(--text-muted)'
              }}
              title={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Star size={16} fill={favorite ? '#eab308' : 'none'} />
            </button>
          </div>
        </div>

        <h3 className="card-title" onClick={() => onSelect(project)} style={{ cursor: 'pointer' }}>
          {title}
        </h3>

        <p className="card-description">{description}</p>

        {/* Barra de Progresso com estilização dinâmica via objeto de estilo em JSX */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem', color: 'var(--text-muted)' }}>
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-muted)', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: status === 'concluido' ? '#22c55e' : 'var(--accent-primary)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Renderização de Lista de Tags com .map() e key única */}
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={`${id}-tag-${index}`} className="tag-badge">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="card-meta">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} />
            {createdAt}
          </span>
          {author && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <User size={13} />
              {author}
            </span>
          )}
        </div>

        <div className="card-actions">
          {/* Seletor rápido para mudar status */}
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            style={{
              padding: '0.3rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <option value="planejado">Planejado</option>
            <option value="em-andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
          </select>

          <button
            onClick={() => onSelect(project)}
            className="btn-icon"
            style={{ padding: '0.35rem' }}
            title="Ver detalhes"
          >
            <Eye size={15} />
          </button>

          <button
            onClick={() => onDelete(id)}
            className="btn-icon"
            style={{ padding: '0.35rem', color: '#ef4444' }}
            title="Excluir projeto"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
