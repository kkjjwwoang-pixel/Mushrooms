import { GoogleGenAI } from "@google/genai";

// Initialize the client with the API key from environment variables
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates text response for chat.
 */
export const generateChatResponse = async (
  prompt: string, 
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Create a chat session to handle history if needed, or just generate content
    // For simplicity in this function, we'll use generateContent but formatted for chat if needed.
    // However, to keep it simple and stateless here, we will just send the prompt.
    // In a real app, you'd pass the `history` to ai.chats.create()
    
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful and creative AI assistant called Gemini Studio. Answer concisely and helpful in Korean or English depending on the input.",
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Chat generation error:", error);
    throw new Error("Failed to generate chat response.");
  }
};

/**
 * Generates an image based on a prompt.
 * Uses gemini-2.5-flash-image model.
 */
export const generateImageResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        // gemini-2.5-flash-image specific config if needed, usually defaults are fine for simple use
        // Note: aspect ratio is handled by the model, we can specify if we want via config
      },
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response.");
  } catch (error) {
    console.error("Image generation error:", error);
    throw new Error("Failed to generate image.");
  }
};