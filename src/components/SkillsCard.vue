<template>
  <v-col xl="2" md="3" class="mt-2 mb-4 mx-4">
    <v-row justify="center">
      <v-hover v-slot:default="{ hover }">
        <v-card :elevation="hover ? 20 : 6" height="420px" width="240px" class="pa-6 pt-2">
          <div class="text--primary headline mt-6" align="center">
            <v-img :src="$props.image" height="160px" width="160px"></v-img>
            {{ $props.title }}
          </div>
          <div class="black--text font-weight-regular text-center mt-4" style="font-size: 1rem">
            {{ $props.description }}
            <v-btn outlined width="140px" class="mt-8" router :to="$props.route">More</v-btn>
          </div>
        </v-card>
      </v-hover>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "SkillsCard",
  props: {
    image: String,
    title: String,
    description: String,
    route: String
  }
}
</script>