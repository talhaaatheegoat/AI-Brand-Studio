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

// ✅ Clean color function
function cleanColor(color) {
    if (!color) return '#6366F1';
    const hexMatch = color.match(/#[a-fA-F0-9]{6}/);
    if (hexMatch) return hexMatch[0];
    return color;
}

// ============================================================
// ✅ 30+ CANVAS LOGO STYLES
// ============================================================

const LOGO_STYLES = [
    'Premium', 'Neon', 'Glitch', 'Steampunk', 'Cyberpunk', 'Pop Art',
    'Tech', 'Minimal', 'Bold', 'Gradient', 'Vintage', 'Retro',
    'Art Deco', 'Watercolor', 'Sketch', 'Pixel', 'Holographic',
    'Metal', 'Chrome', 'Glassmorphism', 'Synthwave',
    'Brutalist', 'Typographic', 'Geometric', 'Abstract', 'Nature',
    'Cosmic', 'Royal', 'Street Art', 'Graffiti', 'Acid',
    'Pastel', 'Dark Mode', 'Aurora', 'Fire & Ice'
];

const GRADIENT_BACKGROUNDS = [
    ['#0f0c29', '#302b63', '#24243e'],
    ['#000428', '#004e92', '#000428'],
    ['#1a1a2e', '#16213e', '#0f3460'],
    ['#0d0d0d', '#1a1a2e', '#16213e'],
    ['#0f0f0f', '#232323', '#1a1a1a'],
    ['#0b0b1a', '#1a1a3e', '#2d1b69'],
    ['#0a0a0a', '#1a1a2e', '#0f3460'],
    ['#0d0d0d', '#1a1a1a', '#2d2d2d'],
    ['#000000', '#0d0d0d', '#1a1a1a'],
    ['#0a0a23', '#1a1a4e', '#141452']
];

// ============================================================
// ✅ GENERATE CANVAS LOGO - WITH RANDOM SHAPES
// ============================================================

function generateCanvasLogo(brandName, style, colorHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const cleanColorHex = cleanColor(colorHex);
    const styleIndex = Math.floor(Math.random() * LOGO_STYLES.length);
    const currentStyle = style || LOGO_STYLES[styleIndex];
    const bgIndex = Math.floor(Math.random() * GRADIENT_BACKGROUNDS.length);
    const bgColors = GRADIENT_BACKGROUNDS[bgIndex];
    const firstLetter = brandName.trim().charAt(0).toUpperCase() || 'B';

    // BACKGROUND GRADIENT
    const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, 400);
    bgGrad.addColorStop(0, bgColors[1]);
    bgGrad.addColorStop(0.5, bgColors[0]);
    bgGrad.addColorStop(1, bgColors[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // AMBIENT GLOW
    const glowGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 300);
    glowGrad.addColorStop(0, cleanColorHex + '20');
    glowGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, w, h);

    // ✅ RANDOM SHAPE VARIETY (NEW!)
    const shapes = ['circles', 'triangles', 'squares', 'hexagons', 'diamonds'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    if (randomShape === 'triangles') {
        for (let i = 0; i < 10; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const size = 15 + Math.random() * 50;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(Math.random() * Math.PI);
            ctx.fillStyle = cleanColorHex + '12';
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    } else if (randomShape === 'squares') {
        for (let i = 0; i < 10; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const size = 15 + Math.random() * 40;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(Math.random() * Math.PI);
            ctx.fillStyle = cleanColorHex + '12';
            ctx.fillRect(-size/2, -size/2, size, size);
            ctx.restore();
        }
    } else if (randomShape === 'hexagons') {
        for (let i = 0; i < 8; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const size = 12 + Math.random() * 35;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.fillStyle = cleanColorHex + '12';
            ctx.beginPath();
            for (let hx = 0; hx < 6; hx++) {
                const angle = (hx / 6) * Math.PI * 2;
                const px = Math.cos(angle) * size;
                const py = Math.sin(angle) * size;
                hx === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    } else if (randomShape === 'diamonds') {
        for (let i = 0; i < 10; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const size = 12 + Math.random() * 25;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.fillStyle = cleanColorHex + '12';
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    } else {
        // Circles (default)
        for (let i = 0; i < 8; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const r = 20 + Math.random() * 80;
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
            grd.addColorStop(0, cleanColorHex + '15');
            grd.addColorStop(1, 'transparent');
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // DECORATIVE RINGS
    for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = cleanColorHex + '30';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2 - 20, 150 + i * 40, 0, Math.PI * 2);
        ctx.stroke();
    }

    // DECORATIVE DOTS
    for (let i = 0; i < 20; i++) {
        const dx = Math.random() * w;
        const dy = Math.random() * h;
        const ds = 2 + Math.random() * 4;
        ctx.fillStyle = cleanColorHex + '60';
        ctx.beginPath();
        ctx.arc(dx, dy, ds, 0, Math.PI * 2);
        ctx.fill();
    }

    // SPARKLES
    function drawSparkle(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = cleanColorHex + '80';
        ctx.shadowColor = cleanColorHex;
        ctx.shadowBlur = 10;
        for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-size / 2, -size / 8, size, size / 4);
        }
        ctx.restore();
    }
    drawSparkle(80, 100, 20);
    drawSparkle(430, 120, 15);
    drawSparkle(100, 400, 18);
    drawSparkle(420, 380, 22);

    // MAIN LETTER
    const letterSize = 180;
    const letterX = w / 2;
    const letterY = h / 2 - 30;
    const brandNameY = letterY + 120;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // DEFAULT: Modern Gradient Letter
    ctx.font = `bold ${letterSize}px 'Poppins', Arial, sans-serif`;
    const defGrad = ctx.createLinearGradient(letterX - 100, letterY - 100, letterX + 100, letterY + 100);
    defGrad.addColorStop(0, cleanColorHex);
    defGrad.addColorStop(0.5, '#ffffff');
    defGrad.addColorStop(1, cleanColorHex);
    ctx.fillStyle = defGrad;
    ctx.shadowColor = cleanColorHex;
    ctx.shadowBlur = 25;
    ctx.fillText(firstLetter, letterX, letterY);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#ffffff40';
    ctx.lineWidth = 1.5;
    ctx.strokeText(firstLetter, letterX, letterY);

    // BRAND NAME
    ctx.font = `600 ${brandName.length > 8 ? 22 : 26}px 'Poppins', Arial, sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#00000060';
    ctx.shadowBlur = 10;
    ctx.fillText(brandName.toUpperCase(), letterX, brandNameY);

    // VIGNETTE
    const vigGrad = ctx.createRadialGradient(w / 2, h / 2, 200, w / 2, h / 2, 350);
    vigGrad.addColorStop(0, 'transparent');
    vigGrad.addColorStop(1, '#00000060');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, w, h);

    return canvas;
}

// ============================================================
// ✅ POLLINATIONS LOGO URL
// ============================================================

function generateLogoUrl(brandName, style) {
    const prompt = `${brandName} ${style} logo, professional, clean, vector`;
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 10000);
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&t=${Date.now()}`;
}

// ============================================================
// ✅ RENDER CANVAS LOGO TO DOM
// ============================================================

function renderCanvasLogoToDOM(brandName, style, colorHex) {
    const canvas = generateCanvasLogo(brandName, style, colorHex);
    const dataUrl = canvas.toDataURL('image/png');
    const styleIndex = Math.floor(Math.random() * LOGO_STYLES.length);
    const usedStyle = LOGO_STYLES[styleIndex];
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

        // Generate Canvas logo (always works)
        const { dataUrl: canvasLogoUrl, usedStyle } = renderCanvasLogoToDOM(brandName, styleSelect.value, cleanPrimary);
        
        // Try Pollinations
        const pollinationsUrl = generateLogoUrl(brandName, styleSelect.value);
        currentLogoUrl = canvasLogoUrl;

        const logoHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;width:100%;">
                <img 
                    id="generatedLogo" 
                    src="${pollinationsUrl}"
                    alt="Generated Logo"
                    style="max-width:280px;width:100%;border-radius:16px;box-shadow:0 15px 50px rgba(0,0,0,0.4);display:block;"
                    onerror="this.style.display='none'; document.getElementById('canvasFallbackLogo').style.display='block';"
                    onload="document.getElementById('canvasFallbackLogo').style.display='none';"
                >
                <canvas 
                    id="canvasFallbackLogo" 
                    style="display:none;max-width:280px;width:100%;border-radius:16px;box-shadow:0 15px 50px rgba(0,0,0,0.4);"
                ></canvas>
                <p style="color:#888;font-size:0.8rem;margin-top:8px;">🎨 Style: ${usedStyle}</p>
                <button class="new-logo-btn" id="reimagineBtn" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;margin-top:15px;">
                    <span class="refresh-icon">↻</span>
                    <span>Reimagine Logo</span>
                </button>
                <br>
                <a id="downloadLogo" href="${canvasLogoUrl}" download="${brandName}-logo.png" target="_blank" style="padding:14px 35px;background:#28a745;color:white;border-radius:30px;text-decoration:none;display:inline-block;font-weight:600;margin-top:10px;">
                    ⬇ Download Logo
                </a>
            </div>`;

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
        <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);padding:12px 22px;border-radius:14px;">
            <div style="width:48px;height:48px;border-radius:12px;background:${cleanPrimary};border:2px solid rgba(255,255,255,0.15);"></div>
            <span style="color:#c8d0e0;">${cleanPrimary}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);padding:12px 22px;border-radius:14px;">
            <div style="width:48px;height:48px;border-radius:12px;background:${cleanSecondary};border:2px solid rgba(255,255,255,0.15);"></div>
            <span style="color:#c8d0e0;">${cleanSecondary}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.05);padding:12px 22px;border-radius:14px;">
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
    <div style="background:rgba(255,255,255,0.05);border-radius:16px;padding:20px;border:1px solid rgba(255,255,255,0.06);">
        <p style="color:#e6f1ff;font-size:1.05rem;white-space:pre-wrap;">${ai.instagramBio}</p>
    </div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">💬 Brand Voice</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;line-height:1.8;">${ai.brandVoice || 'Professional and inspiring.'}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎨 Mood Board</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;line-height:1.8;">${ai.moodBoard || 'Cohesive visual identity.'}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🏆 Competitor Analysis</h2>
    <p style="color:#a8b2d1;font-size:1.05rem;line-height:1.8;">${ai.competitors || 'Unique market positioning.'}</p>
    <div style="display:flex;gap:15px;flex-wrap:wrap;margin-top:35px;justify-content:center;">
        <button class="copy-btn" style="background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;">📋 Copy Brand Identity</button>
        <button class="export-btn" style="background:linear-gradient(135deg,#f093fb,#f5576c);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;">📄 Export (.txt)</button>
    </div>
</div>`;

        // Display Canvas fallback
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
    // COPY BUTTON
    const copyBtn = document.querySelector(".copy-btn");
    if (copyBtn) {
        copyBtn.onclick = () => {
            const info = `
╔═══════════════════════════════════════╗
║          BRAND IDENTITY KIT           ║
╚═══════════════════════════════════════╝

Brand: ${brandName}
Industry: ${industryInput.value}
Style: ${styleSelect.value}
Color: ${colorSelect.value}

TAGLINE: "${ai.tagline}"

LOGO CONCEPT: ${ai.logoConcept}

COLORS:
Primary:   ${ai.primaryColor}
Secondary: ${ai.secondaryColor}
Accent:    ${ai.accentColor}

FONTS:
Primary:   ${ai.primaryFont}
Secondary: ${ai.secondaryFont}

STORY: ${ai.brandStory}

TARGET AUDIENCE: ${ai.targetAudience}

INSTAGRAM BIO: ${ai.instagramBio}

BRAND VOICE: ${ai.brandVoice}

MOOD BOARD: ${ai.moodBoard}

COMPETITORS: ${ai.competitors}

Generated by AI Brand Studio ✨`;
            
            navigator.clipboard.writeText(info).then(() => {
                copyBtn.innerHTML = "✅ Copied!";
                setTimeout(() => copyBtn.innerHTML = "📋 Copy Brand Identity", 2000);
            });
        };
    }

    // EXPORT BUTTON
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

--- BRAND VOICE ---
${ai.brandVoice}

--- MOOD BOARD ---
${ai.moodBoard}

--- COMPETITOR ANALYSIS ---
${ai.competitors}

===============================
Generated by AI Brand Studio ✨`;

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

    // ✅ REIMAGINE BUTTON - FIXED
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
            const colorHex = currentBrandData?.primaryColor || '#6366F1';
            
            // Generate NEW Canvas logo (always works)
            const { dataUrl: newCanvasUrl, usedStyle: newStyle } = renderCanvasLogoToDOM(brandNameVal, styleSelect.value, colorHex);

            // Generate NEW Pollinations URL
            const newPollinationsUrl = generateLogoUrl(brandNameVal, styleSelect.value);

            if (img) {
                img.src = newPollinationsUrl;
                img.style.display = 'block';
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
                img.onload = function() {
                    if (canvasEl) canvasEl.style.display = 'none';
                };
            }

            // Update style label
            const styleLabel = document.querySelector('.logo-container p');
            if (styleLabel) {
                styleLabel.textContent = `🎨 Style: ${newStyle}`;
            }

            // Update download link
            if (download) {
                download.href = newCanvasUrl;
            }

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
// ✅ SURPRISE ME - NO AUTO-GENERATE
// ============================================================

const randomBtn = document.getElementById("randomBtn");
const randomBrands = ["NovaTech", "Blade", "PixelForge", "NeonX", "Voltify", "SkyLabs", "ZenCore", "Quantum", "GhostByte", "HyperNova"];
const randomIndustries = ["Gaming", "Technology", "AI", "Fashion", "Fitness", "Coffee", "Restaurant", "Music", "Education"];
const randomStyles = ["Modern", "Minimal", "Luxury", "Gaming", "Technology", "Corporate", "Vintage", "Elegant"];
const randomColors = ["AI Choose", "Blue", "Red", "Green", "Purple", "Gold", "Silver", "Orange", "Pink"];

if (randomBtn) {
    randomBtn.onclick = () => {
        brandNameInput.value = randomBrands[Math.floor(Math.random() * randomBrands.length)];
        industryInput.value = randomIndustries[Math.floor(Math.random() * randomIndustries.length)];
        styleSelect.value = randomStyles[Math.floor(Math.random() * randomStyles.length)];
        colorSelect.value = randomColors[Math.floor(Math.random() * randomColors.length)];
        // ✅ NO AUTO-CLICK - user must click Generate
    };
}

console.log('✅ AI Brand Studio loaded!');
console.log('🎨 Canvas fallback ready with', LOGO_STYLES.length, 'styles');