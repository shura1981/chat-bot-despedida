---
applyTo: '**/*.{ts,js}'
description: Pautas y mejores prácticas para código TypeScript y JavaScript usando Biome como linter
---

# Instrucciones para TypeScript/JavaScript

Este archivo define las pautas y mejores prácticas que el agente de IA debe seguir al generar o modificar código TypeScript/JavaScript en archivos `.ts` y `.js`.

**Linter:** Biome (formateador y linter todo-en-uno)
**Compatible con:** Node.js ≥14, TypeScript 4.x/5.x, CommonJS y ES Modules


## 🧠 Principios Generales

- **Calidad > Velocidad**: Prioriza código legible, mantenible y correcto sobre código rápido.
- **Encapsulación y cohesión**: Agrupa lógica relacionada (funciones, clases, módulos); evita funciones/metodos con múltiples responsabilidades.
- **DRY (Don’t Repeat Yourself)**: Extrae lógica repetida a funciones, utilidades o módulos reutilizables.
- **Early return**: Usa retornos tempranos para reducir anidamiento y mejorar claridad.
- **Inmutabilidad tanto como sea posible**: Prefiere `const`, evita mutar objetos/arrays directamente (usa `...`, `map`, `filter`, `Object.assign`, etc.).
- **Tipado explícito**: En TypeScript, tipa todo (parámetros, retornos, variables cuando no es inferible). Evita `any`.

---

## 📏 Convenciones de Código

### ✅ Estilo y Formato

- Usa **Biome** como linter y formateador único.
- Ejecuta `npx @biomejs/biome check --apply .` para formatear y aplicar correcciones automáticas.
- Usa **2 espacios** para indentación.
- Usa comillas **dobles** (`"`) para strings (consistente con configuración de Biome).
- Nombres de variables/funciones: **camelCase**.
- Nombres de clases/interfaces/tipos: **PascalCase**.
- Constantes globales (solo si realmente globales e inmutables): **UPPER_SNAKE_CASE**.
- Archivos: **PascalCase** para clases principales (ej. `TaskController.ts`), **kebab-case** para utilidades y rutas (ej. `task.routes.ts`, `helper-functions.ts`).

### ✅ Declaraciones y Asignaciones

```ts
// ✅ Bien
const user = { name: "Steven", age: 30 };
let score = 0;

// ❌ Evitar
var user = { name: "Steven", age: 30 }; // `var` está desaconsejado
```

---

## 🧩 Estructura de Funciones y Lógica

### ✅ Early Return

```ts
function processUser(user: User | null): void {
  if (!user) return; // early return
  if (!user.isActive) return;

  // lógica principal aquí, sin anidamiento innecesario
  sendWelcomeEmail(user);
}
```

### ✅ Short-circuit / Guard Clauses

```ts
// ✅ Bien: ejecución condicional con &&
isLoggedIn && fetchUserData();
hasPermission && updateUserRole(role);

// ✅ Alternativa explícita (mejor si hay efectos secundarios complejos)
if (isLoggedIn) {
  await fetchUserData();
}
```

> ⚠️ Evita encadenar múltiples `&&` en una sola línea si reduce legibilidad (>2 condiciones).

---

## 📦 Organización de Código

- **Una responsabilidad por función/método**: cada función debe hacer una sola cosa y hacerla bien.
- **Módulos pequeños**: un archivo debe tener ≤ 200 líneas (idealmente <100).
- **Separación de capas**: 
  - `utils/`: funciones puras, sin efectos secundarios.
  - `services/`: lógica de negocio, coordinación de llamadas.
  - `controllers/` o `handlers/`: manejo de entrada/salida (HTTP, eventos).
  - `models/`: tipos e interfaces (evita `any`, define DTOs/entidades con precisión).

---

## 🔌 Node.js (≥14)

### Sistema de Módulos

- **Detecta el sistema de módulos del proyecto:**
  - `"type": "module"` en `package.json` → **ES Modules (ESM)**
  - `module: "commonjs"` en `tsconfig.json` → **CommonJS (CJS)**
  - Sin especificar → por defecto **CommonJS**

- **ES Modules (ESM):**
  ```ts
  import { readFile } from "node:fs/promises";
  export const myFunction = () => {};
  export default class MyClass {}
  // Requiere extensión en imports locales:
  import { helper } from "./utils/helper.js"; // ✅
  ```

- **CommonJS (CJS):**
  ```ts
  import { readFile } from "node:fs/promises"; // En TS
  export const myFunction = () => {}; // TypeScript lo compila a module.exports
  // Sin extensión en imports:
  import { helper } from "./utils/helper"; // ✅
  ```

### Características Modernas (Node.js ≥14)

- ✅ **Optional chaining:** `user?.profile?.name`
- ✅ **Nullish coalescing:** `const port = config.port ?? 3000`
- ✅ **BigInt, Promise.allSettled, String.prototype.matchAll**
- ✅ **Prefijo `node:`** para módulos built-in (recomendado desde Node.js 14.18+)
- ⚠️ **Top-level await:** solo en ES Modules, NO en CommonJS

---

## 🧪 Manejo de Errores

- **Nunca ignores errores**.
- Usa `try/catch` con tipado del error:
  ```ts
  try {
    await fetchData();
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Fetch failed", { message: error.message, stack: error.stack });
    } else {
      logger.error("Unknown error", { error });
    }
    throw new CustomError("DATA_FETCH_FAILED", { cause: error });
  }
  ```
- Define errores personalizados con clase:
  ```ts
  class CustomError extends Error {
    constructor(public code: string, options?: { cause?: unknown }) {
      super(`[${code}]`);
      this.name = "CustomError";
      if (options?.cause) this.cause = options.cause;
    }
  }
  ```

---

## 🧼 Código Limpio (Clean Code)

- **Nombres significativos**: `calculateTax()` > `calc()`, `isValidEmail()` > `check()`.
- **Funciones cortas**: idealmente ≤ 10 líneas; máximo 20.
- **Comentarios solo para *por qué***, no para *qué* hace el código.
- **Evita flags booleanos como parámetros** → extrae a funciones separadas:
  ```ts
  // ❌
  processOrder(order, true); // ¿qué significa `true`?

  // ✅
  processOrderWithValidation(order);
  processOrderWithoutValidation(order);
  ```

---

## 🛡️ TypeScript Específico

### Preferencias de Tipos

- **Type vs Interface:**
  - `type` para primitivos, unions, intersections, mapped types
  - `interface` para shapes de objetos que se extienden
  ```ts
  type Status = "active" | "inactive"; // ✅
  interface User { name: string; email: string; } // ✅
  ```

- **Evita `any`** a toda costa:
  ```ts
  // ❌ Malo
  function process(data: any) {}
  
  // ✅ Mejor
  function process(data: unknown) {
    if (typeof data === "string") {
      // ahora TypeScript sabe que es string
    }
  }
  ```

### Tipado Estricto

- **Respeta `strict: true`** si está habilitado en el proyecto.
- Usa `as const` para literales inmutables:
  ```ts
  const STATUS = ["active", "inactive"] as const;
  type Status = typeof STATUS[number]; // "active" | "inactive"
  ```

### Compatibilidad de Sintaxis

- **TypeScript transpila automáticamente** características modernas según el `target`.
- Puedes usar sintaxis ES2020+ (optional chaining, nullish coalescing) sin importar el `target`.
- TypeScript se encarga de la compatibilidad:
  ```ts
  // Escribe esto (ES2020+):
  const name = user?.profile?.name ?? "Unknown";
  
  // TypeScript lo compila a ES2018 si es necesario:
  // var name = ((user === null || user === void 0 ? void 0 : user.profile) === null || ...)
  ```

---

## ✅ Ejemplo Integrado (Buenas Prácticas Aplicadas)

```ts
// utils/validation.ts
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// services/user.service.ts
import { isValidEmail } from "../utils/validation.js";

interface CreateUserParams {
  name: string;
  email: string;
}

export class UserService {
  async createUser({ name, email }: CreateUserParams) {
    // Early validation
    if (!name.trim()) throw new Error("NAME_REQUIRED");
    if (!isValidEmail(email)) throw new Error("INVALID_EMAIL");

    // Encapsulación: delega generación de ID
    const id = generateUserId();

    // Encapsulación: delega persistencia
    const user = await this.userRepository.create({ id, name, email });

    // Early return: no enviar email si no está activo (ej. demo)
    if (!user.isActive) return user;

    // Short-circuit: solo envía si está configurado
    this.config.sendWelcomeEmail && await this.emailService.sendWelcome(user);

    return user;
  }
}
```

---

## 🚫 Anti-patrones Prohibidos

| ❌ Anti-patrón                 | ✅ Alternativa                     |
|-------------------------------|-----------------------------------|
| `any`                         | `unknown` + validación o tipado preciso |
| `var`                         | `const` / `let`                   |
| `==` / `!=`                   | `===` / `!==`                     |
| Funciones con >3 parámetros   | Usa un objeto de configuración (`options`) |
| `console.log` en producción   | Usa logger tipado (ej. `pino`, `winston`) |
| Lógica de negocio en controladores | Extraer a servicios/utilidades |

---

> ✅ **Recuerda**: El objetivo es código que un humano pueda leer, entender y modificar *con confianza* — no solo que funcione.