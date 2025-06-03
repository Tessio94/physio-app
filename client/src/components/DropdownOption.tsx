interface DropdownOptionProps {
  id: string;
  icon: string;
  name: string;
  selectService?: (id: string) => void;
  selectTherapist?: (id: string) => void;
  toggleBlur: () => void;
  type: "service" | "therapist";
}

const DropdownOption = ({
  id,
  icon,
  name,
  selectService,
  selectTherapist,
  toggleBlur,
  type,
}: DropdownOptionProps) => {
  if (type === "service") {
    if (name === "Kineziterapija") {
      return (
        <li
          className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200"
          onClick={() => {
            selectService?.(id);
            toggleBlur();
          }}
        >
          <div className="flex h-fit w-fit items-center justify-center overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:bg-slate-200">
            <img src={`${icon}`} width={30} height={30} />
          </div>
          {name}
        </li>
      );
    }

    return (
      <li
        className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200"
        onClick={() => {
          selectService?.(id);
          toggleBlur();
        }}
      >
        <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:bg-slate-200">
          <img src={`${icon}`} width={30} height={30} />
        </div>
        {name}
      </li>
    );
  }

  return (
    <li
      className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-2 transition-all hover:bg-slate-600 hover:text-slate-200"
      onClick={() => {
        selectTherapist?.(id);
        toggleBlur();
      }}
    >
      <div className="h-fit w-fit overflow-hidden rounded-full border-[1px] border-slate-500 border-opacity-45 transition-all group-hover:bg-slate-200">
        <img src={`${icon}`} width={30} height={30} />
      </div>
      {name}
    </li>
  );
};

export default DropdownOption;
