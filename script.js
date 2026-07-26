const generateBtn = document.getElementById("generateBtn");
const brandName = document.getElementById("brandName");
const industry = document.getElementById("industry");
const style = document.getElementById("style");
const color = document.getElementById("color");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const historyContainer = document.getElementById("history");
let currentBrandData = null;
let currentLogoPrompt = "";

loading.style.display = "none";

// ✅ YOUR RAILWAY URL - CHANGE THIS!
const API_URL = 'https://ai-brand-studio-production.up.railway.app';
// const API_URL = 'http://localhost:3000';

console.log(`📡 API URL: ${API_URL}`);

// ============================================
// ✅ GOATED CANVAS LOGO GENERATOR 🔥
// ============================================

function generateCanvasLogo(brandName, primaryColor, secondaryColor, accentColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');

    // 🎨 BACKGROUND - Premium Gradient
    const grad = ctx.createLinearGradient(0, 0, 500, 500);
    grad.addColorStop(0, primaryColor || '#667eea');
    grad.addColorStop(0.5, secondaryColor || '#764ba2');
    grad.addColorStop(1, accentColor || '#ff6b6b');
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, 500, 500, 35);
    ctx.fill();

    // ✨ GLOW EFFECT
    const glow = ctx.createRadialGradient(250, 250, 50, 250, 250, 250);
    glow.addColorStop(0, 'rgba(255,255,255,0.15)');
    glow.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.roundRect(0, 0, 500, 500, 35);
    ctx.fill();

    // 🔷 DECORATIVE CIRCLES
    ctx.beginPath();
    ctx.arc(250, 250, 160, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, 120, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(250, 250, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();

    // ✨ SPARKLES
    drawSparkle(ctx, 80, 80);
    drawSparkle(ctx, 420, 80);
    drawSparkle(ctx, 80, 420);
    drawSparkle(ctx, 420, 420);

    // 🔥 MAIN LETTER
    const letter = brandName.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    
    const letterGrad = ctx.createLinearGradient(150, 150, 350, 350);
    letterGrad.addColorStop(0, '#ffffff');
    letterGrad.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    letterGrad.addColorStop(1, 'rgba(255,255,255,0.7)');
    ctx.fillStyle = letterGrad;
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillText(letter, 250, 230);

    // ✨ BRAND NAME
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.font = 'bold 34px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.fillText(brandName, 250, 330);

    // 📏 DECORATIVE LINE
    ctx.shadowBlur = 0;
    const lineGrad = ctx.createLinearGradient(150, 370, 350, 370);
    lineGrad.addColorStop(0, 'rgba(255,255,255,0)');
    lineGrad.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    lineGrad.addColorStop(0.7, 'rgba(255,255,255,0.6)');
    lineGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(150, 370);
    ctx.lineTo(350, 370);
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 3;
    ctx.stroke();

    // ✨ DOTS
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.arc(140, 370, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(360, 370, 4, 0, Math.PI * 2);
    ctx.fill();

    // 🏛️ CORNER ACCENTS
    drawCornerAccent(ctx, 30, 30, 'top-left');
    drawCornerAccent(ctx, 470, 30, 'top-right');
    drawCornerAccent(ctx, 30, 470, 'bottom-left');
    drawCornerAccent(ctx, 470, 470, 'bottom-right');

    return canvas.toDataURL('image/png');
}

// ✨ SPARKLE
function drawSparkle(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    const size = 8;
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.3, 0);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// 🏛️ CORNER ACCENT
function drawCornerAccent(ctx, x, y, position) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    const size = 20;
    ctx.beginPath();
    if (position === 'top-left') {
        ctx.moveTo(0, size);
        ctx.lineTo(0, 0);
        ctx.lineTo(size, 0);
    } else if (position === 'top-right') {
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);
        ctx.lineTo(size, size);
    } else if (position === 'bottom-left') {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(size, size);
    } else if (position === 'bottom-right') {
        ctx.moveTo(size, 0);
        ctx.lineTo(size, size);
        ctx.lineTo(0, size);
    }
    ctx.stroke();
    ctx.restore();
}

// 🎯 ROUND RECT
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (r > w / 2) r = w / 2;
        if (r > h / 2) r = h / 2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        return this;
    };
}

// ============================================
// ✅ GENERATE BUTTON
// ============================================

generateBtn.addEventListener("click", async () => {
    if (!brandName.value.trim() || !industry.value.trim()) {
        alert("Please fill all fields.");
        return;
    }

    loading.style.display = "block";
    generateBtn.disabled = true;
    generateBtn.innerHTML = "Generating...";
    result.innerHTML = "";

    try {
        const response = await fetch(`${API_URL}/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                brandName: brandName.value,
                industry: industry.value,
                style: style.value,
                color: color.value
            })
        });

        const data = await response.json();

        loading.style.display = "none";
        generateBtn.disabled = false;
        generateBtn.innerHTML = "Generate Brand";

        if (!data.success) {
            result.innerHTML = `
<div class="result-card">
    <h2>❌ Error</h2>
    <p>${data.message || "Please try again"}</p>
</div>`;
            return;
        }

        const ai = data.reply;
        currentBrandData = ai;
        currentLogoPrompt = `${brandName.value} ${industry.value} ${style.value} logo`;

        saveHistory({
            brandName: brandName.value,
            tagline: ai.tagline
        });

        // ✅ GENERATE LOGO WITH CANVAS
        const logoDataUrl = generateCanvasLogo(
            brandName.value,
            ai.primaryColor,
            ai.secondaryColor,
            ai.accentColor
        );

        let logoHTML = `
<div style="display:flex;flex-direction:column;align-items:center;width:100%;">
    <img 
        id="generatedLogo" 
        src="${logoDataUrl}"
        alt="Generated Logo"
        style="max-width:300px;border-radius:20px;box-shadow:0 10px 40px rgba(0,0,0,0.3);display:block;"
        onload="console.log('✅ Logo loaded!')"
    >
    <br>
    <button class="new-logo-btn" id="reimagineBtn" style="background:linear-gradient(135deg, #667eea, #764ba2);color:white;border:none;padding:12px 30px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;">
        <span class="refresh-icon">↻</span>
        <span>Reimagine Logo</span>
    </button>
    <br>
    <a id="downloadLogo" href="${logoDataUrl}" download="logo.png" target="_blank" style="padding:12px 30px;background:#28a745;color:white;border-radius:30px;text-decoration:none;display:inline-block;font-weight:600;margin-top:10px;">
        ⬇ Download Logo
    </a>
</div>`;

        result.innerHTML = `
<div class="result-card fade-in" style="background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-radius:20px;padding:30px;border:1px solid rgba(255,255,255,0.08);">
    <h2 style="color:#e6f1ff;font-size:2rem;">🖼 Generated Logo</h2>
    <div class="logo-container" style="background:rgba(0,0,0,0.2);border-radius:20px;padding:30px;">${logoHTML}</div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎨 Logo Concept</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.logoConcept}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🌈 Color Palette</h2>
    <div style="display:flex;gap:15px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);padding:10px 20px;border-radius:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:${ai.primaryColor};border:2px solid rgba(255,255,255,0.1);"></div>
            <span style="color:#a8b2d1;">${ai.primaryColor}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);padding:10px 20px;border-radius:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:${ai.secondaryColor};border:2px solid rgba(255,255,255,0.1);"></div>
            <span style="color:#a8b2d1;">${ai.secondaryColor}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);padding:10px 20px;border-radius:10px;">
            <div style="width:40px;height:40px;border-radius:10px;background:${ai.accentColor};border:2px solid rgba(255,255,255,0.1);"></div>
            <span style="color:#a8b2d1;">${ai.accentColor}</span>
        </div>
    </div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🔤 Fonts</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;"><b style="color:#e6f1ff;">Primary:</b> ${ai.primaryFont}</p>
    <p style="color:#a8b2d1;font-size:1.1rem;"><b style="color:#e6f1ff;">Secondary:</b> ${ai.secondaryFont}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">💬 Tagline</h2>
    <h3 style="color:#ffd700;font-size:1.3rem;font-style:italic;">"${ai.tagline}"</h3>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">📖 Brand Story</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.brandStory}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎯 Target Audience</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.targetAudience}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">📱 Instagram Bio</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.instagramBio}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">💬 Brand Voice</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.brandVoice || 'Professional and inspiring'}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎨 Mood Board</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.moodBoard || 'A cohesive visual identity with carefully selected colors, typography, and design elements.'}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🏆 Competitor Analysis</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;">${ai.competitors || 'Positioned uniquely in the market with a distinctive style and approach.'}</p>
    <div style="display:flex;gap:15px;flex-wrap:wrap;margin-top:20px;">
        <button class="copy-btn" style="background:linear-gradient(135deg, #667eea, #764ba2);color:white;border:none;padding:12px 30px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;">📋 Copy Brand Identity</button>
        <button class="export-btn" style="background:linear-gradient(135deg, #f093fb, #f5576c);color:white;border:none;padding:12px 30px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;">📄 Export Brand Identity</button>
    </div>
</div>`;

        setupButtons(ai);

    } catch (error) {
        loading.style.display = "none";
        generateBtn.disabled = false;
        generateBtn.innerHTML = "Generate Brand";
        result.innerHTML = `
<div class="result-card">
    <h2>❌ Cannot connect to server</h2>
    <p>Make sure server is running on ${API_URL}</p>
    <p style="font-size:0.8rem;color:#999;">Error: ${error.message}</p>
</div>`;
        console.error(error);
    }
});

// ============================================
// ✅ SETUP BUTTONS
// ============================================

function setupButtons(ai) {
    const copyBtn = document.querySelector(".copy-btn");
    if (copyBtn) {
        copyBtn.onclick = () => {
            const brandInfo = `
BRAND IDENTITY KIT
=====================
Brand: ${brandName.value}
Industry: ${industry.value}
Style: ${style.value}
Color: ${color.value}
Tagline: ${ai.tagline}
Logo Concept: ${ai.logoConcept}
Primary Color: ${ai.primaryColor}
Secondary Color: ${ai.secondaryColor}
Accent Color: ${ai.accentColor}
Primary Font: ${ai.primaryFont}
Secondary Font: ${ai.secondaryFont}
Brand Story: ${ai.brandStory}
Target Audience: ${ai.targetAudience}
Brand Voice: ${ai.brandVoice}
Instagram Bio: ${ai.instagramBio}
Mood Board: ${ai.moodBoard}
Competitors: ${ai.competitors}
=====================
Generated by AI Brand Studio`;
            
            navigator.clipboard.writeText(brandInfo);
            copyBtn.innerHTML = "✅ Copied!";
            setTimeout(() => copyBtn.innerHTML = "📋 Copy Brand Identity", 2000);
        };
    }

    const exportBtn = document.querySelector(".export-btn");
    if (exportBtn) {
        exportBtn.onclick = () => {
            const content = `
BRAND IDENTITY KIT
===============================
Brand Name: ${brandName.value}
Industry: ${industry.value}
Style: ${style.value}
Color: ${color.value}
--------------------------------
Tagline: ${ai.tagline}
Logo Concept: ${ai.logoConcept}
--------------------------------
Primary Color: ${ai.primaryColor}
Secondary Color: ${ai.secondaryColor}
Accent Color: ${ai.accentColor}
--------------------------------
Primary Font: ${ai.primaryFont}
Secondary Font: ${ai.secondaryFont}
--------------------------------
Brand Story: ${ai.brandStory}
Target Audience: ${ai.targetAudience}
Brand Voice: ${ai.brandVoice}
--------------------------------
Instagram Bio: ${ai.instagramBio}
Mood Board: ${ai.moodBoard}
Competitors: ${ai.competitors}
--------------------------------
Generated by AI Brand Studio
===============================`;

            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${brandName.value}-Brand-Kit.txt`;
            a.click();
            URL.revokeObjectURL(url);
        };
    }

    // ✅ REIMAGINE BUTTON
    const reimagineBtn = document.getElementById("reimagineBtn");
    if (reimagineBtn) {
        const newBtn = reimagineBtn.cloneNode(true);
        reimagineBtn.parentNode.replaceChild(newBtn, reimagineBtn);
        
        newBtn.onclick = function() {
            const btn = this;
            const img = document.getElementById("generatedLogo");
            const download = document.getElementById("downloadLogo");
            
            console.log("🔄 Reimagine clicked!");
            
            btn.disabled = true;
            btn.innerHTML = `<span class="refresh-icon">🧠</span><span>Generating...</span>`;
            
            const newLogo = generateCanvasLogo(
                brandName.value,
                currentBrandData?.primaryColor || '#667eea',
                currentBrandData?.secondaryColor || '#764ba2',
                currentBrandData?.accentColor || '#ff6b6b'
            );
            
            if (img) {
                img.src = newLogo;
                img.style.opacity = "1";
                if (download) {
                    download.href = newLogo;
                }
                console.log("✅ New logo generated!");
            }
            
            btn.innerHTML = `<span class="refresh-icon">↻</span><span>Reimagine Logo</span>`;
            btn.disabled = false;
        };
    }
}

// ============================================
// ✅ HISTORY
// ============================================

function saveHistory(brand) {
    let history = JSON.parse(localStorage.getItem("brands")) || [];
    history.unshift(brand);
    if (history.length > 5) history.pop();
    localStorage.setItem("brands", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("brands")) || [];
    if (history.length === 0) {
        historyContainer.innerHTML = "<p>No brands generated yet.</p>";
        return;
    }
    historyContainer.innerHTML = "";
    history.forEach((item, index) => {
        historyContainer.innerHTML += `
<div class="history-card" data-index="${index}">
    <h3>${item.brandName}</h3>
    <p>${item.tagline}</p>
</div>`;
    });
    document.querySelectorAll(".history-card").forEach(card => {
        card.onclick = () => {
            const history = JSON.parse(localStorage.getItem("brands"));
            alert("Selected: " + history[card.dataset.index].brandName);
        };
    });
}
loadHistory();

// ============================================
// ✅ RANDOM
// ============================================

const randomBtn = document.getElementById("randomBtn");
const randomBrands = ["NovaTech", "Blade", "PixelForge", "NeonX", "Voltify", "SkyLabs", "ZenCore", "Quantum", "GhostByte", "HyperNova"];
const randomIndustries = ["Gaming", "Technology", "AI", "Fashion", "Fitness", "Coffee", "Restaurant", "Cyber Security", "Education", "Music"];
const randomStyles = ["Modern", "Minimal", "Luxury", "Gaming", "Technology", "Corporate", "Vintage", "Elegant", "Mascot"];
const randomColors = ["AI Choose", "Blue", "Red", "Green", "Purple", "Black", "White", "Gold", "Silver", "Orange", "Pink", "Cyan"];

randomBtn.onclick = () => {
    brandName.value = randomBrands[Math.floor(Math.random() * randomBrands.length)];
    industry.value = randomIndustries[Math.floor(Math.random() * randomIndustries.length)];
    style.value = randomStyles[Math.floor(Math.random() * randomStyles.length)];
    color.value = randomColors[Math.floor(Math.random() * randomColors.length)];
};