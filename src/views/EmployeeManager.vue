<template>
    <div>
        <h1>员工管理</h1>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="姓名" prop="empName">
                <el-input placeholder="请输入姓名" style="width: 140px;" size="small"
                          v-model="formInline.empName"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input placeholder="请输入账号" style="width: 140px;" size="small"
                          v-model="formInline.account"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="empRoleId">
                <el-select v-model="formInline.roleData.empRoleId" placeholder="请选择角色" @focus="roleFocus"
                           @change="
                           (formInline.roleData.roleName)" size="small" style="width: 160px;"
                >
                    <el-option v-for="item in formInline.roleData"
                               :key="item.roleId"
                               :value="item.roleId"
                               :label="item.roleName" size="small"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="department" size="small">
                <el-select v-model="formInline.deptData.empDeptId" placeholder="请选择部门" @focus="deptFocus"
                           style="width: 160px;"
                           @change="deptChange(formInline.deptData.deptName)">
                    <el-option v-for="item in formInline.deptData" :key="item.deptId" :label="item.deptName"
                               :value="item.deptId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" round size="medium" @click="onsubmit('formInline')">查询</el-button>
            <el-button type="primary" @click="dialogFormVisible = true" round>添加</el-button>
            <el-button type="danger" @click="delArray" round>批量删除</el-button>
        </el-form>
        <!--添加弹窗-->
        <el-row>
            <el-dialog title="新建员工" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="员工名称" prop="empName">
                        <el-input v-model="ruleForm.empName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="ruleForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="empSex">
                        <el-radio-group v-model="ruleForm.empSex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="empTel">
                        <el-input v-model="ruleForm.empTel"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="empEmail">
                        <el-input v-model="ruleForm.empEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭地址:" prop="empAddress">
                        <el-input v-model="ruleForm.empAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="ruleForm.roleData.roleName" placeholder="请选择角色" @focus="roleFocus"

                        >
                            <el-option v-for="item in ruleForm.roleData"
                                       :key="item.roleId"
                                       :value="item.roleId"
                                       :label="item.roleName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                        <el-select v-model="ruleForm.deptData.deptName" placeholder="请选择部门" @focus="deptFocus"
                                   >
                            <el-option v-for="item in ruleForm.deptData" :key="item.deptId" :label="item.deptName"
                                       :value="item.deptId"
                            ></el-option>
                        </el-select>
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
            <el-dialog title="修改员工信息" :visible.sync="updateWindow">
                <el-form label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="员工ID" prop="empId">
                        <el-input v-model="ruleForm.empId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="员工名称" prop="empName">
                        <el-input v-model="ruleForm.empName"></el-input>
                    </el-form-item>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="ruleForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="empSex">
                        <el-radio-group v-model="ruleForm.empSex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="empTel">
                        <el-input v-model="ruleForm.empTel"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="empEmail">
                        <el-input v-model="ruleForm.empEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="家庭地址:" prop="empAddress">
                        <el-input v-model="ruleForm.empAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="role.roleId">
                        <el-select v-model="ruleForm.roleData.role" placeholder="请选择角色" @focus="roleFocus"
                        >
                            <el-option v-for="item in ruleForm.roleData"
                                       :key="item.roleId"
                                       :value="item.roleId"
                                       :label="item.roleName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部门" prop="department.deptId">
                        <el-select v-model="ruleForm.deptData.department" placeholder="请选择部门" @focus="deptFocus"
                        >
                            <el-option v-for="item in ruleForm.deptData" :key="item.deptId" :label="item.deptName"
                                       :value="item.deptId"
                            ></el-option>
                        </el-select>
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
                    prop="empId"
                    align="center"
                    label="员工ID"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="role.roleName"
                    label="职位"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="department.deptName"
                    label="所属部门"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="empName"
                    label="员工姓名"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="account"
                    label="账号"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="empSex"
                    label="性别"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="empTel"
                    label="电话"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="empEmail"
                    label="邮编"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="empAddress"
                    label="地址"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column :formatter="checkState"
                             prop="empState"
                             align="center"
                             label="员工状态"
                             width="center">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="center"
                    align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small"
                               @click="updateWindow = true,editEmp(scope.$index,scope.row,tableData)">编辑
                    </el-button>
                    <el-button type="text" size="small" @click="deleteEmp(scope.row)">删除</el-button>
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
            // Change(val) {
            //     console.log(val);
            // },
            editEmp(index, row, tableData) {
                this.ruleForm.updateData = JSON.parse(JSON.stringify(this.ruleForm));
                this.ruleForm.empId = tableData[index].empId
                this.ruleForm.empName = tableData[index].empName
                this.ruleForm.account = tableData[index].account
                this.ruleForm.password = tableData[index].password
                this.ruleForm.checkPass = tableData[index].password
                this.ruleForm.empSex = tableData[index].empSex
                this.ruleForm.empTel = tableData[index].empTel
                this.ruleForm.empEmail = tableData[index].empEmail
                this.ruleForm.empAddress = tableData[index].empAddress
                this.ruleForm.roleData.role = tableData[index].role.roleName
                this.ruleForm.deptData.department = tableData[index].department.deptName
            },
            /*修改表单*/
            updateForm() {
                console.log(this.ruleForm.deptData.department.deptId)
                axios.put("http://localhost:8181/Employee/updateEmpById", {
                    empId:this.ruleForm.empId,
                    empName:this.ruleForm.empName,
                    account:this.ruleForm.account,
                    password:this.ruleForm.password,
                    checkPass:this.ruleForm.checkPass,
                    empSex:this.ruleForm.empSex,
                    empTel:this.ruleForm.empTel,
                    empEmail:this.ruleForm.empEmail,
                    empAddress:this.ruleForm.empAddress,
                    role:this.ruleForm.roleData.role,
                    department:this.ruleForm.deptData.department,
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("修改成功！", window.location.href = "/EmployeeManager");
                    } else {
                        alert("修改失败！")
                    }
                })
            },
            /*分页开始*/
            page(currentPage) {
                const _this = this
                axios.get('http://localhost:8181/Employee/allEmps/' + currentPage + '/4')
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
                        formData.append('empName', this.ruleForm.empName),
                            formData.append('account', this.ruleForm.account),
                            formData.append('password', this.ruleForm.password),
                            formData.append('empSex', this.ruleForm.empSex),
                            formData.append('empTel', this.ruleForm.empTel),
                            formData.append('empEmail', this.ruleForm.empEmail),
                            formData.append('empAddress', this.ruleForm.empAddress),
                            formData.append("role.roleId", this.ruleForm.roleData.roleName),
                            formData.append("department.deptId", this.ruleForm.deptData.deptName),
                            axios.post("http://localhost:8181/Employee/addEmployee", formData).then(function (resp) {
                                if (resp.data == 1) {
                                    alert("添加成功！", window.location.href = "/EmployeeManager");
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            /*多条件查询方法*/
            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var informData = new FormData();
                        const Qs = require('qs');
                        informData.append('empName', this.formInline.empName),
                            informData.append('account', this.formInline.account),
                            informData.append('empRoleId', this.formInline.roleData.empRoleId),
                            informData.append('empDeptId', this.formInline.deptData.empDeptId),
                            axios.post("http://localhost:8181/Employee/allEmps/1/4/", informData
                            ).then(function (resp) {
                                _this.tableData = resp.data.list
                                _this.total = resp.data.total
                            });
                    } else {
                        return false;
                    }
                });
            },
            // onsubmit() {
            //     const _this = this
            //     const Qs = require('qs');
            //     axios.post("http://localhost:8181/Employee/allEmps/1/4/", {
            //         params: {
            //             empName: this.formInline.empName ? this.formInline.empName:'',
            //             account: this.formInline.account ? this.formInline.account : '',
            //             empRoleId: this.formInline.roleData.empRoleId ? this.formInline.roleData.empRoleId : '',
            //             empDeptId: this.formInline.deptData.empDeptId ? this.formInline.deptData.empDeptId : '',
            //         }
            //     })
            // },
            /*重置表单*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /*员工状态：在职/离职*/
            checkState(val) {
                if (val.empState == '1') {
                    return "在职"
                } else if (val.empState == '0') {
                    return "离职"
                }
            },
            /*角色下拉框*/
            roleFocus() {
                const _this = this
                this.axios.get("http://localhost:8181/Role/getAllRoles")
                    .then(function (resp) {
                        _this.ruleForm.roleData = resp.data
                        _this.formInline.roleData = resp.data
                    })
            },
            /*部门下拉框*/
            deptFocus() {
                const _this = this
                this.axios.get("http://localhost:8181/Department/getAllDepts")
                    .then(function (resp) {
                        _this.ruleForm.deptData = resp.data
                        _this.ruleForm.deptData.deptId = resp.data.deptId
                        _this.ruleForm.deptData.deptName = resp.data.deptName
                        _this.formInline.deptData = resp.data
                    })
            },
            deptChange(val) {
                console.log(val);
            },
            /*删除方法*/
            deleteEmp(row) {
                console.log(row.empId);
                axios.delete("http://localhost:8181/Employee/deleteById/" + row.empId).then(function () {
                    alert("删除成功！", window.location.href = "/EmployeeManager")
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delArray() {
                var checkedList = new Array();
                var _this = this;
                const Qs = require('qs');
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    checkedList.push(this.multipleSelection[i].empId);
                }
                axios.delete("http://localhost:8181/Employee/delEmps", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/EmployeeManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中员工信息有关联信息，不可以删除哦！');
                })
            },
        },
        created() {
            const _this = this
            axios.get("http://localhost:8181/Employee/allEmps/1/4/")
                .then(function (resp) {
                    _this.tableData = resp.data.list
                    _this.total = resp.data.total
                });
        },
        /*分页结束*/
        data() {
            return {
                updateWindow: false,
                total: null,
                tableData: null,
                dialogTableVisible: false,
                dialogFormVisible: false,
                ruleForm: {
                    empName: '',
                    account: '',
                    password: '',
                    checkPass: '',
                    empSex: '',
                    empTel: '',
                    empEmail: '',
                    empAddress: '',
                    roleData: [{
                        empRoleId: '',
                        roleId: '',
                        roleName: '',
                    }],
                    deptData: [{
                        empDeptId: '',
                        deptId: '',
                        deptName: '',
                        department:[{
                            deptId:'',
                            deptName:''
                        }]
                    }],
                },
                rules: {
                    empName: [
                        {required: true, message: '请输入员工名称', trigger: 'blur'},
                        {min: 6, max: 10, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    account: [
                        {required: true, message: '请输入账号信息', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    checkPass: [
                        {required: true, message: '请再次输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                    empSex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                },
                formLabelWidth: '120px',
                formInline: {
                    empName: '',
                    account: '',
                    roleData: [{
                        roleId: '',
                        roleName: '',
                        empRoleId: ''
                    }],
                    deptData: [{
                        deptId: '',
                        deptName: '',
                        empDeptId: ''
                    }],
                    empWorkTime: '',
                },
            }
        },
    }
</script>
<style scoped>

</style>