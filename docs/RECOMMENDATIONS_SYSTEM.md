# Sistema de Recomendaciones - Documentación

Este documento explica cómo funcionan las sugerencias personalizadas en el reporte.

---

## Cómo Funciona

Las recomendaciones se generan **dinámicamente** basándose en los datos del usuario. La función `generateRecommendations()` en `fundabilityCalculator.js` evalúa cada sección y genera tres tipos de feedback:

1. **Strengths (Fortalezas)** - Lo que el usuario ya tiene bien
2. **Weaknesses (Debilidades)** - Áreas que necesitan mejora
3. **Suggestions (Sugerencias)** - Acciones específicas a tomar

---

## Lógica por Sección

### FOUNDATION
| Condición | Resultado |
|-----------|-----------|
| Score ≥ 80% | ✅ Strength: "Excellent legal structure" |
| Score 60-79% | ✅ Strength: "Good foundation established" |
| Score < 60% | ⚠️ Weakness + Sugerencias específicas |

**Sugerencias específicas si faltan:**
- `ein_number` → "Registrar EIN con el IRS"
- `address_line1` → "Establecer dirección profesional"
- `website` → "Crear sitio web profesional"

---

### FINANCIALS
| Condición | Resultado |
|-----------|-----------|
| Score ≥ 80% | ✅ Strength: "Strong financial health" |
| Score 60-79% | ✅ Strength: "Finances in good condition" |
| Score < 60% | ⚠️ Weakness + Sugerencias específicas |

**Sugerencias específicas si faltan:**
- `bank_name` → "Abrir cuenta bancaria de negocio"
- `average_bank_balance` < $10,000 → "Mantener balance mínimo de $10,000"
- `filed_last_year_tax` → "Presentar declaración de impuestos"

---

### BUSINESS CREDIT
| Condición | Resultado |
|-----------|-----------|
| Score ≥ 80% | ✅ Strength: "Excellent business credit profile" |
| Score 60-79% | ✅ Strength: "Good business credit history" |
| Score < 60% | ⚠️ Weakness + Sugerencias específicas |

**Sugerencias específicas si faltan:**
- `dnb_report` → "Registrar en Dun & Bradstreet (D-U-N-S)"
- `paydex_score` < 80 → "Mejorar PAYDEX pagando a vendors temprano"
- Siempre → "Establecer al menos 3 tradelines"

---

### PERSONAL
| Condición | Resultado |
|-----------|-----------|
| Score ≥ 80% | ✅ Strength: "Excellent personal credit" |
| Score 60-79% | ✅ Strength: "Good personal credit history" |
| Score < 60% | ⚠️ Weakness + Sugerencias específicas |

**Sugerencias específicas si aplica:**
- `credit_score` < 680 → "Mejorar credit score a 680+ para SBA"
- `bankruptcies_liens_judgements` = "Yes" → "Resolver récords negativos"

---

### APPLICATION PROCESS
| Condición | Resultado |
|-----------|-----------|
| Score ≥ 80% | ✅ Strength: "Application process well prepared" |
| Score < 80% | Sugerencias de completar checklist |

---

## Elegibilidad SBA

Se incluye verificación automática:

```javascript
sbaEligibility: {
  sba7a: credit_score >= 680,
  sbaMicroloan: credit_score >= 620
}
```

**Mensajes mostrados:**
- ✓ "Meets credit requirements for SBA 7(a) loans"
- ✗ "Need credit score of 680+ for SBA 7(a) loans"

---

## Archivos Relacionados

- `src/utils/fundabilityCalculator.js` → Función `generateRecommendations()`
- `src/utils/creditStandards.js` → Thresholds y configuración
- `src/pages/Report.jsx` → Componente que muestra el reporte

---

*Última actualización: Enero 2026*
