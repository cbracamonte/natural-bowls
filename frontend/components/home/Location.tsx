'use client';

import { MapPin, Phone, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#5D4E37] mb-4">
            Ubicación
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Visítanos en nuestro local y disfruta de comida saludable y deliciosa
          </p>
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          {/* Map - Full Width */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-96 md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.4297458145467!2d-79.0395825!3d-8.1253355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad177641f9d85b%3A0x932edf5ead87cb72!2sNatural%20Bowls!5e0!3m2!1ses!2spe!4v1707250000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Info - Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Locations Card (Both sedes combined) */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#6B8E4E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6B8E4E]/20 transition-colors mb-4">
                <MapPin className="w-6 h-6 text-[#6B8E4E]" />
              </div>
              <h3 className="font-semibold text-[#5D4E37] mb-4 text-lg">Ubicaciones</h3>

              {/* Address list */}
              <div className="space-y-4 mb-6">
                {locations.map((location) => (
                  <div key={location.id}>
                    <p className="font-medium text-[#5D4E37] text-sm mb-1">
                      {location.name}
                    </p>
                    <p className="text-gray-600 text-sm">{location.address}</p>
                    {location.id !== 'sede-classcyclo' && (
                      <div className="border-t border-gray-100 my-4"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Map App Links - Centered */}
              <div className="flex justify-center gap-3 pt-6 border-t border-gray-100">
                {/* Google Maps */}
                <Link
                  href={locations[0].maps.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir en Google Maps"
                  className="w-12 h-12 bg-[#6B8E4E] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-110 hover:bg-[#5A7A40] transition-all"
                >
                  <Image
                    src="/icons/google-maps.svg"
                    alt="Google Maps"
                    width={24}
                    height={24}
                  />
                </Link>

                {/* Apple Maps */}
                <Link
                  href={locations[0].maps.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir en Apple Maps"
                  className="w-12 h-12 bg-[#6B8E4E] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-110 hover:bg-[#5A7A40] transition-all"
                >
                  <Image
                    src="/icons/maps.svg"
                    alt="Apple Maps"
                    width={24}
                    height={24}
                  />
                </Link>

                {/* Waze */}
                <Link
                  href={locations[0].maps.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir en Waze"
                  className="w-12 h-12 bg-[#6B8E4E] text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:scale-110 hover:bg-[#5A7A40] transition-all"
                >
                  <Image
                    src="/icons/waze.svg"
                    alt="Waze"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>

            {/* Contact Info Card (Phone + Hours) */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* Phone Section */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-[#6B8E4E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6B8E4E]/20 transition-colors mb-4">
                  <Phone className="w-6 h-6 text-[#6B8E4E]" />
                </div>
                <h3 className="font-semibold text-[#5D4E37] mb-2 text-lg">Teléfono</h3>
                <Link
                  href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                  className="text-gray-600 hover:text-[#6B8E4E] transition-colors text-sm font-medium"
                >
                  {SITE_CONFIG.phone}
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-6"></div>

              {/* Hours Section */}
              <div>
                <div className="w-12 h-12 bg-[#6B8E4E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#6B8E4E]/20 transition-colors mb-4">
                  <Clock className="w-6 h-6 text-[#6B8E4E]" />
                </div>
                <h3 className="font-semibold text-[#5D4E37] mb-2 text-lg">Horario</h3>
                <p className="text-gray-600 text-sm">
                  Lunes a Viernes:<br />8:00 AM - 9:00 PM<br />
                  <span className="text-xs">Sábado y Domingo:<br />10:00 AM - 8:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
