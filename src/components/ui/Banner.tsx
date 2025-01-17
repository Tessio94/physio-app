function Banner({ type }) {
	if (type === "partneri") {
		return (
			<div className="text-2xl text-slate-800 font-bold py-10 text-center bg-white border-2 border-slate-50 shadow-xl shadow-slate-300 mb-[50px]">
				Naši partneri u zdravlju
			</div>
		);
	}

	if (type === "galerija") {
		return (
			<div className="text-2xl text-slate-800 font-bold py-10 text-center bg-white border-2 border-slate-50 shadow-xl shadow-slate-300 mb-[50px]">
				Najmodernije od medicine samo za vas
			</div>
		);
	}

	return (
		<div className="text-2xl text-slate-800 font-bold py-10 text-center bg-white border-2 border-slate-100 shadow-xl shadow-slate-700 z-20">
			Vratite se bezbolno u život
		</div>
	);
}

export default Banner;
