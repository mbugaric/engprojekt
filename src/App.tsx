import Loader from "./components/Loader/Loader";
import BackgroundImageSlider from "./components/BackgroundImageSlider/BackgroundImageSlider";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount/ScrollToTopOnMount";
import ResponsiveMenu from "./components/ResponsiveMenu/ResponsiveMenu";
import { I18nProvider } from "./i18n/I18nProvider";
import AboutUs from "./components/AboutUs/AboutUs";
import Gear from "./components/Gear/Gear";
// import VentilationSystem from "./components/VentilationSystem/VentilationSystem";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <I18nProvider>
      <ScrollToTopOnMount />
      <Loader />
      <BackgroundImageSlider />
      <ResponsiveMenu />
      <AboutUs />
      <Gear />
      {/* <VentilationSystem /> */}
      <Gallery />
    </I18nProvider>
  );
}

export default App;
