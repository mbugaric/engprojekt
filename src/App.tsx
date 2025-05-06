import Loader from "./components/Loader/Loader";
import BackgroundImageSlider from "./components/BackgroundImageSlider/BackgroundImageSlider";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount/ScrollToTopOnMount";
import ResponsiveMenu from "./components/ResponsiveMenu/ResponsiveMenu";
import { I18nProvider } from "./i18n/I18nProvider";
import AboutUs from "./components/AboutUs/AboutUs";
import Gear from "./components/Gear/Gear";
import Gallery from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import ReferenceProjectsExplorer from "./components/ReferenceProjectsExplorer/ReferenceProjectsExplorer";
import DownloadDocxButton from "./components/DownloadDocxButton/DownloadDocxButton";
import "./App.scss";

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
        <Gallery />
        <ReferenceProjectsExplorer />
        <DownloadDocxButton />
        <Contact /> 
      </I18nProvider>
    </>
  );
}

export default App;
