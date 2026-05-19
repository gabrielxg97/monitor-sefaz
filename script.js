const menus = {
  produtos: {
    title: 'Produtos',
    subtitle: 'Gestão de produtos',
    sections: [
      { label:'Itens', items: [
        { icon:'🏷️', name:'Categorias e Subcategorias', desc:'Organizar seções', page:'produtos-categorias' },
        { icon:'📋', name:'Contagem de Estoque', desc:'Inventário físico', page:'produtos-contagem' },
        { icon:'🧩', name:'Grupos de Composição', desc:'Combinações de itens', page:'produtos-composicao' },
        { icon:'🍽️', name:'Listagem de Produtos', desc:'Todos os produtos', page:'produtos-lista' },
        { icon:'🌾', name:'Matéria Prima', desc:'Gestão de insumos', page:'produtos-materia' },
        { icon:'⚖️', name:'Unidades de Medida', desc:'Gerenciar unidades', page:'produtos-unidades' },
      ]}
    ]
  },
  vendas: {
    title: 'Vendas',
    subtitle: 'Gestão comercial',
    sections: [
      { label:'Operação', items: [
        { icon:'💻', name:'Caixa (PDV)', desc:'Frente de caixa', page:'vendas-caixa' },
        { type:'divider', name: 'DELIVERY' },
        { icon:'🌐', name:'Pedidos Ecommerce', desc:'Cardápio/Ifood', page:'vendas-delivery-ecommerce', indent: true },
        { icon:'📝', name:'Pedidos Delivery', desc:'Lançamento Manual', page:'vendas-delivery-manual', indent: true }
      ]},
      { label:'Configurações', items: [
        { icon:'📱', name:'Cardápio Digital', desc:'Menu Online', page:'vendas-cardapio-digital' },
        { icon:'💳', name:'Formas de Pagamento', desc:'Tipos aceitos', page:'vendas-pagamentos' },
        { icon:'📋', name:'Criar Comandas', desc:'Setup de comandas', page:'vendas-comandas' },
        { icon:'🪑', name:'Criar Mesas', desc:'Setup de mesas', page:'vendas-mesas' },
      ]},
      { label:'Ofertas', items: [
        { icon:'🎁', name:'Promoções', desc:'Happy hour, atacado', page:'produtos-promocoes' },
      ]}
    ]
  },
  pedidos: {
    title: 'Pedidos',
    subtitle: 'Gestão de pedidos',
    sections: [
      { label:'Tipos', items: [
        { icon:'📋', name:'Todos', desc:'Histórico geral', page:'pedidos-lista' },
        { icon:'🛵', name:'Delivery', desc:'Entregas em rota', page:'pedidos-delivery', badge:'5', badgeClass:'' },
        { icon:'🪑', name:'Balcão', desc:'Retirada no local', page:'pedidos-balcao' },
      ]},
      { label:'Gestão', items: [
        { icon:'⏳', name:'Fila', desc:'Ordem de preparo', page:'pedidos-fila', badge:'7', badgeClass:'red' },
        { icon:'❌', name:'Cancelamentos', desc:'Pedidos cancelados', page:'pedidos-cancelamentos' },
      ]}
    ]
  },
  cozinha: {
    title: 'Cozinha',
    subtitle: 'Controle de produção',
    sections: [
      { label:'Operação', items: [
        { icon:'🧾', name:'Comandas', desc:'Fila de preparo', page:'cozinha-comandas', badge:'6', badgeClass:'red' },
        { icon:'⏱️', name:'Tempos', desc:'SLA por prato', page:'cozinha-tempos' },
        { icon:'🧑🍳', name:'Estações', desc:'Grelha, forno, frio', page:'cozinha-estacoes' },
      ]}
    ]
  },
  mesas: {
    title: 'Mesas',
    subtitle: 'Gestão do salão',
    sections: [
      { label:'Salão', items: [
        { icon:'🗺️', name:'Mapa', desc:'Visão do salão', page:'mesas-mapa' },
        { icon:'📑', name:'Contas', desc:'Fechar mesa', page:'mesas-contas' },
        { icon:'🔄', name:'Reservas', desc:'Agendamentos', page:'mesas-reservas' },
      ]}
    ]
  },
  estoque: {
    title: 'Estoque',
    subtitle: 'Controle de insumos',
    sections: [
      { label:'Gestão', items: [
        { icon:'📦', name:'Produtos', desc:'Insumos e ingredientes', page:'estoque-produtos' },
        { icon:'📥', name:'Entradas', desc:'Recebimento', page:'estoque-entradas' },
        { icon:'📤', name:'Saídas', desc:'Consumo registrado', page:'estoque-saidas' },
        { icon:'🏭', name:'Depósitos', desc:'Múltiplos estoques', page:'estoque-depositos' },
        { icon:'⚠️', name:'Alertas', desc:'Itens em falta', page:'estoque-alertas', badge:'2', badgeClass:'red' },
      ]}
    ]
  },
  financeiro: {
    title: 'Financeiro',
    subtitle: 'Gestão financeira',
    sections: [
      { label:'Caixa', items: [
        { icon:'💵', name:'Caixa', desc:'Movimentação do dia', page:'financeiro-caixa' },
        { icon:'💳', name:'Pagamentos', desc:'Formas de pagamento', page:'financeiro-pagamentos' },
      ]},
      { label:'Gestão', items: [
        { icon:'🏦', name:'Fluxo de Caixa', desc:'Entradas e saídas', page:'financeiro-fluxo' },
        { icon:'📃', name:'Contas a Pagar', desc:'Fornecedores', page:'financeiro-contas' },
      ]}
    ]
  },
  relatorios: {
    title: 'Relatórios',
    subtitle: 'Análises e métricas',
    sections: [
      { label:'Análises', items: [
        { icon:'💹', name:'Vendas', desc:'Receita e faturamento', page:'relatorios-vendas' },
        { icon:'📈', name:'Crescimento', desc:'Evolução mensal', page:'relatorios-crescimento' },
        { icon:'🏆', name:'Ranking', desc:'Top produtos', page:'relatorios-ranking' },
      ]},
      { label:'Operacional', items: [
        { icon:'⏱️', name:'Tempo Médio', desc:'Performance da cozinha', page:'relatorios-tempo' },
        { icon:'🚚', name:'Delivery', desc:'Taxa de entrega', page:'relatorios-delivery' },
      ]}
    ]
  }
};

let currentMenu = null;
let currentPage = 'dashboard';

// --- ESTADO DO PDV (CAIXA) ---
let caixaStatus = localStorage.getItem('caixaStatus') || 'fechado';
let caixaSaldoInicial = parseFloat(localStorage.getItem('caixaSaldoInicial')) || 0;
let mockMesas = JSON.parse(localStorage.getItem('mockMesas')) || [];
let mockComandas = JSON.parse(localStorage.getItem('mockComandas')) || [];
let mockVendas = JSON.parse(localStorage.getItem('mockVendas')) || [];
let cart = JSON.parse(localStorage.getItem('pdvCart')) || [];
let activeCaixaTab = 'venda-direta';

let mockEntregadores = JSON.parse(localStorage.getItem('mockEntregadores')) || [
  { id: 1, nome: 'Carlos (Moto 1)', ativo: true },
  { id: 2, nome: 'Felipe (Moto 2)', ativo: true },
  { id: 3, nome: 'Ricardo (Bike)', ativo: true }
];

let cardapioConfig = JSON.parse(localStorage.getItem('cardapioConfig')) || {};
if (!cardapioConfig.nome) cardapioConfig.nome = 'FoodFlow Burguer';
if (!cardapioConfig.endereco) cardapioConfig.endereco = 'Rua Principal, 123 - Centro';
if (!cardapioConfig.instagram) cardapioConfig.instagram = '@foodflow';
if (!cardapioConfig.whatsapp) cardapioConfig.whatsapp = '5511999999999';
if (!cardapioConfig.tempoEntrega) cardapioConfig.tempoEntrega = '45-60 min';
if (!cardapioConfig.tempoRetirada) cardapioConfig.tempoRetirada = '20-30 min';
if (!cardapioConfig.pedidoMinimo) cardapioConfig.pedidoMinimo = 20;
if (!cardapioConfig.dominio) cardapioConfig.dominio = 'foodflow.com.br';
if (!cardapioConfig.pagamentos) cardapioConfig.pagamentos = ['Dinheiro', 'Pix', 'Crédito', 'Débito'];
if (!cardapioConfig.servicos) cardapioConfig.servicos = { entrega: true, retirada: true };
if (!cardapioConfig.tipoEntrega) cardapioConfig.tipoEntrega = 'raio';
if (!cardapioConfig.raioTiers) cardapioConfig.raioTiers = [{ kmAte: 5, taxa: 5.00 }];
if (!cardapioConfig.bairros) cardapioConfig.bairros = [{ nome: 'Centro', taxa: 5 }, { nome: 'Jardins', taxa: 8 }];

if (!cardapioConfig.diasHorarios || typeof cardapioConfig.horarios === 'string') {
  cardapioConfig.diasHorarios = [
    { dia: 'Segunda-feira', ativo: false, abertura: '18:00', fechamento: '23:00' },
    { dia: 'Terça-feira', ativo: true, abertura: '18:00', fechamento: '23:30' },
    { dia: 'Quarta-feira', ativo: true, abertura: '18:00', fechamento: '23:30' },
    { dia: 'Quinta-feira', ativo: true, abertura: '18:00', fechamento: '23:30' },
    { dia: 'Sexta-feira', ativo: true, abertura: '18:00', fechamento: '23:59' },
    { dia: 'Sábado', ativo: true, abertura: '18:00', fechamento: '23:59' },
    { dia: 'Domingo', ativo: true, abertura: '18:00', fechamento: '23:30' }
  ];
  delete cardapioConfig.horarios;
}

let mockDelivery = JSON.parse(localStorage.getItem('mockDelivery')) || [];
if (mockDelivery.length === 0) {
  mockDelivery = [
    {
      id: 1001,
      tipo: 'Entrega',
      status: 'novo',
      hora: new Date().toISOString(),
      cliente: 'João Silva',
      telefone: '11988887777',
      endereco: 'Rua das Primaveras, 45 - Apto 21',
      itens: [{ nome: 'X-Burger', qtd: 2, preco: 25.00 }],
      subtotal: 50.00,
      taxa: 5.00,
      total: 55.00,
      pagamento: 'Pix',
      entregadorId: null
    },
    {
      id: 1002,
      tipo: 'Entrega',
      status: 'preparo',
      hora: new Date(Date.now() - 15*60000).toISOString(),
      cliente: 'Maria Oliveira',
      telefone: '11977776666',
      endereco: 'Av. Brasil, 1500 - Casa',
      itens: [{ nome: 'Pizza Calabresa', qtd: 1, preco: 45.00 }, { nome: 'Coca-Cola 2L', qtd: 1, preco: 12.00 }],
      subtotal: 57.00,
      taxa: 8.00,
      total: 65.00,
      pagamento: 'Dinheiro',
      entregadorId: null
    }
  ];
  localStorage.setItem('mockDelivery', JSON.stringify(mockDelivery));
}

// Navegação Drill-Down
let pdvNavLevel = 'categorias'; // 'categorias', 'subcategorias', 'produtos'
let pdvCurrentCat = null;
let pdvCurrentSubcat = null;
let pdvActiveComandaId = null; // null = venda direta, else = ID da comanda aberta
let modalContextMesa = null;
let modalContextComanda = null;
function renderSubmenu(menuKey) {
  const m = menus[menuKey];
  if (!m) return;
  
  // Remove existing accordions
  document.querySelectorAll('.nav-accordion').forEach(el => el.remove());

  const navItem = document.querySelector(`.nav-item[data-menu="${menuKey}"]`);
  if (!navItem) return;

  const accordion = document.createElement('div');
  accordion.className = 'nav-accordion';
  accordion.id = 'accordion-' + menuKey;

  let html = '';

  m.sections.forEach(sec => {
    if (sec.label) html += `<div class="submenu-section-label">${sec.label}</div>`;
    sec.items.forEach(item => {
      if (item.type === 'divider') {
        html += `<div style="font-size:11px;font-weight:700;color:var(--text-dim);margin:12px 12px 4px 12px;text-transform:uppercase;letter-spacing:1px">${item.name}</div>`;
        return;
      }
      const isActive = currentPage === item.page ? 'active' : '';
      const badge = item.badge ? `<span class="badge ${item.badgeClass || ''}">${item.badge}</span>` : '';
      const pl = item.indent ? '24px' : '12px';
      // Simplified sub-item for accordion
      html += `<div class="sub-item ${isActive}" data-page="${item.page}" onclick="navigateTo('${item.page}')" style="padding:10px 12px; padding-left:${pl}">
        <div class="sub-item-text">
          <div class="sub-item-name">${item.name}</div>
        </div>
        ${badge}
      </div>`;
    });
  });

  accordion.innerHTML = html;
  if (currentMenu === menuKey) {
    accordion.classList.add('open');
  }
  navItem.insertAdjacentElement('afterend', accordion);
}

function navigateTo(pageKey) {
  currentPage = pageKey;

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    if(p.id === 'page-vendas-caixa') p.style.display = 'none';
  });
  
  let domId = pageKey;
  if (pageKey === 'produtos-materia') domId = 'produtos-lista';
  
  const pg = document.getElementById('page-' + domId);
  if (pg) {
    pg.classList.add('active');
    if(domId === 'vendas-caixa') pg.style.display = 'flex';
  }

  if (pageKey === 'produtos-lista' || pageKey === 'produtos-materia') {
    renderProducts();
    const titleEl = document.getElementById('page-produtos-title');
    if (titleEl) titleEl.textContent = pageKey === 'produtos-materia' ? 'Matéria Prima' : 'Produtos para Venda';
  } else if (pageKey === 'produtos-unidades') {
    renderUnidades();
  } else if (pageKey === 'produtos-categorias') {
    renderCategorias();
  } else if (pageKey === 'produtos-composicao') {
    renderGrupos();
  } else if (pageKey === 'produtos-contagem') {
    renderContagem();
  } else if (pageKey === 'vendas-comandas') {
    if(typeof renderConfigComandas === 'function') renderConfigComandas();
  } else if (pageKey === 'vendas-mesas') {
    if(typeof renderConfigMesas === 'function') renderConfigMesas();
  } else if (pageKey === 'vendas-pagamentos') {
    if(typeof renderPagamentos === 'function') renderPagamentos();
  } else if (pageKey === 'vendas-cardapio-digital') {
    if(typeof renderCardapioConfig === 'function') renderCardapioConfig();
  } else if (pageKey === 'vendas-caixa') {
    if(typeof openCaixa === 'function') openCaixa();
  }

  // Apenas atualiza a classe active sem reconstruir o DOM (evita a "piscada")
  document.querySelectorAll('.sub-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageKey);
  });
}

function selectMenu(menuKey) {
  // Início: vai direto para o dashboard, sem submenu
  if (menuKey === 'dashboard') {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('[data-menu="dashboard"]').classList.add('active');
    document.querySelectorAll('.nav-accordion').forEach(a => a.classList.remove('open'));
    currentMenu = null;
    navigateTo('dashboard');
    return;
  }

  // Se clicou no menu que já está aberto: apenas fecha
  if (currentMenu === menuKey) {
    const acc = document.getElementById('accordion-' + menuKey);
    if(acc && acc.classList.contains('open')) {
      acc.classList.remove('open');
      document.querySelector(`[data-menu="${menuKey}"]`).classList.remove('active');
      currentMenu = null;
      return;
    }
  }

  // Abre novo menu
  currentMenu = menuKey;

  document.querySelectorAll('.nav-item').forEach(i => {
    i.classList.toggle('active', i.dataset.menu === menuKey);
  });

  renderSubmenu(menuKey);
  
  // Exibe o acordeão
  const acc = document.getElementById('accordion-' + menuKey);
  if(acc) {
    acc.classList.add('open');
  }

  // auto-navigate to first item
  const m = menus[menuKey];
  if (m && m.sections[0] && m.sections[0].items[0]) {
    navigateTo(m.sections[0].items[0].page);
  }
}

// bind nav clicks
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    selectMenu(item.dataset.menu);
  });
});

// ── SAUDAÇÃO DINÂMICA ──
(function initGreeting() {
  const userName = 'João';
  const now = new Date();
  const h = now.getHours();

  let saudacao, emoji;
  if (h >= 5 && h < 12)       { saudacao = 'Bom dia';    emoji = '☀️'; }
  else if (h >= 12 && h < 18) { saudacao = 'Boa tarde';  emoji = '🌤️'; }
  else                         { saudacao = 'Boa noite';  emoji = '🌙'; }

  const dias = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
  const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const dataStr = `${dias[now.getDay()]}, ${now.getDate()} de ${meses[now.getMonth()]} de ${now.getFullYear()}`;

  const elLabel = document.getElementById('greeting-label');
  const elName  = document.getElementById('greeting-name');
  const elDate  = document.getElementById('greeting-date');

  if (elLabel) elLabel.textContent = `${emoji}  GramVip — Sistema de Gestão`;
  if (elName)  elName.textContent  = `${saudacao}, ${userName}!`;
  if (elDate)  elDate.textContent  = dataStr + ' • Seja bem-vindo de volta.';
})();

// ── FILTRO DE DATA ──
const presets = {
  hoje: () => {
    const t = new Date();
    const d = t.toISOString().split('T')[0];
    document.getElementById('filterFrom').value = d;
    document.getElementById('filterTo').value = d;
    document.getElementById('filterFromTime').value = '00:00';
    document.getElementById('filterToTime').value = '23:59';
  },
  semana: () => {
    const t = new Date();
    const d = t.toISOString().split('T')[0];
    const p = new Date(t); p.setDate(p.getDate() - 6);
    const dp = p.toISOString().split('T')[0];
    document.getElementById('filterFrom').value = dp;
    document.getElementById('filterTo').value = d;
    document.getElementById('filterFromTime').value = '00:00';
    document.getElementById('filterToTime').value = '23:59';
  },
  mes: () => {
    const t = new Date();
    const d = t.toISOString().split('T')[0];
    const p = new Date(t); p.setDate(p.getDate() - 29);
    const dp = p.toISOString().split('T')[0];
    document.getElementById('filterFrom').value = dp;
    document.getElementById('filterTo').value = d;
    document.getElementById('filterFromTime').value = '00:00';
    document.getElementById('filterToTime').value = '23:59';
  }
};

function setPreset(key) {
  presets[key]();
  applyFilter();
}

function fmtDate(d) {
  return d.split('-').reverse().join('/');
}

// Dados simulados por período
const periodData = {
  hoje: { fat:'R$4.820', ped:'148', ticket:'R$32,57', del:'R$2.140', casa:'R$2.680' },
  semana: { fat:'R$28.400', ped:'892', ticket:'R$31,84', del:'R$12.350', casa:'R$16.050' },
  mes: { fat:'R$112.600', ped:'3.480', ticket:'R$32,36', del:'R$49.200', casa:'R$63.400' },
};

function applyFilter() {
  const from = document.getElementById('filterFrom').value;
  const to = document.getElementById('filterTo').value;
  const fromT = document.getElementById('filterFromTime').value;
  const toT = document.getElementById('filterToTime').value;

  // Detecta preset aproximado para trocar KPIs
  let data = periodData.hoje;
  const diff = (new Date(to) - new Date(from)) / 86400000;
  if (diff >= 25) data = periodData.mes;
  else if (diff >= 5) data = periodData.semana;

  document.getElementById('kpi-fat').textContent = data.fat;
  document.getElementById('kpi-ped').textContent = data.ped;
  document.getElementById('kpi-ticket').textContent = data.ticket;
  document.getElementById('kpi-del').textContent = data.del;
  document.getElementById('kpi-casa').textContent = data.casa;

  document.getElementById('filterLabel').textContent =
    `📅 Exibindo: ${fmtDate(from)} ${fromT} → ${fmtDate(to)} ${toT}`;
}

// ── TICKET MÉDIO POR GARÇOM ──
(function renderTicketBars() {
  const garcons = [
    {n:'Ricardo Mendes', val:48.20, pct:100},
    {n:'Ana Costa',      val:44.70, pct:92},
    {n:'Lucas Silva',    val:38.90, pct:80},
    {n:'Mariana Oliveira',val:35.10,pct:72},
    {n:'Paulo Ferreira', val:31.60, pct:65},
  ];
  const ref = 32.57;

  function fmt(v) {
    return 'R$ ' + v.toFixed(2).replace('.', ',');
  }

  function render() {
    const el = document.getElementById('ticket-bars');
    if (!el) return;
    el.innerHTML = garcons.map(g => {
      const acima = g.val > ref;
      const cor = acima ? 'var(--success)' : 'var(--text-dim)';
      const barCor = acima ? 'var(--accent)' : 'rgba(232,160,32,0.35)';
      return `<div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:13px;font-weight:500;color:var(--text-mid)">${g.n}</span>
          <span style="font-size:14px;font-weight:700;color:${cor}">${fmt(g.val)}</span>
        </div>
        <div style="height:7px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">
          <div style="height:100%;width:${g.pct}%;background:${barCor};border-radius:4px"></div>
        </div>
      </div>`;
    }).join('');
  }

  if (document.readyState !== 'loading') render();
  else document.addEventListener('DOMContentLoaded', render);
})();


(function() {
  // Horário do estabelecimento: 11h às 23h (seg-sex), 11h-00h (sáb), 12h-22h (dom)
  const OPEN = { 0:12, 1:11, 2:11, 3:11, 4:11, 5:11, 6:11 }; // dom=0
  const CLOSE = { 0:22, 1:23, 2:23, 3:23, 4:23, 5:23, 6:24 };
  const DAYS = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
  // Todos os horários possíveis 11h–00h em slots de 1h
  const ALL_HOURS = Array.from({length:14}, (_,i) => i + 11); // 11..24

  // Dados simulados de pedidos por dia (0=dom) e hora
  // Pico no almoço (12-14h) e jantar (19-22h); sáb pico noturno maior; dom menor volume
  const base = {
    0: {12:18,13:24,14:20,15:10,16:6,17:8,18:12,19:16,20:18,21:14,22:8},
    1: {11:4,12:28,13:38,14:32,15:14,16:8,17:10,18:16,19:26,20:34,21:28,22:18,23:9},
    2: {11:6,12:30,13:40,14:34,15:12,16:7,17:9,18:18,19:28,20:36,21:30,22:20,23:10},
    3: {11:5,12:32,13:42,14:36,15:16,16:9,17:12,18:20,19:30,20:38,21:32,22:22,23:12},
    4: {11:8,12:35,13:48,14:40,15:18,16:10,17:14,18:24,19:36,20:44,21:38,22:26,23:16},
    5: {11:10,12:38,13:52,14:44,15:20,16:12,17:16,18:28,19:42,20:52,21:46,22:32,23:22},
    6: {11:14,12:42,13:54,14:46,15:24,16:16,17:22,18:36,19:52,20:62,21:58,22:44,23:38,24:20},
  };

  // Encontra o valor máximo global para escala
  const allVals = Object.values(base).flatMap(h => Object.values(h));
  const maxVal = Math.max(...allVals);

  function intensity(val) {
    // retorna 0..1
    return val / maxVal;
  }

  function cellColor(val, isOpen) {
    if (!isOpen || val === 0) return 'rgba(255,255,255,0.03)';
    const t = intensity(val);
    // gradient: amber escuro → amarelo vibrante
    const a = 0.06 + t * 0.94;
    return `rgba(232,160,32,${a.toFixed(2)})`;
  }

  function buildHeatmap() {
    const container = document.getElementById('heatmap-container');
    if (!container) return;

    const CELL_W = 44;
    const CELL_H = 36;
    const LABEL_W = 40;
    const DAY_H = 28;

    let html = `<div style="display:flex;flex-direction:column;gap:0;min-width:${LABEL_W + ALL_HOURS.length * (CELL_W+4)}px">`;

    // Row: hora header
    html += `<div style="display:flex;margin-bottom:6px">`;
    html += `<div style="width:${LABEL_W}px;flex-shrink:0"></div>`;
    ALL_HOURS.forEach(h => {
      const hStr = h === 24 ? '00h' : h + 'h';
      html += `<div style="width:${CELL_W}px;margin-right:4px;text-align:center;font-size:10px;color:var(--text-dim);font-weight:500">${hStr}</div>`;
    });
    html += `</div>`;

    // Rows: dia
    [1,2,3,4,5,6,0].forEach(dayIdx => {
      html += `<div style="display:flex;align-items:center;margin-bottom:4px">`;
      html += `<div style="width:${LABEL_W}px;flex-shrink:0;font-size:11px;font-weight:600;color:var(--text-mid);padding-right:8px;text-align:right">${DAYS[dayIdx]}</div>`;

      ALL_HOURS.forEach(h => {
        const open = OPEN[dayIdx];
        const close = CLOSE[dayIdx];
        const isOpen = h >= open && h < close;
        const val = (base[dayIdx] && base[dayIdx][h]) || 0;
        const color = cellColor(val, isOpen);
        const borderColor = isOpen && val > 0 ? `rgba(232,160,32,${(0.1 + intensity(val)*0.4).toFixed(2)})` : 'rgba(255,255,255,0.04)';
        const hStr = h === 24 ? '00:00' : h + ':00';
        const tip = isOpen
          ? `${DAYS[dayIdx]} ${hStr} — ${val} pedidos (R$${(val*32.57).toFixed(2).replace('.',',')})`
          : `${DAYS[dayIdx]} ${hStr} — Fechado`;

        html += `<div
          data-tip="${tip}"
          onmouseenter="showHmTip(event,this)"
          onmouseleave="hideHmTip()"
          style="
            width:${CELL_W}px;height:${CELL_H}px;margin-right:4px;
            border-radius:6px;
            background:${color};
            border:1px solid ${borderColor};
            cursor:${isOpen ? 'crosshair' : 'default'};
            transition:transform 0.1s,filter 0.1s;
            position:relative;
          "
          onmouseover="this.style.transform='scale(1.15)';this.style.filter='brightness(1.3)';this.style.zIndex=10"
          onmouseout="this.style.transform='scale(1)';this.style.filter='none';this.style.zIndex=1"
        ></div>`;
      });

      html += `</div>`;
    });

    // Legenda de pico
    html += `<div style="margin-top:14px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">`;
    html += `<div style="font-size:11px;color:var(--text-dim)">🏆 Pico da semana: <strong style="color:var(--accent)">Sexta 20h</strong> (52 pedidos)</div>`;
    html += `<div style="font-size:11px;color:var(--text-dim)">📈 Melhor dia: <strong style="color:var(--accent)">Sábado</strong> (média 38 ped/h)</div>`;
    html += `<div style="font-size:11px;color:var(--text-dim)">⏰ Horário mais fraco: <strong style="color:var(--text-mid)">16h (todos os dias)</strong></div>`;
    html += `</div>`;

    html += `</div>`;
    container.innerHTML = html;
  }

  function showHmTip(e, el) {
    const tip = document.getElementById('hm-tooltip');
    tip.textContent = el.dataset.tip;
    tip.style.opacity = '1';
    tip.style.left = (e.clientX + 14) + 'px';
    tip.style.top = (e.clientY - 36) + 'px';
  }

  function hideHmTip() {
    document.getElementById('hm-tooltip').style.opacity = '0';
  }

  window.showHmTip = showHmTip;
  window.hideHmTip = hideHmTip;

  document.addEventListener('DOMContentLoaded', buildHeatmap);
  // Também chama imediatamente caso DOM já esteja pronto
  if (document.readyState !== 'loading') buildHeatmap();
})();

// ── ESTADO DINÂMICO ──
const defaultCategorias = [
  { id: 'CAT-1', nome: 'Pratos Principais', subcategorias: ['Bovino', 'Frango', 'Peixes', 'Massas'], grupos: [] },
  { id: 'CAT-2', nome: 'Pizzas', subcategorias: ['Salgadas', 'Doces', 'Brotinho'], grupos: [] },
  { id: 'CAT-3', nome: 'Entradas', subcategorias: ['Porções', 'Saladas', 'Sopas'], grupos: [] },
  { id: 'CAT-4', nome: 'Sobremesas', subcategorias: ['Frias', 'Quentes', 'Bolos'], grupos: [] },
  { id: 'CAT-5', nome: 'Bebidas', subcategorias: ['Refrigerantes', 'Sucos Naturais', 'Cervejas', 'Vinhos'], grupos: [] }
];
let mockCategorias = JSON.parse(localStorage.getItem('mockCategorias')) || defaultCategorias;

let mockUnidades = JSON.parse(localStorage.getItem('mockUnidades')) || ['UN', 'KG', 'L', 'CX', 'PT', 'G', 'ML'];

let mockPagamentos = JSON.parse(localStorage.getItem('mockPagamentos')) || [
  { id: 'PAG-1', nome: 'Dinheiro', ativo: true },
  { id: 'PAG-2', nome: 'PIX', ativo: true },
  { id: 'PAG-3', nome: 'Cartão de Crédito', ativo: true },
  { id: 'PAG-4', nome: 'Cartão de Débito', ativo: true }
];

const defaultGrupos = [
  { id: 'GRP-1', nome: 'Opções de Ponto da Carne', obrigatorio: true, max_itens: 1, itens: [ {nome: 'Mal Passado', preco: 0}, {nome: 'Ao Ponto', preco: 0}, {nome: 'Bem Passado', preco: 0} ] },
  { id: 'GRP-2', nome: 'Adicionais de Hambúrguer', obrigatorio: false, max_itens: 3, itens: [ {nome: 'Bacon Extra', preco: 4.5}, {nome: 'Cheddar Extra', preco: 3.0}, {nome: 'Cebola Caramelizada', preco: 2.5} ] }
];
let mockGruposComposicao = JSON.parse(localStorage.getItem('mockGruposComposicao')) || defaultGrupos;
localStorage.setItem('mockGruposComposicao', JSON.stringify(mockGruposComposicao));

// ── FUNÇÕES DE UNIDADES DE MEDIDA ──
function renderUnidades() {
  localStorage.setItem('mockUnidades', JSON.stringify(mockUnidades));
  const tbody = document.getElementById('unidades-tbody');
  if(!tbody) return;
  tbody.innerHTML = mockUnidades.map((u, i) => `
    <tr>
      <td style="padding:14px;font-size:13px;font-weight:600;border-top:1px solid var(--border-soft)">${u}</td>
      <td style="padding:14px;text-align:right;border-top:1px solid var(--border-soft)">
        <button onclick="deleteUnidade(${i})" class="btn btn-ghost" style="color:var(--danger);padding:4px 8px;font-size:16px">🗑</button>
      </td>
    </tr>
  `).join('');
  
  // Atualiza o select do modal de produtos
  const select = document.getElementById('f-unidade');
  if (select) {
    const val = select.value; // mantém o selecionado se existir
    select.innerHTML = mockUnidades.map(u => `<option value="${u}">${u}</option>`).join('');
    if(mockUnidades.includes(val)) select.value = val;
  }
}

function addUnidade() {
  const input = document.getElementById('nova-unidade-input');
  const val = input.value.trim().toUpperCase();
  if (!val) return;
  if (mockUnidades.includes(val)) {
    showToast('Unidade já existe!', 'error');
    return;
  }
  mockUnidades.push(val);
  input.value = '';
  renderUnidades();
  showToast('Unidade adicionada!', 'success');
}

function deleteUnidade(idx) {
  if (confirm('Tem certeza que deseja excluir esta unidade?')) {
    mockUnidades.splice(idx, 1);
    renderUnidades();
    showToast('Unidade removida!', 'info');
  }
}

// ── FUNÇÕES DE CATEGORIAS E SUBCATEGORIAS ──
function renderCategorias() {
  localStorage.setItem('mockCategorias', JSON.stringify(mockCategorias));
  const container = document.getElementById('categorias-container');
  if(!container) return;
  
  const optGrupos = mockGruposComposicao.map(g => `<option value="${g.id}">${g.nome}</option>`).join('');

  container.innerHTML = mockCategorias.map((cat, i) => `
    <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:12px;overflow:hidden">
      <div style="padding:16px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.1)">
        <div style="font-weight:600;font-size:14px">${cat.nome}</div>
        <button onclick="deleteCategoria(${i})" class="btn btn-ghost" style="color:var(--danger);padding:4px 8px;font-size:14px">🗑 Excluir Categoria</button>
      </div>
      <div style="padding:16px">
        <div style="margin-bottom:24px">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;color:var(--text-dim);margin-bottom:8px">Grupos de Composição Automáticos</div>
          <div style="display:flex;gap:10px;margin-bottom:8px">
            <select id="vincular-grupo-cat-${i}" class="form-input" style="width:250px">
              <option value="">Selecione um grupo...</option>
              ${optGrupos}
            </select>
            <button class="btn btn-ghost" style="font-size:11px;padding:6px 12px" onclick="vincularGrupoCategoria(${i})">Vincular Grupo</button>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            ${(cat.grupos || []).map((gId, gIdx) => {
              const gInfo = mockGruposComposicao.find(x => x.id === gId);
              if(!gInfo) return '';
              return `
                <span style="background:rgba(232,160,32,0.1);color:var(--accent);padding:6px 12px;border-radius:6px;font-size:12px;display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(232,160,32,0.2)">
                  ${gInfo.nome}
                  <button onclick="desvincularGrupoCategoria(${i}, ${gIdx})" style="background:none;border:none;color:inherit;cursor:pointer">✕</button>
                </span>
              `;
            }).join('')}
            ${(!cat.grupos || cat.grupos.length === 0) ? '<span style="font-size:12px;color:var(--text-dim)">Nenhum grupo vinculado.</span>' : ''}
          </div>
        </div>

        <div style="font-size:11px;font-weight:600;text-transform:uppercase;color:var(--text-dim);margin-bottom:8px">Subcategorias</div>
        <div style="display:flex;gap:10px;margin-bottom:12px">
          <input type="text" id="subcat-input-${i}" class="form-input" placeholder="Nova subcategoria..." style="width:200px" onkeypress="if(event.key==='Enter') addSubcategoria(${i})" />
          <button class="btn btn-ghost" style="font-size:11px;padding:6px 12px" onclick="addSubcategoria(${i})">Adicionar Subcategoria</button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${cat.subcategorias.map((sub, j) => `
            <span style="background:rgba(255,255,255,0.06);padding:6px 12px;border-radius:6px;font-size:12px;display:inline-flex;align-items:center;gap:8px">
              ${sub}
              <button onclick="deleteSubcategoria(${i}, ${j})" style="background:none;border:none;color:var(--text-dim);cursor:pointer">✕</button>
            </span>
          `).join('')}
          ${cat.subcategorias.length === 0 ? '<span style="font-size:12px;color:var(--text-dim)">Nenhuma subcategoria.</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');

  updateSelectCategorias();
}

function vincularGrupoCategoria(catIdx) {
  const sel = document.getElementById(`vincular-grupo-cat-${catIdx}`);
  const gId = sel.value;
  if(!gId) return;
  if(!mockCategorias[catIdx].grupos) mockCategorias[catIdx].grupos = [];
  if(!mockCategorias[catIdx].grupos.includes(gId)) {
    mockCategorias[catIdx].grupos.push(gId);
    renderCategorias();
  }
}

function desvincularGrupoCategoria(catIdx, grupoIdx) {
  mockCategorias[catIdx].grupos.splice(grupoIdx, 1);
  renderCategorias();
}

function updateSelectCategorias() {
  const selCat = document.getElementById('f-categoria');
  if(selCat) {
    const valCat = selCat.value;
    selCat.innerHTML = '<option value="">Selecione</option>' + mockCategorias.map(c => `<option value="${c.nome}">${c.nome}</option>`).join('');
    if(mockCategorias.find(c => c.nome === valCat)) selCat.value = valCat;
    
    selCat.onchange = updateSelectSubcategorias;
    updateSelectSubcategorias();
  }
}

function updateSelectSubcategorias() {
  const selCat = document.getElementById('f-categoria');
  const selSub = document.getElementById('f-subcategoria');
  if(!selCat || !selSub) return;
  
  const catName = selCat.value;
  const cat = mockCategorias.find(c => c.nome === catName);
  
  const valSub = selSub.value;
  if(cat) {
    selSub.innerHTML = '<option value="">Selecione</option>' + cat.subcategorias.map(s => `<option value="${s}">${s}</option>`).join('');
    if(cat.subcategorias.includes(valSub)) selSub.value = valSub;
    
    // Herança de Grupos de Composição
    if(cat.grupos && cat.grupos.length > 0) {
      let inserted = false;
      cat.grupos.forEach(gId => {
        if(!currentProdGrupos.includes(gId)) {
          currentProdGrupos.push(gId);
          inserted = true;
        }
      });
      if(inserted) {
        renderProdGrupos();
        showToast('Grupos da categoria adicionados automaticamente!', 'info');
      }
    }
  } else {
    selSub.innerHTML = '<option value="">Selecione a Categoria</option>';
  }
}

function addCategoria() {
  const input = document.getElementById('nova-cat-input');
  const val = input.value.trim();
  if(!val) return;
  mockCategorias.push({ id: 'CAT-'+Date.now(), nome: val, subcategorias: [] });
  input.value = '';
  renderCategorias();
  showToast('Categoria adicionada', 'success');
}

function deleteCategoria(i) {
  if(confirm('Excluir esta categoria e suas subcategorias?')) {
    mockCategorias.splice(i, 1);
    renderCategorias();
  }
}

function addSubcategoria(i) {
  const input = document.getElementById(`subcat-input-${i}`);
  const val = input.value.trim();
  if(!val) return;
  if(!mockCategorias[i].subcategorias.includes(val)) {
    mockCategorias[i].subcategorias.push(val);
    renderCategorias();
  }
}

function deleteSubcategoria(i, j) {
  mockCategorias[i].subcategorias.splice(j, 1);
  renderCategorias();
}

function saveGrupos() {
  localStorage.setItem('mockGruposComposicao', JSON.stringify(mockGruposComposicao));
}

let currentProdGrupos = []; // estado temporário enquanto edita o produto

function renderGrupos() {
  saveGrupos();
  const container = document.getElementById('grupos-container');
  if(!container) return;
  
  container.innerHTML = mockGruposComposicao.map((g, i) => `
    <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:12px;overflow:hidden">
      <div style="padding:16px;display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;background:rgba(0,0,0,0.1)">
        <div style="flex:1;min-width:200px">
          <label class="form-label">Nome do Grupo</label>
          <input type="text" class="form-input" value="${g.nome}" onchange="mockGruposComposicao[${i}].nome = this.value; saveGrupos(); updateSelectGrupos()" />
        </div>
        <div style="width:110px">
          <label class="form-label">Obrigatório?</label>
          <select class="form-input" onchange="mockGruposComposicao[${i}].obrigatorio = (this.value==='Sim'); saveGrupos();">
            <option ${g.obrigatorio ? 'selected' : ''}>Sim</option>
            <option ${!g.obrigatorio ? 'selected' : ''}>Não</option>
          </select>
        </div>
        <div style="width:90px">
          <label class="form-label">Máx. Itens</label>
          <input type="number" class="form-input" value="${g.max_itens}" onchange="mockGruposComposicao[${i}].max_itens = parseInt(this.value); saveGrupos();" />
        </div>
        <button onclick="deleteGrupo(${i})" class="btn btn-ghost" style="color:var(--danger);padding:4px 8px;font-size:16px">🗑</button>
      </div>
      <div style="padding:16px;border-top:1px solid rgba(255,255,255,0.05)">
        <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:${g._expanded ? '12px' : '0'}" onclick="mockGruposComposicao[${i}]._expanded = !mockGruposComposicao[${i}]._expanded; renderGrupos()">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;color:var(--text-dim)">Itens Inclusos (${g.itens.length})</div>
          <div style="font-size:12px;color:var(--text-dim)">${g._expanded ? '▲ Ocultar' : '▼ Mostrar'}</div>
        </div>
        <div style="display:${g._expanded ? 'flex' : 'none'};flex-direction:column;gap:8px">
          ${g.itens.map((item, j) => `
            <div style="display:flex;align-items:center;gap:10px">
              <input class="form-input" value="${item.nome}" placeholder="Nome do item" style="flex:1" onchange="mockGruposComposicao[${i}].itens[${j}].nome = this.value; saveGrupos();" />
              <div style="position:relative;width:120px">
                <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--text-dim)">R$</span>
                <input class="form-input" type="number" step="0.01" value="${item.preco}" placeholder="0.00" style="padding-left:30px" onchange="mockGruposComposicao[${i}].itens[${j}].preco = parseFloat(this.value); saveGrupos();" />
              </div>
              <button onclick="deleteItemGrupo(${i}, ${j})" style="background:none;border:none;color:var(--text-dim);cursor:pointer;padding:6px">✕</button>
            </div>
          `).join('')}
          <button onclick="addItemGrupo(${i})" class="btn btn-ghost" style="padding:6px 12px;font-size:11px;margin-top:4px;align-self:flex-start">＋ Novo Item</button>
        </div>
      </div>
    </div>
  `).join('');
  
  if(mockGruposComposicao.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="margin-top:40px">
        <div class="empty-icon">🧩</div>
        <h3>Nenhum grupo de composição</h3>
        <p>Crie grupos (ex: "Molhos Base") para atrelar rapidamente a produtos.</p>
      </div>`;
  }

  updateSelectGrupos();
}

function updateSelectGrupos() {
  const sel = document.getElementById('f-add-grupo');
  if(sel) {
    sel.innerHTML = '<option value="">Selecione um grupo para vincular...</option>' + 
      mockGruposComposicao.map(g => `<option value="${g.id}">${g.nome}</option>`).join('');
  }
}

function addGrupo() {
  mockGruposComposicao.unshift({ id: 'GRP-'+Date.now(), nome: 'Novo Grupo', obrigatorio: false, max_itens: 1, itens: [] });
  renderGrupos();
}

function deleteGrupo(i) {
  if(confirm('Excluir este grupo de composição?')) {
    mockGruposComposicao.splice(i, 1);
    renderGrupos();
  }
}

function addItemGrupo(i) {
  mockGruposComposicao[i].itens.push({ nome: '', preco: 0 });
  renderGrupos();
}

function deleteItemGrupo(i, j) {
  mockGruposComposicao[i].itens.splice(j, 1);
  renderGrupos();
}

function renderProdGrupos() {
  const container = document.getElementById('prod-grupos-vinculados');
  if(!container) return;
  
  container.innerHTML = currentProdGrupos.map((gId, idx) => {
    const g = mockGruposComposicao.find(x => x.id === gId);
    if(!g) return '';
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--card-bg);border:1px solid var(--border-soft);padding:10px 14px;border-radius:8px">
        <div>
          <div style="font-size:13px;font-weight:600">${g.nome}</div>
          <div style="font-size:11px;color:var(--text-dim)">${g.itens.length} itens • ${g.obrigatorio ? 'Obrigatório' : 'Opcional'}</div>
        </div>
        <button onclick="removerGrupoProduto(${idx})" style="background:none;border:none;color:var(--danger);cursor:pointer;padding:6px">Desvincular</button>
      </div>
    `;
  }).join('');
  
  if(currentProdGrupos.length === 0) {
    container.innerHTML = '<div style="font-size:12px;color:var(--text-dim);text-align:center;padding:16px">Nenhum grupo vinculado.</div>';
  }
}

function vincularGrupoProduto() {
  const sel = document.getElementById('f-add-grupo');
  const gId = sel.value;
  if(!gId) return;
  if(currentProdGrupos.includes(gId)) {
    showToast('Grupo já vinculado!', 'error');
    return;
  }
  currentProdGrupos.push(gId);
  sel.value = '';
  renderProdGrupos();
}

function removerGrupoProduto(idx) {
  currentProdGrupos.splice(idx, 1);
  renderProdGrupos();
}

// ── FUNÇÕES DE CONTAGEM DE ESTOQUE ──
let contagemItens = []; // { id, atual, novo }

function searchContagem(val) {
  const container = document.getElementById('contagem-autocomplete');
  val = val.toLowerCase().trim();
  if(!val) {
    container.style.display = 'none';
    return;
  }
  
  let result = mockProducts.filter(p => (p.nome.toLowerCase().includes(val) || p.id.toLowerCase().includes(val)));
  
  if(result.length === 0) {
    container.innerHTML = '<div style="padding:12px;font-size:12px;color:var(--text-dim)">Nenhum item encontrado.</div>';
  } else {
    container.innerHTML = result.slice(0, 8).map(p => `
      <div style="padding:10px 12px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.05)" onmouseover="this.style.background='rgba(232,160,32,0.1)'" onmouseout="this.style.background='none'" onclick="addContagemItem('${p.id}')">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--text)">${p.nome}</div>
          <div style="font-size:10px;color:var(--text-dim)">${p.id}</div>
        </div>
        <div style="font-size:11px;color:var(--accent)">Atual: ${p.estoque}</div>
      </div>
    `).join('');
  }
  container.style.display = 'block';
}

function addContagemItem(id) {
  document.getElementById('contagem-autocomplete').style.display = 'none';
  document.getElementById('contagem-search').value = '';
  
  if(contagemItens.find(x => x.id === id)) return; // já tá na lista
  
  const p = mockProducts.find(x => x.id === id);
  if(!p) return;
  
  contagemItens.unshift({ id: p.id, nome: p.nome, categoria: p.categoria, atual: p.estoque, novo: '' });
  renderContagem();
}

function updateContagemItem(id, val) {
  const item = contagemItens.find(x => x.id === id);
  if(item) item.novo = val;
}

function removeContagemItem(id) {
  contagemItens = contagemItens.filter(x => x.id !== id);
  renderContagem();
}

function renderContagem() {
  const tbody = document.getElementById('contagem-tbody');
  if(!tbody) return;
  
  tbody.innerHTML = contagemItens.map(p => {
    const colorClass = p.atual <= 0 ? 'color:var(--danger)' : 'color:var(--text)';
    return `
      <tr>
        <td style="padding:12px 14px;font-size:12px;color:var(--text-dim);border-top:1px solid var(--border-soft)">${p.id}</td>
        <td style="padding:12px 14px;font-size:13px;font-weight:600;border-top:1px solid var(--border-soft)">
          ${p.nome}
          <div style="font-size:11px;color:var(--text-dim);font-weight:400;margin-top:2px">${p.categoria}</div>
        </td>
        <td style="padding:12px 14px;text-align:center;font-size:14px;font-weight:600;${colorClass};border-top:1px solid var(--border-soft)">${p.atual}</td>
        <td style="padding:12px 14px;text-align:right;border-top:1px solid var(--border-soft)">
          <div style="display:flex;align-items:center;justify-content:flex-end;gap:10px">
            <input type="number" class="form-input" placeholder="Qtd" value="${p.novo}" style="width:80px;text-align:center" onchange="updateContagemItem('${p.id}', this.value)" />
            <button onclick="removeContagemItem('${p.id}')" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:16px">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
  
  if(contagemItens.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:32px;color:var(--text-dim);border-top:1px solid var(--border-soft)">Busque e adicione produtos para iniciar a contagem.</td></tr>`;
  }
}

function salvarContagem() {
  let count = 0;
  contagemItens.forEach(item => {
    if(item.novo !== '') {
      const p = mockProducts.find(x => x.id === item.id);
      if(p) {
        p.estoque = parseInt(item.novo);
        count++;
      }
    }
  });
  
  if(count > 0) {
    contagemItens = [];
    renderContagem();
    renderProducts();
    showToast(`${count} itens atualizados com sucesso no estoque!`, 'success');
  } else {
    showToast('Nenhuma contagem válida foi preenchida.', 'info');
  }
}

// ── PRODUTOS ──
let mockProducts = JSON.parse(localStorage.getItem('mockProducts'));
if (!mockProducts) {
  mockProducts = [
    { id: 'PRD-001', nome: 'Pizza Calabresa', categoria: 'Pizzas', venda: 39.90, custo: 15.00, estoque: '-', ativo: true, delivery: true, salao: true },
    { id: 'PRD-002', nome: 'Frango Grelhado', categoria: 'Pratos Principais', venda: 29.90, custo: 12.00, estoque: 15, ativo: true, delivery: true, salao: true },
    { id: 'PRD-003', nome: 'Chopp 500ml', categoria: 'Bebidas', venda: 14.90, custo: 5.00, estoque: 45, ativo: true, delivery: false, salao: true },
    { id: 'PRD-004', nome: 'Filé Mignon', categoria: 'Pratos Principais', venda: 59.90, custo: 25.00, estoque: 8, ativo: true, delivery: true, salao: true },
    { id: 'PRD-005', nome: 'Salada Caesar', categoria: 'Entradas', venda: 24.90, custo: 8.00, estoque: '-', ativo: true, delivery: true, salao: true },
    { id: 'PRD-006', nome: 'Tiramisù', categoria: 'Sobremesas', venda: 18.90, custo: 6.00, estoque: 12, ativo: false, delivery: true, salao: true }
  ];
  localStorage.setItem('mockProducts', JSON.stringify(mockProducts));
}

function saveMockProducts() {
  localStorage.setItem('mockProducts', JSON.stringify(mockProducts));
}

function updatePriceFromList(idx, val) {
  mockProducts[idx].venda = parseFloat(val);
  saveMockProducts();
  // Não chamamos renderProducts para não perder o foco do input
}

let currentProdFilter = 'ativos';

function setProdFilter(filter) {
  currentProdFilter = filter;
  document.getElementById('filter-ativos').className = filter === 'ativos' ? 'btn btn-primary' : 'btn btn-ghost';
  document.getElementById('filter-inativos').className = filter === 'inativos' ? 'btn btn-primary' : 'btn btn-ghost';
  document.getElementById('filter-todos').className = filter === 'todos' ? 'btn btn-primary' : 'btn btn-ghost';
  renderProducts();
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function toggleProductFlag(index, flag) {
  mockProducts[index][flag] = !mockProducts[index][flag];
  saveMockProducts();
  renderProducts();
  const statusName = mockProducts[index][flag] ? 'ativado' : 'desativado';
  showToast(`Produto ${statusName}!`, 'info');
}

function renderProducts() {
  const listEl = document.getElementById('prod-list');
  const emptyEl = document.getElementById('prod-empty');
  const searchEl = document.getElementById('prod-search');
  const catFilterEl = document.getElementById('prod-filter-cat');
  if (!listEl) return;

  if(catFilterEl && catFilterEl.options.length <= 1 && mockCategorias.length > 0) {
    catFilterEl.innerHTML = '<option value="">Todas as Categorias</option>' + mockCategorias.map(c => `<option value="${c.nome}">${c.nome}</option>`).join('');
  }

  const search = searchEl ? searchEl.value.toLowerCase() : '';
  const catFilter = catFilterEl ? catFilterEl.value : '';
  
  let filtered = mockProducts.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(search) || p.id.toLowerCase().includes(search);
    let matchFiltro = true;
    if (currentProdFilter === 'ativos') matchFiltro = p.ativo;
    if (currentProdFilter === 'inativos') matchFiltro = !p.ativo;

    let matchMenu = true;
    if (currentPage === 'produtos-materia') {
      matchMenu = p.tipo === 'Matéria Prima';
    } else {
      matchMenu = p.tipo !== 'Matéria Prima';
    }
    
    let matchCat = catFilter === '' || p.categoria === catFilter;

    return matchBusca && matchFiltro && matchMenu && matchCat;
  });

  const countLabel = document.getElementById('prod-count-label');
  if (countLabel) countLabel.textContent = `${filtered.length} produtos encontrados`;

  if (filtered.length === 0) {
    listEl.style.display = 'none';
    emptyEl.style.display = 'block';
  } else {
    listEl.style.display = 'block';
    emptyEl.style.display = 'none';

    let html = '';
    const isMateria = currentPage === 'produtos-materia';
    
    if (isMateria) {
      html += `
        <div style="display:grid;grid-template-columns:36px 90px 1fr 120px 120px;align-items:center;gap:0;padding:8px 16px;background:rgba(0,0,0,0.2);border-radius:8px 8px 0 0;border-bottom:1px solid var(--border-soft)">
          <div></div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim)">Código</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim)">Matéria Prima</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim);text-align:center">Estoque</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim);text-align:right">Custo (R$)</div>
        </div>
      `;
    } else {
      html += `
        <div style="display:grid;grid-template-columns:36px 90px 1fr 80px 120px 100px 100px;align-items:center;gap:0;padding:8px 16px;background:rgba(0,0,0,0.2);border-radius:8px 8px 0 0;border-bottom:1px solid var(--border-soft)">
          <div></div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim)">Código</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim)">Produto</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim);text-align:center">Estoque</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim);text-align:right;padding-right:16px">Venda (R$)</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim);text-align:center">Delivery</div>
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;color:var(--text-dim);text-align:center">Salão</div>
        </div>
      `;
    }

    filtered.forEach((p) => {
      const idx = mockProducts.findIndex(orig => orig.id === p.id);
      const subInfo = p.subcategoria ? p.subcategoria : (p.categoria || 'Sem categoria');
      
      if (isMateria) {
        html += `
          <div style="display:grid;grid-template-columns:36px 90px 1fr 120px 120px;align-items:center;gap:0;padding:12px 16px;border-bottom:1px solid var(--border-soft);background:var(--card-bg);transition:background 0.2s">
            <div style="display:flex;align-items:center;">
              <label class="tog" style="transform:scale(0.7);transform-origin:left center;margin:0;">
                <input type="checkbox" ${p.ativo ? 'checked' : ''} onchange="toggleProductFlag(${idx}, 'ativo')">
                <span class="tog-track"></span>
              </label>
            </div>
            <div style="font-size:12px;color:var(--text-dim);font-family:'DM Sans',sans-serif">${p.id}</div>
            <div style="cursor:pointer" onclick="openProductDrawer(${idx})">
              <div style="font-size:13px;font-weight:600;color:${p.ativo ? 'var(--text)' : 'var(--text-dim)'};transition:color 0.2s" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='${p.ativo ? 'var(--text)' : 'var(--text-dim)'}'">${p.nome}</div>
            </div>
            <div style="font-size:12px;color:var(--text-mid);text-align:center">${p.estoque}</div>
            <div style="font-size:12px;color:var(--accent);font-weight:600;text-align:right">R$ ${p.custo.toFixed(2)}</div>
          </div>
        `;
      } else {
        html += `
          <div style="display:grid;grid-template-columns:36px 90px 1fr 80px 120px 100px 100px;align-items:center;gap:0;padding:12px 16px;border-bottom:1px solid var(--border-soft);background:var(--card-bg);transition:background 0.2s">
            <div style="display:flex;align-items:center;">
              <label class="tog" style="transform:scale(0.7);transform-origin:left center;margin:0;">
                <input type="checkbox" ${p.ativo ? 'checked' : ''} onchange="toggleProductFlag(${idx}, 'ativo')">
                <span class="tog-track"></span>
              </label>
            </div>
            <div style="font-size:12px;color:var(--text-dim);font-family:'DM Sans',sans-serif">${p.id}</div>
            <div style="cursor:pointer" onclick="openProductDrawer(${idx})">
              <div style="font-size:13px;font-weight:600;color:${p.ativo ? 'var(--text)' : 'var(--text-dim)'};transition:color 0.2s" onmouseover="this.style.color='var(--accent)'" onmouseout="this.style.color='${p.ativo ? 'var(--text)' : 'var(--text-dim)'}'">${p.nome}</div>
              <div style="font-size:11px;color:var(--text-dim);margin-top:2px">${subInfo}</div>
            </div>
            <div style="font-size:12px;color:var(--text-mid);text-align:center">${p.estoque}</div>
            <div style="text-align:right;padding-right:16px;display:flex;align-items:center;justify-content:flex-end">
              <span style="font-size:11px;color:var(--text-dim);margin-right:4px">R$</span>
              <input type="number" step="0.01" class="form-input" style="width:70px;padding:4px 6px;font-size:12px;color:var(--accent);font-weight:600;text-align:right" value="${p.venda.toFixed(2)}" onchange="updatePriceFromList(${idx}, this.value)" />
            </div>
            <div style="display:flex;justify-content:center;align-items:center;">
              <label class="tog" style="transform:scale(0.7);margin:0;">
                <input type="checkbox" ${p.delivery ? 'checked' : ''} onchange="toggleProductFlag(${idx}, 'delivery')">
                <span class="tog-track"></span>
              </label>
            </div>
            <div style="display:flex;justify-content:center;align-items:center;">
              <label class="tog" style="transform:scale(0.7);margin:0;">
                <input type="checkbox" ${p.salao ? 'checked' : ''} onchange="toggleProductFlag(${idx}, 'salao')">
                <span class="tog-track"></span>
              </label>
            </div>
          </div>
        `;
      }
    });
    listEl.innerHTML = html;
  }
}

function switchProdTab(tabId, el) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');
}

let currentEditIndex = null;

function openProductDrawer(idx) {
  const overlay = document.getElementById('prod-overlay');
  const drawer = document.getElementById('prod-drawer');
  
  // reset to general tab
  const tabs = document.querySelectorAll('.modal-tab');
  if(tabs.length > 0) switchProdTab('geral', tabs[0]);

  if(overlay) overlay.classList.add('open');
  if(drawer) drawer.classList.add('open');
  
  currentEditIndex = idx;
  const isMateria = currentPage === 'produtos-materia';
  
  // Toggle tab navs
  if(document.getElementById('tab-nav-fotos')) document.getElementById('tab-nav-fotos').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('tab-nav-delivery')) document.getElementById('tab-nav-delivery').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('tab-nav-composicao')) document.getElementById('tab-nav-composicao').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('tab-nav-ficha')) document.getElementById('tab-nav-ficha').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('tab-nav-analise')) document.getElementById('tab-nav-analise').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('tab-nav-fornecedores')) document.getElementById('tab-nav-fornecedores').style.display = isMateria ? 'block' : 'none';
  if(document.getElementById('tab-nav-analise-materia')) document.getElementById('tab-nav-analise-materia').style.display = isMateria ? 'block' : 'none';

  // Toggle fields visibility
  if(document.getElementById('wrapper-categoria')) document.getElementById('wrapper-categoria').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('wrapper-subcategoria')) document.getElementById('wrapper-subcategoria').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('wrapper-balanca')) document.getElementById('wrapper-balanca').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('wrapper-markup')) document.getElementById('wrapper-markup').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('wrapper-venda')) document.getElementById('wrapper-venda').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('wrapper-servico')) document.getElementById('wrapper-servico').style.display = isMateria ? 'none' : 'flex';
  if(document.getElementById('wrapper-fiscal')) document.getElementById('wrapper-fiscal').style.display = isMateria ? 'none' : 'block';
  if(document.getElementById('lbl-gera-ficha')) document.getElementById('lbl-gera-ficha').style.visibility = isMateria ? 'hidden' : 'visible';
  if(document.getElementById('f-tipo')) document.getElementById('f-tipo').disabled = isMateria;

  if (idx !== null) {
    const p = mockProducts[idx];
    document.getElementById('drawer-title').textContent = isMateria ? 'Editar Matéria Prima' : 'Editar Produto';
    document.getElementById('f-codigo').value = p.id;
    document.getElementById('f-nome').value = p.nome;
    document.getElementById('f-venda').value = p.venda;
    document.getElementById('f-custo').value = p.custo;
    document.getElementById('f-estoque').value = p.estoque !== '-' ? p.estoque : '';
    document.getElementById('f-ativo').checked = p.ativo;
    if(document.getElementById('f-delivery')) document.getElementById('f-delivery').checked = p.delivery;
    document.getElementById('f-categoria').value = p.categoria || '';
    if(document.getElementById('f-subcategoria')) document.getElementById('f-subcategoria').value = p.subcategoria || '';
    if(document.getElementById('f-tipo')) document.getElementById('f-tipo').value = p.tipo || '';
    
    currentProdGrupos = p.grupos ? [...p.grupos] : [];
  } else {
    document.getElementById('drawer-title').textContent = isMateria ? 'Nova Matéria Prima' : 'Novo Produto';
    document.getElementById('f-codigo').value = '';
    document.getElementById('f-nome').value = '';
    document.getElementById('f-venda').value = '';
    document.getElementById('f-custo').value = '';
    document.getElementById('f-estoque').value = '';
    document.getElementById('f-ativo').checked = true;
    if(document.getElementById('f-delivery')) document.getElementById('f-delivery').checked = true;
    document.getElementById('f-categoria').value = '';
    if(document.getElementById('f-subcategoria')) document.getElementById('f-subcategoria').value = '';
    if(document.getElementById('f-tipo')) document.getElementById('f-tipo').value = isMateria ? 'Matéria Prima' : '';
    
    currentProdGrupos = [];
  }
  
  // Puxa automaticamente grupos da categoria caso não estejam vinculados
  const catName = document.getElementById('f-categoria').value;
  if(catName) {
    const cat = mockCategorias.find(c => c.nome === catName);
    if(cat && cat.grupos && cat.grupos.length > 0) {
      cat.grupos.forEach(gId => {
        if(!currentProdGrupos.includes(gId)) {
          currentProdGrupos.push(gId);
        }
      });
    }
  }
  
  // Carrega opções de subcategoria
  if(typeof updateSelectSubcategorias === 'function') updateSelectSubcategorias();
  
  renderProdGrupos();
}

function closeProductDrawer() {
  const overlay = document.getElementById('prod-overlay');
  const drawer = document.getElementById('prod-drawer');
  if(overlay) overlay.classList.remove('open');
  if(drawer) drawer.classList.remove('open');
}

function saveProduct() {
  const code = document.getElementById('f-codigo').value.trim() || 'PRD-' + Math.floor(Math.random()*1000);
  const estqVal = document.getElementById('f-estoque').value;

  const p = {
    id: code,
    nome: document.getElementById('f-nome').value || 'Produto sem nome',
    categoria: document.getElementById('f-categoria').value || 'Sem Categoria',
    subcategoria: document.getElementById('f-subcategoria') ? document.getElementById('f-subcategoria').value : '',
    tipo: document.getElementById('f-tipo') ? document.getElementById('f-tipo').value : '',
    venda: parseFloat(document.getElementById('f-venda').value) || 0,
    custo: parseFloat(document.getElementById('f-custo').value) || 0,
    estoque: estqVal ? parseInt(estqVal) : '-',
    ativo: document.getElementById('f-ativo').checked,
    delivery: document.getElementById('f-delivery') ? document.getElementById('f-delivery').checked : true,
    salao: true, // Mantém verdadeiro por padrão para novos itens
    grupos: [...currentProdGrupos]
  };

  if (currentEditIndex !== null) {
    p.salao = mockProducts[currentEditIndex].salao; // Preserva o estado da tabela
    mockProducts[currentEditIndex] = p;
    showToast('Produto atualizado com sucesso!', 'success');
  } else {
    mockProducts.push(p);
    showToast('Produto salvo com sucesso!', 'success');
  }

  saveMockProducts();
  renderProducts();
  closeProductDrawer();
}

function addAddonGroup() {
  const container = document.getElementById('addons-container');
  if(!container) return;
  const div = document.createElement('div');
  div.className = 'addon-group';
  div.style.cssText = 'background:var(--card-bg);border:1px solid var(--border-soft);border-radius:10px;padding:16px;margin-bottom:12px;animation:fadeIn 0.2s ease';
  div.innerHTML = `
    <div style="display:flex;gap:12px;margin-bottom:12px;align-items:flex-end">
      <div style="flex:1">
        <label class="form-label">Nome do Grupo</label>
        <input class="form-input" placeholder="Ex: Escolha o sabor" />
      </div>
      <div style="width:90px">
        <label class="form-label">Obrigatório?</label>
        <select class="form-input" style="cursor:pointer"><option>Sim</option><option selected>Não</option></select>
      </div>
      <div style="width:100px">
        <label class="form-label">Seleção</label>
        <select class="form-input" style="cursor:pointer"><option>Infinito</option><option selected>Limitado</option></select>
      </div>
      <div style="width:80px">
        <label class="form-label">Máx. Itens</label>
        <input class="form-input" type="number" value="1" />
      </div>
      <button onclick="this.closest('.addon-group').remove()" style="background:none;border:none;color:var(--danger);cursor:pointer;font-size:16px;padding-bottom:10px">🗑</button>
    </div>
    <div style="font-size:11px;font-weight:600;text-transform:uppercase;color:var(--text-dim);margin-bottom:8px">Itens do Grupo</div>
    <div class="addon-items-list" style="display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;align-items:center;gap:10px">
        <input class="form-input" placeholder="Nome do item" style="flex:1" />
        <input class="form-input" placeholder="Preço" type="number" style="width:100px" />
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--text-dim);cursor:pointer;padding:6px">✕</button>
      </div>
    </div>
    <button onclick="addAddonItem(this)" class="btn btn-ghost" style="padding:4px 8px;font-size:11px;margin-top:10px">＋ Novo Item</button>
  `;
  container.appendChild(div);
}

function addAddonItem(btn) {
  const list = btn.parentElement.querySelector('.addon-items-list');
  if(!list) return;
  const div = document.createElement('div');
  div.style.cssText = 'display:flex;align-items:center;gap:10px;animation:fadeIn 0.2s ease';
  div.innerHTML = `
    <input class="form-input" placeholder="Nome do item" style="flex:1" />
    <input class="form-input" placeholder="Preço" type="number" style="width:100px" />
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--text-dim);cursor:pointer;padding:6px">✕</button>
  `;
  list.appendChild(div);
}

function calcMarkup() {
  const custoStr = document.getElementById('f-custo').value;
  const markupStr = document.getElementById('f-markup').value;
  
  if(custoStr && markupStr) {
    const custo = parseFloat(custoStr);
    const markup = parseFloat(markupStr);
    if(!isNaN(custo) && !isNaN(markup)) {
      const venda = custo * (1 + (markup / 100));
      document.getElementById('f-venda').value = venda.toFixed(2);
    }
  }
}

function updateToggleStyle(el, trackId) {
  // handled by pure css .tog input:checked + .tog-track
}

// --- LÓGICA DE PAGAMENTOS ---

function renderPagamentos() {
  const container = document.getElementById('pagamentos-list');
  if (!container) return;
  
  if (mockPagamentos.length === 0) {
    container.innerHTML = '<div style="color:var(--text-dim);font-size:13px;text-align:center">Nenhuma forma de pagamento cadastrada.</div>';
    return;
  }
  
  let html = '';
  mockPagamentos.forEach((p, index) => {
    html += `
      <div style="background:var(--content-bg);border:1px solid var(--border-soft);border-radius:8px;padding:12px;display:flex;justify-content:space-between;align-items:center">
        <div style="font-weight:600;font-size:14px">${p.nome}</div>
        <div style="display:flex;align-items:center;gap:12px">
          <label class="tog" style="margin:0">
            <input type="checkbox" ${p.ativo ? 'checked' : ''} onchange="togglePagamento(${index})">
            <span class="tog-track"></span>
          </label>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

function adicionarPagamento() {
  const nome = prompt("Nome da forma de pagamento (ex: Dinheiro, PIX, Débito):");
  if (nome && nome.trim()) {
    mockPagamentos.push({
      id: Date.now(),
      nome: nome.trim(),
      ativo: true
    });
    localStorage.setItem('mockPagamentos', JSON.stringify(mockPagamentos));
    renderPagamentos();
    showToast('Forma de pagamento adicionada!', 'success');
  }
}

function togglePagamento(index) {
  mockPagamentos[index].ativo = !mockPagamentos[index].ativo;
  localStorage.setItem('mockPagamentos', JSON.stringify(mockPagamentos));
  showToast('Status atualizado.');
}

// --- LÓGICA DO FRENTE DE CAIXA (PDV) ---

function gerarComandas() {
  const qtd = parseInt(document.getElementById('f-qtd-comandas')?.value) || 50;
  mockComandas = [];
  for(let i=1; i<=qtd; i++) {
    mockComandas.push({
      id: i,
      status: 'livre', // livre, em_uso, bloqueada
      cliente: '',
      telefone: '',
      cpf: '',
      abertaEm: null,
      ultimaModificacao: null,
      pagamentos: [], // { id, valor, itens: [] }
      items: [],
      total: 0
    });
  }
  localStorage.setItem('mockComandas', JSON.stringify(mockComandas));
  showToast(`Sucesso! ${qtd} comandas geradas.`);
  const s = document.getElementById('comandas-status');
  if(s) s.textContent = `${qtd} comandas configuradas.`;
  navigateTo('vendas-caixa');
  if (caixaStatus === 'aberto') {
    switchCaixaTab('comandas', document.querySelector('.futuristic-tab:nth-child(2)'));
  }
}

function gerarMesas() {
  const qtd = parseInt(document.getElementById('f-qtd-mesas')?.value) || 20;
  mockMesas = [];
  for(let i=1; i<=qtd; i++) {
    mockMesas.push({
      id: i,
      status: 'livre', // livre, em_uso
      comandas: [] // Array of comanda IDs
    });
  }
  localStorage.setItem('mockMesas', JSON.stringify(mockMesas));
  showToast(`Sucesso! ${qtd} mesas geradas.`);
  const s = document.getElementById('mesas-status');
  if(s) s.textContent = `${qtd} mesas configuradas.`;
  navigateTo('vendas-caixa');
  if (caixaStatus === 'aberto') {
    switchCaixaTab('mesas', document.querySelector('.futuristic-tab:nth-child(3)'));
  }
}

function renderConfigComandas() {
  document.getElementById('f-qtd-comandas').value = mockComandas.length > 0 ? mockComandas.length : 50;
  document.getElementById('comandas-status').textContent = mockComandas.length > 0 ? `${mockComandas.length} comandas ativas.` : 'Nenhuma configurada.';
}

function renderConfigMesas() {
  document.getElementById('f-qtd-mesas').value = mockMesas.length > 0 ? mockMesas.length : 20;
  document.getElementById('mesas-status').textContent = mockMesas.length > 0 ? `${mockMesas.length} mesas ativas.` : 'Nenhuma configurada.';
}

function openCaixa() {
  const overlay = document.getElementById('caixa-overlay');
  const fecharBtn = document.getElementById('btn-fechar-caixa');
  const label = document.getElementById('caixa-status-label');
  
  if(caixaStatus === 'fechado') {
    overlay.style.display = 'flex';
    fecharBtn.style.display = 'none';
    label.textContent = 'Status: Fechado';
  } else {
    overlay.style.display = 'none';
    const openedAt = localStorage.getItem('caixaAbertoEm');
    let timeStr = '';
    if(openedAt) {
      const dt = new Date(openedAt);
      timeStr = ` - Aberto em: ${dt.toLocaleDateString()} às ${dt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    }
    label.textContent = `Status: Aberto (Troco: R$ ${caixaSaldoInicial.toFixed(2)})${timeStr}`;
    
    if(mockComandas.length === 0) gerarComandas();
    if(mockMesas.length === 0) gerarMesas();
    
    // Default render
    switchCaixaTab('venda-direta', document.querySelector('.futuristic-tab:nth-child(1)'));
  }
}

function abrirCaixa() {
  const val = parseFloat(document.getElementById('f-fundo-troco').value) || 0;
  caixaSaldoInicial = val;
  caixaStatus = 'aberto';
  localStorage.setItem('caixaStatus', 'aberto');
  localStorage.setItem('caixaSaldoInicial', val);
  localStorage.setItem('caixaAbertoEm', new Date().toISOString());
  
  if(mockComandas.length === 0) gerarComandas(); // Auto-generate se esquecer
  if(mockMesas.length === 0) gerarMesas();
  
  showToast('Caixa aberto com sucesso!', 'success');
  openCaixa();
}

function fecharCaixa() {
  document.getElementById('fechamento-overlay').style.opacity = '1';
  document.getElementById('fechamento-overlay').style.pointerEvents = 'auto';
  document.getElementById('fechamento-modal').classList.add('open');
  
  const container = document.getElementById('fechamento-pagamentos-container');
  container.innerHTML = mockPagamentos.filter(p => p.ativo).map(p => `
    <div style="display:flex;justify-content:space-between;margin-bottom:12px;align-items:center">
      <div style="font-size:14px;font-weight:600">${p.nome}</div>
      <input type="number" step="0.01" class="form-input" style="width:120px;text-align:right" placeholder="0.00" id="fechar-val-${p.id}" />
    </div>
  `).join('');
  
  const chk = document.getElementById('chk-fechamento-entregadores');
  if(chk) chk.checked = false;
  const contEnt = document.getElementById('fechamento-entregadores-container');
  if(contEnt) {
    contEnt.style.display = 'none';
    contEnt.innerHTML = '';
  }
}

function toggleFechamentoEntregadores() {
  const isChecked = document.getElementById('chk-fechamento-entregadores').checked;
  const container = document.getElementById('fechamento-entregadores-container');
  
  if (!isChecked) {
    container.style.display = 'none';
    return;
  }
  
  // Calcular entregas finalizadas no dia
  const hoje = new Date().toISOString().split('T')[0];
  const entregasHoje = mockDelivery.filter(d => d.status === 'finalizado' && d.hora.startsWith(hoje) && d.entregadorId);
  
  if (entregasHoje.length === 0) {
    container.innerHTML = '<div style="font-size:12px;color:var(--text-dim);text-align:center">Nenhuma entrega registrada hoje com entregador.</div>';
    container.style.display = 'block';
    return;
  }
  
  const valoresPorEntregador = {};
  entregasHoje.forEach(d => {
    if(!valoresPorEntregador[d.entregadorId]) {
      valoresPorEntregador[d.entregadorId] = 0;
    }
    valoresPorEntregador[d.entregadorId] += d.taxa;
  });
  
  let html = '<div style="font-size:12px;color:var(--text-dim);margin-bottom:8px">Valores acumulados de taxa de entrega:</div>';
  let temValor = false;
  
  for (let eId in valoresPorEntregador) {
    const e = mockEntregadores.find(x => x.id == eId);
    if(e) {
      temValor = true;
      html += `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
          <div style="font-weight:600;font-size:13px">${e.nome}</div>
          <div style="color:var(--accent);font-weight:bold">R$ ${valoresPorEntregador[eId].toFixed(2)}</div>
        </div>
      `;
    }
  }
  
  container.innerHTML = html;
  container.style.display = 'block';
}

function imprimirRelatorioEntregadores() {
  showToast('Imprimindo relatório de entregas...', 'success');
}

function cancelarFechamento() {
  document.getElementById('fechamento-overlay').style.opacity = '0';
  document.getElementById('fechamento-overlay').style.pointerEvents = 'none';
  document.getElementById('fechamento-modal').classList.remove('open');
}

function confirmarFechamentoCaixa() {
  caixaStatus = 'fechado';
  localStorage.setItem('caixaStatus', 'fechado');
  
  showToast('Caixa fechado com sucesso. Valores apurados!', 'success');
  cancelarFechamento();
  openCaixa();
}

function switchCaixaTab(tabId, el) {
  if (tabId === 'balcao') {
    // Restaurar a aba visual anterior para não ficar com "Balcão" acesa antes de confirmar
    abrirModalBalcao(el);
    return;
  }
  
  activeCaixaTab = tabId;
  const parent = el.parentElement;
  parent.querySelectorAll('.modal-tab, .futuristic-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  
  document.querySelectorAll('.caixa-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.caixa-pane').forEach(p => p.style.display = 'none');
  
  const pane = document.getElementById('pane-' + tabId);
  if(pane) {
    pane.classList.add('active');
    pane.style.display = tabId === 'venda-direta' ? 'flex' : 'block';
  }
  
  if(tabId === 'venda-direta') {
    pdvActiveComandaId = null;
    const titleEl = document.getElementById('pdv-cart-title');
    if(titleEl) {
      if(activeBalcaoName) titleEl.textContent = `Venda Direta - ${activeBalcaoType} (${activeBalcaoName})`;
      else titleEl.textContent = 'Nova Venda Direta';
    }
    const btnClose = document.getElementById('pdv-btn-close-comanda');
    if(btnClose) btnClose.style.display = 'none';
    const actDireta = document.getElementById('pdv-cart-actions-direta');
    if(actDireta) actDireta.style.display = 'flex';
    const actComanda = document.getElementById('pdv-cart-actions-comanda');
    if(actComanda) actComanda.style.display = 'none';
    pdvNavLevel = 'categorias';
    renderPDVProducts();
    renderCart();
  }
  if(tabId === 'comandas') renderPDVComandas();
  if(tabId === 'mesas') renderPDVMesas();
}

let activeBalcaoName = '';
let activeBalcaoType = '';

function abrirModalBalcao(elTabBalcao) {
  document.getElementById('modal-balcao').classList.add('open');
  document.getElementById('modal-balcao-overlay').style.opacity = '1';
  document.getElementById('modal-balcao-overlay').style.pointerEvents = 'auto';
  
  // Limpar form
  document.getElementById('f-balcao-nome').value = '';
  document.querySelector('input[name="balcao-tipo"][value="comer_aqui"]').checked = true;
  toggleBalcaoTipo();
}

function fecharModalBalcao() {
  document.getElementById('modal-balcao').classList.remove('open');
  document.getElementById('modal-balcao-overlay').style.opacity = '0';
  document.getElementById('modal-balcao-overlay').style.pointerEvents = 'none';
}

function toggleBalcaoTipo() {
  // Nenhuma ação visual necessária pois os campos extras foram removidos
}

function confirmarBalcao() {
  const nome = document.getElementById('f-balcao-nome').value.trim();
  const tipo = document.querySelector('input[name="balcao-tipo"]:checked').value;
  
  if (!nome) {
    showToast('Informe o nome do cliente.', 'error');
    return;
  }
  
  activeBalcaoName = nome;
  activeBalcaoType = tipo === 'viagem' ? 'Viagem' : 'Balcão';
  
  pdvActiveComandaId = null;
  pdvActiveDeliveryId = null;
  window.pdvActiveDeliveryManualContext = null;
  
  fecharModalBalcao();
  
  cart = [];
  renderCart();
  
  const tVenda = document.querySelector('.futuristic-tab:nth-child(1)');
  switchCaixaTab('venda-direta', tVenda);
  
  showToast(`Venda direta (${activeBalcaoType}) iniciada para ${nome}`);
}

function renderPDVProducts() {
  const search = document.getElementById('pdv-search').value.toLowerCase();
  const grid = document.getElementById('pdv-products-grid');
  const btnVoltar = document.getElementById('pdv-btn-voltar');
  const breadcrumb = document.getElementById('pdv-breadcrumb');
  
  if(!grid) return; // fail-safe
  
  let html = '';
  
  if (search.length > 0) {
    if(btnVoltar) btnVoltar.style.display = 'none';
    if(breadcrumb) breadcrumb.textContent = `Buscando: "${search}"`;
    mockProducts.filter(p => p.ativo && p.tipo !== 'Matéria Prima' && p.nome.toLowerCase().includes(search)).forEach(p => {
      html += buildProductCard(p);
    });
  } else {
    if (pdvNavLevel === 'categorias') {
      if(btnVoltar) btnVoltar.style.display = 'none';
      if(breadcrumb) breadcrumb.textContent = 'Categorias';
      mockCategorias.forEach(c => {
        const hasActiveProds = mockProducts.some(p => p.categoria === c.nome && p.ativo && p.tipo !== 'Matéria Prima');
        if(hasActiveProds) {
          html += `
            <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:10px;padding:24px 12px;text-align:center;cursor:pointer;transition:transform 0.2s, border-color 0.2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border-soft)'" onclick="pdvSelectCat('${c.nome}')">
              <div style="font-weight:600;font-size:14px">${c.nome}</div>
            </div>
          `;
        }
      });
    } else if (pdvNavLevel === 'subcategorias') {
      if(btnVoltar) btnVoltar.style.display = 'block';
      if(breadcrumb) breadcrumb.textContent = `Categorias > ${pdvCurrentCat}`;
      const cat = mockCategorias.find(c => c.nome === pdvCurrentCat);
      if(cat && cat.subcategorias) {
        cat.subcategorias.forEach(sub => {
          const hasProds = mockProducts.some(p => p.subcategoria === sub && p.ativo && p.tipo !== 'Matéria Prima');
          if(hasProds) {
            html += `
              <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:10px;padding:20px 12px;text-align:center;cursor:pointer;transition:transform 0.2s, border-color 0.2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border-soft)'" onclick="pdvSelectSubcat('${sub}')">
                <div style="font-weight:600;font-size:13px">${sub}</div>
              </div>
            `;
          }
        });
      }
      if(html === '') {
        pdvNavLevel = 'produtos';
        renderPDVProducts();
        return;
      }
    } else if (pdvNavLevel === 'produtos') {
      if(btnVoltar) btnVoltar.style.display = 'block';
      if(breadcrumb) breadcrumb.textContent = `Categorias > ${pdvCurrentCat}` + (pdvCurrentSubcat ? ` > ${pdvCurrentSubcat}` : '');
      mockProducts.filter(p => p.ativo && p.tipo !== 'Matéria Prima' && p.categoria === pdvCurrentCat && (!pdvCurrentSubcat || p.subcategoria === pdvCurrentSubcat)).forEach(p => {
        html += buildProductCard(p);
      });
    }
  }
  
  grid.innerHTML = html;
}

function renderPDVComandas() {
  localStorage.setItem('mockComandas', JSON.stringify(mockComandas));
  const grid = document.getElementById('pdv-comandas-grid');
  const metricsContainer = document.getElementById('pdv-comandas-metrics');
  
  const inUse = mockComandas.filter(c => c.status === 'em_uso').length;
  const available = mockComandas.filter(c => c.status === 'livre').length;
  
  if (metricsContainer) {
    metricsContainer.innerHTML = `
      <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:10px;padding:12px 20px;display:flex;align-items:center;gap:12px">
        <div style="width:12px;height:12px;border-radius:50%;background:var(--danger)"></div>
        <div style="font-size:13px"><span style="color:var(--text-dim)">Em Uso:</span> <strong style="font-size:16px">${inUse}</strong></div>
      </div>
      <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:10px;padding:12px 20px;display:flex;align-items:center;gap:12px">
        <div style="width:12px;height:12px;border-radius:50%;background:var(--success)"></div>
        <div style="font-size:13px"><span style="color:var(--text-dim)">Disponíveis:</span> <strong style="font-size:16px">${available}</strong></div>
      </div>
    `;
  }
  
  let html = '';
  const now = new Date();
  
  mockComandas.forEach(c => {
    let bg, border, label, idleText = '';
    if (c.status === 'livre') {
      bg = 'rgba(92,184,92,0.1)';
      border = 'var(--success)';
      label = 'Livre';
    } else if (c.status === 'bloqueada') {
      bg = 'rgba(255,255,255,0.05)';
      border = 'var(--text-dim)';
      label = 'Bloqueada';
    } else {
      bg = 'rgba(224,92,74,0.1)';
      border = 'var(--danger)';
      label = 'OCUPADA';
      
      const lastMod = c.ultimaModificacao || c.abertaEm;
      if (lastMod) {
        const diffMs = now - new Date(lastMod);
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins > 0) {
          idleText = `<div style="position:absolute;top:6px;right:6px;font-size:10px;background:rgba(0,0,0,0.5);padding:2px 4px;border-radius:4px;color:var(--text-dim)">${diffMins}m</div>`;
        }
      }
    }
    
    let totalPendente = 0;
    if (c.status === 'em_uso') {
      const somaItens = c.items.filter(i => !i._pago).reduce((acc, i) => acc + i.total, 0);
      const somaPag = (c.pagamentos || []).reduce((acc, p) => acc + p.valor, 0);
      totalPendente = Math.max(0, somaItens - somaPag);
    }
    
    html += `
      <div style="position:relative;background:${bg};border:1px solid ${border};border-radius:10px;padding:14px;text-align:center;cursor:pointer;opacity:${c.status === 'bloqueada' ? '0.5' : '1'}" onclick="handleComandaClick(${c.id})">
        ${idleText}
        <div style="font-size:20px;font-weight:700;margin-bottom:4px;color:var(--text)">${c.id.toString().padStart(2, '0')}</div>
        <div style="font-size:11px;color:${c.status === 'em_uso' ? 'var(--danger)' : 'var(--text-dim)'};font-weight:${c.status === 'em_uso' ? 'bold' : 'normal'}">${label}</div>
        ${c.status === 'em_uso' && c.cliente ? `<div style="font-size:11px;color:var(--text-mid);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.cliente}</div>` : ''}
        ${c.status === 'em_uso' ? `<div style="font-size:12px;color:var(--text);font-weight:600;margin-top:6px">R$ ${totalPendente.toFixed(2)}</div>` : ''}
      </div>
    `;
  });
  grid.innerHTML = html;
}

function renderPDVMesas() {
  localStorage.setItem('mockMesas', JSON.stringify(mockMesas));
  const grid = document.getElementById('pdv-mesas-grid');
  let html = '';
  mockMesas.forEach(m => {
    const isLivre = m.status === 'livre';
    const bg = isLivre ? 'rgba(92,184,92,0.1)' : 'rgba(224,92,74,0.1)';
    const border = isLivre ? 'var(--success)' : 'var(--danger)';
    const label = isLivre ? 'DISPONÍVEL' : 'OCUPADA';
    const comandasText = m.comandas.length > 0 ? `Cmds: ${m.comandas.join(', ')}` : 'Nenhuma comanda';
    
    html += `
      <div style="background:${bg};border:1px solid ${border};border-radius:10px;padding:16px;display:flex;flex-direction:column;align-items:center;cursor:pointer" onclick="handleMesaClick(${m.id})">
        <div style="font-size:32px;margin-bottom:8px">🪑</div>
        <div style="font-weight:600">Mesa ${m.id}</div>
        <div style="font-size:11px;color:${isLivre ? 'var(--success)' : 'var(--danger)'};font-weight:bold;margin-top:4px">${label}</div>
        <div style="font-size:11px;color:var(--text-dim);margin-top:4px">${comandasText}</div>
      </div>
    `;
  });
  grid.innerHTML = html;
}

function fecharModalAbrirComanda() {
  document.getElementById('modal-abrir-comanda').classList.remove('open');
  document.getElementById('modal-abrir-comanda-overlay').style.opacity = '0';
  document.getElementById('modal-abrir-comanda-overlay').style.pointerEvents = 'none';
  modalContextComanda = null;
}

function abrirModalAbrirComanda(id) {
  modalContextComanda = id;
  document.getElementById('lbl-abrir-comanda').textContent = `Abrir Comanda ${id}`;
  document.getElementById('f-comanda-cliente').value = '';
  document.getElementById('f-comanda-telefone').value = '';
  document.getElementById('f-comanda-cpf').value = '';
  document.getElementById('modal-abrir-comanda').classList.add('open');
  document.getElementById('modal-abrir-comanda-overlay').style.opacity = '1';
  document.getElementById('modal-abrir-comanda-overlay').style.pointerEvents = 'auto';
  document.getElementById('f-comanda-cliente').focus();
}

function confirmarAbrirComanda() {
  const nome = document.getElementById('f-comanda-cliente').value.trim();
  const tel = document.getElementById('f-comanda-telefone').value.trim();
  const cpf = document.getElementById('f-comanda-cpf').value.trim();
  const c = mockComandas.find(x => x.id === modalContextComanda);
  if(c && c.status === 'livre') {
    c.status = 'em_uso';
    c.cliente = nome || 'Sem nome';
    c.telefone = tel;
    c.cpf = cpf;
    c.abertaEm = new Date().toISOString();
    c.ultimaModificacao = c.abertaEm;
    renderPDVComandas();
    fecharModalAbrirComanda();
    abrirCarrinhoComanda(c.id);
  }
}

function fecharModalDetalhesMesa() {
  document.getElementById('modal-detalhes-mesa').classList.remove('open');
  document.getElementById('modal-detalhes-mesa-overlay').style.opacity = '0';
  document.getElementById('modal-detalhes-mesa-overlay').style.pointerEvents = 'none';
  modalContextMesa = null;
}

function abrirModalDetalhesMesa(id) {
  modalContextMesa = id;
  const m = mockMesas.find(x => x.id === id);
  document.getElementById('lbl-detalhes-mesa').textContent = `Mesa ${id}`;
  
  const cont = document.getElementById('detalhes-mesa-comandas');
  if(m.comandas.length === 0) {
    cont.innerHTML = `<div style="font-size:13px;color:var(--text-dim);text-align:center;padding:10px">Nenhuma comanda vinculada.</div>`;
  } else {
    let html = '';
    m.comandas.forEach(cid => {
      const c = mockComandas.find(x => x.id === cid);
      html += `
        <div style="background:var(--sidebar-bg);padding:12px;border-radius:8px;border:1px solid var(--border-soft);display:flex;justify-content:space-between;align-items:center;cursor:pointer" onclick="abrirCarrinhoComandaLocal(${cid})">
          <div>
            <div style="font-weight:600;font-size:14px;color:var(--text)">Comanda ${cid}</div>
            <div style="font-size:12px;color:var(--text-dim)">${c.cliente || 'Sem nome'}</div>
          </div>
          <div style="font-weight:600;color:var(--accent)">R$ ${c.total.toFixed(2)}</div>
        </div>
      `;
    });
    cont.innerHTML = html;
  }
  
  document.getElementById('modal-detalhes-mesa').classList.add('open');
  document.getElementById('modal-detalhes-mesa-overlay').style.opacity = '1';
  document.getElementById('modal-detalhes-mesa-overlay').style.pointerEvents = 'auto';
}

function abrirCarrinhoComandaLocal(cid) {
  fecharModalDetalhesMesa();
  abrirCarrinhoComanda(cid);
}

function abrirModalVincularMesaNaMesa() {
  const mId = modalContextMesa;
  fecharModalDetalhesMesa();
  abrirModalVincularMesa(mId);
}

function fecharModalVincularMesa() {
  document.getElementById('modal-vincular-mesa').classList.remove('open');
  document.getElementById('modal-vincular-mesa-overlay').style.opacity = '0';
  document.getElementById('modal-vincular-mesa-overlay').style.pointerEvents = 'none';
  // modalContextMesa = null; do not nullify here so we can use it.
}

// --- KANBAN DELIVERY LOGIC ---

function renderPDVDelivery() {
  const statuses = ['novo', 'preparo', 'saiu_entrega', 'pronto', 'finalizado'];
  const counts = { novo: 0, preparo: 0, saiu_entrega: 0, pronto: 0, finalizado: 0 };
  
  statuses.forEach(st => {
    const col = document.getElementById('col-kanban-' + st);
    if(col) col.innerHTML = '';
  });
  
  mockDelivery.forEach(d => {
    counts[d.status]++;
    const col = document.getElementById('col-kanban-' + d.status);
    if(col) {
      let cor = 'var(--accent)';
      if (d.status === 'novo') cor = 'var(--danger)';
      else if (d.status === 'preparo') cor = 'var(--accent)';
      else if (d.status === 'saiu_entrega') cor = 'var(--success)';
      else if (d.status === 'pronto') cor = '#3498db';
      else if (d.status === 'finalizado') cor = 'var(--text-dim)';

      col.innerHTML += `
        <div class="card" draggable="true" ondragstart="dragKanban(event, '${d.id}')" onclick="abrirModalDetalhesDelivery('${d.id}')" style="padding:12px;cursor:grab;border-left:3px solid ${cor}">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-weight:bold;color:var(--text)">#${d.id}</span>
            <span style="font-size:11px;color:var(--text-dim)">${new Date(d.hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div style="font-size:13px;margin-bottom:4px;font-weight:600">${d.cliente}</div>
          ${d.tipo === 'Entrega' || d.tipo === 'Viagem' ? `<div style="font-size:11px;color:var(--text-dim);margin-bottom:8px">${d.endereco || 'Retirada'}</div>` : ''}
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:10px;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px">${d.tipo}</span>
            <span style="font-weight:600;color:var(--accent);font-size:13px">R$ ${d.total.toFixed(2)}</span>
          </div>
        </div>
      `;
    }
  });
  
  statuses.forEach(st => {
    const badge = document.getElementById('badge-kanban-' + st);
    if(badge) badge.textContent = counts[st];
  });
}

function dragKanban(ev, id) {
  ev.dataTransfer.setData("text", id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function dropKanban(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  let target = ev.target;
  while(target && !target.id?.startsWith('col-kanban-')) {
    target = target.parentElement;
  }
  
  if (target) {
    const newStatus = target.getAttribute('data-status');
    const order = mockDelivery.find(x => x.id == id);
    if (order && newStatus && order.status !== newStatus) {
      order.status = newStatus;
      localStorage.setItem('mockDelivery', JSON.stringify(mockDelivery));
      renderPDVDelivery();
      showToast(`Pedido #${id} movido para ${newStatus.toUpperCase()}`);
      
      // WhatsApp Integration for Entregador
      if (newStatus === 'saiu_entrega' && order.entregadorId) {
        const ent = mockEntregadores.find(e => e.id == order.entregadorId);
        if (ent) {
          const msg = `🛵 *Nova Entrega!*\n\nPedido: #${order.id}\nCliente: ${order.cliente}\nEndereço: ${order.endereco || 'Não informado'}\nValor a Receber: R$ ${order.total.toFixed(2)}\nPagamento: ${order.pagamento || 'Não informado'}`;
          const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
          window.open(url, '_blank');
        }
      }
    }
  }
}

// --- MANUAL DELIVERY KANBAN LOGIC ---
function renderManualDelivery() {
  const statuses = ['preparo', 'pronto', 'finalizado'];
  const counts = { preparo: 0, pronto: 0, finalizado: 0 };
  
  statuses.forEach(st => {
    const col = document.getElementById('col-kanban-manual-' + st);
    if(col) col.innerHTML = '';
  });
  
  let mockDeliveryManual = JSON.parse(localStorage.getItem('mockDeliveryManual')) || [];
  
  mockDeliveryManual.forEach(d => {
    if (counts[d.status] !== undefined) counts[d.status]++;
    const col = document.getElementById('col-kanban-manual-' + d.status);
    if(col) {
      let cor = 'var(--accent)';
      if (d.status === 'preparo') cor = 'var(--accent)';
      else if (d.status === 'pronto') cor = '#3498db';
      else if (d.status === 'finalizado') cor = 'var(--text-dim)';
      
      col.innerHTML += `
        <div class="card" draggable="true" ondragstart="dragKanbanManual(event, '${d.id}')" onclick="abrirModalDetalhesDelivery('${d.id}', true)" style="padding:12px;cursor:grab;border-left:3px solid ${cor}">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px">
            <span style="font-weight:bold;color:var(--text)">#${d.id}</span>
            <span style="font-size:11px;color:var(--text-dim)">${new Date(d.hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div style="font-size:13px;margin-bottom:4px;font-weight:600">${d.cliente}</div>
          ${d.tipo === 'Entrega' || d.tipo === 'Viagem' ? `<div style="font-size:11px;color:var(--text-dim);margin-bottom:8px">${d.endereco || 'Retirada'}</div>` : ''}
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:10px;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px">${d.tipo}</span>
            <span style="font-weight:600;color:var(--accent);font-size:13px">R$ ${d.total.toFixed(2)}</span>
          </div>
        </div>
      `;
    }
  });
  
  statuses.forEach(st => {
    const badge = document.getElementById('badge-kanban-manual-' + st);
    if(badge) badge.textContent = counts[st];
  });
}

function dragKanbanManual(ev, id) {
  ev.dataTransfer.setData("text", id);
}

function allowDropManual(ev) {
  ev.preventDefault();
}

function dropKanbanManual(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  let target = ev.target;
  while(target && !target.id?.startsWith('col-kanban-manual-')) {
    target = target.parentElement;
  }
  
  if (target) {
    const newStatus = target.getAttribute('data-status');
    let mockDeliveryManual = JSON.parse(localStorage.getItem('mockDeliveryManual')) || [];
    const order = mockDeliveryManual.find(x => x.id == id);
    if (order && newStatus && order.status !== newStatus) {
      order.status = newStatus;
      localStorage.setItem('mockDeliveryManual', JSON.stringify(mockDeliveryManual));
      renderManualDelivery();
      showToast(`Pedido #${id} movido para ${newStatus.toUpperCase()}`);
    }
  }
}

function abrirModalNovoDeliveryManual() {
  document.getElementById('f-manual-nome').value = '';
  document.getElementById('f-manual-telefone').value = '';
  document.getElementById('f-manual-endereco').value = '';
  document.getElementById('f-manual-taxa').value = '';
  document.getElementById('modal-novo-delivery-manual').classList.add('open');
  document.getElementById('modal-novo-delivery-manual-overlay').style.opacity = '1';
  document.getElementById('modal-novo-delivery-manual-overlay').style.pointerEvents = 'auto';
}

function fecharModalNovoDeliveryManual() {
  document.getElementById('modal-novo-delivery-manual').classList.remove('open');
  document.getElementById('modal-novo-delivery-manual-overlay').style.opacity = '0';
  document.getElementById('modal-novo-delivery-manual-overlay').style.pointerEvents = 'none';
}

function iniciarPedidoManual() {
  const nome = document.getElementById('f-manual-nome').value.trim();
  if(!nome) {
    showToast('Informe o nome do cliente.', 'error');
    return;
  }
  const tel = document.getElementById('f-manual-telefone').value.trim();
  const end = document.getElementById('f-manual-endereco').value.trim();
  const taxa = parseFloat(document.getElementById('f-manual-taxa').value) || 0;
  
  window.pdvActiveDeliveryManualContext = {
    nome,
    telefone: tel,
    endereco: end,
    taxa
  };
  
  fecharModalNovoDeliveryManual();
  
  pdvActiveComandaId = null;
  pdvActiveDeliveryId = null;
  cart = [];
  renderCart();
  
  const titleEl = document.getElementById('pdv-cart-title');
  if (titleEl) titleEl.textContent = 'Novo Pedido Delivery (Manual)';
  
  navigateTo('vendas-caixa');
  
  showToast('Selecione os produtos para o pedido.');
}

let modalContextDelivery = null;
let pdvActiveDeliveryId = null;

let modalContextDeliveryIsManual = false;

function abrirModalDetalhesDelivery(id, isManual = false) {
  modalContextDelivery = id;
  modalContextDeliveryIsManual = isManual;
  
  let sourceArray = isManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
  const d = sourceArray.find(x => x.id == id);
  if(!d) return;
  
  document.getElementById('lbl-detalhes-delivery-id').textContent = `Pedido #${d.id}`;
  document.getElementById('lbl-detalhes-delivery-tipo').textContent = d.tipo;
  document.getElementById('lbl-detalhes-delivery-hora').textContent = new Date(d.hora).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  document.getElementById('lbl-detalhes-delivery-cliente').textContent = d.cliente;
  
  const tel = d.telefone || '';
  const telLink = document.getElementById('lbl-detalhes-delivery-tel-link');
  document.getElementById('lbl-detalhes-delivery-tel').textContent = tel || 'Sem telefone';
  if(tel) {
    telLink.href = `https://wa.me/55${tel.replace(/\D/g, '')}`;
    telLink.style.pointerEvents = 'auto';
  } else {
    telLink.href = '#';
    telLink.style.pointerEvents = 'none';
  }
  
  const end = d.endereco || '';
  const endLink = document.getElementById('lbl-detalhes-delivery-end-link');
  document.getElementById('lbl-detalhes-delivery-end').textContent = end || 'Retirada no local';
  if(end) {
    endLink.href = `https://maps.google.com/?q=${encodeURIComponent(end)}`;
    endLink.style.pointerEvents = 'auto';
  } else {
    endLink.href = '#';
    endLink.style.pointerEvents = 'none';
  }
  
  const selEnt = document.getElementById('f-detalhes-delivery-entregador');
  const boxEnt = document.getElementById('box-entregador-delivery');
  if(d.tipo === 'Entrega' || d.tipo === 'Viagem') {
    boxEnt.style.display = 'block';
  } else {
    boxEnt.style.display = 'none';
  }
  
  let opts = '<option value="">Nenhum</option>';
  mockEntregadores.forEach(e => {
    opts += `<option value="${e.id}" ${d.entregadorId == e.id ? 'selected' : ''}>${e.nome}</option>`;
  });
  selEnt.innerHTML = opts;
  
  let htmlItens = '';
  d.itens.forEach(i => {
    htmlItens += `
      <div style="display:flex;justify-content:space-between;font-size:13px">
        <span>${i.qtd}x ${i.nome}</span>
        <span style="color:var(--text-mid)">R$ ${(i.preco * i.qtd).toFixed(2)}</span>
      </div>
    `;
  });
  document.getElementById('detalhes-delivery-itens').innerHTML = htmlItens;
  
  document.getElementById('lbl-detalhes-delivery-sub').textContent = `R$ ${d.subtotal.toFixed(2)}`;
  document.getElementById('lbl-detalhes-delivery-taxa').textContent = `R$ ${d.taxa.toFixed(2)}`;
  document.getElementById('lbl-detalhes-delivery-total').textContent = `R$ ${d.total.toFixed(2)}`;
  
  document.getElementById('modal-detalhes-delivery').classList.add('open');
  document.getElementById('modal-detalhes-delivery-overlay').style.opacity = '1';
  document.getElementById('modal-detalhes-delivery-overlay').style.pointerEvents = 'auto';
}

function salvarEntregadorDelivery(val) {
  let sourceArray = modalContextDeliveryIsManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
  const d = sourceArray.find(x => x.id == modalContextDelivery);
  if (d) {
    d.entregadorId = val ? parseInt(val) : null;
    if (modalContextDeliveryIsManual) {
      localStorage.setItem('mockDeliveryManual', JSON.stringify(sourceArray));
    } else {
      localStorage.setItem('mockDelivery', JSON.stringify(sourceArray));
    }
    showToast('Entregador atualizado.', 'success');
  }
}

function fecharModalDetalhesDelivery() {
  document.getElementById('modal-detalhes-delivery').classList.remove('open');
  document.getElementById('modal-detalhes-delivery-overlay').style.opacity = '0';
  document.getElementById('modal-detalhes-delivery-overlay').style.pointerEvents = 'none';
}

function imprimirPedidoDelivery() {
  showToast('Imprimindo pedido...', 'success');
}

function fecharModalAlterarPedidoSelecao() {
  document.getElementById('modal-alterar-pedido-selecao').classList.remove('open');
  document.getElementById('modal-alterar-pedido-selecao-overlay').style.opacity = '0';
  document.getElementById('modal-alterar-pedido-selecao-overlay').style.pointerEvents = 'none';
}

function alterarPedidoDelivery() {
  let sourceArray = modalContextDeliveryIsManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
  const d = sourceArray.find(x => x.id == modalContextDelivery);
  if(!d) return;
  
  const container = document.getElementById('alterar-pedido-itens-list');
  let html = '';
  d.itens.forEach((it, idx) => {
    html += `
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--content-bg);padding:12px;border-radius:8px;border:1px solid var(--border-soft)">
        <div>
          <div style="font-weight:600">${it.qtd}x ${it.nome}</div>
          <div style="font-size:12px;color:var(--text-dim)">R$ ${(it.preco * it.qtd).toFixed(2)}</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" style="padding:4px 8px;color:var(--danger)" onclick="removerItemDoPedidoAtivo(${idx})">🗑️</button>
          <button class="btn btn-primary" style="padding:4px 12px;font-size:12px" onclick="alterarItemDoPedidoAtivo(${idx})">Modificar</button>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
  
  document.getElementById('modal-alterar-pedido-selecao').classList.add('open');
  document.getElementById('modal-alterar-pedido-selecao-overlay').style.opacity = '1';
  document.getElementById('modal-alterar-pedido-selecao-overlay').style.pointerEvents = 'auto';
}

function removerItemDoPedidoAtivo(index) {
  if(confirm("Tem certeza que deseja remover este item do pedido?")) {
    let sourceArray = modalContextDeliveryIsManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
    const d = sourceArray.find(x => x.id == modalContextDelivery);
    if(d) {
      d.itens.splice(index, 1);
      d.subtotal = d.itens.reduce((acc, it) => acc + (it.preco * it.qtd), 0);
      d.total = d.subtotal + d.taxa;
      if (modalContextDeliveryIsManual) {
        localStorage.setItem('mockDeliveryManual', JSON.stringify(sourceArray));
        renderManualDelivery();
      } else {
        localStorage.setItem('mockDelivery', JSON.stringify(sourceArray));
        renderPDVDelivery();
      }
      showToast('Item removido com sucesso.', 'success');
      fecharModalAlterarPedidoSelecao();
      fecharModalDetalhesDelivery();
    }
  }
}

function alterarItemDoPedidoAtivo(index) {
  let sourceArray = modalContextDeliveryIsManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
  const d = sourceArray.find(x => x.id == modalContextDelivery);
  if(d) {
    const item = d.itens[index];
    d.itens.splice(index, 1); // remove o item original temporariamente
    cart = d.itens;
    
    window.pdvActiveDeliverySwapContext = {
      isManual: modalContextDeliveryIsManual,
      deliveryId: d.id,
      taxa: d.taxa
    };
    
    fecharModalAlterarPedidoSelecao();
    fecharModalDetalhesDelivery();
    
    pdvActiveComandaId = null;
    pdvActiveDeliveryId = null;
    window.pdvActiveDeliveryManualContext = null;
    
    const p = mockProducts.find(x => x.id === item.id);
    if(p) {
      abrirModalProdutoPDV(p.id);
    }
    
    renderCart();
    navigateTo('vendas-caixa');
    const titleEl = document.getElementById('pdv-cart-title');
    if(titleEl) titleEl.textContent = 'Alterando Pedido #' + d.id;
    showToast('Adicione o substituto e clique em Finalizar Venda.');
  }
}

function adicionarNovoItemAoPedido() {
  let sourceArray = modalContextDeliveryIsManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
  const d = sourceArray.find(x => x.id == modalContextDelivery);
  if(d) {
    cart = d.itens;
    
    window.pdvActiveDeliverySwapContext = {
      isManual: modalContextDeliveryIsManual,
      deliveryId: d.id,
      taxa: d.taxa
    };
    
    fecharModalAlterarPedidoSelecao();
    fecharModalDetalhesDelivery();
    
    pdvActiveComandaId = null;
    pdvActiveDeliveryId = null;
    window.pdvActiveDeliveryManualContext = null;
    
    renderCart();
    navigateTo('vendas-caixa');
    const titleEl = document.getElementById('pdv-cart-title');
    if(titleEl) titleEl.textContent = 'Adicionando ao Pedido #' + d.id;
    showToast('Adicione os novos itens e clique em Finalizar Venda.');
  }
}

function abrirModalVincularMesa(id) {
  modalContextMesa = id;
  document.getElementById('lbl-vincular-mesa').textContent = `Vincular à Mesa ${id}`;
  document.getElementById('f-mesa-comanda-id').value = '';
  document.getElementById('f-mesa-cliente-nome').value = '';
  document.getElementById('f-mesa-cliente-wrapper').style.display = 'none';
  
  document.getElementById('f-mesa-comanda-id').oninput = (e) => {
    const cid = parseInt(e.target.value);
    const c = mockComandas.find(x => x.id === cid);
    if(c && c.status === 'livre') {
      document.getElementById('f-mesa-cliente-wrapper').style.display = 'block';
    } else {
      document.getElementById('f-mesa-cliente-wrapper').style.display = 'none';
    }
  };
  
  document.getElementById('modal-vincular-mesa').classList.add('open');
  document.getElementById('modal-vincular-mesa-overlay').style.opacity = '1';
  document.getElementById('modal-vincular-mesa-overlay').style.pointerEvents = 'auto';
  document.getElementById('f-mesa-comanda-id').focus();
}

function confirmarVincularMesa() {
  const m = mockMesas.find(x => x.id === modalContextMesa);
  const cmdId = parseInt(document.getElementById('f-mesa-comanda-id').value);
  const c = mockComandas.find(x => x.id === cmdId);
  
  if(c) {
    if(c.status === 'livre') {
      const nome = document.getElementById('f-mesa-cliente-nome').value.trim() || 'Sem nome';
      c.status = 'em_uso';
      c.cliente = nome;
    }
    if(!m.comandas.includes(cmdId)) m.comandas.push(cmdId);
    m.status = 'em_uso';
    renderPDVMesas();
    renderPDVComandas();
    showToast(`Comanda ${cmdId} vinculada à Mesa ${m.id}`);
    fecharModalVincularMesa();
    abrirCarrinhoComanda(cmdId);
  } else {
    alert('Comanda não encontrada.');
  }
}

function handleComandaClick(id) {
  const c = mockComandas.find(x => x.id === id);
  if(c.status === 'livre') {
    abrirModalAbrirComanda(id);
  } else if (c.status === 'em_uso' || c.status === 'bloqueada') {
    abrirCarrinhoComanda(id);
  }
}

function handleMesaClick(id) {
  abrirModalDetalhesMesa(id);
}

function abrirCarrinhoComanda(id) {
  pdvActiveComandaId = id;
  const t = document.querySelector('.futuristic-tab:nth-child(1)');
  activeCaixaTab = 'venda-direta';
  t.parentElement.querySelectorAll('.futuristic-tab').forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  
  document.querySelectorAll('.caixa-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.caixa-pane').forEach(p => p.style.display = 'none');
  const pane = document.getElementById('pane-venda-direta');
  pane.classList.add('active');
  pane.style.display = 'flex';
  
  const c = mockComandas.find(x => x.id === id);
  document.getElementById('pdv-cart-title').textContent = `Comanda ${id} - ${c.cliente}`;
  document.getElementById('pdv-btn-close-comanda').style.display = 'block';
  document.getElementById('pdv-cart-actions-direta').style.display = 'none';
  document.getElementById('pdv-cart-actions-comanda').style.display = 'flex';
  
  if (c.status === 'bloqueada') {
    document.getElementById('btn-lancar-itens').style.display = 'none';
    document.getElementById('btn-pre-fechamento').style.display = 'none';
    document.getElementById('btn-finalizar-comanda').style.display = 'none';
    document.getElementById('btn-bloquear-comanda').style.display = 'none';
    document.getElementById('btn-desbloquear-comanda').style.display = 'block';
  } else {
    document.getElementById('btn-lancar-itens').style.display = 'block';
    document.getElementById('btn-pre-fechamento').style.display = 'block';
    document.getElementById('btn-finalizar-comanda').style.display = 'block';
    document.getElementById('btn-bloquear-comanda').style.display = 'block';
    document.getElementById('btn-desbloquear-comanda').style.display = 'none';
  }
  
  pdvNavLevel = 'categorias';
  renderPDVProducts();
  renderCart();
}

function bloquearComanda() {
  if (pdvActiveComandaId !== null) {
    const c = mockComandas.find(x => x.id === pdvActiveComandaId);
    c.status = 'bloqueada';
    c.cliente = 'BLOQUEADA';
    c.items = [];
    c.total = 0;
    syncMesasWithComanda(c.id, true);
    showToast(`Comanda ${pdvActiveComandaId} foi bloqueada!`);
    switchCaixaTab('comandas', document.querySelector('.modal-tab:nth-child(2)'));
  }
}

function desbloquearComanda() {
  if (pdvActiveComandaId !== null) {
    const c = mockComandas.find(x => x.id === pdvActiveComandaId);
    c.status = 'livre';
    c.cliente = '';
    syncMesasWithComanda(c.id, true);
    showToast(`Comanda ${pdvActiveComandaId} foi desbloqueada!`);
    switchCaixaTab('comandas', document.querySelector('.modal-tab:nth-child(2)'));
  }
}

function handlePDVSearch() {
  renderPDVProducts();
}

function pdvSelectCat(catNome) {
  pdvCurrentCat = catNome;
  pdvNavLevel = 'subcategorias';
  renderPDVProducts();
}

function pdvSelectSubcat(subcatNome) {
  pdvCurrentSubcat = subcatNome;
  pdvNavLevel = 'produtos';
  renderPDVProducts();
}

function pdvVoltar() {
  if (pdvNavLevel === 'produtos' && pdvCurrentSubcat !== null) {
    pdvNavLevel = 'subcategorias';
    pdvCurrentSubcat = null;
  } else if (pdvNavLevel === 'subcategorias' || (pdvNavLevel === 'produtos' && pdvCurrentSubcat === null)) {
    pdvNavLevel = 'categorias';
    pdvCurrentCat = null;
    pdvCurrentSubcat = null;
  }
  renderPDVProducts();
}

function buildProductCard(p) {
  return `
    <div style="background:var(--card-bg);border:1px solid var(--border-soft);border-radius:10px;padding:12px;cursor:pointer;transition:transform 0.2s, border-color 0.2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border-soft)'" onclick="addToCart('${p.id}')">
      <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px">${p.categoria}</div>
      <div style="font-weight:600;font-size:13px;margin-bottom:8px;height:36px;overflow:hidden">${p.nome}</div>
      <div style="font-size:14px;color:var(--accent);font-weight:700">R$ ${p.venda.toFixed(2)}</div>
    </div>
  `;
}

let currentPDVProd = null;
let currentPDVQtd = 1;

function addToCart(prodId) {
  const p = mockProducts.find(x => x.id === prodId);
  if(!p) return;
  currentPDVProd = p;
  currentPDVQtd = 1;
  document.getElementById('pdv-modal-qtd').textContent = '1';
  document.getElementById('pdv-modal-title').textContent = p.nome;
  document.getElementById('pdv-modal-price').textContent = `R$ ${p.venda.toFixed(2)}`;
  document.getElementById('pdv-modal-obs').value = '';
  
  const compContainer = document.getElementById('pdv-modal-compositions');
  let compHtml = '';
  
  const cat = mockCategorias.find(c => c.nome === p.categoria);
  const catGrupos = cat && cat.grupos ? cat.grupos : [];
  const prodGrupos = p.grupos || [];
  const allGrupos = [...new Set([...catGrupos, ...prodGrupos])];
  p._computedGrupos = allGrupos;
  
  if(allGrupos.length > 0) {
    allGrupos.forEach(gId => {
      const g = mockGruposComposicao.find(x => x.id === gId);
      if(g) {
        const minItens = g.obrigatorio ? 1 : 0;
        const maxItens = g.max_itens || 1;
        compHtml += `<div style="margin-top:16px;font-weight:600;font-size:13px;border-bottom:1px solid var(--border-soft);padding-bottom:4px;margin-bottom:8px" data-group-id="${g.id}" data-min="${minItens}" data-max="${maxItens}">${g.nome} <span style="color:var(--text-dim);font-weight:400;font-size:11px">(${minItens} a ${maxItens} itens)</span></div>`;
        g.itens.forEach(i => {
          if (maxItens === 1) {
            compHtml += `
              <label style="display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:13px;cursor:pointer">
                <input type="radio" class="comp-input" name="comp-${g.id}" value="${i.nome}" data-price="${i.preco || 0}" onchange="atualizarPrecoModalPDV()" />
                <span style="flex:1">${i.nome}</span>
                ${(i.preco || 0) > 0 ? `<span style="color:var(--accent)">+ R$ ${(i.preco || 0).toFixed(2)}</span>` : ''}
              </label>
            `;
          } else {
            compHtml += `
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:13px;">
                <div style="flex:1">
                  <div>${i.nome}</div>
                  ${(i.preco || 0) > 0 ? `<div style="color:var(--accent);font-size:11px">+ R$ ${(i.preco || 0).toFixed(2)}</div>` : ''}
                </div>
                <div style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,0.05);padding:2px;border-radius:6px">
                  <button class="btn btn-ghost" style="padding:0;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center" onclick="changeCompQtd(this, '${g.id}', ${maxItens}, -1)">-</button>
                  <input type="number" class="comp-input-qtd" name="comp-${g.id}" value="0" data-price="${i.preco || 0}" data-name="${i.nome}" style="width:24px;text-align:center;background:transparent;border:none;color:var(--text);font-weight:bold;-moz-appearance:textfield" readonly />
                  <button class="btn btn-ghost" style="padding:0;width:24px;height:24px;border-radius:4px;display:flex;align-items:center;justify-content:center" onclick="changeCompQtd(this, '${g.id}', ${maxItens}, 1)">+</button>
                </div>
              </div>
            `;
          }
        });
      }
    });
  }
  compContainer.innerHTML = compHtml;
  document.getElementById('pdv-modal-produto').classList.add('open');
  document.getElementById('pdv-modal-overlay').style.opacity = '1';
  document.getElementById('pdv-modal-overlay').style.pointerEvents = 'auto';
}

function fecharModalProdutoPDV() {
  document.getElementById('pdv-modal-produto').classList.remove('open');
  document.getElementById('pdv-modal-overlay').style.opacity = '0';
  document.getElementById('pdv-modal-overlay').style.pointerEvents = 'none';
  currentPDVProd = null;
}

function atualizarPrecoModalPDV() {
  if (!currentPDVProd) return;
  let priceExtra = 0;
  
  document.getElementById('pdv-modal-compositions').querySelectorAll('input').forEach(inp => {
    if (inp.type === 'radio' && inp.checked) {
      priceExtra += parseFloat(inp.getAttribute('data-price')) || 0;
    } else if (inp.type === 'number') {
      const v = parseInt(inp.value) || 0;
      if (v > 0) {
        priceExtra += (parseFloat(inp.getAttribute('data-price')) || 0) * v;
      }
    }
  });
  
  const unitPrice = currentPDVProd.venda + priceExtra;
  const total = unitPrice * currentPDVQtd;
  document.getElementById('pdv-modal-price').textContent = `R$ ${total.toFixed(2)}`;
}

function checkGroupLimit(el, groupId, maxItens) {
  if (maxItens <= 1) {
    atualizarPrecoModalPDV();
    return;
  }
  const checked = document.querySelectorAll(`input[name="comp-${groupId}"]:checked`);
  if (checked.length > maxItens) {
    el.checked = false;
    showToast(`Você pode escolher no máximo ${maxItens} opções.`, 'error');
  } else {
    atualizarPrecoModalPDV();
  }
}

function changeCompQtd(btn, groupId, maxItens, delta) {
  const input = btn.parentElement.querySelector('.comp-input-qtd');
  let currentVal = parseInt(input.value) || 0;
  
  if (delta > 0) {
    const allInputs = document.querySelectorAll(`input[name="comp-${groupId}"]`);
    let totalChecked = 0;
    allInputs.forEach(inp => {
      if (inp.type === 'radio' && inp.checked) totalChecked += 1;
      else if (inp.type === 'number') totalChecked += parseInt(inp.value) || 0;
    });
    
    if (totalChecked >= maxItens) {
      showToast(`Você pode escolher no máximo ${maxItens} opções neste grupo.`, 'error');
      return;
    }
  }
  
  currentVal += delta;
  if (currentVal < 0) currentVal = 0;
  input.value = currentVal;
  atualizarPrecoModalPDV();
}

function alterarQtdPDV(delta) {
  currentPDVQtd += delta;
  if(currentPDVQtd < 1) currentPDVQtd = 1;
  document.getElementById('pdv-modal-qtd').textContent = currentPDVQtd;
  atualizarPrecoModalPDV();
}

function confirmarProdutoPDV() {
  if(!currentPDVProd) return;
  
  let valid = true;
  const allGrupos = currentPDVProd._computedGrupos || [];
  if (allGrupos.length > 0) {
    allGrupos.forEach(gId => {
      const g = mockGruposComposicao.find(x => x.id === gId);
      if (g) {
        const minItens = g.obrigatorio ? 1 : 0;
        let count = 0;
        document.querySelectorAll(`input[name="comp-${g.id}"]`).forEach(inp => {
          if (inp.type === 'radio' && inp.checked) count += 1;
          else if (inp.type === 'number') count += parseInt(inp.value) || 0;
        });
        
        if (count < minItens) {
          showToast(`Selecione pelo menos ${minItens} opção em: ${g.nome}`, 'error');
          valid = false;
        }
      }
    });
  }
  if (!valid) return;
  
  const obs = document.getElementById('pdv-modal-obs').value.trim();
  let compText = [];
  let priceExtra = 0;
  
  document.getElementById('pdv-modal-compositions').querySelectorAll('input').forEach(inp => {
    if (inp.type === 'radio' && inp.checked) {
      compText.push(inp.value);
      priceExtra += parseFloat(inp.getAttribute('data-price')) || 0;
    } else if (inp.type === 'number') {
      const v = parseInt(inp.value) || 0;
      if (v > 0) {
        const name = inp.getAttribute('data-name');
        compText.push(`${v}x ${name}`);
        priceExtra += (parseFloat(inp.getAttribute('data-price')) || 0) * v;
      }
    }
  });
  
  const unitPrice = currentPDVProd.venda + priceExtra;
  
  const itemToAdd = {
    id: currentPDVProd.id,
    nome: currentPDVProd.nome,
    qtd: currentPDVQtd,
    preco: unitPrice,
    total: currentPDVQtd * unitPrice,
    obs: obs,
    composicoes: compText
  };
  
  if (pdvActiveComandaId !== null) {
    const c = mockComandas.find(x => x.id === pdvActiveComandaId);
    c.items.push(itemToAdd);
    c.total += itemToAdd.total;
  } else {
    cart.push(itemToAdd);
  }
  
  fecharModalProdutoPDV();
  renderCart();
  showToast('Adicionado ao carrinho!');
}

function renderCart() {
  localStorage.setItem('pdvCart', JSON.stringify(cart));
  if(pdvActiveComandaId !== null) localStorage.setItem('mockComandas', JSON.stringify(mockComandas));
  
  const container = document.getElementById('pdv-cart');
  const totalEl = document.getElementById('pdv-total');
  
  const activeCart = pdvActiveComandaId !== null 
    ? mockComandas.find(x => x.id === pdvActiveComandaId).items 
    : cart;
  
  if(activeCart.length === 0) {
    container.innerHTML = `<div class="empty-state" style="padding:40px 0"><p>Carrinho vazio</p></div>`;
    totalEl.textContent = 'R$ 0,00';
    return;
  }
  
  let html = '';
  let totalGeral = 0;
  
  activeCart.forEach((item, index) => {
    // Only sum unpaid items for the main total, or sum all but indicate paid?
    // Let's sum only unpaid for the "Total to Pay", and show paid ones distinctly.
    if(!item._pago) totalGeral += item.total;
    
    const comps = item.composicoes.length > 0 ? `<div style="font-size:10px;color:var(--text-dim);margin-top:2px">+ ${item.composicoes.join(', ')}</div>` : '';
    const obs = item.obs ? `<div style="font-size:10px;color:var(--accent);margin-top:2px">Obs: ${item.obs}</div>` : '';
    const isPago = item._pago;
    
    html += `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-bottom:16px;border-bottom:1px dashed var(--border-soft);opacity:${isPago ? '0.5' : '1'}">
        <div>
          <div style="font-weight:600;font-size:13px;${isPago ? 'text-decoration:line-through' : ''}">${item.qtd}x ${item.nome}</div>
          ${comps}
          ${obs}
          ${isPago ? `<div style="font-size:10px;color:var(--success);margin-top:4px;font-weight:600">✓ Pago</div>` : ''}
        </div>
        <div style="text-align:right">
          <div style="font-weight:600;color:var(--text);${isPago ? 'text-decoration:line-through' : ''}">R$ ${item.total.toFixed(2)}</div>
          ${!isPago ? `<button class="btn btn-ghost" style="padding:0;color:var(--danger);font-size:11px;margin-top:4px" onclick="removeFromCart(${index})">Remover</button>` : ''}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  totalEl.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

function removeFromCart(index) {
  if (pdvActiveComandaId !== null) {
    const c = mockComandas.find(x => x.id === pdvActiveComandaId);
    const item = c.items[index];
    c.total -= item.total;
    c.items.splice(index, 1);
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

function salvarItensComanda() {
  const c = mockComandas.find(x => x.id === pdvActiveComandaId);
  if (c) c.ultimaModificacao = new Date().toISOString();
  
  showToast(`Itens salvos na comanda ${pdvActiveComandaId}!`, 'success');
  const hasMesa = mockMesas.some(m => m.comandas.includes(pdvActiveComandaId));
  if(hasMesa) {
    switchCaixaTab('mesas', document.querySelector('.futuristic-tab:nth-child(3)'));
  } else {
    switchCaixaTab('comandas', document.querySelector('.futuristic-tab:nth-child(2)'));
  }
}

function syncMesasWithComanda(cmdId, isLivre) {
  mockMesas.forEach(m => {
    if (m.comandas.includes(cmdId)) {
      if (isLivre) {
        m.comandas = m.comandas.filter(id => id !== cmdId);
      }
      m.status = m.comandas.length > 0 ? 'em_uso' : 'livre';
    }
  });
}

function preFechamentoComanda() {
  showToast('Pré-fechamento impresso!');
}

function finalizarVendaDireta() {
  if (cart.length === 0) {
    showToast('O carrinho está vazio!', 'error');
    return;
  }
  
  if (window.pdvActiveDeliverySwapContext) {
    const ctx = window.pdvActiveDeliverySwapContext;
    let sourceArray = ctx.isManual ? (JSON.parse(localStorage.getItem('mockDeliveryManual')) || []) : mockDelivery;
    const d = sourceArray.find(x => x.id == ctx.deliveryId);
    
    if (d) {
      d.itens = JSON.parse(JSON.stringify(cart));
      d.subtotal = cart.reduce((acc, it) => acc + (it.preco * it.qtd), 0);
      d.total = d.subtotal + d.taxa;
      
      if (ctx.isManual) {
        localStorage.setItem('mockDeliveryManual', JSON.stringify(sourceArray));
        renderManualDelivery();
        navigateTo('vendas-delivery-manual');
      } else {
        localStorage.setItem('mockDelivery', JSON.stringify(sourceArray));
        renderPDVDelivery();
        navigateTo('vendas-delivery-ecommerce');
      }
      
      window.pdvActiveDeliverySwapContext = null;
      cart = [];
      renderCart();
      const titleEl = document.getElementById('pdv-cart-title');
      if(titleEl) titleEl.textContent = 'Nova Venda Direta';
      showToast('Pedido atualizado com sucesso!', 'success');
      return;
    }
  }
  
  if (window.pdvActiveDeliveryManualContext) {
    const subtotal = cart.reduce((acc, it) => acc + (it.preco * it.qtd), 0);
    const taxa = window.pdvActiveDeliveryManualContext.taxa || 0;
    const total = subtotal + taxa;
    
    let mockDeliveryManual = JSON.parse(localStorage.getItem('mockDeliveryManual')) || [];
    const novoPedido = {
      id: Math.floor(Math.random() * 90000) + 10000,
      tipo: taxa > 0 ? 'Entrega' : 'Retirada',
      status: 'preparo',
      hora: new Date().toISOString(),
      cliente: window.pdvActiveDeliveryManualContext.nome,
      telefone: window.pdvActiveDeliveryManualContext.telefone,
      endereco: window.pdvActiveDeliveryManualContext.endereco,
      itens: JSON.parse(JSON.stringify(cart)),
      subtotal: subtotal,
      taxa: taxa,
      total: total,
      pagamento: 'A Combinar',
      entregadorId: null
    };
    
    mockDeliveryManual.push(novoPedido);
    localStorage.setItem('mockDeliveryManual', JSON.stringify(mockDeliveryManual));
    
    window.pdvActiveDeliveryManualContext = null;
    cart = [];
    renderCart();
    
    const titleEl = document.getElementById('pdv-cart-title');
    if (titleEl) titleEl.textContent = 'Nova Venda Direta';
    
    showToast('Pedido manual criado com sucesso!', 'success');
    navigateTo('vendas-delivery-manual');
    return;
  }

  comandasParaRecebimento = []; // empty array means Venda Direta
  abrirModalRecebimento();
}

function finalizarComanda() {
  abrirModalAgruparComandas();
}

function abrirModalAgruparComandas() {
  const container = document.getElementById('agrupar-comandas-list');
  const outras = mockComandas.filter(c => c.status === 'em_uso' && c.id !== pdvActiveComandaId && c.items.length > 0);
  
  if (outras.length === 0) {
    comandasParaRecebimento = [pdvActiveComandaId];
    abrirModalRecebimento();
    return;
  }
  
  let html = '';
  outras.forEach(c => {
    html += `
      <label style="display:flex;align-items:center;gap:12px;background:var(--content-bg);padding:12px;border-radius:8px;border:1px solid var(--border-soft);cursor:pointer">
        <input type="checkbox" class="chk-agrupar" value="${c.id}" />
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px">Comanda ${c.id.toString().padStart(2, '0')}</div>
          <div style="font-size:12px;color:var(--text-dim)">${c.cliente || 'Sem nome'} - R$ ${c.total.toFixed(2)}</div>
        </div>
      </label>
    `;
  });
  
  container.innerHTML = html;
  document.getElementById('modal-agrupar-comandas').classList.add('open');
  document.getElementById('modal-agrupar-comandas-overlay').style.opacity = '1';
  document.getElementById('modal-agrupar-comandas-overlay').style.pointerEvents = 'auto';
}

function fecharModalAgruparComandas() {
  document.getElementById('modal-agrupar-comandas').classList.remove('open');
  document.getElementById('modal-agrupar-comandas-overlay').style.opacity = '0';
  document.getElementById('modal-agrupar-comandas-overlay').style.pointerEvents = 'none';
}

function pularAgrupamentoComandas() {
  fecharModalAgruparComandas();
  comandasParaRecebimento = [pdvActiveComandaId];
  abrirModalRecebimento();
}

function confirmarAgrupamentoComandas() {
  const selecionadas = Array.from(document.querySelectorAll('.chk-agrupar:checked')).map(el => parseInt(el.value));
  fecharModalAgruparComandas();
  comandasParaRecebimento = [pdvActiveComandaId, ...selecionadas];
  abrirModalRecebimento();
}

function abrirModalRecebimento() {
  const container = document.getElementById('recebimento-itens-list');
  const pagamentosContainer = document.getElementById('recebimento-formas-pagamento');
  
  itensParaRecebimento = [];
  if (comandasParaRecebimento.length > 0) {
    comandasParaRecebimento.forEach(cId => {
      const c = mockComandas.find(x => x.id === cId);
      if(c && c.items) {
        c.items.forEach((it, idx) => {
          if(!it._pago) {
            itensParaRecebimento.push({ ...it, originalComandaId: cId, originalIndex: idx });
          }
        });
      }
    });
  } else {
    // Venda Direta
    cart.forEach((it, idx) => {
      if(!it._pago) {
        itensParaRecebimento.push({ ...it, originalComandaId: null, originalIndex: idx });
      }
    });
  }
  
  let html = '';
  if (itensParaRecebimento.length === 0) {
    html = `<div style="text-align:center;color:var(--text-dim);font-size:13px;padding:20px">Nenhum item pendente para pagamento.</div>`;
    document.getElementById('btn-confirmar-recebimento').disabled = true;
  } else {
    itensParaRecebimento.forEach((it, i) => {
      html += `
        <label style="display:flex;justify-content:space-between;align-items:center;background:var(--content-bg);padding:12px;border-radius:8px;border:1px solid var(--border-soft);cursor:pointer">
          <div style="display:flex;align-items:center;gap:12px">
            <input type="checkbox" class="chk-item-receber" value="${i}" onchange="calcularRecebimento()" checked />
            <div>
              <div style="font-weight:600;font-size:13px">${it.qtd}x ${it.nome}</div>
              <div style="font-size:11px;color:var(--text-dim)">${it.originalComandaId ? 'Comanda ' + it.originalComandaId : 'Venda Direta'}</div>
            </div>
          </div>
          <div style="font-weight:600;color:var(--text)">R$ ${it.total.toFixed(2)}</div>
        </label>
      `;
    });
  }
  container.innerHTML = html;
  
  let pagHtml = '';
  mockPagamentos.filter(p => p.ativo).forEach(p => {
    pagHtml += `
      <label style="display:flex;align-items:center;gap:8px;background:var(--card-bg);padding:12px;border-radius:6px;border:1px solid var(--border-soft);cursor:pointer">
        <input type="radio" name="recebimento-forma" value="${p.id}" onchange="validarValorRecebimento()" />
        <span style="font-size:13px">${p.nome}</span>
      </label>
    `;
  });
  if(pagHtml === '') pagHtml = '<div style="font-size:12px;color:var(--danger)">Nenhuma forma de pagamento ativa.</div>';
  pagamentosContainer.innerHTML = pagHtml;
  
  const chkTodos = document.getElementById('chk-recebimento-todos');
  if(chkTodos) chkTodos.checked = true;
  
  document.getElementById('recebimento-dividir').value = 1;
  document.getElementById('modal-recebimento').classList.add('open');
  document.getElementById('modal-recebimento-overlay').style.opacity = '1';
  document.getElementById('modal-recebimento-overlay').style.pointerEvents = 'auto';
  
  calcularRecebimento();
}

function fecharModalRecebimento() {
  document.getElementById('modal-recebimento').classList.remove('open');
  document.getElementById('modal-recebimento-overlay').style.opacity = '0';
  document.getElementById('modal-recebimento-overlay').style.pointerEvents = 'none';
}

function toggleRecebimentoTodos(el) {
  const chks = document.querySelectorAll('.chk-item-receber');
  chks.forEach(c => c.checked = el.checked);
  calcularRecebimento();
}

let recebimentoAtualTotal = 0;
function calcularRecebimento() {
  const chks = document.querySelectorAll('.chk-item-receber:checked');
  let total = 0;
  chks.forEach(c => {
    const idx = parseInt(c.value);
    total += itensParaRecebimento[idx].total;
  });
  
  recebimentoAtualTotal = total;
  document.getElementById('recebimento-total-selecionado').textContent = `R$ ${total.toFixed(2)}`;
  
  const div = parseInt(document.getElementById('recebimento-dividir').value) || 1;
  const valDividido = total / div;
  document.getElementById('recebimento-valor-dividido').textContent = `R$ ${valDividido.toFixed(2)} por pessoa`;
  
  document.getElementById('recebimento-valor-pagar').value = valDividido.toFixed(2);
  
  let totalRestante = 0;
  if (comandasParaRecebimento.length > 0) {
    comandasParaRecebimento.forEach(cId => {
      const c = mockComandas.find(x => x.id === cId);
      if(c) {
        c.items.forEach(it => {
          if(!it._pago) totalRestante += it.total;
        });
      }
    });
  } else {
    cart.forEach(it => {
      if(!it._pago) totalRestante += it.total;
    });
  }
  document.getElementById('recebimento-total-restante').textContent = `R$ ${totalRestante.toFixed(2)}`;
  
  validarValorRecebimento();
}

function validarValorRecebimento() {
  const val = parseFloat(document.getElementById('recebimento-valor-pagar').value) || 0;
  const forma = document.querySelector('input[name="recebimento-forma"]:checked');
  const chks = document.querySelectorAll('.chk-item-receber:checked');
  
  const btnSalvar = document.getElementById('btn-salvar-pagamento');
  const btnConf = document.getElementById('btn-confirmar-recebimento');
  
  const trocoContainer = document.getElementById('recebimento-troco-container');
  if (forma) {
    const isDinheiro = forma.nextElementSibling.textContent.toLowerCase().includes('dinheiro');
    if (isDinheiro) {
      trocoContainer.style.display = 'block';
    } else {
      trocoContainer.style.display = 'none';
      document.getElementById('recebimento-valor-entregue').value = '';
      calcularTroco();
    }
  }
  
  if (val > 0 && forma) {
    btnSalvar.disabled = false;
    
    // Calcula o total pendente real para ver se isso fecha a comanda
    let pendenteReal = 0;
    if (comandasParaRecebimento.length > 0) {
      comandasParaRecebimento.forEach(cId => {
        const c = mockComandas.find(x => x.id === cId);
        if(c) {
          const somaItens = c.items.filter(i => !i._pago).reduce((acc, i) => acc + i.total, 0);
          const somaPag = (c.pagamentos || []).reduce((acc, p) => acc + p.valor, 0);
          pendenteReal += Math.max(0, somaItens - somaPag);
        }
      });
    } else {
      pendenteReal = cart.filter(i => !i._pago).reduce((acc, i) => acc + i.total, 0);
    }
    
    // Se o valor pago cobrir todo o pendente (ou mais), habilita o Finalizar
    if (val >= pendenteReal - 0.01) {
      btnConf.disabled = false;
    } else {
      btnConf.disabled = true;
    }
  } else {
    btnSalvar.disabled = true;
    btnConf.disabled = true;
  }
}

function calcularTroco() {
  const aReceber = parseFloat(document.getElementById('recebimento-valor-pagar').value) || 0;
  const entregue = parseFloat(document.getElementById('recebimento-valor-entregue').value) || 0;
  
  const troco = entregue - aReceber;
  const el = document.getElementById('recebimento-troco-valor');
  if (troco > 0) {
    el.textContent = `R$ ${troco.toFixed(2)}`;
  } else {
    el.textContent = `R$ 0,00`;
  }
}

function confirmarRecebimento(finalizar) {
  const val = parseFloat(document.getElementById('recebimento-valor-pagar').value) || 0;
  const formaId = parseInt(document.querySelector('input[name="recebimento-forma"]:checked').value);
  const formaObj = mockPagamentos.find(p => p.id === formaId);
  const pagador = document.getElementById('recebimento-nome-pagador').value.trim();
  
  const chks = document.querySelectorAll('.chk-item-receber:checked');
  const idxs = Array.from(chks).map(c => parseInt(c.value));
  
  // Marca os itens selecionados como pagos (opcionalmente feito pelo usuário)
  idxs.forEach(idx => {
    const tmpIt = itensParaRecebimento[idx];
    if (tmpIt.originalComandaId !== null) {
      const c = mockComandas.find(x => x.id === tmpIt.originalComandaId);
      if(c && c.items[tmpIt.originalIndex]) {
        c.items[tmpIt.originalIndex]._pago = true;
      }
    } else {
      if(cart[tmpIt.originalIndex]) {
        cart[tmpIt.originalIndex]._pago = true;
      }
    }
  });
  
  // Agora, salva o pagamento genérico no histórico, rateando o valor entre as comandas (para simplificar, colocamos tudo na primeira comanda, ou na comanda ativa se houver)
  const novoPagamento = {
    id: Date.now(),
    valor: val,
    forma: formaObj ? formaObj.nome : 'Desconhecida',
    responsavel: pagador,
    data: new Date().toISOString()
  };
  
  if (comandasParaRecebimento.length > 0) {
    // Registra o pagamento na comanda principal (pdvActiveComandaId)
    const principal = mockComandas.find(x => x.id === pdvActiveComandaId);
    if(principal) {
      if(!principal.pagamentos) principal.pagamentos = [];
      principal.pagamentos.push(novoPagamento);
    }
    
    comandasParaRecebimento.forEach(cId => {
      const c = mockComandas.find(x => x.id === cId);
      if(c) {
        let totalPend = 0;
        const somaItens = c.items.filter(i => !i._pago).reduce((acc, i) => acc + i.total, 0);
        const somaPag = (c.pagamentos || []).reduce((acc, p) => acc + p.valor, 0);
        totalPend = Math.max(0, somaItens - somaPag);
        
        if (finalizar || totalPend <= 0.01) {
          // Salva em mockVendas
          mockVendas.push({
            id: Date.now() + Math.random(),
            origem: 'comanda',
            total: c.total,
            itens: JSON.parse(JSON.stringify(c.items)),
            data: new Date().toISOString()
          });
          
          c.status = 'livre';
          c.cliente = '';
          c.telefone = '';
          c.cpf = '';
          c.abertaEm = null;
          c.ultimaModificacao = null;
          c.items = [];
          c.pagamentos = [];
          c.total = 0;
          syncMesasWithComanda(c.id, true);
        }
      }
    });
    
    localStorage.setItem('mockComandas', JSON.stringify(mockComandas));
    localStorage.setItem('mockVendas', JSON.stringify(mockVendas));
    renderDashboard();
    
    showToast(finalizar ? 'Comanda(s) finalizada(s)!' : 'Pagamento parcial registrado!', 'success');
    fecharModalRecebimento();
    renderPDVComandas();
    
    const curComanda = mockComandas.find(x => x.id === pdvActiveComandaId);
    if(curComanda && curComanda.status === 'livre') {
      // Force change to comandas tab
      pdvActiveComandaId = null;
      switchCaixaTab('comandas', document.querySelector('.futuristic-tab:nth-child(2)'));
    } else {
      abrirCarrinhoComanda(pdvActiveComandaId);
      renderCart();
    }
  } else {
    // Venda Direta / Balcao / Delivery
    const pendenteReal = cart.filter(i => !i._pago).reduce((acc, i) => acc + i.total, 0);
    if (finalizar || val >= pendenteReal - 0.01) {
      
      let origem = 'balcao';
      let del = null;
      if (pdvActiveDeliveryId !== null) {
        origem = 'delivery';
        del = mockDelivery.find(x => x.id === pdvActiveDeliveryId);
        if (del) del.status = 'finalizado';
        localStorage.setItem('mockDelivery', JSON.stringify(mockDelivery));
        renderPDVDelivery();
      }
      
      mockVendas.push({
        id: Date.now() + Math.random(),
        origem: origem,
        total: cart.reduce((acc, i) => acc + i.total, 0),
        itens: JSON.parse(JSON.stringify(cart)),
        data: new Date().toISOString()
      });
      localStorage.setItem('mockVendas', JSON.stringify(mockVendas));
      renderDashboard();
      
      cart = [];
      pdvActiveDeliveryId = null;
      showToast('Recebimento Venda processado!', 'success');
      switchCaixaTab('venda-direta', document.querySelector('.futuristic-tab:nth-child(1)'));
    } else {
      showToast('Pagamento parcial feito na venda. Faltam itens!', 'info');
    }
    localStorage.setItem('pdvCart', JSON.stringify(cart));
    fecharModalRecebimento();
    renderCart();
  }
}

function renderDashboard() {
  const hoje = new Date().toISOString().split('T')[0];
  const vendasHoje = mockVendas.filter(v => v.data.startsWith(hoje));
  
  const fat = vendasHoje.reduce((acc, v) => acc + v.total, 0);
  const ped = vendasHoje.length;
  const ticket = ped > 0 ? fat / ped : 0;
  
  const del = vendasHoje.filter(v => v.origem === 'delivery').reduce((acc, v) => acc + v.total, 0);
  const casa = vendasHoje.filter(v => v.origem !== 'delivery').reduce((acc, v) => acc + v.total, 0);
  
  const elFat = document.getElementById('kpi-fat');
  if(elFat) elFat.textContent = `R$ ${fat.toFixed(2)}`;
  
  const elPed = document.getElementById('kpi-ped');
  if(elPed) elPed.textContent = ped;
  
  const elTicket = document.getElementById('kpi-ticket');
  if(elTicket) elTicket.textContent = `R$ ${ticket.toFixed(2)}`;
  
  const elDel = document.getElementById('kpi-del');
  if(elDel) elDel.textContent = `R$ ${del.toFixed(2)}`;
  
  const elCasa = document.getElementById('kpi-casa');
  if(elCasa) elCasa.textContent = `R$ ${casa.toFixed(2)}`;
}

// --- CARDAPIO DIGITAL LOGIC ---
function renderCardapioConfig() {
  document.getElementById('f-cardapio-nome').value = cardapioConfig.nome || '';
  document.getElementById('f-cardapio-endereco').value = cardapioConfig.endereco || '';
  document.getElementById('f-cardapio-insta').value = cardapioConfig.instagram || '';
  document.getElementById('f-cardapio-wpp').value = cardapioConfig.whatsapp || '';
  document.getElementById('f-cardapio-minimo').value = cardapioConfig.pedidoMinimo || '';
  
  // Render diasHorarios
  const contDias = document.getElementById('f-cardapio-horarios-container');
  if (contDias) {
    let html = '';
    (cardapioConfig.diasHorarios || []).forEach((d, idx) => {
      html += `
        <div style="display:flex;align-items:center;gap:12px;background:var(--content-bg);padding:8px 12px;border-radius:8px;border:1px solid var(--border-soft)">
          <div style="width:100px;font-size:13px;font-weight:600">${d.dia}</div>
          <label class="tog" style="margin:0;transform:scale(0.8)">
            <input type="checkbox" id="chk-dia-${idx}" ${d.ativo ? 'checked' : ''} onchange="toggleDiaSemana(${idx})">
            <span class="tog-track"></span>
          </label>
          <div id="horarios-dia-${idx}" style="display:${d.ativo ? 'flex' : 'none'};gap:8px;align-items:center">
            <input type="time" id="abertura-dia-${idx}" class="form-input" style="padding:4px 8px;font-size:12px" value="${d.abertura}">
            <span style="font-size:12px;color:var(--text-dim)">até</span>
            <input type="time" id="fechamento-dia-${idx}" class="form-input" style="padding:4px 8px;font-size:12px" value="${d.fechamento}">
          </div>
          <div id="fechado-dia-${idx}" style="display:${d.ativo ? 'none' : 'block'};font-size:12px;color:var(--danger)">Fechado</div>
        </div>
      `;
    });
    contDias.innerHTML = html;
  }
  document.getElementById('f-cardapio-tempo-ent').value = cardapioConfig.tempoEntrega || '';
  document.getElementById('f-cardapio-tempo-ret').value = cardapioConfig.tempoRetirada || '';
  document.getElementById('f-cardapio-dominio').value = cardapioConfig.dominio || '';
  
  const servicos = cardapioConfig.servicos || { entrega: true, retirada: true };
  const chkEntrega = document.getElementById('f-cardapio-srv-entrega');
  const chkRetirada = document.getElementById('f-cardapio-srv-retirada');
  if(chkEntrega) chkEntrega.checked = servicos.entrega;
  if(chkRetirada) chkRetirada.checked = servicos.retirada;

  const tipo = cardapioConfig.tipoEntrega || 'raio';
  document.querySelector(`input[name="cardapio-tipo-entrega"][value="${tipo}"]`).checked = true;
  toggleCardapioTipoEntrega();
  
  renderRaiosCardapio();
  renderBairrosCardapio();
}

function toggleCardapioTipoEntrega() {
  const tipo = document.querySelector('input[name="cardapio-tipo-entrega"]:checked').value;
  if (tipo === 'raio') {
    document.getElementById('cardapio-entrega-raio').style.display = 'block';
    document.getElementById('cardapio-entrega-bairro').style.display = 'none';
  } else {
    document.getElementById('cardapio-entrega-raio').style.display = 'none';
    document.getElementById('cardapio-entrega-bairro').style.display = 'block';
  }
}

function renderRaiosCardapio() {
  const cont = document.getElementById('cardapio-raios-list');
  if(!cont) return;
  
  const raios = cardapioConfig.raioTiers || [];
  let html = '';
  raios.forEach((r, idx) => {
    html += `
      <div style="display:flex;gap:8px;align-items:center">
        <span style="font-size:12px">Até</span>
        <input type="number" class="form-input" style="flex:1;padding:6px;font-size:12px" value="${r.kmAte}" placeholder="KM" onchange="atualizarRaio(${idx}, 'kmAte', this.value)" />
        <span style="font-size:12px">km - R$</span>
        <input type="number" class="form-input" style="flex:1;padding:6px;font-size:12px" value="${r.taxa}" placeholder="Taxa" step="0.01" onchange="atualizarRaio(${idx}, 'taxa', this.value)" />
        <button class="btn btn-ghost" style="padding:4px 8px;color:var(--danger)" onclick="removerRaio(${idx})">🗑️</button>
      </div>
    `;
  });
  if(raios.length === 0) html = '<div style="font-size:12px;color:var(--text-dim)">Nenhuma faixa cadastrada.</div>';
  cont.innerHTML = html;
}

function atualizarRaio(idx, campo, valor) {
  cardapioConfig.raioTiers[idx][campo] = parseFloat(valor) || 0;
}

function removerRaio(idx) {
  cardapioConfig.raioTiers.splice(idx, 1);
  renderRaiosCardapio();
}

function adicionarRaioCardapio() {
  if(!cardapioConfig.raioTiers) cardapioConfig.raioTiers = [];
  cardapioConfig.raioTiers.push({ kmAte: 5, taxa: 5 });
  renderRaiosCardapio();
}

function renderBairrosCardapio() {
  const cont = document.getElementById('cardapio-bairros-list');
  if(!cont) return;
  
  const bairros = cardapioConfig.bairros || [];
  let html = '';
  bairros.forEach((b, idx) => {
    html += `
      <div style="display:flex;gap:8px;align-items:center">
        <input type="text" class="form-input" style="flex:2;padding:6px;font-size:12px" value="${b.nome}" placeholder="Nome do Bairro" onchange="atualizarBairro(${idx}, 'nome', this.value)" />
        <input type="number" class="form-input" style="flex:1;padding:6px;font-size:12px" value="${b.taxa}" placeholder="Taxa R$" step="0.01" onchange="atualizarBairro(${idx}, 'taxa', this.value)" />
        <button class="btn btn-ghost" style="padding:4px 8px;color:var(--danger)" onclick="removerBairro(${idx})">✕</button>
      </div>
    `;
  });
  if(bairros.length === 0) html = '<div style="font-size:12px;color:var(--text-dim)">Nenhum bairro cadastrado.</div>';
  cont.innerHTML = html;
}

function atualizarBairro(idx, campo, valor) {
  if(campo === 'taxa') cardapioConfig.bairros[idx][campo] = parseFloat(valor) || 0;
  else cardapioConfig.bairros[idx][campo] = valor;
}

function removerBairro(idx) {
  cardapioConfig.bairros.splice(idx, 1);
  renderBairrosCardapio();
}

function adicionarBairroCardapio() {
  if(!cardapioConfig.bairros) cardapioConfig.bairros = [];
  cardapioConfig.bairros.push({ nome: '', taxa: 0 });
  renderBairrosCardapio();
}

function toggleDiaSemana(idx) {
  const isChecked = document.getElementById(`chk-dia-${idx}`).checked;
  cardapioConfig.diasHorarios[idx].ativo = isChecked;
  document.getElementById(`horarios-dia-${idx}`).style.display = isChecked ? 'flex' : 'none';
  document.getElementById(`fechado-dia-${idx}`).style.display = isChecked ? 'none' : 'block';
}

function salvarConfigCardapio() {
  cardapioConfig.nome = document.getElementById('f-cardapio-nome').value;
  cardapioConfig.endereco = document.getElementById('f-cardapio-endereco').value;
  cardapioConfig.instagram = document.getElementById('f-cardapio-insta').value;
  cardapioConfig.whatsapp = document.getElementById('f-cardapio-wpp').value;
  cardapioConfig.pedidoMinimo = parseFloat(document.getElementById('f-cardapio-minimo').value) || 0;
  
  cardapioConfig.diasHorarios.forEach((d, idx) => {
    d.abertura = document.getElementById(`abertura-dia-${idx}`)?.value || d.abertura;
    d.fechamento = document.getElementById(`fechamento-dia-${idx}`)?.value || d.fechamento;
    d.ativo = document.getElementById(`chk-dia-${idx}`)?.checked || false;
  });

  cardapioConfig.tempoEntrega = document.getElementById('f-cardapio-tempo-ent').value;
  cardapioConfig.tempoRetirada = document.getElementById('f-cardapio-tempo-ret').value;
  cardapioConfig.dominio = document.getElementById('f-cardapio-dominio').value;
  
  cardapioConfig.tipoEntrega = document.querySelector('input[name="cardapio-tipo-entrega"]:checked').value;
  cardapioConfig.servicos = {
    entrega: document.getElementById('f-cardapio-srv-entrega')?.checked || false,
    retirada: document.getElementById('f-cardapio-srv-retirada')?.checked || false
  };
  
  localStorage.setItem('cardapioConfig', JSON.stringify(cardapioConfig));
  showToast('Configurações do Cardápio Digital salvas!', 'success');
}

// Sincronização em Tempo Real (outras abas)
window.addEventListener('storage', (e) => {
  if (e.key === 'mockDelivery') {
    mockDelivery = JSON.parse(e.newValue) || [];
    if (currentPage === 'vendas-caixa' && activeCaixaTab === 'delivery') {
      renderPDVDelivery();
    }
  }
});

if (document.readyState !== 'loading') {
  renderProducts();
  renderDashboard();
  renderCardapioConfig();
} else {
  document.addEventListener('DOMContentLoaded', () => { renderProducts(); renderDashboard(); renderCardapioConfig(); });
}

// a página padrão de conteúdo continua visível (dashboard)