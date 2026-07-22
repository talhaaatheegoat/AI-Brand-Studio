require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios"); // ✅ Added axios for image generation

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // ✅ Increased limit for images
app.use(express.static("."));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp" // ✅ Using stable model
});

// ============================================
// ✅ FIXED: WORKING IMAGE GENERATION
// ============================================

async function generateLogoImage(prompt) {
    try {
        // ✅ SHORTEN the prompt - Pollinations works better with short prompts
        const cleanPrompt = prompt.replace(/[^a-zA-Z0-9, ]/g, '').substring(0, 100);
        
        console.log('🎨 Generating image with prompt:', cleanPrompt);
        
        // ✅ REMOVED all parameters - just the prompt
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}`;
        
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            timeout: 20000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        // ✅ Check if we got valid image data
        if (!response.data || response.data.length < 1000) {
            throw new Error('Invalid image data received');
        }

        console.log(`✅ Image generated! Size: ${response.data.length} bytes`);
        return response.data;

    } catch (error) {
        console.error('❌ Image generation failed:', error.message);
        
        // ✅ FALLBACK: Try even simpler prompt
        try {
            console.log('🔄 Trying fallback with simpler prompt...');
            // Extract just brand name from prompt
            const brandMatch = prompt.match(/Brand Name:\s*([^\n]+)/);
            const brandName = brandMatch ? brandMatch[1].trim() : 'Logo';
            
            const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(`${brandName} logo simple minimal`)}`;
            
            const fallbackResponse = await axios({
                method: 'get',
                url: fallbackUrl,
                responseType: 'arraybuffer',
                timeout: 20000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (fallbackResponse.data && fallbackResponse.data.length > 1000) {
                console.log(`✅ Fallback succeeded! Size: ${fallbackResponse.data.length} bytes`);
                return fallbackResponse.data;
            }
        } catch (fallbackError) {
            console.error('❌ Fallback also failed:', fallbackError.message);
        }

        throw new Error('All image generation attempts failed');
    }
}

// ============================================
// ✅ MAIN GENERATION ENDPOINT
// ============================================

app.post("/generate", async (req, res) => {

    try {

        const {
            brandName,
            industry,
            style,
            color = "AI Choose"
        } = req.body;

        // ✅ 1. Generate brand identity with Gemini
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

        console.log(`\n🚀 Generating brand for: ${brandName}`);
        console.log(`📝 Sending prompt to Gemini...`);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean the response
        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const json = JSON.parse(text);
        console.log('✅ Brand text generated successfully');

        // ✅ 2. Generate logo image
        const logoPrompt = `
Professional ${style} logo for a ${industry} company.

Brand Name: ${brandName}

Primary Color: ${json.primaryColor}

Style: ${style}

Requirements:
- Modern vector logo
- Clean minimalist design
- White background
- Flat design
- No mockup
- High quality
- Centered
`;

        console.log('🎨 Generating logo image...');

        try {
            const logoBuffer = await generateLogoImage(logoPrompt);
            const logoBase64 = Buffer.from(logoBuffer).toString("base64");
            json.logo = `data:image/png;base64,${logoBase64}`;
            console.log('✅ Logo generated successfully!');
        } catch (imageError) {
            console.error('❌ Logo generation failed:', imageError.message);
            // ✅ Send null logo but keep the brand data
            json.logo = null;
            json.imageError = imageError.message;
        }

        console.log('✅ Brand generation complete!\n');

        res.json({
            success: true,
            reply: json
        });

    } catch (error) {

        console.error('❌ Error:', error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

// ============================================
// ✅ HEALTH CHECK ENDPOINT
// ============================================

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "AI Brand Studio is running",
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`🎨 Ready to generate brands!\n`);
});