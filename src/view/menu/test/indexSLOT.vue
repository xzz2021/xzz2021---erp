<template>
<div>
            <Button type="error" @click="ok" >导出数据</Button>
    <Table
        context-menu
        show-context-menu
        border
        ref="modelTable"
        :columns="columns1"
        :data="data1"
        @on-contextmenu="handleContextMenu"
    >
        <template slot="contextMenu">
            <DropdownItem @click.native="handleContextMenuEdit">编辑</DropdownItem>
            <DropdownItem @click.native="handleContextMenuDelete" style="color: #ed4014">删除</DropdownItem>
        </template>
    </Table>
    </div>
</template>
<script>
export default {
  data () {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      contextLine: 0
    }
  },
  methods: {
    handleContextMenu (row) {
      const index = this.data1.findIndex(item => item.name === row.name)
      this.contextLine = index + 1
    },
    handleContextMenuEdit () {
      this.$Message.info('Click edit of line' + this.contextLine)
    },
    handleContextMenuDelete () {
      this.$Message.info('Click delete of line' + this.contextLine)
    },
    ok () {
      this.$refs.modelTable.exportCsv({ filename: '旭佰餐具包装报表', columns: this.columns, data: this.data })
    }
  }
}
</script>
