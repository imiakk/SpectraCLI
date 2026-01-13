const fs = require("fs")
const path = require("path")
const colors = require("../Aesthetics/colors")
const { Client } = require("minecraft-launcher-core")

async function launch(offline, info) {

    if (!offline) {
        try {
            const fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, "../session.json")))
            var isSnapshot = false

            console.log(`${colors.bgGray} [LAUNCHER] ${colors.reset} Session read. Directing to launch.`)

            if (fileContents.version.split("+")[0]) {
                if (fileContents.version.split("+")[0] === "s") {
                    isSnapshot = true
                    console.log(`${colors.bgGray} [LAUNCHER] ${colors.reset} Version detected as snapshot. Directing accordingly.`)
                }
            }

            const client = new Client()

            
            client.launch({
                    authorization: {
                        access_token: info.accessToken,
                        client_token: info.clientToken,
                        uuid: info.selectedProfile.id,
                        name: info.selectedProfile.name,
                        user_type: "mojang"
                    },
                    version: {
                        type: isSnapshot ? "snapshot" : "release",
                        number: fileContents.version
                    },
                    

                    root: path.join(__dirname, "./minecraft")
                })

            client.on("debug", (v) => {
                console.log(`${colors.bgBlue} [DEBUG] ${colors.reset} ${v}`)
            })

            client.on("data", (v) => {
                console.log(`${colors.bgGreen} [DATA] ${colors.reset} ${v}`)
            })

            client.on("error", (e) => {
                console.log(`${colors.bgRed} [MC ERROR] ${colors.reset} ${e}`)
            })

            client.on("close", (code) => {
                console.log(`${colors.bgRed} [MC EXIT] ${colors.reset} Code: ${code}`)
            })

        } catch (e) {
            console.log(`${colors.bgRed} [LAUNCH ERROR] ${colors.reset} ${e}`)

            process.exit()
        }
    }
}

module.exports = { launch }