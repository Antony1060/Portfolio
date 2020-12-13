import echo from "@/other/terminalControl/commands/echo";
import clear from "@/other/terminalControl/commands/clear";

export default class CommandControl {

    constructor() {
        this.commands = new Map();
        this.addCommand("echo", echo);
        this.addCommand("clear", clear);
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