import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';

/**
 * Componente ProjectModal
 * Demonstra:
 * - Renderização Condicional: Retorna `null` caso `isOpen` seja falso
 * - Formulário Controlado com estado local sincronizado via props
 * - Renderização Condicional de erros de validação
 * - Comunicação com componente pai via callbacks nas props
 */
export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  projectToEdit = null,
  categories = []
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Frontend',
    description: '',
    status: 'planejado',
    tags: '',
    priority: 'Média',
    progress: 0,
    author: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        category: projectToEdit.category,
        description: projectToEdit.description,
        status: projectToEdit.status,
        tags: projectToEdit.tags ? projectToEdit.tags.join(', ') : '',
        priority: projectToEdit.priority || 'Média',
        progress: projectToEdit.progress || 0,
        author: projectToEdit.author || ''
      });
    } else {
      setFormData({
        title: '',
        category: categories.length > 1 ? categories[1] : 'Frontend',
        description: '',
        status: 'planejado',
        tags: '',
        priority: 'Média',
        progress: 0,
        author: ''
      });
    }
    setErrors({});
  }, [projectToEdit, isOpen, categories]);

  // Se o modal não estiver aberto, não renderiza absolutamente nada (Renderização Condicional Pura)
  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) {
      errs.title = 'O título do projeto é obrigatório.';
    }
    if (!formData.description.trim()) {
      errs.description = 'A descrição do projeto é obrigatória.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedTags = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectData = {
      ...formData,
      tags: formattedTags,
      progress: Number(formData.progress)
    };

    onSave(projectData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {projectToEdit ? 'Detalhes / Editar Projeto' : 'Cadastrar Novo Projeto'}
          </h2>
          <button onClick={onClose} className="btn-icon" title="Fechar modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Título do Projeto *</label>
              <input
                type="text"
                className="form-input"
                placeholder="Ex: App de Gestão Financeira"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {/* Renderização Condicional de mensagem de erro */}
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.filter((c) => c !== 'Todas').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status Inicial</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="planejado">Planejado</option>
                  <option value="em-andamento">Em Andamento</option>
                  <option value="concluido">Concluído</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Descrição *</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Descreva as metas e tecnologias do projeto..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <p className="error-text">{errors.description}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Autor / Responsável</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nome do desenvolvedor"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Progresso ({formData.progress}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  style={{ width: '100%', marginTop: '0.5rem' }}
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags (separadas por vírgula)</label>
              <input
                type="text"
                className="form-input"
                placeholder="React, Hooks, TypeScript, JSX"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} />
              <span>{projectToEdit ? 'Salvar Alterações' : 'Criar Projeto'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

