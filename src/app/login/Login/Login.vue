<template>
    <div>
        <v-card max-width="400">
            <v-card-title class="justify-center">
                <h3>ZPA-Login</h3>ADD HM LOGO HERE
            </v-card-title>
            <v-card-text>
                <v-text-field label="Username" prepend-icon="account_circle" v-model="username"/>
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
  import { mapActions } from 'vuex';

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
    methods: {
      ...mapActions('auth', ['login']),
      async doLogin() {
        const formData = {
          username: this.username,
          password: this.password,
        };
        try {
          await this.login(formData);
          await this.$router.push({ name: 'home' });
        } catch (err) {
          console.log(err);
        }
      },
    },
  };
</script>
