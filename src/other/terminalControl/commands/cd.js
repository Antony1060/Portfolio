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
     if(context.args.length === 0) return "";
     if(context.args.length > 1) return "cd: too many arguments"
     return `cd: ${context.args[0]}: No such file or directory`
 }