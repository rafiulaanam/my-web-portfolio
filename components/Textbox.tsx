import { cx } from "class-variance-authority";
import { HTMLAttributes, useId } from "react";

interface Props extends HTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  required?: boolean;
}

const Textbox = ({ label, name, required, className, ...rest }: Props) => {
  const id = useId();

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-6 text-gray-900 flex gap-1 mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={cx(
          `block w-full rounded-md border-0 p-1.5 px-3 text-gray-900 shadow-sm
      ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
      focus:ring-inset focus:ring-primary-600  sm:text-sm sm:leading-6 focus-visible:outline-none`,
          className
        )}
        rows={4}
        cols={50}
        placeholder={label}
        {...rest}
        required={required}
      />
    </div>
  );
};

export default Textbox;
