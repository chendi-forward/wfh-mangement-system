<template>
    <div class="table-box">
        <div class="filtrate commom-card flex-item-center">
            <span class="lebel">商品搜索：</span>
            <el-input
                placeholder="输入订单编号/商品编号..."
                v-model="searchOrder"
                prefix-icon="el-icon-search">
            </el-input>
            <span class="lebel">时间查找：</span>
            <el-date-picker
                v-model="time"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <span class="lebel">评价筛选：</span>
            <el-select v-model="selectKey" @change='selectChange' placeholder="请选择">
                <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="danger" size="small" plain @click="searchInfo">搜索</el-button>
        </div>
        <el-table
            ref="multipleTable"
            stripe
            align='center'
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="evaluation_score"
            align='center'
            label="评价"
            width="50">
                <template slot-scope="scope">
                    <div class="img-list">
                        <span class="iconfont pingjia-icon" :class="scope.row.evaluation_score"></span>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column
            prop="nickname"
            label="商品编号"
            align='center'
            width="100">
            </el-table-column> -->
            <el-table-column
            prop='goods_name'
            label="商品名称"
            align='center'
            min-width="100">
            </el-table-column>
            <el-table-column
            prop='evaluation_info'
            align='center'
            label="内容"
            width="100">
            </el-table-column>
            <el-table-column
            prop='images'
            align='center'
            label="图片"
            width="150">
                <template slot-scope="scope">
                    <div class="img-list">
                        <img :src="scope.row.images" v-if="scope.row.images">
                        <span v-else>无</span>
                        <!-- <img :src="homeIcon"> -->
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop='state'
            align='center'
            label="状态">
                <template slot-scope="scope">
                    <div class="evea_state">
                        {{scope.row.state == 1 ? '显示' : '隐藏'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
            prop='user_name'
            align='center'
            label="评价人"
            width="150">
            </el-table-column>
            <el-table-column
            prop='order_id'
            align='center'
            label="订单编号"
            width="150">
            </el-table-column>
            <el-table-column
            prop='evaluate_time'
            label="评价时间"
            align='center'
            width="100">
            </el-table-column>
            <el-table-column align='center' label="操作" width="200">
                <template slot-scope="scope">
                   <div @click='receivingHandle(scope.row)' class="con-icon">
                        <el-button type="danger" size="mini" plain v-if="!scope.row.reply_evaluation">回复</el-button>
                        <span v-if="scope.row.reply_evaluation">已回复</span>
                    </div>
                    
                    <div class="con-icon" @click="updatePingjia(scope.row, 1)" :class="{'theme-color': scope.row.state == 1}">
                        显示
                    </div>
                    |
                    <div class="con-icon" @click="updatePingjia(scope.row, 0)" :class="{'theme-color': scope.row.state == 0}">
                        隐藏
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                type="expand">
                <template slot-scope="scope">
                    <div class="text-input">
                        <el-input type="textarea" v-model="scope.row.reply_evaluation" rows="4" placeholder="回复" @change="textareaChange"/>
                        <div class="btn-wrap">
                            <el-button type="danger" size="mini" @click="updatePingjia(scope.row, 2)">确认</el-button>
                            <el-button size="mini" plain>取消</el-button>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import homeIcon from 'ASSETS/image/home_icon.png'
import moment from 'moment'
import { postGoodsEvaluationList } from 'API/Shgl'
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data () {
        return {
            homeIcon,
            searchOrder: '',
            searchUser: '',
            time: [moment().week(moment().week()).startOf('week').format('YYYY-MM-DD'), moment().week(moment().week()).endOf('week').format('YYYY-MM-DD')],
            reply: '',
            evaluate: [{
                name: '差评',
                value: 0,
                class: 'icon-chaping'
            }, {
                name: '中评',
                value: 1,
                class: 'icon-zhongping'
            }, {
                name: '好评',
                value: 2,
                class: 'icon-haoping'
            }],
            selectKey: '',
            options: [{
                value: '',
                label: '全部评价'
            }, {
                value: '3',
                label: '好评'
            }, {
                value: '2',
                label: '中评'
            }, {
                value: '1',
                label: '差评'
            }]
        }
    },
    computed: {
        tableData () {
            return this.data
        }
    },
    watch: {
        data (n) {
            // console.log('pic----------')
        }
    },
    methods: {
        // 更新评价
        updatePingjia (item, flag) {
            let data = {
                id: item.id,
                reply_evaluation: item.reply_evaluation
            }
            if (flag == 0) {
                data.state = 0
            }
            if (flag == 1) {
                data.state = 1
            }
            postGoodsEvaluationList(data).then((res) => {
                this.$emit('updateData')
            })
        },
        // 搜索数据
        searchInfo () {
            let data = {
                searchOrder: this.searchOrder,
                time: this.time,
                selectKey: this.selectKey
            }
            this.$emit('search', data)
        },
        handleSelectionChange (n) {
            this.$emit('deleteitem', n)
        },
        selectChange () {},
        receivingHandle (row) {
            this.$refs.multipleTable.toggleRowExpansion(row, true)
        },
        refundHandle () {},
        textareaChange () {
            // console.log(this.reply)
        }
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
.table-box {
    .filtrate {
        height: 96px;
        margin-bottom: 10px;
        .lebel {
            padding-left: 20px;
            font-size: 15px;
        }
        .el-input {
            width: 200px;
        }
        .el-date-editor {
            width: 250px;
        }
        .el-button {
            margin-left: 10px;
        }
    }
    .img-list {
        img {
            height: 38px;
            width: 38px;
            margin: 5px;
        }
    }
    .pingjia-icon {
        font-size: 22px;
        color: #a6afbf;
        &.icon-haoping {
            color: #ff4b57;
        }
    }
    .con-icon {
        display: inline-block;
        cursor: pointer;
        padding: 5px;
    }
    .text-input {
        width: 90%;
        .el-textarea {
            width: 80%;
        }
        .btn-wrap {
            width: 70px;
            .el-button {
                margin-left: 10px;
                +.el-button {
                    margin-top: 10px;
                }
            }
        }
        > div {
            display: inline-block;
        }
    }
}
</style>
