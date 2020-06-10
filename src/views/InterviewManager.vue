<template>
    <div>
        <h1>访谈管理</h1>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="客户名" prop="custName">
                <el-input placeholder="请输入客户名称" style="width: 140px;" size="small"
                          v-model="formInline.custName"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="empName">
                <el-input placeholder="请输入负责人名称" style="width: 140px;" size="small"
                          v-model="formInline.empName"></el-input>
            </el-form-item>
            <el-form-item label="访谈时间" prop="interDatetime">
                <el-date-picker
                        v-model="formInline.interDatetime"
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
            <el-button type="danger" @click="delArray" round>批量删除</el-button>
            <el-button type="primary" @click="dialogFormVisible = true" round>添加</el-button>
            <el-button type="danger" @click="download" round>EXCEL导出</el-button>
        </el-form>
        <!--添加按钮-->
        <el-row>
            <el-dialog title="新建访谈信息" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="客户名" prop="customer.custId">
                        <el-select v-model="ruleForm.customer.custId" placeholder="请选择客户" @focus="custFocus"

                        >
                            <el-option v-for="item in ruleForm.custData"
                                       :key="item.custId"
                                       :value="item.custId"
                                       :label="item.custName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="负责人" prop="employee.empId">
                        <el-select v-model="ruleForm.employee.empId" placeholder="请选择负责人" @focus="empFocus"
                        >
                            <el-option v-for="item in ruleForm.empData" :key="item.empId" :label="item.empName"
                                       :value="item.empId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="访谈内容" prop="interInfo">
                        <el-input type="textarea" v-model="ruleForm.interInfo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
            </el-dialog>
        </el-row>
        <!--修改弹窗-->
        <el-row>
            <el-dialog title="修改访谈信息" :visible.sync="updateWindow">
                <el-form label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="访谈ID" prop="interId">
                        <el-input v-model="ruleForm.interId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="访谈信息" prop="interInfo">
                        <el-input v-model="ruleForm.updateData.interInfo"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateForm('ruleForm')">确认修改</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button @click="updateWindow = false">取 消</el-button>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
            </el-dialog>
        </el-row>
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
                    label="客户姓名"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="employee.empName"
                    label="负责人"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    fixed
                    prop="interId"
                    label="访谈ID"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="interInfo"
                    label="访谈内容"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="interDatetime"
                    align="center"
                    label="访谈时间"
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
                rules: {},
            }
        }
    }
</script>

<style scoped>

</style>