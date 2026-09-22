import React from "react";
import heroImg from "../../assets/Hero.jpg";
import Reveal from "../common/Reveal";

function About() {
  return (
    <section className="bg-paper-50">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="rounded-[1.75rem] overflow-hidden shadow-lg">
                <img
                  src={heroImg}
                  alt="New Central Academy campus"
                  className="w-full h-[320px] md:h-[380px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-2xl border-4 border-saffron-500 -z-10 hidden sm:block" />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-saffron-600 font-medium text-sm tracking-wide">About us</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 mt-3 leading-tight">
                A neighbourhood school built on values
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-ink-900/70 mt-5 leading-relaxed max-w-xl">
                New Central Academy is an English medium school in
                Barhalganj, Gorakhpur, teaching Playway to Class 8th. We
                bring together attentive teaching, discipline and a caring
                campus so every child can learn, grow and build a bright
                future.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <blockquote className="mt-6 border-l-2 border-saffron-500 pl-5">
                <p className="font-display italic text-lg text-ink-900/80 leading-relaxed">
                  &ldquo;Arise, awake, and stop not till the goal is reached.&rdquo;
                </p>
                <cite className="block not-italic text-sm text-ink-900/50 mt-2">
                  Swami Vivekananda
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;


