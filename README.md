# MOEVE Preboarding Web

Aplicación Angular para la experiencia digital de **Pre-Onboarding de Moeve**.
El objetivo es guiar a los nuevos empleados a través de un recorrido gamificado, con estaciones temáticas, quizzes, módulos de contenido y elementos visuales en 2.5D, hasta completar la "moevización".

---

## 🚀 Stack Tecnológico

- **Angular 19.2** (standalone components + signals)
- **NgRx 19** para gestión de estado global
- **RxJS 7**
- **Angular Router** para la navegación
- **HttpClient** (con `proxy.conf.json` para desarrollo local)
- **Angular Material** Material Dialog para modales (idioma + onboarding)
- **ESLint + Prettier** con hooks de Husky
- **ngx-translate v17** (i18n runtime, archivos JSON)
- Animaciones planificadas con **CSS3 / Angular Animations**
- Posible integración futura con **Lottie** para animaciones JSON

---

## 📂 Estructura del proyecto
```bash
src/app
├─ app.routes.ts                # Definición de rutas principales
├─ app.config.ts                # Configuración global: router, http, NgRx store
├─ app.component.\*             # Shell con <router-outlet>
│
├─ core/                        # Servicios y guardas base
│   ├─ services/
│   │   ├─ auth.service.ts             # Fuente de verdad de sesión (authUser en localStorage)
│   │   ├─ prefs.service.ts            # Preferencias (lang, onboardingDone)
│   │   ├─ mock-data.service.ts        # Lee assets/mocks/context-progress.userX.json
│   │   ├─ api/                        # ApiService y endpoints BTP simulados
│   │   ├─ flags/                      # LocalFlagsService (idioma, onboarding, userId)
│   │   │   └─ local-flags.service.ts
│   │   └─ lottie/                     # Servicio para animaciones Lottie (stub)
│   └─ guards/first-access.guard.ts
│
├─ state/                       # Store NgRx (reducers, actions, selectors)
│   ├─ reducers/                # Reducers generados para app/progress/stations/modules
│   └─ (future effects/)        # Efectos para llamadas a API
│
├─ features/
│   ├─ auth/login/              # Login demo (elige Empleado 1/2)
│   ├─ loading/                 # Splash corto y redirección
│   ├─ hope-moment/             # Pantalla inicial “Hope Moment”
│   └─ landscape/               # Pantalla principal con mapa 2.5D + HUD + menú lateral
│
└─ shared/                      # (por crear) componentes reutilizables
    └─ ui/modal/                # ModalComponent (language | onboarding) con Angular Material
```

---

## 🛠️ Scripts disponibles

En `package.json`:

- `npm run start` → `ng serve` (servidor dev por defecto)
- `npm run start2` → `ng serve -o --proxy-config proxy.conf.json`
  - Abre el navegador automáticamente
  - Usa `proxy.conf.json` para redirigir `/api` evitando problemas de CORS
- `npm run build` → compila en modo producción
- `npm run lint` → ejecuta ESLint sobre el código
- `npm run prepare` → instala hooks de Husky (`husky install`)

---

## 🔒 Husky + lint-staged

- `.husky/pre-commit` contiene:
```bash
    npx lint-staged
```

* Esto significa que **antes de cada commit**, solo los archivos *staged* (`.ts`, `.html`, `.scss`) se pasan por:

  * `eslint --fix`
  * `prettier -w`

Así se asegura consistencia de estilo sin penalizar con un lint completo.

Si se quisiera saltar el hook porque se va con prisas:
```bash
    git commit -m "WIP" -n    # -n = --no-verify (salta Husky)
```

---

## 🌐 Flujo funcional actual

1. **Login demo (innecesario en la solución final)** (`/login`)

   * Elige Empleado 1/2. Se escribe authUser y (opcionalmente) onboardingDone = false.

2. **Pantalla de Loading** (`/loading`)

   * Animación de 3 segundos con spinner
   * Transición automática a HopeMoment

3. **HopeMoment** (`/hope`)

   * Lugar inicial de bienvenida  (video con scroll)

4. **Landscape** (`/landscape`)

   * Carga progreso desde assets/mocks/context-progress.userX.json.
   * HUD con moléculas, % completado y tiempo restante.
   * Menú lateral con estaciones.
   * Modales:
      * Si no hay idioma en PrefsService.lang, abre selección de idioma (Material).
      * Si PrefsService.onboardingDone === false, abre onboarding (Material).
   * El botón del menú lateral abre de nuevo el modal de idioma.

---

## 📌 Rutas actuales (`app.routes.ts`)

* `/hope` → `HopeMomentComponent`
* `/landscape` → `LandscapeComponent`
* `''` → de momento apunta a `HopeMoment`
* Guard `first-access.guard` listo para redirigir a `/login` cuando se implemente

---

## 🔮 Próximos pasos sugeridos

1. Implementar API simulada (`ApiService`) con mocks de `GET /context/progress` y `GET /stations/:id`.
2. Construir la pantalla **Landscape** con SVG + CSS3, siguiendo la arquitectura de componentes.
3. Añadir módulos de contenido (scroll, reveal, quiz, tf) tal como aparece en el flujo de Figma.

---

## 📚 Documentación adicional

* **Arquitectura de componentes**: ver `Arquitectura_de_Componentes_para_Pre-Onboarding_Front_End 2.pptx`
* **Flujos de usuario y pantallas Hi-Fi**: ver `Hi-Fi- Preboarding 2.0.pdf`


## 📚 Probar rápido desde GitHub Codespaces
   * Para desplegar en GitHub Codespaces:
      * Botón Code → Create codespace.
      * npm ci && npm run start -- --host 0.0.0.0 --port 4200