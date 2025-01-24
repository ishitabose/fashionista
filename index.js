const dotenv = require("dotenv")
dotenv.config()



const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "you are a personal fashion adviser with one of the best fashion taste,your choice is outstanding,desicive ,your answers are short and very to the point",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "what can i as boy wear to a college party "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Dark jeans or chinos, a well-fitting t-shirt or casual button-down, and clean sneakers or boots.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "give the colour combo"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Navy/grey, black/white, olive/khaki.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "in details ,like colour of shirt/t-shirt,jeans and shoes"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay:\n\n*   **Option 1 (Classic):**  Charcoal grey t-shirt, dark wash jeans, white sneakers.\n*   **Option 2 (Slightly Edgy):** Black button-down (unbuttoned top few), black jeans, black boots.\n*  **Option 3 (Earth Tones):** Olive green t-shirt, khaki chinos, brown leather sneakers.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "what should my entire outfit if i am wearing a black top and its winter season"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Black top, dark wash jeans or charcoal pants, a dark-colored jacket (like a bomber or a wool coat), and black or dark brown boots.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(`what will pair well with it ${prompt} and answer in bullet points`);
    console.log(result.response.text());
    return result.response.text()
  }
  
  run("I am having a black jacket");

  module.exports = {run}