import Banner from "./components/ui/banner";
import Cover from "./components/ui/Cover";
import Footer from "./components/ui/Footer";
import Grid from "./components/ui/Grid";
import NavMenu from "./components/ui/navMenu";
import Partneri from "./components/ui/Partneri";

function App() {
	return (
		<>
			<NavMenu />
			<Cover />
			<Banner type="" />
			<Grid />
			<Banner type="partneri" />
			<Partneri />
			<Footer />
		</>
	);
}

export default App;
