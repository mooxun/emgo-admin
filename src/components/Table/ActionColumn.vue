<template>
  <div>
    <slot></slot>
    <a-button type="primary" icon="edit" size="small" @click="handleEdit" class="mb-5 mr-5" v-if="edit">编辑</a-button>
    <a-button class="em-btn-error mb-5 mr-5" icon="delete" size="small" @click="handleDelete" v-if="del">删除</a-button>
  </div>
</template>
<script>
export default {
  name: 'ActionColumn',
  props: {
    record: Object,
    edit: {
      type: Boolean,
      default: false,
    },
    del: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleEdit() {
      this.$emit('on-edit', this.record);
    },
    handleDelete() {
      const that = this;
      this.$confirm({
        title: '提示',
        content: '确认要删除吗？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.$emit('on-del', that.record);
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
