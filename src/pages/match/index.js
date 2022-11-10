import { key } from "../../scripts/api.js"

const matchId = JSON.parse(localStorage.getItem('matchId'))
console.log(matchId)
async function getMatch() {
    const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${key}`)
        .then(response => response.json())
        .then(response => response)
    console.log(response)
    return response
}

async function renderPlayers() {
    const match = await getMatch()
    console.log(match.info.participants[1])
    match.info.participants.forEach(player => {
        // let kda = (player.kills+player.assists)/player.deaths
        // if(kda == NaN) {
        //     kda = 0
        // }
        // console.log(kda)
        if (player.teamId == 100) {
            const ul = document.querySelector('.red-team')
            ul.insertAdjacentHTML('beforeend', `<li class="flex flex-column">
            <div class="flex justify-start gap">
                <img class="sprite-champion" src="${fiddle(player)}" alt="">
                <div class="flex justify-between items-center gap">
                    <p>${player.summonerName}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <div class="KDA flex flex-column align-center">
                    <p>KDA: ${player.challenges.kda.toFixed(1)}</p>
                    <p>${player.kills}/${player.deaths}/${player.assists}</p>
                </div>
                <div class="damage-given flex flex-column align-center">
                    <p>Dano total causado:</p>
                    <p>${player.totalDamageDealtToChampions}</p>
                    <p>Dano total recebido:</p>
                    <p>${player.totalDamageTaken}</p>
                </div>
                <div class="wards-placed flex flex-column align-center">
                    <p>Wards:</p>
                    <p>${player.wardsPlaced}</p>
                    <p>Wards de controle:</p>
                    <p>${player.visionWardsBoughtInGame}</p>
                </div>
                <div class="farm flex flex-column align-center">
                    <p>Farm:</p>
                    <p>${player.totalMinionsKilled+Math.round(player.challenges.alliedJungleMonsterKills)+Math.round(player.challenges.enemyJungleMonsterKills)+(Math.round(player.challenges.scuttleCrabKills)*4)}</p>
                    <p>Farm nos primeiros 10 minutos:</p>
                    <p>${Math.round(player.challenges.jungleCsBefore10Minutes)+Math.round(player.challenges.laneMinionsFirst10Minutes)}</p>
                </div>
            </div>
        </li>`)
        } else {
            const ul = document.querySelector('.blue-team')
            ul.insertAdjacentHTML('beforeend', `<li class="flex flex-column">
            <div class="flex justify-start gap">
                <img class="sprite-champion" src="${fiddle(player)}" alt="">
                <div class="flex justify-between items-center gap">
                    <p>${player.summonerName}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <div class="KDA flex flex-column align-center">
                    <p>KDA: ${player.challenges.kda.toFixed(1)}</p>
                    <p>${player.kills}/${player.deaths}/${player.assists}</p>
                </div>
                <div class="damage-given flex flex-column align-center">
                    <p>Dano total causado:</p>
                    <p>${player.totalDamageDealtToChampions}</p>
                    <p>Dano total recebido:</p>
                    <p>${player.totalDamageTaken}</p>
                </div>
                <div class="wards-placed flex flex-column align-center">
                    <p>Wards:</p>
                    <p>${player.wardsPlaced}</p>
                    <p>Wards de controle:</p>
                    <p>${player.visionWardsBoughtInGame}</p>
                </div>
                <div class="farm flex flex-column align-center">
                    <p>Farm:</p>
                    <p>${player.totalMinionsKilled+Math.round(player.challenges.alliedJungleMonsterKills)+Math.round(player.challenges.enemyJungleMonsterKills)+(Math.round(player.challenges.scuttleCrabKills)*4)}</p>
                    <p>Farm nos primeiros 10 minutos:</p>
                    <p>${Math.round(player.challenges.jungleCsBefore10Minutes)+Math.round(player.challenges.laneMinionsFirst10Minutes)}</p>
                </div>
            </div>
        </li>`)
        }
    });
    const red = document.querySelector('.red-team')
    const blue = document.querySelector('.blue-team')
    if (match.info.teams[0].win == true) {
        const h2red = red.querySelector('h2')
        const h2blue = blue.querySelector('h2')
        h2red.innerText = `Time Vermelho - Vitória`
        h2blue.innerText = `Time Vermelho - Derrota`
    } else {
        const h2red = red.querySelector('h2')
        const h2blue = blue.querySelector('h2')
        h2red.innerText = `Time Vermelho - Derrota`
        h2blue.innerText = `Time Vermelho - Vitória`
    }

    function fiddle(player) {
        if(player.championName !== "FiddleSticks") {
            return `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${player.championName}.png`
        } else {
            return "https://opgg-static.akamaized.net/meta/images/lol/champion/Fiddlesticks.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160&v=1667898724801"
        }
    }
}


const buttonHome = document.querySelector('.home')
buttonHome.addEventListener('click', () => {
    window.location.href = '../../../index.html'
})

await renderPlayers()