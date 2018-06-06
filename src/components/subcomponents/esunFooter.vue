<template>
<nav
    class="mui-bar mui-bar-tab"
    ref="bottom"
>
    <a
        class="boze"
        @tap="ok"
    >确定</a>
        <a
            class="boze"
            @tap="cancel"
        >取消</a>
            <a
                class="boze"
                @tap="refresh"
            >刷新</a>
                </nav>
</template>


<script>
import mui from "../../assets/js/mui.min"
export default {
    data: function () {
        return {
            ok: this.confirmBtn,
            cancel: this.cancelBtn,
            refreshBtn:this.reloadBtn
        }
    },
    inject:['reload'],
    props: {
        confirmBtn: Function,
        cancelBtn: Function,
        reloadBtn:{
      type: Function,
      required: false
    }
    },
    methods:{
     refresh:function(){
         this.refreshBtn?this.refreshBtn():this.reload();
     }
    },
    created: function () {
        var that = this;
        mui.plusReady(function () {
            that.$refs.bottom.style.top = (plus.display.resolutionHeight - 50) + "px";
        })
    }
}
</script>
