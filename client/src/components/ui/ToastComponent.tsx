import { cn } from "@/lib/utils";
import { ToasterProps } from "sonner";
import { toast } from "sonner";

interface customProps extends ToasterProps {
  type?: string;
  title: string;
  description?: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

const ToastComponent = (props: customProps) => {
  const { type, title, description, button, id } = props;

  return (
    <div
      className={cn(
        "flex w-full items-center rounded-lg border-2 bg-slate-100 p-4 ring-1 ring-black/5 md:max-w-[364px]",
        type === "yes" ? "border-green-500" : "border-red-500",
      )}
    >
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-slate-900">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-slate-700">{description}</p>
          )}
        </div>
      </div>
      {button && (
        <div className="focus:outline-hidden ml-5 shrink-0 rounded-md text-sm font-medium text-slate-100 hover:text-slate-200 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
          <button
            className="cursor-pointer rounded bg-slate-700 px-3 py-1 text-sm font-semibold text-slate-100 transition-all duration-300 hover:bg-slate-500"
            onClick={() => {
              button.onClick();
              toast.dismiss(id);
            }}
          >
            {button.label}
          </button>
        </div>
      )}
    </div>
  );
};

export default ToastComponent;
