<template>
    <div id="app">
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#5a5ab2"
        >
            <el-menu-item style="color:#333;">CRM-MANAGE</el-menu-item>
            <el-submenu index="2" style="float: right">
                <template slot="title">欢迎,<v-if t></v-if></template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
        </el-menu>
        <el-container style="height:100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu router :default-openeds="['0', '1']"
                         active-text-color="#ffd04b">
                    <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">
                        <template slot="title">
                            <i :class="item.icon"></i>{{item.name}}
                        </template>
                        <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                                      :class="$route.path==item2.path?'is-active':''"><i :class="item2.icon"></i>{{item2.name}}
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return{}
        }
    }

</script>

<style scoped>

</style>