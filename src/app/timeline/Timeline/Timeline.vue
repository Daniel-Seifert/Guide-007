<template>
  <div>
    <!-- Alerting -->
    <v-alert v-if="error" prominent type="error">
      <v-row align="center">
        <v-col class="grow">{{error.message}}</v-col>
        <v-col class="shrink">
          <v-btn @click="logout">Login again</v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <!-- Core Timeline -->
    <v-timeline>
      <v-timeline-item v-for="(slot, i) in events" :key="i" large>
        <template v-slot:icon>
          <v-avatar>
            <v-img src="http://i.pravatar.cc/64" />
          </v-avatar>
        </template>
        <template v-slot:opposite>
          <span :class="`headline font-weight-bold ${slot.color}--text`">
            {{slot.weekday}} {{slot.duration.from | date}} {{slot.duration.from | time}}-{{slot.duration.to | time}}
          </span>
          <br />
          <span :class="`font-weight-bold ${slot.color}--text`" v-text="`${slot.rooms}`"></span>
        </template>
        <v-card class="elevation-2">
          <v-card-title class="headline">{{ slot.modules.join(', ') }}</v-card-title>
          <v-card-text>
            <h3 :class="`font-weight-light mb-4 ${slot.color}--text`">{{ slot.descriptions.join(', ') }}</h3>
            <h4 :class="`font-weight-light mb-4 ${slot.color}--text`">{{ slot.teachers.join(', ') }}</h4>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <!-- Progress spinner -->
    <v-progress-circular
           v-if="loading"
           :size="70"
           :width="7"
           color="red"
           indeterminate
   ></v-progress-circular>
  </div>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';

export default {
  metaInfo: {
    title: 'Guide-007',
  },
  data: () => ({
    loading: true,
    error: null,
  }),
  computed: {
    ...mapGetters('event', ['getEvents']),
    events: function() {
      return this.getEvents
    }
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' }),
  },
  async beforeCreate() {
    try {
      await this.$store.dispatch('event/select', new Date('2020-03-25T00:00:00'))
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  }
};
</script>
