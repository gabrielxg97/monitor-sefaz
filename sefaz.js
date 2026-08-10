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
            document.getElementById('api-url').textContent = `https://integranotas.com.br/doc/sefaz/monitor/${currentModel}`;
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

function rgb2hex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
}

function getStatusName(color) {
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return 'Desconhecido';
    const r = parseInt(match[1]), g = parseInt(match[2]), b = parseInt(match[3]);
    
    // Blue = Contingência (high blue, low red)
    if (b > 180 && r < 100) return 'Contingência';
    // Green = Normal (high green, low red)
    if (g > 150 && r < 100) return 'Normal';
    // Yellow = Instável (high red + green, low blue)
    if (r > 200 && g > 150 && b < 80) return 'Instável';
    // Orange = Lentidão (high red, medium green)
    if (r > 200 && g > 80 && g < 160 && b < 80) return 'Lentidão';
    // Red = Parada (high red, low green)
    if (r > 180 && g < 100) return 'Parada';
    
    return 'Desconhecido';
}

function loadDashboard(model, isRefresh = false) {
    const loading = document.getElementById('loading');
    loading.classList.add('active');

    const apiUrl = `https://integranotas.com.br/doc/sefaz/monitor/${model}`;
    const headers = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    };
    
    // Validate response has the expected structure
    function validate(data) {
        if (data && data.dados && data.dados.labels && data.dados.labels.length > 0) return data;
        throw new Error('Invalid data structure');
    }

    const strategies = [
        // Strategy 1: Direct fetch with required headers
        () => fetch(apiUrl, { headers }).then(r => { if (!r.ok) throw new Error('Direct failed'); return r.json(); }).then(validate),
        // Strategy 2: CORS proxy via corsproxy.io
        () => fetch(`https://corsproxy.io/?${encodeURIComponent(apiUrl)}`, { headers }).then(r => { if (!r.ok) throw new Error('Proxy 1 failed'); return r.json(); }).then(validate),
        // Strategy 3: CORS proxy via allorigins (wraps response)
        () => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`).then(r => { if (!r.ok) throw new Error('Proxy 2 failed'); return r.json(); }).then(d => JSON.parse(d.contents)).then(validate),
    ];

    tryStrategies(strategies, 0)
        .then(data => {
            updateUI(data);
            if (isRefresh) showToast('✅ Dados atualizados com sucesso!');
        })
        .catch(err => {
            console.warn('Todas as estratégias falharam, usando dados simulados:', err);
            updateUI(generateDummyData());
            showToast('⚠️ Usando dados simulados (CORS bloqueado)');
        })
        .finally(() => {
            loading.classList.remove('active');
        });
}

function tryStrategies(strategies, index) {
    if (index >= strategies.length) return Promise.reject(new Error('All strategies failed'));
    return strategies[index]().catch(() => tryStrategies(strategies, index + 1));
}

function updateUI(data) {
    let countNormal = 0;
    let countIssues = 0;
    let countContingencia = 0;
    
    const tbody = document.getElementById('state-table-body');
    tbody.innerHTML = '';
    
    const now = new Date().toLocaleTimeString('pt-BR');

    for (let i = 0; i < 27; i++) {
        const ms = data.dados.data[i];
        const uf = data.dados.labels[i];
        const bg = data.dados.backgroundColor[i];
        const normal = data.dados.normal[i];
        const svc = data.dados.svc[i];
        
        let color = bg;
        if (normal == 0 && svc == 1) {
            color = 'rgb(47, 85, 212)'; // Blue for contingency
        }

        // Stats calculation
        if (normal == 1) countNormal++;
        else if (svc == 1) countContingencia++;
        else countIssues++;

        // Update SVG
        const stateEl = document.querySelector(`a[uf='${uf}']`);
        if (stateEl) {
            stateEl.setAttribute('data-ms', ms);
            stateEl.setAttribute('data-svc', svc == 1 ? 'Sim' : 'Não');
            
            // Add pulse if issue
            if (normal == 0 && svc == 0) {
                stateEl.classList.add('pulse');
            } else {
                stateEl.classList.remove('pulse');
            }

            stateEl.querySelectorAll('path').forEach(p => {
                p.setAttribute('fill', rgb2hex(color));
            });
        }
        
        // Update Table
        const hexColor = rgb2hex(color);
        const statusName = getStatusName(color);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${uf}</strong></td>
            <td>${stateNames[uf] || uf}</td>
            <td>${ms}s</td>
            <td><span class="badge" style="background-color: ${hexColor}; color: ${hexColor === '#eab308' ? '#000' : '#fff'}">${statusName}</span></td>
            <td>${svc == 1 ? 'Sim' : 'Não'}</td>
            <td style="color: var(--text-secondary)">${now}</td>
        `;
        tbody.appendChild(tr);
    }
    
    // Update Stats
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

// Fallback data generator if API is blocked by CORS
function generateDummyData() {
    const ufs = Object.keys(stateNames);
    const data = { dados: { data: [], labels: [], backgroundColor: [], normal: [], svc: [] } };
    
    ufs.forEach(uf => {
        data.dados.labels.push(uf);
        const rand = Math.random();
        
        if (rand > 0.8) {
            // Issue
            data.dados.data.push((Math.random() * 5 + 2).toFixed(2));
            data.dados.backgroundColor.push('rgb(239, 68, 68)'); // Parada
            data.dados.normal.push(0);
            data.dados.svc.push(0);
        } else if (rand > 0.6) {
            // Contingency
            data.dados.data.push((Math.random() * 1 + 0.5).toFixed(2));
            data.dados.backgroundColor.push('rgb(249, 115, 22)'); // Actually it's overridden by blue if svc=1
            data.dados.normal.push(0);
            data.dados.svc.push(1);
        } else {
            // Normal
            data.dados.data.push((Math.random() * 0.5 + 0.1).toFixed(2));
            data.dados.backgroundColor.push('rgb(16, 185, 129)');
            data.dados.normal.push(1);
            data.dados.svc.push(0);
        }
    });
    
    return data;
}
