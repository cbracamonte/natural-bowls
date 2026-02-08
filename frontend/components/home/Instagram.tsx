"use client";

import { useEffect } from "react";

interface InstagramPost {
  url: string;
  id: string;
}

// URLs de posts reales del perfil naturalbowls.cafe
// Actualiza estas URLs con los posts más recientes
const recentPosts: InstagramPost[] = [
  {
    url: "https://www.instagram.com/p/DT27FR5jV5K/",
    id: "1",
  },
  {
    url: "https://www.instagram.com/p/DS8bD4yidfO/",
    id: "2",
  },
  {
    url: "https://www.instagram.com/p/DQwhc_FDUZo/",
    id: "3",
  },
  {
    url: "https://www.instagram.com/p/DRAC-uqDSo_/",
    id: "4",
  },
];

export default function Instagram() {
  const posts = recentPosts;

  useEffect(() => {
    // Cargar el script embed de Instagram
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Procesar embeds después de que cargue
    if ((window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
      ((window as unknown as { instgrm?: { Embeds: { process: () => void } } }).instgrm as { Embeds: { process: () => void } }).Embeds.process();
    }
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 bg-monstera-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-4">
            Síguenos en Instagram
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Descubre nuestras creaciones, eventos y recetas en directo
          </p>
          <a
            href="https://www.instagram.com/naturalbowls.cafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6B8E4E] hover:bg-[#5D7A42] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
            </svg>
            @naturalbowls.cafe
          </a>
        </div>

        {/* Instagram Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="instagram-embed-wrapper p-4" style={{ display: "flex", justifyContent: "center" }}>
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={post.url}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: "0",
                    borderRadius: "3px",
                    boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                    margin: "1px",
                    maxWidth: "100%",
                    minWidth: "326px",
                    padding: "0",
                    width: "99.375%",
                  }}
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    Publicación de Instagram
                  </a>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            ¿Tienes una foto espectacular? Etiquétanos con{" "}
            <span className="font-semibold">#NaturalBowls</span>
          </p>
        </div>
      </div>
    </section>
  );
}
