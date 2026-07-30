'use client';

import { useI18n } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';

export default function DownloadPage() {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState(5);
  const [downloadStarted, setDownloadStarted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !downloadStarted) {
      setDownloadStarted(true);
      // Simulate download trigger
      console.log("Download started: x-2026.01.30-x86_64.iso");
      window.location.href = 'https://github.com/x-systems-org/x-linux/releases/download/x/x-2026.01.30-x86_64.iso';
    }
  }, [timeLeft, downloadStarted]);

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-X-white dark:bg-X-dark p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-panel p-8 text-center space-y-8"
      >
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-X-gray/20"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="text-X-green transition-all duration-1000 ease-linear"
              strokeWidth="8"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * (1 - timeLeft / 5)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold font-serif text-X-green">
            {timeLeft}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-serif text-X-dark dark:text-X-white">
            {t.download.title}
          </h2>
          <p className="text-X-gray">
            {timeLeft > 0 ? t.download.message : "Download starting..."}
          </p>
        </div>

        <div className="pt-4 border-t border-X-gray/10 text-sm text-X-gray">
          <p>{t.download.manual}</p>
          <button
            onClick={() => window.location.href = 'https://github.com/x-systems-org/x-linux/releases/download/x/x-2026.01.30-x86_64.iso'}
            className="text-X-cyan hover:text-X-pink underline font-medium mt-1 inline-flex items-center gap-1"
          >
            {t.download.button} <Download size={14} />
          </button>
        </div>

        <div className="pt-4 border-t border-X-gray/10 text-sm text-X-gray">
          <button
            onClick={() => window.location.href = 'https://github.com/x-systems-org/x-linux/releases/download/x/x-2026.01.31.tar.zst'}
            className="text-X-gray hover:text-X-green underline font-medium mt-1 inline-flex items-center gap-1"
          >
            {t.download.wslButton} <Download size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
