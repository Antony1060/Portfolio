/**
 *
 * @typedef {Object} ExecutionOrderEntry
 * @property {String} trigger
 * @property {String} response
 * @property {Boolean} display
 */

import color from "../color"

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
    if(context.args.length > 0) {
        const errors = []
        for(const arg of context.args) {
            errors.push(`ls: cannot access '${arg}': No such file or directory`)
        }
        return errors.join("\n")
    }
    return color.blueBright + ". .." + color.reset
}