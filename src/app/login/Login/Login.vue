<template>
    <div>
        <v-card max-width="400">
            <v-card-title class="justify-center">
                <h3>ZPA-Login</h3>ADD HM LOGO HERE
            </v-card-title>
            <v-card-text>
                <v-text-field label="Username" prepend-icon="account_circle" v-model="username" />
                <v-text-field
                        label="Password"
                        type="Password"
                        prepend-icon="lock"
                        append-icon="visibility_off"
                        v-model="password"
                />
            </v-card-text>
            <v-card-actions>
                <v-btn class="white--text" color="red darken-1" v-on:click="doLogin()">Login</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
  export default {
    metaInfo: {
      title: 'Guide-007',
    },
    name: 'Login',
    data(): any {
      return {
        username: '',
        password: '',
      };
    },
  };
</script>
