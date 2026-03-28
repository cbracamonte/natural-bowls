// components/seo/HeadScripts.tsx
// Scripts y meta tags adicionales para el <head>

export function HeadScripts() {
  return (
    <>
      {/* Preconnect a recursos externos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />

      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      {/* Web app capability (modern) */}
      <meta name="mobile-web-app-capable" content="yes" />
      {/* Apple legacy support */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Natural Bowls" />
    </>
  );
}
