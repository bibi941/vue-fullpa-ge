<template>
  <div class="project-desc">
    <span v-html = "code" v-for = "code in codes" > </span>
    <span v-show = "show">|</span>
  </div>
</template>
  
<script>
export default {
  props: ['state'],
  data () {
    return {
      msg: 'AVueFullPage'.split('').concat(['<br>', '{', '<br>'],
        'return "bibi"'.split(''), ['<br>', '}']),
      msgIndex: 0,
      codes: [],
      show: true,
      cursorFlash: null,
      time: null,
    }
  },
  watch: {
    state () {
      if (this.state === 'enter') {
        this.time = setInterval(this.addCodes, 130)
        this.cursorFlash = setInterval(this.showChange, 200)
      }
      if (this.state === 'leave') {
        this.clear()
        this.codes = []
        this.msgIndex = 0
      }
    }
  },
  methods: {
    addCodes () {
      this.codes.push(this.msg[this.msgIndex])
      this.msgIndex++
    },
    showChange () {
      // 光标闪烁
      this.show = !this.show
      if (this.msgIndex === this.msg.length) {
        this.clear()
      }
    },
    clear () {
      window.clearInterval(this.cursorFlash)
      window.clearInterval(this.time)
      this.show = false

    }
  }
}
</script>
  
<style  scoped>
.project-desc {
  position: absolute;
  bottom: 30px;
  left: 30px;
  font-size: 30px;
  font-weight: bold;
}
</style>
