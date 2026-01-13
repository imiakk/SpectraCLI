const colors = require("./Aesthetics/colors")
const pkgInfo = require("./package.json")
const fs = require("fs")
const { makeSession } = require("./Authentication/makeSession")
const { askQuestion } = require("./Aesthetics/getInput")
const { launch } = require("./Launch/launch")
const path = require("path")

function logo() {
    console.log(colors.fgMagenta, `
        
            ░██████╗██████╗░███████╗░█████╗░████████╗██████╗░░█████╗░  ░█████╗░██╗░░░░░██╗
            ██╔════╝██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗  ██╔══██╗██║░░░░░██║
            ╚█████╗░██████╔╝█████╗░░██║░░╚═╝░░░██║░░░██████╔╝███████║  ██║░░╚═╝██║░░░░░██║
            ░╚═══██╗██╔═══╝░██╔══╝░░██║░░██╗░░░██║░░░██╔══██╗██╔══██║  ██║░░██╗██║░░░░░██║
            ██████╔╝██║░░░░░███████╗╚█████╔╝░░░██║░░░██║░░██║██║░░██║  ╚█████╔╝███████╗██║
            ╚═════╝░╚═╝░░░░░╚══════╝░╚════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝  ░╚════╝░╚══════╝╚═╝
        
            `, colors.reset)
}

async function newComer() {
    console.log("Welcome to Spectra CLI")
    console.log(`${colors.bright} ${colors.bgBlack} Before we launch minecraft, Here's some things you must do ${colors.reset} \n`)
    console.log(` > ${colors.underscore} Spectra Mainly uses ElyBy for its authentication. You can signup on https://ely.by/login ${colors.reset}`)
    console.log(" > Spectra is 100% open source and I do not profit off of you.")
    console.log(" > If you're a developer, Please consider contributing to Spectra! \n\n")

    console.log("Please sign up for ElyBy, And answer the given parameters. ")

    const username = await askQuestion("Username: ")
    const password = await askQuestion("Password: ")
    const version = await askQuestion("Version (s+{version} for snapshot): ")

    console.log("---------------------------------------------------------------------------------------------- \n")

    const details = await makeSession(username, password, version)
    
    await launch(false, details)
}

async function init() {
    // Aesthetics \\

    logo()
    console.log(colors.fgBrightBlue, `
        ╭───────────────────────────────────────────────────────────────────────────────╮
                                    Spectra CLI v${pkgInfo.version}                                         
        ╰───────────────────────────────────────────────────────────────────────────────╯
        `, colors.reset)

    if (fs.existsSync("./session.json")) {
        console.log("---------------------------------------------------------------------------------------------- \n")
        console.log(`${colors.bgBlack} [SESSION] ${colors.reset}  Previous Session detected. Diverting direct to launch.`)

        const info = JSON.parse(fs.readFileSync(path.join(__dirname, "session.json")))

        const info2 = await makeSession(info.username, info.password, info.version)

        await launch(false, info2)
    } else {
        newComer()
    }
}

init()