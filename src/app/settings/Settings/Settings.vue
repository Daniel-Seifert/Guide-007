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
                      :value="dark"
                      primary
                      label="Dark"
                      @change="setDarkmode(!dark)"
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
import { mapState, mapActions } from 'vuex';
import { IState } from '@/app/state';

export default {
  metaInfo: {
    title: 'Guide-007',
  },
  data: () => ({}),
  computed: {
    ...mapState({
      dark: (state: IState) =>
        (state.app.config && state.app.config.features && state.app.config.features.dark) || false,
    }),
  },
  methods: {
    ...mapActions('app', ['setDarkmode']),
  }
};
</script>
