<template>
<div class="container">
    <esunHeader
        v-bind:iscenter="true"
        v-bind:ismenu="false"
        v-bind:headername="header"
        v-bind:goback="back"
    >
        </esunHeader>
        <div class="mui-content" >
            <ul class="mui-table-view">
                <li class="mui-table-view-cell">
                    用户名:{{name}}
                </li>
                <li class="mui-table-view-cell">
                    当前域:{{domainNow}}
                </li>
                <li class="mui-table-view-cell">
                    <select v-model.trim='domainNow' @change="selChg">
		<option v-for='(item ,key) in domains' v-bind:key='key'>{{item}}</option>
		</select>
                </li>
            </ul>
            <ul
                class="mui-table-view"
                style="margin-top: 25px;"
            >
                <li class="mui-table-view-cell">
                    <a
                        style="text-align: center;color: #FF3B30;"
                        @click="loginOut"
                    >
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
import esunHeader from '../subcomponents/header'
export default {
    data: function () {
        return {
            header:'用户中心',
            name: '',
            domainNow: '',
            domains: [],
        }
    },
    components:{esunHeader},
    methods: {
        selChg:function(){
localStorage.setItem("domainNow",this.domainNow)
        },
        back: function () {
            this.$router.push('/menu')
        },
        loginOut: function () {
            this.$router.push('/login')
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
.mui-bar-nav~.mui-content{
    padding-top: 50px;
}

</style>
