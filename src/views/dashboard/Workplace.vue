<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title"><em-icon type="icon-smile-o" class="mr15" />{{ timeFix }}，{{ user.name }}</div>
    </div>
  </page-view>
</template>
<script>
import { timeFix } from '@/utils/util';
import { mapGetters } from 'vuex';

import { PageView } from '@/layouts';

export default {
  name: 'Workplace',
  components: {
    PageView,
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    },
  },
  created() {
    this.user = this.userInfo;
    this.avatar = this.userInfo.avatar;
  },
  mounted() {
  },
  methods: {
    ...mapGetters(['nickname', 'welcome']),
  },
};
</script>
<style lang="scss" scoped>
</style>
