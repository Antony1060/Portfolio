<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs11 sm4 md3 xl2>
        <v-fade-transition>
          <v-card class="pa-2 mt-12 green lighten-2" v-if="success.trim() !== ''">
            <v-icon>verified_user</v-icon>
            {{ success }}
          </v-card>
        </v-fade-transition>
        <v-fade-transition>
          <v-card class="pa-2 mt-12 red lighten-2" v-if="error.trim() !== ''">
            <v-icon>error</v-icon>
            {{ error }}
          </v-card>
        </v-fade-transition>
        <v-form class="mx-2" :class="(error || error.trim() === '') && (success || success.trim() === '') ? 'my-6' : 'my-12'"  @submit.prevent="login()">
          <v-text-field
                  v-model="identity"
                  label="Username/E-Mail"
          ></v-text-field>
          <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
          ></v-text-field>
          <v-row justify="center">
            <v-btn tile :loading="false" class="blue darken-2 white--text" @click.prevent="login()" type="submit">Login</v-btn>
          </v-row>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import util from '../util/util'

export default {
  name: "Login",
  data: () => ({
    identity: "",
    password: "",
    error: "",
    success: ""
  }),
  methods: {
    login() {
      util.request("/auth/login", { method: "POST" }, {
        identity: this.identity,
        password: this.password
      }).then(response => {
        if(!response.data.token) {
          this.$store.commit("pushAlert", { text: "Something went wrong.", type: "error" })
          return
        }

        this.$store.commit("pushAlert", { text: "Logged in. Redirecting....", type: "success" })
        localStorage.setItem("jwtToken", response.data.token)
        this.$router.push({ name: "AdminPanel" })
      }).catch((error) => {
        this.$store.commit("pushAlert", { text: `Error: ${error}`, type: "error" })
      })
    }
  }
}
</script>