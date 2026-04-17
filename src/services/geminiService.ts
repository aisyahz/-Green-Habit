import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateEcoTip(completedHabits: string[]): Promise<string> {
  const model = "gemini-3-flash-preview";
  
  const prompt = completedHabits.length > 0
    ? `The user has completed these eco-friendly habits today: ${completedHabits.join(", ")}. 
       Give them a short, encouraging sustainability tip based on this activity or general green living. 
       Limit it to 1-2 sentences maximum. Keep it friendly and nature-inspired.`
    : `The user hasn't recorded any habits today. 
       Give them a short, motivating eco-friendly tip to start their day. 
       Limit it to 1-2 sentences maximum. Keep it friendly and nature-inspired.`;

  try {
    const response = await genAI.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });
    
    return response.text.trim() || "Every small action counts! Keep nurturing the planet. 🌱";
  } catch (error) {
    console.error("Error generating eco tip:", error);
    return "The earth thrives on your small daily efforts. Keep up the green work! 🌍";
  }
}
