import echo from "@/other/terminalControl/commands/echo";
import clear from "@/other/terminalControl/commands/clear";
import whoami from "./commands/whoami";
import ls from "./commands/ls";
import sudo from "./commands/sudo";
import exit from "./commands/exit";
import rm from "./commands/rm";
import cd from "./commands/cd";
import flip from "./commands/flip";
import invert from "./commands/invert";

export default class CommandControl {

    constructor() {
        this.commands = new Map();
        this.addCommand("echo", echo);
        this.addCommand("clear", clear);
        this.addCommand("whoami", whoami);
        this.addCommand("ls", ls);
        this.addCommand("exit", exit);
        this.addCommand("sudo", sudo);
        this.addCommand("rm", rm);
        this.addCommand("cd", cd);
        this.addCommand("flip", flip);
        this.addCommand("invert", invert)
    }

    addCommand(trigger, handler, aliases = []) {
        this.commands.set(trigger, handler);
        for(const alias of aliases) this.commands.set(alias, handler);
    }

    handleCommand(context) {
        if(!this.commands.has(context.command)) return `ansh: ${context.command}: command not found`;
        return this.commands.get(context.command)(context)
    }

}