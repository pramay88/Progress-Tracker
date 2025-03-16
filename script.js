async function fetchProgress() {
    let progressDiv = document.getElementById("progress");
    progressDiv.innerHTML = "";
    
    const platforms = [
        { name: "LeetCode", id: document.getElementById("leetcodeId").value, api: "https://leetcode-stats-api.herokuapp.com/" },
        { name: "GitHub", id: document.getElementById("githubId").value, api: "https://api.github.com/users/" },
        { name: "CodeForces", id: document.getElementById("codeforcesId").value, api: "https://codeforces.com/api/user.info?handles=" }
    ];
    
    for (const platform of platforms) {
        if (platform.id) {
            let card = document.createElement("div");
            card.className = "card mt-3";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${platform.name}</h5>
                    <p class="card-text" id="${platform.name}-status">Fetching data...</p>
                </div>
            `;
            progressDiv.appendChild(card);
            
            try {
                let response = await fetch(platform.api + platform.id);
                let data = await response.json();
                
                if (platform.name === "GitHub") {
                    document.getElementById(`${platform.name}-status`).innerHTML = `Public Repos: ${data.public_repos} <br> Followers: ${data.followers}`;
                } else if (platform.name === "CodeForces") {
                    document.getElementById(`${platform.name}-status`).innerHTML = `Max Rating: ${data.result[0].maxRating} <br> Rank: ${data.result[0].rank}`;
                } else if (platform.name === "LeetCode") {
                    document.getElementById(`${platform.name}-status`).innerHTML = `Total Problems Solved: ${data.totalSolved} <br> Ranking: ${data.ranking}`;
                }
            } catch (error) {
                document.getElementById(`${platform.name}-status`).innerHTML = "Error fetching data!";
            }
        }
    }
    
    // Ext Profile Links
    const manualPlatforms = [
        { name: "LinkedIn", id: document.getElementById("linkedinId").value, url: "https://www.linkedin.com/in/" },
        { name: "GeeksforGeeks", id: document.getElementById("gfgId").value, url: "https://auth.geeksforgeeks.org/user/" },
        { name: "CodeChef", id: document.getElementById("codechefId").value, url: "https://www.codechef.com/users/" }
    ];
    
    for (const platform of manualPlatforms) {
        if (platform.id) {
            let card = document.createElement("div");
            card.className = "card mt-3";
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${platform.name}</h5>
                    <p class="card-text">
                        <a href="${platform.url}${platform.id}" target="_blank">View Profile</a>
                    </p>
                </div>
            `;
            progressDiv.appendChild(card);
        }
    }
}