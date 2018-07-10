<template>
<div class="container">
    <EsunHeader v-bind:iscenter="true" v-bind:ismenu="false" v-bind:headername="header" v-bind:goback="back">
    </EsunHeader>
    <div class="mui-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                用户名:{{name}}
            </li>
            <li class="mui-table-view-cell">
                当前域:{{domainNow}}
            </li>
            <li class="mui-table-view-cell">
                <select v-model.trim='domainNow' @change="selChg">		<option v-for='(item ,key) in domains' v-bind:key='key'>{{item}}</option>		</select>
            </li>
            <li class="mui-table-view-cell" @click="chkDebug">
                上传本地日志
                <div v-bind:class="{'mui-switch':true,'mui-active':chk}" >
                    <div class="mui-switch-handle"></div>
                </div>
            </li>
        </ul>
        <ul class="mui-table-view" style="margin-top: 25px;">
            <li class="mui-table-view-cell">
                <a style="text-align: center;color: #FF3B30;" @click="loginOut">
                        退出登录
                        </a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import mui from "../../assets/js/mui.min"
import app from "../../assets/js/app"
export default {
    data: function () {
        return {
            header: '用户中心',
            name: '',
            chk: false,
            domainNow: '',
            domains: [],
            upComponent: null
        }
    },
    methods: {
        selChg: function () {
            localStorage.setItem("domainNow", this.domainNow)
        },
        back: function () {
            this.$router.go(-1)
        },
        loginOut: function () {
            //如果退出登陆，那么销毁前一个组件
            this.$destroy();
            this.$store.state.upComponent.$destroy();
            this.$router.replace('/login')
        },
        chkDebug() {
            if (!this.chk) {
                this.chk = true
                this.ajaxChk()
            }else{
                return 
            }
        },
        ajaxChk() {
            app.log('启用debug')
            this.ajaxApiLog()
        },
        ajaxApiLog() {
            let that = this 
            setTimeout(() => {
                that.chk = false
                mui.toast('日志上传完毕！')
            }, 5000);
        }
    },
    created: function () {
        this.name = app.userMsg().userid;
        this.domainNow = app.domainNow();
        this.domains = app.userMsg().domains.map(function (value, index) {
            return value;
        })
    }
}
</script>

<style scoped>
.tbody-main p {
    margin-left: 10%;
}

.mui-bar-nav~.mui-content {
    padding-top: 50px;
}
</style>
