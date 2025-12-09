import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';

// De API Key wordt hier opgehaald uit de veilige server-omgeving
const apiKey = process.env.API_KEY;

// Hergebruik de systeeminstructie en kennisbasis hier op de server
const SYSTEM_INSTRUCTION = `
Je bent AImigo, de digitale studentassistent voor nieuwe studenten van de school Yonder (locatie Kasteeldreef).
Jouw doel is om studenten snel en duidelijk te helpen met praktische vragen.

VOLG DEZE REGELS STRIKT:
1. Brongebruik: Beantwoord vragen UITSLUITEND op basis van de meegeleverde KENNISBASIS. Verzin GEEN informatie die niet in de tekst staat.
2. Niet geweten: Als het antwoord niet DIRECT uit de kennisbasis te halen is, antwoord dan EXACT met: "Dat weet ik helaas niet precies. Ik raad je aan contact op te nemen met je Studieloopbaanbegeleider (SLB'er)."
3. Emotionele/Zorgvragen: Als een student aangeeft ergens mee te zitten, iets vervelends te hebben meegemaakt, een zorgvraag heeft, of emotioneel klinkt, negeer de kennisbasis en antwoord ALTIJD direct en empathisch met: "Wat vervelend dat je hiermee zit. Ik raad je aan om contact op te nemen met Elise Sleutjes (de vertrouwenspersoon) of je SLB'er. Zij kunnen je hier beter bij helpen."
4. Toon: Wees behulpzaam, duidelijk en gebruik "je/jij". Houd antwoorden kort en scanbaar.

KENNISBASIS:
${JSON.stringify(KNOWLEDGE_BASE)}
`;

export default async function handler(req, res) {
  // Alleen POST verzoeken toestaan
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguratie: API Key ontbreekt' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
        maxOutputTokens: 500,
      }
    });

    return res.status(200).json({ answer: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: 'Er ging iets mis bij het ophalen van het antwoord.' });
  }
}