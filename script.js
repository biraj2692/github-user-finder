let searchBtn = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchInput");
let loadingCard = document.getElementById("loading-card");


function getProfileData(username) {
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then(raw => {
        if (!raw.ok) {
            throw new Error("No profile found");
        }
        return raw.json();
    })
}

function getReposData(username) {
    const url = `https://api.github.com/users/${username}/repos?sort=updated`;
    return fetch(url).then(raw => {
        if (!raw.ok) {
            throw new Error("No repos found");
        }
        return raw.json();
    })
}

function displayProfileData(data) {
    let template = `<div id="profile-card"
            class="glass-panel rounded-2xl p-6 md:p-8 transform transition-all duration-300 hover:scale-[1.02] max-w-md mx-auto">
            <div class="flex flex-col items-center text-center">
                <!-- Avatar with Ring -->
                <div class="relative mb-6 group cursor-pointer">
                    <div
                        class="absolute -inset-1 bg-gradient-to-tr from-primary to-secondary rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500">
                    </div>
                    <img id="avatar" src=${data.avatar_url} alt="Profile"
                        class="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-cardBg shadow-2xl object-cover">
                    <div class="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-4 border-cardBg"
                        title="Available for hire"></div>
                </div>

                <!-- Name & Username -->
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-1" id="name">${data.name}</h2>
                <a href="#" id="username"
                    class="text-primary hover:text-secondary transition-colors font-medium mb-4 text-base md:text-lg">@${data.login}</a>

                <!-- Bio -->
                <p id="bio" class="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-xs">
                    ${data.bio}
                </p>

                <!-- Stats Grid -->
                <div
                    class="grid grid-cols-3 gap-2 md:gap-4 w-full mb-6 bg-slate-800/50 rounded-xl p-3 md:p-4 border border-slate-700/50">
                    <div class="text-center group cursor-default">
                        <div id="repos"
                            class="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">${data.public_repos}
                        </div>
                        <div class="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">Repos
                        </div>
                    </div>
                    <div class="text-center group cursor-default">
                        <div id="followers"
                            class="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">${data.followers}
                        </div>
                        <div class="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            Followers</div>
                    </div>
                    <div class="text-center group cursor-default">
                        <div id="following"
                            class="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors"> ${data.following}
                        </div>
                        <div class="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider font-semibold">
                            Following</div>
                    </div>
                </div>

                <!-- Details List -->
                <div class="w-full space-y-3 text-sm text-slate-400 mb-6 md:text-base">
                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <svg class="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span id="location">${data.location}</span>
                    </div>
                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <svg class="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span id="hireable">${data.hireable ? "Available for hire" : "Not available for hire"}</span>
                    </div>
                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <svg class="w-4 h-4 text-secondary shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1">
                            </path>
                        </svg>
                        <a href="${data.blog}" target="_blank" id="blog"
                            class="hover:text-white transition-colors truncate max-w-[200px]">${data.blog}</a>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementById("result-card").innerHTML = template;
}

const reposContainer = document.getElementById("repos-list");

function displayReposData(repos) {
    reposContainer.innerHTML = '';
    // Take top 5 repos
    const topRepos = repos.slice(0, 5);
    // Add a title if there are repos
    if (topRepos.length > 0) {
        reposContainer.innerHTML = `<h3 class="col-span-full text-xl font-bold text-white mb-2 pl-1">Latest Repositories</h3>`;
    }

    topRepos.forEach(repo => {
        const repoCard = `
        
            <div class="glass-panel rounded-xl p-5 hover:bg-slate-800/50 transition-all hover:translate-x-1 duration-300 border border-slate-700/50 group">
                <div class="flex justify-between items-start mb-2">
                    <a href="${repo.html_url}" target="_blank" class="font-bold text-lg text-primary group-hover:text-secondary transition-colors truncate pr-4 flex-1">
                        ${repo.name}
                    </a>
                    <span class="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 border border-slate-700 uppercase tracking-wide font-medium flex-shrink-0">
                        ${repo.visibility}
                    </span>
                </div>
                
                <p class="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed h-10">
                    ${repo.description || 'No description available for this repository.'}
                </p>
                
                <div class="flex items-center gap-4 text-xs text-slate-500 font-medium">
                    ${repo.language ? `
                    <div class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(168,85,247,0.4)]"></span>
                        <span>${repo.language}</span>
                    </div>` : ''}
                    
                    <div class="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>${repo.stargazers_count}</span>
                    </div>
                    
                    <div class="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                        <span>${repo.forks_count}</span>
                    </div>

                    <div class="ml-auto text-[10px] text-slate-600">
                        ${new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
            </div>
        `;
        reposContainer.innerHTML += repoCard;
    });
}

searchBtn.addEventListener("click", () => {
    let username = searchInput.value;
    if (username === "") {
        alert("Please enter a username");
        return;
    }
    loadingCard.classList.remove("hidden");
    document.getElementById("result-card").innerHTML = ""; // Clear previous results
    reposContainer.innerHTML = ""; // Clear previous repos

    getProfileData(username).then(data => {
        displayProfileData(data);
    }).catch(err => {
        loadingCard.classList.add("hidden");
        alert(err.message);
    });

    getReposData(username).then(data => {
        displayReposData(data);
        loadingCard.classList.add("hidden");
    }).catch(err => {
        // Just log repo errors, don't hide everything if profile loaded
        console.error(err);
    });

    searchInput.value = "";
});
