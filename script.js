const DORKS = {
  "API Endpoints": [
    'site:{domain} (inurl:api OR inurl:/api/ OR inurl:rest OR inurl:/rest/ OR inurl:v1 OR inurl:/v1/ OR inurl:v2 OR inurl:/v2/ OR inurl:v3 OR inurl:/v3/ OR inurl:v4 OR inurl:graphql OR inurl:json OR inurl:data OR inurl:feed OR inurl:openapi OR inurl:swagger OR inurl:internal OR inurl:backend OR inurl:service OR inurl:services OR inurl:auth OR inurl:admin OR inurl:dev OR inurl:stage OR inurl:staging OR inurl:test OR inurl:uat OR inurl:beta OR inurl:demo OR "openapi" OR "swagger" OR "graphql")'
  ],

  "Juicy Extensions": [
    'site:{domain} (inurl:.git OR inurl:.svn OR inurl:backup OR inurl:dump OR inurl:upload OR inurl:cache OR inurl:.cache OR inurl:.secret OR filetype:env OR filetype:properties OR filetype:ini OR filetype:conf OR filetype:yaml OR filetype:yml OR filetype:json OR filetype:xml OR filetype:csv OR filetype:md OR filetype:sql OR filetype:db OR filetype:sqlite OR filetype:bak OR filetype:zip OR filetype:log OR filetype:key OR filetype:pem OR filetype:crt OR filetype:pfx OR filetype:apk)'
  ],

  "Login / Admin Panels": [
    'site:{domain} (inurl:login OR inurl:signin OR inurl:auth OR inurl:admin OR inurl:dashboard OR inurl:manage OR inurl:/wp-login.php OR intitle:"Login" OR intitle:"Sign In" OR intext:"Admin Login" OR intext:"Restricted access" OR intext:"SSO")'
  ],

  "Server Errors": [
    'site:{domain} (intext:"Stack trace" OR intext:"Exception in thread" OR intext:"Traceback (most recent call last)" OR intext:"NullPointerException" OR intext:"Fatal error" OR intext:"Unhandled Exception" OR intext:"Server Error" OR intext:"Whitelabel Error Page" OR inurl:/error/ OR inurl:/logs/ OR filetype:log)'
  ],

  "Hardcoded Credentials": [
    'site:{domain} (intext:api_key OR intext:access_token OR intext:client_secret OR intext:secret OR intext:AWS_SECRET_ACCESS_KEY OR intext:AWS_ACCESS_KEY_ID OR intext:DB_PASSWORD OR intext:DATABASE_URL OR intext:"BEGIN PRIVATE KEY" OR intext:"ssh-rsa" OR filetype:env OR filetype:json OR inurl:credentials OR inurl:config OR inurl:.git)'
  ]
};

const input = document.getElementById("domainInput");
const container = document.getElementById("dorksContainer");
const subToggle = document.getElementById("subToggle");

function getDomain() {
  let domain = input.value.trim() || "example.com";
  if (subToggle.checked && !domain.startsWith("*.")) {
    domain = "*." + domain;
  }
  return domain;
}

function renderDorks() {
  container.innerHTML = "";
  const domain = getDomain();

  Object.entries(DORKS).forEach(([category, dorks]) => {
    const section = document.createElement("div");
    section.className = "category";

    const title = document.createElement("h2");
    title.textContent = category;
    section.appendChild(title);

    dorks.forEach(dork => {
      const finalDork = dork.replace("{domain}", domain);
      const googleURL =
        "https://www.google.com/search?q=" +
        encodeURIComponent(finalDork);

      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "8px";

      const link = document.createElement("a");
      link.href = googleURL;
      link.target = "_blank";
      link.className = "dork";
      link.textContent = finalDork;

      const copyBtn = document.createElement("button");
      copyBtn.textContent = "📋";
      copyBtn.title = "Copy dork";
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(finalDork);
      };

      row.appendChild(link);
      row.appendChild(copyBtn);
      section.appendChild(row);
    });

    container.appendChild(section);
  });
}

input.addEventListener("input", renderDorks);
subToggle.addEventListener("change", renderDorks);

// Initial render
renderDorks();
