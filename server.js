require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static("."));

let currentBrandData = null;

let model = null;
let useAI = false;

if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        useAI = true;
        console.log('✅ Gemini AI Connected!');
    } catch (e) {
        console.log('⚠️ Gemini failed, using fallback');
    }
} else {
    console.log('⚠️ No Gemini API key, using smart fallback');
}

function generateSmartBrand(brandName, industry, style, color) {
    const colors = {
        'Orange': { primary: '#FF6B00', secondary: '#FF9A44', accent: '#FFD700' },
        'Blue': { primary: '#0066FF', secondary: '#4D94FF', accent: '#00D4FF' },
        'Red': { primary: '#FF0000', secondary: '#FF4444', accent: '#FF6B6B' },
        'Green': { primary: '#00CC66', secondary: '#33FF99', accent: '#66FFB2' },
        'Purple': { primary: '#7B2FBE', secondary: '#A855F7', accent: '#D8B4FE' },
        'Black': { primary: '#1A1A1A', secondary: '#404040', accent: '#808080' },
        'White': { primary: '#FFFFFF', secondary: '#F5F5F5', accent: '#E0E0E0' },
        'Gold': { primary: '#FFD700', secondary: '#FFE44D', accent: '#FFED99' },
        'Silver': { primary: '#C0C0C0', secondary: '#D8D8D8', accent: '#F0F0F0' },
        'Pink': { primary: '#FF69B4', secondary: '#FF92C4', accent: '#FFB6D9' },
        'Cyan': { primary: '#00CED1', secondary: '#4DD9DB', accent: '#99E6E8' }
    };

    const colorScheme = colors[color] || colors['Blue'];
    const primaryColor = colorScheme.primary;

    const industryTaglines = {
        'Gaming': `Level Up Your Game with ${brandName}`,
        'Technology': `${brandName}: Innovating Tomorrow's World`,
        'AI': `${brandName}: Intelligence Redefined`,
        'Fashion': `${brandName}: Where Style Meets Substance`,
        'Fitness': `${brandName}: Stronger Every Day`,
        'Coffee': `${brandName}: Brewing Excellence`,
        'Restaurant': `${brandName}: A Taste of Perfection`,
        'Cyber Security': `${brandName}: Protecting What Matters`,
        'Education': `${brandName}: Empowering Minds`,
        'Music': `${brandName}: The Sound of Innovation`
    };

    const tagline = industryTaglines[industry] || `${brandName}: Elevating ${industry}`;

    const styleDesc = {
        'Modern': 'sleek, contemporary, forward-thinking',
        'Minimal': 'clean, simple, elegant',
        'Luxury': 'premium, sophisticated, exclusive',
        'Gaming': 'dynamic, energetic, bold',
        'Technology': 'innovative, futuristic, cutting-edge',
        'Corporate': 'professional, trustworthy, established',
        'Vintage': 'classic, timeless, nostalgic',
        'Elegant': 'refined, graceful, sophisticated',
        'Mascot': 'friendly, approachable, memorable'
    };

    const styleDescription = styleDesc[style] || 'modern, professional';

    const fontPairs = {
        'Modern': ['Inter', 'SF Pro Display'],
        'Minimal': ['Helvetica Neue', 'Arial'],
        'Luxury': ['Playfair Display', 'Montserrat'],
        'Gaming': ['Orbitron', 'Exo 2'],
        'Technology': ['Space Grotesk', 'JetBrains Mono'],
        'Corporate': ['Roboto', 'Open Sans'],
        'Vintage': ['Cinzel', 'Playfair Display'],
        'Elegant': ['Cormorant Garamond', 'Lato'],
        'Mascot': ['Fredoka One', 'Nunito']
    };

    const fonts = fontPairs[style] || ['Inter', 'Roboto'];

    return {
        logoConcept: `A ${style.toLowerCase()} ${styleDescription} logo for ${brandName} in the ${industry} industry`,
        primaryColor: primaryColor,
        secondaryColor: colorScheme.secondary,
        accentColor: colorScheme.accent,
        primaryFont: fonts[0],
        secondaryFont: fonts[1],
        tagline: tagline,
        brandStory: `${brandName} is a ${style.toLowerCase()} ${industry} brand that redefines excellence.`,
        targetAudience: `Professionals in the ${industry} sector.`,
        instagramBio: `✨ ${brandName} | ${style} ${industry} | ${tagline} 🌟`,
        brandVoice: `${style}, confident, and inspiring.`,
        moodBoard: `A ${style.toLowerCase()} color palette with ${primaryColor}.`,
        competitors: `Other players in the ${industry} space.`
    };
}

async function generateWithAI(brandName, industry, style, color) {
    try {
        if (!useAI || !model) {
            return generateSmartBrand(brandName, industry, style, color);
        }

        const prompt = `
Return ONLY valid JSON for this brand identity:

Brand: ${brandName}
Industry: ${industry}
Style: ${style}
Color: ${color}

{
  "logoConcept": "detailed logo concept",
  "primaryColor": "hex color",
  "secondaryColor": "hex color",
  "accentColor": "hex color",
  "primaryFont": "Google Font name",
  "secondaryFont": "Google Font name",
  "tagline": "memorable tagline",
  "brandStory": "compelling brand story (2-3 sentences)",
  "targetAudience": "detailed target audience description",
  "instagramBio": "engaging Instagram bio with emojis",
  "brandVoice": "tone of voice description",
  "moodBoard": "mood board description with colors and fonts",
  "competitors": "competitive analysis"
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```json|```/g, '').trim();
        return JSON.parse(text);

    } catch (error) {
        console.log('⚠️ AI failed, using fallback');
        return generateSmartBrand(brandName, industry, style, color);
    }
}

// ============================================
// ✅ LOGO GENERATION WITH DELAY + RETRY
// ============================================

async function generateLogo(brandName, style, retryCount = 0) {
    try {
        // ✅ SIMPLE PROMPT
        const prompt = `${brandName} ${style} logo`;
        const seed = Math.floor(Math.random() * 10000);
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}`;
        
        console.log(`🎨 Attempt ${retryCount + 1}: ${prompt}`);
        console.log(`🎲 Seed: ${seed}`);
        
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.data && response.data.length > 500) {
            console.log(`✅ Logo generated! (${(response.data.length / 1024).toFixed(1)} KB)`);
            return response.data;
        } else {
            throw new Error('Image too small');
        }
    } catch (error) {
        console.log(`❌ Attempt ${retryCount + 1} failed: ${error.message}`);
        
        // ✅ If rate limited, wait and retry
        if (error.response?.status === 429 || error.message.includes('timeout')) {
            if (retryCount < 5) {
                const delay = (retryCount + 1) * 3000; // 3s, 6s, 9s, 12s, 15s
                console.log(`⏳ Rate limited! Waiting ${delay/1000}s before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return generateLogo(brandName, style, retryCount + 1);
            } else {
                console.log('❌ Max retries reached');
            }
        }
        
        // ✅ FALLBACK: Brand name only
        try {
            console.log('🔄 Trying fallback (brand only)...');
            const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(brandName)}%20logo`;
            const fallbackResponse = await axios({
                method: 'get',
                url: fallbackUrl,
                responseType: 'arraybuffer',
                timeout: 30000
            });

            if (fallbackResponse.data && fallbackResponse.data.length > 500) {
                console.log('✅ Fallback logo generated!');
                return fallbackResponse.data;
            }
        } catch (e) {
            console.log('❌ Fallback failed');
        }
        
        return null;
    }
}

// ============================================
// ✅ MAIN GENERATE ENDPOINT
// ============================================

app.post("/generate", async (req, res) => {
    try {
        const { brandName, industry, style, color = "AI Choose" } = req.body;

        console.log(`\n🚀 Generating brand: ${brandName}`);

        const brandData = await generateWithAI(brandName, industry, style, color);
        currentBrandData = brandData;
        
        console.log('🎨 Generating logo...');
        const imageBuffer = await generateLogo(brandName, style);

        if (imageBuffer) {
            const base64Image = imageBuffer.toString('base64');
            brandData.logo = `data:image/png;base64,${base64Image}`;
            brandData.logoUrl = brandData.logo;
            console.log('✅ Logo attached!');
        } else {
            brandData.logo = null;
            brandData.logoUrl = null;
            console.log('⚠️ Logo generation failed after retries');
        }

        res.json({ 
            success: true, 
            reply: brandData
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// ============================================
// ✅ REGENERATE LOGO
// ============================================

app.post("/regenerate-logo", async (req, res) => {
    try {
        const { brandName, style } = req.body;

        console.log(`🔄 Regenerating logo for: ${brandName}`);
        const imageBuffer = await generateLogo(brandName, style);

        if (imageBuffer) {
            const base64Image = imageBuffer.toString('base64');
            const logo = `data:image/png;base64,${base64Image}`;
            console.log('✅ Logo regenerated!');
            res.json({ success: true, logo: logo });
        } else {
            res.json({ success: false, message: "Failed to generate logo" });
        }

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// ============================================
// ✅ HEALTH CHECK
// ============================================

app.get("/health", (req, res) => {
    res.json({ 
        status: "OK", 
        timestamp: new Date().toISOString(),
        ai: useAI ? 'Connected' : 'Fallback Mode'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`🤖 AI Mode: ${useAI ? 'ENABLED' : 'FALLBACK'}`);
    console.log(`🎨 Logo generator with retry & delay!\n`);
});