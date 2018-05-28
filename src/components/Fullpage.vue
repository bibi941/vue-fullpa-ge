<template>
  <div @wheel="whellEvent($event)">
   <transition-group  tag="div" :name="name"
   @enter="enter" @leave="leave">
      <div :style="{'background-color'
      :bgColor&&bgColor[index]?bgColor[index]:baseBgc}"
      class="block"
      v-for="(list,index) in pages" 
      name="down" :key="list" @transitionend="end" 
      v-show="index===curIndex">  
        <div class="mid">
          {{index+1}}
        </div>

        <slot v-for="slotIndex in pages" :name="'slot'+slotIndex" 
        :state="state" v-if="index+1===slotIndex"></slot>
        
      </div>
    </transition-group>
</div>
</template>
  
<script>
export default {
  props: {
    bgColor: {
      type: Array
    },
    baseBgc: {
      defaule: '#ddd'
    },
    pages: {
      type: Number,
      requires: true
    }
  },
  data () {
    return {
      curIndex: 0,
      name: null,
      canWheel: true,
      endcount: 0,
      state: ''
    }
  },
  methods: {
    whellEvent (e) {
      if (!this.canWheel)
        return false
      this.canWheel = false
      //向下滚
      if (e.deltaY > 0) {
        if (this.curIndex === this.pages - 1) {
          this.canWheel = true
          this.endcount = 0
          return
        }
        this.name = 'down'
        this.curIndex++;
      }
      //向上滚
      else if (e.deltaY < 0) {
        if (this.curIndex === 0) {
          this.canWheel = true
          this.endcount = 0
          return
        }
        this.name = 'up'
        this.curIndex--;
      }
    },
    end () {
      this.endcount++;
      if (this.endcount === 2) {
        this.canWheel = true
        this.endcount = 0
        this.state = 'transitionend'
      }
    },
    enter (el) {
      this.state = 'enter'
      // done()
    },
    leave (el) {
      this.state = 'leave'
      // done()
    }
  }
}
</script>
  
<style  scoped>
#app {
  overflow: hidden;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
}

.block {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #c09;
}

.down-enter-active {
  transition: all 1s ease;
  transform: translateY(0);
}

.down-leave-active {
  transition: all 1s ease;
  transform: translateY(-100%);
}

.down-enter {
  transform: translateY(100%);
}

.down-leave {
  transform: translateY(0);
}

.up-enter-active {
  transition: all 1s ease;
  transform: translateY(0);
}

.up-leave-active {
  transition: all 1s ease;
  transform: translateY(100%);
}

.up-enter {
  transform: translateY(-100%);
}

.up-leave {
  transform: translateY(0);
}

.mid {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 200px;
}
</style>