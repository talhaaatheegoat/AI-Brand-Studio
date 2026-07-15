require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

app.post("/generate", async (req, res) => {

    try {

        const {
            brandName,
            industry,
            style,
            color = "AI Choose"
        } = req.body;

        const prompt = `
You are a professional branding expert.

Return ONLY valid JSON.

Never use markdown.
Never use backticks.
Never explain anything.

Return exactly this structure:

{
  "logoConcept":"",
  "primaryColor":"",
  "secondaryColor":"",
  "accentColor":"",
  "primaryFont":"",
  "secondaryFont":"",
  "tagline":"",
  "brandStory":"",
  "targetAudience":"",
  "instagramBio":""
}

Brand Name: ${brandName}
Industry: ${industry}
Style: ${style}
Preferred Primary Color: ${color}

If the preferred color is "AI Choose", choose the best color yourself.
`;

        console.log("Generating brand identity...");

        const result = await model.generateContent(prompt);

        const response = await result.response;

        let text = response.text();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const json = JSON.parse(text);

        console.log("Brand generated successfully.");

        res.json({
            success: true,
            reply: json
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});