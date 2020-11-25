<template>
  <div>
    <a-tag color="#87d068" v-if="tagType">是</a-tag>
    <a-tag color="#f50" v-if="!tagType">否</a-tag>
  </div>
</template>
<script>
export default {
  name: 'TagBoole',
  props: ['tagValue'],
  computed: {
    tagType() {
      return Boolean(this.tagValue);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
