import { fetch } from "../../../tska/polyfill/Fetch";

/**
 * ============================================
 * ChatTriggers Module Stats Viewer
 * ============================================
 *
 * 🔧 Command Usage:
 *   /module <moduleName>  → Fetches and displays stats for the specified module
 *
 * 💡 Purpose:
 * Queries the ChatTriggers API and shows key info.
 */

register('command', function(name) {
    if (!name) {
        return ChatLib.chat("&cPlease specify the module you want to see stats on!");
    }

    var url = "https://chattriggers.com/api/modules/" + name;

    fetch(url, { json: true })
        .then(function(json) {
            var msg = new Message(
                "&9&m------------------------------&r\n" +
                "&6&lModule Stats for &b" + json.name + "&6:\n\n" +
                "&e▶ &bName: &r" + json.name + "\n" +
                "&e▶ &bDownloads: &r" + json.downloads.toLocaleString() + "\n" +
                "&e▶ &bAuthor: &r&5[" + (json.owner.rank ? json.owner.rank.toUpperCase() : "USER") + "]&b " + json.owner.name + "\n" +
                "&e▶ &bLatest Version: &r" + (json.releases && json.releases[0] ? json.releases[0].releaseVersion : "N/A") + "\n" +
                "&e▶ &bCompatible ChatTriggers Version: &r" + (json.releases && json.releases[0] ? json.releases[0].modVersion : "N/A") + "\n\n" +
                "&eTags: &r" + (json.tags ? json.tags.map(function(tag){ return "&b" + tag; }).join(", ") : "") + "\n" +
                "&9&m------------------------------&r"
            );

            ChatLib.chat(msg);
        })
        .catch(function(err) {
            ChatLib.chat(new TextComponent("&cError fetching module stats! Hover for details.")
                .setHover("show_text", err ? err.toString() : "Unknown error"));
        });
})
.setName("syntramodulestats")
.setAliases(["syntramodstats", "synmustats", "synstats"]);