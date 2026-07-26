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

// ✅ YOUR URL
const API_URL = 'https://ai-brand-studio-production.up.railway.app';
// const API_URL = 'http://localhost:3000';

console.log(`📡 API URL: ${API_URL}`);

// ============================================
// ✅ GENERATE LOGO USING CANVAS
// ============================================

function generateCanvasLogo(brandName, primaryColor, secondaryColor, accentColor) {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Background
    const gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 200);
    gradient.addColorStop(0, primaryColor || '#667eea');
    gradient.addColorStop(0.5, secondaryColor || '#764ba2');
    gradient.addColorStop(1, accentColor || '#ff6b6b');
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, 400, 400, 30);
    ctx.fill();

    // Add some circles for design
    ctx.beginPath();
    ctx.arc(200, 200, 120, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(200, 200, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fill();

    // First letter as logo
    const letter = brandName.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Arial, sans-serif';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    ctx.fillText(letter, 200, 190);

    // Brand name below
    ctx.shadowBlur = 0;
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText(brandName, 200, 280);

    // Small decorative line
    ctx.beginPath();
    ctx.moveTo(120, 310);
    ctx.lineTo(280, 310);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    return canvas.toDataURL('image/png');
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
        style="max-width:260px;border-radius:15px;box-shadow:0 0 18px rgba(0,0,0,.2);display:block;"
        onload="console.log('✅ Logo loaded!')"
    >
    <br>
    <button class="new-logo-btn" id="reimagineBtn">
        <span class="refresh-icon">↻</span>
        <span>Reimagine Logo</span>
    </button>
    <br>
    <a id="downloadLogo" href="${logoDataUrl}" download="logo.png" target="_blank" style="padding:10px 18px;background:#007BFF;color:white;border-radius:10px;text-decoration:none;display:inline-block;">
        ⬇ Download Logo
    </a>
</div>`;

        result.innerHTML = `
<div class="result-card fade-in">
    <h2>🖼 Generated Logo</h2>
    <div class="logo-container">${logoHTML}</div>
    <hr>
    <h2>🎨 Logo Concept</h2>
    <p>${ai.logoConcept}</p>
    <hr>
    <h2>🌈 Color Palette</h2>
    <div class="color-box"><div class="color-preview" style="background:${ai.primaryColor};"></div>${ai.primaryColor}</div>
    <div class="color-box"><div class="color-preview" style="background:${ai.secondaryColor};"></div>${ai.secondaryColor}</div>
    <div class="color-box"><div class="color-preview" style="background:${ai.accentColor};"></div>${ai.accentColor}</div>
    <hr>
    <h2>🔤 Fonts</h2>
    <p><b>Primary:</b> ${ai.primaryFont}</p>
    <p><b>Secondary:</b> ${ai.secondaryFont}</p>
    <hr>
    <h2>💬 Tagline</h2>
    <h3>"${ai.tagline}"</h3>
    <hr>
    <h2>📖 Brand Story</h2>
    <p>${ai.brandStory}</p>
    <hr>
    <h2>🎯 Target Audience</h2>
    <p>${ai.targetAudience}</p>
    <hr>
    <h2>📱 Instagram Bio</h2>
    <p>${ai.instagramBio}</p>
    <hr>
    <h2>💬 Brand Voice</h2>
    <p>${ai.brandVoice || 'Professional and inspiring'}</p>
    <hr>
    <h2>🎨 Mood Board</h2>
    <p>${ai.moodBoard || 'A cohesive visual identity with carefully selected colors, typography, and design elements.'}</p>
    <hr>
    <h2>🏆 Competitor Analysis</h2>
    <p>${ai.competitors || 'Positioned uniquely in the market with a distinctive style and approach.'}</p>
    <button class="copy-btn">📋 Copy Brand Identity</button>
    <br><br>
    <button class="export-btn">📄 Export Brand Identity</button>
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

    // ✅ REIMAGINE BUTTON - Regenerate Canvas Logo
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
            
            // ✅ Generate NEW Canvas logo
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
// ✅ ROUND RECT POLYFILL FOR CANVAS
// ============================================

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
// ✅ HISTORY FUNCTIONS
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