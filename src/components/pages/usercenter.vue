<template>
<div class="container">
    <EsunHeader ref="header" v-bind:color="colorNow" v-bind:iscenter="true" v-bind:ismenu="false" v-bind:headername="header" v-bind:goback="back">
    </EsunHeader>
    <div class="mui-content">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                用户名:{{name}}
            </li>
            <li class="mui-table-view-cell">
                当前域:{{domainNow}}                
                <div id="icon" class="mui-icon mui-icon-arrowdown" @click="popover('selDomain')"></div>                
            </li>
            <li class="mui-table-view-cell" @click="chkDebug">
                上传本地日志
                <div v-bind:class="{'mui-switch':true,'mui-active':chk}" >
                    <div class="mui-switch-handle"></div>
                </div>
            </li>
            <li  class="mui-table-view-cell">一键换肤
                <div id="icon" class="mui-icon mui-icon-arrowdown" @click="popover('selColor')"></div>
            </li>
        </ul>
        <ul class="mui-table-view" style="margin-top: 25px;">
            <li class="mui-table-view-cell">
                <a  style="text-align: center;color: #FF3B30;" @click="loginOut">
                        退出登录
                        </a>
            </li>
        </ul>
    </div>
    <div id="anchor"></div>
    <div class="mui-popover">
        <ul class="mui-table-view" v-show="this.selPopover == 'selDomain'">
            <li class="mui-table-view-cell"  v-for='(item ,key) in domains' v-bind:key='key' @click="selChg(item)">{{item}}</li>
        </ul>
        <ul class="mui-table-view" v-show="this.selPopover == 'selColor'">
            <li class="mui-table-view-cell" v-bind:style="{background:item}"  v-for='(item ,key) in color' v-bind:key='key' @click="selectColor(item)">{{item}}</li>
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
            upComponent: null,
            selPopover:"",
            color:[
                'skyblue',
                'orange',
                'red',
                'black'
            ],
            colorNow:'red'
        }
    },
    methods: {
        popover:function(select){
            this.selPopover = select
            console.log(this.selPopover)
            console.log(select)
            mui('.mui-popover').popover('toggle',document.getElementById("anchor"));
            document.querySelector(".mui-popover-arrow").style.display = "none"
        },
        selChg: function (domain) {
            localStorage.setItem("domainNow", domain)
            this.domainNow = domain
            mui('.mui-popover').popover('hide');
        },
        selectColor:function(color){
            this.colorNow = color;
            console.log(this.colorNow)
            localStorage.setItem("colorNow", color)
            mui('.mui-popover').popover('hide');
            this.$refs.header.changeColor();
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
    mounted: function () {
        this.name = app.userMsg().userid;
        this.domainNow = app.domainNow();
        this.colorNow = app.colorNow();
        this.domains = app.userMsg().domains.map(function (value, index) {
            return value;
        })
        // this.$refs.header.changeColor(); 
        // console.log("mounted"+this.colorNow)
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
#icon{
    position: absolute;
    right: 15px;
}
</style>
