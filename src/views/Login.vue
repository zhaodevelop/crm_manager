<template>
    <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2"
                 status-icon
                 ref="ruleForm2"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">登录</h3>
            <el-form-item prop="account">
                <el-input type="text"
                          v-model="ruleForm2.account"
                          auto-complete="off"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model="ruleForm2.password"
                          auto-complete="off"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-checkbox
                    v-model="checked"
                    class="rememberme"
            >记住密码
            </el-checkbox>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    username: '',
                    password: '',
                },
                rules2: {
                    username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                    password: [{required: true, message: 'enter your password', trigger: 'blur'}]
                },
                checked: false
            }
        },
        methods: {
            handleSubmit(event) {
                const _this = this
                this.$refs.ruleForm2.validate((valid) => {
                        if (valid) {
                            this.logining = true;
                            var formData = new FormData();
                            formData.append('account', this.ruleForm2.account),
                                formData.append('password', this.ruleForm2.password),
                                axios.post("http://localhost:8181/Employee/login", formData)
                                    .then(function (resp) {
                                        if (resp.data.code == 200) {
                                            _this.logining = false;
                                            sessionStorage.setItem('access-token', JSON.stringify(resp.data.result));
                                            _this.$router.push({path: '/EmployeeManager'});
                                        } else {
                                            _this.logining = false;
                                            _this.$alert('账号或密码有误，请重新输入！', 'info', {
                                                confirmButtonText: 'ok'
                                            })
                                        }
                                    })
                        } else {
                            console.log('error submit!');
                            return false;
                        }
                    }
                )
            }
        }
    }
    ;
</script>
<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
    }

    .login-page {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    label.el-checkbox.rememberme {
        margin: 0px 0px 15px;
        text-align: left;
    }
</style>