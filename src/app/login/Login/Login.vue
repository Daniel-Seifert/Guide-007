<template>
  <div>
    <v-card>
      <v-card-title>
        <h3>ZPA-Login</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Username" prepend-icon="account_circle"/>
          <v-text-field label="Password" type="Password" prepend-icon="lock" append-icon="visibility_off"/>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="white--text" color="red darken-1">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { IState } from '@/app/state';

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
