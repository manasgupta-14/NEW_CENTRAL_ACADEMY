import React from "react";
import Reveal from "../common/Reveal";

const ADDRESS = "New Central Academy, Pohila Road, Mahuapar, Barhalganj, Gorakhpur, Uttar Pradesh 273402";
const MAP_QUERY = encodeURIComponent(ADDRESS);

function Map() {
  return (
    <section className="bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <Reveal>
          <p className="text-saffron-600 font-medium text-sm tracking-wide">Visit us</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3">
            Find Us
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 mt-10 items-stretch">
            <div className="bg-navy-900 text-paper-50 rounded-2xl p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold">New Central Academy</h3>
                <p className="text-paper-50/70 mt-3 leading-relaxed">
                  Pohila Road, Mahuapar
                  <br />
                  Barhalganj, Gorakhpur &ndash; 273402
                </p>
                <p className="text-paper-50/70 mt-4">
                  9935217161 &middot; 96213 23797
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 bg-saffron-500 text-navy-950 px-5 py-3 rounded-full font-semibold w-fit hover:bg-saffron-600 transition-colors duration-300"
              >
                Get Directions
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md min-h-[280px]">
              <iframe
                title="New Central Academy location map"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default Map;
