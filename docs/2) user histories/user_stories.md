# SmartQR Tool  
**User Stories (v1) - English**  
📅 *February 3, 2026*

---

## 👥 Roles
- Operator  
- Supervisor  
- Administrator  

---

## 📘 User Stories (US)

---

## 🔐 US-01 — User Authentication (Administrator / Supervisor / Operator)

**As a user**, I want to log in to access the system securely.

### Acceptance Criteria
- The system must allow access when the username and password are correct.  
- The system must redirect the user to the appropriate view according to their role.  
- The system must deny access when the username or password is incorrect.  
- The system must record the login action in the activity log.

---

## 🛠️ Administrator (US-02 to US-06)

---

### US-02 — User Management

**As an administrator**, I want to create, edit, and delete users in the system to control who has access to the functionalities.

#### Acceptance Criteria
- The administrator must be authenticated in the system.  
- The system must perform CRUD operations on the specified user.  
- The system must request confirmation for any CRUD action.  
- The system must notify success when a CRUD action is completed.  
- The system must notify failure if a CRUD action cannot be completed.  
- The system must save successful CRUD actions in the activity log.

---

### US-03 — Product Management

**As an administrator**, I want to create, edit, and delete products in the system to keep the product catalog updated.

#### Acceptance Criteria
- The administrator must be authenticated in the system.  
- The system must perform CRUD operations on the specified product.  
- The system must request confirmation for any CRUD action.  
- The system must notify success when a CRUD action is completed.  
- The system must notify failure if a CRUD action cannot be completed.  
- The system must save successful CRUD actions in the activity log.

---

### US-04 — Batch Management

**As an administrator**, I want to create, edit, and delete batches associated with a product to properly manage batch-based production.

#### Acceptance Criteria
- The administrator must be authenticated in the system.  
- The system must perform CRUD operations on the specified batch.  
- The system must request confirmation for any CRUD action.  
- The system must notify success when a CRUD action is completed.  
- The system must notify failure if a CRUD action cannot be completed.  
- The system must save successful CRUD actions in the activity log.

---

### US-05 — Unlimited QR Code Generation (Exceptional Case)

**As an administrator**, I want to generate a set of QR codes associated with a specific product and batch without limits, in order to resolve exceptional administrative incidents.

#### Acceptance Criteria
- The administrator must be authenticated in the system.  
- The system must generate QR codes for a specific product and batch an unlimited number of times.  
- The system must save in the activity log every time QR codes are generated for a specific product and batch.

---

### US-06 — Activity Log Review

**As an administrator**, I want to view the system activity log to audit system usage and detect possible errors or irregularities.

#### Acceptance Criteria
- The administrator must be authenticated in the system.  
- The system must display the activity log view.

---

## 👨‍🏭 Supervisor (US-07 / US-08)

---

### US-07 — Limited QR Code Generation (5 attempts)

**As a supervisor**, I want to generate QR codes for a specific product and batch with a maximum limit of five (5) regenerations, in order to resolve operational issues without compromising system control.

#### Acceptance Criteria
- The supervisor must be authenticated in the system.  
- The system must generate QR codes for a specific product and batch up to a maximum of five times.  
- The system must block QR code generation for a specific product and batch once the limit of five attempts is reached.  
- The system must save in the activity log every time QR codes are generated for a specific product and batch.

---

### US-08 — Activity Log Review

**As a supervisor**, I want to view the system activity log to audit system usage and detect possible errors or irregularities.

#### Acceptance Criteria
- The supervisor must be authenticated in the system.  
- The system must display the activity log view.

---

## 👷 Operator (US-09)

---

### US-09 — Limited QR Code Generation (3 attempts)

**As an operator**, I want to generate QR codes for a specific product and batch with a maximum limit of three (3) regenerations, in order to resolve minor issues without compromising system control.

#### Acceptance Criteria
- The operator must be authenticated in the system.  
- The system must generate QR codes for a specific product and batch up to a maximum of three times.  
- The system must block QR code generation for a specific product and batch once the limit of three attempts is reached.  
- The system must save in the activity log every time QR codes are generated for a specific product and batch.

---

---

# SmartQR Tool  
**Historias de Usuario (v1) - Español**  
📅 *3 de febrero de 2026*

---

## 👥 Roles
- Operario  
- Supervisor  
- Administrador  

---

## 📘 Historias de Usuario (HU)

---

## 🔐 HU-01 — Autenticación de usuario (Administrador / Supervisor / Operario)

**Como usuario**, quiero iniciar sesión para acceder al sistema de manera segura.

### Criterios de aceptación
- El sistema debe permitir el acceso cuando el usuario y la contraseña sean correctos.  
- El sistema debe redirigir al usuario a la vista correspondiente según su rol.  
- El sistema debe denegar el acceso cuando el usuario o la contraseña sean incorrectos.  
- El sistema debe registrar el inicio de sesión en el historial de acciones.

---

## 🛠️ Administrador (HU-02 a HU-06)

---

### HU-02 — Gestión de usuarios

**Como administrador**, quiero crear, editar y eliminar usuarios en el sistema para controlar quién tiene acceso a las funcionalidades.

#### Criterios de aceptación
- El administrador debe estar autenticado en el sistema.  
- El sistema debe realizar las acciones CRUD con el usuario indicado.  
- El sistema debe solicitar confirmación para cualquiera de las acciones CRUD.  
- El sistema debe notificar el éxito al realizar alguna de las acciones CRUD.  
- El sistema debe notificar si se fracasa en alguna de las acciones CRUD.  
- El sistema debe guardar en el historial cualquiera de las acciones CRUD que se realicen con éxito.

---

### HU-03 — Gestión de productos

**Como administrador**, quiero crear, editar y eliminar productos en el sistema para mantener actualizado el catálogo de productos.

#### Criterios de aceptación
- El administrador debe estar autenticado en el sistema.  
- El sistema debe realizar las acciones CRUD con el producto indicado.  
- El sistema debe solicitar confirmación para cualquiera de las acciones CRUD.  
- El sistema debe notificar el éxito al realizar alguna de las acciones CRUD.  
- El sistema debe notificar si se fracasa en alguna de las acciones CRUD.  
- El sistema debe guardar en el historial cualquiera de las acciones CRUD que se realicen con éxito.

---

### HU-04 — Gestión de lotes

**Como administrador**, quiero crear, editar y eliminar lotes asociados a un producto para gestionar correctamente la producción por lotes.

#### Criterios de aceptación
- El administrador debe estar autenticado en el sistema.  
- El sistema debe realizar las acciones CRUD con el lote indicado.  
- El sistema debe solicitar confirmación para cualquiera de las acciones CRUD.  
- El sistema debe notificar el éxito al realizar alguna de las acciones CRUD.  
- El sistema debe notificar si se fracasa en alguna de las acciones CRUD.  
- El sistema debe guardar en el historial cualquiera de las acciones CRUD que se realicen con éxito.

---

### HU-05 — Generación ilimitada de códigos QR (caso excepcional)

**Como administrador**, quiero generar un conjunto de códigos QR asociados a un producto y a un lote específico sin límite, para resolver incidencias administrativas de manera excepcional.

#### Criterios de aceptación
- El administrador debe estar autenticado en el sistema.  
- El sistema debe generar códigos QR para un lote y producto determinado una cantidad indeterminada de veces.  
- El sistema debe guardar en el historial cada vez que se generen códigos QR para un lote y producto específicos.

---

### HU-06 — Consulta del historial

**Como administrador**, quiero consultar el historial de acciones realizadas en el sistema para auditar el uso del sistema y detectar posibles errores o irregularidades.

#### Criterios de aceptación
- El administrador debe estar autenticado en el sistema.  
- El sistema debe mostrar la vista del historial de acciones.

---

## 👨‍🏭 Supervisor (HU-07 / HU-08)

---

### HU-07 — Generación limitada de códigos QR (5 intentos)

**Como supervisor**, quiero generar códigos QR para un producto y lote específico con un límite máximo de cinco (5) regeneraciones, para resolver incidencias operativas sin comprometer el control del sistema.

#### Criterios de aceptación
- El supervisor debe estar autenticado en el sistema.  
- El sistema debe generar códigos QR para un lote y producto determinado hasta un límite de cinco veces.  
- El sistema debe bloquear la generación de códigos QR para un producto y lote específico si se alcanza el límite de cinco intentos.  
- El sistema debe guardar en el historial cada vez que se generen códigos QR para un lote y producto específicos.

---

### HU-08 — Consulta del historial

**Como supervisor**, quiero consultar el historial de acciones realizadas en el sistema para auditar el uso del sistema y detectar posibles errores o irregularidades.

#### Criterios de aceptación
- El supervisor debe estar autenticado en el sistema.  
- El sistema debe mostrar la vista del historial de acciones.

---

## 👷 Operario (HU-09)

---

### HU-09 — Generación limitada de códigos QR (3 intentos)

**Como operario**, quiero generar códigos QR para un producto y lote específico con un límite máximo de tres (3) regeneraciones, para resolver inconvenientes menores sin comprometer el control del sistema.

#### Criterios de aceptación
- El operario debe estar autenticado en el sistema.  
- El sistema debe generar códigos QR para un lote y producto determinado hasta un límite de tres veces.  
- El sistema debe bloquear la generación de códigos QR para un producto y lote específico si se alcanza el límite de tres intentos.  
- El sistema debe guardar en el historial cada vez que se generen códigos QR para un lote y producto específicos.
