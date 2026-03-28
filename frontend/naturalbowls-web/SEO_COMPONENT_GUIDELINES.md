// Recomendaciones SEO para Componentes Principales
// Guía de implementación para el equipo

/**
 * ============================================================================
 * HEADER.TSX - Optimizaciones SEO
 * ============================================================================
 * 
 * RECOMENDACIONES:
 * 
 * 1. Logo como <a> tag con proper semantics:
 *    - Logo debe linkear a home (/)
 *    - Usar <img> tag con alt text descriptivo
 *    - Considerar usar <picture> para múltiples formatos
 * 
 * 2. Navegación:
 *    - Usar <nav> tag con aria-label
 *    - Links internos relativos (/menu, /bowls, etc)
 *    - Structured links list
 * 
 * 3. Busca rápida:
 *    - Implementar búsqueda con formulario
 *    - Agregar aria-label para accesibilidad
 *    - Usar debounce para peticiones al servidor
 * 
 * EJEMPLO:
 * 
 * <header>
 *   <nav className="flex items-center justify-between">
 *     <a href="/" className="flex items-center gap-2" title="Natural Bowls Home">
 *       <img src="/logo.svg" alt="Natural Bowls Logo" width={40} height={40} />
 *       <span className="font-bold text-xl">Natural Bowls</span>
 *     </a>
 *     
 *     <nav aria-label="main navigation">
 *       <ul className="flex gap-6">
 *         <li><a href="/menu" className="hover:text-green-600">Menú</a></li>
 *         <li><a href="/bowls" className="hover:text-green-600">Bowls</a></li>
 *         <li><a href="/promociones" className="hover:text-green-600">Promociones</a></li>
 *       </ul>
 *     </nav>
 *   </nav>
 * </header>
 */

/**
 * ============================================================================
 * HERO.TSX - Optimizaciones SEO
 * ============================================================================
 * 
 * RECOMENDACIONES:
 * 
 * 1. Heading Hierarchy:
 *    - SIEMPRE usar <h1> una sola vez por página
 *    - Hero debe contener el h1 principal
 *    - Siguiente heading debe ser <h2>, luego <h3>, sin saltos
 * 
 * 2. Imágenes:
 *    - Usar next/image para optimización automática
 *    - Definir aspectRatio y sizes prop
 *    - Lazy loading automático
 *    - WebP conversion automático
 * 
 * 3. CTA Buttons:
 *    - Text debe ser descriptivo (no solo "Click here")
 *    - Buen contrast para accesibilidad
 *    - Mobile optimized tap targets (min 44x44px)
 * 
 * EJEMPLO:
 * 
 * export default function Hero() {
 *   return (
 *     <section className="relative h-screen flex items-center">
 *       <div className="absolute inset-0">
 *         <Image
 *           src="/hero-background.jpg"
 *           alt="Fresh organic bowls from Natural Bowls"
 *           fill
 *           className="object-cover"
 *           priority // Critical LCP image
 *           sizes="100vw"
 *           quality={85}
 *         />
 *       </div>
 *       
 *       <div className="relative z-10 container mx-auto text-center text-white">
 *         <h1 className="text-4xl md:text-6xl font-bold mb-4">
 *           Comida Saludable y Deliciosa
 *         </h1>
 *         <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
 *           Diseños personalizables. Ingredientes frescos. Entrega rápida.
 *         </p>
 *         <a href="/menu" className="bg-green-600 px-8 py-3 rounded-lg hover:bg-green-700">
 *           Explorar Menú
 *         </a>
 *       </div>
 *     </section>
 *   );
 * }
 */

/**
 * ============================================================================
 * PRODUCTGRID.TSX & PRODUCTCARD.TSX - Optimizaciones SEO
 * ============================================================================
 * 
 * RECOMENDACIONES:
 * 
 * 1. ProductCard:
 *    - Usar <article> wrapper
 *    - Alt text descriptivo para imágenes
 *    - Link al detalle del producto con aria-label
 *    - Rating schema integrado
 * 
 * 2. ProductGrid:
 *    - Usar <section> con aria-label="Products"
 *    - Implementar lazy loading para imágenes
 *    - Pagination SEO-friendly con links reales
 * 
 * 3. Preloading:
 *    - Preload critical product images
 *    - Prefetch siguientes páginas
 * 
 * EJEMPLO:
 * 
 * export default function ProductCard({ product }: { product: Product }) {
 *   return (
 *     <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
 *       <a href={`/producto/${product.id}`} title={product.name}>
 *         <Image
 *           src={product.image}
 *           alt={`${product.name} - ${product.description}`}
 *           width={300}
 *           height={300}
 *           className="w-full object-cover"
 *           loading="lazy"
 *         />
 *       </a>
 *       
 *       <div className="p-4">
 *         <h3 className="text-lg font-bold mb-2">
 *           <a href={`/producto/${product.id}`}>{product.name}</a>
 *         </h3>
 *         <p className="text-gray-600 text-sm mb-3">{product.description}</p>
 *         <div className="flex justify-between items-center">
 *           <span className="text-2xl font-bold text-green-600">${product.price}</span>
 *           <div className="text-yellow-500">
 *             ★ {product.rating} ({product.reviews} reviews)
 *           </div>
 *         </div>
 *       </div>
 *     </article>
 *   );
 * }
 */

/**
 * ============================================================================
 * FOOTER.TSX - Optimizaciones SEO
 * ============================================================================
 * 
 * RECOMENDACIONES:
 * 
 * 1. Link Structure:
 *    - Organized link groups por categoría
 *    - Links a páginas principales
 *    - Links a políticas (Privacy, Terms, etc.)
 * 
 * 2. Contact Information:
 *    - Email como mailto: link
 *    - Teléfono como tel: link
 *    - Dirección con structured data
 * 
 * 3. Social Links:
 *    - Links a perfiles sociales con rel="me"
 *    - Alt text para iconos
 * 
 * EJEMPLO:
 * 
 * export default function Footer() {
 *   return (
 *     <footer className="bg-gray-900 text-white py-12">
 *       <div className="container mx-auto">
 *         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
 *           {/* Brand */}
 *           <div>
 *             <h3 className="font-bold text-lg mb-4">Natural Bowls</h3>
 *             <p className="text-gray-400">Comida saludable, deliciosa y personalizable.</p>
 *           </div>
 *           
 *           {/* Links */}
 *           <nav aria-label="Footer products">
 *             <h4 className="font-bold mb-4">Productos</h4>
 *             <ul className="space-y-2">
 *               <li><a href="/bowls" className="text-gray-400 hover:text-white">Bowls</a></li>
 *               <li><a href="/menu" className="text-gray-400 hover:text-white">Menú</a></li>
 *               <li><a href="/promociones" className="text-gray-400 hover:text-white">Promociones</a></li>
 *             </ul>
 *           </nav>
 *           
 *           {/* Company */}
 *           <nav aria-label="Footer company">
 *             <h4 className="font-bold mb-4">Empresa</h4>
 *             <ul className="space-y-2">
 *               <li><a href="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</a></li>
 *               <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
 *               <li><a href="/careers" className="text-gray-400 hover:text-white">Trabajar Aquí</a></li>
 *             </ul>
 *           </nav>
 *           
 *           {/* Legal */}
 *           <nav aria-label="Footer legal">
 *             <h4 className="font-bold mb-4">Legal</h4>
 *             <ul className="space-y-2">
 *               <li><a href="/privacy" className="text-gray-400 hover:text-white">Privacidad</a></li>
 *               <li><a href="/terms" className="text-gray-400 hover:text-white">Términos</a></li>
 *               <li><a href="/cookies" className="text-gray-400 hover:text-white">Cookies</a></li>
 *             </ul>
 *           </nav>
 *         </div>
 *         
 *         {/* Contact & Social */}
 *         <div className="border-t border-gray-800 pt-8">
 *           <div className="flex flex-col md:flex-row justify-between items-center">
 *             <div className="space-y-2">
 *               <p><a href="mailto:info@naturalbowls.com">info@naturalbowls.com</a></p>
 *               <p><a href="tel:+1555123456">+1 (555) 123-456</a></p>
 *             </div>
 *             
 *             <div className="flex gap-4">
 *               <a href="https://facebook.com/naturalbowls" rel="me" aria-label="Facebook">
 *                 <span className="sr-only">Facebook</span>
 *               </a>
 *               <a href="https://instagram.com/naturalbowls" rel="me" aria-label="Instagram">
 *                 <span className="sr-only">Instagram</span>
 *               </a>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *     </footer>
 *   );
 * }
 */

/**
 * ============================================================================
 * IMAGEN OPTIMIZATION - BEST PRACTICES
 * ============================================================================
 * 
 * 1. SIEMPRE usar next/image en lugar de <img>
 * 
 * 2. Definir dimensiones:
 *    - width y height para evitar layout shift
 *    - Aspect ratio correcta
 *    - Sizes prop para responsive
 * 
 * 3. Quality y formato:
 *    - quality={85} para balance entre calidad y tamaño
 *    - Next.js convierte automático a WebP
 * 
 * 4. Loading strategy:
 *    - priority={true} para critical images (Hero, LCP)
 *    - loading="lazy" para otras imágenes
 * 
 * 5. Responsive:
 *    - sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 * 
 * EJEMPLO CORRECTO:
 * 
 * <Image
 *   src="/products/poke-hawaii.jpg"
 *   alt="Poke Bowl Hawaii con salmón fresco y aguacate"
 *   width={600}
 *   height={600}
 *   className="w-full object-cover"
 *   priority={false}
 *   loading="lazy"
 *   quality={85}
 *   sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
 * />
 */

/**
 * ============================================================================
 * INTERNAL LINKING STRATEGY
 * ============================================================================
 * 
 * Crear una malla interna fuerte:
 * 
 * Homepage → Links a:
 *   - /menu (high priority)
 *   - /bowls (high priority)
 *   - /promociones (medium priority)
 *   - /carrito, /checkout (low priority)
 * 
 * Category Pages → Links a:
 *   - Productos específicos
 *   - Categorías relacionadas
 *   - Volver a homepage
 * 
 * Producto Detail → Links a:
 *   - Productos relacionados (mismo creador)
 *   - Categoría padre
 *   - Homepage
 * 
 * Footer → Links a:
 *   - Todas las páginas principales
 *   - Páginas legales
 *   - Social media
 * 
 * REGLA IMPORTANTE: No más de 3 clicks desde homepage a cualquier página
 */

/**
 * ============================================================================
 * META TAGS POR PÁGINA
 * ============================================================================
 * 
 * Cada página debe generar dinámicamente su metadata:
 * 
 * Homepage: titles y descriptions generales
 * Category: titles con nombre de categoría
 * Product: title con nombre del producto
 * Blog: title con nombre del artículo
 * 
 * PATRÓN:
 * - Primary keyword al inicio
 * - Secondary keywords intercalados
 * - Brand name al final
 * - Maximum 60 caracteres para title
 * - Maximum 160 caracteres para description
 */


