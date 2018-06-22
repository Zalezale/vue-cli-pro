<template>
<div
    class="container"
    v-cloak
>
    <div v-show="!useScan">
        <EsunHeader
            v-bind:ismenu="false"
            v-bind:iscenter="false"
            v-bind:headername="header"
            v-bind:goback="back"
            v-bind:usercenter="gousercenter"
        ></EsunHeader>
            <div class="content">
                <span>已扫描的箱数：{{res.length}}</span>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>箱号</label>
                        <input
                            v-model.trim="box"
                            type="text"
                            class="mui-input-clear"
                            placeholder="请扫码"
                            tabindex="-1"
                            @blur="boxBlur"
                        />
                        <img
                            v-bind:src="scanPng"
                            @click="scan"
                        >
                    </div>
                </form>
            </div>
            <EsunFooter
                v-bind:confirmBtn="ok"
                v-bind:cancelBtn="cancel"
                v-bind:reloadBtn="reload"
            ></EsunFooter>
                <EsunMask v-bind:show="mask"></EsunMask>
    </div>

    <EsunScan
        v-show="useScan"
        v-bind:scanStatus="useScan"
        v-on:scaned="scaned"
        v-bind:scanMode="1"
    ></EsunScan>
        </div>
</template>










<script>
import mui from "../../assets/js/mui.min"
import app from "../../assets/js/app"
import scan from "../../assets/img/scan.png"
export default {
    data: function () {
        return {
            header: 'ASN扫描',
            box: '',
            res: [],
            scanPng: null,
            useScan: false,
            mask: false,
        }
    },
    methods: {
        reload: function () {
            this.mask = false, this.res.splice(0),this.box='';
        },
        gousercenter: function () {
            app.center(this)
        },
        back: function () {
            app.back(this)
        },
        ok: function () {
        },
        cancel: function () {
            let len = this.res.length
            this.res.splice(0, len - 2);
        },
        scan: function () {
            this.useScan = true
        },
        /*
        value:扫描成功后的解析的值
        mode：连续扫描还是单扫
        fn：扫描成功后的回掉函数        
        */
        scaned: function (value, mode, fn,fnOnline) {
            if (!value) {
                this.useScan = false;
                return;
            }
            if (mode === 0) {
                this.useScan = false;
            }
            this.box = value;
            this.ajaxChk(fn,fnOnline)
        },
        boxBlur: function () {
            if (!this.box) return
            this.ajaxChk()
        },
        ajaxChk: function (fn,fnOnline) {
            var that = this;
            if (that.res.indexOf(that.box.toLowerCase()) !== -1) {
                mui.toast('当前箱号已经扫描')
            }
            var data = {
                v_box: this.box
            };
            app.ajax(data, "xsactbox", function (data) {
                that.mask = false;
                if (!data) return;
                that.res.push(that.box.toLowerCase())
                //重现初始化扫码
                 fn && fn();
                mui.toast('校验成功')
            }, function (a, b, c) {
                that.mask = false;
                fn && fn();
            }, this,fn||null,fnOnline||null)
        }
    },
    created: function () {
        this.scanPng = scan
        app.init(this);
    }
}
</script>






<style scoped>
img {
    position: absolute;
    right: 5%;
    height: 36px;
}

span {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 14px;
}
</style>
