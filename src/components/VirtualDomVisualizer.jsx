import React, { useState, useEffect } from 'react';
import { Cpu, Zap, RefreshCw, CheckCircle, ArrowRight, Layers, Database } from 'lucide-react';

/**
 * Componente Didático: Simulador e Visualizador do Virtual DOM
 * 
 * Explica e demonstra na prática:
 * 1. O que é o Virtual DOM: uma representação leve em memória do DOM real.
 * 2. Reconciliação e Algoritmo de Diffing: cálculo das diferenças entre a versão anterior e a nova.
 * 3. Batching e Patches pontuais no DOM real: evita reflows/repaints caros no navegador.
 */
export default function VirtualDomVisualizer() {
  const [counter, setCounter] = useState(1);
  const [userName, setUserName] = useState('Gustavo');
  const [lastUpdatedNode, setLastUpdatedNode] = useState(null);
  const [reconcileCount, setReconcileCount] = useState(0);
  const [isDiffing, setIsDiffing] = useState(false);

  const handleUpdateCounter = () => {
    setIsDiffing(true);
    setCounter((prev) => prev + 1);
    setLastUpdatedNode('counter');
    setReconcileCount((prev) => prev + 1);
    setTimeout(() => setIsDiffing(false), 600);
  };

  const handleUpdateName = (newName) => {
    setIsDiffing(true);
    setUserName(newName);
    setLastUpdatedNode('user');
    setReconcileCount((prev) => prev + 1);
    setTimeout(() => setIsDiffing(false), 600);
  };

  return (
    <div className="vdom-container">
      <div className="vdom-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <Cpu size={28} color="var(--accent-primary)" />
          <h2>Como o Virtual DOM do React Funciona?</h2>
        </div>
        <p>
          O <strong>Virtual DOM (VDOM)</strong> é uma cópia leve e em memória da árvore do DOM real do navegador.
          Quando o estado ou as props de um componente mudam, o React cria uma nova árvore virtual, executa o
          processo de <strong>Diffing (Reconciliação)</strong> para identificar exatamente o que mudou e aplica
          apenas as alterações necessárias (<strong>Patch</strong>) no DOM real, garantindo máxima performance.
        </p>
      </div>

      {/* Controles de Simulação Interativa */}
      <div className="vdom-box">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} color="var(--accent-primary)" />
          <span>Simulador Interativo de Reconciliação</span>
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button onClick={handleUpdateCounter} className="btn-primary">
            <RefreshCw size={16} className={isDiffing ? 'animate-spin' : ''} />
            <span>Incrementar Contador ({counter})</span>
          </button>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mudar Nome:</span>
            {['Gustavo', 'Beatriz', 'Lucas', 'Ana'].map((name) => (
              <button
                key={name}
                onClick={() => handleUpdateName(name)}
                className={`btn-secondary ${userName === name ? 'active' : ''}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.8rem',
                  borderColor: userName === name ? 'var(--accent-primary)' : 'var(--border-color)',
                  backgroundColor: userName === name ? 'var(--status-progress-bg)' : 'transparent'
                }}
              >
                {name}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Ciclos de Reconciliação: <strong>{reconcileCount}</strong>
          </div>
        </div>

        {/* Visualização Comparativa VDOM vs Real DOM */}
        <div className="vdom-comparison">
          {/* Lado Esquerdo: Virtual DOM (em memória) */}
          <div className="vdom-box" style={{ borderStyle: 'dashed' }}>
            <div className="vdom-box-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Layers size={16} color="var(--accent-primary)" />
                Virtual DOM (Memória JS)
              </span>
              <span className="vdom-badge" style={{ backgroundColor: 'var(--status-progress-bg)', color: 'var(--status-progress-text)' }}>
                {isDiffing ? 'Calculando Diffing...' : 'Árvore Sincronizada'}
              </span>
            </div>

            <div className="tree-node">
              <span>&lt;App /&gt;</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Nó Raiz</span>
            </div>

            <div className={`tree-node ${lastUpdatedNode === 'user' && isDiffing ? 'highlight-diff' : ''}`} style={{ marginLeft: '1rem' }}>
              <span>&lt;Header user="{userName}" /&gt;</span>
              {lastUpdatedNode === 'user' && isDiffing ? (
                <span style={{ color: '#eab308', fontSize: '0.75rem', fontWeight: 700 }}>DIFF DETECTADO</span>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Props estáveis</span>
              )}
            </div>

            <div className={`tree-node ${lastUpdatedNode === 'counter' && isDiffing ? 'highlight-diff' : ''}`} style={{ marginLeft: '1rem' }}>
              <span>&lt;Counter value={counter} /&gt;</span>
              {lastUpdatedNode === 'counter' && isDiffing ? (
                <span style={{ color: '#eab308', fontSize: '0.75rem', fontWeight: 700 }}>DIFF DETECTADO</span>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Estado estável</span>
              )}
            </div>

            <div className="tree-node" style={{ marginLeft: '1rem' }}>
              <span>&lt;Footer /&gt;</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Sem mudanças (ignorado)</span>
            </div>
          </div>

          {/* Lado Direito: DOM Real (Navegador) */}
          <div className="vdom-box">
            <div className="vdom-box-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <Database size={16} color="#22c55e" />
                Real DOM (Navegador)
              </span>
              <span className="vdom-badge" style={{ backgroundColor: 'var(--status-completed-bg)', color: 'var(--status-completed-text)' }}>
                {isDiffing ? 'Aplicando Patch...' : 'DOM Atualizado'}
              </span>
            </div>

            <div className="tree-node">
              <span>&lt;div id="root"&gt;</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Preservado</span>
            </div>

            <div className={`tree-node ${lastUpdatedNode === 'user' && isDiffing ? 'highlight-patch' : ''}`} style={{ marginLeft: '1rem' }}>
              <span>&lt;h1&gt;Bem-vindo, {userName}!&lt;/h1&gt;</span>
              {lastUpdatedNode === 'user' && isDiffing ? (
                <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 700 }}>PATCH PONTUAL</span>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Sem reflow</span>
              )}
            </div>

            <div className={`tree-node ${lastUpdatedNode === 'counter' && isDiffing ? 'highlight-patch' : ''}`} style={{ marginLeft: '1rem' }}>
              <span>&lt;span&gt;Contador: {counter}&lt;/span&gt;</span>
              {lastUpdatedNode === 'counter' && isDiffing ? (
                <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 700 }}>PATCH PONTUAL</span>
              ) : (
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Sem reflow</span>
              )}
            </div>

            <div className="tree-node" style={{ marginLeft: '1rem' }}>
              <span>&lt;footer&gt;Rodapé estático&lt;/footer&gt;</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Não re-renderizado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo didático dos 3 passos de Reconciliação */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="vdom-box">
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
            1. Renderização Virtual
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Toda vez que <code>setState</code> ou uma prop é alterada, o React executa a função do componente e gera uma nova árvore de elementos JavaScript puros (Virtual DOM).
          </p>
        </div>

        <div className="vdom-box">
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#eab308' }}>
            2. Algoritmo de Diffing
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            O React compara a árvore anterior com a nova em memória com complexidade \(O(n)\), identificando exatamente quais atributos ou nós de texto mudaram.
          </p>
        </div>

        <div className="vdom-box">
          <div style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#22c55e' }}>
            3. Patch Cirúrgico no DOM
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Em vez de substituir todo o HTML e forçar recálculos caros de layout e repintura, o React aplica cirurgicamente apenas as diferenças no DOM real.
          </p>
        </div>
      </div>
    </div>
  );
}
