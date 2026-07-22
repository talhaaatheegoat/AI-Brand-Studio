const generateBtn = document.getElementById("generateBtn");
const brandName = document.getElementById("brandName");
const industry = document.getElementById("industry");
const style = document.getElementById("style");
const color = document.getElementById("color");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
let currentLogoPrompt = "";
const historyContainer = document.getElementById("history");

// ✅ Track current brand data for reimagine
let currentBrandData = null;

loading.style.display = "none";

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

        const response = await fetch("https://ai-brand-studio-production.up.railway.app/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
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
    <p>${data.message || "Something went wrong. Please try again."}</p>
</div>
`;
            return;
        }

        const ai = data.reply;
        currentBrandData = ai; // ✅ Store for reimagine

        // ✅ Use logo from backend if available
        const logoImage = ai.logo ? ai.logo : null;
        
        // ✅ Store prompt for reimagine
        currentLogoPrompt = 
            `${brandName.value} ${industry.value} ${style.value} logo, minimalist vector logo, flat design, white background`;

        console.log("Brand data received:", ai);

        saveHistory({
            brandName: brandName.value,
            tagline: ai.tagline
        });

        // ✅ Build the result HTML
        let logoHTML = '';
        if (logoImage) {
            logoHTML = `
<img
id="generatedLogo"
src="${logoImage}"
style="
max-width:260px;
border-radius:15px;
box-shadow:0 0 18px rgba(0,0,0,.2);
">
<br><br>
<button class="new-logo-btn">
    <span class="refresh-icon">↻</span>
    <span>Reimagine Logo</span>
</button>
<br><br>
<a
id="downloadLogo"
href="${logoImage}"
download="logo.png"
target="_blank"
style="
padding:10px 18px;
background:#007BFF;
color:white;
border-radius:10px;
text-decoration:none;
display:inline-block;
">
⬇ Download Logo
</a>
`;
        } else {
            logoHTML = `
<div style="
padding: 40px 20px;
background: #f8f9fa;
border-radius: 15px;
border: 2px dashed #ddd;
text-align: center;
">
    <p style="color: #666; font-size: 1.1rem;">⚠️ Logo generation failed</p>
    <p style="color: #999; font-size: 0.9rem;">${ai.imageError || 'Please try regenerating'}</p>
    <br>
    <button class="new-logo-btn">
        <span class="refresh-icon">↻</span>
        <span>Retry Logo Generation</span>
    </button>
</div>
`;
        }

        result.innerHTML = `
<div class="result-card fade-in">

<h2>🖼 Generated Logo</h2>

<div class="logo-container">
${logoHTML}
</div>

<hr>

<h2>🎨 Logo Concept</h2>

<p>${ai.logoConcept}</p>

<hr>

<h2>🌈 Color Palette</h2>

<div class="color-box">
<div class="color-preview" style="background:${ai.primaryColor};"></div>
${ai.primaryColor}
</div>

<div class="color-box">
<div class="color-preview" style="background:${ai.secondaryColor};"></div>
${ai.secondaryColor}
</div>

<div class="color-box">
<div class="color-preview" style="background:${ai.accentColor};"></div>
${ai.accentColor}
</div>

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

<button class="copy-btn">
📋 Copy Brand Identity
</button>
<br><br>
<button class="export-btn">
📄 Export Brand Identity
</button>

</div>
`;

        // ✅ Setup event listeners for buttons
        setupButtons(ai);

    } catch (error) {

        loading.style.display = "none";
        generateBtn.disabled = false;
        generateBtn.innerHTML = "Generate Brand";

        result.innerHTML = `
<div class="result-card">
    <h2>❌ Cannot connect to server</h2>
    <p>Please check your internet connection and try again.</p>
</div>
`;

        console.error(error);

    }

});

// ============================================
// ✅ BUTTON SETUP FUNCTION
// ============================================

function setupButtons(ai) {
    // Copy button
    const copyBtn = document.querySelector(".copy-btn");
    if (copyBtn) {
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(JSON.stringify(ai, null, 2));
            copyBtn.innerHTML = "✅ Copied!";
            setTimeout(() => {
                copyBtn.innerHTML = "📋 Copy Brand Identity";
            }, 2000);
        };
    }

    // Export button
    const exportBtn = document.querySelector(".export-btn");
    if (exportBtn) {
        exportBtn.onclick = () => {
            const content = `
===============================
        AI BRAND STUDIO
===============================

Brand Name: ${brandName.value}
Industry: ${industry.value}
Style: ${style.value}
Preferred Color: ${color.value}

--------------------------------

Logo Concept: ${ai.logoConcept}

--------------------------------

Primary Color: ${ai.primaryColor}
Secondary Color: ${ai.secondaryColor}
Accent Color: ${ai.accentColor}

--------------------------------

Primary Font: ${ai.primaryFont}
Secondary Font: ${ai.secondaryFont}

--------------------------------

Tagline: ${ai.tagline}

--------------------------------

Brand Story: ${ai.brandStory}

--------------------------------

Target Audience: ${ai.targetAudience}

--------------------------------

Instagram Bio: ${ai.instagramBio}

===============================
Generated using AI Brand Studio
===============================`;

            const blob = new Blob([content], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${brandName.value}-BrandIdentity.txt`;
            a.click();
            URL.revokeObjectURL(url);
        };
    }

    // ✅ FIXED: Reimagine button
    const reimagineBtn = document.querySelector(".new-logo-btn");
    if (reimagineBtn) {
        reimagineBtn.onclick = async () => {
            const btn = reimagineBtn;
            const img = document.getElementById("generatedLogo");
            const download = document.getElementById("downloadLogo");

            btn.disabled = true;
            btn.innerHTML = `
                <span class="refresh-icon">🧠</span>
                <span>AI is redesigning...</span>
            `;

            if (img) img.style.opacity = "0.35";

            try {
                // ✅ Call backend to regenerate logo
                const response = await fetch("https://ai-brand-studio-production.up.railway.app/regenerate-logo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        brandName: brandName.value,
                        industry: industry.value,
                        style: style.value,
                        logoConcept: currentBrandData?.logoConcept || currentLogoPrompt
                    })
                });

                const data = await response.json();

                if (data.success && data.logo) {
                    if (img) {
                        img.src = data.logo;
                        img.style.opacity = "1";
                    }
                    if (download) {
                        download.href = data.logo;
                    }
                    btn.innerHTML = `
                        <span class="refresh-icon">↻</span>
                        <span>Reimagine Logo</span>
                    `;
                } else {
                    throw new Error(data.message || "Failed to regenerate");
                }
            } catch (error) {
                console.error("Reimagine error:", error);
                alert("Logo regeneration failed. Please try again.");
                if (img) img.style.opacity = "1";
                btn.innerHTML = `
                    <span class="refresh-icon">↻</span>
                    <span>Reimagine Logo</span>
                `;
            } finally {
                btn.disabled = false;
            }
        };
    }
}

// ============================================
// ✅ HISTORY FUNCTIONS
// ============================================

function saveHistory(brand) {
    let history = JSON.parse(localStorage.getItem("brands")) || [];
    history.unshift(brand);
    if (history.length > 5) {
        history.pop();
    }
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
</div>
`;
    });

    document.querySelectorAll(".history-card").forEach(card => {
        card.onclick = () => {
            const history = JSON.parse(localStorage.getItem("brands"));
            const brand = history[card.dataset.index];
            alert("Selected: " + brand.brandName);
        };
    });
}

loadHistory();

// ============================================
// ✅ RANDOM BUTTON
// ============================================

const randomBtn = document.getElementById("randomBtn");
const randomBrands = [
    "NovaTech", "Blade", "PixelForge", "NeonX", "Voltify",
    "SkyLabs", "ZenCore", "Quantum", "GhostByte", "HyperNova"
];
const randomIndustries = [
    "Gaming", "Technology", "Artificial Intelligence", "Fashion",
    "Fitness", "Coffee", "Restaurant", "Cyber Security", "Education", "Music"
];
const randomStyles = [
    "Modern", "Minimal", "Luxury", "Gaming", "Technology",
    "Corporate", "Vintage", "Elegant", "Mascot"
];
const randomColors = [
    "AI Choose", "Blue", "Red", "Green", "Purple",
    "Black", "White", "Gold", "Silver", "Orange", "Pink", "Cyan"
];

randomBtn.onclick = () => {
    brandName.value = randomBrands[Math.floor(Math.random() * randomBrands.length)];
    industry.value = randomIndustries[Math.floor(Math.random() * randomIndustries.length)];
    style.value = randomStyles[Math.floor(Math.random() * randomStyles.length)];
    color.value = randomColors[Math.floor(Math.random() * randomColors.length)];
};

// ============================================
// ✅ REGENERATE LOGO ENDPOINT
// ============================================

app.post("/regenerate-logo", async (req, res) => {

    try {
        const { brandName, industry, style, logoConcept } = req.body;

        if (!brandName) {
            return res.status(400).json({
                success: false,
                message: "Brand name is required"
            });
        }

        console.log(`🔄 Regenerating logo for: ${brandName}`);

        const logoPrompt = `
Professional ${style} logo for a ${industry || 'brand'} company.

Brand Name: ${brandName}

Concept: ${logoConcept || 'modern minimalist logo'}

Requirements:
- Modern vector logo
- Clean minimalist design
- White background
- Flat design
- No mockup
- High quality
`;

        try {
            const logoBuffer = await generateLogoImage(logoPrompt);
            const logoBase64 = Buffer.from(logoBuffer).toString("base64");
            const logo = `data:image/png;base64,${logoBase64}`;

            res.json({
                success: true,
                logo: logo
            });
        } catch (imageError) {
            console.error('❌ Logo regeneration failed:', imageError.message);
            res.json({
                success: false,
                message: imageError.message
            });
        }

    } catch (error) {
        console.error('❌ Error regenerating logo:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

});