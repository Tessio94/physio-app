const SkelAdminKalendar = () => {
  return (
    <div>
      <div className="mx-5 flex gap-1 pb-10 pt-6">
        {[...Array(11)].map((_, i) => (
          <div className="flex min-w-24 flex-col gap-1" key={i}>
            <div className="h-[60px] animate-pulse rounded-lg bg-slate-200" />
            {[...Array(20)].map((_, j) => (
              <div
                key={j}
                className="h-11 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkelAdminKalendar;
