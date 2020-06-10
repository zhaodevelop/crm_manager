<template>
    <div>
        <h1>角色管理</h1>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="角色名称" prop="deptName">
                <el-input placeholder="请输入角色名称" style="width: 140px;" size="small"
                          v-model="formInline.roleName"></el-input>
            </el-form-item>
            <el-button type="primary" round size="medium" @click="onsubmit('formInline')">查询</el-button>
            <el-button type="primary" @click="dialogFormVisible = true" round>添加</el-button>
            <el-button type="danger" @click="delArray" round>批量删除</el-button>
        </el-form>
        <!--添加按钮-->
        <el-row>
            <!--            <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>-->
            <el-dialog title="新建角色" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="roleRemark">
                        <el-input v-model="ruleForm.roleRemark"></el-input>
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
            <el-dialog title="修改角色信息" :visible.sync="updateWindow">
                <el-form label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="角色ID" prop="roleId">
                        <el-input v-model="ruleForm.roleId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="ruleForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="roleRemark">
                        <el-input v-model="ruleForm.roleRemark"></el-input>
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
                    prop="roleId"
                    label="角色ID"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="roleName"
                    label="角色名称"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="roleRemark"
                    label="备注"
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
                               @click="updateWindow = true,editRole(scope.$index,scope.row,tableData)">编辑
                    </el-button>
                    <el-button size="small" type="text" @click="deleteRole(scope.row)">删除</el-button>
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
            editRole(index, row, tableData) {
                this.ruleForm.updateData = JSON.parse(JSON.stringify(this.ruleForm));
                this.ruleForm.roleId = tableData[index].roleId
                this.ruleForm.roleName = tableData[index].roleName
                this.ruleForm.roleRemark = tableData[index].roleRemark
            },
            /*修改表单*/
            updateForm() {
                axios.put("http://localhost:8181/Role/updateRole", {
                    roleId: this.ruleForm.roleId,
                    roleName: this.ruleForm.roleName,
                    roleRemark: this.ruleForm.roleRemark,
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("修改成功！", window.location.href = "/roleManager");
                    } else {
                        alert("修改失败！")
                    }
                })
            },
            /*分页开始*/
            page(currentPage) {
                const _this = this
                axios.get('http://localhost:8181/Role/getAllRoles/' + currentPage + '/4')
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
                        axios.post("http://localhost:8181/Role/addRole", this.ruleForm).then(function (resp) {
                            if (resp.data == 1) {
                                alert("添加成功！", window.location.href = "/roleManager");

                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            /*删除方法*/
            deleteRole(row) {
                const _this = this
                axios.delete("http://localhost:8181/Role/delRoleById/" + row.roleId).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/roleManager");
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，该角色下有关联信息，不可以删除哦！');
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var informData = new FormData();
                        informData.append('roleName', this.formInline.roleName),
                            axios.post("http://localhost:8181/Role/getAllRoles/1/4/", informData).then(function (resp) {
                                _this.tableData = resp.data.list
                                _this.total = resp.data.total
                            });
                    } else {
                        return false;
                    }
                });
            },
            /*批量删除方法*/
            delArray() {
                const checkedList = new Array();
                const _this = this;
                const Qs = require('qs');
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    checkedList.push(this.multipleSelection[i].roleId);
                }
                axios.delete("http://localhost:8181/Role/delRoles", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/RoleManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中员工信息有关联信息，不可以删除哦！');
                })
            },

        },
        created() {
            const _this = this
            axios.get("http://localhost:8181/Role/getAllRoles/1/4")
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
                ruleForm: {
                    roleId: '',
                    roleName: '',
                    roleRemark: '',
                    updateData: [{
                        roleId: '',
                        roleName: '',
                        roleRemark: ''
                    }]
                },
                formInline: {
                    empName: '',
                    account: '',
                    roleData: [{
                        roleId: '',
                        roleName: '',
                    }],
                    deptData: [{
                        deptId: '',
                        deptName: ''
                    }],
                    empWorkTime: '',
                },
            }
        }
    }
</script>

<style scoped>

</style>