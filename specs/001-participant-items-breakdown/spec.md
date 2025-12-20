# Feature Specification: Desglose de Items por Participante

**Feature Branch**: `001-participant-items-breakdown`  
**Created**: 2024-12-18  
**Status**: Draft  
**Input**: User description: "Desarrollar una funcionalidad para que en vez de únicamente agregar el total que gastó un participante, este total se componga de la suma de varios items. Cuando agrego un participante, a este le puedo asociar varios items. Cada item se compone de una descripción y un monto. De esta forma nos evitamos como usuarios hacer la suma manual previamente, además luego se puede ver el desglose."

## Clarifications

### Session 2024-12-18
- Q: ¿Qué sucede si el usuario ingresa un monto negativo en un item? → A: **Prohibir negativos**: Solo se permiten gastos positivos.
- Q: ¿Cómo se debe diseñar la interfaz de edición de items? → A: **Modal/Popup**: Botón "Editar" en la página de detalles abre un diálogo con el formulario completo.
- Q: ¿Cómo se identifica cada item de forma única para permite su edición y eliminación? → A: **ID Único**: Generar un identificador único (ej. UUID o contador interno) para cada item.
- Q: ¿Dónde se deben mostrar los items desglosados de un participante? → A: **En el diálogo de edición**: Se unificó la vista de detalles y edición en un único popup para mejorar la UX. La página de detalles fue eliminada.
- Q: ¿Cómo se debe estructurar el modelo de datos? ¿Se requiere migración? → A: **Array Vacío**: Todos los participantes tienen `items: []`. App es stateless, sin persistencia ni cálculos legacy.

### Session 2024-12-20 (Bugs & UX Improvements)
- Q: ¿Debe ser editable el total cuando hay items? → A: **Bloquear Total**: Si hay items, el campo Total es read-only (suma de items). Solo es editable si no hay items.
- Q: ¿Qué hace el botón de editar en el listado? → A: **Unificado**: Abre siempre el diálogo de edición unificado, donde se pueden editar nombre, monto (si no hay items) y gestionar items.
- Q: ¿Valor por defecto del monto? → A: **Cero**: Si no se carga nada, es $0.
- Q: ¿Cómo mejorar la transición de Monto Manual a Items? → A: **Conversión Automática**: Si hay un monto manual y se agrega el primer item, convertir ese monto en el primer item (ej. "Gasto Total") para no perderlo.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Agregar participante con múltiples items (Priority: P1)

Como usuario que organiza los gastos de un grupo, quiero poder agregar un participante con múltiples items de gasto (cada uno con descripción y monto), para no tener que calcular manualmente el total antes de ingresarlo y tener un registro detallado de en qué se gastó el dinero.

**Why this priority**: Es la funcionalidad core de la feature. Sin esta capacidad, el resto de historias no tienen sentido. Permite eliminar el cálculo manual que es el pain point principal del usuario.

**Independent Test**: Puede probarse completamente agregando un participante con 2-3 items y verificando que el total mostrado sea la suma correcta de los montos individuales.

**Acceptance Scenarios**:

1. **Given** el usuario está en el formulario de añadir participante, **When** agrega el nombre "Juan" y añade 3 items (Cena: $50, Taxi: $20, Propina: $10), **Then** el sistema calcula automáticamente el total ($80) y muestra al participante en la lista con ese monto.
2. **Given** el usuario está agregando items a un participante, **When** agrega un item sin descripción o sin monto, **Then** el sistema indica que ambos campos son obligatorios y no permite guardar el item incompleto.
3. **Given** el usuario tiene items agregados para un participante, **When** decide eliminar uno de los items antes de guardar, **Then** el item se elimina de la lista y el total se recalcula automáticamente.
4. **Given** el usuario ha agregado al menos un item, **When** intenta modificar el campo de "Total" manualmente, **Then** el campo está deshabilitado o es de solo lectura.
5. **Given** el usuario crea un participante sin ingresar monto, **Then** el sistema asigna automáticamente $0.

---

### User Story 2 - Ver desglose de gastos de un participante (Priority: P2)

Como usuario que revisa los gastos del grupo, quiero poder ver el desglose detallado de los items que componen el Gasto Total de cada participante, para entender exactamente en qué se gastó el dinero.

**Why this priority**: Complementa la P1 permitiendo revisar la información ingresada. Es esencial para la transparencia y verificación de gastos, pero depende de que primero exista la capacidad de ingresar items.

**Independent Test**: Puede probarse seleccionando un participante existente con items y verificando que se muestre la lista completa de items con sus descripciones y montos.

**Acceptance Scenarios**:

1. **Given** existe un participante "María" con 3 items registrados, **When** el usuario abre el diálogo de edición de María, **Then** ve la lista de todos sus items con descripción, monto individual y el total calculado.
2. **Given** el usuario está viendo la lista de participantes, **When** observa un participante con items, **Then** puede ver un indicador visual (ej. badge, icono) que muestra que ese participante tiene un desglose disponible, y puede hacer clic para acceder a sus detalles.

---

### User Story 3 - Editar items de un participante existente (Priority: P3)

Como usuario que detecta un error en los gastos registrados, quiero poder editar, agregar o eliminar items de un participante ya guardado mediante un modal unificado, para corregir errores sin tener que eliminar y recrear al participante.

**Why this priority**: Mejora la usabilidad pero no es crítico para el funcionamiento básico. Los usuarios pueden eliminar y recrear participantes como workaround.

**Independent Test**: Puede probarse editando un participante existente, modificando un item, agregando uno nuevo y eliminando otro, verificando que el total se actualice correctamente.

**Acceptance Scenarios**:

1. **Given** existe un participante "Carlos" con items, **When** el usuario hace clic en "Editar" y modifica el monto de uno de sus items en el modal, **Then** al guardar, el total del participante se recalcula automáticamente.
2. **Given** existe un participante con items, **When** el usuario agrega un nuevo item desde el modal de edición, **Then** el item aparece en el desglose y el total se actualiza.
3. **Given** existe un participante con múltiples items, **When** el usuario elimina un item desde el modal, **Then** el item desaparece del desglose y el total se recalcula.
4. **Given** el usuario está en el listado de participantes, **When** hace clic en editar un participante que TIENE items, **Then** se abre el modal de edición mostrando los items.
5. **Given** el usuario está en el listado de participantes, **When** hace clic en editar un participante que NO tiene items, **Then** se abre el modal de edición permitiendo agregar items o editar el monto total.

---

### User Story 4 - Desglosar monto existente (Priority: P2)

Como usuario que ya cargó un monto total, quiero poder desglosarlo en items sin perder el valor original, para detallar los gastos posteriormente.

**Why this priority**: Mejora significativamente la experiencia de usuario al permitir una transición fluida entre carga rápida (solo total) y carga detallada.

**Independent Test**: Crear participante con monto manual. Luego entrar a editar/agregar items y verificar que el monto original se preserva como un item.

**Acceptance Scenarios**:

1. **Given** un participante con monto manual de $100 y 0 items, **When** el usuario decide agregar items (ej. entrando al modal de items), **Then** el sistema pre-carga un primer item con valor $100 y descripción sugerida (ej. "Gasto Total") para que el total se mantenga igual.

---

### Edge Cases

- ¿Qué sucede si un participante tiene 0 items?
R: El sistema DEBE permitir agregar un participante sin items (total $0) para mantener compatibilidad con el flujo actual. Además tiene sentido porque indicamos que el participante no incurrió en gastos pero debe ser parte de la división de gastos.
- ¿Qué sucede si el usuario ingresa un monto negativo en un item?
R: El sistema NO DEBE aceptar montos negativos. Solo se permiten gastos positivos.
- ¿Qué sucede si el usuario ingresa una descripción muy larga? El sistema debe manejar descripciones de hasta 100 caracteres truncando visualmente si es necesario.
- ¿Cómo se manejan los decimales? El sistema debe mantener precisión de 2 decimales para los montos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE permitir agregar múltiples items a un participante durante su creación.
- **FR-002**: Cada item DEBE contener un identificador único (generado automáticamente por el sistema), una descripción (texto obligatorio, máximo 100 caracteres) y un monto (número obligatorio, permite decimales, NO permite negativos).
- **FR-003**: El sistema DEBE calcular automáticamente el total del participante como la suma de los montos de todos sus items.
- **FR-004**: El sistema DEBE mostrar el desglose de items en el diálogo de edición cuando el usuario accede a un participante que tiene items.
- **FR-005**: El sistema DEBE permitir eliminar items durante la creación de un participante, recalculando el total automáticamente.
- **FR-006**: El sistema DEBE validar que cada item tenga descripción y monto antes de permitir su adición.
- **FR-007**: El sistema DEBE permitir agregar un participante sin items (total $0) para mantener compatibilidad con el flujo actual.
- **FR-008**: El sistema DEBE permitir editar los items de un participante existente utilizando una ventana modal unificada.
- **FR-009**: El sistema DEBE mostrar un indicador visual (ej. badge, icono) en la lista de participantes cuando un participante tiene items desglosados.
- **FR-010**: El sistema DEBE mantener la precisión de 2 decimales en todos los cálculos de montos.
- **FR-011**: El campo de "Total" debe ser editable manualmente SOLO si el participante no tiene items agregados.
- **FR-012**: Si se agregan items, el campo "Total" pasa a ser de solo lectura y muestra la suma de los items.
- **FR-013**: Al agregar un nuevo participante, si no se especifica monto, se asume 0 por defecto.
- **FR-014**: En el listado de participantes, el botón de editar debe abrir el modal unificado de edición.
- **FR-015**: (UX Desglose) Si un usuario ingresó un monto total manual y decide agregar items, el sistema debe sugerir o convertir automáticamente ese monto manual en el primer item (ej. con descripción "Gasto Total") para no perder el valor ingresado.

### Key Entities

- **Item**: Representa un gasto individual dentro del total de un participante. Contiene un identificador único (ID), una descripción que explica el concepto del gasto y un monto numérico positivo. El ID permite distinguir items incluso si tienen descripción y monto idénticos. Un item siempre pertenece a un único participante.
- **Participant** (modificado): Estructura extendida que contiene: nombre, y un array `items` que puede estar vacío (para participantes sin gastos desglosados) o contener uno o más items. El monto total se calcula como la suma de los montos de todos los items en el array. Si el array está vacío, el total es un valor manual editable (por defecto 0).

## Assumptions

- **Stateless**: La aplicación es stateless y calcula todo en el momento de la sesión actual. No hay persistencia de datos entre sesiones ni cálculos almacenados de sesiones anteriores.
- Todos los participantes, tanto nuevos como existentes, tendrán un campo `items` de tipo array. Los participantes creados sin items tendrán un array vacío.
- El orden de los items no es relevante para los cálculos, pero se mostrarán en el orden en que fueron agregados (FIFO).
- No se requiere categorización de items más allá de la descripción libre.
- Un participante puede tener un número ilimitado de items (no hay límite técnico impuesto por requisitos de negocio).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios pueden agregar un participante con múltiples items en menos de 30 segundos (asumiendo 3-5 items típicos).
- **SC-002**: El 100% de los totales calculados automáticamente son matemáticamente correctos (suma exacta de items).
- **SC-003**: Los usuarios pueden ver el desglose completo de cualquier participante en máximo 2 clics desde la lista principal.
- **SC-004**: Los usuarios pueden editar items de un participante existente sin pérdida de datos ni necesidad de recrear al participante.
- **SC-005**: El sistema mantiene compatibilidad total con participantes sin items (flujo legacy funciona sin cambios).