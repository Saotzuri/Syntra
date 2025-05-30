/**
 * ============================================
 * Chat Emote Replacer
 * ============================================
 *
 * 🔧 Usage:
 *   - Automatically replaces predefined emote codes with emojis in chat messages.
 *   - Works on normal chat messages and allows certain commands to bypass replacement.
 *   - Use `/synemotelist` to see all emotes and their codes in chat.
 *
 * 💡 Purpose:
 *   Simplifies chat by converting shortcodes like ":skull:" into emojis like "☠".
 *   Does not rely on any external settings or rank checks.
 */

const emoteList = [
    { code: ':skull:', emoji: '☠' },
    { code: ':chair:', emoji: '♿' },

    { code: '<3', emoji: '❤' },
    { code: 'o/', emoji: '( ﾟ◡ﾟ)/' },
    { code: ':star:', emoji: '✮' },
    { code: ':yes:', emoji: '✔' },
    { code: ':no:', emoji: '✖' },
    { code: ':java:', emoji: '☕' },
    { code: ':arrow:', emoji: '➜' },
    { code: ':shrug:', emoji: '¯\\_(\u30c4)_/¯' },
    { code: ':tableflip:', emoji: '(╯°□°）╯︵ ┻━┻' },
    { code: ':totem:', emoji: '☉_☉' },
    { code: ':typing:', emoji: '✎...' },
    { code: ':maths:', emoji: '√(π+x)=L' },
    { code: ':snail:', emoji: "@'-'" },
    { code: ':thinking:', emoji: '(0.o?)' },
    { code: ':gimme:', emoji: '༼つ◕_◕༽つ' },
    { code: ':wizard:', emoji: "( '-' )⊃━☆ﾟ.*･｡ﾟ" },
    { code: ':pvp:', emoji: '⚔' },
    { code: ':peace:', emoji: '✌' },
    { code: ':puffer:', emoji: "<('O')>" },

    { code: 'h/', emoji: 'ヽ(^◇^*)/' },
    { code: ':sloth:', emoji: '(・⊝・)' },
    { code: ':dog:', emoji: '(ᵔᴥᵔ)' },
    { code: ':dj:', emoji: 'ヽ(⌐■_■)ノ♬' },
    { code: ':yey:', emoji: 'ヽ (◕◡◕) ﾉ' },
    { code: ':snow:', emoji: '☃' },
    { code: ':dab:', emoji: '<o/' },
    { code: ':cat:', emoji: '= ＾● ⋏ ●＾ =' },
    { code: ':cute:', emoji: '(✿◠‿◠)' }
];

let replaceWords = [];
let replacements = [];

register("worldLoad", () => {
    replaceWords = emoteList.map(e => e.code);
    replacements = emoteList.map(e => e.emoji);
});

register('messageSent', (message, event) => {
    // Only process messages that are not commands,
    // or commands in the allowed list
    if (message.startsWith('/') && !['/pc', '/ac', '/gc', '/msg', '/w', '/r'].some(cmd => message.startsWith(cmd))) return;

    let replaced = false;
    let words = message.split(" ");

    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < replacements.length; j++) {
            if (replaceWords[j] === words[i]) {
                words[i] = replacements[j];
                replaced = true;
            }
        }
    }

    if (!replaced) return;

    cancel(event);
    ChatLib.say(words.join(" "));
});

register("command", () => {
    ChatLib.chat("§6=== §lAvailable Emotes §6===");
    
    let emotesText = emoteList
        .filter(e => e && e.code && e.emoji)
        .map(e => `§b${e.code} §7→ §f${e.emoji}`)
        .join("\n");

    ChatLib.chat(emotesText);
}).setName("synemotelist");
