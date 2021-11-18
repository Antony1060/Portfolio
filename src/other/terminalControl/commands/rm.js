import { shuffle } from 'lodash'

/**
 *
 * @typedef {Object} ExecutionOrderEntry
 * @property {String} trigger
 * @property {String} response
 * @property {Boolean} display
 */

/**
 *
 * @typedef {Object} CommandContext
 * @property {String} command
 * @property {Array<string>} args
 * @property {Array<ExecutionOrderEntry>} executionOrder
 */

/**
 *
 * @param {CommandContext} context
 * @returns {String | Array}
 */
 export default function (context) {
    const full = context.args.join(" ");
    if(!["-rf --no-preserve-root /", "-rf /*"].includes(full)) return "rm: unimplemented";
    return ["Death", () => {
        const del = [];
        function dfs(elem) {
            for(const child of shuffle(Array.from(elem.childNodes))) {
                dfs(child);
                del.push(child);
            }
        } 
        
        dfs(document.body);
        setInterval(() => {
            del.shift().remove();
        }, 20)
    }]
}