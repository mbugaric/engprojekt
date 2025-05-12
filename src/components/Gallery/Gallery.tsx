import React, { useState, useEffect, useRef } from "react";
import "./Gallery.scss";
import { useI18n } from "../../i18n/useI18n";

const images = [
  {
    src: "/images/projects/hotels/ambasador.jpg",
    name_hr: "Hotel Ambasador",
    name_en: "Hotel Ambasador",
    area: "9,800 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2010-2020.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/hotels/zvonimir.jpg",
    name_hr: 'Hotelski apartmani "ZVONIMIR" & "ADRIA"',
    name_en: 'Hotel apartments "ZVONIMIR" & "ADRIA"',
    area: "5400 m²",
    location_hr: "Baška - otok Krk, Hrvatska",
    location_en: "Baška - Krk island, Croatia",
    year: "2003",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },

  {
    src: "/images/projects/hotels/cornaro.jpg",
    name_hr: 'Hotel "CORNARO I / II /  III / IV"',
    name_en: 'Hotel "CORNARO I / II /  III / IV"',
    area: "14500 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2013./2014./2015./2016./2017.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },

  {
    src: "/images/projects/hotels/crown_plaza.jpg",
    name_hr: 'Hotel "STRAHOV - CROWN PLAZA"',
    name_en: 'Hotel "STRAHOV - CROWN PLAZA"',
    area: "8000 m²",
    location_hr: "Prag Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2005./06.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/hotels/pucic_palace.jpg",
    name_hr: 'Hotel "PUCIĆ PALACE"',
    name_en: 'Hotel "PUCIĆ PALACE"',
    area: "3500 m²",
    location_hr: "Dubrovnik, Hrvatska",
    location_en: "Dubrovnik, Croatia",
    year: "2001./02.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/hotels/sheraton.jpg",
    name_hr: 'Hotel "STARWOOD SHERATON ( ORLANDO )" ',
    name_en: 'Hotel "STARWOOD SHERATON ( ORLANDO )" ',
    area: "32000 m²",
    location_hr: "Srebreno - Dubrovnik, Hrvatska",
    location_en: "Srebreno - Dubrovnik, Croatia",
    year: "2009./2015.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/industrial/ALFP_1.jpg",
    name_hr: "Tvornica ALUFLEXPACK - WERTINVEST",
    name_en: "Factory ALUFLEXPACK - WERTINVEST",
    area: "13000 m²",
    location_hr: "Drniš, Hrvatska",
    location_en: "Drniš, Croatia",
    year: "2021-2025.",
    projects_hr: ["Strojarske instalacije (GHV, tehnički plinovi, komprimirani zrak, UNP, PP, CO2, ANSUL, razvod otapala)"],
    projects_en: ["Mechanical installations (GHV, technical gases, compressed air, UNP, PP, CO2, ANSUL, solvent distribution)"],
  },
  {
    src: "/images/projects/industrial/FEAL-1.jpg",
    name_hr: "Tvornica ALUFLEXPACK - WERTINVEST",
    name_en: "Factory ALUFLEXPACK - WERTINVEST",
    area: "13000 m²",
    location_hr: "Drniš, Hrvatska",
    location_en: "Drniš, Croatia",
    year: "2021-2025.",
    projects_hr: ["Strojarske instalacije (GHV, tehnički plinovi, komprimirani zrak, UNP, PP, CO2, ANSUL, razvod otapala)"],
    projects_en: ["Mechanical installations (GHV, technical gases, compressed air, UNP, PP, CO2, ANSUL, solvent distribution)"],
  },
  {
    src: "/images/projects/industrial/FEAL.jpg",
    name_hr: "FEAL (nova proizvodna hala za profile)",
    name_en: "FEAL (new production hall for profiles)",
    area: "11000 m²",
    location_hr: "Široki Brijeg, BiH",
    location_en: "Široki Brijeg, Bosnia and Herzegovina",
    year: "2014.",
    projects_hr: ["Strojarske instalacije (GHV + upotreba otpadne energije) "],
    projects_en: ["Mechanical installations (GHV + use of waste energy)"],
  },
  {
    src: "/images/projects/industrial/MI_PIVAC.jpg",
    name_hr: 'Pogon za preradu mesa mesnih prerađevina "MI Braća PIVAC"',
    name_en: 'Meat processing plant "MI Braća PIVAC"',
    area: "21800 m²",
    location_hr: "Ravča, Hrvatska",
    location_en: "Ravča, Croatia",
    year: "2019-2020.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Tehnološki rashlad"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Technological cooling"],
  },
  {
    src: "/images/projects/medical/KB_DUBRAVA.jpg",
    name_hr: "11.	KB DUBRAVA (ex Nova vojna bolnica)",
    name_en: "11. KB DUBRAVA (ex New military hospital)",
    area: "80470 m²",
    location_hr: "Zagreb, Hrvatska",
    location_en: "Zagreb, Croatia",
    year: "1981.-1983.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/KBC_Osijek_1.jpg",
    name_hr: "NOVI KLINIČKI BOLNIČKI CENTAR OSIJEK",
    name_en: "NEW CLINICAL HOSPITAL CENTER OSIJEK",
    area: "256000 m²",
    location_hr: "Osijek, Hrvatska",
    location_en: "Osijek, Croatia",
    year: "2023",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/KBC_Osijek_2.jpg",
    name_hr: "NOVI KLINIČKI BOLNIČKI CENTAR OSIJEK",
    name_en: "NEW CLINICAL HOSPITAL CENTER OSIJEK",
    area: "256000 m²",
    location_hr: "Osijek, Hrvatska",
    location_en: "Osijek, Croatia",
    year: "2023",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/MEDIKOL_1.jpg",
    name_hr: "Medikol Grupa d.o.o., MEDICINSKI CENTAR MEDIKOL",
    name_en: "Medikol Group d.o.o., MEDICAL CENTER MEDIKOL",
    area: "48000 m²",
    location_hr: "Zagreb , Hrvatska",
    location_en: "Zagreb , Croatia",
    year: "2023.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/MEDIKOL_2.jpg",
    name_hr: "Medikol Grupa d.o.o., MEDICINSKI CENTAR MEDIKOL",
    name_en: "Medikol Group d.o.o., MEDICAL CENTER MEDIKOL",
    area: "48000 m²",
    location_hr: "Zagreb , Hrvatska",
    location_en: "Zagreb , Croatia",
    year: "2023.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/MEDIKOL_3.jpg",
    name_hr: "Medikol Grupa d.o.o., MEDICINSKI CENTAR MEDIKOL",
    name_en: "Medikol Group d.o.o., MEDICAL CENTER MEDIKOL",
    area: "48000 m²",
    location_hr: "Zagreb , Hrvatska",
    location_en: "Zagreb , Croatia",
    year: "2023.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/Norilsk.jpg",
    name_hr: "Bolnica NORILSK ",
    name_en: "Norilsk Hospital",
    area: "65000 m²",
    location_hr: "Norilsk, Rusija (ex SSSR)",
    location_en: "Norilsk, Russia (ex USSR)",
    year: "1986-1988",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/OHBP_KBAC_SPLIT.jpg",
    name_hr: "KB Split, privremeni OBHP ( opći bolnički HITNI PRIJEM ) ",
    name_en: "KB Split, temporary OBHP ( general hospital EMERGENCY ROOM )",
    area: "2330 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2020.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/OHBP_KBC_SPLIT.jpg",
    name_hr: "KB Split, privremeni OBHP ( opći bolnički HITNI PRIJEM ) ",
    name_en: "KB Split, temporary OBHP ( general hospital EMERGENCY ROOM )",
    area: "2330 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2020.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/medical/OP_KRIZINE.jpg",
    name_hr: "Operacijski blok ( 5 OP dvorana + 4 prostora sterilne pripreme )",
    name_en: "Operating block ( 5 OP rooms + 4 sterile preparation rooms )",
    area: "2000 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja", "Medicinski plinovi"],
    projects_en: ["Mechanical installations", "Water supply and drainage", "Medical gases"],
  },
  {
    src: "/images/projects/business/AGRAM.jpg",
    name_hr: "Poslovna zgrada - AGRAM / EUROHERC",
    name_en: "Office building - AGRAM / EUROHERC",
    area: "6800 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2010.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/business/DOROTHEUM.jpg",
    name_hr: "Poslovna zgrada (aukcijska kuća) - DOROTHEUM",
    name_en: "Office building (auction house) - DOROTHEUM",
    area: "1500 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "1998.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/business/EUROCENTAR.jpg",
    name_hr: "Poslovna zgrada EUROCENTAR",
    name_en: "Office building EUROCENTAR",
    area: "17000 m²",
    location_hr: "Zagreb, Hrvatska",
    location_en: "Zagreb, Croatia",
    year: "2004.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/EUROTOWER.jpg",
    name_hr: "Poslovna zgrada EUROTOWER",
    name_en: "Office building EUROTOWER",
    area: "37000 m²",
    location_hr: "Zagreb, Hrvatska",
    location_en: "Zagreb, Croatia",
    year: "2005.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/FUTURAMA_business-park.jpg",
    name_hr: "Office park FUTURAMA",
    name_en: "Office park FUTURAMA",
    area: "41510 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/FUTURAMA_1.jpg",
    name_hr: "Office park FUTURAMA",
    name_en: "Office park FUTURAMA",
    area: "41510 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/FUTURAMA_2.jpg",
    name_hr: "Office park FUTURAMA",
    name_en: "Office park FUTURAMA",
    area: "41510 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/FUTURAMA_3.jpg",
    name_hr: "Office park FUTURAMA",
    name_en: "Office park FUTURAMA",
    area: "41510 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/FUTURAMA_5.jpg",
    name_hr: "Office park FUTURAMA",
    name_en: "Office park FUTURAMA",
    area: "41510 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/FUTURAMA-6.jpg",
    name_hr: "Office park FUTURAMA",
    name_en: "Office park FUTURAMA",
    area: "41510 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/JINDRISKA.jpg",
    name_hr: "Poslovna zgrada - JINDRIŠSKA",
    name_en: "Office building - JINDRIŠSKA",
    area: "8400 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2013.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/JUNGMANNOVA.jpg",
    name_hr: "Poslovna zgrada - JUNGMANOVA",
    name_en: "Office building - JUNGMANOVA",
    area: "12900 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2013.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/business/LYRA_MOULIKOVA.jpg",
    name_hr: "Poslovna zgrada - ALAG ( LYRA MOULIKOVA )",
    name_en: "Office building - ALAG ( LYRA MOULIKOVA )",
    area: "4500 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "1998.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/business/NOVE_BUTOVICE.jpg",
    name_hr: 'Office park - NOVE BUTOVICE - zgrada "D"',
    name_en: 'Office park - NOVE BUTOVICE - building "D"',
    area: "22000 m²",
    location_hr: "Prag, Češka Republika",
    location_en: "Prague, Czech Republic",
    year: "2002.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/shopping/CCO.jpg",
    name_hr: "Trgovački centar CITY ONE",
    name_en: "Shopping center CITY ONE",
    area: "120000 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2009/2010.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/shopping/CITY_ONE.jpg",
    name_hr: "Trgovački centar CITY ONE",
    name_en: "Shopping center CITY ONE",
    area: "120000 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2009/2010.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/shopping/Lesnina_Jankomir.jpg",
    name_hr: "Trgovački centar «XXLutz-LESNINA»",
    name_en: "Shopping center «XXLutz-LESNINA»",
    area: "43000 m²",
    location_hr: "Zagreb - Jankomir, Hrvatska",
    location_en: "Zagreb - Jankomir, Croatia",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/shopping/MEPAS_MALL.jpg",
    name_hr: "Trgovački centar «MEPAS MALL»",
    name_en: "Shopping center «MEPAS MALL»",
    area: "100000 m²",
    location_hr: "Mostar, Bosna i Hercegovina",
    location_en: "Mostar, Bosnia and Herzegovina",
    year: "2010.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/shopping/MoS.jpg",
    name_hr: "Trgovački centar «MALL of SPLIT»",
    name_en: "Shopping center «MALL of SPLIT»",
    area: "176000 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2012/2016.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/shopping/POINT.jpg",
    name_hr: "Trgovački centar «POINT - VRBANI III»",
    name_en: "Shopping center «POINT - VRBANI III»",
    area: "43000 m²",
    location_hr: "Zagreb, Hrvatska",
    location_en: "Zagreb, Croatia",
    year: "2010/11.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/shopping/PORTANOVA.jpg",
    name_hr: "Trgovački centar «PORTANOVA»",
    name_en: "Shopping center «PORTANOVA»",
    area: "73000 m²",
    location_hr: "Osijek, Hrvatska",
    location_en: "Osijek, Croatia",
    year: "2008/09.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/AERODROM_BRAC.jpg",
    name_hr: "AERODROM „BRAČ“ - rekonstrukcija glavne zgrade",
    name_en: "BRAČ AIRPORT - main building reconstruction",
    area: "2000 m²",
    location_hr: "Otok Brač, Hrvatska",
    location_en: "Brač Island, Croatia",
    year: "2019.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/BEL_ETAGE.jpg",
    name_hr: 'Stambeno poslovna zgrada DUILOVO "A" (BELETAGE)',
    name_en: 'Residential-office building DUILOVO "A" (BELETAGE)',
    area: "10600 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "2012.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/BIKARAC.jpg",
    name_hr: "Centar za gospodarenje otpadom BIKARAC",
    name_en: "Waste Management Center BIKARAC",
    area: "13200 m² + okoliš 36000 m²",
    location_hr: "Bikarac - Šibensko-kninska županija, Hrvatska",
    location_en: "Bikarac - Šibenik-Knin County, Croatia",
    year: "2019-2020.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/BOBIS.jpg",
    name_hr: "Pekara BOBIS",
    name_en: "Bakery BOBIS",
    area: "13700 m²",
    location_hr: "Solin, Hrvatska",
    location_en: "Solin, Croatia",
    year: "2019-2020.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/CINESTAR PRISHTINA MALL.jpg",
    name_hr: "Multiplex kino BLITZ-CINESTAR (u sklopu PRISHTINA MALL)",
    name_en: "Multiplex cinema BLITZ-CINESTAR (within PRISHTINA MALL)",
    area: "16 kino dvorana",
    location_hr: "Priština, Kosovo",
    location_en: "Pristina, Kosovo",
    year: "2020/2021.",
    projects_hr: ["Strojarske instalacije"],
    projects_en: ["Mechanical installations"],
  },
  {
    src: "/images/projects/other/EF_SPLIT.jpg",
    name_hr: "EKONOMSKI FAKULTET",
    name_en: "FACULTY OF ECONOMICS",
    area: "4800 m²",
    location_hr: "Split, Hrvatska",
    location_en: "Split, Croatia",
    year: "1998.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/GFOS_OSIJEK.jpg",
    name_hr: "GFOS - Građevinski fakultet u Osijeku",
    name_en: "GFOS - Faculty of Civil Engineering in Osijek",
    area: "10400 m²",
    location_hr: "Osijek, Hrvatska",
    location_en: "Osijek, Croatia",
    year: "2008.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/GYM_DVORANA_KOPRIVNICA_1.jpg",
    name_hr: "Gimnazija i sportska dvorana Koprivnica",
    name_en: "Gymnasium and sports hall Koprivnica",
    area: "11000 m²",
    location_hr: "Koprivnica, Hrvatska",
    location_en: "Koprivnica, Croatia",
    year: "2004.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/GYM_DVORANA_KOPRIVNICA_2.jpg",
    name_hr: "Gimnazija i sportska dvorana Koprivnica",
    name_en: "Gymnasium and sports hall Koprivnica",
    area: "11000 m²",
    location_hr: "Koprivnica, Hrvatska",
    location_en: "Koprivnica, Croatia",
    year: "2004.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },
  {
    src: "/images/projects/other/GYM_DVORANA_KOPRIVNICA_3.jpg",
    name_hr: "Gimnazija i sportska dvorana Koprivnica",
    name_en: "Gymnasium and sports hall Koprivnica",
    area: "11000 m²",
    location_hr: "Koprivnica, Hrvatska",
    location_en: "Koprivnica, Croatia",
    year: "2004.",
    projects_hr: ["Strojarske instalacije", "Vodovod i odvodnja"],
    projects_en: ["Mechanical installations", "Water supply and drainage"],
  },

  {
    "src": "/images/projects/other/OS_METERIZE.jpg",
    "name_hr": "Osnovna škola METERIZE Šibenik",
    "name_en": "Elementary School METERIZE Šibenik",
    "area": "8000 m²",
    "location_hr": "Šibenik, Hrvatska",
    "location_en": "Šibenik, Croatia",
    "year": "2008.",
    "projects_hr": ["Strojarske instalacije", "Vodovod i odvodnja"],
    "projects_en": ["Mechanical installations", "Water supply and drainage"]
  },
  {
    "src": "/images/projects/other/OS_MONTOVJERNA.jpg",
    "name_hr": "Osnovna škola Montovjerna",
    "name_en": "Elementary School Montovjerna",
    "area": "10000 m²",
    "location_hr": "Dubrovnik, Hrvatska",
    "location_en": "Dubrovnik, Croatia",
    "year": "2008.",
    "projects_hr": ["Strojarske instalacije", "Vodovod i odvodnja"],
    "projects_en": ["Mechanical installations", "Water supply and drainage"]
  },
  {
    "src": "/images/projects/other/OS_PAZDIGRAD.jpg",
    "name_hr": "Osnovna škola PAZDIGRAD - Žnjan",
    "name_en": "Elementary School PAZDIGRAD - Žnjan",
    "area": "7100 m²",
    "location_hr": "Split, Hrvatska",
    "location_en": "Split, Croatia",
    "year": "2011./2017.",
    "projects_hr": ["Strojarske instalacije", "Vodovod i odvodnja"],
    "projects_en": ["Mechanical installations", "Water supply and drainage"]
  },
  {
    "src": "/images/projects/other/RIBARSKA_LUKA_BRIZINE.jpg",
    "name_hr": "Ribarska luka BRIŽINE - lučko područje \"Kaštelanski bazen C\"",
    "name_en": "Fishing port BRIŽINE - \"Kaštela Basin C\" port area",
    "area": "",
    "location_hr": "Kaštel Sućurac, Hrvatska",
    "location_en": "Kaštel Sućurac, Croatia",
    "year": "2018-2019.",
    "projects_hr": ["Strojarske instalacije", "Vodovod i odvodnja"],
    "projects_en": ["Mechanical installations", "Water supply and drainage"]
  },
  {
    "src": "/images/projects/other/SAMOSTAN_MALE_BRACE.jpg",
    "name_hr": "Rekonstrukcija franjevačkog SAMOSTANA MALE BRAĆE",
    "name_en": "Reconstruction of Franciscan MONASTERY MALE BRAĆE",
    "area": "4900 m²",
    "location_hr": "Dubrovnik, Hrvatska",
    "location_en": "Dubrovnik, Croatia",
    "year": "2014.",
    "projects_hr": ["Strojarske instalacije"],
    "projects_en": ["Mechanical installations"]
  },
  {
    "src": "/images/projects/other/ST_DOM_DBK_1.jpg",
    "name_hr": "Kompleks Studentskog doma Sveučilišta u Dubrovniku",
    "name_en": "Student Dormitory Complex - University of Dubrovnik",
    "area": "21300 m²",
    "location_hr": "Dubrovnik, Hrvatska",
    "location_en": "Dubrovnik, Croatia",
    "year": "2012.",
    "projects_hr": ["Strojarske instalacije", "Vodovod i odvodnja"],
    "projects_en": ["Mechanical installations", "Water supply and drainage"]
  },
  {
    "src": "/images/projects/other/ST_DOM_DBK.jpg",
    "name_hr": "Kompleks Studentskog doma Sveučilišta u Dubrovniku",
    "name_en": "Student Dormitory Complex - University of Dubrovnik",
    "area": "21300 m²",
    "location_hr": "Dubrovnik, Hrvatska",
    "location_en": "Dubrovnik, Croatia",
    "year": "2012.",
    "projects_hr": ["Strojarske instalacije", "Vodovod i odvodnja"],
    "projects_en": ["Mechanical installations", "Water supply and drainage"]
  }
];

const IMAGES_PER_PAGE = 8;

const Gallery: React.FC = () => {
  const { t, language } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const preloadedImages = useRef<Set<string>>(new Set());

  const preloadImage = (src: string) => {
    if (!preloadedImages.current.has(src)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      preloadedImages.current.add(src);
      console.log("Preloading image:", src);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "Escape") setSelectedIndex(null);
    if (e.key === "ArrowRight") setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null));
    if (e.key === "ArrowLeft") setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || selectedIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    } else if (diff < -50) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  const isMoreAvailable = visibleCount < images.length;

  useEffect(() => {
    const start = visibleCount;
    const end = Math.min(visibleCount + IMAGES_PER_PAGE, images.length);
    for (let i = start; i < end; i++) {
      preloadImage(images[i].src);
    }
  }, [visibleCount]);

  return (
    <section className="gallery" id="projects">
      <h2 className="section-heading">{t("projects")}</h2>
      <div className="gallery__grid">
        {images.slice(0, visibleCount).map((img, idx) => (
          <div
            className="gallery__item"
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}
            onMouseEnter={() => {
              preloadImage(img.src);
              if (idx + 1 < images.length) preloadImage(images[idx + 1].src);
            }}
          >
            <div className="gallery__image-wrapper">
              <img src={img.src} alt={language === "en" ? img.name_en : img.name_hr} loading="lazy" />
              <div className="gallery__caption">
                <strong>{language === "en" ? img.name_en : img.name_hr}</strong>
                <div className="gallery__subcaption">
                  {img.area} - {language === "en" ? img.location_en : img.location_hr}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="gallery__load-more">
        <button onClick={() => setVisibleCount((prev) => prev + IMAGES_PER_PAGE)} disabled={!isMoreAvailable}>
          {t("loadMore")}
        </button>
      </div>

      {selectedIndex !== null && (
        <div className="gallery__modal fullscreen" onClick={() => setSelectedIndex(null)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} ref={modalRef}>
          <button className="gallery__close">&times;</button>
          <img src={images[selectedIndex].src} alt="Full view" className="gallery__modal-img" />
          <div className="gallery__modal-caption">
            <strong>{language === "en" ? images[selectedIndex].name_en : images[selectedIndex].name_hr}</strong>
            <div className="gallery__modal-meta">
              {images[selectedIndex].area} - {language === "en" ? images[selectedIndex].location_en : images[selectedIndex].location_hr}
              <br />
              {language === "en" ? "Projects" : "Projekti"}: {(language === "en" ? images[selectedIndex].projects_en : images[selectedIndex].projects_hr)?.join(" / ")}
              <br />
              {images[selectedIndex].year}
            </div>
          </div>
          <button
            className="gallery__nav gallery__prev"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
            }}
          >
            ‹
          </button>
          <button
            className="gallery__nav gallery__next"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((selectedIndex + 1) % images.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
