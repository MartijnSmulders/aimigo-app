// Deze service praat nu met onze eigen beveiligde backend (/api/chat)
// In plaats van direct met Google Gemini. Hierdoor blijft de API key geheim.

export const getAImigoResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data.answer || "Er is geen antwoord ontvangen.";
    
  } catch (error) {
    console.error("Connection Error:", error);
    return "Sorry, ik kon even geen verbinding maken met de server. Probeer het later nog eens.";
  }
};