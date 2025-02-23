import { GenerateCardPayload } from "@/store/react-query/generateCards/types";
import { isEmpty } from "lodash";
import Button from "../ui/Button";
import TextArea from "../ui/TextArea";
import FileUploadButton from "./FileUploadButton";

interface Props {
  onGenerate: () => void;
  generatePayload: GenerateCardPayload;
  onGeneratePayloadChange: (p: GenerateCardPayload) => void;
}

const GenerateCardForm = ({
  onGenerate,
  generatePayload,
  onGeneratePayloadChange,
}: Props) => {
  const { prompt, file } = generatePayload;

  const setPrompt = (prompt: string) => {
    onGeneratePayloadChange({ ...generatePayload, prompt });
  };

  const setSelectedFile = (file: File | null) => {
    onGeneratePayloadChange({ ...generatePayload, file });
  };

  const isCTADisabled = isEmpty(prompt);

  return (
    <>
      <TextArea
        className="rounded-[12px] outline outline-base-06/30 resize-none -outline-offset-2 px-[28px] py-[24px] placeholder-base-06 text-[24px] font-medium flex-1"
        placeholder="Describe the cards you want to generate..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <FileUploadButton
        file={file}
        onFileChange={setSelectedFile}
        className="h-[200px]"
      />
      <Button
        variant="primary"
        className="text-[32px] font-bold"
        isDisabled={isCTADisabled}
        onClick={onGenerate}
      >
        Generate Flashcards
      </Button>
    </>
  );
};

export default GenerateCardForm;
