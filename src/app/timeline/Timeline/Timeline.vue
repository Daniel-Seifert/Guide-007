<template>
  <v-timeline>
    <v-timeline-item v-for="(slot, i) in getEvents" :key="i" :color="slot.color" small>
      <template v-slot:opposite>
        <span :class="`headline font-weight-bold ${slot.color}--text`">
          {{slot.weekday}} {{slot.duration.from | date}} {{slot.duration.from | time}}-{{slot.duration.to | time}}
        </span>
        <br />
        <span :class="`font-weight-bold ${slot.color}--text`" v-text="`${slot.rooms}`"></span>
      </template>
      <div class="py-5">
        <h2 :class="`headline font-weight-light mb-4 ${slot.color}--text`">{{ slot.modules.join(', ') }}</h2>
        <div>
          <h3 :class="`font-weight-light mb-4 ${slot.color}--text`">{{ slot.descriptions.join(', ') }}</h3>
          <h4 :class="`font-weight-light mb-4 ${slot.color}--text`">{{ slot.teachers.join(', ') }}</h4>
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
  import { mapActions, mapGetters } from 'vuex';

export default {
  metaInfo: {
    title: 'Guide-007',
  },
  data: () => ({}),
  computed: {
    ...mapGetters('event', ['getEvents']),
  },
  methods: {
    ...mapActions({select: 'event/select'}),
  },
  beforeCreate(): void {
    this.$store.dispatch('event/select', new Date('2020-03-25T00:00:00'))
  }
};
</script>
