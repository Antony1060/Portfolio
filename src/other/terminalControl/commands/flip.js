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
    if(context.args.length !== 1) {
        document.body.style["transform"] = document.body.style["transform"] === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
        return "";        
    }
    const deg = parseInt(context.args[0])
    if(isNaN(deg)) return "flip: unparsable argument"
    document.body.style["transform"] = `rotate(${deg}deg)`
    return ""
}