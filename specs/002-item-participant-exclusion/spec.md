# Feature Specification: Exclusión de Participantes por Item

**Feature Branch**: `002-item-participant-exclusion`  
**Created**: 2024-12-20  
**Status**: Draft  
**Input**: User description: "Permitir excluir participantes específicos de items individuales en una compra conjunta. Por defecto todos participan de todos los items, pero se puede deseleccionar participantes de items específicos (ej: vegano no paga la carne en un asado). Impacta en el algoritmo de cálculo de división de gastos."

## Clarifications

### Session 2024-12-20
- Q: ¿Dónde se debe ubicar la selección de participantes para un item? → A: **En Formulario de Edición**: Integrar la lista de checkboxes dentro del diálogo existente de Crear/Editar Item (ItemManagerDialog) para mantener consistencia y simplicidad.
- Q: ¿Cómo visualizar en el listado que un item tiene exclusiones? → A: **Indicador Compacto**: Mostrar un icono o texto breve (ej. "👥 2/3") junto al monto del item para alertar de la configuración especial sin saturar.

## Contexto del Problema

En una compra conjunta, actualmente todos los gastos se dividen equitativamente entre todos los participantes. Sin embargo, existen situaciones donde no es justo que todos participen en la división de ciertos items:

- **Ejemplo del asado**: Si hay un participante vegano, no debería contribuir al costo de la carne.
- **Ejemplo de bebidas alcohólicas**: Un participante que no bebe alcohol no debería pagar por las cervezas o vinos.
- **Ejemplo de alergias**: Un participante alérgico a mariscos no debería pagar por la langosta.

Esta feature permite una división de gastos más justa y precisa, indicando qué participantes participan en cada item.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Excluir participante de un item específico (Priority: P1)

Como usuario que organiza los gastos de un grupo, quiero poder indicar que ciertos participantes no deben ser incluidos en la división de un item específico, para que la división de gastos sea justa y cada quien pague solo por lo que consume.

**Why this priority**: Es la funcionalidad core de la feature. Sin esta capacidad, no se puede lograr una división justa cuando hay items que no aplican a todos los participantes.

**Independent Test**: Puede probarse creando un grupo de 3 participantes, agregando un item a uno de ellos y desmarcando a uno de los 3 de participar en ese item. Verificar que el cálculo de división refleje correctamente que solo 2 personas dividen ese gasto.

**Acceptance Scenarios**:

1. **Given** existen 3 participantes (Ana, Juan, María) y Ana tiene un item "Carne" de $300, **When** el usuario desmarca a María de participar en el item "Carne", **Then** el costo de la carne ($300) se divide solo entre Ana y Juan ($150 c/u), no entre los 3.
2. **Given** el usuario está editando un item de un participante, **When** visualiza la configuración del item, **Then** ve una lista de todos los participantes del grupo con checkboxes, todos marcados por defecto.
3. **Given** un item tiene configurados los participantes que lo dividen, **When** el usuario guarda los cambios, **Then** el sistema recalcula automáticamente los balances de todos los participantes.

---

### User Story 2 - Visualizar participantes asignados a cada item (Priority: P2)

Como usuario que revisa los gastos del grupo, quiero poder ver claramente qué participantes están incluidos en la división de cada item, para entender cómo se calculó la división de gastos.

**Why this priority**: Complementa la P1 proporcionando transparencia. Los usuarios necesitan verificar que la configuración es correcta antes de proceder con los pagos.

**Independent Test**: Puede probarse visualizando los detalles de un item que tiene participantes excluidos y verificando que se muestre claramente quiénes participan y quiénes no.

**Acceptance Scenarios**:

1. **Given** un item "Cerveza" tiene excluido al participante "Pedro", **When** el usuario ve los detalles del item, **Then** puede identificar visualmente que Pedro no participa en ese item (ej: nombre tachado, badge "excluido", o lista de participantes activos).
2. **Given** el usuario está en la vista de resumen/resultados, **When** observa los balances, **Then** puede acceder a ver el detalle de cómo se calculó cada item, incluyendo qué participantes fueron considerados.

---

### User Story 3 - Agregar nuevo participante al grupo (Priority: P2)

Como usuario que agrega un nuevo participante después de haber cargado items, quiero que el nuevo participante sea automáticamente incluido en la división de todos los items existentes, para mantener la equidad por defecto y solo ajustar excepciones manualmente.

**Why this priority**: Importante para la usabilidad y consistencia del sistema. Es el comportamiento esperado por el usuario y evita tener que configurar manualmente cada item para el nuevo participante.

**Independent Test**: Puede probarse creando un grupo con items existentes, agregando un nuevo participante, y verificando que automáticamente participa en todos los items.

**Acceptance Scenarios**:

1. **Given** existen 2 participantes con varios items ya cargados, **When** el usuario agrega un tercer participante, **Then** el nuevo participante es automáticamente incluido en la división de todos los items existentes de todos los participantes.
2. **Given** se agregó un nuevo participante que fue incluido en todos los items, **When** el usuario revisa la configuración de un item específico, **Then** puede desmarcar al nuevo participante si no debe participar en ese item particular.

---

### User Story 4 - Recálculo automático de balances (Priority: P1)

Como usuario que ha configurado exclusiones de participantes en items, quiero que el sistema recalcule automáticamente todos los balances y transacciones sugeridas, para obtener un resultado preciso de quién debe a quién.

**Why this priority**: Es crítico para que la feature tenga valor. Sin recálculo correcto, la exclusión de participantes no tendría efecto práctico.

**Independent Test**: Puede probarse configurando un escenario con exclusiones y verificando que los montos finales de "quién debe a quién" son matemáticamente correctos.

**Acceptance Scenarios**:

1. **Given** Ana gastó $300 en "Carne" (dividido entre Ana y Juan), Juan gastó $100 en "Ensalada" (dividido entre los 3), María gastó $60 en "Pan" (dividido entre los 3), **When** el sistema calcula los balances, **Then** el cálculo considera que:
   - Carne: Ana y Juan deben $150 c/u (María no participa)
   - Ensalada: Los 3 deben $33.33 c/u
   - Pan: Los 3 deben $20 c/u
   - Total que debe cada uno: Ana=$150+$33.33+$20=$203.33, Juan=$150+$33.33+$20=$203.33, María=$33.33+$20=$53.33
   - Y las transacciones sugeridas reflejan correctamente estos balances contra lo que cada uno aportó.

---

### Edge Cases

- **¿Qué sucede si un item se queda sin participantes asignados?**
  R: El sistema NO DEBE permitir que un item tenga 0 participantes. Siempre debe haber al menos un participante asignado (como mínimo, el dueño del item que pagó).

- **¿Qué sucede si el dueño del item se desmarca a sí mismo?**
  R: El sistema DEBE permitir que el dueño se desmarque si hay otros participantes que dividen el item. El dueño pagó el item pero puede no consumirlo (ej: compró cerveza para otros pero él no bebe).

- **¿Qué sucede si se elimina un participante del grupo que estaba en varios items?**
  R: El sistema DEBE automáticamente remover a ese participante de la configuración de todos los items y recalcular los balances.

- **¿Qué sucede con items que ya existían antes de esta feature (migración)?**
  R: Los items sin configuración de participantes se asumen con TODOS los participantes del grupo incluidos (comportamiento legacy). No se requiere migración.

- **¿Cómo se manejan los redondeos cuando un item se divide entre un número impar de participantes?**
  R: El sistema debe mantener precisión de 2 decimales, distribuyendo cualquier diferencia de centavos de manera justa (ej: si $100 se divide entre 3, dos pagan $33.33 y uno paga $33.34).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE permitir configurar qué participantes participan en la división de cada item individual.
- **FR-002**: Cada item DEBE tener una lista de participantes asignados que puede ser editada por el usuario.
- **FR-003**: Por defecto, al crear un item, TODOS los participantes existentes del grupo deben estar marcados como participantes del item.
- **FR-004**: El sistema DEBE mostrar checkboxes (u otro control visual apropiado) junto a cada participante al configurar un item, permitiendo marcar/desmarcar su participación.
- **FR-005**: El sistema NO DEBE permitir que un item tenga 0 participantes asignados.
- **FR-006**: El sistema DEBE permitir que el dueño del item (quien pagó) se excluya a sí mismo de la división si hay otros participantes asignados.
- **FR-007**: Cuando se agrega un nuevo participante al grupo, el sistema DEBE automáticamente incluirlo en la división de todos los items existentes de todos los participantes.
- **FR-008**: Cuando se elimina un participante del grupo, el sistema DEBE automáticamente removerlo de la configuración de participantes de todos los items.
- **FR-009**: El sistema DEBE recalcular automáticamente todos los balances y transacciones sugeridas cuando cambia la configuración de participantes de cualquier item.
- **FR-010**: El cálculo de división de un item DEBE dividir el monto del item solo entre los participantes asignados a ese item.
- **FR-011**: El sistema DEBE mostrar visualmente qué participantes están incluidos/excluidos de cada item en la vista de detalle.
- **FR-012**: El sistema DEBE mantener compatibilidad con items existentes que no tengan configuración de participantes, asumiendo todos los participantes incluidos.
- **FR-013**: El sistema DEBE mantener precisión de 2 decimales en todos los cálculos, distribuyendo diferencias de redondeo de manera justa.

### Key Entities

- **Item** (modificado): Extiende la entidad Item existente agregando una lista de IDs de participantes que participan en la división de ese item. Esta lista puede contener desde 1 hasta N participantes (donde N es el total de participantes del grupo). Si la lista está vacía o no existe, se asume que todos los participantes están incluidos (compatibilidad legacy).

- **ItemParticipation**: Concepto que representa la relación entre un Item y los Participantes que lo dividen. No necesariamente es una entidad separada, puede ser un atributo del Item. Contiene: el identificador del item y la lista de IDs de participantes asignados.

- **Participant** (sin cambios estructurales): La entidad participante no requiere modificaciones. La relación se mantiene desde el Item hacia el Participante.

## Assumptions

- La aplicación continúa siendo stateless - los cálculos se realizan en el momento de la sesión actual sin persistencia entre sesiones.
- El orden de los participantes en la lista de asignación no afecta los cálculos.
- No hay límite en la cantidad de participantes que pueden ser asignados a un item (mínimo 1, máximo todos).
- La UI tendrá libertad de diseño para mostrar la configuración de participantes, priorizando accesibilidad y practicidad.
- Un participante puede tener items donde él mismo está excluido (pagó pero no consume).
- Los items de participantes sin configuración previa funcionan con todos los participantes incluidos (compatibilidad hacia atrás).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Los usuarios pueden configurar qué participantes dividen un item en menos de 10 segundos.
- **SC-002**: El 100% de los cálculos de división consideran correctamente los participantes asignados a cada item.
- **SC-003**: Los usuarios pueden identificar visualmente qué participantes están excluidos de un item en menos de 3 segundos.
- **SC-004**: Al agregar un nuevo participante, el 100% de los items existentes lo incluyen automáticamente sin intervención manual.
- **SC-005**: El sistema mantiene compatibilidad total con grupos configurados antes de esta feature (items sin configuración funcionan con todos los participantes).
- **SC-006**: Las transacciones sugeridas resultantes son matemáticamente correctas considerando las exclusiones configuradas.
