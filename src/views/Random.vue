<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm4 md2>
        <v-form class="mx-2">
          <v-text-field
                  v-model="min"
                  label="Min"
                  append-icon="add"
                  @click:append="incrementMin()"
                  prepend-inner-icon="remove"
                  @click:prepend-inner="decrementMin"
                  @input="handleChangeMin()"
          ></v-text-field>
          <v-text-field
                  v-model="max"
                  label="Max"
                  append-icon="add"
                  @click:append="incrementMax()"
                  prepend-inner-icon="remove"
                  @click:prepend-inner="decrementMax"
                  @input="handleChangeMax()"
          ></v-text-field>
          <v-select :items="baseItems" v-model="base"></v-select>
          <v-row justify="center">
            <v-btn tile :loading="loading" class="blue darken-2 white--text" @click="send()">Get</v-btn>
          </v-row>
          <v-row justify="center" class="mt-4">
            <p class="headline text-uppercase">{{ randNum }}</p>
          </v-row>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
      name: "Random",
      data: () => ({
          min: 0,
          max: 100,
          base: "10 - Decimal",
          randNum: null,
          baseItems: ["10 - Decimal", "2 - Binary", "8 - Octal", "16 - Hexadecimal"],
          loading: false
      }),
      methods: {
          send() {
              this.loading = true;
              axios({
                  url: "https://api.random.org/json-rpc/2/invoke",
                  method: "POST",
                  data: {
                      "jsonrpc": "2.0",
                      "method": "generateIntegers",
                      "params": {
                          "apiKey": "3a09bd1b-5abd-4118-88df-3e12937aa87a",
                          "n": 1,
                          "min": this.min,
                          "max": this.max,
                          "base": parseInt(this.base.substring(0, 2))
                      },
                      "id": 2
                  }
              }).then(response => {
                  this.randNum = response.data.result.random.data[0];
                  this.loading = false;
              })
          },
          incrementMin() {
              this.min++;
          },
          incrementMax() {
              this.max++;
          },
          decrementMin() {
              this.min--;
          },
          decrementMax() {
              this.max--;
          },
          handleChangeMin() {
              if (this.min.toString().match(/\D/g)) {
                  this.min = this.min.toString().replace(/\D/g, '');
                  this.min = parseInt(this.min);
                  if (isNaN(this.min)) this.min = 0;
              }
          },
          handleChangeMax() {
              if (this.max.toString().match(/\D/g)) {
                  this.max = this.max.toString().replace(/\D/g, '');
                  this.max = parseInt(this.max);
                  if (isNaN(this.max)) this.max = 0;
              }
          }
      }
  }
</script>