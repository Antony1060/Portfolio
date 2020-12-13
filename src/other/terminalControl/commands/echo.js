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
    return context.args.join(" ");
}