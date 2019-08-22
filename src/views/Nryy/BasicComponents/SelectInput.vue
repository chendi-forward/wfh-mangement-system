<template>
  <div class="my-select-input">
    <el-checkbox
      :name='name'
      v-for="(item, index) in typeEffectList"
      v-model="item.isSelect"
      :key="index"
      :label="item.name">
    </el-checkbox>
    <input ref="input" placeholder="输入光健字并回车" class="el-input__inner" type="text" @keyup.enter='addTypeEffect' v-model="typeEffectAdd">
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
    data () {
      return {
        typeEffectAdd: ''
      }
    },
    computed: {
      typeEffectList: {
        get () {
          if (this.value.length) {
            return this.value.map(item => {
              return {
                name: item,
                isSelect: true
              }
            })
          } else {
            return this.preset
          }
        },
        set (val) {
          let typeEffects = val.map(item => item.isSelect && item.name).filter(item => item)
          this.$emit('input', typeEffects)
        }
      }
    },
    methods: {
      addTypeEffect () {
        if (this.typeEffectList.map(item => item.name).includes(this.typeEffectAdd) || !this.typeEffectAdd) {
          return
        }
        this.typeEffectList.push(
          {name: this.typeEffectAdd, isSelect: true}
        )
        this.$nextTick(() => {
          this.typeEffectAdd = ''
        })
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
