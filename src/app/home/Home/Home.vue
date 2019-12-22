<template>
  <v-timeline>
    <v-timeline-item v-for="(slot, i) in slots" :key="i" :color="slot.color" small>
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${slot.color}--text`"
          v-text="`${slot.starttime}-${slot.endtime}`"
        ></span>
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
import { mapState } from 'vuex';
import { IState } from '@/app/state';

export default {
  metaInfo: {
    title: 'Guide-007',
  },
  data: () => ({
    slots: [
      {
        color: 'cyan',
        endtime: '15:00',
        starttime: '13:30',
        date: '2019-11-26',
        weekday: 'Di',
        rooms: ['R3.019', 'R3.018'],
        teachers: ['Socher, G.'],
        descriptions: ['Praktikum, 1. Teilgruppe'],
        modules: ['Computergrafik und Bildverarbeitung'],
      },
      {
        color: 'green',
        endtime: '11:30',
        starttime: '10:00',
        date: '2019-11-26',
        weekday: 'Di',
        rooms: ['R1.007'],
        teachers: ['Socher, G.'],
        descriptions: ['Vorlesung'],
        modules: ['Computergrafik und Bildverarbeitung'],
      },
      {
        color: 'blue',
        endtime: '13:15',
        starttime: '11:45',
        date: '2019-11-26',
        weekday: 'Di',
        rooms: ['R1.010A'],
        teachers: ['Braun, O.'],
        descriptions: ['Praktikum, 1. Teilgruppe Praktikum'],
        modules: ['Verteilte Softwaresysteme'],
      },
    ],
  }),
  computed: {
    ...mapState({
      disableParticles: (state: IState) =>
        (state.app.config && state.app.config.features && state.app.config.features.disableParticles) || false,
    }),
  },
};
</script>
