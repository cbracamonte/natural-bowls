# Natural Bowls

Guía ejecutiva para clientes y desarrolladores: visión de negocio, estándares técnicos, flujo de trabajo y puesta en marcha.

## 🥗 Negocio y propuesta de valor
- Bowls saludables, orgánicos y personalizables.
- Experiencia digital rápida y transparente (ingredientes y nutrición visibles).
- Delivery ágil y comunicación clara en todo el journey.

## 🧭 Flujo de trabajo (branches)
- `main` (protegida): solo merges vía PR aprobados.
- `dev`: rama base de desarrollo.
- Feature flow: `git checkout dev` → `git pull` → `git checkout -b feature/mi-feature` → PR a `dev` → luego PR de `dev` a `main`.

### 🔒 Protección de `main` en GitHub
1) Settings → Branches → Add branch protection rule.
2) Branch name pattern: `main`.
3) Requerir PR con al menos 1 aprobación y checks verdes (lint y build).
4) Bloquear pushes directos y exigir que la branch esté actualizada antes de merge.

## 📋 Requisitos previos
- Node.js ≥ 18 (LTS recomendado)
- npm / yarn / pnpm
- Git

Verifica versiones:
```bash
node --version
npm --version
```

## 🚀 Instalación rápida
```bash
git clone https://github.com/cbracamonte/natural-bowls.git
cd natural-bowls

# Frontend
cd frontend
npm install

# Backend (placeholder)
cd ../backend
npm install
```

Variables de entorno (frontend, `.env.local`):
```bash
NEXT_PUBLIC_BASE_URL=https://naturalbowls.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=   # opcional (Search Console)
```

## 🏃 Scripts (frontend)
```bash
npm run dev     # desarrollo
npm run lint    # lint
npm run build   # build producción
npm start       # servir build
```
Dev server: http://localhost:3000

## 📁 Arquitectura (frontend)
```
frontend/
├── app/                      # App Router
│   ├── layout.tsx            # Layout global (SEO, a11y, cookie banner)
│   ├── page.tsx              # Home
│   ├── bowls/                # Catálogo bowls
│   ├── carrito/              # Carrito
│   ├── checkout/             # Checkout
│   ├── confirmacion/         # Confirmación
│   ├── menu/                 # Menú (filtros + paginación)
│   ├── producto/[id]/        # Detalle dinámico
│   └── promociones/          # Promos
│
├── components/
│   ├── a11y/                 # Accesibilidad (SkipLink, etc.)
│   ├── layout/               # Header, Footer, CookieBanner
│   ├── home/, cart/, products/, ui/
│
├── lib/
│   ├── seo/                  # Metadata, viewport, constantes SEO
│   └── utils.ts              # Helpers
├── context/                  # Cart Context
├── data/                     # products.ts
├── types/                    # Tipos compartidos
└── public/                   # fonts, images, manifest, robots, sitemap
```

### Estándares clave
- App Router (Next 13+), SSR/SSG según ruta.
- SEO centralizado: metadata en `lib/seo` + componentes en `components/seo`.
- Accesibilidad: skip link, roles/aria, focus-visible, inputs con `aria-invalid`/`aria-describedby`.
- UX Compliance: cookie banner con consentimiento explícito.
- Estilos: Tailwind CSS v4; utilidades y layouts consistentes.

## 🛠 Stack
| Área | Tech | Notas |
| --- | --- | --- |
| Framework | Next.js 16.1.6 | App Router, SSR/SSG |
| UI | React 19.2.3 | Componentes |
| Lenguaje | TypeScript ^5 | Tipado estricto |
| Estilos | Tailwind CSS ^4 | Utility-first |
| Iconos | Lucide React ^0.563.0 | Iconografía |
| Calidad | ESLint ^9 | Linting |

## 🍪 SEO y cumplimiento
- Cookie banner (opt-in) persistido en localStorage.
- Robots.txt, sitemap.xml, manifest.json listos.
- Open Graph / Twitter Cards configurados.

## 📝 Flujo de usuario
1. Home con destacados y categorías.
2. Catálogo/Bowls con filtros y paginación.
3. Detalle de producto.
4. Carrito → Checkout → Confirmación.

## 🤝 Contribuir
1. Rama desde `dev`: `git checkout dev && git pull && git checkout -b feature/mi-feature`.
2. Ejecuta `npm run lint` y `npm run build` antes de subir.
3. `git push origin feature/mi-feature` y PR hacia `dev`.
4. Merge a `main` solo vía PR.

## 📞 Contacto
Soporte o bugs: abre un issue o escribe a info@naturalbowls.com.

## 📄 Licencia
Proyecto bajo licencia MIT. Ver [LICENSE](LICENSE) para detalles.

---

**Última actualización**: Febrero 2026
