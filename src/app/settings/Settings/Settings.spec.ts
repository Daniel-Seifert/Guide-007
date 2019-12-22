import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import { i18n } from '@shared/plugins/i18n/i18n';
import Settings from './Settings.vue';
import Vuetify from 'vuetify';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Vuetify);

describe('Home.vue', () => {
  let vuetify: any;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  test('renders component', () => {
    const store = new Vuex.Store({
      state: {
        app: {
          config: {
            features: {
              disableParticles: false,
            },
          },
        },
      },
    });
    const wrapper = shallowMount(Settings, {
      store,
      localVue,
      i18n,
      vuetify,
    });
  });
});
