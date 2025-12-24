const DORKS = {
  "API Endpoints": [
    'site:{domain} (inurl:api OR inurl:/api/ OR inurl:rest OR inurl:/rest/ OR inurl:v1 OR inurl:/v1/ OR inurl:v2 OR inurl:/v2/ OR inurl:v3 OR inurl:/v3/ OR inurl:v4 OR inurl:graphql OR inurl:json OR inurl:data OR inurl:feed OR inurl:openapi OR inurl:swagger OR inurl:internal OR inurl:backend OR inurl:service OR inurl:services OR inurl:auth OR inurl:admin OR inurl:dev OR inurl:stage OR inurl:staging OR inurl:test OR inurl:uat OR inurl:beta OR inurl:demo OR "openapi" OR "swagger" OR "graphql")'
  ],

  "Juicy Extensions": [
    'site:{domain} (inurl:.git OR inurl:.svn OR inurl:backup OR inurl:dump OR inurl:upload OR inurl:cache OR inurl:.cache OR inurl:.secret OR filetype:env OR filetype:properties OR filetype:ini OR filetype:conf OR filetype:yaml OR filetype:yml OR filetype:json OR filetype:xml OR filetype:csv OR filetype:md OR filetype:md5 OR filetype:sql OR filetype:db OR filetype:sqlite OR filetype:mdb OR filetype:bak OR filetype:backup OR filetype:zip OR inurl:.tar.gz OR inurl:.tgz OR filetype:tar OR filetype:gz OR filetype:7z OR filetype:rar OR filetype:zip OR filetype:log OR filetype:key OR filetype:pem OR filetype:crt OR filetype:p12 OR filetype:pfx OR filetype:ppk OR filetype:pub OR filetype:asc OR filetype:txt OR filetype:pdf OR filetype:doc OR filetype:docx OR filetype:xls OR filetype:xlsx OR filetype:pptx OR filetype:exe OR filetype:dll OR filetype:bin OR filetype:bat OR filetype:sh OR filetype:tar OR filetype:deb OR filetype:rpm OR filetype:iso OR filetype:img OR filetype:apk OR filetype:msi OR filetype:dmg OR inurl:.tmp OR filetype:config)'
  ],

  "Login / Admin Panels": [
    'site:{domain} (inurl:login OR inurl:signin OR inurl:sign-in OR inurl:auth OR inurl:authenticate OR inurl:session OR inurl:account OR inurl:admin OR inurl:administrator OR inurl:adminpanel OR inurl:admin-panel OR inurl:adminConsole OR inurl:dashboard OR inurl:manage OR inurl:manage/login OR inurl:/wp-login.php OR inurl:/user/login OR inurl:/users/sign_in OR inurl:/auth/realms OR inurl:cpanel OR inurl:webmail OR inurl:console OR intitle:Login OR intitle:"Sign In" OR intitle:Signin OR intitle:Administrator OR intext:"Admin Login" OR intext:"Restricted access" OR intext:"For authorized users only" OR intext:"Sign in to your account" OR intext:"single sign-on" OR intext:"SSO")'
  ],

  "Server Errors": [
    'site:{domain} (intext:"Stack trace" OR intext:"Exception in thread" OR intext:"Caused by:" OR intext:"Traceback (most recent call last)" OR intext:"java.lang." OR intext:"NullPointerException" OR intext:"Fatal error" OR intext:"Warning" OR intext:"Notice" OR intext:"Unhandled Exception" OR intext:"Server Error" OR intext:"Application error" OR intext:"Whitelabel Error Page" OR intext:"Request processing failed; nested exception is" OR inurl:/error/ OR inurl:/errors/ OR inurl:/stacktrace/ OR inurl:/logs/ OR inurl:/log/ OR filetype:log OR filetype:txt OR inurl:trace)'
  ],

  "Hardcoded Credentials": [
    'site:{domain} (intext:api_key OR intext:access_token OR intext:client_secret OR intext:auth_token OR intext:authorizationToken OR intext:x-api-key OR intext:secret OR intext:SECRET_KEY OR intext:secret_token OR intext:credentials OR intext:token OR intext:secure OR intext:AWS_SECRET_ACCESS_KEY OR intext:AWS_ACCESS_KEY_ID OR intext:aws_access_key_id OR intext:aws_secret_key OR intext:aws_token OR intext:GCP_SECRET OR intext:gcloud_api_key OR intext:firebase_url OR intext:shodan_api_key OR intext:DB_PASSWORD OR intext:DATABASE_URL OR intext:db_password OR intext:db_pass OR intext:MYSQL_PASSWORD OR intext:POSTGRES_PASSWORD OR intext:mongo_uri OR intext:mongodb_password OR intext:"BEGIN RSA PRIVATE KEY" OR intext:"BEGIN PRIVATE KEY" OR intext:"ssh-rsa" OR intext:"ssh-ed25519" OR filetype:env OR filetype:json OR filetype:yaml OR filetype:yml OR filetype:properties OR filetype:ini OR inurl:credentials OR inurl:secret OR inurl:config OR inurl:.git)'
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
      row.className = "dork-row";

      const link = document.createElement("a");
      link.href = googleURL;
      link.target = "_blank";
      link.className = "dork";
      link.textContent = finalDork;

      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.textContent = "Copy";

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(finalDork);
        copyBtn.classList.add("copied");
        setTimeout(() => copyBtn.classList.remove("copied"), 1200);
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
