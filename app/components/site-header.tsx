"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Menu, X } from "lucide-react";
import { useI18n } from "./i18n-provider";

const links = [
  ["nav.home", "#top"],
  ["nav.patients", "#patients"],
  ["nav.nurses", "#nurses"],
  ["nav.how", "#how-it-works"],
  ["nav.about", "#about"],
];

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`wordmark${light ? " wordmark-light" : ""}`}
      href="#top"
      aria-label="Masab home"
    >
      <Image className="wordmark-symbol" src="/masab-logo-transparent.png" alt="Masab" width={36} height={36} />
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, localeOptions, t } = useI18n();

  return (
    <header className="site-header" id="top">
      <div className="nav-wrap">
        <Wordmark />
        <button
          className={`menu-toggle${open ? " is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
            {open ? <X size={19} strokeWidth={1.8} /> : <Menu size={19} strokeWidth={1.8} />}
        </button>
        <nav
          className={`primary-nav${open ? " nav-open" : ""}`}
          id="primary-nav"
          aria-label="Main navigation"
        >
          {links.map(([key, href]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {t(key)}
            </a>
          ))}
          <label className="locale-control" aria-label={t("nav.language")}>
            <Globe size={17} strokeWidth={1.8} aria-hidden="true" />
            <select className="nav-locale" aria-label={t("nav.language")} value={locale} onChange={(event) => {
              const selected = localeOptions.find((option) => option.code === event.currentTarget.value);
              if (selected) setLocale(selected.code);
              setOpen(false);
            }}>
              {localeOptions.map((option) => <option key={option.code} value={option.code}>{option.name}</option>)}
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
}
