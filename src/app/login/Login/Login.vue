<template>
    <div>
        <v-card max-width="400">
            <v-card-title class="justify-center">
                <v-img  src="/hmlogo.jpg"></v-img>
            </v-card-title>
            <v-card-text>
                <v-text-field label="Username" prepend-icon="account_circle" v-model="username"/>
                <v-text-field
                        label="Password"
                        type="Password"
                        prepend-icon="lock"
                        append-icon="visibility_off"
                        v-model="password"
                        @keydown.enter.prevent="doLogin"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn class="white--text" color="red darken-1" v-on:click="doLogin()">Login</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
  import { mapActions } from 'vuex';
  import VueImage from '@components/VueImage/VueImage.vue';

  export default {
    components: { VueImage },
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
