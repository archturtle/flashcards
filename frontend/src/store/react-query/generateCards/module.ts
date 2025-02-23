import { useMutation } from "@tanstack/react-query";
import { GenerateCardPayload } from "./types";
import axinst from "@/utils/axiosInstance";
import config from "../../../../config";

export const useGenerateCards = (payload: GenerateCardPayload) => {
  const generateCards = async () => {
    const formData = new FormData();
    formData.append("prompt", payload.prompt);
    if (payload.file) {
      formData.append("file", payload.file);
    }

    const response = await axinst.post(
      `${config.api.development}/card/generate`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    return response.data;
  };

  return useMutation({
    mutationFn: generateCards,
  });
};
