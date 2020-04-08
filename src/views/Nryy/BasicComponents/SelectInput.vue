<template>
  <div class="my-select-input">
    <el-checkbox
      :name='name'
      v-for="(item, index) in typeEffectList"
      v-model="item.isSelect"
      @change="change"
      :key="index"
      :label="item.name"
    />
    <input
      ref="input"
      placeholder="输入关健字并回车"
      class="el-input__inner"
      type="text"
      @keyup.enter='addTypeEffect'
      v-model="typeEffectAdd"
    />
  </div>
</template>

<script>
export default {
  name: 'select-input-component',
  props: {
    name: String,
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      typeEffectAdd: ''
    }
  },
  created() {
  },
  computed: {
    typeEffectList: {
      get() {
        return this.value
      },
      set(v) {
        // console.log(v);
      }
    }
  },
  methods: {
    addTypeEffect() {
      if (this.typeEffectList.map(item => item.name).includes(this.typeEffectAdd) || !this.typeEffectAdd) {
        return
      }
      this.typeEffectList.push({ name: this.typeEffectAdd, isSelect: true })
      this.change()
      this.$nextTick(() => {
        this.typeEffectAdd = ''
      })
    },
    change() {
      let typeEffectList = this.typeEffectList.filter(item => item.name)
      this.$emit('input', typeEffectList)
    }
  }
}
</script>

<style lang="less" scoped>
.my-select-input {
  .el-checkbox {
    line-height: 40px;
  }
  .el-input__inner {
    font-size: 14px;
  }
}
</style>
