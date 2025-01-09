import logo1 from "../../assets/partneri/logo1.svg";
import logo2 from "../../assets/partneri/logo2.svg";
import logo3 from "../../assets/partneri/logo3.svg";
import logo4 from "../../assets/partneri/logo4.svg";
import logo5 from "../../assets/partneri/logo5.svg";
import logo6 from "../../assets/partneri/logo6.svg";
import logo7 from "../../assets/partneri/logo7.svg";
import logo8 from "../../assets/partneri/logo8.svg";
import logo9 from "../../assets/partneri/logo9.svg";

function Partneri() {
	const logos = [
		logo1,
		logo2,
		logo3,
		logo4,
		logo5,
		logo6,
		logo7,
		logo8,
		logo9,
		logo5,
		logo6,
		logo3,
	];

	return (
		<>
			<div
				id="animation_container1"
				className="whitespace-nowrap max-[100vw] overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-[250px] before:h-full before:bg-gradient-to-l from-transparent to-white before:content-[' '] before:z-10 after:absolute after:top-0 after:right-0 after:w-[250px] after:h-full after:bg-gradient-to-r from-transparent to-white after:content-[' '] after:z-10"
			>
				<div className="scroller inline-block w-max px-5">
					<div className="flex gap-10 items-center overflow-hidden mb-[40px]">
						{logos.map((logo, i) => {
							return (
								<img
									src={logo}
									alt={`logo ${i + 1}`}
									className="grayscale hover:grayscale-0 transition-all"
									key={i}
								/>
							);
						})}
					</div>
				</div>
				<div className="scroller inline-block w-max px-5">
					<div className="flex gap-10 items-center overflow-hidden mb-[40px]">
						{logos.map((logo, i) => {
							return (
								<img
									src={logo}
									alt={`logo ${i + 1}`}
									className="grayscale hover:grayscale-0 transition-all"
									key={i}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div
				id="animation_container2"
				className="whitespace-nowrap max-[100vw] overflow-hidden relative before:absolute before:top-0 before:left-0 before:w-[250px] before:h-full before:bg-gradient-to-l from-transparent to-white before:content-[' '] before:z-10 after:absolute after:top-0 after:right-0 after:w-[250px] after:h-full after:bg-gradient-to-r from-transparent to-white after:content-[' '] after:z-10"
			>
				<div className="scroller2 inline-block w-max px-5">
					<div className="flex gap-10 items-center overflow-hidden mb-[40px]">
						{logos.map((logo, i) => {
							return (
								<img
									src={logo}
									alt={`logo ${i + 1}`}
									className="grayscale hover:grayscale-0 transition-all"
									key={i}
								/>
							);
						})}
					</div>
				</div>
				<div className="scroller2 inline-block w-max px-5">
					<div className="flex gap-10 items-center overflow-hidden mb-[40px]">
						{logos.map((logo, i) => {
							return (
								<img
									src={logo}
									alt={`logo ${i + 1}`}
									className="grayscale hover:grayscale-0 transition-all"
									key={i}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

export default Partneri;
