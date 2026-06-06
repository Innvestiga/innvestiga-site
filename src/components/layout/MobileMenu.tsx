"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, CONTACT } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-bg flex flex-col items-center justify-center lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-ink text-3xl font-[800] uppercase tracking-tight"
                >
                  <span className="text-primary/60 text-lg mr-2">
                    {link.number}
                  </span>
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{
                duration: 0.4,
                delay: NAV_LINKS.length * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={CONTACT.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-primary text-white px-8 py-3 rounded-full text-[10px] font-[900] uppercase tracking-widest"
              >
                Acceso Portal
              </a>
            </motion.div>
          </nav>

          <motion.div
            className="absolute bottom-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted text-[10px] tracking-widest uppercase">
              {CONTACT.email}
            </p>
            <p className="text-muted text-[10px] tracking-widest mt-1">
              {CONTACT.phone}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
