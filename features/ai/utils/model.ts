import { mistral } from "@ai-sdk/mistral";

export const DEFAULT_CHAT_MODEL = "mistral-small-latest";

export function getChatModel(modelId?: string | null) {
  return mistral(modelId || DEFAULT_CHAT_MODEL);
}
