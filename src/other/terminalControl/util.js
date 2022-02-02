import AnsiUp from "ansi_up";

const ansi = new AnsiUp();

export default {
    formatTerminalText(text) {
        return ansi.ansi_to_html(text)
                .replace(/\n/g, "<br>")
                .replace(/\[.+\]\(.+\)/g, (substring) => {
                    const name = substring.match(/\[.+\]/g)[0].slice(1, -1);
                    const href = substring.match(/\(.+\)/g)[0].slice(1, -1);
                    return `<a href="${href}" target="_blank" class="terminal-injected-link">${name}</a>`
                });
    }
}