import { cn } from "@/utils/classNameMerge";
import { forwardRef, TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "disabled"> {
  isDisabled?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, isDisabled = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "focus:outline bg-subtle-06/15 text-text placeholder:text-subtle-03 focus:-outline-offset-[3px] focus:bg-primary-03 focus:outline-forest-07 focus:text-forest-07 focus:outline-[3px]",
          {},
          className,
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export default TextArea;
