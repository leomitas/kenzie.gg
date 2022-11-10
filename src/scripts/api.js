export const key = "RGAPI-89de817e-a630-47e0-b584-b0db16e7b4f8"

const infosBaseURL = "https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
}


export async function getInfosAccount(accountID) {
    const response = await fetch(infosBaseURL + `${accountID}` + `?api_key=${key}`, options)
        .then((res) => res.json())
        .then((res) => res)
        .catch((err) => console.log(err))
    return response
}

export async function filter(num) {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/12.21.1/data/en_US/champion.json`)
    .then(response => {
        return response.json()
    })
    .then(response => {
        return response
    })
    const champion = Object.keys(response.data)
    const filtered = num.map((num) => {
        return champion.find((champion) => {
            if(response.data[champion].key == num) {
                return response.data[champion].id
            }
        })
    })
    return filtered
}

export async function summonerMasteries(id){
    console.log(key)
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}/top?api_key=${key}`, options)
        .then(response => {
            return response.json()
        })
        .then(response => {
            console.log(response)
            return response
        })
        .catch(err => console.log(err))
    return response
}