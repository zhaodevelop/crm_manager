<template>
    <div>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="操作人" prop="empName">
                <el-input placeholder="请输入操作人名称" style="width: 140px;" size="small"
                          v-model="formInline.empName"></el-input>
            </el-form-item>
            <el-form-item label="登录时间" prop="actTime">
                <el-date-picker
                        v-model="formInline.actTime"
                        type="date"
                        style="width: 140px;" size="small"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            至
            <el-form-item prop="endTime">
                <el-date-picker
                        v-model="formInline.endTime"
                        type="date"
                        style="width: 140px;" size="small"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-button type="primary" round size="medium" @click="onsubmit('formInline')">查询</el-button>
            <el-button type="danger" @click="delArray" round size="medium">批量删除</el-button>
            <el-button type="danger" @click="download" round>EXCEL导出</el-button>
        </el-form>
        <!--表格数据-->
        <el-table
                :data="tableData"
                border
                @selection-change="handleSelectionChange"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    align="center"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="actLogId"
                    label="操作日志Id"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="employee.empName"
                    align="center"
                    label="操作人"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="actTime"
                    label="操作时间"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="actType"
                    align="center"
                    label="操作类型"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="operateContent"
                    align="center"
                    label="操作内容"
                    width="center">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button size="small" type="text" @click="deleteTask(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
                background
                layout="prev, pager, next"
                @current-change="page"
                :page-size="4"
                :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /*分页开始*/
            page(currentPage) {
                const _this = this
                axios.get('http://localhost:8181/ActionLog/getAllActionLog/' + currentPage + '/4')
                    .then(function (resp) {
                        _this.tableData = resp.data.list
                        _this.total = resp.data.total
                    })
            },
            /*删除任务*/
            deleteTask(row) {
                const _this = this
                axios.delete("http://localhost:8181/ActionLog/deleteActionLog/" + row.actLogId).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/ActionLogManager");
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，该任务记录下有关联信息，不可以删除哦！');
                })
            },
            /*批量删除方法*/
            delArray() {
                const checkedList = new Array();
                const _this = this;
                const Qs = require('qs');
                const length = this.multipleSelection.length
                for (let i = 0; i < length; i++) {
                    checkedList.push(this.multipleSelection[i].actLogId);
                }
                axios.delete("http://localhost:8181/ActionLog/delActionLogs", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/ActionLogManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中登录日志信息有关联信息，不可以删除哦！');
                })
            },
            /*多条件查询方法*/
            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var qs = require('querystring')
                        axios.post("http://localhost:8181/ActionLog/getMoreActionLogs/1/4/", qs.stringify(this.formInline)
                        ).then(function (resp) {
                            _this.tableData = resp.data.list
                            _this.total = resp.data.total
                        });
                    } else {
                        return false;
                    }
                });
            },
            download() {
                axios.get("http://localhost:8181/ActionLog/download").then()
            }
        },
        created() {
            const _this = this
            axios.get("http://localhost:8181/ActionLog/getAllActionLog/1/4")
                .then(function (resp) {
                    _this.tableData = resp.data.list
                    _this.total = resp.data.total
                });
        },
        data() {
            return {
                dialogFormVisible: false,
                total: null,
                tableData: null,
                formInline: {
                    empName: '',
                    actTime: '',
                    endTime: ''
                },
            }
        }
    }
</script>

<style scoped>

</style>