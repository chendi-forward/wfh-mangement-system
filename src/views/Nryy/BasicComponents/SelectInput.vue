<template>
  <div class="my-select-input">
    <el-checkbox
      :name='name'
      v-for="(item, index) in typeEffectList"
      v-model="item.isSelect"
      @change="change"
      :key="index"
      :label="item.name"
    >
    </el-checkbox>
    <input
      ref="input"
      placeholder="输入关健字并回车"
      class="el-input__inner"
      type="text"
      @keyup.enter='addTypeEffect'
      v-model="typeEffectAdd"
    >
  </div>
</template>

<script>
export default {
  name: 'select-input-component',
  props: {
    preset: Array,
    name: String,
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      typeEffectAdd: '',
      typeEffectList: []
    }
  },
  watch: {
    preset: {
      handler(v) {
        this.typeEffectList = this.value.length
          ? this.value.map(item => {
              return {
                name: item,
                isSelect: true
              }
            })
          : v
      }
    }
  },
  created() {
    this.typeEffectList = this.value.length
      ? this.value.map(item => {
          return {
            name: item,
            isSelect: true
          }
        })
      : this.preset
  },
  methods: {
    addTypeEffect() {
      if (
        this.typeEffectList
          .map(item => item.name)
          .includes(this.typeEffectAdd) ||
        !this.typeEffectAdd
      ) {
        return
      }
      this.typeEffectList.push({ name: this.typeEffectAdd, isSelect: true })
      this.$nextTick(() => {
        this.typeEffectAdd = ''
      })
      this.change()
    },
    change() {
      let typeEffects = this.typeEffectList
        .map(item => item.isSelect && item.name)
        .filter(item => item)
      this.$emit('input', typeEffects)
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
