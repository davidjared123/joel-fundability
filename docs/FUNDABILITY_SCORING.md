# Fundability Score - Documentación del Cálculo

Este documento explica cómo funciona el cálculo de elegibilidad de crédito en la aplicación.

---

## Resumen del Sistema de Puntos

| Categoría | Puntos Máx | Peso |
|-----------|------------|------|
| Foundation | 25 | 25% |
| Financials | 25 | 25% |
| Business Credit | 25 | 25% |
| Personal | 15 | 15% |
| Application Process | 10 | 10% |
| **TOTAL** | **100** | **100%** |

---

## 1. FOUNDATION (25 puntos)

Datos legales y estructura del negocio.

### Campos que SUMAN puntos:

| Campo | Puntos | Condición |
|-------|--------|-----------|
| `business_name` | 3 | Tiene nombre de empresa |
| `entity_type` | 4 | LLC, Corp, etc. |
| `formation_date` | 2 | Fecha de formación |
| `ein_number` | 5 | Tiene EIN registrado |
| `address_line1` + `city` + `state` + `zip` | 4 | Dirección completa |
| `website` | 2 | Tiene sitio web |
| `email` | 1 | Tiene email profesional |
| `license_type` + `license_number` | 2 | Tiene licencia |

### Campos que NO SUMAN (solo informativos):
- `phone` - No se pide actualmente

---

## 2. FINANCIALS (25 puntos)

Salud financiera del negocio.

### Campos que SUMAN puntos:

| Campo | Puntos | Condición |
|-------|--------|-----------|
| `time_in_business` | 4 | Años en operación |
| `bank_name` | 3 | Tiene cuenta bancaria |
| `average_bank_balance` | 0-4 | Escalado por monto* |
| `filed_last_year_tax` | 3 | = "Yes" o true |
| `has_revenue` | 4 | = "Yes" o true |
| `can_supply_financial_statements` | 3 | = "Yes" o true |
| `has_collateral` | 2 | = "Yes" o true |
| `w2_employees` | 2 | > 0 empleados |

**\*Escala de `average_bank_balance`:**
- $50,000+ → 4 puntos (100%)
- $25,000+ → 3.2 puntos (80%)
- $10,000+ → 2.4 puntos (60%)
- $5,000+ → 1.6 puntos (40%)
- <$5,000 → 0.8 puntos (20%)

### Campos que NO SUMAN (para informe/banco):
- `bank_statements_info` - Confirmación de estados de cuenta
- `personal_tax_up_to_date` - Impuestos personales al día
- `reserves` - No implementado

---

## 3. BUSINESS CREDIT (25 puntos)

Historial crediticio del negocio.

### Campos que SUMAN puntos:

| Campo | Puntos | Condición |
|-------|--------|-----------|
| `dnb_report` | 3 | Registrado en D&B |
| `paydex_score` | 0-6 | Escalado (score/100 × 6) |
| `experian_data` | 4 | Tiene reporte Experian |
| `equifax_report` | 4 | Tiene reporte Equifax |
| `tradelines_reporting` | 5 | Tiene tradelines activas |
| No `disputes` | 3 | Sin disputas activas |

**Escala de `paydex_score`:**
- Score 0-100 se convierte proporcionalmente
- Ejemplo: PAYDEX 80 → (80/100) × 6 = 4.8 puntos

### Campos que NO SUMAN (informativos):
- `bureau_distribution` - Distribución entre bureaus

---

## 4. PERSONAL (15 puntos)

Crédito personal del dueño.

### Campos que SUMAN puntos:

| Campo | Puntos | Condición |
|-------|--------|-----------|
| `credit_score` | 0-10 | Escalado 300-850* |
| `bankruptcies_liens_judgements` = "No" | 5 | Sin récords negativos |

**\*Escala de `credit_score`:**
```
puntos = ((score - 300) / 550) × 10
```
- Score 850 → 10 puntos
- Score 720 → 7.6 puntos
- Score 680 → 6.9 puntos
- Score 580 → 5.1 puntos
- Score 300 → 0 puntos

### Campos que NO SUMAN (para informe/banco):
- `credit_report` - Confirmación de revisión
- `lexisnexis` - Reporte LexisNexis
- `chex_systems` - Reporte ChexSystems

---

## 5. APPLICATION PROCESS (10 puntos)

Preparación para aplicar.

### Campos que SUMAN puntos:

| Campo | Puntos | Condición |
|-------|--------|-----------|
| Cada paso completado | 2.5 | 4 pasos total |

Pasos:
1. Application Submission
2. Troubleshooting
3. Renegotiation
4. When to reapply after denial

---

## Cálculo Final

```
Score Total = Foundation + Financials + BusinessCredit + Personal + ApplicationProcess
Porcentaje = (Score Total / 100) × 100%
```

### Clasificación:

| Rango | Clasificación |
|-------|---------------|
| 80-100% | Excellent |
| 60-79% | Good |
| 40-59% | Fair |
| 0-39% | Needs Improvement |

---

## Elegibilidad SBA (Referencia)

| Tipo de Préstamo | Credit Score Mínimo |
|------------------|---------------------|
| SBA 7(a) | 680 |
| SBA 504 | 680 |
| SBA Express | 650 |
| SBA Microloan | 620 |

---

## Archivos de Código Relacionados

- `src/utils/creditStandards.js` - Configuración de thresholds y pesos
- `src/utils/fundabilityCalculator.js` - Lógica de cálculo
- `src/hooks/useFundabilityProgress.js` - Obtención de datos

---

*Última actualización: Enero 2026*
