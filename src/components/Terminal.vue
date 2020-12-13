<template>
  <v-container class="blue lighten-2" fluid>
    <v-layout row justify-center>
      <v-flex xs12 lg8>
        <v-card class="pa-4 mt-8 mb-8 mx-6" style="font-family: monospace;" dark>
          <div id="terminal" @click.prevent="focusToTerminal()" @mouseenter="focusToTerminal()">
            <span v-for="(item, index) in executionOrder.filter(it => it.display)" :key="index">
              <span v-if="item.trigger">
                <span v-html="tConst.PROMPT"></span>
                <span class="white--text"> {{ item.trigger }}</span>
                <br>
              </span>
              <span v-if="typeof item.response === 'string'" class="white--text" v-html="item.response"></span>
              <br v-if="typeof item.response === 'string'">
            </span>
            <span id="terminalInputContainer">
              <span v-html="tConst.PROMPT"></span>
              <input @submit.prevent="handleCommand()" @keyup.enter="handleCommand()" @keyup.up="shiftCommand(true)" @keyup.down="shiftCommand(false)" class="white--text" v-model="command" type="text" id="terminalInput" :style="`width: calc(100% - ${tConst.PROMPT.length * 10 + 20}px)`">
              <br>
            </span>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import constants from "@/other/terminalControl/constants";
import color from "@/other/terminalControl/color";
import util from "@/other/terminalControl/util";
import CommandControl from "@/other/terminalControl/commandControl";

export default {
  name: "Teminal",
  data: () => ({
    tConst: constants,
    command: "",
    control: new CommandControl(),
    executionOrder: [
      {
        trigger: null,
        response: util.formatTerminalText(`
           ${color.yellowBright}Welcome to my website!${color.reset} here you can see my work and what I'm capable of. You can also ${color.bold.cyanBright}interact${color.reset} with this terminal :)
           ${color.bold.yellowBright}Warning: ${color.bold.white}This is still in the beta stage and may not work fully${color.reset}
        `),
        display: true
      }
    ],
    commandShift: {
      trigger: "",
      index: 0
    }
  }),
  methods: {
    handleCommand() {
      if(this.command.trim().length > 0) this.actCommand(this.control.handleCommand(this.buildContext()));
    },
    actCommand(resp) {
      const response = Array.isArray(resp) && resp.length > 0 ? resp[0] : resp;
      this.executionOrder.push({
        trigger: this.command,
        response: util.formatTerminalText(response),
        display: true
      });
      if(Array.isArray(resp) && resp.length > 1) resp[1]();
      this.command = "";
      this.commandShift = {
        trigger: "",
        index: 0
      }
    },
    buildContext() {
      const args = this.command.split(/ +/g);
      const command = args.shift().toLowerCase();

      return {
        command,
        args,
        executionOrder: this.executionOrder
      }
    },
    shiftCommand(up) {
      if(up) this.commandShift.index = Math.min(this.executionOrder.length - 1, this.commandShift.index + 1);
      else this.commandShift.index = Math.max(0, this.commandShift.index - 1);
      this.commandShift.trigger = this.commandShift.index <= 0 ? "" : this.executionOrder[this.executionOrder.length - this.commandShift.index].trigger;
      this.command = this.commandShift.trigger
    },
    focusToTerminal() {
      document.getElementById("terminalInput").focus();
    }
  }
}
</script>

<style>
#terminal {
  height: 500px;
  min-height: 500px;
  max-height: 500px;
  overflow-y: auto;
  border: none;
}
</style>