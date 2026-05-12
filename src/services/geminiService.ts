import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFinancialInsights(data: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é um consultor financeiro especializado em pequenos mercados. 
      Analise estes dados de vendas e estoque: ${JSON.stringify(data)}.
      Forneça 2 insights curtos e práticos sobre o que o dono do mercado deve fazer hoje para aumentar o lucro ou evitar perdas. 
      Retorne em formato JSON com um campo 'insights' que é um array de strings.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const json = JSON.parse(response.text || '{"insights": []}');
    return json.insights;
  } catch (error) {
    console.error("Erro ao obter insights da IA:", error);
    return [
      "O pão francês está com alta demanda hoje.",
      "Verifique o estoque de bebidas geladas."
    ];
  }
}

export async function getInventorySuggestions(products: any[]) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analise este estoque: ${JSON.stringify(products)}. 
        Identifique 2 produtos que precisam de reposição urgente baseando-se no estoque mínimo.
        Retorne em formato JSON com um campo 'suggestions' que é um array de strings.`,
        config: {
          responseMimeType: "application/json"
        }
      });
  
      const json = JSON.parse(response.text || '{"suggestions": []}');
      return json.suggestions;
    } catch (error) {
      console.error("Erro ao obter sugestões de estoque:", error);
      return [];
    }
  }
