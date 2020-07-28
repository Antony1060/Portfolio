<template>
  <div>
    <v-list>
      <v-list-item @click="propObj.click" class="blue lighten-2">
        <v-list-item-icon>
          <v-icon>{{ propObj.menuIcon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            {{ propObj.closeTitle }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item-group class="mt-2">
        <v-list-item v-for="item in navItems" :key="item.text" :to="item.to" :disabled="item.disabled">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> 
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group class="mt-4">
        <v-list-item v-for="item in userNavItems" :key="item.text" :to="item.to" @click="() => { item.clickFunctionName ? functions[item.clickFunctionName]() : '' }" :disabled="item.disabled">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> 
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--<v-list-item>
          <v-list-item-icon>
            <v-icon>account_circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Accounts
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Log out
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "AdminNavList",
  props: ["propObj"],
  data: () => ({
    navItems: [
      {
        text: "System",
        disabled: false,
        to: "/admin/main",
        icon: "storage"
      },
      {
        text: "Media",
        disabled: false,
        to: "/admin/media/",
        icon: "perm_media"
      },
      {
        text: "Files",
        disabled: true,
        to: "/admin/files/",
        icon: "description"
      },
      {
        text: "Text",
        disabled: true,
        to: "/admin/text/",
        icon: "spellcheck"
      }
    ],
    userNavItems: [
      {
        text: "Accounts",
        disabled: true,
        to: "/admin/accounts",
        icon: "account_circle" 
      },
      {
        text: "Log out",
        disabled: false,
        clickFunctionName: "logout",
        icon: "exit_to_app"
      }
    ]
  }),
  computed: {
    functions() {
      let instance = this
      return {
        logout() {
          localStorage.removeItem("jwtToken");
          instance.$router.push({ name: "Login" });
        }
      }
    }
  }
}
</script>