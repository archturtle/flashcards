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
          "focus:outline bg-base-06/15 text-text-base placeholder:text-subtle-03 focus:-outline-offset-[3px] focus:bg-base-06/30 focus:outline-primary-03 focus:outline-[3px] scrollbar-hide",
          {},
          className,
        )}
        ref={ref}
        rows={4}
        disabled={isDisabled}
        {...props}
      />
    );
  },
);
TextArea.displayName = "TextArea";

export default TextArea;
