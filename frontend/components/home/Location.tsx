'use client';

import { SITE_CONFIG } from '@/lib/seo/constants';

export default function Location() {
  // Coordinates: -8.1253355, -79.0370076 (Trujillo, Perú)
  const googleMapsUrl = 'https://www.google.com/maps/place/Natural+Bowls/@-8.1253355,-79.0395825,1190m/data=!3m1!1e3!4m14!1m7!3m6!1s0x91ad177641f9d85b:0x932edf5ead87cb72!2sNatural+Bowls!8m2!3d-8.1253355!4d-79.0370076!16s%2Fg%2F11jgnjp3cn!3m5!1s0x91ad177641f9d85b:0x932edf5ead87cb72!8m2!3d-8.1253355!4d-79.0370076!16s%2Fg%2F11jgnjp3cn?entry=ttu';
  const appleMapsUrl = 'https://maps.apple.com/?address=Natural%20Bowls&ll=-8.1253355,-79.0370076&q=Natural%20Bowls';
  const wazeUrl = 'https://waze.com/ul?ll=-8.1253355,-79.0370076&navigate=yes&zoom=17';

  const locations = [
    {
      id: 'sede-principal',
      name: 'Sede Principal',
      address: SITE_CONFIG.address,
      maps: {
        google: googleMapsUrl,
        apple: appleMapsUrl,
        waze: wazeUrl,
      },
    },
    {
      id: 'sede-classcyclo',
      name: 'Sede Classcyclo',
      address: 'Classcyclo Trujillo, Trujillo - Perú',
      maps: {
        google: 'https://www.google.com/maps/place/Classcyclo+Trujillo/@-8.1227563,-79.0418021,1190m/data=!3m2!1e3!4b1!4m6!3m5!1s0x91ad3dac4c1fa123:0x93e0556b2a9bf00a!8m2!3d-8.1227563!4d-79.0392272!16s%2Fg%2F11vxzn63gk?entry=ttu',
        apple: 'https://maps.apple.com/?address=Classcyclo%20Trujillo&ll=-8.1227563,-79.0392272&q=Classcyclo%20Trujillo',
        waze: 'https://waze.com/ul?ll=-8.1227563,-79.0392272&navigate=yes&zoom=17',
      },
    },
  ];

  return (
    <section className="relative py-16 md:py-28 bg-white scroll-mt-48">
      <div id="ubicacion" className="absolute -top-32 left-0 w-full h-1 invisible"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5D4E37] mb-4">
            Ubicación
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Visítanos en nuestro local y disfruta de comida saludable y deliciosa
          </p>
        </div>

        {/* Map Section - Full Width */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-96 md:h-150 hover:shadow-3xl transition-shadow duration-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.4297458145467!2d-79.0395825!3d-8.1253355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad177641f9d85b%3A0x932edf5ead87cb72!2sNatural%20Bowls!5e0!3m2!1ses!2spe!4v1707250000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de ubicación de Natural Bowls en Trujillo, Perú"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
