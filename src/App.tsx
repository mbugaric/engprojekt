import Loader from "./components/Loader/Loader";
import BackgroundImageSlider from "./components/BackgroundImageSlider/BackgroundImageSlider";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount/ScrollToTopOnMount";
import ResponsiveMenu from "./components/ResponsiveMenu/ResponsiveMenu";
import { I18nProvider } from "./i18n/I18nProvider";
import AboutUs from "./components/AboutUs/AboutUs";
import Gear from "./components/Gear/Gear";
// import VentilationSystem from "./components/VentilationSystem/VentilationSystem";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import ReferenceProjectsExplorer from "./components/ReferenceProjectsExplorer/ReferenceProjectsExplorer";

function App() {
  return (
    <>
      <Loader />{" "}
      <I18nProvider>
        <ScrollToTopOnMount />
        <BackgroundImageSlider />
        <ResponsiveMenu />
        <AboutUs />
        <Gear />
        {/* <VentilationSystem /> */}
        <Gallery />
        <ReferenceProjectsExplorer />
        <Contact /> 
      </I18nProvider>
    </>
  );
}

export default App;
