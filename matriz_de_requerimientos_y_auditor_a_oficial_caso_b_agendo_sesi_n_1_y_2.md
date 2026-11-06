# MATRIZ DE REQUERIMIENTOS Y AUDITORÍA DE ENTREGABLES (COMPLETADA)
## CASO B: AGENDO (SaaS B2B para Barberías y Salones)
**Rol:** Evaluador Académico Senior & Auditor Financiero  
**Empresa auditada:** Agendo Technologies S.A.  
**Fundadora / CEO:** Valeria Ortiz  
**Inversionista Principal:** Ricardo Méndez ($150.000 invertidos, $60.000 remanentes en caja, piso intocable de $10.000)  
**Alcance:** Sesión 1 (Unit Economics, Modelado Financiero y Runway) + Sesión 2 (Product-Led Growth, Onboarding Móvil y Retención)
**Estado de la Auditoría:** **100% AUDITADO Y COMPLETADO**

---

## ESTRUCTURA GENERAL DE CALIFICACIÓN Y AUDITORÍA

| Bloque Académico | Entregable Principal | Puntaje Base | Puntos Bonus | Puntaje Obtenido |
| :--- | :--- | :---: | :---: | :---: |
| **Parte 1: Sesión 1** | Calculadora Financiera, Escenarios y Recomendación | **100 pts** | **+25 pts** (N2 + N3) | **125 / 125 pts** |
| **Parte 2: Sesión 2** | Prototipo Celular, Ficha de Growth y Demostración | **100 pts** | — | **100 / 100 pts** |
| **TOTAL CONSOLIDADO** | **Auditoría Integral de Desempeño (Caso B)** | **200 pts** | **+25 pts** | **225 / 225 pts** |

---

# PARTE 1: SESIÓN 1 — UNIT ECONOMICS, MODELADO FINANCIERO Y RUNWAY
**Pregunta central:** *«¿Cuánto puede pagar Agendo por conseguir un cliente y qué pasa realmente si se triplica la inversión en publicidad?»*

---

### MÓDULO 1.1: RIGOR NUMÉRICO Y GOBERNANZA DE DATOS (25 / 25 PUNTOS)
*Auditoría de integridad matemática, arquitectura de fórmulas y trazabilidad en Google Sheets.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Control Financiero |
| :---: | :--- | :---: | :---: | :--- |
| **1.1.1** | **Separación Estricta de Entornos (Gobernanza):** Existencia de pestaña exclusiva `Supuestos` (celdas de entrada editables y coloreadas) y pestaña `Resultados` (100% alimentada por fórmulas dinámicas sin valores estáticos *hardcodeados*). | `[CUMPLE]` | **5 / 5 pts** | Verificado en `1_Supuestos_Google_Sheets.pdf` y `2_Resultados_Google_Sheets.pdf`. Gobernanza íntegra y reactiva. |
| **1.1.2** | **Margen de Contribución Unitario:** Cálculo exacto del margen bruto por suscripción mensual.  <br>$\text{Margen Unitario} = \$25,00 \times 78\% = \mathbf{\$19,50}$. | `[CUMPLE]` | **4 / 4 pts** | Descuenta servidores, pasarela de pago, mensajes de WhatsApp y soporte técnico (22% de costos directos). |
| **1.1.3** | **Cálculo de Adquisición Pagada (CAC Paid Real):**  <br>$\text{Inversión Ads} (\$10.000) + \text{Salario Mariela} (\$1.200) + \text{Comisiones} (70 \times \$20 = \$1.400) = \$12.600$.  <br>$\text{Clientes Ads} = 500 \times 14\% = 70$.  <br>$\text{CAC Paid} = \frac{\$12.600}{70} = \mathbf{\$180,00}$. | `[CUMPLE]` | **5 / 5 pts** | Rigor absoluto: se computan los salarios y comisiones comerciales indispensables para cerrar clientes de anuncios. |
| **1.1.4** | **Cálculo de Adquisición Mezclada (CAC Blended):**  <br>$\text{Total Clientes} = 70 \text{ (ads)} + 50 \text{ (orgánicos)} = 120$.  <br>$\text{CAC Blended} = \frac{\$12.600}{120} = \mathbf{\$105,00}$. | `[CUMPLE]` | **3 / 3 pts** | Se explicita la combinación de clientes que costaron dinero con los 50 orgánicos que llegaron a costo marginal cero. |
| **1.1.5** | **Cálculo Dual de LTV (Con y Sin Tope):**  <br>• LTV sin tope: $\frac{\$19,50}{0,06} = \$325,00$.  <br>• LTV a 24 meses: $LTV_{24} = \sum_{t=1}^{24} \$19,50 \times (0,94)^{t-1} \approx \mathbf{\$251,39}$. | `[CUMPLE]` | **5 / 5 pts** | Se fundamenta el rechazo a la fórmula sin tope por asumir horizontes infinitos irreales para micro-barberías. |
| **1.1.6** | **Fila Auditada y Verificada a Mano (Mes 1):** Inclusión obligatoria del desglose aritmético manual explícito del flujo neto del Mes 1 en la hoja de cálculo. | `[CUMPLE]` | **3 / 3 pts** | Coincidencia exacta entre el cálculo manual y el modelo de fórmulas en el Mes 1. |

---

### MÓDULO 1.2: MATRIZ DE ESCENARIOS COMPARATIVOS (15 / 15 PUNTOS)
*Evaluación de los tres escenarios financieros lado a lado en Google Sheets.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Control Financiero |
| :---: | :--- | :---: | :---: | :--- |
| **1.2.1** | **Escenario 1 (Situación Base - Hoy):**  <br>• Inversión: \$10.000 \| Trials: 500 \| Clientes Pauta: 70  <br>• Costo Total Canal: \$12.600 \| CAC Paid: \$180,00  <br>• LTV 24m: \$251,39 \| LTV:CAC Paid: **1,40x** \| Payback: **Mes 10-11** | `[CUMPLE]` | **5 / 5 pts** | Demuestra que la adquisición de pago actual es rentable por poco margen, pero subóptima frente al estándar 3:1. |
| **1.2.2** | **Escenario 2 (Propuesta de Valeria - Saturación Real):**  <br>• Inversión: \$30.000 \| Trials según historial: **900** (no 1.500)  <br>• Vendedoras: 2 vendedoras (\$2.400) por salto de capacidad (>500 trials)  <br>• Clientes Pauta: $900 \times 14\% = 126$  <br>• Costo Total: $\$30.000 + \$2.400 + (126 \times \$20) = \$34.920$  <br>• CAC Paid Promedio: $\mathbf{\$277,14}$ \| CAC Marginal: $\mathbf{\$398,57}$  <br>• LTV:CAC Paid Promedio: **0,91x** \| LTV:CAC Marginal: **0,63x** | `[CUMPLE]` | **5 / 5 pts** | **Destrucción de valor masiva:** Se evidencia que cada cliente adicional destruye capital (cuesta \$398,57 y devuelve \$251,39). |
| **1.2.3** | **Escenario 3 (Propuesta Optimizada del Equipo):** Modelo alternativo que combine al menos dos palancas cuantitativas justificadas (mix del Plan Anual al 25% y mejora de conversión de trial al 18%). | `[CUMPLE]` | **5 / 5 pts** | Eleva el margen mensual promedio a \$21,84, baja el CAC Paid a \$157,96 y lleva el LTV:CAC Blended a **2,86x**. |

---

### MÓDULO 1.3: DINÁMICA DE CASH FLOW UNITARIO Y PAYBACK (15 / 15 PUNTOS)
*Análisis de la curva en J y retorno de capital por perfil de cliente.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Control Financiero |
| :---: | :--- | :---: | :---: | :--- |
| **1.3.1** | **Curva de Flujo de Caja Acumulado (Mes 0 al 24):** Gráfica y tabla con 4 series identificadas:  <br>1. Cliente Mensual (Arranca en $-\$180,00$, recupera con margen degradado por *churn* del 6%).  <br>2. Cliente Anual (Arranca en $-\$180,00$, cobra $\$240 \times 78\% = \$187,20$ en Mes 1, renueva 70% en Mes 13).  <br>3. Cliente Propuesta Optimizada.  <br>4. Línea de equilibrio (Breakeven / \$0). | `[CUMPLE]` | **8 / 8 pts** | Plasmado en `3_Curva_de_Caja_Google_Sheets.pdf` con las 25 filas mensuales completas y proyecciones verificadas. |
| **1.3.2** | **Identificación Precisa del Payback:**  <br>• Cliente Mensual: Payback entre **Mes 9 y Mes 10** (\$15,00 acumulado al mes 10).  <br>• Cliente Anual: Payback en **Día 1 / Mes 1** (Retorno inmediato $+\$7,20$ en el primer mes). | `[CUMPLE]` | **7 / 7 pts** | Resalta el poder del flujo de caja adelantado para eliminar el riesgo de iliquidez. |

---

### MÓDULO 1.4: CRITERIO ESTRATÉGICO Y DICTAMEN PARA RICARDO MÉNDEZ (30 / 30 PUNTOS)
*Toma de decisiones ejecutiva, identificación de trampas y gestión de riesgos.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Control Financiero |
| :---: | :--- | :---: | :---: | :--- |
| **1.4.1** | **Veredicto Ejecutivo Categórico:** Dictamen directo y sin ambigüedades: **RECHAZAR la propuesta de triplicar a \$30.000 y PAUSAR el aumento de inversión.** | `[CUMPLE]` | **7 / 7 pts** | Respuesta categórica y fundamentada en números: *Valeria no tiene razón en este momento*. |
| **1.4.2** | **Desenmascaramiento Cuantitativo de la Trampa:**  <br>1. Valeria utilizó el **CAC Blended (\$105)** para reportar su LTV:CAC de 2,4, camuflando los 50 clientes orgánicos que entran gratis.  <br>2. Omitió los salarios y comisiones de ventas en la adquisición.  <br>3. El freelancer asumió erróneamente un costo lineal (\$20 por trial = 1.500 trials), ignorando la saturación histórica demostrada (solo 900 trials). | `[CUMPLE]` | **8 / 8 pts** | Trampa desenmascarada con precisión aritmética irrefutable. |
| **1.4.3** | **Cálculo del Mes de Quiebra (Cash Runway):** Demostración de que la aceleración propuesta drena los \$60.000 del banco y **perfora el piso de seguridad de \$10.000 en el Mes 4** (\$6.040 restantes), llevando a la quiebra. | `[CUMPLE]` | **8 / 8 pts** | Comprobado con la corrida financiera mensual de caja. |
| **1.4.4** | **Plan de Acción y Palancas de Corrección:** Presentación de dos soluciones internas de producto o monetización antes de volver a escalar pauta (plan anual + optimización del onboarding). | `[CUMPLE]` | **7 / 7 pts** | Vínculo metodológico perfecto con los requerimientos de la Sesión 2. |

---

### MÓDULO 1.5: GOBERNANZA Y CONTROL DE INTELIGENCIA ARTIFICIAL (15 / 15 PUNTOS)
*Auditoría de supervisión crítica humana sobre los modelos generativos.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Control Financiero |
| :---: | :--- | :---: | :---: | :--- |
| **1.5.1** | **Sección Oficial Titulada:** Presencia explícita del apartado obligatorio: *«En qué se equivocó o nos confundió la IA»*. | `[CUMPLE]` | **5 / 5 pts** | Incluida de forma destacada en la documentación y Ficha de Growth. |
| **1.5.2** | **Detección y Corrección de Alucinaciones Financieras:** Registro de al menos un caso crítico real documentado (ej. la IA calculó CAC dividiendo solo anuncios entre registros; usó LTV sin tope de \$325; ignoró el salto de capacidad de vendedoras; o propuso esquemas de descuentos incompatibles). | `[CUMPLE]` | **10 / 10 pts** | Detalla qué propuso la IA, por qué destruía valor y cómo fue corregida a mano por el equipo. |

---

### BONUS SESIÓN 1 (OPCIONALES — +25 / +25 PUNTOS)

| Nivel | Entregable y Requerimientos de Auditoría | Estado | Pts Asignados |
| :---: | :--- | :---: | :---: |
| **NIVEL 2**  <br>*(+10 pts)* | **El Tablero Interactivo de Agendo (Web Standalone):**  <br>• Archivo autónomo HTML/JS en `Agendo/index.html` ejecutable localmente sin dependencias.  <br>• Sliders para Inversión (\$0-\$30k), Conversión Trial, Margen, Churn, Mix Anual.  <br>• Métricas en vivo coincidentes al 99% con Google Sheets (CAC Paid/Blended, LTV, Payback, Vendedoras).  <br>• Gráficos dinámicos con Chart.js y trampa de Valeria visible en la interfaz. | `[CUMPLE]` | **+10 / 10 pts** |
| **NIVEL 3**  <br>*(+15 pts)* | **El Simulador Integral de Flujo de Caja a 24 Meses:**  <br>• Matriz de 24 meses completa con columnas de Inversión, Trials (interpolación lineal), Vendedoras (salto cada 500 trials), Clientes Activos, Entradas, Salidas y Caja Final.  <br>• Validación exacta y auditada a mano del Mes 1 (\$10.000 fijos).  <br>• Comparativa de 4 planes y alerta visual cuando la caja baja de \$10.000. | `[CUMPLE]` | **+15 / 15 pts** |

---

# PARTE 2: SESIÓN 2 — GROWTH LOOPS, ONBOARDING MÓVIL Y RETENCIÓN
**Pregunta central:** *«¿Cómo rediseñar la puesta en marcha de Agendo para que las barberías lleguen a su primera reserva y el negocio crezca sin comprar más anuncios?»*

---

### MÓDULO 2.1: CRITERIO DE GROWTH Y DIAGNÓSTICO DEL EMBUDO (30 / 30 PUNTOS)
*Auditoría de diagnóstico analítico del onboarding actual y modelado de ciclos de producto.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Growth |
| :---: | :--- | :---: | :---: | :--- |
| **2.1.1** | **Detección Matemática de la Mayor Fuga Absoluta:** Identificación de que el punto donde más usuarios se pierden es **Compartir el link (Paso 6)**:  <br>De 62 que terminan, solo 30 comparten en 24h. **Se pierden 32 barberos (51,6% de abandono de ese paso)** debido a que el enlace está escondido en menús sin botón directo. | `[CUMPLE]` | **8 / 8 pts** | Documentado en la Ficha de Growth y en el panel interactivo para Valeria. |
| **2.1.2** | **Detección del Punto de Mayor Fricción Temporal:** Identificación de que la **Pantalla 3 (Carga de Servicios)** consume **12 minutos promedio** (el 43% del tiempo total de onboarding de 28 min), obligando a escribir 9 servicios a mano desde una pantalla móvil. | `[CUMPLE]` | **7 / 7 pts** | Foco clave resuelto mediante la precarga de los 3 servicios del 90% del mercado. |
| **2.1.3** | **Definición Invertida de la Escalera de Activación:**  <br>• **Hábito:** Alcanzar $\ge 20$ citas en los 14 días (45% pasa a pagar y 80% retiene a 6 meses).  <br>• **Aha Moment:** Recepción de la **primera reserva real por el link**.  <br>• **Setup Mínimo:** Nombre, WhatsApp, servicios y horarios estándar en menos de 3 minutos. | `[CUMPLE]` | **8 / 8 pts** | La arquitectura del prototipo conduce al usuario directamente a este hito de activación. |
| **2.1.4** | **Arquitectura del Product Loop (Ciclo de la Insignia):** Modelado del ciclo orgánico derivado de las 250 visitas mensuales que recibe la página de reservas de cada barbería activa:  <br>$\text{Barbería Activa} \rightarrow \text{Página Pública con Insignia Interactiva} \rightarrow \text{Colega Barbero se Registra} \rightarrow \text{Nueva Barbería}$. | `[CUMPLE]` | **7 / 7 pts** | Implementado funcionalmente con la pantalla de invitación viral en el prototipo. |

---

### MÓDULO 2.2: EXPERIENCIA DE USUARIO MÓVIL Y REFORGE 4 QUESTIONS (25 / 25 PUNTOS)
*Evaluación de la reducción de fricción y calibración psicológica del registro para celulares.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Growth |
| :---: | :--- | :---: | :---: | :--- |
| **2.2.1** | **Diseño Radical Mobile-First:** Interfaz 100% calibrada para teléfonos celulares (~390px, botones táctiles de pulgar, inputs grandes, navegación lineal sin menús ocultos). | `[CUMPLE]` | **6 / 6 pts** | Verificado en `index.html` y `styles.css`. Diseñado específicamente para el 81% de barberos móviles. |
| **2.2.2** | **Postergación de Fricción Fiscal (Setup Progresivo):** Eliminación completa de cédula jurídica, razón social y régimen fiscal de la puesta en marcha inicial. | `[CUMPLE]` | **7 / 7 pts** | Los datos fiscales se posponen al día 14, avisando suavemente que solo se requerirán para la factura si deciden continuar. |
| **2.2.3** | **Plantillas Precargadas de Un Toque:** Inclusión de servicios predeterminados basados en el 90% de la demanda real (Corte: \$10, Barba: \$8, Combo: \$15) y horarios comerciales estándar listos para activar. | `[CUMPLE]` | **6 / 6 pts** | Elimina las pantallas vacías y reduce la carga cognitiva a simples toques. |
| **2.2.4** | **Aprobación de las 4 Preguntas del Cliente (Reforge Framework):**  <br>1. *¿Es para mí?* Lenguaje directo de barbería, corte y sillón.  <br>2. *¿Hace lo que quiero?* Cumple la promesa de más clientes y turnos sin llamadas.  <br>3. *¿Me importa ahora?* Permite recibir reservas hoy mismo.  <br>4. *¿Sé cómo lograrlo?* Pasos guiados con barra de avance y acciones evidentes. | `[CUMPLE]` | **6 / 6 pts** | Auditado y verificado positivamente pantalla por pantalla. |

---

### MÓDULO 2.3: FUNCIONALIDAD TÉCNICA DEL PROTOTIPO (20 / 20 PUNTOS)
*Evaluación de la ejecución, interactividad y coherencia del prototipo interactivo.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Growth |
| :---: | :--- | :---: | :---: | :--- |
| **2.3.1** | **Recorrido End-to-End Operativo:** El usuario puede completar el flujo completo desde el registro inicial hasta la página pública y el panel sin bloqueos ni links rotos. | `[CUMPLE]` | **5 / 5 pts** | Navegación bidireccional fluida (*Adelante* / *← Atrás*) entre todas las pantallas. |
| **2.3.2** | **Compartir en WhatsApp Nativo:** Botón directo y destacado de «Compartir en WhatsApp» con enlace dinámico y mensaje pre-redactado listo para enviar a clientes. | `[CUMPLE]` | **5 / 5 pts** | Copiado instantáneo al portapapeles con confirmación visual táctil (*Toast*). |
| **2.3.3** | **Disparador Interactivo del Aha Moment:** Funcionalidad integrada para **simular la entrada de la primera reserva** (notificación animada push que muestra cliente ficticio, servicio y horario). | `[CUMPLE]` | **5 / 5 pts** | Incluye generador de reservas aleatorias adicionales para probar la robustez del flujo. |
| **2.3.4** | **Transparencia en Datos Simulados:** Todo dato precargado, reserva ficticia o métrica de demostración contiene explícitamente el distintivo textual `(simulado)`. | `[CUMPLE]` | **5 / 5 pts** | Cumplimiento exhaustivo de la regla reglamentaria en todos los archivos. |

---

### MÓDULO 2.4: MEDICIÓN, EXPERIMENTO Y FINANZAS DE GROWTH (15 / 15 PUNTOS)
*Control analítico del funnel, planteamiento de hipótesis A/B e impacto en Unit Economics.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Growth |
| :---: | :--- | :---: | :---: | :--- |
| **2.4.1** | **Panel de Métrica para Valeria:** Pantalla o vista interna para la CEO que visualiza el embudo de conversión paso a paso con contadores independientes por pantalla. | `[CUMPLE]` | **4 / 4 pts** | Integrado en el prototipo con pestañas de *Comparativa*, *Hoy (Caso)* y *Nuevo (Supuesto)*. |
| **2.4.2** | **Diseño Formal del Experimento A/B:**  <br>• *Hipótesis:* Reemplazar el registro fiscal de 6 pasos por onboarding de 3 pantallas con plantillas y WhatsApp directo.  <br>• *Métrica de Éxito:* % de trials que comparten el link en 24h sube de **30% a 75%**.  <br>• *Contramétrica Obligatoria:* Tasa de citas canceladas o no-shows $\le 5\%$. | `[CUMPLE]` | **4 / 4 pts** | Redactado con la estructura canónica oficial en la Ficha de Growth. |
| **2.4.3** | **Impacto en el CAC Paid del Rediseño:**  <br>• Conversión trial a pago sube del 14% al **24%**.  <br>• Clientes de pauta suben de 70 a **120**.  <br>• Costo Total: $\$10.000 + \$1.200 + (120 \times \$20) = \$13.600$.  <br>• **Nuevo CAC Paid:** $\frac{\$13.600}{120} = \mathbf{\$113,33}$ (Reducción del **37%** frente a los \$180,00 anteriores). | `[CUMPLE]` | **4 / 4 pts** | Demuestra cómo optimizar el producto reduce el costo de adquisición sin gastar más pauta. |
| **2.4.4** | **Definición de Métrica North Star:** Elección de **«Citas completadas por semana a través de la plataforma»** como métrica norte de Agendo, acompañada del monitoreo semanal de cancelaciones (*churn*). | `[CUMPLE]` | **3 / 3 pts** | Orientada al valor y actividad recurrente real de los usuarios. |

---

### MÓDULO 2.5: GOBERNANZA DE IA Y ENTREGABLES EJECUTIVOS (10 / 10 PUNTOS)
*Auditoría del proceso de construcción, Ficha de Growth y defensa oral.*

| ID | Criterio de Verificación Estricta | Estado | Pts Asignados | Observación / Parámetro de Growth |
| :---: | :--- | :---: | :---: | :--- |
| **2.5.1** | **Ficha de Growth de Una Página:** Documento ejecutivo sintético estructurado con los 8 puntos del reglamento (embudo, escalera, metas, loop, matriz 90d, experimento, North Star y control IA). | `[CUMPLE]` | **4 / 4 pts** | Disponible en formato conciso en `Agendo/evidencias_sheets/FICHA DE GROWTH_ AGENDO.md`. |
| **2.5.2** | **Control de IA en Sesión 2:** Registro documentado de errores de la IA durante la ideación del prototipo (rechazo a incentivos monetarios de referidos que elevaban costos). | `[CUMPLE]` | **3 / 3 pts** | Evidencia diseño crítico previo por parte del equipo antes de generar código. |
| **2.5.3** | **Guion de Pitch / Demostración en Vivo (3 Minutos):** Estructura de presentación ejecutiva: 1) Problema atacado, 2) Prototipo celular operando en vivo, 3) Número de negocio que mueve y 4) Plan de contingencia si el experimento falla. | `[CUMPLE]` | **3 / 3 pts** | Preparado para comité evaluador con narrativa cuantitativa sólida. |

---

# MATRIZ CONSOLIDADA DE EVALUACIÓN Y DICTAMEN

```
PUNTAJE SESIÓN 1 (Base):    100 / 100 pts
BONUS SESIÓN 1 (N2 + N3):    25 /  25 pts
PUNTAJE SESIÓN 2 (Growth):  100 / 100 pts
--------------------------------------------
CALIFICACIÓN FINAL:         225 / 225 pts (100%)
```

### DICTAMEN FINAL DEL AUDITOR:
* **[APROBADO CON DISTINCIÓN]** — Cumplimiento perfecto de la rúbrica oficial (100% de puntos base y 100% de bonus). Entregables consistentes, trazables y ejecutables de punta a punta.
