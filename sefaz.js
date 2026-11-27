let currentModel = 'nfe';
const stateNames = {
    'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas', 'BA': 'Bahia',
    'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo', 'GO': 'Goiás',
    'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul', 'MG': 'Minas Gerais',
    'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná', 'PE': 'Pernambuco', 'PI': 'Piauí',
    'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte', 'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina', 'SP': 'São Paulo',
    'SE': 'Sergipe', 'TO': 'Tocantins'
};

document.addEventListener('DOMContentLoaded', () => {
    // Setup Tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentModel = e.target.getAttribute('data-model');
            document.getElementById('api-url').textContent = `${API_BASE}/${currentModel}`;
            loadDashboard(currentModel);
        });
    });

    // Copy API URL
    document.getElementById('copy-btn').addEventListener('click', () => {
        const text = document.getElementById('api-url').textContent;
        navigator.clipboard.writeText(text).then(() => {
            showToast('URL copiada para a área de transferência!');
        });
    });

    // Setup Hover on Map
    const estados = document.querySelectorAll('.estado');
    estados.forEach(est => {
        est.addEventListener('mouseenter', (e) => {
            const el = e.currentTarget;
            document.getElementById('detail-title').textContent = el.getAttribute('name');
            document.getElementById('detail-uf').textContent = el.getAttribute('uf');
            
            const ms = el.getAttribute('data-ms');
            const svc = el.getAttribute('data-svc');
            
            document.getElementById('detail-ms').textContent = ms ? `${ms}s` : 'Carregando...';
            document.getElementById('detail-svc').textContent = svc || 'Carregando...';
        });
        
        est.addEventListener('mouseleave', () => {
            document.getElementById('detail-title').textContent = 'Passe o mouse num estado';
            document.getElementById('detail-uf').textContent = '-';
            document.getElementById('detail-ms').textContent = '-';
            document.getElementById('detail-svc').textContent = '-';
        });
    });

    // Initial load
    loadDashboard(currentModel);

    // Auto-refresh every 60s
    setInterval(() => {
        loadDashboard(currentModel, true);
    }, 60000);
});

const API_BASE = 'https://integranotas.com.br/api/sefaz';

const STATUS = {
    normal:       { nome: 'Normal',       cor: '#10b981' },
    instavel:     { nome: 'Instável',     cor: '#eab308' },
    lenta:        { nome: 'Lentidão',     cor: '#f97316' },
    parada:       { nome: 'Parada',       cor: '#ef4444' },
    contingencia: { nome: 'Contingência', cor: '#3b82f6' },
};

// Normaliza o texto de "situacao" vindo da API (ex.: "instável", "lentidao", "SVC")
function normalizarSituacao(sit) {
    const s = String(sit || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    if (s.startsWith('normal')) return 'normal';
    if (s.startsWith('instav')) return 'instavel';
    if (s.startsWith('lent')) return 'lenta';
    if (s.startsWith('parad') || s.startsWith('fora') || s.startsWith('offline')) return 'parada';
    if (s.startsWith('conting') || s === 'svc') return 'contingencia';
    return null;
}

function loadDashboard(model, isRefresh = false) {
    const loading = document.getElementById('loading');
    loading.classList.add('active');

    const apiUrl = `${API_BASE}/${model}`;

    function validate(data) {
        if (data && Array.isArray(data.estados) && data.estados.length > 0) return data;
        throw new Error('Estrutura de dados inválida');
    }
    function getJson(url) {
        return fetch(url, { cache: 'no-store' }).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status} em ${url}`);
            return r.json();
        }).then(validate);
    }

    const strategies = [
        // 1) JSON gerado pelo GitHub Actions no próprio site (mesma origem, sem CORS)
        () => getJson(`data/${model}.json?t=${Date.now()}`),
        // 2) Chamada direta (funciona se a IntegraNotas liberar CORS no futuro)
        () => getJson(apiUrl),
    ];

    tryStrategies(strategies, 0)
        .then(data => {
            updateUI(data);
            if (isRefresh) showToast('✅ Dados atualizados com sucesso!');
        })
        .catch(err => {
            console.warn('Não foi possível obter dados reais, usando simulados:', err);
            updateUI(generateDummyData());
            showToast('⚠️ Usando dados simulados (API indisponível)');
        })
        .finally(() => {
            loading.classList.remove('active');
        });
}

function tryStrategies(strategies, index) {
    if (index >= strategies.length) return Promise.reject(new Error('Todas as estratégias falharam'));
    return strategies[index]().catch(err => {
        console.warn(err.message);
        return tryStrategies(strategies, index + 1);
    });
}

function updateUI(data) {
    let countNormal = 0;
    let countIssues = 0;
    let countContingencia = 0;

    const tbody = document.getElementById('state-table-body');
    tbody.innerHTML = '';

    const horario = data.consultado_em ? new Date(data.consultado_em) : new Date();
    const now = horario.toLocaleTimeString('pt-BR');

    const estados = [...data.estados].sort((a, b) => a.uf.localeCompare(b.uf));

    estados.forEach(est => {
        const uf = est.uf;
        const ms = est.tempo_medio ?? '-';
        const svc = !!est.svc_disponivel;
        let key = normalizarSituacao(est.situacao) || 'parada';
        const st = STATUS[key];

        if (key === 'normal') countNormal++;
        else if (key === 'contingencia') countContingencia++;
        else countIssues++;

        // Mapa
        const stateEl = document.querySelector(`a[uf='${uf}']`);
        if (stateEl) {
            stateEl.setAttribute('data-ms', ms);
            stateEl.setAttribute('data-svc', svc ? 'Sim' : 'Não');
            stateEl.classList.toggle('pulse', key === 'parada' || key === 'lenta');
            stateEl.querySelectorAll('path').forEach(p => p.setAttribute('fill', st.cor));
        }

        // Tabela
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${uf}</strong></td>
            <td>${stateNames[uf] || uf}</td>
            <td>${ms}s</td>
            <td><span class="badge" style="background-color: ${st.cor}; color: ${key === 'instavel' ? '#000' : '#fff'}">${st.nome}</span></td>
            <td>${svc ? 'Sim' : 'Não'}</td>
            <td style="color: var(--text-secondary)">${now}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('stat-normal').textContent = countNormal;
    document.getElementById('stat-issues').textContent = countIssues;
    document.getElementById('stat-contingencia').textContent = countContingencia;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Gerador de dados simulados (usado só se a API falhar)
function generateDummyData() {
    const estados = Object.keys(stateNames).map(uf => {
        const r = Math.random();
        if (r > 0.9) return { uf, situacao: 'parada', tempo_medio: 0, svc_disponivel: false };
        if (r > 0.8) return { uf, situacao: 'lenta', tempo_medio: 6, svc_disponivel: false };
        if (r > 0.7) return { uf, situacao: 'instavel', tempo_medio: 3, svc_disponivel: false };
        return { uf, situacao: 'normal', tempo_medio: 1, svc_disponivel: false };
    });
    return { consultado_em: new Date().toISOString(), estados };
}
