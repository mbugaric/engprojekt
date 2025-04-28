import React, { useEffect, useRef } from "react";
import "./AboutUs.scss";

interface AboutUsProps {
  language: "hr" | "en";
}

const AboutUs: React.FC<AboutUsProps> = ({ language }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          document.body.classList.add("background-blue");
        } else {
          document.body.classList.remove("background-blue");
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="about-us" ref={sectionRef} id="about">
      <div className="about-us__content">
        <h2>{language === "hr" ? "O nama" : "About Us"}</h2>
        <p>
          {language === "hr"
            ? `Tvrtka ENG PROJEKT d.o.o. je osnovana 2008. godine (s isključivim ciljem projektiranja i nadzora instalacija u graditeljstvu), odvajanjem od tvrtke ENG 90 d.o.o. (koja je od osnivanja 1990. godine obavljala poslove izvedbe radova, projektiranja i nadzora instalacija u graditeljstvu).
            Osnivanjem tvrtke ENG PROJEKT d.o.o. 2008. godine odlučili smo stečena iskustva i znanje usmjeriti isključivo na projektiranje i nadzor, te smo oformili respektabilni tim kao spoj našeg iskustva i ambicioznosti mladih inženjera. Danas naša tvrtka broji 11 zaposlenika (od toga 4 ovlaštena inženjera HKIS).
            
            Tvrtka se bavi projektiranjem, projektantskim i stručnim nadzorom, te tehničkim savjetovanjem (consultingom) za sljedeće vrste instalacija u graditeljstvu:

            a/ strojarske termotehničke instalacije (grijanje i hlađenje, klimatizacija i ventilacija, plinske instalacije, tehnički plinovi, tehnološki rashlad)

            b/ strojarske hidrotehničke instalacije (vodovod i odvodnja, bazenska tehnika)

            Pri projektiranju koristimo BIM tehnologiju i softverski alat DDS CAD.

            U suradnji s partnerskim tvrtkama možemo ponuditi i:

            c/ sprinkler instalacije i sustave zaštite kuhinjskih napa plinom

            d/ BMS/CNUS (centralni nadzorno-upravljački sustavi)

            Na taj način objedinjavanjem ponude za sve instalacije preko jedne tvrtke, olakšano je projektiranje i međusobna usklađenost svih instalacija.

            Nadamo se poslovnoj suradnji s Vama te mogućnosti sudjelovanja u davanju ponude na Vašem projektu.

            Za dodatna objašnjenja stojimo Vam na raspolaganju.`
            : `ENG PROJEKT d.o.o. was founded in 2008 (with the sole purpose of design and supervision of installations in construction) as a spin-off from ENG 90 d.o.o. (established in 1990, performing installation execution, design, and supervision services).
            By establishing ENG PROJEKT d.o.o., we decided to focus our experience and knowledge solely on design and supervision, forming a reputable team combining our expertise with the ambition of young engineers. Today, our company has 11 employees, including 4 licensed engineers certified by HKIS.

            Our company provides design, project supervision, and technical consulting services for the following types of construction installations:

            a/ Mechanical thermotechnical installations (heating and cooling, air conditioning and ventilation, gas installations, technical gases, technological cooling)

            b/ Mechanical hydrotechnical installations (water supply and drainage, pool technologies)

            We use BIM technology and the DDS CAD software tool in our designs.

            In cooperation with our partner companies, we can also offer:

            c/ Sprinkler systems and kitchen hood gas protection systems

            d/ BMS/CNUS (central monitoring and control systems)

            By consolidating offers for all installations through one company, we simplify project coordination and ensure better alignment of all systems.

            We hope to have the opportunity to collaborate with you and submit offers for your projects.

            For any additional information, we remain at your disposal.`}
        </p>
      </div>
    </section>
  );
};

export default AboutUs;