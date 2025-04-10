function Banner({ type }) {
  if (type === "tim") {
    return (
      <div className="z-20 border-2 border-slate-100 bg-white py-10 text-center text-2xl font-bold text-slate-800 shadow-xl shadow-slate-700">
        Upoznajte naš tim
      </div>
    );
  }
  if (type === "partneri") {
    return (
      <div className="mb-[50px] border-2 border-slate-50 bg-white py-10 text-center text-2xl font-bold text-slate-800 shadow-xl shadow-slate-300">
        Naši partneri u zdravlju
      </div>
    );
  }

  if (type === "galerija") {
    return (
      <div className="border-2 border-slate-50 bg-white py-10 text-center text-2xl font-bold text-slate-800 shadow-reverse shadow-slate-300">
        Najmodernije od medicine samo za vas
      </div>
    );
  }

  return (
    <div className="z-20 border-2 border-slate-100 bg-white py-10 text-center text-2xl font-bold text-slate-800 shadow-xl shadow-slate-700">
      Vratite se bezbolno u život
    </div>
  );
}

export default Banner;
