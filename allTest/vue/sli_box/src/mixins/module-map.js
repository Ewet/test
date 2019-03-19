import { mapState, mapActions, mapMutations } from 'vuex';
import modules from 'store/modules';

const getActions = (moduleName) => {
  const module = modules[moduleName];
  if (module) {
    return Object.keys(module.actions);
  }
  return [];
};

const getMutations = (moduleName) => {
  const module = modules[moduleName];
  if (module) {
    return Object.keys(module.mutations);
  }
  return [];
};

const getState = (moduleName) => {
  const module = modules[moduleName];
  if (module) {
    return Object.keys(module.state);
  }
  return [];
};

export default ({
  moduleName, state = [], action = [], mutation = []
}) => ({
  // destroyed () {
  //   this.$store.commit(moduleName + '/reset');
  // },
  beforeRouteLeave (to, from, next) {
    this.$store.commit(`${moduleName}/reset`);
    next();
  },
  methods: {
    ...mapActions(moduleName, getActions(moduleName)),
    ...mapMutations(moduleName, getMutations(moduleName))
  },
  computed: {
    ...mapState(moduleName, getState(moduleName))
  }
});
