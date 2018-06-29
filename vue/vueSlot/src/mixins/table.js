export default {
  data() {
    return {
      ops: '',
      dialogShow: false
    }
  },
  methods: {
    addTask() {
      this.ops = '1'
      this.dialogShow = true
    },
    editTask(id) {
      this.ops = ['2', id].join(',')
      this.dialogShow = true
    },
    handleClose() {
      this.ops = ''
      this.dialogShow = false
    }
  }
}
