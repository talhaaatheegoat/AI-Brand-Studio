const generateBtn = document.getElementById("generateBtn");

const brandName = document.getElementById("brandName");

const industry = document.getElementById("industry");

const style = document.getElementById("style");

const color = document.getElementById("color");



const result = document.getElementById("result");

const loading = document.getElementById("loading");

let currentLogoPrompt = "";

const historyContainer = document.getElementById("history");



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
    <h2>❌ API Limit Reached</h2>
    <p>
        The free Gemini API daily request limit has been reached.
        Please try again later or use another API key.
    </p>
</div>
`;
    return;
}



        const ai = data.reply;



  const logoPrompt = `
Create a professional modern logo.

IMPORTANT:
The logo MUST display the EXACT brand name:
"${brandName.value}"

Do NOT change any letters.
Do NOT misspell it.
Do NOT invent another name.
Copy it exactly.

If text cannot be rendered perfectly,
DO NOT include any text at all.

Only create the icon/logo.
`;



currentLogoPrompt = logoPrompt;



ai.logo =

`https://image.pollinations.ai/prompt/${encodeURIComponent(currentLogoPrompt)}?width=1024&height=1024&seed=${Date.now()}&model=flux&nologo=true`;



        console.log(ai);



        saveHistory({

            brandName: brandName.value,

            tagline: ai.tagline

        });



        result.innerHTML = `



<div class="result-card fade-in">



<h2>🖼 Generated Logo</h2>



<div class="logo-container">




<img



id="generatedLogo"

src="${ai.logo}"

style="

max-width:260px;

border-radius:15px;

box-shadow:0 0 18px rgba(0,0,0,.2);

<h2 class="brand-title">
    ${brandName.value}
</h2>


">



<br><br>



<button class="new-logo-btn">



<span class="refresh-icon">↻</span>



<span>Reimagine Logo</span>



</button>



<br><br>



<a

id="downloadLogo"

href="${ai.logo}"

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



        // Copy button
document.querySelector(".copy-btn").onclick = () => {

    navigator.clipboard.writeText(
        JSON.stringify(ai, null, 2)
    );

    document.querySelector(".copy-btn").innerHTML = "✅ Copied!";

};

document.querySelector(".export-btn").onclick = () => {

    const content = `
===============================
        AI BRAND STUDIO
===============================

Brand Name:
${brandName.value}

Industry:
${industry.value}

Style:
${style.value}

Preferred Color:
${color.value}

--------------------------------

Logo Concept:
${ai.logoConcept}

--------------------------------

Primary Color:
${ai.primaryColor}

Secondary Color:
${ai.secondaryColor}

Accent Color:
${ai.accentColor}

--------------------------------

Primary Font:
${ai.primaryFont}

Secondary Font:
${ai.secondaryFont}

--------------------------------

Tagline:
${ai.tagline}

--------------------------------

Brand Story:
${ai.brandStory}

--------------------------------

Target Audience:
${ai.targetAudience}

--------------------------------

Instagram Bio:
${ai.instagramBio}

===============================
Generated using AI Brand Studio
===============================
`;

    const blob = new Blob([content], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${brandName.value}-BrandIdentity.txt`;

    a.click();

    URL.revokeObjectURL(url);

};


// Reimagine button
document.querySelector(".new-logo-btn").onclick = () => {

    const btn = document.querySelector(".new-logo-btn");
    const img = document.getElementById("generatedLogo");
    const download = document.getElementById("downloadLogo");

    btn.disabled = true;

    btn.innerHTML = `
        <span class="refresh-icon">🧠</span>
        <span>AI is redesigning...</span>
    `;

    img.style.opacity = "0.35";

    const newLogo =
`https://image.pollinations.ai/prompt/${encodeURIComponent(currentLogoPrompt)}?width=1024&height=1024&model=flux&nologo=true&seed=${Date.now()}`;

    console.log("Reimagine clicked!");
    console.log(newLogo);

   const preload = new Image();

preload.onload = () => {

    img.src = newLogo;
    download.href = newLogo;

    img.style.opacity = "1";

    btn.disabled = false;

    btn.innerHTML = `
        <span class="refresh-icon">↻</span>
        <span>Reimagine Logo</span>
    `;

};

preload.onerror = () => {

    alert("Logo generation failed. Please try again.");

    img.style.opacity = "1";

    btn.disabled = false;

    btn.innerHTML = `
        <span class="refresh-icon">↻</span>
        <span>Reimagine Logo</span>
    `;

};

preload.src = newLogo;

};



    } catch (error) {



        loading.style.display = "none";

        generateBtn.disabled = false;

        generateBtn.innerHTML = "Generate Brand";



        result.innerHTML = "<h2>Cannot connect to server.</h2>";



        console.error(error);



    }



});



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

const randomBtn = document.getElementById("randomBtn");

const randomBrands = [
    "NovaTech",
    "Blade",
    "PixelForge",
    "NeonX",
    "Voltify",
    "SkyLabs",
    "ZenCore",
    "Quantum",
    "GhostByte",
    "HyperNova"
];

const randomIndustries = [
    "Gaming",
    "Technology",
    "Artificial Intelligence",
    "Fashion",
    "Fitness",
    "Coffee",
    "Restaurant",
    "Cyber Security",
    "Education",
    "Music"
];

const randomStyles = [
    "Modern",
    "Minimal",
    "Luxury",
    "Gaming",
    "Technology",
    "Corporate",
    "Vintage",
    "Elegant",
    "Mascot"
];

const randomColors = [
    "AI Choose",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Black",
    "White",
    "Gold",
    "Silver",
    "Orange",
    "Pink",
    "Cyan"
];

randomBtn.onclick = () => {

    brandName.value =
        randomBrands[Math.floor(Math.random() * randomBrands.length)];

    industry.value =
        randomIndustries[Math.floor(Math.random() * randomIndustries.length)];

    style.value =
        randomStyles[Math.floor(Math.random() * randomStyles.length)];

    color.value =
        randomColors[Math.floor(Math.random() * randomColors.length)];

};