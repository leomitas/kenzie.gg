import { leaderboard } from "../../scripts/apiRank.js";
import { summonerMasteries, filter, key, getInfosAccount } from "../../scripts/api.js"

async function renderLeaderboard() {
    const ul = document.querySelector('.leaderboard')
    const profiles = await leaderboard()
    ul.innerHTML = ''
    profiles.forEach(async element => {
        ul.insertAdjacentHTML('beforeend', `
        <li class="card flex flex-column" id="${element.summonerId}">
                <div class="flex justify-between align-start">
                    <div class="flex align-center gap-2">
                            <img class="profile-icon" src="" alt="">
                        <div class="flex flex-column justify-between">
                            <p>${element.summonerName}</p>
                            <p>${element.tier}</p>
                            <p>${element.leaguePoints} LP</p>
                        </div>
                    </div>
                    <button class="access-profile">Acessar Perfil</button>
                </div>
                <div class="border-card"></div>
                <div class="mastery flex justify-center align-center gap-1">
                    <div class="mastery-profile">
                    </div>
                    <div class="mastery-profile">
                    </div>
                    <div class="mastery-profile">
                    </div>
                </div>
            </li>
        `)
    });
}

async function lazyLoading() {
    const cards = document.querySelectorAll('.card')

    cards.forEach((card) => {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                const icon = await accountRiot(card.id)
                const masteries = await summonerMasteries(card.id)
                const filtered = await filter([masteries[0].championId, masteries[1].championId, masteries[2].championId])
                const img = card.querySelector('.profile-icon')
                img.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/${icon.profileIconId}.png`

                const profileMasteries = card.querySelectorAll('.mastery-profile')
                profileMasteries.forEach((profile, index) => {
                    profile.innerHTML = `<img src="https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${filtered[index]}.png" alt="">`
                })
            }
        })
        observer.observe(card)
    })
}

async function accountRiot(username) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/${username}?api_key=${key}`, options)
        .then(response => {
            return response.json()
        })
        .then(response => {
            return response
        })
        .catch(err => console.log(err))
    return response
}

// async function filter(num) {
//     const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json`)
//     .then(response => {
//         return response.json()
//     })
//     .then(response => {
//         return response
//     })
//     const champion = Object.keys(response.data)
//     const filtered = num.map((num) => {
//         return champion.find((champion) => {
//             if(response.data[champion].key == num) {
//                 return response.data[champion].id
//             }
//         })
//     })
//     return filtered
// }


async function accessProfile() {
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        const button = card.querySelector('.access-profile')
        button.addEventListener('click', async () => {
            const user = await accountRiot(card.id)
            localStorage.setItem('username', JSON.stringify(user))
            window.location.href = '../matches/index.html'
        })
    })
}

const buttonHome = document.querySelector('.home')
buttonHome.addEventListener('click', () => {
    window.location.href = '../../../index.html'
})

await renderLeaderboard()
await lazyLoading()
await accessProfile()