import { filter } from "../../scripts/api.js"
import { key } from "../../scripts/api.js"

const IDbaseURL = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
const champsBaseURL = "https://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion/"

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
}
// const optionsKey = {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${key}`
//     }
// }

const error = document.getElementById("error")
async function getAccountID(username) {
    const response = await fetch(IDbaseURL + `${username}` + `?api_key=${key}`, options)
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => {
            console.log(err)
            error.classList = "display-block color-red"
        })
    return response
}

async function getChampionRotation() {
    const response = await fetch(`https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?&api_key=${key}`, options)
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log(err))
    return response
}
// const array = []
// const arrayNick = []
function getUsername() {
    const form = document.querySelector("form")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        error.classList = "display-none"
        const username = `${e.target.children[0].children[0].value}`
        const user = username.replace(/\s/g, '')
        const getID = await getAccountID(user)
        localStorage.setItem("username", JSON.stringify(getID))
        // arrayNick.push(getID)
        // localStorage.setItem("id", JSON.stringify(getID))
        // const accountID = getID.id
        // const getInfos = await getInfosAccount(accountID)
        // localStorage.setItem("account", JSON.stringify(getInfos))
        // array.push(getInfos[0])
        // const account = JSON.parse(localStorage.getItem("account"))
        // const nick = JSON.parse(localStorage.getItem("id"))
        // createUser(account, nick)
        window.location.replace("./src/pages/matches/index.html")
    })
}

// const ul = document.getElementById("users")
// const noProfile = document.getElementById("noProfile")
// function createUser(users, nicks) {
//     noProfile.innerHTML = ""
//     // ul.innerHTML = ""
//     users.map((user, index) => {
//         ul.append(nicksAccount(user, nicks)[index])
//     })
// }

// function nicksAccount(user, nicks) {
//     console.log("oi")
//     const account = [nicks].map((nick) => {    
//         const li = document.createElement("li")
//         const img = document.createElement("img")
//         const div = document.createElement("div")
//         const h3 = document.createElement("h3")
//         const p = document.createElement("p")

//         li.className = "user"
//         img.className = "img-2"

//         if (user !== undefined) {
//             const winRate = (user.wins / (user.wins + user.losses)) * 100
//             if (nick.profileIconId !== "") {
//                 img.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/${nick.profileIconId}.png`
//             } else {
//                 img.src = "../../assets/Riot_Games_logo_icon.png"
//             }
//             h3.innerText = `${user.summonerName}`
//             p.innerText = `${user.tier} ${user.rank} | WinRate ${Math.round(winRate)}%`
//         } else {
//             img.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/${nick.profileIconId}.png`
//             h3.innerText = `${nick.name}`
//             p.innerText = `Unranked`
//         }
//         div.append(h3, p)
//         li.append(img, div)
//         return li
//     })
//     return account
// }

getUsername()

// async function getChampion(name) {
//     const response = await fetch(champsBaseURL + `${name}.json`, options)
//         .then((res) => res.json())
//         .then((res) => res)
//         .catch((err) => console.log(err))
//     return response
// }
// const nameChampsFree = getChampionRotation()
// nameChampsFree.map(async (name) => {
//     const champ = await getChampion(name)
//     console.log(champ)
// })


const freeChamps = await getChampionRotation()
const nameChamps = await filter(freeChamps.freeChampionIds)
function renderChamps(champs) {
    const ul = document.getElementById("champs")
    champs.map((champ) => {
        const li = document.createElement("li")
        const img = document.createElement("img")
        img.classList = "img"
        img.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${champ}.png`
        li.append(img)
        ul.append(li)
    })
}
// const nameChampsLowLevel = await filter(freeChamps.freeChampionIdsForNewPlayers)
// function renderChampsLowLevel(champs) {
//     const ul = document.getElementById("champsLowLevel")
//     champs.map((champ) => {
//         const li = document.createElement("li")
//         const img = document.createElement("img")
//         img.classList = "img"
//         img.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${champ}.png`
//         li.append(img)
//         ul.append(li)
//     })
// }

renderChamps(nameChamps)
// renderChampsLowLevel(nameChampsLowLevel)

// async function test() {
//     const response = await fetch(`https://br1.api.riotgames.com/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5`, optionsKey)
//         .then((res) => res.json())
//         .then((res) => res)
//         .catch((err) => console.log(err))
//     return response
// }

// console.log(await test())