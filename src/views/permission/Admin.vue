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
      <tag-boole slot="is_root" slot-scope="text, record" :tagValue="record.is_root"></tag-boole>
      <action-column slot="action" :edit="!(item.username === 'admin')" :del="!(item.username === 'admin')"
                    slot-scope="value,item" :record="item"
                     @on-edit="handleEdit"
                    @on-del="handleDelete"
      ></action-column>
    </a-table>
    <add-admin
      :formParams="formParams"
      :addVisible="addVisible"
      @on-change="changeAdd">
    </add-admin>
  </a-card>
</template>
<script>
import { adminLists, deleteAdmin } from '@/api/permission';
import { showSuccess, showError } from '@/utils/showMsg';
import AddAdmin from './components/AddAdmin';
import ActionColumn from '@/components/Table/ActionColumn';
import TagBoole from '@/components/Table/TagBoole';

export default {
  name: 'Admin',
  inject: ['reload'],
  components: {
    AddAdmin,
    ActionColumn,
    TagBoole,
  },
  data() {
    return {
      addVisible: false,
      data: [],
      columns: [],
      formParams: {},
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
      };
      this.addVisible = true;
    },
    async getLists() {
      const res = await adminLists();
      this.data = res.data.result.data;
      this.columns = res.data.result.field;
      this.columns[2].scopedSlots = { customRender: 'status' };
      this.columns[3].scopedSlots = { customRender: 'is_root' };
      this.columns.push({
        title: '操作', dataIndex: '', key: 'action', scopedSlots: { customRender: 'action' },
      });
    },
    changeAdd(visible) {
      this.addVisible = !visible;
    },
    handleEdit(record) {
      record.password = '';
      this.formParams = record;
      this.addVisible = true;
    },
    handleDelete(record) {
      deleteAdmin({ id: record.id }).then((res) => {
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
