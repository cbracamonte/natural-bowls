# Natural Bowls

## 🥗 Sobre Natural Bowls

Natural Bowls es una plataforma digital especializada en la venta de bowls saludables y nutritivos. Nuestro modelo de negocio se centra en ofrecer opciones de comida fresca, orgánica y personalizable a través de una experiencia de compra en línea intuitiva y eficiente.

### Propuesta de Valor

- **Comida Saludable**: Bowls elaborados con ingredientes frescos y orgánicos
- **Personalización**: Los clientes pueden customizar sus bowls según sus preferencias dietéticas
- **Entrega Rápida**: Opciones de delivery para mayor comodidad
- **Transparencia**: Información detallada de ingredientes y valores nutricionales

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (incluido con Node.js) o **yarn**/pnpm
- **Git** - [Descargar](https://git-scm.com/)

Verifica las versiones instaladas:

```bash
node --version
npm --version
```

---

## 🚀 Instalación y Setup

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tuusuario/natural-bowls.git
cd natural-bowls
```

### 2. Instalar Dependencias

El proyecto está dividido en dos carpetas principales: `frontend` y `backend`.

**Para el Frontend:**

```bash
cd frontend
npm install
```

Esto instalará todas las dependencias necesarias:
- Next.js 16.1.6
- React 19.2.3
- Tailwind CSS 4
- Lucide React (iconografía)
- TypeScript

**Para el Backend:**

```bash
cd ../backend
npm install
```

### 3. Configuración de Variables de Entorno

En la carpeta `frontend`, crea un archivo `.env.local` si es necesario:

```bash
cd frontend
touch .env.local
```

Agrega las variables de entorno requeridas (estas se proporcionarán en la documentación del equipo).

---

## 🏃 Ejecución del Proyecto

### Ejecutar el Frontend en Modo Desarrollo

```bash
cd frontend
npm run dev
```

El servidor de desarrollo estará disponible en: **http://localhost:3000**

### Ejecutar el Frontend en Producción

```bash
cd frontend
npm run build
npm start
```

### Linting

Para verificar la calidad del código:

```bash
npm run lint
```

---

## 📁 Arquitectura del Frontend

La estructura del frontend sigue una arquitectura modular y escalable:

```
frontend/
├── app/                      # Rutas y layout principal de Next.js
│   ├── layout.tsx            # Layout global
│   ├── page.tsx              # Página principal (home)
│   ├── globals.css           # Estilos globales
│   ├── bowls/                # Página de catálogo de bowls
│   ├── carrito/              # Página del carrito de compras
│   ├── checkout/             # Página de checkout
│   ├── confirmacion/         # Página de confirmación de pedido
│   ├── menu/                 # Página del menú
│   ├── producto/[id]/        # Página de detalle de producto (dinámica)
│   └── promociones/          # Página de promociones
│
├── components/               # Componentes reutilizables
│   ├── cart/                 # Componentes del carrito
│   │   ├── CartItem.tsx      # Ítem individual del carrito
│   │   └── CartSummary.tsx   # Resumen del carrito
│   ├── home/                 # Componentes de la página principal
│   │   ├── Categories.tsx    # Sección de categorías
│   │   ├── Featured.tsx      # Productos destacados
│   │   ├── Hero.tsx          # Banner principal
│   │   ├── HowItWorks.tsx    # Cómo funciona el servicio
│   │   ├── Newsletter.tsx    # Suscripción a newsletter
│   │   └── Values.tsx        # Valores de la empresa
│   ├── layout/               # Componentes de layout
│   │   ├── Footer.tsx        # Pie de página
│   │   └── Header.tsx        # Encabezado/Navegación
│   ├── products/             # Componentes de productos
│   │   ├── ProductCard.tsx   # Tarjeta de producto
│   │   └── ProductGrid.tsx   # Grid de productos
│   └── ui/                   # Componentes UI genéricos
│       ├── Badge.tsx         # Badge/Etiqueta
│       ├── Button.tsx        # Botón
│       └── Input.tsx         # Campo de entrada
│
├── context/                  # Context API de React
│   └── CartContext.tsx       # Contexto para el carrito de compras
│
├── data/                     # Datos estáticos
│   └── products.ts           # Catálogo de productos
│
├── types/                    # Definiciones de tipos TypeScript
│   └── index.ts              # Tipos compartidos
│
├── lib/                      # Utilidades y helpers
│   └── utils.ts              # Funciones utilitarias
│
├── public/                   # Archivos estáticos
│   ├── fonts/                # Tipografías personalizadas
│   └── images/               # Imágenes del proyecto
│
├── package.json              # Dependencias del proyecto
├── tsconfig.json             # Configuración de TypeScript
├── next.config.ts            # Configuración de Next.js
└── tailwind.config.js        # Configuración de Tailwind CSS
```

### Patrones Arquitectónicos

#### 1. **App Router (Next.js 13+)**
- Usando el App Router para una mejor organización de rutas
- Estructura basada en carpetas que corresponden a rutas

#### 2. **Component-Based Architecture**
- Componentes reutilizables en la carpeta `components/`
- Separación clara entre componentes de página y componentes UI

#### 3. **Context API**
- Gestión del estado global con `CartContext`
- Permite pasar datos del carrito entre componentes sin prop drilling

#### 4. **Type Safety**
- TypeScript configurado para type-checking completo
- Tipos centralizados en `types/index.ts`

#### 5. **Styling**
- Tailwind CSS v4 para estilos utilitarios
- PostCSS para procesamiento de CSS
- Estilos globales en `globals.css`

---

## 🛠 Stack Tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Next.js | 16.1.6 | Framework React/SSR |
| React | 19.2.3 | Librería UI |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | ^4 | Utilidades de estilos |
| Lucide React | ^0.563.0 | Iconos |

### Herramientas y Configuración
| Herramienta | Versión | Propósito |
|-----------|---------|----------|
| ESLint | ^9 | Linting de código |
| PostCSS | @tailwindcss/postcss | Procesamiento de CSS |

---

## 📝 Flujo de Uso

1. **Home**: El usuario llega a la página principal con categorías y productos destacados
2. **Catálogo**: Explora los diferentes bowls disponibles
3. **Detalle**: Ver información completa de un bowl específico
4. **Carrito**: Agregar productos al carrito
5. **Checkout**: Revisa el carrito y procede al pago
6. **Confirmación**: Recibe confirmación del pedido

---

## 🤝 Contribuir

Para contribuir al proyecto:

1. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
2. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
3. Push a la rama (`git push origin feature/AmazingFeature`)
4. Abre un Pull Request

---

## 📞 Contacto y Soporte

Para preguntas o reportar bugs, por favor abre un issue en el repositorio o contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto está bajo licencia [ESPECIFICAR LICENCIA]. Ver archivo `LICENSE` para más detalles.

---

**Última actualización**: Febrero 2026
