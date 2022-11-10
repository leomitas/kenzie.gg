import {renderStack} from "../../scripts/renderMatches.js"

function toHome(){
    const homeButton = document.querySelector(".home");

    homeButton.addEventListener("click", ()=>{
        localStorage.removeItem("id");
        window.location.href = "../../../index.html"
    })
}

toHome()
renderStack("Kashyn");