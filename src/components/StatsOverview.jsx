import React from 'react';
import { FolderGit2, CheckCircle2, Clock, Sparkles, AlertCircle } from 'lucide-react';

/**
 * Componente StatsOverview
 * Demonstra:
 * - Props: Recebe a lista de projetos como propriedade
 * - JSX: Cálculos de agregação via JavaScript inseridos diretamente no layout
 * - Renderização Condicional: Mensagem comemorativa caso todos os itens estejam prontos
 */
export default function StatsOverview({ projects = [] }) {
  const total = projects.length;
  const concluidos = projects.filter(p => p.status === 'concluido').length;
  const emAndamento = projects.filter(p => p.status === 'em-andamento').length;
  const planejados = projects.filter(p => p.status === 'planejado').length;

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(37, 99, 235, 0.12)', color: 'var(--accent-primary)' }}>
            <FolderGit2 size={24} />
          </div>
          <div className="stat-info">
            <h4>Total de Projetos</h4>
            <p>{total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--status-completed-bg)', color: 'var(--status-completed-text)' }}>
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <h4>Concluídos</h4>
            <p>{concluidos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--status-progress-bg)', color: 'var(--status-progress-text)' }}>
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h4>Em Andamento</h4>
            <p>{emAndamento}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'var(--status-planned-bg)', color: 'var(--status-planned-text)' }}>
            <Sparkles size={24} />
          </div>
          <div className="stat-info">
            <h4>Planejados</h4>
            <p>{planejados}</p>
          </div>
        </div>
      </div>

      {/* Renderização condicional com operador lógico && */}
      {total > 0 && concluidos === total && (
        <div style={{
          backgroundColor: 'var(--status-completed-bg)',
          color: 'var(--status-completed-text)',
          border: '1px solid var(--status-completed-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          <Sparkles size={20} />
          <span>Parabéns! Todos os projetos cadastrados estão 100% concluídos!</span>
        </div>
      )}
    </div>
  );
}

