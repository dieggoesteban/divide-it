# Clarification Summary: Desglose de Items por Participante

**Date**: 2024-12-18  
**Feature**: `001-participant-items-breakdown`  
**Status**: ✅ Clarified - Ready for Planning

## Questions Resolved

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| 1 | Montos negativos en items | **Prohibir negativos** | Solo se permiten gastos positivos (>=0). Evita complejidad innecesaria. |
| 2 | Interfaz de edición | **Modal/Popup** | Reutiliza el formulario de creación. Simplifica implementación y mantiene consistencia visual. |
| 3 | Identificación de items | **ID Único** | UUID o contador interno. Permite distinguir items duplicados, esencial para edición/eliminación. |
| 4 | Ubicación del desglose | **Solo en Página de Detalles** | Items solo en ParticipantDetailsPage. Lista principal permanece simple mostrando total. |
| 5 | Estructura de datos | **Array Vacío** | Todos los participantes tienen `items: []`. No requiere migración por ser app stateless. |

## Key Design Decisions

### Architecture
- **Stateless Application**: Cálculos en tiempo real, sin persistencia entre sesiones
- **No Legacy Migration**: Array vacío para todos los participantes, no hay datos antiguos que preservar

### Data Model
```typescript
interface Item {
  id: string;              // UUID o contador único
  description: string;     // Obligatorio, max 100 chars
  amount: number;          // Obligatorio, >= 0, max 2 decimales
}

interface Participant {
  id: string;
  name: string;
  items: Item[];          // Siempre presente, puede estar vacío
}
```

### User Flows
- **Crear con Items**: Formulario → agregar 1+ items → guardar → total calculado automáticamente
- **Ver Detalles**: Clic en participante → ParticipantDetailsPage → lista de items
- **Editar Items**: Botón "Editar" → Modal con formulario → modificar items → guardar

## Impact on Requirements

| Requirement | Clarification |
|-------------|---------------|
| FR-002 | Items solo positivos, no negativos |
| FR-004 | Items en ParticipantDetailsPage solamente |
| FR-008 | Modal reutiliza formulario de creación |
| Key Entities | Participant siempre tiene items array, Item tiene ID único |

## Next Steps

→ Proceder con `/speckit.plan` para generar el plan de implementación técnico
