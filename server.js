require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static("."));

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
        'AI Choose': { primary: '#6366F1', secondary: '#818CF8', accent: '#A5B4FC' },
        'Orange': { primary: '#FF6B00', secondary: '#FF9A44', accent: '#FFD700' },
        'Blue': { primary: '#0066FF', secondary: '#4D94FF', accent: '#00D4FF' },
        'Red': { primary: '#EF4444', secondary: '#F87171', accent: '#FCA5A5' },
        'Green': { primary: '#10B981', secondary: '#34D399', accent: '#6EE7B7' },
        'Purple': { primary: '#7B2FBE', secondary: '#A855F7', accent: '#D8B4FE' },
        'Black': { primary: '#1A1A1A', secondary: '#404040', accent: '#808080' },
        'White': { primary: '#FFFFFF', secondary: '#F5F5F5', accent: '#E0E0E0' },
        'Gold': { primary: '#FFD700', secondary: '#FFE44D', accent: '#FFED99' },
        'Silver': { primary: '#C0C0C0', secondary: '#D8D8D8', accent: '#F0F0F0' },
        'Pink': { primary: '#EC4899', secondary: '#F472B6', accent: '#FBCFE8' },
        'Cyan': { primary: '#06B6D4', secondary: '#22D3EE', accent: '#67E8F9' }
    };

    let colorScheme = colors[color];
    if (!colorScheme) {
        const colorKeys = Object.keys(colors);
        const randomColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        colorScheme = colors[randomColor];
    }
    const primaryColor = colorScheme.primary;

    const taglines = [
        `${brandName}: Innovating Tomorrow's World`,
        `${brandName}: Where Innovation Meets Excellence`,
        `${brandName}: Redefining ${industry || 'Brand'}`,
        `${brandName}: The Future of ${industry || 'Brand'}`,
        `${brandName}: Elevating Your Experience`,
        `Experience the ${brandName} Difference`
    ];
    const tagline = taglines[Math.floor(Math.random() * taglines.length)];

    const styleDescriptions = {
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

    const styleDescription = styleDescriptions[style] || 'modern, professional';

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

    const fonts = fontPairs[style] || ['Poppins', 'Roboto'];

    const audiences = {
        'Technology': 'Tech-savvy professionals, early adopters, digital natives aged 22-45 who value innovation',
        'Gaming': 'Gamers aged 16-35, esports enthusiasts, content creators who demand performance',
        'AI': 'Data scientists, tech executives, business leaders aged 28-60 seeking competitive advantage',
        'Fashion': 'Fashion-conscious consumers aged 18-40, trendsetters, style influencers',
        'Fitness': 'Health-conscious individuals aged 20-50, athletes, fitness enthusiasts',
        'Coffee': 'Coffee lovers aged 22-65, remote workers, foodies, morning commuters',
        'Restaurant': 'Food enthusiasts aged 25-60, families, corporate clients',
        'Music': 'Music lovers aged 15-45, musicians, producers, concert-goers',
        'Education': 'Students aged 5-55, parents, educators, lifelong learners'
    };

    const targetAudience = audiences[industry] ||
        `Professionals and consumers in the ${industry || 'brand'} space who value quality and innovation`;

    const instagramBio = `✨ ${brandName} | ${style} ${industry || 'Brand'}\n📌 ${tagline}\n👇 Join the movement\n#${brandName.replace(/\s/g, '')}`;

    const brandStory = `${brandName} was born from a vision to transform the ${industry || 'brand'} landscape. With a ${style.toLowerCase()} approach and unwavering commitment to excellence, ${brandName} creates meaningful experiences that resonate with today's audience. Every touchpoint has been meticulously crafted to tell a compelling story of innovation and quality.`;

    return {
        logoConcept: `A ${style.toLowerCase()} ${styleDescription} logo for ${brandName} in the ${industry} industry, featuring a distinctive mark with clean geometry`,
        primaryColor: primaryColor,
        secondaryColor: colorScheme.secondary,
        accentColor: colorScheme.accent,
        primaryFont: fonts[0],
        secondaryFont: fonts[1],
        tagline: tagline,
        brandStory: brandStory,
        targetAudience: targetAudience,
        instagramBio: instagramBio
    };
}

async function generateWithAI(brandName, industry, style, color) {
    try {
        if (!useAI || !model) {
            return generateSmartBrand(brandName, industry, style, color);
        }

        const prompt = `Return ONLY valid JSON for this brand:
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
  "brandStory": "compelling brand story",
  "targetAudience": "target audience description",
  "instagramBio": "Instagram bio with emojis"
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
// ✅ ENDPOINTS
// ============================================

app.post("/generate", async (req, res) => {
    try {
        const { brandName, industry, style = 'Modern', color = 'AI Choose' } = req.body;

        if (!brandName || !industry) {
            return res.status(200).json({ success: false, message: 'Brand name and industry are required' });
        }

        console.log(`\n🚀 Generating brand: ${brandName}`);

        const brandData = await generateWithAI(brandName, industry, style, color);
        brandData.logo = null;
        brandData.logoUrl = null;
        console.log('✅ Brand data generated!');

        res.status(200).json({ success: true, reply: brandData });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(200).json({ success: false, message: error.message });
    }
});

app.post("/regenerate-logo", async (req, res) => {
    res.status(200).json({ success: true });
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", ai: useAI ? 'Connected' : 'Fallback Mode' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`🤖 AI Mode: ${useAI ? 'ENABLED' : 'FALLBACK'}`);
    console.log(`🎨 Canvas logos ready!\n`);
});