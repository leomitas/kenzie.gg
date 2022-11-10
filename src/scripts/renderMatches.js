import { filter, summonerMasteries } from "./api.js";
import {getIdsHistoric, getQueue} from "./apiMatches.js"

export async function renderStack(){
    const userStack = localStorage.getItem("username");
    const user = JSON.parse(userStack);

    const userIcon = document.querySelector(".user_icon");
    userIcon.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/profileicon/${user.profileIconId}.png`

    const userName  = document.querySelector(".user_name");
    userName.innerHTML = user.name;

    const userLevel = document.querySelector(".user_level");
    userLevel.innerHTML = `Nível ${user.summonerLevel}` ;

    renderHistoric(user.puuid)
    renderMastery(user.id)
}

export async function renderMastery(id){
    const masteries = await summonerMasteries(id)
    console.log(await summonerMasteries(id))
    const masteryContainer = document.querySelector(".mastery-container");
    const filtered = await filter([masteries[0].championId, masteries[1].championId, masteries[2].championId]);
    const backGround = document.querySelector(".background-user-img");
    backGround.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${filtered[0]}_0.jpg`

    console.log(filtered)
    filtered.forEach(async (value, index) =>{
        const masteryView     = document.createElement("li");
        masteryView.classList.add("mastery");

        const championName    = document.createElement("p");
        championName.classList.add("champion_name")
        championName.innerText = value;

        const championMastery = document.createElement("p");
        championMastery.classList.add("champion_mastery");
        championMastery.innerText = `${masteries[index].championPoints}`

        const masteryProfile  = document.createElement("div");
        masteryProfile.classList.add("mastery-profile");

        const masterizedChamp = document.createElement("img");
        masterizedChamp.classList.add("masterized_champ")
        masterizedChamp.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${value}.png`
       
        masteryProfile.append(masterizedChamp);
        masteryView.append(championName, masteryProfile, championMastery);
        masteryContainer.append(masteryView); 
    })
}

export async function renderHistoric(puuid){
    const queueList = [...await getIdsHistoric(puuid)]

    
    queueList.forEach(async (queue) =>{  
        const actualQueue = await getQueue(queue);
        const players = actualQueue.info.participants;
        const matchList = document.getElementById("matchList");
       
        const match = document.createElement("li");
        match.classList.add("match");        
        match.classList.add("flex");        
        match.classList.add("align-center");       
        match.classList.add("justify-around");            

        const viewMatch = document.createElement("button");
        viewMatch.classList.add("view_match");
        viewMatch.innerText = "Visualizar";
        viewMatch.addEventListener("click", ()=>{
            localStorage.setItem("matchId", `${JSON.stringify(queue)}`)
            window.location.href = "../match/index.html"
        })

        const blueTeam =  document.createElement("ul") //TEAM 100
        blueTeam.classList.add("team-ul")
        blueTeam.classList.add("flex")
        blueTeam.classList.add("justify-around")
        blueTeam.classList.add("blue_team")

        const VS = document.createElement("p");
        VS.classList.add("VS");
        VS.innerText = "VS"

        const redTeam  =  document.createElement("ul") //TEAM 200
        redTeam.classList.add("team-ul");
        redTeam.classList.add("flex");
        redTeam.classList.add("justify-around");
        redTeam.classList.add("red_team");

        const typeOfMatch = document.createElement("p");
        typeOfMatch.classList.add("type_match");
        typeOfMatch.innerText = `${actualQueue.info.gameMode}`;

        const separator = document.createElement("div");
        separator.classList.add("button-container");

        players.forEach(async (player) =>{                
            const li  = document.createElement("li");
            li.classList.add("team-member");
            const img = document.createElement("img");
            img.classList.add("champ_img");
            if(player.championName !== "FiddleSticks") {
                img.src = `https://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/${player.championName}.png`
            } else {
                img.src = "https://opgg-static.akamaized.net/meta/images/lol/champion/Fiddlesticks.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160&v=1667898724801"
            }

            if(player.teamId === 100){
                li.append(img);
                blueTeam.append(li);
            } else{
                li.append(img);
                redTeam.append(li);
            }

            separator.append(typeOfMatch,viewMatch);
            match.append(separator, blueTeam, VS, redTeam);
            matchList.append( match);
        })
    })
}
