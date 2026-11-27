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
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            currentModel = e.target.getAttribute('data-model');
            loadDashboard(currentModel);
        });
    });

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

    loadDashboard(currentModel);
    setInterval(() => loadDashboard(currentModel, true), 60000);
});

const STATUS = {
    normal:       { nome: 'Normal',       cor: '#10b981' },
    instavel:     { nome: 'Instável',     cor: '#eab308' },
    lenta:        { nome: 'Lentidão',     cor: '#f97316' },
    parada:       { nome: 'Parada',       cor: '#ef4444' },
    contingencia: { nome: 'Contingência', cor: '#3b82f6' },
};

function normalizarSituacao(sit) {
    const s = String(sit || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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

    fetch(`data/${model}.json?t=${Date.now()}`, { cache: 'no-store' })
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(data => {
            if (!data || !Array.isArray(data.estados) || !data.estados.length) throw new Error('Dados inválidos');
            updateUI(data);
            if (isRefresh) showToast('✅ Dados atualizados com sucesso!');
        })
        .catch(err => {
            console.warn('Usando dados simulados:', err);
            updateUI(generateDummyData());
            showToast('⚠️ Usando dados simulados (API indisponível)');
        })
        .finally(() => loading.classList.remove('active'));
}

function updateUI(data) {
    let countNormal = 0, countIssues = 0, countContingencia = 0;
    const tbody = document.getElementById('state-table-body');
    tbody.innerHTML = '';
    const now = (data.consultado_em ? new Date(data.consultado_em) : new Date()).toLocaleTimeString('pt-BR');

    [...data.estados].sort((a, b) => a.uf.localeCompare(b.uf)).forEach(est => {
        const uf = est.uf;
        const ms = est.tempo_medio ?? '-';
        const svc = !!est.svc_disponivel;
        const key = normalizarSituacao(est.situacao) || 'parada';
        const st = STATUS[key];

        if (key === 'normal') countNormal++;
        else if (key === 'contingencia') countContingencia++;
        else countIssues++;

        const stateEl = document.querySelector(`a[uf='${uf}']`);
        if (stateEl) {
            stateEl.setAttribute('data-ms', ms);
            stateEl.setAttribute('data-svc', svc ? 'Sim' : 'Não');
            stateEl.classList.toggle('pulse', key === 'parada' || key === 'lenta');
            stateEl.querySelectorAll('path').forEach(p => p.setAttribute('fill', st.cor));
        }

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
    setTimeout(() => toast.classList.remove('show'), 3000);
}

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
