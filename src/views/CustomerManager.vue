<template>
    <div>
        <h1>客户管理</h1>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="客户名称" prop="custName">
                <el-input placeholder="请输入客户名称" style="width: 140px;" size="small"
                          v-model="formInline.custName"></el-input>
            </el-form-item>
            <el-button type="primary" round size="medium" @click="onsubmit('formInline')">查询</el-button>
            <el-button type="danger" @click="delArray" round>批量删除</el-button>
            <el-button type="primary" @click="dialogFormVisible = true" round>添加</el-button>
        </el-form>
        <!--添加按钮-->
        <el-row>
            <el-dialog title="新建客户" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="客户名称" prop="custName">
                        <el-input v-model="ruleForm.custName"></el-input>
                    </el-form-item>
                    <el-form-item label="客户来源" prop="custSource">
                        <el-input v-model="ruleForm.custSource"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="custSex">
                        <el-input v-model="ruleForm.custSex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="custTel">
                        <el-input v-model="ruleForm.custTel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="custEmail">
                        <el-input v-model="ruleForm.custEmail" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="custAddress">
                        <el-input v-model="ruleForm.custAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人" prop="employee.empId">
                        <el-input v-model="ruleForm.empData.empId"></el-input>
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
            <el-dialog title="修改客户" :visible.sync="updateWindow">
                <el-form label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="客户ID" prop="custId">
                        <el-input v-model="ruleForm.updateData.custId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="custName">
                        <el-input v-model="ruleForm.updateData.custName"></el-input>
                    </el-form-item>
                    <el-form-item label="客户来源" prop="custSource">
                        <el-input v-model="ruleForm.updateData.custSource"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="custSex">
                        <el-input v-model="ruleForm.updateData.custSex" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="custTel">
                        <el-input v-model="ruleForm.updateData.custTel" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="custEmail">
                        <el-input v-model="ruleForm.updateData.custEmail" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="custAddress">
                        <el-input v-model="ruleForm.updateData.custAddress"></el-input>
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
                    fixed
                    prop="custId"
                    label="客户ID"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custName"
                    label="客户名称"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custSource"
                    align="center"
                    label="客户来源"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custSex"
                    label="性别"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custTel"
                    label="联系方式"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custEmail"
                    label="邮箱"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custAddress"
                    label="地址"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="custCreatetime"
                    label="创建时间"
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
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"
                               @click="updateWindow = true,editCustomer(scope.$index,scope.row,tableData)">编辑
                    </el-button>
                    <el-button size="small" type="text" @click="deleteCustomer(scope.row)">删除</el-button>
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
            editCustomer(index, row, tableData) {
                this.ruleForm.updateData = JSON.parse(JSON.stringify(this.ruleForm));
                this.ruleForm.updateData.custId = tableData[index].custId
                this.ruleForm.updateData.custName = tableData[index].custName
                this.ruleForm.updateData.custSource = tableData[index].custSource
                this.ruleForm.updateData.custSex = tableData[index].custSex
                this.ruleForm.updateData.custTel = tableData[index].custTel
                this.ruleForm.updateData.custEmail = tableData[index].custEmail
                this.ruleForm.updateData.custAddress = tableData[index].custAddress
            },
            handleSelectionChange(val) {
                alert(val)
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
                axios.get('http://localhost:8181/Customer/getAllCusts/' + currentPage + '/4')
                    .then(function (resp) {
                        _this.tableData = resp.data.list
                        _this.total = resp.data.total
                    })
            },
            /*提交表单*/
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var formData = new FormData();
                        formData.append('custName', this.ruleForm.custName),
                            formData.append('custSource', this.ruleForm.custSource),
                            formData.append('custSex', this.ruleForm.custSex),
                            formData.append('custTel', this.ruleForm.custTel),
                            formData.append('custEmail', this.ruleForm.custEmail),
                            formData.append('custAddress', this.ruleForm.custAddress),
                            formData.append('custCreatetime', this.ruleForm.custCreatetime),
                            formData.append("employee.empId", this.ruleForm.empData.empId),
                            axios.post("http://localhost:8181/Customer/addCustomer", formData).then(function (resp) {
                                if (resp.data == 1) {
                                    alert("添加成功！", window.location.href = "/CustomerManager");
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            /*修改表单*/
            updateForm() {
                axios.put("http://localhost:8181/Customer/updateCustomer", {
                    custId: this.ruleForm.updateData.custId,
                    custName: this.ruleForm.updateData.custName,
                    custSource: this.ruleForm.updateData.custSource,
                    custSex: this.ruleForm.updateData.custSex,
                    custTel: this.ruleForm.updateData.custTel,
                    custEmail: this.ruleForm.updateData.custEmail,
                    custAddress: this.ruleForm.updateData.custAddress,
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("修改成功！", window.location.href = "/CustomerManager");
                    } else {
                        alert("修改失败！")
                    }
                })
            },
            /*删除客户*/
            deleteCustomer(row) {
                const _this = this
                alert(row.custId)
                axios.delete("http://localhost:8181/Customer/deleteCustomerById/" + row.custId).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/CustomerManager");
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，该客户下有关联信息，不可以删除哦！');
                })
            },
            /*批量删除方法*/
            delArray() {
                const checkedList = new Array();
                const _this = this;
                const Qs = require('qs');
                const length = this.multipleSelection.length
                for (let i = 0; i < length; i++) {
                    checkedList.push(this.multipleSelection[i].custId);
                }
                axios.delete("http://localhost:8181/Customer/delCustomers", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/CustomerManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中客户信息有关联信息，不可以删除哦！');
                })
            },
            /*多条件查询方法*/
            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var qs = require('querystring')
                        axios.post("http://localhost:8181/Customer/getAllCusts/1/4/", qs.stringify(this.formInline)).then(function (resp) {
                            _this.tableData = resp.data.list
                            _this.total = resp.data.total
                        });
                    } else {
                        return false;
                    }
                });
            },
        },
        created() {
            const _this = this
            axios.get("http://localhost:8181/Customer/getAllCusts/1/4")
                .then(function (resp) {
                    _this.tableData = resp.data.list
                    _this.total = resp.data.total
                });
            /*客户关联负责人信息*/
            this.axios.get("http://localhost:8181/Employee/allEmps")
                .then(function (resp) {
                    _this.ruleForm.empData = resp.data
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
                ruleForm: {
                    custId: '',
                    custName: '',
                    custSource: '',
                    custSex: '',
                    custTel: '',
                    custEmail: '',
                    custAddress: '',
                    custCreatetime: '',
                    employee: '',
                    empData: [{
                        empId: '',
                        empName: ''
                    }],
                    updateData: [{
                        custId: '',
                        custName: '',
                        custSource: '',
                        custSex: '',
                        custTel: '',
                        custEmail: '',
                        custAddress: '',
                    }]
                },
                rules: {
                    custName: [
                        {required: true, message: '请输入客户名称', trigger: 'blur'},
                    ],
                },
                formInline: {
                    custName: ''
                },
            }
        }
    }
</script>

<
style
scoped >

< /style>