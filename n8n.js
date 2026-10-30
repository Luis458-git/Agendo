// 1. Parámetros de entrada recibidos del Webhook (o valores por defecto del caso)
const input = $input.first().json;

const initialCash = input.initialCash ?? 60000;
const floorCash = 10000;
const initialClients = 1150;
const organicClients = 50;
const fixedCosts = 14000;
const marginBruto = 0.78;

const priceMonthly = input.priceMonthly ?? 25;
const priceAnnual = input.priceAnnual ?? 240;
const convRate = input.convRate ?? 0.14;
const churnMonthly = input.churnMonthly ?? 0.06;
const pctAnnual = input.pctAnnual ?? 0.10; // 10% base, sube a 25% en optimizado
const renewalAnnual = 0.70;

// Presupuesto mensual (array de 24 meses o valor fijo repetido)
let spendPlan = input.spendPlan;
if (!Array.isArray(spendPlan) || spendPlan.length !== 24) {
  const defaultSpend = input.monthlySpend ?? 10000;
  spendPlan = Array(24).fill(defaultSpend);
}

// 2. Función de interpolación lineal del historial de anuncios (Sección 5 del caso)
function getTrials(spend) {
  const pts = [
    { x: 0, y: 0 },
    { x: 5000, y: 290 },
    { x: 10000, y: 500 },
    { x: 15000, y: 650 },
    { x: 20000, y: 760 },
    { x: 30000, y: 900 }
  ];
  if (spend <= 0) return 0;
  if (spend >= 30000) return 900;
  for (let i = 0; i < pts.length - 1; i++) {
    if (spend >= pts[i].x && spend <= pts[i + 1].x) {
      return pts[i].y + (spend - pts[i].x) * (pts[i + 1].y - pts[i].y) / (pts[i + 1].x - pts[i].x);
    }
  }
  return 500;
}

// 3. Motor de Simulación a 24 Meses
let cash = initialCash;
let activeMonthly = initialClients;
const annualCohorts = {}; // Registro de cohortes anuales por mes de entrada
let minCash = initialCash;
let minCashMonth = 0;
let ruleBroken = false;
let firstBreakMonth = null;

const monthlyDetails = [];

const marginMonthly = priceMonthly * marginBruto;
const marginAnnual = priceAnnual * marginBruto;

for (let m = 1; m <= 24; m++) {
  const spend = spendPlan[m - 1];
  const trials = getTrials(spend);
  const vendedoras = trials > 0 ? Math.ceil(trials / 500) : 0;
  const vendedorasCost = vendedoras * 1200;

  const newPaid = trials * convRate;
  const newTotal = newPaid + organicClients;

  const newAnnual = newTotal * pctAnnual;
  const newMonthly = newTotal * (1 - pctAnnual);

  // Evolución de clientes mensuales (churn del 6% sobre saldo previo + nuevos)
  activeMonthly = (activeMonthly * (1 - churnMonthly)) + newMonthly;

  // Entradas mensuales
  let inflowMonthly = activeMonthly * marginMonthly;
  let inflowAnnual = newAnnual * marginAnnual;

  // Renovación anual al mes 13 de la cohorte que entró en (m - 12)
  let renewedAnnual = 0;
  if (annualCohorts[m - 12]) {
    renewedAnnual = annualCohorts[m - 12] * renewalAnnual;
    inflowAnnual += renewedAnnual * marginAnnual;
    annualCohorts[m] = newAnnual + renewedAnnual;
  } else {
    annualCohorts[m] = newAnnual;
  }

  const totalInflow = inflowMonthly + inflowAnnual;

  // Salidas del mes
  const commission = newPaid * 20;
  const totalOutflow = spend + vendedorasCost + commission + fixedCosts;

  // Saldo de caja final
  cash = cash + totalInflow - totalOutflow;

  if (cash < minCash) {
    minCash = cash;
    minCashMonth = m;
  }

  if (cash < floorCash && !ruleBroken) {
    ruleBroken = true;
    firstBreakMonth = m;
  }

  // Clientes anuales activos en el mes m (cohorte dura 12 meses)
  let activeAnnual = 0;
  for (let k = Math.max(1, m - 11); k <= m; k++) {
    activeAnnual += (annualCohorts[k] || 0);
  }

  const totalActive = activeMonthly + activeAnnual;

  monthlyDetails.push({
    mes: m,
    inversion: spend,
    trials: Number(trials.toFixed(1)),
    vendedoras: vendedoras,
    nuevosPauta: Number(newPaid.toFixed(1)),
    nuevosTotales: Number(newTotal.toFixed(1)),
    activosMensual: Number(activeMonthly.toFixed(1)),
    activosAnual: Number(activeAnnual.toFixed(1)),
    activosTotales: Number(totalActive.toFixed(1)),
    entradas: Number(totalInflow.toFixed(2)),
    salidas: Number(totalOutflow.toFixed(2)),
    cajaFinal: Number(cash.toFixed(2)),
    alertaPiso: cash < floorCash
  });
}

return [{
  json: {
    status: ruleBroken ? "CRITICAL_DEFICIT" : "VIABLE_PLAN",
    reglaRota: ruleBroken,
    mesQuiebra: firstBreakMonth,
    cajaMinima: Number(minCash.toFixed(2)),
    mesCajaMinima: minCashMonth,
    cajaMes24: Number(cash.toFixed(2)),
    clientesActivosMes24: Number(monthlyDetails[23].activosTotales.toFixed(1)),
    resumenMensual: monthlyDetails
  }
}];