import Banner from "./components/ui/Banner";
import Cover from "./components/ui/Cover";
import Footer from "./components/ui/Footer";
import Grid from "./components/ui/Grid";
import NavMenu from "./components/ui/NavMenu";
import Partneri from "./components/ui/Partneri";
import Gallery from "./components/ui/Gallery";

function App() {
  return (
    <>
      <NavMenu />
      <Cover />
      <Banner type="" />
      <Grid />
      <Banner type="partneri" />
      <Partneri />
      <Banner type="galerija" />
      <Gallery />
      <Footer />
    </>
  );
}

export default App;
