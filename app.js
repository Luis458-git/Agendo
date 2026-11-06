/* ==========================================================================
   AGENDO - SISTEMA DE RESERVAS PARA BARBERÍAS
   LÓGICA DE NEGOCIO, ESTADO Y PANTALLAS
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. ESTADO CENTRAL DE LA APLICACIÓN
   -------------------------------------------------------------------------- */
const appState = {
  currentView: 'onboarding', // 'onboarding', 'public_client', 'viral_invite', 'valeria_panel'
  currentStep: 1,
  valeriaTab: 'compare', // 'compare', 'today', 'new'
  invitedBy: 'Barbería El Patrón (simulada)',
  business: {
    name: 'Barbería El Patrón (simulada)',
    whatsapp: '+54 9 11 2345-6789 (simulado)',
    slug: 'barberia-el-patron'
  },
  services: [
    { id: 1, name: 'Corte clásico', price: 10, enabled: true },
    { id: 2, name: 'Arreglo de barba', price: 8, enabled: true },
    { id: 3, name: 'Corte con barba', price: 15, enabled: true }
  ],
  schedule: {
    startTime: '09:00',
    endTime: '19:00',
    days: [
      { key: 'lun', short: 'Lun', full: 'Lunes', active: true },
      { key: 'mar', short: 'Mar', full: 'Martes', active: true },
      { key: 'mie', short: 'Mié', full: 'Miércoles', active: true },
      { key: 'jue', short: 'Jue', full: 'Jueves', active: true },
      { key: 'vie', short: 'Vie', full: 'Viernes', active: true },
      { key: 'sab', short: 'Sáb', full: 'Sábado', active: true },
      { key: 'dom', short: 'Dom', full: 'Domingo', active: false }
    ]
  },
  clientSelection: {
    selectedServiceId: 3,
    selectedDay: 'Hoy',
    selectedTime: '16:00',
    clientName: 'Carlos Gómez (cliente simulado)',
    clientPhone: '+54 9 11 9876-5432 (simulado)'
  },
  firstBookingSimulated: {
    clientName: 'Carlos Gómez (cliente simulado)',
    serviceName: 'Corte con barba',
    price: 15,
    time: 'Hoy a las 16:00 (simulado)'
  }
};

/* --------------------------------------------------------------------------
   DATOS DEL EMBUDO: HOY (OFICIAL DEL CASO) VS NUEVO (SUPUESTO SIMULADO)
   -------------------------------------------------------------------------- */
const funnelData = {
  today: {
    name: 'Hoy (Datos del caso)',
    trials: 100,
    steps: [
      { name: 'Inicio de onboarding', users: 100, stepConv: '100%', drop: 0, time: '0s', isMaxDrop: false },
      { name: 'Paso 1: Datos fiscales (primero)', users: 74, stepConv: '74.0%', drop: 26, time: '~4m 30s', isMaxDrop: false, note: 'Fuga masiva temprana (-26)' },
      { name: 'Paso 2: Datos del negocio', users: 70, stepConv: '94.6%', drop: 4, time: '~2m 00s', isMaxDrop: false },
      { name: 'Paso 3: Servicios (desde cero)', users: 65, stepConv: '92.9%', drop: 5, time: '~3m 15s', isMaxDrop: false },
      { name: 'Paso 4: Horarios (pantalla vacía)', users: 62, stepConv: '95.4%', drop: 3, time: '~2m 45s', isMaxDrop: false },
      { name: 'Paso 5: Comparten link día 1', users: 30, stepConv: '48.4%', drop: 32, time: 'Abandono / Postergación', isMaxDrop: true, note: '🚨 Mayor pérdida (-32 negocios / 51.6% de fuga)' }
    ],
    totalShared: 30,
    totalTime: '~12 min 30 s',
    majorDrop: 'Compartir el link (solo 30 de 62 lo hacen) y Datos fiscales al inicio (-26).'
  },
  future: {
    name: 'Nuevo Rediseño (Supuesto Simulado)',
    trials: 100,
    steps: [
      { name: 'Inicio de onboarding', users: 100, stepConv: '100%', drop: 0, time: '0s', isMaxDrop: false },
      { name: 'Paso 1: Promesa + WhatsApp (sin datos fiscales)', users: 92, stepConv: '92.0%', drop: 8, time: '~45s', isMaxDrop: false, note: '+18 negocios más respecto a Hoy' },
      { name: 'Paso 2: Servicios precargados ($8-$15)', users: 85, stepConv: '92.4%', drop: 7, time: '~40s', isMaxDrop: false },
      { name: 'Paso 3: Horarios precargados (plantilla)', users: 78, stepConv: '91.8%', drop: 7, time: '~35s', isMaxDrop: false },
      { name: 'Paso 4: ¡Link listo! + Enviar WhatsApp', users: 54, stepConv: '69.2%', drop: 24, time: '~20s', isMaxDrop: false, isSuccess: true, note: '🎯 Meta cumplida: 54 > 45 comparten día 1' },
      { name: 'Paso 5: Primera reserva simulada recibida', users: 49, stepConv: '90.7%', drop: 5, time: '~1m 00s', isMaxDrop: false, note: 'Momento clave de activación' }
    ],
    totalShared: 54,
    totalTime: '~2 min 20 s',
    majorDrop: 'Conversión a compartir en WhatsApp (pasa de 48% a 69% gracias al mensaje pre-escrito).'
  }
};

/* --------------------------------------------------------------------------
   2. PANTALLA 1: Promesa
   -------------------------------------------------------------------------- */
function renderScreen1() {
  appState.currentView = 'onboarding';
  appState.currentStep = 1;
  updateHeaderProgress('Paso 1 de 5: Datos de tu barbería', '20%');
  updateModeBar('👤 Vista Barbero: Onboarding', 'Ver Vista Cliente 👁️');

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  let invitedBanner = '';
  if (appState.invitedBy) {
    invitedBanner = `
      <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-sm); padding: 8px 12px; margin-bottom: 14px; font-size: 0.8rem; color: #fed7aa; display: flex; align-items: center; gap: 8px;">
        <span>🤝</span>
        <span>Invitación aplicada desde <strong>${escapeHtml(appState.invitedBy)}</strong>. ¡Bienvenido a Agendo!</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="fade-in">
      ${invitedBanner}
      <div class="section-badge">⚡ Listo en menos de 5 minutos</div>
      <h1 class="hero-title">Más clientes para tu barbería: tu página de reservas lista en 5 minutos</h1>
      <p class="hero-subtitle">
        Tus clientes reservan su turno directo por tu link, sin que tengas que pausar tu tijera para responder mensajes.
      </p>

      <div class="card">
        <div class="form-group">
          <label class="form-label" for="biz-name">¿Cómo se llama tu barbería o salón?</label>
          <div class="input-wrapper">
            <input 
              type="text" 
              id="biz-name" 
              class="form-input" 
              placeholder="Ejemplo simulado: Barbería El Patrón"
              value="${escapeHtml(appState.business.name)}"
              autocomplete="off"
            >
          </div>
          <div id="biz-name-error" class="error-text">Escribe el nombre de tu barbería para continuar.</div>
        </div>

        <div class="form-group">
          <label class="form-label" for="biz-whatsapp">WhatsApp para avisarte las reservas</label>
          <div class="input-wrapper">
            <input 
              type="tel" 
              id="biz-whatsapp" 
              class="form-input" 
              placeholder="WhatsApp simulado: +54 9 11 2345-6789"
              value="${escapeHtml(appState.business.whatsapp)}"
              autocomplete="off"
            >
          </div>
          <div class="input-hint">Te mandaremos un aviso simulado cuando un cliente reserve un turno.</div>
          <div id="biz-wa-error" class="error-text">Escribe tu número de WhatsApp para avisarte.</div>
        </div>
      </div>

      <div class="trust-box">
        <div class="trust-item">
          <span class="check">✓</span>
          <span><strong>Cero datos fiscales:</strong> aquí vienes a llenar tu sillón, no a hacer trámites.</span>
        </div>
        <div class="trust-item">
          <span class="check">✓</span>
          <span><strong>Sin tarjeta de crédito:</strong> 14 días de prueba gratis completa (simulado).</span>
        </div>
      </div>
    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-main" onclick="handleScreen1Next()">
      Continuar a Servicios →
    </button>
  `;

  const nameInput = document.getElementById('biz-name');
  const waInput = document.getElementById('biz-whatsapp');

  nameInput.addEventListener('input', (e) => {
    appState.business.name = e.target.value;
    appState.business.slug = createSlug(e.target.value);
    document.getElementById('biz-name-error').style.display = 'none';
  });

  waInput.addEventListener('input', (e) => {
    appState.business.whatsapp = e.target.value;
    document.getElementById('biz-wa-error').style.display = 'none';
  });
}

/* --------------------------------------------------------------------------
   3. PANTALLA 2: Servicios
   -------------------------------------------------------------------------- */
function renderScreen2() {
  appState.currentView = 'onboarding';
  appState.currentStep = 2;
  updateHeaderProgress('Paso 2 de 5: Tus servicios y precios', '40%');
  updateModeBar('👤 Vista Barbero: Onboarding', 'Ver Vista Cliente 👁️');

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  const servicesHtml = appState.services.map((svc) => {
    return `
      <div class="service-item ${svc.enabled ? '' : 'disabled'}" id="service-card-${svc.id}">
        <div class="service-header-row">
          <div class="service-title-area">
            <input 
              type="text" 
              class="service-name-input" 
              value="${escapeHtml(svc.name)}" 
              onchange="updateServiceName(${svc.id}, this.value)"
              placeholder="Nombre de servicio (simulado)"
            >
            <div class="service-status-pill">
              ${svc.enabled ? '✓ Activo en tu página de reservas' : '✕ Apagado (no se mostrará)'}
            </div>
          </div>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              ${svc.enabled ? 'checked' : ''} 
              onchange="toggleService(${svc.id}, this.checked)"
            >
            <span class="slider"></span>
          </label>
        </div>

        <div class="price-control-row">
          <span class="price-label-text">Precio del servicio:</span>
          <div class="price-stepper">
            <button 
              type="button" 
              class="step-btn" 
              onclick="changeServicePrice(${svc.id}, -1)" 
              ${!svc.enabled ? 'disabled' : ''}
              title="Bajar precio"
            >−</button>
            <div class="price-value-box" id="price-val-${svc.id}">
              $${svc.price} <span style="font-size: 0.65rem; color: var(--text-dim);">(simulado)</span>
            </div>
            <button 
              type="button" 
              class="step-btn" 
              onclick="changeServicePrice(${svc.id}, 1)" 
              ${!svc.enabled ? 'disabled' : ''}
              title="Subir precio"
            >+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="fade-in">
      <div class="section-badge">💈 Servicios preconfigurados</div>
      <h1 class="hero-title">Ajusta tus servicios y precios</h1>
      <p class="hero-subtitle">
        Cargamos los 3 cortes clásicos con precios entre $8 y $15 (simulado). Solo ajusta lo que cobras o apaga el que no hagas.
      </p>

      <div id="services-list">
        ${servicesHtml}
      </div>

      <button type="button" class="btn-add-service" onclick="addNewService()">
        <span>+</span> Agregar otro servicio
      </button>
    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderScreen1()">
      ← Atrás
    </button>
    <button class="btn-main" onclick="handleScreen2Next()">
      Continuar a Horarios →
    </button>
  `;
}

/* --------------------------------------------------------------------------
   4. PANTALLA 3: Horario
   -------------------------------------------------------------------------- */
function renderScreen3() {
  appState.currentView = 'onboarding';
  appState.currentStep = 3;
  updateHeaderProgress('Paso 3 de 5: Horario de atención', '60%');
  updateModeBar('👤 Vista Barbero: Onboarding', 'Ver Vista Cliente 👁️');

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  const daysHtml = appState.schedule.days.map((d) => {
    return `
      <div 
        class="day-chip ${d.active ? 'active' : ''}" 
        onclick="toggleDaySchedule('${d.key}')" 
        id="day-chip-${d.key}"
      >
        <span class="day-name">${d.short}</span>
        <span class="day-dot"></span>
      </div>
    `;
  }).join('');

  const hours = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ];

  const startOptions = hours.map(h => 
    `<option value="${h}" ${appState.schedule.startTime === h ? 'selected' : ''}>${h}</option>`
  ).join('');

  const endOptions = hours.map(h => 
    `<option value="${h}" ${appState.schedule.endTime === h ? 'selected' : ''}>${h}</option>`
  ).join('');

  const summaryText = buildScheduleSummaryText();

  container.innerHTML = `
    <div class="fade-in">
      <div class="section-badge">📅 Plantilla precargada lista</div>
      <h1 class="hero-title">¿Qué días y horas abres?</h1>
      <p class="hero-subtitle">
        Cargamos la plantilla típica de barbería (Lunes a Sábado, 9:00 a 19:00). Tócala para ajustarla a tu gusto con un solo toque.
      </p>

      <div class="template-banner">
        <span class="icon">✨</span>
        <p><strong>Plantilla simulada precargada:</strong> Nunca una pantalla vacía. Toca un día para abrirlo o cerrarlo.</p>
      </div>

      <div class="card">
        <span class="form-label">Días que atiendes en la barbería:</span>
        <div class="days-grid">
          ${daysHtml}
        </div>

        <div class="time-picker-row">
          <div class="time-box">
            <label for="start-time">Hora de apertura:</label>
            <select id="start-time" class="time-select" onchange="updateTimeRange()">
              ${startOptions}
            </select>
          </div>
          <div class="time-box">
            <label for="end-time">Hora de cierre:</label>
            <select id="end-time" class="time-select" onchange="updateTimeRange()">
              ${endOptions}
            </select>
          </div>
        </div>

        <div class="schedule-summary">
          <div class="summary-title">Resumen de tu horario (simulado):</div>
          <div class="summary-text" id="schedule-summary-text">${summaryText}</div>
        </div>
      </div>
    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderScreen2()">
      ← Atrás
    </button>
    <button class="btn-main" onclick="handleScreen3Next()">
      Ver mi página lista →
    </button>
  `;
}

/* --------------------------------------------------------------------------
   5. PANTALLA 4: «¡Tu página está lista!»
   -------------------------------------------------------------------------- */
function renderScreen4() {
  appState.currentView = 'onboarding';
  appState.currentStep = 4;
  updateHeaderProgress('Paso 4 de 5: Tu página de reservas', '80%');
  updateModeBar('👤 Vista Barbero: Onboarding', 'Abrir Vista Cliente 👁️');

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  const bizName = appState.business.name || 'Barbería El Patrón';
  const slug = appState.business.slug || 'barberia-el-patron';
  const simUrl = `agendo.app/${slug}`;
  const scheduleText = buildScheduleSummaryText();
  const activeServices = appState.services.filter(s => s.enabled);

  const previewRows = activeServices.slice(0, 3).map(s => `
    <div class="preview-svc-row">
      <span class="preview-svc-name">✂️ ${escapeHtml(s.name)}</span>
      <span class="preview-svc-price">$${s.price}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="fade-in">
      <div class="section-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.3);">
        🚀 Paso más destacado · Tu link público
      </div>
      <h1 class="hero-title">¡Tu página está lista!</h1>
      <p class="hero-subtitle">
        Tus clientes ya pueden ver tus cortes, tus precios y apartar turno directo desde su celular.
      </p>

      <div class="preview-phone-card" onclick="renderPublicBookingPage()" title="Toca para ver como cliente">
        <div class="preview-top-badge">
          <div class="preview-live-indicator">
            <span class="pulse-dot"></span>
            <span>Página activa (simulada) · Toca para abrir</span>
          </div>
          <span class="preview-url-pill">${simUrl}</span>
        </div>

        <div class="preview-biz-header">
          <div class="preview-biz-name">💈 ${escapeHtml(bizName)}</div>
          <div class="preview-biz-schedule">⏰ ${scheduleText}</div>
        </div>

        <div class="preview-services-list">
          ${previewRows}
        </div>

        <button type="button" class="preview-client-cta" onclick="event.stopPropagation(); renderPublicBookingPage();">
          <span>👁️ Probar página pública como cliente (simulado) →</span>
        </button>
      </div>

      <div class="share-section-title">
        <span>📢 Comparte tu link hoy mismo:</span>
      </div>

      <div class="share-action-grid">
        <button type="button" class="btn-share-whatsapp" onclick="handleShareWhatsApp()">
          <span style="font-size: 1.5rem; line-height: 1;">💬</span>
          <div>
            <div style="font-size: 1rem; font-weight: 800;">Enviar por WhatsApp</div>
            <div style="font-size: 0.76rem; opacity: 0.9; font-weight: 500;">Mensaje listo para tus clientes con tu link simulado</div>
          </div>
        </button>

        <button type="button" class="btn-share-instagram" onclick="handleCopyInstagram()">
          <span style="font-size: 1.4rem; line-height: 1;">📸</span>
          <div>
            <div style="font-size: 0.96rem; font-weight: 800;">Copiar para Instagram</div>
            <div style="font-size: 0.74rem; opacity: 0.9; font-weight: 500;">Pégalo en el link de tu biografía</div>
          </div>
        </button>
      </div>

      <div class="share-preview-box">
        <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">💬 Mensaje pre-escrito que recibirán:</div>
        <em>«¡Hola! Ya puedes reservar tu turno en <strong>${escapeHtml(bizName)}</strong> directo en nuestro link: <strong>https://${simUrl} (simulado)</strong>. Eliges el corte, la hora y listo. ¡Te esperamos en el sillón!»</em>
      </div>
    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderScreen3()">
      ← Atrás
    </button>
    <button class="btn-main" onclick="renderScreen5()">
      Ver primera reserva 🔔 →
    </button>
  `;
}

/* --------------------------------------------------------------------------
   6. PANTALLA 5: Primera reserva (simulada)
   -------------------------------------------------------------------------- */
function renderScreen5() {
  appState.currentView = 'onboarding';
  appState.currentStep = 5;
  updateHeaderProgress('Paso 5 de 5: Tu primera reserva', '100%');
  updateModeBar('👤 Vista Barbero: Onboarding', 'Ver Vista Cliente 👁️');

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  const bizName = appState.business.name || 'Barbería El Patrón';
  const booking = appState.firstBookingSimulated;
  const firstActiveSvc = appState.services.find(s => s.id === appState.clientSelection.selectedServiceId) 
                        || appState.services.find(s => s.enabled) 
                        || appState.services[0];

  container.innerHTML = `
    <div class="fade-in">
      
      <div class="success-celebration-hero">
        <div class="bell-icon-pulse">🔔</div>
        <div class="section-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.3);">
              🎉 ¡Momento clave de éxito!
        </div>
        <h1 class="hero-title" style="color: #6ee7b7;">¡Entró tu primera reserva!</h1>
        <p class="hero-subtitle" style="margin-bottom: 14px;">
          Un cliente acaba de reservar turno desde tu nuevo link mientras tú sigues en el sillón.
        </p>
      </div>

      <div class="booking-notification-card">
        <div class="notif-header-row">
          <span class="notif-tag">✓ Reserva confirmada (simulada)</span>
          <span class="notif-time-ago">Hace 1 minuto</span>
        </div>

        <div class="client-booking-details">
          <div class="client-avatar-row">
            <div class="client-avatar">🧔</div>
            <div class="client-info-text">
              <div class="client-name">${escapeHtml(booking.clientName)}</div>
              <div class="client-sub">Cliente que reservó por tu link (simulado)</div>
            </div>
          </div>

          <div class="booking-meta-grid">
            <div>
              <div class="meta-box-label">Servicio</div>
              <div class="meta-box-val">✂️ ${escapeHtml(firstActiveSvc.name)}</div>
            </div>
            <div>
              <div class="meta-box-label">Monto a cobrar</div>
              <div class="meta-box-val" style="color: var(--accent);">$${firstActiveSvc.price} (simulado)</div>
            </div>
            <div>
              <div class="meta-box-label">Día y Hora</div>
              <div class="meta-box-val">⏰ ${booking.time}</div>
            </div>
            <div>
              <div class="meta-box-label">Lugar</div>
              <div class="meta-box-val">💈 ${escapeHtml(bizName)}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="value-statement-card">
        <div class="value-statement-title">
          <span>⚡</span>
          <span>«Así se ve Agendo trabajando por ti»</span>
        </div>
        <p class="value-statement-desc">
          El cliente reservó solo, el turno quedó anotado en tu agenda y la confirmación le llegó a su WhatsApp sin que tuvieras que soltar las tijeras para escribir.
        </p>
      </div>

      <div class="soft-tax-card">
        <div class="soft-tax-icon">📋</div>
        <div class="soft-tax-body">
          <h4>Aviso pendiente: datos fiscales</h4>
          <p>
            No necesitas cargar nada ahora. <strong>Completa tus datos fiscales antes de que termine tu prueba de 14 días (simulada)</strong> para seguir cobrando con tarjeta.
          </p>
        </div>
      </div>

    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderPublicBookingPage()">
      👁️ Ver página pública
    </button>
    <button class="btn-main" onclick="handleSimulateAnother()">
      Ver otra reserva simulada 🔔
    </button>
  `;
}

/* --------------------------------------------------------------------------
   7. PÁGINA PÚBLICA DE RESERVAS (CLIENTE FINAL)
   -------------------------------------------------------------------------- */
function renderPublicBookingPage() {
  appState.currentView = 'public_client';
  updateModeBar('📱 Vista de Cliente Final', '← Volver al Onboarding');

  document.getElementById('progress-container').style.display = 'none';
  document.getElementById('step-label').textContent = 'Página pública de reservas (simulada)';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  const bizName = appState.business.name || 'Barbería El Patrón';
  const activeServices = appState.services.filter(s => s.enabled);
  const scheduleText = buildScheduleSummaryText();

  const servicesCardsHtml = activeServices.map(s => {
    const isSelected = s.id === appState.clientSelection.selectedServiceId;
    return `
      <div class="client-service-card ${isSelected ? 'selected' : ''}" onclick="selectClientService(${s.id})">
        <div class="client-service-left">
          <div class="custom-radio">
            <div class="custom-radio-dot"></div>
          </div>
          <div>
            <div class="client-service-title">${escapeHtml(s.name)}</div>
            <div class="client-service-time">⏱️ 35-45 min · Sillón profesional</div>
          </div>
        </div>
        <div class="client-service-price">$${s.price}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="fade-in">

      <div class="public-page-header">
        <div class="public-biz-badge">
          <span class="pulse-dot"></span>
          <span>Reservas online abiertas</span>
        </div>
        <h1 class="public-biz-name">💈 ${escapeHtml(bizName)}</h1>
        <div class="public-biz-meta">
          <span>⭐ 4.9 · 128 turnos atendidos (simulado)</span>
          <span>⏰ ${scheduleText}</span>
          <span>📍 Atención en local y por orden de cita</span>
        </div>
      </div>

      <div style="margin-bottom: 18px;">
        <span class="form-label">1. Elige tu corte o servicio:</span>
        ${servicesCardsHtml}
      </div>

      <div style="margin-bottom: 18px;">
        <span class="form-label">2. Horarios disponibles para hoy (simulado):</span>
        <div class="slot-chips-row">
          <div class="slot-chip ${appState.clientSelection.selectedTime === '10:00' ? 'selected' : ''}" onclick="selectClientTime('10:00')">10:00</div>
          <div class="slot-chip ${appState.clientSelection.selectedTime === '11:30' ? 'selected' : ''}" onclick="selectClientTime('11:30')">11:30</div>
          <div class="slot-chip ${appState.clientSelection.selectedTime === '16:00' ? 'selected' : ''}" onclick="selectClientTime('16:00')">16:00</div>
          <div class="slot-chip ${appState.clientSelection.selectedTime === '17:30' ? 'selected' : ''}" onclick="selectClientTime('17:30')">17:30</div>
          <div class="slot-chip ${appState.clientSelection.selectedTime === '19:00' ? 'selected' : ''}" onclick="selectClientTime('19:00')">19:00</div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 22px;">
        <div class="form-group">
          <label class="form-label" for="client-name-input">Tu nombre para el turno:</label>
          <input type="text" id="client-name-input" class="form-input" value="${escapeHtml(appState.clientSelection.clientName)}" onchange="appState.clientSelection.clientName = this.value">
        </div>
        <div class="form-group">
          <label class="form-label" for="client-phone-input">Tu WhatsApp para confirmarte:</label>
          <input type="tel" id="client-phone-input" class="form-input" value="${escapeHtml(appState.clientSelection.clientPhone)}" onchange="appState.clientSelection.clientPhone = this.value">
        </div>
      </div>

      <div class="agendo-badge-container">
        <button type="button" class="agendo-referral-badge" onclick="renderViralInviteScreen()">
          <span class="pole-mini"></span>
          <span>Reservado con <strong>Agendo</strong></span>
          <span class="badge-arrow">→</span>
        </button>
        <div class="badge-subtext">¿Tienes barbería? Toca la insignia para crear tu página gratis</div>
      </div>

    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderScreen4()">
      ← Volver al link
    </button>
    <button class="btn-main" onclick="handleConfirmClientBooking()">
      Confirmar mi turno (simulado) ✓
    </button>
  `;
}

/* --------------------------------------------------------------------------
   8. PANTALLA PARA OTROS BARBEROS (BUCLE VIRAL POR INVITACIÓN)
   -------------------------------------------------------------------------- */
function renderViralInviteScreen() {
  appState.currentView = 'viral_invite';
  updateModeBar('💈 Pantalla para Colegas Barberos', '← Volver a Vista Cliente');

  document.getElementById('progress-container').style.display = 'block';
  document.getElementById('step-label').textContent = 'Invitación para dueños de barberías';
  document.getElementById('progress-fill').style.width = '100%';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  const inviterBizName = appState.business.name || 'Barbería El Patrón';

  container.innerHTML = `
    <div class="fade-in">

      <div class="invite-screen-card">
        
        <div class="inviter-pill">
          <span>💈 Invitado por: <strong>${escapeHtml(inviterBizName)}</strong></span>
        </div>

        <h1 class="hero-title" style="font-size: 1.55rem; color: #fff;">
          ¿Tienes barbería? Crea tu página de reservas gratis en 5 minutos
        </h1>

        <p class="hero-subtitle" style="color: #fed7aa; margin-bottom: 16px;">
          Tu colega de <strong>${escapeHtml(inviterBizName)}</strong> ya no pierde tiempo respondiendo mensajes por WhatsApp: sus clientes eligen horario y reservan directo.
        </p>

        <div class="viral-perks-list">
          <div class="viral-perk-item">
            <span class="perk-icon">⚡</span>
            <div>
              <strong>Sin llamadas ni audios mientras cortas:</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Tus clientes reservan 24/7 sin interrumpir tu trabajo en el sillón.</div>
            </div>
          </div>

          <div class="viral-perk-item">
            <span class="perk-icon">📲</span>
            <div>
              <strong>Página de reservas lista en 5 minutos:</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Con tus cortes, tus precios entre $8 y $15 y tu horario de atención.</div>
            </div>
          </div>

          <div class="viral-perk-item">
            <span class="perk-icon">🎁</span>
            <div>
              <strong>Prueba gratis de 14 días (simulada):</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Cero tarjeta de crédito, sin datos fiscales y sin compromisos.</div>
            </div>
          </div>
        </div>

        <div style="background: rgba(0, 0, 0, 0.35); border-radius: var(--radius-sm); padding: 12px; font-size: 0.8rem; color: #cbd5e1; border-left: 3px solid var(--accent);">
          💡 <em>«Al tocar el botón de abajo comenzarás tu configuración en la Pantalla 1 con la recomendación de ${escapeHtml(inviterBizName)}».</em>
        </div>

      </div>

    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderPublicBookingPage()">
      ← Volver a ${escapeHtml(inviterBizName.split(' ')[0] || 'Barbería')}
    </button>
    <button class="btn-main" onclick="handleStartFromInvite()">
      Crear mi página gratis →
    </button>
  `;
}

/* --------------------------------------------------------------------------
   9. PANEL «PARA VALERIA»: EMBUDO COMPARATIVO (HOY VS NUEVO)
   -------------------------------------------------------------------------- */
function renderValeriaPanel(tab = 'compare') {
  appState.currentView = 'valeria_panel';
  appState.valeriaTab = tab;

  updateModeBar('📊 Panel Estratégico: Para Valeria', '← Volver al Prototipo');
  document.getElementById('progress-container').style.display = 'none';
  document.getElementById('step-label').textContent = 'Análisis de Conversión de Embudo (Simulado)';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const container = document.getElementById('screen-container');
  const bottomBar = document.getElementById('bottom-bar');

  // Renderizar contenido según la pestaña seleccionada
  let tabContentHtml = '';

  if (tab === 'compare') {
    tabContentHtml = renderFunnelComparisonView();
  } else if (tab === 'today') {
    tabContentHtml = renderFunnelSingleView(funnelData.today, 'bar-today', false);
  } else if (tab === 'new') {
    tabContentHtml = renderFunnelSingleView(funnelData.future, 'bar-new', true);
  }

  container.innerHTML = `
    <div class="fade-in">
      
      <!-- CABECERA PARA VALERIA -->
      <div class="valeria-header-card">
        <div class="valeria-badge-row">
          <span class="valeria-tag">📊 Para Valeria · Caso Agendo</span>
          <span class="simulado-alert-pill">DATOS SIMULADOS</span>
        </div>
        <h1 class="valeria-title">Embudo por Pantalla (cada 100 trials)</h1>
        <p class="valeria-desc">
          Auditoría de fuga entre «Hoy» (datos del caso) y la propuesta de «Nuevo Onboarding» (supuesto simulado con meta &gt;45 links compartidos).
        </p>
      </div>

      <!-- SELECTOR DE PESTAÑAS -->
      <div class="funnel-tabs">
        <button class="funnel-tab-btn ${tab === 'compare' ? 'active' : ''}" onclick="renderValeriaPanel('compare')">
          Comparativa Lado a Lado
        </button>
        <button class="funnel-tab-btn ${tab === 'today' ? 'active' : ''}" onclick="renderValeriaPanel('today')">
          Hoy (Caso)
        </button>
        <button class="funnel-tab-btn ${tab === 'new' ? 'active' : ''}" onclick="renderValeriaPanel('new')">
          Nuevo (Supuesto)
        </button>
      </div>

      <!-- CONTENIDO DEL EMBUDO -->
      ${tabContentHtml}

      <!-- VEREDICTO EJECUTIVO DE VALERIA -->
      <div class="executive-verdict-card">
        <div class="executive-verdict-title">
          <span>💡</span>
          <span>Hallazgos Clave para la Decisión de Valeria:</span>
        </div>
        <div class="executive-verdict-body">
          <ul style="padding-left: 18px; margin-top: 4px; display: flex; flex-direction: column; gap: 6px;">
            <li><strong>Cuello de botella en «Hoy»:</strong> El 51.6% de los que llegan al final se fugan antes de compartir el link (-32 negocios), agravado por perder 26 negocios al inicio pidiendo datos fiscales.</li>
            <li><strong>Efecto del rediseño «Nuevo»:</strong> Eliminar los datos fiscales y ofrecer el link de WhatsApp listo eleva la tasa de <strong>30 a 54 negocios que comparten el día 1 (supuesto simulado)</strong>.</li>
            <li><strong>Tiempo de valor:</strong> Se reduce de ~12m 30s a solo ~2m 20s, permitiendo al barbero experimentar la primera reserva simulada en menos de 5 minutos.</li>
          </ul>
        </div>
      </div>

    </div>
  `;

  bottomBar.innerHTML = `
    <button class="btn-secondary" onclick="renderScreen1()">
      ← Ir a Pantalla 1
    </button>
    <button class="btn-main" onclick="renderScreen4()">
      Ver pantalla del Link →
    </button>
  `;
}

function renderFunnelComparisonView() {
  const today = funnelData.today;
  const future = funnelData.future;

  return `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      
      <!-- RESUMEN KPI LADO A LADO -->
      <div class="card" style="padding: 14px; margin-bottom: 0;">
        <span class="form-label" style="margin-bottom: 10px;">Métricas Finales del Embudo (por cada 100 trials):</span>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          
          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-sm); padding: 10px; text-align: center;">
            <div style="font-size: 0.72rem; color: #fca5a5; font-weight: 700; text-transform: uppercase;">Hoy (Caso Real)</div>
            <div style="font-size: 1.6rem; font-weight: 900; color: #ef4444; margin: 2px 0;">30 / 100</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Comparten link día 1</div>
            <div style="font-size: 0.68rem; color: var(--text-dim); margin-top: 4px;">⏱️ ~12m 30s prom.</div>
          </div>

          <div style="background: rgba(16, 185, 129, 0.1); border: 1.5px solid var(--success); border-radius: var(--radius-sm); padding: 10px; text-align: center;">
            <div style="font-size: 0.72rem; color: #6ee7b7; font-weight: 700; text-transform: uppercase;">Nuevo (Supuesto Simulado)</div>
            <div style="font-size: 1.6rem; font-weight: 900; color: var(--success); margin: 2px 0;">54 / 100</div>
            <div style="font-size: 0.72rem; color: #a7f3d0; font-weight: 700;">+80% de mejora (&gt;45 meta)</div>
            <div style="font-size: 0.68rem; color: var(--text-dim); margin-top: 4px;">⏱️ ~2m 20s prom.</div>
          </div>

        </div>
      </div>

      <!-- COMPARATIVA PASO A PASO -->
      <div class="card" style="margin-bottom: 0;">
        <span class="form-label" style="margin-bottom: 8px;">Comparativa Pantalla a Pantalla:</span>
        
        <!-- PASO 1 -->
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 4px;">
            <span>1. Arranque del onboarding</span>
            <span>100 trials</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.74rem;">
            <div style="color: #fca5a5;">Hoy: Pide datos fiscales (Pasan 74 / -26 fuga)</div>
            <div style="color: #86efac; font-weight: 600;">Nuevo: Promesa sin datos fiscales (Pasan 92 / -8)</div>
          </div>
        </div>

        <!-- PASO 2 -->
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 4px;">
            <span>2. Configuración de servicios</span>
            <span>Precios y cortes</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.74rem;">
            <div style="color: #cbd5e1;">Hoy: Carga desde cero (Pasan 65 / fuga -5)</div>
            <div style="color: #86efac; font-weight: 600;">Nuevo: Precargados $8-$15 (Pasan 85 / fuga -7)</div>
          </div>
        </div>

        <!-- PASO 3 -->
        <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 10px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: #fff; margin-bottom: 4px;">
            <span>3. Horario de atención</span>
            <span>Disponibilidad</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.74rem;">
            <div style="color: #cbd5e1;">Hoy: Pantalla vacía (Pasan 62 / fuga -3)</div>
            <div style="color: #86efac; font-weight: 600;">Nuevo: Plantilla Lun-Sáb lista (Pasan 78 / fuga -7)</div>
          </div>
        </div>

        <!-- PASO 4 (MAYOR FUGA) -->
        <div style="background: rgba(239, 68, 68, 0.08); border: 1px dashed rgba(239, 68, 68, 0.4); border-radius: var(--radius-sm); padding: 8px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #f87171; margin-bottom: 4px;">
            <span>🚨 4. Compartir el link el Día 1 (Momento Clave)</span>
            <span>Meta &gt; 45</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.75rem;">
            <div style="color: #fca5a5; font-weight: 700;">Hoy: 30 de 100 (-32 fuga masiva)</div>
            <div style="color: var(--success); font-weight: 800;">Nuevo: 54 de 100 (supuesto simulado)</div>
          </div>
          <div style="font-size: 0.7rem; color: #d1d5db; margin-top: 4px;">
            Razón: El nuevo flujo entrega el mensaje redactado para WhatsApp con 1 solo toque.
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderFunnelSingleView(data, barClass, isNew) {
  const stepsHtml = data.steps.map((st, idx) => {
    const percentWidth = (st.users / 100) * 100;
    
    let highlightClass = '';
    if (st.isMaxDrop) highlightClass = 'highlight-drop';
    if (st.isSuccess) highlightClass = 'highlight-success';

    let dropLabel = '';
    if (idx > 0) {
      dropLabel = `Pérdida en este paso: -${st.drop} negocios`;
    }

    let warningBadge = '';
    if (st.isMaxDrop) {
      warningBadge = `<div class="drop-warning-tag">🚨 PASO CON MÁS PÉRDIDA: -${st.drop} negocios (${st.stepConv} de retención)</div>`;
    } else if (st.isSuccess) {
      warningBadge = `<div class="success-gain-tag">🎯 OBJETIVO ALCANZADO: ${st.users} de 100 comparten el link (Supuesto Simulado)</div>`;
    }

    return `
      <div class="funnel-step-card ${highlightClass}">
        <div class="funnel-step-top">
          <span class="funnel-step-name">${st.name}</span>
          <span class="funnel-step-count">${st.users} <span>/ 100</span></span>
        </div>

        <div class="funnel-bar-wrap">
          <div class="funnel-bar-fill ${barClass}" style="width: ${percentWidth}%;"></div>
        </div>

        <div class="funnel-metrics-row">
          <span class="metric-conversion">Pasan a la siguiente: ${st.stepConv}</span>
          ${idx > 0 ? `<span class="metric-drop">-${st.drop}</span>` : ''}
          <span class="metric-time">⏱️ ${st.time}</span>
        </div>

        ${st.note ? `<div style="font-size: 0.72rem; color: ${isNew ? '#a7f3d0' : '#fca5a5'}; margin-top: 4px; font-weight: 600;">• ${st.note}</div>` : ''}
        ${warningBadge}
      </div>
    `;
  }).join('');

  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.8rem; color: var(--text-muted);">
        <span>Datos base: <strong>100 trials</strong></span>
        <span>Tiempo total: <strong>${data.totalTime}</strong></span>
      </div>
      
      ${stepsHtml}

      <div style="margin-top: 10px; font-size: 0.74rem; color: var(--text-dim); text-align: center;">
        * Los datos de «Hoy» provienen del caso oficial. Los datos de «Nuevo» son supuestos simulados para la meta &gt;45.
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   10. FUNCIONES DE AYUDA Y MANEJADORES DE EVENTOS
   -------------------------------------------------------------------------- */
function updateHeaderProgress(labelText, progressPercent) {
  document.getElementById('progress-container').style.display = 'block';
  document.getElementById('step-label').textContent = labelText;
  document.getElementById('progress-fill').style.width = progressPercent;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateModeBar(title, buttonLabel) {
  document.getElementById('current-view-mode').textContent = title;
  document.getElementById('mode-switch-btn').textContent = buttonLabel;
}

function toggleContextView() {
  if (appState.currentView === 'valeria_panel') {
    renderScreen1();
  } else if (appState.currentView === 'public_client' || appState.currentView === 'viral_invite') {
    renderScreen4();
  } else {
    renderPublicBookingPage();
  }
}

function createSlug(name) {
  if (!name) return 'barberia-el-patron';
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'barberia-el-patron';
}

function handleScreen1Next() {
  const name = (appState.business.name || '').trim();
  const wa = (appState.business.whatsapp || '').trim();

  if (!name) {
    appState.business.name = 'Barbería El Patrón (simulada)';
    appState.business.slug = 'barberia-el-patron';
  }

  if (!wa) {
    appState.business.whatsapp = '+54 9 11 2345-6789 (simulado)';
  }

  renderScreen2();
}

function handleScreen2Next() {
  const activeCount = appState.services.filter(s => s.enabled).length;
  if (activeCount === 0) {
    showToast('⚠️ Deja al menos un servicio activo para continuar.');
    return;
  }
  renderScreen3();
}

function handleScreen3Next() {
  const activeDays = appState.schedule.days.filter(d => d.active).length;
  if (activeDays === 0) {
    showToast('⚠️ Selecciona al menos un día de atención.');
    return;
  }
  renderScreen4();
}

function handleShareWhatsApp() {
  const bizName = appState.business.name || 'Barbería El Patrón';
  const slug = appState.business.slug || 'barberia-el-patron';
  const simUrl = `https://agendo.app/${slug}`;
  const msg = `¡Hola! Ya puedes reservar tu turno en ${bizName} directamente desde nuestro nuevo link: ${simUrl} (link simulado). Eliges el servicio, tu hora favorita y listo. ¡Te esperamos!`;

  copyToClipboard(msg);
  showToast('💬 ¡Mensaje con link simulado copiado para WhatsApp!');
}

function handleCopyInstagram() {
  const slug = appState.business.slug || 'barberia-el-patron';
  const simUrl = `https://agendo.app/${slug} (link simulado)`;
  copyToClipboard(simUrl);
  showToast('📸 ¡Link simulado copiado para biografía de Instagram!');
}

function handleSimulateAnother() {
  const clientNames = [
    'Mateo Rossi (cliente simulado)',
    'Lucas Fernández (cliente simulado)',
    'Martín Silva (cliente simulado)',
    'Joaquín Romero (cliente simulado)'
  ];
  const hours = ['Mañana a las 10:30 (simulado)', 'Hoy a las 18:00 (simulado)', 'Sábado a las 11:00 (simulado)'];
  
  const randomName = clientNames[Math.floor(Math.random() * clientNames.length)];
  const randomHour = hours[Math.floor(Math.random() * hours.length)];
  
  appState.firstBookingSimulated.clientName = randomName;
  appState.firstBookingSimulated.time = randomHour;

  renderScreen5();
  showToast('🔔 ¡Otra reserva simulada recibida en tu sillón!');
}

function selectClientService(serviceId) {
  appState.clientSelection.selectedServiceId = serviceId;
  const chosen = appState.services.find(s => s.id === serviceId);
  if (chosen) {
    appState.firstBookingSimulated.serviceName = chosen.name;
    appState.firstBookingSimulated.price = chosen.price;
  }
  renderPublicBookingPage();
}

function selectClientTime(timeStr) {
  appState.clientSelection.selectedTime = timeStr;
  appState.firstBookingSimulated.time = `Hoy a las ${timeStr} (simulado)`;
  renderPublicBookingPage();
}

function handleConfirmClientBooking() {
  const nameInput = document.getElementById('client-name-input');
  if (nameInput && nameInput.value.trim()) {
    appState.firstBookingSimulated.clientName = nameInput.value.trim();
  }

  showToast('⚡ Procesando reserva como cliente...');
  setTimeout(() => {
    renderScreen5();
  }, 450);
}

function handleStartFromInvite() {
  appState.invitedBy = appState.business.name || 'Barbería El Patrón';
  appState.business.name = 'Barbería Nueva (simulada)';
  appState.business.whatsapp = '';
  showToast('🚀 ¡Iniciando tu prueba gratis con invitación de colega!');
  renderScreen1();
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

function showToast(text) {
  const toast = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');
  if (toast && toastText) {
    toastText.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* --------------------------------------------------------------------------
   11. ACCIONES DE SERVICIOS Y HORARIO
   -------------------------------------------------------------------------- */
function toggleService(id, isChecked) {
  const svc = appState.services.find(s => s.id === id);
  if (svc) {
    svc.enabled = isChecked;
    const card = document.getElementById(`service-card-${id}`);
    if (card) {
      if (isChecked) {
        card.classList.remove('disabled');
      } else {
        card.classList.add('disabled');
      }
      const statusPill = card.querySelector('.service-status-pill');
      if (statusPill) {
        statusPill.textContent = isChecked 
          ? '✓ Activo en tu página de reservas' 
          : '✕ Apagado (no se mostrará)';
      }
      const buttons = card.querySelectorAll('.step-btn');
      buttons.forEach(b => b.disabled = !isChecked);
    }
  }
}

function changeServicePrice(id, delta) {
  const svc = appState.services.find(s => s.id === id);
  if (svc && svc.enabled) {
    let newPrice = svc.price + delta;
    if (newPrice < 8) newPrice = 8;
    if (newPrice > 15) newPrice = 15;
    svc.price = newPrice;

    const valBox = document.getElementById(`price-val-${id}`);
    if (valBox) {
      valBox.innerHTML = `$${newPrice} <span style="font-size: 0.65rem; color: var(--text-dim);">(simulado)</span>`;
    }
  }
}

function updateServiceName(id, newName) {
  const svc = appState.services.find(s => s.id === id);
  if (svc) {
    svc.name = newName.trim() || 'Servicio sin nombre';
  }
}

function addNewService() {
  const nextId = appState.services.length + 1;
  const newSvc = {
    id: nextId,
    name: `Perfilado de cejas #${nextId} (simulado)`,
    price: 12,
    enabled: true
  };
  appState.services.push(newSvc);
  renderScreen2();
}

function toggleDaySchedule(dayKey) {
  const day = appState.schedule.days.find(d => d.key === dayKey);
  if (day) {
    day.active = !day.active;
    const chip = document.getElementById(`day-chip-${dayKey}`);
    if (chip) {
      chip.classList.toggle('active', day.active);
    }
    updateScheduleSummaryDisplay();
  }
}

function updateTimeRange() {
  const start = document.getElementById('start-time').value;
  const end = document.getElementById('end-time').value;
  appState.schedule.startTime = start;
  appState.schedule.endTime = end;
  updateScheduleSummaryDisplay();
}

function buildScheduleSummaryText() {
  const activeDays = appState.schedule.days.filter(d => d.active);
  if (activeDays.length === 0) {
    return 'Sin días seleccionados (cerrado)';
  }
  
  const dayNames = activeDays.map(d => d.short).join(', ');
  return `${dayNames} · ${appState.schedule.startTime} a ${appState.schedule.endTime} (simulado)`;
}

function updateScheduleSummaryDisplay() {
  const summaryEl = document.getElementById('schedule-summary-text');
  if (summaryEl) {
    summaryEl.textContent = buildScheduleSummaryText();
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* --------------------------------------------------------------------------
   12. INICIALIZACIÓN
   -------------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  renderScreen1();
});
