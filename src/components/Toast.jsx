import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

/**
 * Componente Toast
 * Demonstra:
 * - Renderização Condicional: Se não houver mensagem/objeto toast, retorna null
 * - Estilização condicional baseada no tipo (sucesso, alerta, informação)
 * - Efeito colateral temporizado para auto-fechamento
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} color="#22c55e" />;
      case 'danger':
        return <AlertCircle size={18} color="#ef4444" />;
      case 'info':
      default:
        return <Info size={18} color="var(--accent-primary)" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type || 'info'}`}>
        {renderIcon()}
        <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>{toast.message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            marginLeft: '0.5rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

