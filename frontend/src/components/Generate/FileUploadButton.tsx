import { cn } from "@/utils/classNameMerge";
import { ChangeEvent } from "react";

interface Props {
  className?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploadButton = ({ className, file, onFileChange }: Props) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null; // Get the first file selected
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div
      className={cn(
        "w-full relative outline-base-06 -outline-offset-2 outline rounded-[12px] bg-purple-03 h-[140px] flex",
        className,
      )}
    >
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor={file ? undefined : "file-upload"}
        className="size-full flex flex-col items-center justify-center gap-2 text-text-base/50 cursor-pointer"
        onClick={file ? () => onFileChange(null) : () => {}}
      >
        <h1 className="font-bold text-[20px]">
          {file ? file.name : "Upload a PDF"}
        </h1>
        <p className="max-w-[200px] text-center leading-[18px]">
          {file
            ? "Click to unstage this file "
            : " Upload a PDF of notes, slides, or any other source content"}
        </p>
      </label>
    </div>
  );
};

export default FileUploadButton;
