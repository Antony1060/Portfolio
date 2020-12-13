import AnsiUp from "ansi_up";

const ansi = new AnsiUp();

export default {
    formatTerminalText(text) {
        return ansi.ansi_to_html(text).replace(/\n/g, "<br>");
    }
}