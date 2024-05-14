function main() {
    const blockUrl = "https://api.kakikou.app/mangalaw/block"
      , blocklistUrl = "ここにURLをドロップ";
    let blockedSites = [];
    async function updateBlocklist() {
        try {
            const t = await fetch(blocklistUrl)
              , l = await t.json();
            blockedSites = l;
            console.log("updateOK")
        } catch (t) {
            console.error("Error fetching blocklist:", t)
        }
    }
    setInterval(updateBlocklist, 6e4),
    chrome.webNavigation.onBeforeNavigate.addListener((function(t) {
        const l = new URL(t.url).hostname;
        blockedSites.some((t=>l.endsWith(t))) && (console.log("blocksite"),
        chrome.tabs.update({
            url: blockUrl
        }))
    }
    ), {
        urls: ["<all_urls>"]
    }),
    updateBlocklist();
}
main()
