// import { GoogleGenAI } from "@google/genai";
export async function POST(req: Request) {
  // const apiKey = process.env.GEMINI_API_KEY; 
  // if (!apiKey) { 
  // throw new Error("API key missing"); 
  // } 
  // const ai = new GoogleGenAI({ apiKey }); 
  // const response = await ai.models.generateContent({ 
  // model: "gemini-2.0-flash", 
  // contents: 
  // Extract structured data from this text: 
  // "${input}" // Return ONLY valid JSON: 
  // { // "resource": "", 
  // "quantity": "", // "location": "", 
  // "urgency": "" 
  // } 
  // , 
  // });
  try {
    const { input } = await req.json();

    const lowerInput = input.toLowerCase();

    // ---------- Resource Detection ----------
    let resource = "food";

    if (
      lowerInput.includes("blanket") ||
      lowerInput.includes("clothes")
    ) {
      resource = "blankets";
    } else if (
      lowerInput.includes("water") ||
      lowerInput.includes("bottle")
    ) {
      resource = "water";
    } else if (
      lowerInput.includes("medicine") ||
      lowerInput.includes("medical")
    ) {
      resource = "medicine";
    }

    // ---------- Quantity Extraction ----------
    const quantityMatch = lowerInput.match(/\d+/);
    const quantity = quantityMatch
      ? Number(quantityMatch[0])
      : 1;

    // ---------- Location Detection ----------
    let location = "nearby area";

    if (lowerInput.includes("station")) {
      location = "railway station";
    } else if (lowerInput.includes("hospital")) {
      location = "hospital area";
    } else if (lowerInput.includes("school")) {
      location = "school zone";
    } else if (lowerInput.includes("market")) {
      location = "market area";
    }

    // ---------- Urgency Detection ----------
    let urgency = "low";

    if (
      lowerInput.includes("urgent") ||
      lowerInput.includes("immediately") ||
      lowerInput.includes("asap")
    ) {
      urgency = "high";
    } else if (
      quantity > 20 ||
      resource === "medicine"
    ) {
      urgency = "medium";
    }

    // ---------- Suggestion Logic ----------
    let suggestion = "Contact nearby NGO";

    switch (resource) {
      case "food":
        suggestion = "Contact food donation NGO";
        break;

      case "blankets":
        suggestion = "Send blankets to shelter home";
        break;

      case "water":
        suggestion = "Coordinate water distribution team";
        break;

      case "medicine":
        suggestion = "Notify nearby health center";
        break;
    }

    // ---------- Confidence Score ----------
    const confidence = Math.floor(
      Math.random() * (98 - 85 + 1) + 85
    );

    const mockResponse = {
      resource,
      quantity,
      location,
      urgency,
      suggestion,
      confidence,
    };

    return Response.json({ data: mockResponse });
  } catch (error: any) {
    console.error("REAL ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}