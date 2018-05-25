<template>
<header
    class="mui-bar mui-bar-nav"
    style="background: blue;"
>
    <a
        v-if="!menu"
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
        style="color: white;"
        @tap="back"
    ><span></span></a>
        <a v-if="menu"
            class="mui-action-menu mui-icon  mui-pull-left"
            style="font-size: 20px;font-weight: 800;color: white;"
        >{{name}}</a>
        <h1 v-if="!menu" class="mui-title" style="color: white;">{{name}}</h1>
            <a  v-if="!center"
                class="mui-action-menu mui-icon mui-icon-right-nav mui-icon-contact mui-pull-right"
                style="color: white;"
                @tap="centerfn"
            ></a>
                </header>
</template>

<script>
import mui from "../../assets/js/mui.min"
mui.back = function(){return};
export default {
    data: function () {
        return {
            name: this.headername,
            back: this.goback,
            centerfn: this.usercenter,
            menu: this.ismenu,
            center:this.iscenter
        }
    },
    props: {
        headername: String,
        goback: {type:Function,required:false},
        usercenter:{type:Function,required:false},
        ismenu: Boolean,
        iscenter:Boolean
    }
}
</script>
