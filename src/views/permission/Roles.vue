<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      rowKey="id"
    >
      <tag-boole slot="status" slot-scope="text, record" :tagValue="record.status"></tag-boole>
      <action-column
        slot="action"
        slot-scope="text, record"
        :record="record"
        :actions="['edit', 'delete']"
        @on-edit="handleEdit"
        @on-delete="handleDelete">
      </action-column>
    </a-table>
    <add-role
      :formParams="formParams"
      :addVisible="addVisible"
      :menus="checkedMenus"
      @on-change="changeAdd">
    </add-role>
  </a-card>
</template>
<script>
import { roleLists, deleteRole } from '@/api/permission';
import { showSuccess, showError } from '@/utils/showMsg';
import AddRole from './components/AddRole';
import ActionColumn from '@/components/Table/ActionColumn';
import TagBoole from '@/components/Table/TagBoole';

export default {
  inject: ['reload'],
  name: 'Roles',
  components: {
    AddRole,
    ActionColumn,
    TagBoole,
  },
  data() {
    return {
      addVisible: false,
      data: [],
      columns: [],
      formParams: {
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
      checkedMenus: [],
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.getLists();
    });
  },
  methods: {
    handleAdd() {
      this.formParams = {
        name: '',
        status: true,
        listorder: 0,
        remark: '',
        menus: [],
        frontend_extend: {
          checked: [],
          halfChecked: [],
        },
      };
      this.addVisible = true;
    },
    async getLists() {
      const res = await roleLists();
      this.data = res.data.result.lists.data;
      this.columns = res.data.result.field;
      this.columns[2].scopedSlots = { customRender: 'status' };
      this.columns.push({
        title: '操作', dataIndex: '', key: 'action', scopedSlots: { customRender: 'action' },
      });
    },
    changeAdd(visible) {
      this.addVisible = !visible;
    },
    handleEdit(record) {
      record.frontend_extend = record.frontend_extend ? record.frontend_extend : { checked: [], halfChecked: [] };
      record.status = Boolean(record.status);
      this.checkedMenus = record.frontend_extend.checked;
      this.formParams = record;
      this.addVisible = true;
    },
    handleDelete(record) {
      deleteRole({ id: record.id }).then((res) => {
        if (res.data.code === 0) {
          showSuccess(res.data.message);
          this.reload();
        } else {
          showError(res.data.message);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
