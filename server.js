const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const crypto = require("crypto");
const open = require("opn");


dotenv.config();

const app = express();
const PORT = 4000;

let codeVerifier = "";
let accessToken = "";

// 🔹 Fonction pour générer un code challenge PKCE
function generateCodeChallenge() {
    console.log("generateCodeChallenge()")
    codeVerifier = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256").update(codeVerifier).digest("base64url");
    console.log("Hash:", hash)
    return hash;
}

// 🔹 Route pour initier l'authentification OAuth
app.get("/auth", async (req, res) => {
    console.log("auth()")
    const codeChallenge = generateCodeChallenge();
    
    const authURL = `${process.env.AUTHORIZATION_URL}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    console.log("🔗 Ouvre cette URL pour te connecter : ", authURL);
    await open(authURL); // Ouvre l'URL dans le navigateur
    res.send("Redirection vers Sellsy...");
});

// 🔹 Callback OAuth après authentification
app.get("/auth/callback", async (req, res) => {
    console.log("/auth/callback()")
    const { code } = req.query;
    console.log("code", code)
    if (!code) return res.send("Erreur : Pas de code reçu");

    try {
        const response = await axios.post(process.env.TOKEN_URL, {
            grant_type: "authorization_code",
            client_id: process.env.CLIENT_ID,
            redirect_uri: process.env.REDIRECT_URI,
            code_verifier: codeVerifier,
            code: code,
        });

        accessToken = response.data.access_token;
        console.log("accessToken", accessToken)
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Erreur lors de l'échange du code :", error.response?.data || error.message);
        res.send("Erreur lors de l'authentification.");
    }
});

// 🔹 Dashboard après login
app.get("/dashboard", async (req, res) => {
    console.log("/dashboard")
    if (!accessToken) return res.redirect("/auth");

    try {
        const apiResponse = await axios.get(`${process.env.API_URL}/taxes?limit=2`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        res.send(`
            <html>
                <head>
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="flex flex-col items-center justify-center h-screen bg-gray-100 overflow-auto">
                    <div class="p-6 bg-white shadow-lg rounded-lg">
                        <h1 class="text-xl font-bold">Bienvenue 🚀</h1>
                        <p class="mt-2">Données API :</p>
                        <pre class="p-4 bg-gray-200 rounded">${JSON.stringify(apiResponse.data, null, 2)}</pre>
                        <a href="/logout" class="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded">Déconnexion</a>
                    </div>
                </body>
            </html>
        `);
    } catch (error) {
        console.error("Erreur API :", error.response?.data || error.message);
        res.send("Erreur lors de l'appel API.");
    }
});

// 🔹 Déconnexion
app.get("/logout", (req, res) => {
    console.log("Logout")
    accessToken = "";
    res.redirect("/");
});

// 🔹 Accueil
app.get("/", (req, res) => {
    console.log("Home page")
    if (req.query.code) {
        console.log("📥 Code reçu sur /, redirection vers /auth/callback");
        return res.redirect(`/auth/callback?code=${req.query.code}`);
    }
    res.send(`
        <html>
            <head>
                <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div class="p-6 bg-white shadow-lg rounded-lg">
                    <h1 class="text-xl font-bold">Connexion à Sellsy</h1>
                    <a href="/auth" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded">Se connecter</a>
                </div>
            </body>
        </html>
    `);
});

// 🔹 Lancer le serveur
app.listen(PORT, () => {
    console.log(`🔗 Serveur en ligne sur http://localhost:${PORT}`);
});
