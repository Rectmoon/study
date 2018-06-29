import mylog from '@/utils/log'
import extend from '@/utils/extend'
export default {
  props: {
    ops: {
      type: String,
      required: true
    },
    dialogShow: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      operation: '', // '1': 添加,'2':修改, '3':复制
      id: '',
      title: '',
      form: {},
      formRules: {}
    }
  },
  watch: {
    ops(str) {
      ;[this.operation, this.id] = str.split(',')
      if (this.id === undefined) this.id = ''
      this.main()
    }
  },
  methods: {
    main() {
      switch (this.operation) {
        case '1':
          this.title = '添加任务'
          this.add()
          break
        case '2':
          this.title = '修改任务'
          this.edit()
          break
        case '3':
          this.title = '复制任务'
          this.copy()
          break
      }
    },
    getDefaultForm() {},
    add() {
      this.form = this.getDefaultForm()
    },
    edit() {
      this.form = extend(true, {}, this.tableData[this.id - 1])
    },
    copy() {},
    handleClose() {
      this.operation = ''
      this.id = ''
      this.$emit('close')
    }
  }
}
