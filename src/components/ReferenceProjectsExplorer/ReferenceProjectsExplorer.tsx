import React, { useState, useMemo, useRef, useEffect } from "react";
import { useI18n } from "../../i18n/useI18n";

import "./ReferenceProjectsExplorer.scss";

const ReferenceProjectsExplorer: React.FC = () => {
  const { language } = useI18n();
  const t = (hr: string, en: string) => (language === "hr" ? hr : en);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("area_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [referenceData, setReferenceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? 16 : 30;
    }
    return 30;
  }, []);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/mbugaric/engprojekt-references/main/references.json")
      .then((res) => res.json())
      .then((data) => {
        setReferenceData(data.projects || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load reference data", err);
        setReferenceData([]);
        setIsLoading(false);
      });
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  const allowScroll = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      allowScroll.current = true;
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!allowScroll.current) return;

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  const countries = useMemo(() => {
    return [...new Set(referenceData.map((p) => (language === "hr" ? p.location.country_hr : p.location.country_en)))];
  }, [language]);

  const types = useMemo(() => {
    const all = referenceData.flatMap((p) => (language === "hr" ? p.project_type_hr : p.project_type_en));
    return [...new Set(all)].sort();
  }, [language]);

  const filtered = useMemo(() => {
    if (!referenceData.length) return [];

    const result = referenceData.filter((p) => {
      const nameMatch = (p.name_hr + p.name_en + p.location.city).toLowerCase().includes(search.toLowerCase());
      const countryMatch = !selectedCountry || (language === "hr" ? p.location.country_hr : p.location.country_en) === selectedCountry;
      const typeMatch = !selectedType || ((language === "hr" ? p.project_type_hr : p.project_type_en) ?? []).includes(selectedType);
      return nameMatch && countryMatch && typeMatch;
    });

    const parseYear = (year: string | number | null | undefined): number => {
      if (!year) return 0;
      const str = String(year).toLowerCase();
      if (str.includes("u tijeku")) return 9999;
      const match = str.match(/\d{4}/g);
      if (!match) return 0;
      return Math.max(...match.map((y) => parseInt(y)));
    };

    result.sort((a, b) => {
      switch (sortOption) {
        case "year_desc":
          return parseYear(b.year) - parseYear(a.year);
        case "alpha":
          return (language === "hr" ? a.name_hr ?? "" : a.name_en ?? "").localeCompare(language === "hr" ? b.name_hr ?? "" : b.name_en ?? "");
        case "area_desc":
        default:
          return (b.area_m2 ?? 0) - (a.area_m2 ?? 0);
      }
    });

    return result;
  }, [referenceData, search, selectedCountry, selectedType, sortOption, language]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  useEffect(() => {
    setSelectedType("");
    setSelectedCountry("");
    setCurrentPage(1);
  }, [language]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (isLoading) {
    return (
      <section className="reference-projects" id="references">
        <h2 className="section-heading">{t("Reference", "References")}</h2>
        <p style={{ textAlign: "center", padding: "2rem" }}>{t("Učitavanje podataka...", "Loading data...")}</p>
      </section>
    );
  }

  return (
    <section className="reference-projects" id="references" ref={sectionRef}>
      <h2 className="section-heading">{t("Reference", "References")}</h2>
      <div className="filters">
        <input
          type="text"
          className="full-width-search"
          placeholder={t("Pretraži po nazivu ili gradu", "Search by name or city")}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="filter-row">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">{t("Vrsta projekta", "Project type")}</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">{t("Država", "Country")}</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="area_desc">{t("Kvadratura (najveće)", "Area (largest)")}</option>
            <option value="year_desc">{t("Godina (najnovije)", "Year (newest)")}</option>
            <option value="alpha">{t("Naziv (A–Ž)", "Name (A–Z)")}</option>
          </select>
        </div>
      </div>

      <div className="project-cards">
        {paginated.map((p, i) => (
          <div className="card" key={i}>
            <h3>{language === "hr" ? p.name_hr : p.name_en}</h3>
            <p>
              {p.location.city}, {language === "hr" ? p.location.country_hr : p.location.country_en}
            </p>
            <p>
              {t("Godina", "Year")}: {p.year}
            </p>
            <p>
              {t("Kvadratura", "Area")}: {p.area_m2} m²
            </p>
            <p>
              {t("Vrsta projekta", "Project type")}: {(language === "hr" ? p.project_type_hr ?? [] : p.project_type_en ?? []).join(", ")}
            </p>
            <div className="badge-container">
              {p?.monter && <span className="badge monter">{t("u sklopu firme Monter", "within Monter company")}</span>}
              {p?.concept && <span className="badge concept">{t("idejni projekt", "concept design")}</span>}
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="no-results">{t("Nema rezultata za prikaz.", "No results to display.")}</p>}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReferenceProjectsExplorer;
