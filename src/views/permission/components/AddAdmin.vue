<template>
  <a-modal
    title="后台角色"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :form="menuForm"
    >
      <a-form-item
        label="用户名"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="用户名" v-model="formParams.username"/>
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input type="password" placeholder="密码" v-model="formParams.password"/>
      </a-form-item>
      <a-form-item
        label="是否启用"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-radio-group name="stauts" v-model="formParams.status" :default-value="1">
          <a-radio :value="1">
            是
          </a-radio>
          <a-radio :value="0">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="是否是超级管理员"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-radio-group name="is_root" v-model="formParams.is_root" :default-value="0">
          <a-radio :value="1">
            是
          </a-radio>
          <a-radio :value="0">
            否
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="排序" v-model="formParams.listorder"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { createAdmin, updateAdmin } from '@/api/permission';
import { showSuccess, showError, showErrors } from '@/utils/showMsg';

export default {
  name: 'AddAdmin',
  inject: ['reload'],
  props: {
    addVisible: {
      type: Boolean,
      default: false,
    },
    formParams: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      menuForm: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      visible: false,
      roles: [],
    };
  },
  mounted() {
  },
  methods: {
    handleOk() {
      if (this.formParams.id === undefined) {
        this.toCreate();
      }
      if (this.formParams.id > 0) {
        this.toUpdate();
      }
    },
    handleCancel() {
      this.$emit('on-change', this.visible);
    },
    toCreate() {
      createAdmin(this.formParams).then((res) => {
        if (res.data.code === 0) {
          showSuccess(res.data.message);
          this.reload();
        } else if (res.data.code === 414) {
          showErrors(res.data.result.errors);
        } else {
          showError(res.data.message);
        }
      });
    },
    toUpdate() {
      updateAdmin(this.formParams).then((res) => {
        if (res.data.code === 0) {
          showSuccess(res.data.message);
          this.reload();
        } else if (res.data.code === 414) {
          showErrors(res.data.result.errors);
        } else {
          showError(res.data.message);
        }
      });
    },
  },
  watch: {
    addVisible(v) {
      this.visible = v;
    },
  },
};
</script>
<style scoped>
</style>
