```markdown
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
- **ESLint + Prettier** con hooks de Husky
- **i18n propio** (servicio de flags + futuro soporte de internacionalización)
- Animaciones planificadas con **CSS3 / Angular Animations**
- Posible integración futura con **Lottie** para animaciones JSON

---

## 📂 Estructura del proyecto

src/app
├─ app.routes.ts                # Definición de rutas principales
├─ app.config.ts                # Configuración global: router, http, NgRx store
├─ app.component.\*              # Shell con <router-outlet>
│
├─ core/                        # Servicios y guardas base
│   ├─ services/
│   │   ├─ api/                 # ApiService y endpoints BTP simulados
│   │   ├─ flags/               # LocalFlagsService (idioma, onboarding, userId)
│   │   └─ lottie/              # Servicio para animaciones Lottie (stub)
│   └─ guards/first-access.guard.ts
│
├─ state/                       # Store NgRx (reducers, actions, selectors)
│   ├─ reducers/                # Reducers generados para app/progress/stations/modules
│   └─ (future effects/)        # Efectos para llamadas a API
│
├─ features/
│   ├─ hope-moment/             # Pantalla inicial “Hope Moment”
│   ├─ landscape/               # Pantalla principal con mapa 2.5D
│   └─ (future: auth, loading)  # Login simulado y Splash screen
│
└─ shared/                      # (por crear) componentes reutilizables

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
````

* Esto significa que **antes de cada commit**, solo los archivos *staged* (`.ts`, `.html`, `.scss`) se pasan por:

  * `eslint --fix`
  * `prettier -w`

Así se asegura consistencia de estilo sin penalizar con un lint completo.

Si se quisiera saltar el hook porque se va con prisas:
```bash
    git commit -m "WIP" -n    # -n = --no-verify (salta Husky)
````

---

## 🌐 Flujo funcional actual

1. **Login simulado (pendiente de implementar)**

   * El usuario introduce un identificador
   * Se guarda en `localStorage.uid`

2. **Pantalla de Loading (pendiente)**

   * Animación de 3 segundos con spinner
   * Transición automática a HopeMoment

3. **HopeMoment** (`/hope`)

   * Primera pantalla tras el loading
   * Lugar donde se mostrarán animaciones y selección inicial de idioma/onboarding

4. **Landscape** (`/landscape`)

   * Mapa 2.5D con estaciones (aún en desarrollo)
   * Cada estación tendrá módulos de tipo: scroll, tap2reveal, quiz, true/false

---

## 📌 Rutas actuales (`app.routes.ts`)

* `/hope` → `HopeMomentComponent`
* `/landscape` → `LandscapeComponent`
* `''` → de momento apunta a `HopeMoment`
* Guard `first-access.guard` listo para redirigir a `/login` cuando se implemente

---

## 🔮 Próximos pasos sugeridos

1. Crear **LoginComponent** (`/login`) que guarde `uid` en `LocalFlagsService`.
2. Crear **SplashComponent** (`/loading`) con animación de 3 segundos antes de Hope.
3. Integrar **guard** `first-access.guard` para bloquear acceso sin `uid`.
4. Añadir modal de **selección de idioma** y **onboarding** tras Hope si los flags no existen.
5. Implementar API simulada (`ApiService`) con mocks de `GET /context/progress` y `GET /stations/:id`.
6. Construir la pantalla **Landscape** con SVG + CSS3, siguiendo la arquitectura de componentes.
7. Añadir módulos de contenido (scroll, reveal, quiz, tf) tal como aparece en el flujo de Figma.

---

## 📚 Documentación adicional

* **Arquitectura de componentes**: ver `Arquitectura_de_Componentes_para_Pre-Onboarding_Front_End 2.pptx`
* **Flujos de usuario y pantallas Hi-Fi**: ver `Hi-Fi- Preboarding 2.0.pdf`