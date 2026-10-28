import React from 'react';
import { Layers, Sun, Moon, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Componente de Cabeçalho (Header)
 * Demonstra:
 * - JSX: Sintaxe estruturada com interpolação de expressões {}
 * - Componentes: Componente funcional isolado e reutilizável
 * - Props: Recebe 'theme', 'onToggleTheme', 'totalProjects', 'completedCount'
 * - Renderização Condicional: Ícones de tema (Sun/Moon) e badge condicional
 */
export default function Header({ theme, onToggleTheme, totalProjects = 0, completedCount = 0 }) {
  // Cálculo derivado demonstrando expressões em JSX
  const completionRate = totalProjects > 0 
    ? Math.round((completedCount / totalProjects) * 100) 
    : 0;

  return (
    <header className="header">
      <div className="brand-section">
        <div className="brand-icon" title="React Concept Engine">
          <Layers size={24} />
        </div>
        <div>
          <h1 className="brand-title">React Mastery Hub</h1>
          <p className="brand-subtitle">
            Explorando JSX, Componentes, Props, Virtual DOM, Listas & Condicionais
          </p>
        </div>
      </div>

      <div className="header-actions">
        {/* Renderização Condicional com operador ternário para exibir progresso global */}
        {totalProjects > 0 && (
          <div 
            className="status-badge status-concluido" 
            title={`${completedCount} de ${totalProjects} concluídos`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'default' }}
          >
            <CheckCircle2 size={14} />
            <span>{completionRate}% Concluído</span>
          </div>
        )}

        {/* Botão de Alternância de Tema demonstrando callbacks recebidos via props */}
        <button 
          onClick={onToggleTheme} 
          className="btn-icon"
          title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#475569" />}
        </button>
      </div>
    </header>
  );
}
