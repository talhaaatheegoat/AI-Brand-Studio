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

// ✅ YOUR RAILWAY URL - CHANGE THIS
const API_URL = 'https://ai-brand-studio-production.up.railway.app';
// const API_URL = 'http://localhost:3000';

console.log(`📡 API URL: ${API_URL}`);

// ============================================
// 🐐 ULTIMATE GOATED LOGO GENERATOR - 12 STYLES!
// ============================================

function generateGoatedLogo(brandName, primaryColor, secondaryColor, accentColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // 🎨 12 DIFFERENT STYLES - Random each time
    const styles = [
        'vintage', 'premium', 'modern', 'luxury', 'tech', 'creative',
        'minimal', 'neon', 'gradient', 'geometric', 'elegant', 'bold'
    ];
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

    // 🎨 RANDOM GRADIENT BACKGROUND
    const bgStyles = [
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 600);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        () => {
            const g = ctx.createRadialGradient(300, 300, 50, 300, 300, 400);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        () => {
            const g = ctx.createLinearGradient(0, 600, 600, 0);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.3, accentColor);
            g.addColorStop(0.7, secondaryColor);
            g.addColorStop(1, primaryColor);
            return g;
        },
        () => {
            const g = ctx.createRadialGradient(200, 200, 50, 400, 400, 400);
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.3, primaryColor);
            g.addColorStop(0.7, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 0);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.3, accentColor);
            g.addColorStop(0.6, secondaryColor);
            g.addColorStop(1, primaryColor);
            return g;
        }
    ];

    const bgGrad = bgStyles[Math.floor(Math.random() * bgStyles.length)]();
    ctx.fillStyle = bgGrad;
    ctx.roundRect(0, 0, 600, 600, 40);
    ctx.fill();

    // ✨ GLOW LAYER
    const glow = ctx.createRadialGradient(300, 300, 50, 300, 300, 350);
    glow.addColorStop(0, 'rgba(255,255,255,0.15)');
    glow.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glow;
    ctx.roundRect(0, 0, 600, 600, 40);
    ctx.fill();

    // 🎨 DRAW STYLE
    switch(selectedStyle) {
        case 'vintage':
            drawVintageStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'premium':
            drawPremiumStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'modern':
            drawModernStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'luxury':
            drawLuxuryStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'tech':
            drawTechStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'creative':
            drawCreativeStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'minimal':
            drawMinimalStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'neon':
            drawNeonStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'gradient':
            drawGradientStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'geometric':
            drawGeometricStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'elegant':
            drawElegantStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        case 'bold':
            drawBoldStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
            break;
        default:
            drawModernStyle(ctx, brandName, primaryColor, secondaryColor, accentColor);
    }

    // 🏷️ BRAND NAME
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 38px Arial, sans-serif';
    ctx.fillText(brandName, 300, 540);

    // 📏 DECORATIVE LINE
    ctx.shadowBlur = 0;
    const lineGrad = ctx.createLinearGradient(180, 555, 420, 555);
    lineGrad.addColorStop(0, 'rgba(255,255,255,0)');
    lineGrad.addColorStop(0.3, 'rgba(255,255,255,0.6)');
    lineGrad.addColorStop(0.7, 'rgba(255,255,255,0.6)');
    lineGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(180, 555);
    ctx.lineTo(420, 555);
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 3;
    ctx.stroke();

    // ✨ CORNER ACCENTS
    drawCornerAccent(ctx, 30, 30, 'top-left');
    drawCornerAccent(ctx, 570, 30, 'top-right');
    drawCornerAccent(ctx, 30, 570, 'bottom-left');
    drawCornerAccent(ctx, 570, 570, 'bottom-right');

    // 🏷️ STYLE TAG
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(`✦ ${selectedStyle.toUpperCase()}`, 580, 590);

    return canvas.toDataURL('image/png');
}

// 🎨 VINTAGE STYLE
function drawVintageStyle(ctx, name, p, s, a) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 3;
    ctx.roundRect(60, 70, 480, 400, 15);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.roundRect(70, 80, 460, 380, 10);
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createLinearGradient(200, 150, 400, 350);
    grad.addColorStop(0, '#F5E6D3');
    grad.addColorStop(1, '#D4C4A8');
    ctx.fillStyle = grad;
    ctx.font = 'bold 150px "Georgia", serif';
    ctx.fillText(letter, 300, 270);
    [[80, 90], [520, 90], [80, 440], [520, 440]].forEach(([x, y]) => {
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();
    });
    ctx.restore();
}

// 🎨 PREMIUM STYLE
function drawPremiumStyle(ctx, name, p, s, a) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;
    const goldGrad = ctx.createLinearGradient(200, 150, 400, 350);
    goldGrad.addColorStop(0, '#FFD700');
    goldGrad.addColorStop(0.3, '#FFF8DC');
    goldGrad.addColorStop(0.5, '#FFD700');
    goldGrad.addColorStop(0.7, '#DAA520');
    goldGrad.addColorStop(1, '#FFD700');
    ctx.fillStyle = goldGrad;
    ctx.font = 'bold 180px Arial, sans-serif';
    ctx.fillText(letter, 300, 280);
    ctx.shadowBlur = 20;
    ctx.shadowColor = 'rgba(255,215,0,0.3)';
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillText(letter, 300, 280);
    ctx.restore();
}

// 🎨 MODERN STYLE
function drawModernStyle(ctx, name, p, s, a) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.save();
    ctx.translate(300, 260);
    ctx.rotate(45 * Math.PI / 180);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.roundRect(-80, -80, 160, 160, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 3;
    ctx.roundRect(-80, -80, 160, 160, 20);
    ctx.stroke();
    ctx.restore();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x = 300 + Math.cos(angle) * 170;
        const y = 270 + Math.sin(angle) * 170;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();
    }
    ctx.restore();
}

// 🎨 LUXURY STYLE
function drawLuxuryStyle(ctx, name, p, s, a) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.roundRect(50, 70, 500, 400, 30);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.roundRect(60, 80, 480, 380, 25);
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createLinearGradient(200, 150, 400, 350);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, 'rgba(255,255,255,0.6)');
    ctx.fillStyle = grad;
    ctx.font = 'bold 160px "Times New Roman", serif';
    ctx.fillText(letter, 300, 270);
    [[70, 90], [530, 90], [70, 450], [530, 450]].forEach(([x, y]) => {
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(45 * Math.PI / 180);
        ctx.fillRect(-10, -10, 20, 20);
        ctx.restore();
    });
    ctx.restore();
}

// 🎨 TECH STYLE
function drawTechStyle(ctx, name, p, s, a) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 600; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 600);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(600, i);
        ctx.stroke();
    }
    ctx.save();
    ctx.translate(300, 270);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 120;
        const y = Math.sin(angle) * 120;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,255,255,0.2)';
    ctx.shadowBlur = 40;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 140px "Courier New", monospace';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 🎨 CREATIVE STYLE
function drawCreativeStyle(ctx, name, p, s, a) {
    ctx.save();
    for (let i = 0; i < 30; i++) {
        const x = 100 + Math.random() * 400;
        const y = 80 + Math.random() * 400;
        const radius = 10 + Math.random() * 40;
        const alpha = 0.05 + Math.random() * 0.08;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowBlur = 0;
        ctx.fill();
    }
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 8;
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.strokeText(letter, 300, 270);
    const grad = ctx.createRadialGradient(250, 200, 20, 300, 270, 150);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    grad.addColorStop(1, 'rgba(255,255,255,0.6)');
    ctx.fillStyle = grad;
    ctx.fillText(letter, 300, 270);
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x = 300 + Math.cos(angle) * 190;
        const y = 270 + Math.sin(angle) * 190;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();
    }
    ctx.restore();
}

// 🎨 MINIMAL STYLE
function drawMinimalStyle(ctx, name, p, s, a) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px Arial, sans-serif';
    ctx.fillText(letter, 300, 260);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(300, 260, 140, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// 🎨 NEON STYLE
function drawNeonStyle(ctx, name, p, s, a) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const neonColors = ['#00ff88', '#ff00ff', '#00ccff', '#ff6600'];
    const neonColor = neonColors[Math.floor(Math.random() * neonColors.length)];
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 60;
    ctx.fillStyle = neonColor;
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 🎨 GRADIENT STYLE
function drawGradientStyle(ctx, name, p, s, a) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createLinearGradient(100, 100, 500, 500);
    grad.addColorStop(0, '#FF6B6B');
    grad.addColorStop(0.3, '#FECA57');
    grad.addColorStop(0.6, '#48DBFB');
    grad.addColorStop(0.8, '#FF9FF3');
    grad.addColorStop(1, '#FF6B6B');
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = grad;
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 🎨 GEOMETRIC STYLE
function drawGeometricStyle(ctx, name, p, s, a) {
    ctx.save();
    ctx.shadowBlur = 0;
    const shapes = [
        () => { ctx.roundRect(100, 100, 400, 340, 20); },
        () => { ctx.beginPath(); ctx.arc(300, 270, 180, 0, Math.PI * 2); },
        () => { ctx.save(); ctx.translate(300, 270); ctx.rotate(45 * Math.PI / 180); ctx.roundRect(-130, -130, 260, 260, 15); ctx.restore(); }
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    shape();
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 3;
    shape();
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 🎨 ELEGANT STYLE
function drawElegantStyle(ctx, name, p, s, a) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    const grad = ctx.createRadialGradient(250, 200, 30, 300, 270, 150);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.9)');
    grad.addColorStop(1, 'rgba(255,255,255,0.5)');
    ctx.fillStyle = grad;
    ctx.font = 'italic bold 160px "Georgia", serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 270, 130, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// 🎨 BOLD STYLE
function drawBoldStyle(ctx, name, p, s, a) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 200px Arial, sans-serif';
    ctx.fillText(letter, 300, 280);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 4;
    ctx.strokeText(letter, 300, 280);
    ctx.restore();
}

// 🏛️ CORNER ACCENT
function drawCornerAccent(ctx, x, y, position) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 3;
    const size = 25;
    ctx.shadowBlur = 0;
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

        const logoDataUrl = generateGoatedLogo(
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
        style="max-width:320px;border-radius:24px;box-shadow:0 20px 60px rgba(0,0,0,0.4);display:block;"
        onload="console.log('✅ Logo loaded!')"
    >
    <br>
    <div style="display:flex;gap:15px;flex-wrap:wrap;justify-content:center;">
        <button class="new-logo-btn" id="reimagineBtn" style="background:linear-gradient(135deg, #667eea, #764ba2);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(102,126,234,0.3);">
            <span class="refresh-icon">↻</span>
            <span>Reimagine Logo</span>
        </button>
        <a id="downloadLogo" href="${logoDataUrl}" download="logo.png" target="_blank" style="padding:14px 35px;background:linear-gradient(135deg, #28a745, #20c997);color:white;border-radius:30px;text-decoration:none;display:inline-block;font-weight:600;box-shadow:0 4px 15px rgba(40,167,69,0.3);">
            ⬇ Download Logo
        </a>
    </div>
</div>`;

        result.innerHTML = `
<div class="result-card fade-in" style="background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border-radius:24px;padding:35px;border:1px solid rgba(255,255,255,0.08);">
    <h2 style="color:#e6f1ff;font-size:2rem;margin-bottom:20px;">🖼 Generated Logo</h2>
    <div class="logo-container" style="background:rgba(0,0,0,0.2);border-radius:20px;padding:30px;">${logoHTML}</div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎨 Logo Concept</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;line-height:1.8;">${ai.logoConcept}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🌈 Color Palette</h2>
    <div style="display:flex;gap:15px;flex-wrap:wrap;">
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);padding:10px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);">
            <div style="width:45px;height:45px;border-radius:12px;background:${ai.primaryColor};border:2px solid rgba(255,255,255,0.1);"></div>
            <span style="color:#a8b2d1;font-weight:500;">${ai.primaryColor}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);padding:10px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);">
            <div style="width:45px;height:45px;border-radius:12px;background:${ai.secondaryColor};border:2px solid rgba(255,255,255,0.1);"></div>
            <span style="color:#a8b2d1;font-weight:500;">${ai.secondaryColor}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);padding:10px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.05);">
            <div style="width:45px;height:45px;border-radius:12px;background:${ai.accentColor};border:2px solid rgba(255,255,255,0.1);"></div>
            <span style="color:#a8b2d1;font-weight:500;">${ai.accentColor}</span>
        </div>
    </div>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🔤 Fonts</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;"><b style="color:#e6f1ff;">Primary:</b> ${ai.primaryFont}</p>
    <p style="color:#a8b2d1;font-size:1.1rem;"><b style="color:#e6f1ff;">Secondary:</b> ${ai.secondaryFont}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">💬 Tagline</h2>
    <h3 style="color:#ffd700;font-size:1.4rem;font-style:italic;">"${ai.tagline}"</h3>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">📖 Brand Story</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;line-height:1.8;">${ai.brandStory}</p>
    <hr style="border-color:rgba(255,255,255,0.08);margin:30px 0;">
    <h2 style="color:#e6f1ff;font-size:1.5rem;">🎯 Target Audience</h2>
    <p style="color:#a8b2d1;font-size:1.1rem;line-height:1.8;">${ai.targetAudience}</p>
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
    <div style="display:flex;gap:15px;flex-wrap:wrap;margin-top:25px;">
        <button class="copy-btn" style="background:linear-gradient(135deg, #667eea, #764ba2);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(102,126,234,0.3);">📋 Copy Brand Identity</button>
        <button class="export-btn" style="background:linear-gradient(135deg, #f093fb, #f5576c);color:white;border:none;padding:14px 35px;border-radius:30px;font-size:1rem;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,87,108,0.3);">📄 Export Brand Identity</button>
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
🐐 GOATED BRAND IDENTITY KIT
===============================
Brand: ${brandName.value}
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
Generated by AI Brand Studio 🐐
===============================`;
            
            navigator.clipboard.writeText(brandInfo);
            copyBtn.innerHTML = "✅ Copied!";
            setTimeout(() => copyBtn.innerHTML = "📋 Copy Brand Identity", 2000);
        };
    }

    const exportBtn = document.querySelector(".export-btn");
    if (exportBtn) {
        exportBtn.onclick = () => {
            const content = `
🐐 GOATED BRAND IDENTITY KIT
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
Generated by AI Brand Studio 🐐
===============================`;

            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${brandName.value}-GOATED-Brand-Kit.txt`;
            a.click();
            URL.revokeObjectURL(url);
        };
    }

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
            
            const newLogo = generateGoatedLogo(
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
<div class="history-card" data-index="${index}" style="background:rgba(255,255,255,0.05);padding:15px 20px;border-radius:12px;margin-bottom:10px;cursor:pointer;transition:all 0.3s;border:1px solid rgba(255,255,255,0.05);">
    <h3 style="color:#e6f1ff;margin:0;">${item.brandName}</h3>
    <p style="color:#a8b2d1;margin:5px 0 0;">${item.tagline}</p>
</div>`;
    });
    document.querySelectorAll(".history-card").forEach(card => {
        card.onclick = () => {
            const history = JSON.parse(localStorage.getItem("brands"));
            alert("🐐 Selected: " + history[card.dataset.index].brandName);
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