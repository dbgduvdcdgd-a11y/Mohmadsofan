import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash-image';

export async function generateImage(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [{ text: prompt }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart?.inlineData?.data) {
            return firstPart.inlineData.data;
        }
        
        throw new Error("Image generation failed: No image data received from API.");
    } catch (error) {
        console.error("Error in generateImage:", error);
        throw new Error("Failed to generate image. Please check the console for details.");
    }
}

interface ImagePayload {
    mimeType: string;
    data: string;
}

export async function editImage(prompt: string, image: ImagePayload): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [
                    { inlineData: image },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const firstPart = response.candidates?.[0]?.content?.parts?.[0];
        if (firstPart?.inlineData?.data) {
            return firstPart.inlineData.data;
        }

        throw new Error("Image editing failed: No image data received from API.");
    } catch (error) {
        console.error("Error in editImage:", error);
        throw new Error("Failed to edit image. Please check the console for details.");
    }
}
