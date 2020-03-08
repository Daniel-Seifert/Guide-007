<template>
    <v-container fluid>
        <v-btn @click="getPersons">GET PERSON</v-btn>
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
  import { mapActions, mapGetters } from 'vuex';

  export default {
    metaInfo: {
      title: 'Guide-007',
    },
    data: () => ({}),
    computed: {
      ...mapGetters('app', ['isDarkmode']),
    },
    methods: {
      ...mapActions('app', ['setDarkmode']),
      getPersons(): void {
        const htmlData: string = '<div class="contact-person-list">' +
          '<img src="https://w3-mediapool.hm.edu/mediapool/media/fk07/fk07_lokal/diefakultt_4/ansprechpartner_2/professoren_1/wallentowitz/Stefan_Wallentowitz_ContactBildKlein.jpg" alt="Prof. Dr. Stefan Wallentowitz" />' +
          '<div class="contact-person-name">Prof. Dr. Stefan Wallentowitz<br />Raum: R 3.030</div>' +
          '<div class="contact-person-contact">Tel.: 089 1265-3739<br />Fax: 089 1265-3780<br /><a href="mailto:" rel="ude/mh//ztiwotnellaw/nafets" class="emailLink">E-Mail &gt;</a><br />' +
          '</div><div class="contact-person-faculty"><a href="https://www.cs.hm.edu"><img src="https://w3-mediapool.hm.edu/mediapool/media/_technik/img/_technik_1/icn_fk07.jpg" alt="Fakult&auml;t 07" /></a><br/></div><a href="https://www.cs.hm.edu/die_fakultaet/ansprechpartner/professoren/wallentowitz/index.de.html" class="link-profile">Profil &gt;</a></div>';
        const regexGroup: RegExp = /<div\s+class="contact-person-list">(.*?)<img\s+src="(.*?)".*?<\/div>/g;
        // all img tags : <img\s+src="(.*?)".*?\/>
        // first img tags : <div\s+class="contact-person-list">(.*?)<img\s+src="(.*?)".*?<\/div>
        let matches = htmlData.match(regexGroup);
        // console.log("______________________________")
        console.log(matches[1]);
        this.$store.dispatch('person/setPersons');
      },
    },
  };
</script>
