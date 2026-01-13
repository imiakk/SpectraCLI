const axios = require("axios");
const colors = require("../Aesthetics/colors")
const fs = require("fs");
const path = require("path");

async function makeSession(username, password, version) {
    try {
        const response = await axios.post("https://authserver.ely.by/auth/authenticate", {
            agent: {
                name: "Minecraft",
                version: version
            },
            username: username,
            password: password,
            clientToken: (Math.random() * 999999999).toString()
        })

        if (response.data.accessToken) {
            if (!fs.existsSync(path.join(__dirname, "../session.json"))) {
                fs.writeFileSync(path.join(__dirname, "../session.json"), "{}")
            }
            fs.writeFileSync(path.join(__dirname, "../session.json"), JSON.stringify({
                "username": username,
                "password": password,
                "version": version
            }))

            console.log(`${colors.bgBlack} [SESSION] ${colors.reset}  Account found. Session Written.`)

            return response.data
        } else {
            console.log(`${colors.bgBlack} [SESSION] ${colors.reset}  Could not connect to ely.by You will be set to offline mode.`)
        }
    } catch (e) {
        console.log(`${colors.bgBlack} [SESSION] ${colors.reset}  Could not connect to ely.by You will be set to offline mode.`)

        return {
            accessToken: "asklgufpOPITEpiivfAIOROPiugswnIUOFY",
            clientToken: "nfiai7INohodeiiUosodbfOPJIOFIASJP",
            selectedProfile: {
                id: "10237497329479034532DNF",
                username: JSON.parse(fs.readFileSync("./session.json")).username
            }
        }
    }
}

module.exports = { makeSession }