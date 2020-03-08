<template>
  <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <span>Scheme</span>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      :value="isDarkmode"
                      primary
                      label="Dark"
                      @change="setDarkmode(!isDarkmode)"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script lang="ts">
import { mapState, mapActions, mapGetters } from 'vuex';
import { IState } from '@/app/state';

export default {
  metaInfo: {
    title: 'Guide-007',
  },
  data: () => ({}),
  computed: {
    ...mapGetters('app', ['isDarkmode'])
  },
  methods: {
    ...mapActions('app', ['setDarkmode']),
  },
  beforeCreate(): void {
    this.$store.dispatch('person/setPersons');
  }
};
</script>
