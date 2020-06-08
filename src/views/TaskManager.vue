<template>
    <div>
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
                    prop="customer.custName"
                    label="任务主题"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="employee.empName"
                    label="任务信息"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="interId"
                    label="任务执行状态"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="interInfo"
                    label="任务创建时间"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="interDatetime"
                    align="center"
                    label="任务结束时间"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="interDatetime"
                    align="center"
                    label="创建者"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="interDatetime"
                    align="center"
                    label="执行者"
                    width="center">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"
                               @click="updateWindow = true,editInterview(scope.$index,scope.row,tableData)">编辑
                    </el-button>
                    <el-button size="small" type="text" @click="deleteInterview(scope.row)">删除</el-button>
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
            handleClick(row) {
                console.log(row);
            },
            /*重置表单*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /*分页开始*/
            page(currentPage) {
                const _this = this
                axios.get('http://localhost:8181/Interview/getAllInters/' + currentPage + '/4')
                    .then(function (resp) {
                        _this.tableData = resp.data.list
                        _this.total = resp.data.total
                    })
            },
            /*删除客户*/
            deleteInterview(row) {
                const _this = this
                axios.delete("http://localhost:8181/Interview/deleteInterview/" + row.interId).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/InterviewManager");
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，该访谈记录下有关联信息，不可以删除哦！');
                })
            },
            /*批量删除方法*/
            delArray() {
                const checkedList = new Array();
                const _this = this;
                const Qs = require('qs');
                const length = this.multipleSelection.length
                for (let i = 0; i < length; i++) {
                    checkedList.push(this.multipleSelection[i].interId);
                }
                axios.delete("http://localhost:8181/Interview/delInters", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/InterviewManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中访谈信息有关联信息，不可以删除哦！');
                })
            },
            /*多条件查询方法*/
            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var informData = new FormData();
                        informData.append('custName', this.formInline.custName),
                            informData.append('empName', this.formInline.empName),
                            informData.append('interDatetime', this.formInline.interDatetime),
                            informData.append('endTime', this.formInline.endTime),
                            axios.post("http://localhost:8181/Interview/getMoreAllInters/1/4/", informData
                            ).then(function (resp) {
                                _this.tableData = resp.data.list
                                _this.total = resp.data.total
                            });
                    } else {
                        return false;
                    }
                });
            },
            /*客户下拉框*/
            custFocus() {
                const _this = this
                this.axios.get("http://localhost:8181/Customer/getAllCusts")
                    .then(function (resp) {
                        _this.ruleForm.custData = resp.data
                    })
            },
            /*员工下拉框*/
            empFocus() {
                const _this = this
                this.axios.get("http://localhost:8181/Employee/allEmps")
                    .then(function (resp) {
                        _this.ruleForm.empData = resp.data
                    })
            },
            /*提交表单*/
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var formData = new FormData();
                        formData.append('customer.custId', this.ruleForm.customer.custId),
                            formData.append('employee.empId', this.ruleForm.employee.empId),
                            formData.append('interInfo', this.ruleForm.interInfo),
                            axios.post("http://localhost:8181/Interview/addInterview", formData).then(function (resp) {
                                if (resp.data == 1) {
                                    alert("添加成功！", window.location.href = "/InterviewManager");
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            editInterview(index, row, tableData) {
                this.ruleForm.updateData = JSON.parse(JSON.stringify(this.ruleForm));
                this.ruleForm.interId = tableData[index].interId
                // this.ruleForm.customer.custId = tableData[index].customer.custName
                // this.ruleForm.employee.empId = tableData[index].employee.empName
                this.ruleForm.updateData.interInfo = tableData[index].interInfo
            },
            /*修改表单*/
            updateForm() {
                console.log(this.ruleForm.customer.custId)
                axios.put("http://localhost:8181/Interview/updateInterview", {
                    interId: this.ruleForm.interId,
                    custId: this.ruleForm.customer.custId,
                    empId: this.ruleForm.employee.empId,
                    interInfo: this.ruleForm.updateData.interInfo
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("修改成功！", window.location.href = "/InterviewManager");
                    } else {
                        alert("修改失败！")
                    }
                })
            },
            /*excel导出*/
            download() {
                axios.get("http://localhost:8181/Interview/download").then(function (resp) {
                        console.log(resp)
                    }
                )
            }
        },
        created() {
            const _this = this
            axios.get("http://localhost:8181/Interview/getAllInters/1/4")
                .then(function (resp) {
                    _this.tableData = resp.data.list
                    _this.total = resp.data.total
                });
        },
        data() {
            return {
                updateWindow: false,
                delVisible: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                total: null,
                tableData: null,
                formInline: {
                    interDatetime: '',
                    custName: '',
                    empName: '',
                    endTime: ''

                },
                ruleForm: {
                    interInfo: '',
                    interRemark: '',
                    customer: [{
                        custId: ''
                    }],
                    employee: [{
                        empId: ''
                    }],
                    custData: [{
                        custId: '',
                        custName: ''
                    }],
                    empData: [{
                        empId: '',
                        empName: ''
                    }],
                    updateData: [{
                        interId: '',
                        custId: '',
                        customer: [{
                            custId: '',
                            custName: ''
                        }],
                        employee: [{
                            empId: '',
                            empName: ''
                        }],
                    }]
                },
            }
        }
    }
</script>

<style scoped>

</style>