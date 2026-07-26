require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static("."));

// ✅ STORE CURRENT BRAND DATA FOR REIMAGINE
let currentBrandData = null;

// ✅ CHECK API KEY
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

// ============================================
// ✅ SMART FALLBACK BRAND GENERATOR
// ============================================

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
        brandStory: `${brandName} is a ${style.toLowerCase()} ${industry} brand that redefines excellence through innovation, quality, and unwavering commitment to customer satisfaction.`,
        targetAudience: `Forward-thinking professionals, industry innovators, and quality-conscious consumers in the ${industry} sector who value ${style.toLowerCase()} design and exceptional experiences.`,
        instagramBio: `✨ ${brandName} | ${style} ${industry} | ${tagline} 🌟`,
        brandVoice: `${style}, confident, and inspiring. We speak with authority while remaining approachable and human.`,
        moodBoard: `A ${style.toLowerCase()} color palette with ${primaryColor} as the primary color, complemented by ${colorScheme.secondary} and ${colorScheme.accent}. Clean typography with ${fonts[0]} and ${fonts[1]}.`,
        competitors: `Other players in the ${industry} space include [Competitor 1], [Competitor 2], and [Competitor 3]. ${brandName} differentiates through ${style.toLowerCase()} design and innovative approach.`
    };
}

// ============================================
// ✅ AI-POWERED GENERATION
// ============================================

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
// ✅ SIMPLER LOGO GENERATION - JUST WORKS
// ============================================

async function generateLogo(brandName, industry, style, logoConcept) {
    try {
        // ✅ SIMPLE PROMPT - NO COMPLICATED COLOR NAMES
        const prompt = `${brandName} ${logoConcept || industry} logo, ${style}, minimal, vector, flat, white background`;
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        
        console.log(`🎨 Generating logo...`);
        console.log(`📸 URL: ${url.substring(0, 100)}...`);
        
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            timeout: 30000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.data && response.data.length > 1000) {
            console.log(`✅ Image generated! (${(response.data.length / 1024).toFixed(1)} KB)`);
            return response.data;
        } else {
            throw new Error('Image too small');
        }
    } catch (error) {
        console.error('❌ Logo generation failed:', error.message);
        
        // ✅ FALLBACK
        try {
            console.log('🔄 Trying fallback...');
            const fallbackPrompt = `${brandName} logo simple`;
            const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackPrompt)}`;
            
            const fallbackResponse = await axios({
                method: 'get',
                url: fallbackUrl,
                responseType: 'arraybuffer',
                timeout: 30000
            });

            if (fallbackResponse.data && fallbackResponse.data.length > 1000) {
                console.log('✅ Fallback image generated!');
                return fallbackResponse.data;
            }
        } catch (e) {
            console.error('❌ Fallback failed:', e.message);
        }
        
        return null;
    }
}

// ============================================
// ✅ REGENERATE LOGO - DIFFERENT PROMPT EACH TIME
// ============================================

async function regenerateLogo(brandName, industry, style, logoConcept) {
    try {
        // ✅ DIFFERENT PROMPTS FOR VARIETY
        const prompts = [
            `${brandName} ${logoConcept || industry} logo, ${style}, minimal, vector, flat`,
            `${brandName} ${industry} logo, ${style}, creative, modern`,
            `${brandName} logo, ${style}, professional, elegant`,
            `${brandName} ${logoConcept || industry} icon, ${style}, bold`,
            `${brandName} brand mark, ${style}, minimalist`,
            `${brandName} ${industry} symbol, ${style}, flat, vector`
        ];

        // ✅ Pick random prompt
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const prompt = prompts[randomIndex];
        const seed = Math.floor(Math.random() * 10000);
        
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}`;
        
        console.log(`🎨 Regenerating with prompt ${randomIndex + 1}/${prompts.length}`);
        console.log(`🎲 Seed: ${seed}`);
        
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer',
            timeout: 60000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.data && response.data.length > 1000) {
            console.log(`✅ New logo generated! (${(response.data.length / 1024).toFixed(1)} KB)`);
            return response.data;
        } else {
            throw new Error('Image too small');
        }
    } catch (error) {
        console.error('❌ Regenerate failed:', error.message);
        
        // ✅ FALLBACK
        try {
            console.log('🔄 Trying fallback...');
            const fallbackPrompt = `${brandName} logo ${style}`;
            const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackPrompt)}?seed=${Date.now()}`;
            
            const fallbackResponse = await axios({
                method: 'get',
                url: fallbackUrl,
                responseType: 'arraybuffer',
                timeout: 45000
            });

            if (fallbackResponse.data && fallbackResponse.data.length > 1000) {
                console.log('✅ Fallback logo generated!');
                return fallbackResponse.data;
            }
        } catch (e) {
            console.error('❌ Fallback failed:', e.message);
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
        const imageBuffer = await generateLogo(brandName, industry, style, brandData.logoConcept);

        if (imageBuffer) {
            const base64Image = imageBuffer.toString('base64');
            brandData.logo = `data:image/png;base64,${base64Image}`;
            brandData.logoUrl = brandData.logo;
            console.log('✅ Logo attached!');
        } else {
            brandData.logo = null;
            brandData.logoUrl = null;
            console.log('⚠️ Logo generation failed');
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
// ✅ REGENERATE LOGO ENDPOINT
// ============================================

app.post("/regenerate-logo", async (req, res) => {
    try {
        const { brandName, industry, style, logoConcept } = req.body;

        console.log(`🔄 Regenerating logo for: ${brandName}`);
        
        const imageBuffer = await regenerateLogo(brandName, industry, style, logoConcept);

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
    console.log(`🎨 Pollinations ready!\n`);
});