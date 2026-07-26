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

// ✅ YOUR RAILWAY URL
const API_URL = 'https://ai-brand-studio-production.up.railway.app';
// const API_URL = 'http://localhost:3000';

console.log(`📡 API URL: ${API_URL}`);

// ============================================
// 🐐 ULTIMATE GOATED LOGO GENERATOR - 30 STYLES!
// ============================================

function generateGoatedLogo(brandName, primaryColor, secondaryColor, accentColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // 🎨 30 DIFFERENT STYLES
    const styles = [
        // Classic Styles
        'vintage', 'premium', 'modern', 'luxury', 'elegant', 'classic', 'retro', 'antique',
        // Modern Styles
        'tech', 'neon', 'gradient', 'geometric', 'minimal', 'bold', 'sleek', 'futuristic',
        // Artistic Styles
        'creative', 'abstract', 'watercolor', 'sketch', 'pixel', 'glitch', 'popart', 'grunge',
        // Professional Styles
        'corporate', 'sophisticated', 'refined', 'polished', 'executive', 'prestige'
    ];
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];

    // 🎨 15 DIFFERENT GRADIENT BACKGROUNDS
    const bgStyles = [
        // 1. Linear diagonal
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 600);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 2. Radial center
        () => {
            const g = ctx.createRadialGradient(300, 300, 50, 300, 300, 400);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 3. Reverse diagonal
        () => {
            const g = ctx.createLinearGradient(0, 600, 600, 0);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.3, accentColor);
            g.addColorStop(0.7, secondaryColor);
            g.addColorStop(1, primaryColor);
            return g;
        },
        // 4. Radial with white center
        () => {
            const g = ctx.createRadialGradient(200, 200, 50, 400, 400, 400);
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.3, primaryColor);
            g.addColorStop(0.7, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 5. Horizontal
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 0);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.3, accentColor);
            g.addColorStop(0.6, secondaryColor);
            g.addColorStop(1, primaryColor);
            return g;
        },
        // 6. Vertical
        () => {
            const g = ctx.createLinearGradient(0, 0, 0, 600);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, accentColor);
            g.addColorStop(1, secondaryColor);
            return g;
        },
        // 7. Triple gradient
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 600);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.33, secondaryColor);
            g.addColorStop(0.66, accentColor);
            g.addColorStop(1, primaryColor);
            return g;
        },
        // 8. Radial from top-left
        () => {
            const g = ctx.createRadialGradient(100, 100, 50, 300, 300, 400);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, accentColor);
            g.addColorStop(1, secondaryColor);
            return g;
        },
        // 9. Diagonal with white
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 600);
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.3, primaryColor);
            g.addColorStop(0.7, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 10. Radial from bottom-right
        () => {
            const g = ctx.createRadialGradient(500, 500, 50, 300, 300, 400);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.5, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 11. Horizontal with 4 stops
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 0);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.25, secondaryColor);
            g.addColorStop(0.5, accentColor);
            g.addColorStop(0.75, secondaryColor);
            g.addColorStop(1, primaryColor);
            return g;
        },
        // 12. Radial glow
        () => {
            const g = ctx.createRadialGradient(300, 300, 100, 300, 300, 350);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.6, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 13. Angle gradient
        () => {
            const g = ctx.createLinearGradient(0, 300, 600, 300);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.3, accentColor);
            g.addColorStop(0.7, secondaryColor);
            g.addColorStop(1, primaryColor);
            return g;
        },
        // 14. Diagonal with glow
        () => {
            const g = ctx.createLinearGradient(0, 0, 600, 600);
            g.addColorStop(0, primaryColor);
            g.addColorStop(0.4, '#ffffff');
            g.addColorStop(0.6, secondaryColor);
            g.addColorStop(1, accentColor);
            return g;
        },
        // 15. Extreme radial
        () => {
            const g = ctx.createRadialGradient(150, 150, 20, 350, 350, 350);
            g.addColorStop(0, '#ffffff');
            g.addColorStop(0.2, primaryColor);
            g.addColorStop(0.5, secondaryColor);
            g.addColorStop(0.8, accentColor);
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
        // Classic Styles
        case 'vintage': drawVintageStyle(ctx, brandName); break;
        case 'premium': drawPremiumStyle(ctx, brandName); break;
        case 'modern': drawModernStyle(ctx, brandName); break;
        case 'luxury': drawLuxuryStyle(ctx, brandName); break;
        case 'elegant': drawElegantStyle(ctx, brandName); break;
        case 'classic': drawClassicStyle(ctx, brandName); break;
        case 'retro': drawRetroStyle(ctx, brandName); break;
        case 'antique': drawAntiqueStyle(ctx, brandName); break;
        // Modern Styles
        case 'tech': drawTechStyle(ctx, brandName); break;
        case 'neon': drawNeonStyle(ctx, brandName); break;
        case 'gradient': drawGradientStyle(ctx, brandName); break;
        case 'geometric': drawGeometricStyle(ctx, brandName); break;
        case 'minimal': drawMinimalStyle(ctx, brandName); break;
        case 'bold': drawBoldStyle(ctx, brandName); break;
        case 'sleek': drawSleekStyle(ctx, brandName); break;
        case 'futuristic': drawFuturisticStyle(ctx, brandName); break;
        // Artistic Styles
        case 'creative': drawCreativeStyle(ctx, brandName); break;
        case 'abstract': drawAbstractStyle(ctx, brandName); break;
        case 'watercolor': drawWatercolorStyle(ctx, brandName); break;
        case 'sketch': drawSketchStyle(ctx, brandName); break;
        case 'pixel': drawPixelStyle(ctx, brandName); break;
        case 'glitch': drawGlitchStyle(ctx, brandName); break;
        case 'popart': drawPopartStyle(ctx, brandName); break;
        case 'grunge': drawGrungeStyle(ctx, brandName); break;
        // Professional Styles
        case 'corporate': drawCorporateStyle(ctx, brandName); break;
        case 'sophisticated': drawSophisticatedStyle(ctx, brandName); break;
        case 'refined': drawRefinedStyle(ctx, brandName); break;
        case 'polished': drawPolishedStyle(ctx, brandName); break;
        case 'executive': drawExecutiveStyle(ctx, brandName); break;
        case 'prestige': drawPrestigeStyle(ctx, brandName); break;
        default: drawModernStyle(ctx, brandName);
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

// ============================================
// 🎨 30 STYLE FUNCTIONS
// ============================================

// 1. VINTAGE
function drawVintageStyle(ctx, name) {
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

// 2. PREMIUM
function drawPremiumStyle(ctx, name) {
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

// 3. MODERN
function drawModernStyle(ctx, name) {
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

// 4. LUXURY
function drawLuxuryStyle(ctx, name) {
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

// 5. ELEGANT
function drawElegantStyle(ctx, name) {
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

// 6. CLASSIC
function drawClassicStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.roundRect(50, 70, 500, 400, 20);
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 170px "Times New Roman", serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 270, 150, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// 7. RETRO
function drawRetroStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 25;
    const retroColors = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1'];
    const c1 = retroColors[Math.floor(Math.random() * retroColors.length)];
    const c2 = retroColors[Math.floor(Math.random() * retroColors.length)];
    const grad = ctx.createLinearGradient(100, 100, 500, 500);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.fillStyle = grad;
    ctx.font = 'bold 160px "Impact", sans-serif';
    ctx.fillText(letter, 300, 280);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 3;
    ctx.strokeText(letter, 300, 280);
    ctx.restore();
}

// 8. ANTIQUE
function drawAntiqueStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 4;
    ctx.roundRect(30, 40, 540, 460, 30);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 2;
    ctx.roundRect(40, 50, 520, 440, 25);
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createLinearGradient(200, 150, 400, 350);
    grad.addColorStop(0, '#D4C4A8');
    grad.addColorStop(1, '#F5E6D3');
    ctx.fillStyle = grad;
    ctx.font = 'bold 150px "Georgia", serif';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 9. TECH
function drawTechStyle(ctx, name) {
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

// 10. NEON
function drawNeonStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const neonColors = ['#00ff88', '#ff00ff', '#00ccff', '#ff6600', '#ff0088', '#88ff00'];
    const neonColor = neonColors[Math.floor(Math.random() * neonColors.length)];
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 80;
    ctx.fillStyle = neonColor;
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 40;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 11. GRADIENT
function drawGradientStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createLinearGradient(100, 100, 500, 500);
    const colors = ['#FF6B6B', '#FECA57', '#48DBFB', '#FF9FF3', '#54A0FF', '#5F27CD', '#FF6B6B'];
    const start = Math.floor(Math.random() * 4);
    for (let i = 0; i < 6; i++) {
        grad.addColorStop(i / 5, colors[(start + i) % colors.length]);
    }
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = grad;
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 12. GEOMETRIC
function drawGeometricStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    const shapes = [
        () => { ctx.roundRect(100, 100, 400, 340, 20); },
        () => { ctx.beginPath(); ctx.arc(300, 270, 180, 0, Math.PI * 2); },
        () => { ctx.save(); ctx.translate(300, 270); ctx.rotate(45 * Math.PI / 180); ctx.roundRect(-130, -130, 260, 260, 15); ctx.restore(); },
        () => { ctx.save(); ctx.translate(300, 270); for (let i = 0; i < 8; i++) { const a = (i/8)*Math.PI*2; ctx.lineTo(Math.cos(a)*150, Math.sin(a)*150); } ctx.closePath(); ctx.restore(); }
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

// 13. MINIMAL
function drawMinimalStyle(ctx, name) {
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

// 14. BOLD
function drawBoldStyle(ctx, name) {
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

// 15. SLEEK
function drawSleekStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 25;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillText(letter, 300, 265);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(300, 265, 100, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 265, 130, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// 16. FUTURISTIC
function drawFuturisticStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createLinearGradient(100, 100, 500, 500);
    grad.addColorStop(0, '#00ff88');
    grad.addColorStop(0.5, '#00ccff');
    grad.addColorStop(1, '#ff00ff');
    ctx.shadowColor = '#00ccff';
    ctx.shadowBlur = 50;
    ctx.fillStyle = grad;
    ctx.font = 'bold 150px "Orbitron", "Courier New", monospace';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x = 300 + Math.cos(angle) * 190;
        const y = 270 + Math.sin(angle) * 190;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,255,255,0.2)';
        ctx.fill();
    }
    ctx.restore();
}

// 17. CREATIVE
function drawCreativeStyle(ctx, name) {
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

// 18. ABSTRACT
function drawAbstractStyle(ctx, name) {
    ctx.save();
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        const w = 30 + Math.random() * 80;
        const h = 30 + Math.random() * 80;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.07})`;
        ctx.roundRect(-w/2, -h/2, w, h, 10);
        ctx.fill();
        ctx.restore();
    }
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const grad = ctx.createRadialGradient(200, 200, 50, 400, 300, 200);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.8)');
    grad.addColorStop(1, 'rgba(255,255,255,0.3)');
    ctx.fillStyle = grad;
    ctx.font = 'bold 150px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.restore();
}

// 19. WATERCOLOR
function drawWatercolorStyle(ctx, name) {
    ctx.save();
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        const radius = 20 + Math.random() * 80;
        const alpha = 0.02 + Math.random() * 0.05;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowBlur = 0;
        ctx.fill();
    }
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.strokeText(letter, 300, 270);
    ctx.restore();
}

// 20. SKETCH
function drawSketchStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 150px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    for (let i = 0; i < 5; i++) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + i * 0.03})`;
        ctx.lineWidth = 1 + i * 0.5;
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 6;
        ctx.strokeText(letter, 300 + offsetX, 270 + offsetY);
    }
    ctx.restore();
}

// 21. PIXEL
function drawPixelStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 160px "Courier New", monospace';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    const size = 8;
    for (let x = 0; x < 600; x += size) {
        for (let y = 0; y < 600; y += size) {
            if (Math.random() > 0.92) {
                ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`;
                ctx.fillRect(x, y, size, size);
            }
        }
    }
    ctx.restore();
}

// 22. GLITCH
function drawGlitchStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255,0,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#00ffcc';
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 298, 268);
    ctx.shadowColor = 'rgba(0,255,0,0.3)';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#ff00ff';
    ctx.fillText(letter, 302, 272);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(letter, 300, 270);
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        const w = 20 + Math.random() * 60;
        const h = 2 + Math.random() * 4;
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
        ctx.fillRect(x, y, w, h);
    }
    ctx.restore();
}

// 23. POPART
function drawPopartStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const popColors = ['#FF0055', '#FFDD00', '#00FFDD', '#FF8800'];
    const c1 = popColors[Math.floor(Math.random() * popColors.length)];
    const c2 = popColors[Math.floor(Math.random() * popColors.length)];
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 20;
    for (let i = 0; i < 8; i++) {
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        ctx.fillStyle = i % 2 === 0 ? c1 : c2;
        ctx.globalAlpha = 0.2 + i * 0.05;
        ctx.font = `bold ${160 + i * 2}px Arial, sans-serif`;
        ctx.fillText(letter, 300 + offsetX, 270 + offsetY);
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 3;
    ctx.strokeText(letter, 300, 270);
    ctx.restore();
}

// 24. GRUNGE
function drawGrungeStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 20;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 160px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        const radius = 1 + Math.random() * 4;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.15})`;
        ctx.fill();
    }
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * 600;
        const y = Math.random() * 600;
        ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.05})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 100, y + (Math.random() - 0.5) * 100);
        ctx.stroke();
    }
    ctx.restore();
}

// 25. CORPORATE
function drawCorporateStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.roundRect(40, 50, 520, 460, 15);
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 140px Arial, sans-serif';
    ctx.fillText(letter, 300, 260);
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(150, 320);
    ctx.lineTo(450, 320);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

// 26. SOPHISTICATED
function drawSophisticatedStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 25;
    const grad = ctx.createRadialGradient(200, 200, 50, 300, 270, 180);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.8, 'rgba(255,255,255,0.5)');
    grad.addColorStop(1, 'rgba(255,255,255,0.2)');
    ctx.fillStyle = grad;
    ctx.font = 'italic bold 150px "Georgia", serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 270, 110, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// 27. REFINED
function drawRefinedStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    const grad = ctx.createLinearGradient(200, 150, 400, 350);
    grad.addColorStop(0, '#FFE4D6');
    grad.addColorStop(0.5, '#F5D5C6');
    grad.addColorStop(1, '#E8C4B5');
    ctx.fillStyle = grad;
    ctx.font = 'bold 140px "Times New Roman", serif';
    ctx.fillText(letter, 300, 260);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(300, 260, 120, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

// 28. POLISHED
function drawPolishedStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.25)';
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 155px Arial, sans-serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.strokeText(letter, 300, 270);
    ctx.restore();
}

// 29. EXECUTIVE
function drawExecutiveStyle(ctx, name) {
    ctx.save();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 4;
    ctx.roundRect(50, 60, 500, 450, 10);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.roundRect(60, 70, 480, 430, 8);
    ctx.stroke();
    const letter = name.charAt(0).toUpperCase();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 25;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 130px Arial, sans-serif';
    ctx.fillText(letter, 300, 260);
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(170, 320);
    ctx.lineTo(430, 320);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

// 30. PRESTIGE
function drawPrestigeStyle(ctx, name) {
    ctx.save();
    const letter = name.charAt(0).toUpperCase();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 35;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    const grad = ctx.createLinearGradient(200, 150, 400, 350);
    grad.addColorStop(0, '#FFE4B5');
    grad.addColorStop(0.3, '#FFD700');
    grad.addColorStop(0.5, '#FFF8DC');
    grad.addColorStop(0.7, '#FFD700');
    grad.addColorStop(1, '#DAA520');
    ctx.fillStyle = grad;
    ctx.font = 'bold 160px "Georgia", serif';
    ctx.fillText(letter, 300, 270);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'rgba(255,215,0,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeText(letter, 300, 270);
    ctx.restore();
}

// ============================================
// 🏛️ HELPER FUNCTIONS
// ============================================

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