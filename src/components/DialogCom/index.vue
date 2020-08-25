<template>
	<el-dialog :title="title" :visible.sync="isShowTag" :width="width" class="dialogCom">
		<slot></slot>
		<span slot="footer" class="dialog-footer" v-if="isShowFooter">
      <el-button class="saveBtn" type="primary" @click="sureSave">保 存</el-button>
      <el-button class="cancleBtn" @click="cancleSave">取 消</el-button>
    </span>
	</el-dialog>
</template>

<script>
	export default {
		props: {
			value: {
				type: Boolean,
				default: false
			},
			title: {
				type: String
			},
			width: {
				type: String,
				default: '650px'
			},
			isShowFooter: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
			}
		},
		mounted () {
		},
		computed: {
			isShowTag: {
				get () {
					return this.value
				},
				set (value) {
					this.$emit('input', value)
				}
			}
		},
		methods: {
			cancleSave () {
				// 取消时的事件
				this.$emit('cancle-save', this.dialogVisible)
			},
			sureSave () {
				// 确定时的事件
				this.$emit('sure-save', this.dialogVisible)
			}
		}
	}
</script>

<style src="./style.less" lang="less"></style>
