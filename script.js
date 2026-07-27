const generateBtn = document.getElementById("generateBtn");
const brandNameInput = document.getElementById("brandName");
const industryInput = document.getElementById("industry");
const styleSelect = document.getElementById("style");
const colorSelect = document.getElementById("color");
const resultSection = document.getElementById("result");
const loading = document.getElementById("loading");
const historyContainer = document.getElementById("history");
let currentBrandData = null;
let currentLogoUrl = "";

loading.style.display = "none";

// ✅ Auto-detect API URL
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://ai-brand-studio-production.up.railway.app';

console.log(`📡 API URL: ${API_URL}`);

// ✅ Smart color mapper
function cleanColor(color) {
    if (!color) return '#1A1A1A';
    const hexMatch = color.match(/#[a-fA-F0-9]{6}/);
    if (hexMatch) return hexMatch[0];
    const colorMap = {
        'black': '#1A1A1A', 'white': '#FFFFFF', 'gold': '#FFD700',
        'silver': '#C0C0C0', 'blue': '#0066FF', 'red': '#EF4444',
        'green': '#10B981', 'purple': '#7B2FBE', 'pink': '#EC4899',
        'orange': '#FF6B00', 'cyan': '#06B6D4', 'teal': '#0D9488',
        'rose': '#F43F5E', 'ai choose': '#6366F1'
    };
    return colorMap[(color || '').toLowerCase().trim()] || '#1A1A1A';
}

// ============================================================
// 🎨 60+ CANVAS LOGO STYLES
// ============================================================

const LOGO_STYLES = [
    'Premium Gold', 'Luxury', 'Elegant', 'Classic', 'Vintage', 'Retro',
    'Modern', 'Minimal', 'Sleek', 'Bold', 'Geometric', 'Abstract',
    'Tech', 'Futuristic', 'Cyberpunk', 'Synthwave', 'Neon', 'Holographic',
    'Watercolor', 'Sketch', 'Pixel', 'Glitch', 'Pop Art', 'Graffiti',
    'Organic', 'Nature', 'Earthy', 'Bohemian', 'Zen', 'Tropical',
    'Steampunk', 'Art Deco', 'Glassmorphism', 'Metal', 'Chrome', 'Aurora',
    'Cosmic', 'Playful', 'Whimsical', 'Cartoon', 'Kawaii', 'Groovy',
    'Dark Mode', 'Noir', 'Shadow', 'Midnight', 'Rainbow', 'Pastel',
    'Tribal', 'Celtic', 'Japanese', 'Scandinavian', 'Mediterranean'
];

// 🎨 25+ GRADIENT BACKGROUNDS
const GRADIENT_BACKGROUNDS = [
    ['#0f0c29', '#302b63', '#24243e'], ['#000428', '#004e92', '#000428'],
    ['#1a1a2e', '#16213e', '#0f3460'], ['#0d0d0d', '#1a1a2e', '#16213e'],
    ['#0f0f0f', '#232323', '#1a1a1a'], ['#0b0b1a', '#1a1a3e', '#2d1b69'],
    ['#0a0a0a', '#1a1a2e', '#0f3460'], ['#0d0d0d', '#1a1a1a', '#2d2d2d'],
    ['#000000', '#0d0d0d', '#1a1a1a'], ['#0a0a23', '#1a1a4e', '#141452'],
    ['#0c1445', '#1a2a6c', '#3a7bd5'], ['#1a2980', '#26d0ce', '#1a2980'],
    ['#2d1b69', '#4a2c8a', '#7b2fbe'], ['#1a0a2e', '#2d1b69', '#5b2fbe'],
    ['#1a0a00', '#3d1a0a', '#5a2a1a'], ['#1a0a0a', '#3d1a1a', '#5a2a2a'],
    ['#0a1a0a', '#1a3a1a', '#2a5a2a'], ['#0a1a0a', '#1a4a1a', '#2a6a2a'],
    ['#1a0a0a', '#3a1a1a', '#5a2a2a'], ['#0a0a0a', '#1a1a1a', '#2a2a2a'],
    ['#000000', '#1a1a1a', '#333333']
];

// ============================================================
// 🎨 CANVAS LOGO GENERATOR
// ============================================================

function generateCanvasLogo(brandName, style, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    const cleanColorHex = cleanColor(colorHex);
    const currentStyle = style || LOGO_STYLES[Math.floor(Math.random() * LOGO_STYLES.length)];
    const bgColors = GRADIENT_BACKGROUNDS[Math.floor(Math.random() * GRADIENT_BACKGROUNDS.length)];
    const firstLetter = brandName.trim().charAt(0).toUpperCase() || 'B';

    // ─── BACKGROUND ───
    const bgGrad = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, 400);
    bgGrad.addColorStop(0, bgColors[1]);
    bgGrad.addColorStop(0.5, bgColors[0]);
    bgGrad.addColorStop(1, bgColors[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // ─── GLOW ───
    const glowGrad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 300);
    glowGrad.addColorStop(0, cleanColorHex + '25');
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // ─── DECORATIVE RINGS ───
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = cleanColorHex + '30';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(w/2, h/2 - 20, 150 + i * 40, 0, Math.PI * 2);
        ctx.stroke();
    }

    // ─── SPARKLES ───
    function drawSparkle(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = cleanColorHex + '80';
        ctx.shadowColor = cleanColorHex;
        ctx.shadowBlur = 10;
        for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-size/2, -size/8, size, size/4);
        }
        ctx.restore();
    }
    drawSparkle(80, 100, 20);
    drawSparkle(430, 120, 15);
    drawSparkle(100, 400, 18);
    drawSparkle(420, 380, 22);

    // ─── MAIN LETTER ───
    const letterSize = 180;
    const letterX = w/2, letterY = h/2 - 30;
    const brandNameY = letterY + 120;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const styleLower = currentStyle.toLowerCase();

    // ─── STYLE-SPECIFIC LETTER ───
    if (styleLower.includes('premium') || styleLower.includes('gold') || styleLower.includes('luxury')) {
        const goldGrad = ctx.createLinearGradient(letterX - 100, letterY - 100, letterX + 100, letterY + 100);
        goldGrad.addColorStop(0, '#FFD700');
        goldGrad.addColorStop(0.3, '#FFF8DC');
        goldGrad.addColorStop(0.5, '#FFD700');
        goldGrad.addColorStop(0.7, '#DAA520');
        goldGrad.addColorStop(1, '#B8860B');
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 35;
        ctx.fillStyle = goldGrad;
        ctx.font = `bold ${letterSize}px 'Georgia', serif`;
        ctx.fillText(firstLetter, letterX, letterY);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#B8860B';
        ctx.lineWidth = 2;
        ctx.strokeText(firstLetter, letterX, letterY);
    } else if (styleLower.includes('neon') || styleLower.includes('cyberpunk') || styleLower.includes('synthwave')) {
        const neonColors = ['#00ff88', '#ff00ff', '#00ccff', '#ff6600', '#ff0088', '#88ff00'];
        const neonColor = neonColors[Math.floor(Math.random() * neonColors.length)];
        ctx.shadowColor = neonColor;
        ctx.shadowBlur = 80;
        ctx.fillStyle = neonColor;
        ctx.font = `bold ${letterSize}px 'Courier New', monospace`;
        ctx.fillText(firstLetter, letterX, letterY);
        ctx.shadowBlur = 40;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(firstLetter, letterX, letterY);
    } else if (styleLower.includes('glitch')) {
        ctx.shadowColor = 'rgba(255,0,0,0.3)';
        ctx.shadowBlur = 30;
        ctx.fillStyle = '#00ffcc';
        ctx.font = `bold ${letterSize}px 'Courier New', monospace`;
        ctx.fillText(firstLetter, letterX - 4, letterY - 4);
        ctx.shadowColor = 'rgba(0,255,0,0.3)';
        ctx.fillStyle = '#ff00ff';
        ctx.fillText(firstLetter, letterX + 4, letterY + 4);
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(firstLetter, letterX, letterY);
        for (let i = 0; i < 10; i++) {
            ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
            ctx.fillRect(Math.random() * w, Math.random() * h, 20 + Math.random() * 60, 2);
        }
    } else if (styleLower.includes('watercolor')) {
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * w, y = Math.random() * h, r = 10 + Math.random() * 50;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.05})`;
            ctx.fill();
        }
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 20;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = `bold ${letterSize}px 'Georgia', serif`;
        ctx.fillText(firstLetter, letterX, letterY);
    } else if (styleLower.includes('steampunk') || styleLower.includes('vintage') || styleLower.includes('retro')) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255,215,0,0.1)';
        ctx.lineWidth = 2;
        ctx.roundRect(40, 40, w - 80, h - 80, 30);
        ctx.stroke();
        const grad = ctx.createLinearGradient(letterX - 100, letterY - 100, letterX + 100, letterY + 100);
        grad.addColorStop(0, '#D4A547');
        grad.addColorStop(0.5, '#F5D6A0');
        grad.addColorStop(1, '#B8860B');
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 25;
        ctx.fillStyle = grad;
        ctx.font = `bold ${letterSize}px 'Georgia', serif`;
        ctx.fillText(firstLetter, letterX, letterY);
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const x = letterX + Math.cos(angle) * 160;
            const y = letterY + Math.sin(angle) * 160;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,215,0,0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    } else if (styleLower.includes('pop art')) {
        const popColors = ['#FF0055', '#FFDD00', '#00FFDD', '#FF8800'];
        const c1 = popColors[Math.floor(Math.random() * popColors.length)];
        const c2 = popColors[Math.floor(Math.random() * popColors.length)];
        ctx.shadowBlur = 0;
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * 12;
            const offsetY = (Math.random() - 0.5) * 12;
            ctx.fillStyle = i % 2 === 0 ? c1 : c2;
            ctx.globalAlpha = 0.2 + i * 0.05;
            ctx.font = `bold ${letterSize + i * 2}px Arial, sans-serif`;
            ctx.fillText(firstLetter, letterX + offsetX, letterY + offsetY);
        }
        ctx.globalAlpha = 1;
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${letterSize}px Arial, sans-serif`;
        ctx.fillText(firstLetter, letterX, letterY);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 3;
        ctx.strokeText(firstLetter, letterX, letterY);
    } else if (styleLower.includes('cosmic') || styleLower.includes('aurora')) {
        const cosGrad = ctx.createRadialGradient(letterX, letterY, 20, letterX, letterY, 150);
        cosGrad.addColorStop(0, '#ffffff');
        cosGrad.addColorStop(0.3, '#FFD700');
        cosGrad.addColorStop(0.6, '#7B2FBE');
        cosGrad.addColorStop(1, '#1a0533');
        ctx.fillStyle = cosGrad;
        ctx.shadowColor = '#7B2FBE';
        ctx.shadowBlur = 50;
        ctx.font = `bold ${letterSize}px Arial, sans-serif`;
        ctx.fillText(firstLetter, letterX, letterY);
        for (let i = 0; i < 50; i++) {
            ctx.fillStyle = '#ffffff' + (50 + Math.random() * 150).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.arc(Math.random() * w, Math.random() * h, 0.5 + Math.random() * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // DEFAULT: Modern Gradient
        const defGrad = ctx.createLinearGradient(letterX - 100, letterY - 100, letterX + 100, letterY + 100);
        defGrad.addColorStop(0, cleanColorHex);
        defGrad.addColorStop(0.5, '#ffffff');
        defGrad.addColorStop(1, cleanColorHex);
        ctx.shadowColor = cleanColorHex;
        ctx.shadowBlur = 25;
        ctx.fillStyle = defGrad;
        ctx.font = `bold ${letterSize}px 'Poppins', Arial, sans-serif`;
        ctx.fillText(firstLetter, letterX, letterY);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff40';
        ctx.lineWidth = 1.5;
        ctx.strokeText(firstLetter, letterX, letterY);
    }

    // ─── BRAND NAME ───
    ctx.shadowColor = '#00000060';
    ctx.shadowBlur = 10;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#ffffff';
    ctx.font = `600 ${brandName.length > 8 ? 22 : 26}px 'Poppins', Arial, sans-serif`;
    ctx.fillText(brandName.toUpperCase(), letterX, brandNameY + 20);

    // ─── VIGNETTE ───
    const vigGrad = ctx.createRadialGradient(w/2, h/2, 200, w/2, h/2, 350);
    vigGrad.addColorStop(0, 'transparent');
    vigGrad.addColorStop(1, '#00000060');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, w, h);

    return canvas;
}

// ============================================================
// ✅ POLLINATIONS URL
// ============================================================

function generateLogoUrl(brandName, style) {
    const styleWords = ['minimalist', 'modern', 'creative', 'professional', 'elegant', 'bold', 'unique', 'sleek', 'dynamic', 'clean', 'vibrant', 'sophisticated', 'edgy', 'refined', 'premium', 'luxury'];
    const extras = ['with geometric shapes', 'with abstract design', 'with gradient colors', 'with clean lines', 'with modern typography', 'with creative elements', 'with stylish details', 'with professional look', 'with minimalist aesthetic'];
    const models = ['flux', 'turbo', 'realistic'];
    
    const randomStyle = styleWords[Math.floor(Math.random() * styleWords.length)];
    const randomExtra = extras[Math.floor(Math.random() * extras.length)];
    const randomModel = models[Math.floor(Math.random() * models.length)];
    const seed = Math.floor(Math.random() * 100000);
    const prompt = `${brandName} ${style} ${randomStyle} logo, ${randomExtra}`;
    const encodedPrompt = encodeURIComponent(prompt);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?model=${randomModel}&seed=${seed}&t=${Date.now()}`;
}

// ============================================================
// ✅ RENDER CANVAS LOGO
// ============================================================

function renderCanvasLogoToDOM(brandName, style, colorHex) {
    const canvas = generateCanvasLogo(brandName, style, colorHex);
    const dataUrl = canvas.toDataURL('image/png');
    const usedStyle = LOGO_STYLES[Math.floor(Math.random() * LOGO_STYLES.length)];
    return { dataUrl, usedStyle };
}

// ============================================================
// ✅ GENERATE BUTTON
// ============================================================

generateBtn.addEventListener("click", async () => {
    if (!brandNameInput.value.trim() || !industryInput.value.trim()) {
        alert("Please fill all fields.");
        return;
    }

    loading.style.display = "flex";
    loading.innerHTML = `
        <div style="text-align:center;padding:40px;">
            <div style="width:50px;height:50px;border:4px solid #222;border-top-color:#D4AF37;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 20px;"></div>
            <h3 style="color:#e6f1ff;">🤖 Generating your brand...</h3>
            <p style="color:#a8b2d1;">Creating professional brand identity...</p>
        </div>
    `;
    
    generateBtn.disabled = true;
    generateBtn.innerHTML = "⏳ Generating...";
    resultSection.innerHTML = "";

    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                brandName: brandNameInput.value,
                industry: industryInput.value,
                style: styleSelect.value,
                color: colorSelect.value
            })
        });

        const data = await response.json();

        loading.style.display = "none";
        generateBtn.disabled = false;
        generateBtn.innerHTML = "✨ Generate Brand Identity";

        if (!data.success || !data.reply) {
            resultSection.innerHTML = `
                <div class="result-card">
                    <h2>❌ Error</h2>
                    <p>${data.message || 'Failed to generate brand identity.'}</p>
                </div>`;
            return;
        }

        const ai = data.reply;
        currentBrandData = ai;

        saveHistory({
            brandName: brandNameInput.value,
            tagline: ai.tagline
        });

        const brandName = brandNameInput.value;
        const cleanPrimary = cleanColor(ai.primaryColor);
        const cleanSecondary = cleanColor(ai.secondaryColor);
        const cleanAccent = cleanColor(ai.accentColor);

        const { dataUrl: canvasLogoUrl, usedStyle } = renderCanvasLogoToDOM(brandName, styleSelect.value, cleanPrimary);
        const pollinationsUrl = generateLogoUrl(brandName, styleSelect.value);
        currentLogoUrl = canvasLogoUrl;

        // ─── LOGO HTML ───
        const logoHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
                <div style="position:relative;width:280px;height:280px;border-radius:16px;overflow:hidden;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
                    <div id="logoSpinner" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);z-index:2;">
                        <div style="width:40px;height:40px;border:3px solid rgba(255,255,255,0.1);border-top-color:#D4AF37;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
                    </div>
                    <img 
                        id="generatedLogo" 
                        src="${pollinationsUrl}"
                        alt="Generated Logo"
                        style="width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity 0.5s ease;"
                        onload="this.style.opacity='1'; document.getElementById('logoSpinner').style.display='none';"
                        onerror="this.style.display='none'; document.getElementById('logoSpinner').style.display='none'; document.getElementById('canvasFallbackLogo').style.display='block';"
                    >
                    <canvas id="canvasFallbackLogo" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:16px;"></canvas>
                </div>
                <p style="color:#888;font-size:0.8rem;margin-top:8px;">🎨 Style: ${usedStyle}</p>
                <button class="new-logo-btn" id="reimagineBtn" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;margin-top:15px;">
                    <span class="refresh-icon">↻</span> <span>Reimagine Logo</span>
                </button>
                <br>
                <a id="downloadLogo" href="${canvasLogoUrl}" download="${brandName}-logo.png" target="_blank" style="padding:14px 35px;background:#28a745;color:white;border-radius:30px;text-decoration:none;display:inline-block;font-weight:600;margin-top:10px;">
                    ⬇ Download Logo
                </a>
            </div>`;

        // ─── RESULT HTML (Brand Voice, Mood Board, Competitors REMOVED) ───
        resultSection.innerHTML = `
<div class="result-card fade-in" style="background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-radius:24px;padding:35px;border:1px solid rgba(255,255,255,0.08);">
    <h2 style="color:#e6f1ff;font-size:2rem;margin-bottom:25px;text-align:center;">🖼 ${brandName} Logo</h2>
    <div class="logo-container" style="background:rgba(0,0,0,0.3);border-radius:20px;padding:30px;display:flex;flex-direction:column;align-items:center;">
        ${logoHTML}
    </div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎨 Logo Concept</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;line-height:1.8;">${ai.logoConcept}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🌈 Color Palette</h2>
    <div style="display:flex;gap:15px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);padding:12px 22px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);">
            <div style="width:48px;height:48px;border-radius:12px;background:${cleanPrimary};border:2px solid rgba(255,255,255,0.15);"></div>
            <span style="color:#c8d0e0;">${cleanPrimary}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);padding:12px 22px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);">
            <div style="width:48px;height:48px;border-radius:12px;background:${cleanSecondary};border:2px solid rgba(255,255,255,0.15);"></div>
            <span style="color:#c8d0e0;">${cleanSecondary}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);padding:12px 22px;border-radius:14px;border:1px solid rgba(255,255,255,0.06);">
            <div style="width:48px;height:48px;border-radius:12px;background:${cleanAccent};border:2px solid rgba(255,255,255,0.15);"></div>
            <span style="color:#c8d0e0;">${cleanAccent}</span>
        </div>
    </div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🔤 Fonts</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;"><b style="color:#e6f1ff;">Primary:</b> ${ai.primaryFont}</p>
    <p style="color:#a8b2d1;font-size:1.05rem;"><b style="color:#e6f1ff;">Secondary:</b> ${ai.secondaryFont}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">💬 Tagline</h2>
    <h3 style="color:#FFD700;font-size:1.5rem;font-style:italic;">"${ai.tagline}"</h3>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">📖 Brand Story</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;line-height:1.8;">${ai.brandStory}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎯 Target Audience</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;line-height:1.8;">${ai.targetAudience}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    
    <h2 style="color:#e6f1ff;font-size:1.5rem;">📱 Instagram Bio</h2>
    <div style="background:rgba(255,255,255,0.08);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
        <p style="color:#e6f1ff;font-size:1.05rem;white-space:pre-wrap;">${ai.instagramBio}</p>
    </div>
    
    <div style="display:flex;gap:15px;flex-wrap:wrap;margin-top:35px;justify-content:center;">
        <button class="copy-btn" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(102,126,234,0.3);">📋 Copy Brand Identity</button>
        <button class="export-btn" style="background:linear-gradient(135deg,#f093fb,#f5576c);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,87,108,0.3);">📄 Export (.txt)</button>
    </div>
</div>`;

        // ─── CANVAS FALLBACK ───
        const canvasEl = document.getElementById('canvasFallbackLogo');
        if (canvasEl) {
            const img = new Image();
            img.onload = function() {
                canvasEl.width = 512;
                canvasEl.height = 512;
                const ctx = canvasEl.getContext('2d');
                ctx.drawImage(img, 0, 0);
            };
            img.src = canvasLogoUrl;
        }

        setupButtons(ai, brandName, canvasLogoUrl, cleanPrimary);

    } catch (error) {
        loading.style.display = "none";
        generateBtn.disabled = false;
        generateBtn.innerHTML = "✨ Generate Brand Identity";
        resultSection.innerHTML = `
            <div class="result-card">
                <h2>❌ Connection Error</h2>
                <p>Could not connect to server at ${API_URL}</p>
                <p style="font-size:0.85rem;color:#888;">Error: ${error.message}</p>
            </div>`;
        console.error('❌ Error:', error);
    }
});

// ============================================================
// ✅ SETUP BUTTONS
// ============================================================

function setupButtons(ai, brandName, canvasLogoUrl, cleanPrimary) {
    // ─── COPY BUTTON ───
    const copyBtn = document.querySelector(".copy-btn");
    if (copyBtn) {
        copyBtn.onclick = () => {
            const info = `
╔═══════════════════════════════════════╗
║          BRAND IDENTITY KIT           ║
╚═══════════════════════════════════════╝

📌 Brand: ${brandName}
🏭 Industry: ${industryInput.value}
🎨 Style: ${styleSelect.value}
🎯 Color: ${colorSelect.value}

💬 Tagline: "${ai.tagline}"

🎨 Logo Concept: ${ai.logoConcept}

🌈 Colors:
  Primary:   ${ai.primaryColor}
  Secondary: ${ai.secondaryColor}
  Accent:    ${ai.accentColor}

🔤 Fonts:
  Primary:   ${ai.primaryFont}
  Secondary: ${ai.secondaryFont}

📖 Brand Story: ${ai.brandStory}

🎯 Target Audience: ${ai.targetAudience}

📱 Instagram Bio: ${ai.instagramBio}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Generated by AI Brand Studio
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
            
            navigator.clipboard.writeText(info).then(() => {
                copyBtn.innerHTML = "✅ Copied!";
                setTimeout(() => copyBtn.innerHTML = "📋 Copy Brand Identity", 2000);
            });
        };
    }

    // ─── EXPORT BUTTON ───
    const exportBtn = document.querySelector(".export-btn");
    if (exportBtn) {
        exportBtn.onclick = () => {
            const content = `
BRAND IDENTITY KIT
===============================
Brand Name: ${brandName}
Industry: ${industryInput.value}
Style: ${styleSelect.value}
Color: ${colorSelect.value}

--- TAGLINE ---
"${ai.tagline}"

--- LOGO CONCEPT ---
${ai.logoConcept}

--- COLOR PALETTE ---
Primary:   ${ai.primaryColor}
Secondary: ${ai.secondaryColor}
Accent:    ${ai.accentColor}

--- TYPOGRAPHY ---
Primary:   ${ai.primaryFont}
Secondary: ${ai.secondaryFont}

--- BRAND STORY ---
${ai.brandStory}

--- TARGET AUDIENCE ---
${ai.targetAudience}

--- INSTAGRAM BIO ---
${ai.instagramBio}

===============================
✨ Generated by AI Brand Studio
===============================`;

            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${brandName}-Brand-Kit.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            exportBtn.innerHTML = "✅ Exported!";
            setTimeout(() => exportBtn.innerHTML = "📄 Export (.txt)", 2000);
        };
    }

    // ─── REIMAGINE BUTTON ───
    const reimagineBtn = document.getElementById("reimagineBtn");
    if (reimagineBtn) {
        const newBtn = reimagineBtn.cloneNode(true);
        reimagineBtn.parentNode.replaceChild(newBtn, reimagineBtn);
        
        newBtn.onclick = function() {
            const btn = this;
            const img = document.getElementById("generatedLogo");
            const canvasEl = document.getElementById("canvasFallbackLogo");
            const download = document.getElementById("downloadLogo");
            
            btn.disabled = true;
            btn.innerHTML = `<span class="refresh-icon">🧠</span><span>Generating...</span>`;

            const brandNameVal = brandNameInput.value || 'Brand';
            const colorHex = currentBrandData?.primaryColor || '#1A1A1A';
            
            const { dataUrl: newCanvasUrl, usedStyle: newStyle } = renderCanvasLogoToDOM(brandNameVal, styleSelect.value, colorHex);
            const newPollinationsUrl = generateLogoUrl(brandNameVal, styleSelect.value);

            if (img) {
                img.src = newPollinationsUrl;
                img.style.display = 'block';
                img.style.opacity = '0';
                img.onload = function() {
                    this.style.opacity = '1';
                    document.getElementById('logoSpinner').style.display = 'none';
                    if (canvasEl) canvasEl.style.display = 'none';
                };
                img.onerror = function() {
                    this.style.display = 'none';
                    if (canvasEl) {
                        const ctx = canvasEl.getContext('2d');
                        const canvasImg = new Image();
                        canvasImg.onload = function() {
                            canvasEl.width = 512;
                            canvasEl.height = 512;
                            ctx.drawImage(canvasImg, 0, 0);
                            canvasEl.style.display = 'block';
                        };
                        canvasImg.src = newCanvasUrl;
                    }
                };
            }

            const styleLabel = document.querySelector('.logo-container p');
            if (styleLabel) styleLabel.textContent = `🎨 Style: ${newStyle}`;
            if (download) download.href = newCanvasUrl;

            btn.innerHTML = `<span class="refresh-icon">↻</span><span>Reimagine Logo</span>`;
            btn.disabled = false;
        };
    }
}

// ============================================================
// ✅ HISTORY
// ============================================================

function saveHistory(brand) {
    let history = JSON.parse(localStorage.getItem("brands")) || [];
    history = history.filter(item => item.brandName !== brand.brandName);
    history.unshift(brand);
    if (history.length > 5) history.pop();
    localStorage.setItem("brands", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("brands")) || [];
    if (!historyContainer) return;
    
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <h2>🕒 Previous Brands</h2>
            <p style="color:#666;margin-top:10px;">No brands generated yet.</p>`;
        return;
    }

    let html = `<h2>🕒 Previous Brands</h2>`;
    history.forEach((item, index) => {
        html += `
            <div class="history-card" data-index="${index}" style="background:rgba(255,255,255,0.05);padding:18px 22px;border-radius:14px;margin-bottom:12px;cursor:pointer;transition:all 0.3s;border:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;align-items:center;">
                <div>
                    <h3 style="color:#e6f1ff;margin:0;font-size:1.1rem;">${item.brandName}</h3>
                    <p style="color:#a8b2d1;margin:6px 0 0;font-size:0.9rem;">${item.tagline}</p>
                </div>
                <span style="color:#555;font-size:0.8rem;background:rgba(255,255,255,0.05);padding:6px 12px;border-radius:20px;">#${index + 1}</span>
            </div>`;
    });
    historyContainer.innerHTML = html;

    document.querySelectorAll(".history-card").forEach(card => {
        card.onclick = () => {
            const historyData = JSON.parse(localStorage.getItem("brands"));
            const idx = parseInt(card.dataset.index);
            const item = historyData[idx];
            if (item) {
                brandNameInput.value = item.brandName;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    });
}

loadHistory();

// ============================================================
// ✅ SURPRISE ME
// ============================================================

const randomBtn = document.getElementById("randomBtn");
const randomBrands = ["NovaTech", "Blade", "PixelForge", "NeonX", "Voltify", "SkyLabs", "ZenCore", "Quantum", "GhostByte", "HyperNova", "Astra", "Vortex", "Eclipse", "Nebula", "Prism"];
const randomIndustries = ["Gaming", "Technology", "AI", "Fashion", "Fitness", "Coffee", "Restaurant", "Music", "Education", "Healthcare", "Finance", "Travel"];
const randomStyles = ["Modern", "Minimal", "Luxury", "Gaming", "Technology", "Corporate", "Vintage", "Elegant"];
const randomColors = ["AI Choose", "Blue", "Red", "Green", "Purple", "Gold", "Silver", "Orange", "Pink"];

if (randomBtn) {
    randomBtn.onclick = () => {
        brandNameInput.value = randomBrands[Math.floor(Math.random() * randomBrands.length)];
        industryInput.value = randomIndustries[Math.floor(Math.random() * randomIndustries.length)];
        styleSelect.value = randomStyles[Math.floor(Math.random() * randomStyles.length)];
        colorSelect.value = randomColors[Math.floor(Math.random() * randomColors.length)];
    };
}

console.log('🐐 AI Brand Studio loaded successfully!');
console.log('🎨 Canvas fallback ready with', LOGO_STYLES.length, 'styles');
console.log('🔄 Reimagine generates DIFFERENT logos every time!');