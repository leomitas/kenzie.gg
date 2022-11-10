import { key } from "./api.js"

export async function getIdsHistoric(ID){

    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${ID}/ids?start=0&count=10&api_key=${key}`, options)
    .then(response => response.json())
    .catch(err => console.log(err))
    return request
}

export async function getQueue(ID){
    const options ={
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const request = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${ID}/?start=0&api_key=${key}`, options)
    .then(response => response.json())
    .then(response => response)
    .catch(err => console.log(err))
    return request
}