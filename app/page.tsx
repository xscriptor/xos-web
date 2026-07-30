'use client';

import BlackHoleBackground from '@/components/BlackHoleBackground';
import { useI18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
// import Image from 'next/image'; // context: switching to img for basepath support

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen bg-X-white dark:bg-black transition-colors duration-500">
      <BlackHoleBackground />

      {/* Overlay gradiente para asegurar contraste - Ajustado para light mode */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/20 dark:from-black/80 dark:via-transparent dark:to-black/20 z-10 pointer-events-none transition-colors duration-500" />

      <div className="relative z-30">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="font-serif text-[18px] md:text-2xl font-bold text-black dark:text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-tight whitespace-nowrap transition-colors duration-500">
              {t.home.title}
            </h1>

            <p className="font-serif text-2xl md:text-3xl text-X-white/90 italic font-light tracking-wide hidden">
              {t.home.subtitle}
            </p>

            <div className="pt-12">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-10 py-5 text-X-purple dark:text-X-gold hover:text-red-500 transition-colors duration-300 group"
              >
                <span className="font-medium text-lg text-current">{t.home.cta}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform text-current" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Info Sections */}
        <div className="bg-white/60 dark:bg-black/60 backdrop-blur-xl border-t border-white/10 dark:border-white/5 transition-colors duration-500">

          {/* X Linux */}
          <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-black dark:text-white">{t.X.title}</h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                {t.X.description}
              </p>
              <ul className="space-y-4 pt-4">
                {[t.X.features.minimal, t.X.features.branding, t.X.features.reproducible].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-X-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="https://github.com/x-systems-org/x-linux" target="_blank" className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-X-cyan/30 group hover:border-X-cyan/60 transition-colors">
              <img
                src="/x-repo/images/XHyprland.png"
                alt="X Linux Repository"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </section>

          {/* X Scripts */}
          <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="md:order-2 space-y-6">
              <h2 className="text-4xl font-serif font-bold text-black dark:text-white">{t.scripts.title}</h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                {t.scripts.description}
              </p>
              <ul className="space-y-4 pt-4">
                {[t.scripts.features.setup, t.scripts.features.modules].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-X-purple" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Link href="https://github.com/x-systems-org/x" target="_blank" className="relative md:order-1 h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-X-purple/30 group hover:border-X-purple/60 transition-colors">
              <img
                src="/x-repo/images/x-repo.png"
                alt="X Scripts"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </section>

          {/* VSCode X */}
          <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-black dark:text-white">{t.customizations.vscode.title}</h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                {t.customizations.vscode.description}
              </p>
            </div>
            <Link href="https://github.com/x-systems-org/vscode" target="_blank" className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-X-cyan/30 group hover:border-X-cyan/60 transition-colors">
              <img
                src="/x-repo/images/vscode.jpg"
                alt="VSCode X"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </section>

          {/* Helix */}
          <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="md:order-2 space-y-6">
              <h2 className="text-4xl font-serif font-bold text-black dark:text-white">{t.customizations.helix.title}</h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                {t.customizations.helix.description}
              </p>
            </div>
            <Link href="https://github.com/x-systems-org/helix" target="_blank" className="relative md:order-1 h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-X-purple/30 group hover:border-X-purple/60 transition-colors">
              <img
                src="/x-repo/images/helix.png"
                alt="Helix Editor"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </section>

          {/* Ghostty */}
          <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-black dark:text-white">{t.customizations.ghostty.title}</h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                {t.customizations.ghostty.description}
              </p>
            </div>
            <Link href="https://github.com/x-systems-org/terminal" target="_blank" className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-X-pink/30 group hover:border-X-pink/60 transition-colors">
              <img
                src="/x-repo/images/xfetch.jpg"
                alt="Ghostty Terminal"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </section>

          {/* X Tools */}
          <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
            <div className="md:order-2 space-y-6">
              <h2 className="text-4xl font-serif font-bold text-black dark:text-white">{t.customizations.tools.title}</h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed">
                {t.customizations.tools.description}
              </p>
            </div>
            <Link href="https://github.com/x-systems-org/xtop" target="_blank" className="relative md:order-1 h-64 md:h-96 w-full rounded-2xl overflow-hidden border border-X-gold/30 group hover:border-X-gold/60 transition-colors">
              <img
                src="/x-repo/images/xtop.png"
                alt="X Tools"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          </section>

        </div>
      </div>
    </div>
  );
}
