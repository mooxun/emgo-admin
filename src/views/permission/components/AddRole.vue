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
        label="菜单名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="角色名称" v-model="formParams.name"/>
      </a-form-item>
      <a-form-item
        label="是否启用"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-switch :defaultChecked="formParams.status" v-model="formParams.status" />
      </a-form-item>
      <a-form-item
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="排序" v-model="formParams.listorder"/>
      </a-form-item>
      <a-form-item
        label="备注"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="备注" v-model="formParams.remark"/>
      </a-form-item>
      <a-form-item
        label="权限分配"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-tree
          checkable
          :defaultExpandAll="true"
          v-model="checkedMenus"
          @check="onCheck"
          :treeData="permissionMenus"
        >
        </a-tree>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { permissionMenuLists, createRole, updateRole } from '@/api/permission';
import { showSuccess, showError, showErrors } from '@/utils/showMsg';
import { getUnion } from '@/utils/tools';

export default {
  inject: ['reload'],
  name: 'AddRole',
  props: {
    addVisible: {
      type: Boolean,
      default: false,
    },
    formParams: {
      type: Object,
      default: {
        name: '',
        status: true,
        listorder: 0,
        remark: '',
        menus: [],
        frontend_extend: {
          checked: [],
          halfChecked: [],
        },
      },
    },
    menus: {
      type: [Array, Object],
      default: [],
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
      permissionMenus: [],
      checkedMenus: [],
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getPermissionMenus();
    });
  },
  methods: {
    async getPermissionMenus() {
      const res = await permissionMenuLists();
      this.permissionMenus = res.data.result.lists;
      this.getMenuTreeNode(this.permissionMenus);
    },
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
    getMenuTreeNode(menu) {
      menu.forEach((value) => {
        value.key = value.id.toString();
        value.value = value.id.toString();
        if (typeof value.children !== 'undefined') {
          this.getMenuTreeNode(value.children);
        }
      });
    },
    onCheck(checkedMenus, e) {
      this.checkedMenus = checkedMenus;
      this.formParams.menus = getUnion(e.halfCheckedKeys, checkedMenus);
      this.formParams.frontend_extend.checked = checkedMenus;
      this.formParams.frontend_extend.halfChecked = e.halfCheckedKeys;
    },
    toCreate() {
      createRole(this.formParams).then((res) => {
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
      updateRole(this.formParams).then((res) => {
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
    menus(v) {
      this.checkedMenus = v;
    },
  },
};
</script>
<style scoped>
</style>
