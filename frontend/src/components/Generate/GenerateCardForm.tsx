import { isEmpty } from "lodash";
import { useState } from "react";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import FileUploadButton from "./FileUploadButton";

interface Props {}

const GenerateCardForm = ({}: Props) => {
  const [prompt, setPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isCTADisabled = isEmpty(prompt);

  return (
    <>
      <TextArea
        className="rounded-[12px] outline outline-base-06/30 resize-none -outline-offset-2 px-[28px] py-[24px] placeholder-base-06 text-[24px] focus:placeholder-forest-07/70 flex-1"
        placeholder="Describe the cards you want to generate..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <FileUploadButton
        file={selectedFile}
        onFileChange={setSelectedFile}
        className="h-[200px]"
      />
      <Button
        variant="primary"
        className="text-[32px] font-bold"
        isDisabled={isCTADisabled}
      >
        Generate Flashcards
      </Button>
    </>
  );
};

export default GenerateCardForm;
