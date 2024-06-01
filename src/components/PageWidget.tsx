import clsx from "clsx";
import { Widget } from "../utils/interfaces";

function PageWidget({ props }: { props: Widget }) {
  return (
    <div
      onClick={props.onClick}
      className="flex flex-wrap bg-white lg:w-[90%] w-full h-full shadow-md px-4 py-4 rounded-md items-center justify-between cursor-pointer"
    >
      <div
        className={clsx(
          `bg-primary-100 rounded-full flex items-center justify-center text-center ${props.classses}`,
          {
            "w-12 h-12": !props.classses,
          }
        )}
      >
        {props.number ? (
          <h1
            className={clsx(`font-bold text-primary-500 text-lg`, {
              "text-5xl": !props.classses,
            })}
          >
            {props.number}
          </h1>
        ) : (
          <props.icon className="text-primary-500" size={25} />
        )}
      </div>
      <div className="flex-1 pl-4">
        <h1
          className={clsx("font-semibold", {
            "text-xl": props.classses,
          })}
        >
          {props.title}
        </h1>
        <p className="text-slate-500 text-sm">{props.span}</p>
      </div>
    </div>
  );
}

export default PageWidget;
