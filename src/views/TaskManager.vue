<template>
    <div>
        <h1>任务管理</h1>
        <!--多条件查询-->
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item label="主题" prop="taskTitle">
                <el-input placeholder="请输入任务主题" style="width: 140px;" size="small"
                          v-model="formInline.taskTitle"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.taskState" placeholder="请选择状态" style="width: 140px;" size="small">
                    <el-option label="未完成" value="0"></el-option>
                    <el-option label="进行中" value="1"></el-option>
                    <el-option label="已完成" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="创建人" prop="taskBuilder">
                <el-input placeholder="请输入创建人名称" style="width: 140px;" size="small"
                          v-model="formInline.taskBuilder"></el-input>
            </el-form-item>
            <el-form-item label="任务时间" prop="startTime">
                <el-date-picker
                        v-model="formInline.startTime"
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
            <el-button type="primary" @click="dialogFormVisible = true" round size="medium">添加</el-button>
        </el-form>
        <!--添加按钮-->
        <el-row>
            <el-dialog title="新建任务信息" :visible.sync="dialogFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="任务主题" prop="taskTitle">
                        <el-input type="input" v-model="ruleForm.taskTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="任务内容" prop="taskInfo">
                        <el-input type="textarea" v-model="ruleForm.taskInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间" prop="startTime">
                        <el-date-picker
                                v-model="ruleForm.startTime"
                                type="date"
                                style="width: 140px;" size="small"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间" prop="endTime">
                        <el-date-picker
                                v-model="ruleForm.endTime"
                                type="date"
                                style="width: 140px;" size="small"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="创建人" prop="taskBuilder.empName">
                        <el-select v-model="ruleForm.taskBuilder.empId" placeholder="请选择创建人" @focus="empFocus"
                        >
                            <el-option v-for="item in ruleForm.buildData"
                                       :key="item.empId"
                                       :value="item.empId"
                                       :label="item.empName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="执行人" prop="taskActor.empName">
                        <el-select v-model="ruleForm.taskActor.empId" placeholder="请选择负责人" @focus="empFocus"
                        >
                            <el-option v-for="item in ruleForm.actData" :key="item.empId" :label="item.empName"
                                       :value="item.empId"
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
            <el-dialog title="修改任务信息" :visible.sync="updateWindow">
                <el-form label-width="100px" class="demo-ruleForm"
                         size="mini">
                    <el-form-item label="任务ID" prop="taskId">
                        <el-input v-model="ruleForm.taskId" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="任务主题" prop="taskTitle">
                        <el-input type="input" v-model="ruleForm.taskTitle"></el-input>
                    </el-form-item>
                    <el-form-item label="任务内容" prop="taskInfo">
                        <el-input type="textarea" v-model="ruleForm.taskInfo"></el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="taskState">
                        <el-radio-group v-model="ruleForm.taskState">
                            <el-radio  value="0" :label="0">未完成</el-radio>
                            <el-radio  value="1" :label="1">执行中</el-radio>
                            <el-radio value="2"  :label="2">已完成</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="创建人" prop="taskBuilder.empName">
                        <el-select v-model="ruleForm.taskBuilder.empId" placeholder="请选择创建人" @focus="empFocus"
                        >
                            <el-option v-for="item in ruleForm.buildData"
                                       :key="item.empId"
                                       :value="item.empId"
                                       :label="item.empName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="执行人" prop="taskActor.empName">
                        <el-select v-model="ruleForm.taskActor.empId" placeholder="请选择负责人" @focus="empFocus"
                        >
                            <el-option v-for="item in ruleForm.actData" :key="item.empId" :label="item.empName"
                                       :value="item.empId"
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
                    prop="taskId"
                    label="任务Id"
                    align="center"
                    width="center">
            </el-table-column>

            <el-table-column
                    prop="taskBuilder.empName"
                    align="center"
                    label="创建者"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="taskActor.empName"
                    align="center"
                    label="执行者"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="taskTitle"
                    label="任务主题"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="taskInfo"
                    label="任务信息"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="taskState"
                    label="任务执行状态"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="startTime"
                    label="任务创建时间"
                    align="center"
                    width="center">
            </el-table-column>
            <el-table-column
                    prop="endTime"
                    align="center"
                    label="任务结束时间"
                    width="center">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small"
                               @click="updateWindow = true,editTask(scope.$index,scope.row,tableData)">编辑
                    </el-button>
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
                axios.get('http://localhost:8181/Task/getAllTasks/' + currentPage + '/4')
                    .then(function (resp) {
                        _this.tableData = resp.data.list
                        _this.total = resp.data.total
                    })
            },
            /*删除任务*/
            deleteTask(row) {
                const _this = this
                axios.delete("http://localhost:8181/Task/deleteTask/" + row.taskId).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/TaskManager");
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
                    checkedList.push(this.multipleSelection[i].taskId);
                }
                axios.delete("http://localhost:8181/Task/delTasks", {
                    params: {
                        ids: checkedList,
                    },
                    paramsSerializer: params => {
                        return Qs.stringify(params, {indices: false})
                    }
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("删除成功！", window.location.href = "/TaskManager")
                    }
                }).catch(error => {
                    this.$message.error('很抱歉，当前选中任务信息有关联信息，不可以删除哦！');
                })
            },
            /*状态下拉框*/
            empFocus() {
                const _this = this
                this.axios.get("http://localhost:8181/Task/getAllTasks")
                    .then(function (resp) {
                        _this.tableData = resp.data
                    })
            },
            /*提交表单*/
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var formData = new FormData();
                        formData.append('taskTitle', this.ruleForm.taskTitle),
                            formData.append('taskInfo', this.ruleForm.taskInfo),
                            formData.append('startTime', this.ruleForm.startTime),
                            formData.append('endTime', this.ruleForm.endTime),
                            formData.append('taskBuilder.empId', this.ruleForm.taskBuilder.empId),
                            formData.append('taskActor.empId', this.ruleForm.taskActor.empId),

                            axios.post("http://localhost:8181/Task/addTask", formData).then(function (resp) {
                                if (resp.data == 1) {
                                    alert("添加成功！", window.location.href = "/TaskManager");
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            editTask(index, row, tableData) {
                this.ruleForm.updateData = JSON.parse(JSON.stringify(this.ruleForm));
                this.ruleForm.taskId = tableData[index].taskId
                this.ruleForm.taskTitle = tableData[index].taskTitle
                this.ruleForm.taskInfo = tableData[index].taskInfo
                this.ruleForm.taskState = tableData[index].taskState
                this.ruleForm.startTime = tableData[index].startTime
                this.ruleForm.endTime = tableData[index].endTime
            },
            /*修改表单*/
            updateForm() {
                axios.put("http://localhost:8181/Task/updateTask", {
                    taskId: this.ruleForm.taskId,
                    taskTitle: this.ruleForm.taskTitle,
                    taskInfo: this.ruleForm.taskInfo,
                    taskState: this.ruleForm.taskState,
                    startTime: this.ruleForm.startTime,
                    endTime: this.ruleForm.endTime,
                }).then(function (resp) {
                    if (resp.data == 1) {
                        alert("修改成功！", window.location.href = "/TaskManager");
                    } else {
                        alert("修改失败！")
                    }
                })
            },
            /*多条件查询方法*/
            onsubmit(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var qs = require('querystring')
                        axios.post("http://localhost:8181/Task/getMoreAllTasks/1/4/", qs.stringify(this.formInline)
                        ).then(function (resp) {
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
            axios.get("http://localhost:8181/Task/getAllTasks/1/4")
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
                    taskId: '',
                    taskTitle: '',
                    taskInfo: '',
                    startTime: '',
                    endTime: '',
                    taskBuilderId: '',
                    taskActorId: '',
                    taskState: [
                        {value:"0",label:"未完成"},
                        {value:"1",label:"执行中"},
                        {value:"2",label:"已完成"}
                    ],
                    taskBuilder: [{
                        empId: '',
                        empName: ''
                    }],
                    taskActor: [{
                        empId: '',
                        empName: ''
                    }],
                    buildData: [{
                        empId: '',
                        empName: ''
                    }],
                    actData: [{
                        empId: '',
                        empName: ''
                    }],
                },
                formInline: {
                    taskTitle: '',
                    taskState: '',
                    taskBuilder: '',
                    startTime: '',
                    endTime: ''
                },
                rules: {},
                taskData: ''
            }
        }
    }
</script>

<style scoped>

</style>