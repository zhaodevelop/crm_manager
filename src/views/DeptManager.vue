<template>
    <div>
        <h1>部门管理</h1>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="部门名称" prop="deptName">
                <el-input placeholder="请输入部门名称" style="width: 140px;" size="small"
                          v-model="formInline.deptName"></el-input>
            </el-form-item>
            <el-button type="primary" round size="medium" @click="onsubmit('formInline')">查询</el-button>
            <el-button type="primary" @click="dialogFormVisible = true" round>添加</el-button>
            <el-button type="danger" @click="delArray" round>批量删除</el-button>
        </el-form>
        <!--添加弹窗-->
        <el-row>
            <el-dialog title="新建部门" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="部门名称" prop="deptName">
                        <el-input v-model="ruleForm.deptName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="deptRemark">
                        <el-input v-model="ruleForm.deptRemark"></el-input>
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
            <el-dialog title="修改部门信息" :visible.sync="updateWindow">
                <el-form label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="部门ID" prop="deptId">
                        <el-input v-model="ruleForm.deptId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="部门名称" prop="deptName">
                        <el-input v-model="ruleForm.deptName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="deptRemark">
                        <el-input v-model="ruleForm.deptRemark"></el-input>
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
                    prop="deptId"
                    label="部门ID"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="deptName"
                    label="部门名称"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="deptTime"
                    align="center"
                    label="成立时间"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="deptRemark"
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
                               @click="updateWindow = true,editDept(scope.$index,scope.row,tableData)">编辑
                    </el-button>
                    <el-button size="small" type="text" @click="deleteDept(scope.row)">删除</el-button>
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
            editDept(index, row, tableData) {
                this.ruleForm.updateData = JSON.parse(JSON.stringify(this.ruleForm));
                this.ruleForm.deptId = tableData[index].deptId
                this.ruleForm.deptName = tableData[index].deptName
                this.ruleForm.deptRemark = tableData[index].deptRemark
            },
            /*修改表单*/
            updateForm() {
                axios.put("http://localhost:8181/Department/updateDept", {
                    deptId: this.ruleForm.deptId,
                    deptName: this.ruleForm.deptName,
                    deptRemark: this.ruleForm.deptRemark,
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("修改成功！", window.location.href = "/deptManager");
                    } else {
                        alert("修改失败！")
                    }
                })
            },
            handleClick(row) {
                console.log(row);
            },
            /*分页开始*/
            page(currentPage) {
                const _this = this
                axios.get('http://localhost:8181/Department/getAllDepts/' + currentPage + '/4')
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
                        axios.post("http://localhost:8181/Department/addDept", this.ruleForm).then(function (resp) {
                            if (resp.data == 1) {
                                alert("添加成功！", window.location.href = "/deptManager");

                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            /*删除方法*/
            deleteDept(row) {
                const _this = this
                axios.delete("http://localhost:8181/Department/deleteDeptById/" + row.deptId).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/deptManager");
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，该部门下有关联信息，不可以删除哦！');
                })
            },
            /*多条件查询方法*/
            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var qs = require('querystring')
                        axios.post("http://localhost:8181/Department/getAllDepts/1/4/", qs.stringify(this.formInline)).then(function (resp) {
                            _this.tableData = resp.data.list
                            _this.total = resp.data.total
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /*批量删除方法*/
            delArray() {
                const checkedList = new Array();
                const _this = this;
                const Qs = require('qs');
                const length = this.multipleSelection.length;
                for (let i = 0; i < length; i++) {
                    checkedList.push(this.multipleSelection[i].deptId);
                }
                axios.delete("http://localhost:8181/Department/delDepts", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/DeptManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中员工信息有关联信息，不可以删除哦！');
                })
            },
        },
        created() {
            const _this = this
            axios.get("http://localhost:8181/Department/getAllDepts/1/4")
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
                    deptId: '',
                    deptName: '',
                    deptTime: '',
                    deptRemark: '',
                    updateData: [{
                        deptName: '',
                        deptRemark: ''
                    }]
                },
                deptId: '',
                formInline: {
                    deptName: ''
                },

            }
        }
    }
</script>

<style scoped>

</style>