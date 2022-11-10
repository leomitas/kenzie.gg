import { key } from "./api.js"

export async function leaderboard() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const response = await fetch(`https://br1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=${key}`, options)
    .then(response => {
        return response.json()
    })
    .then(response => {
        return response
    })
    .catch(err => console.log(err))
    return response
}