<template>
<div
    class="container"
    v-cloak
>
    <div v-show="!useScan">
        <EsunHeader
            v-bind:color = "colorNow"
            v-bind:ismenu="false"
            v-bind:iscenter="false"
            v-bind:headername="header"
            v-bind:goback="back"
            v-bind:usercenter="gousercenter"
        ></EsunHeader>
            <div class="content">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>ASN</label>
                        <input
                            v-model.trim="asn"
                            type="text"
                            class="mui-input-clear"
                            placeholder="请扫描ASN"
                            tabindex="-1"
                            @blur="asnBlur"
                        />
                        <img
                            v-bind:src="scanPng"
                            @click="scan('asn')"
                        >
                    </div>
                    <div class="mui-input-row">
                        <label>BOX</label>
                        <input
                            v-model.trim="box"
                            type="text"
                            class="mui-input-clear"
                            placeholder="请扫描箱号"
                            tabindex="-1"
                            @blur="boxBlur"
                        />
                        <img
                            v-bind:src="scanPng"
                            @click="scan('box')"
                        >
                    </div>
                </form>
                <div class="mui-card">
                    <form class="mui-input-group">
                        <div
                            class="mui-input-row mui-radio mui-left"
                            v-for="(item,index) in types"
                            v-bind:key="index"
                        >
                            <label>{{item.type}}</label>
                            <input
                                name="radio1"
                                type="radio"
                                :checked="item.chk"
                                @click="clickRadio(item)"
                            >
                </div>
                </form>
            </div>
            <div class="table">
                <div class="thead">
                    <div class="th th-10-4">零件号</div>
                    <div class="th th-5-1">需求数量</div>
                    <div class="th th-5-1">扫描数量</div>
                    <div
                        class="th th-5-1"
                        @click="pickAll"
                    >{{!isPickAll?'全选':'撤销'}}</div>
            </div>
            <div class="tbody">
                <div
                    class="tr"
                    v-for="(item,index) in res"
                    v-bind:key="index"
                >
                    <div class="td td-10-4">{{item.tmpxsasndetget_part}}</div>
                    <div class="td td-5-1">{{item.tmpxsasndetget_qty}}</div>
                    <div class="td td-5-1">{{item.tmpxsasndetget_realqty}}</div>
                    <div
                        class="td td-5-0"
                        @click="delQty(item)"
                    ><a><span v-bind:class="{'mui-icon':true,'mui-icon-checkmarkempty':item.tmpxsasndetget_pick}"></span></a></div>
    </div>
    </div>

    </div>
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
            asn: '',
            box: '',
            whichOne: '',
            isPickAll: false,
            types: [{
                type: 'DEL',
                chk: false
            }, {
                type: 'ADD',
                chk: true
            }],
            type: 'ADD',
            res: [],
            scanPng: null,
            useScan: false,
            mask: false,
            colorNow:"orange"
        }
    },
    methods: {
        reload: function () {
            this.mask = false, this.res.splice(0), this.useScan = false, this.type = "ADD", this.asn = "", this.box = "", this.whichOne = "";
        },
        gousercenter: function () {
            app.center(this)
        },
        back: function () {
            app.back(this)
        },
        ok: function () {
            this.delBat()
        },
        cancel: function () {
            let len = this.res.length
            this.res.splice(0, len - 2);
        },
        scan: function (whichOne) {
            this.useScan = true
            this.whichOne = whichOne
        },
        /*
        value:扫描成功后的解析的值
        mode：连续扫描还是单扫
        fn：扫描成功后的回掉函数
        fnOnline:异地登陆的回掉函数        
        */
        scaned: function (value, mode, fn,fnOnline) {
            if (!value) {
                this.useScan = false;
                return;
            }
            if (mode === 0) {
                this.useScan = false;
            }
            if (this.whichOne === 'asn') {
                this.asn = value;
                this.ajaxChkAsn(fn,fnOnline)
            } else {
                this.box = value;
                this.type === "ADD" ? this.ajaxChkBoxAdd(fn,fnOnline) : this.ajaxChkBoxDel(fn, this.getDelJson(),fnOnline)
            }

        },
        clickRadio: function (item) {
            var that = this;
            this.types.forEach(element => {
                if (item === element) {
                    element.chk = true
                    that.type = element.type
                } else {
                    element.chk = false
                }
            });

        },
        asnBlur: function () {
            if (!this.asn) return
            this.ajaxChkAsn()
        },
        boxBlur: function () {
            if (!this.box) return
            this.type === "ADD" ? this.ajaxChkBoxAdd() : this.ajaxChkBoxDel(null, this.getDelJson())
        },
        pickAll: function () {
            var that = this
            this.isPickAll = !this.isPickAll
            this.res.forEach(element => {
                element.tmpxsasndetget_pick = that.isPickAll
            })
        },
        delQty: function (item) {
            if (!item.tmpxsasndetget_pick) {
                item.tmpxsasndetget_pick = true;
            } else {
                item.tmpxsasndetget_pick = false;
            }
        },
        getDelJson: function () {
            var that = this;
            var vjson = '';
            vjson += "{'tmpxsasndetdel_asn':'" + this.asn +
                "','tmpxsasndetdel_vend':'" + '' +
                "','tmpxsasndetdel_ln':'" + 0 +
                "','tmpxsasndetdel_part':'" + '' +
                "','tmpxsasndetdel_box':'" + this.box + "'},";
            vjson = vjson.substr(0, vjson.length - 1);
            return "{'tmpxsasndetdel_mstr':[" + vjson + "]}";
        },
        ajaxChkBoxAdd: function (fn,fnOnline) {
            var that = this
            app.ajax({
                v_asn: this.asn,
                v_box: this.box
            }, "xsasndetadd", function (data) {
                that.mask = false;
                if (!data) return;
                let qty = data.v_qty
                let part = data.v_part
                app.log(qty+'|'+part)
                that.res.every(function (value, index) {
                    if (app.deelData(value.tmpxsasndetget_part, part)) {
                        value.tmpxsasndetget_realqty = value.tmpxsasndetget_realqty + qty
                        return false
                    }
                    return true
                })
                //重新初始化扫码
                fn && fn();
                mui.toast('添加成功')
            }, function (a, b, c) {
                that.mask = false;
                fn && fn();
            }, this, fn || null,fnOnline||null)
        },
        ajaxChkBoxDel: function (fn, delJson,fnOnline) {
            var that = this
            app.ajax({
                tmpxsasndetdelmstr: delJson,
            }, "xsasndetdel", function (data) {
                that.mask = false;
                if (!data) return;
                let qty = data.v_qty
                let part = data.v_part
                that.res.forEach(function (value, index) {
                    if (app.deelData(value.tmpxsasndetget_part, part)) {
                        value.tmpxsasndetget_realqty = value.tmpxsasndetget_realqty - qty
                    }
                    if (value.tmpxsasndetget_pick) {
                        value.tmpxsasndetget_realqty = 0
                        value.tmpxsasndetget_pick = false
                    }
                })
                //重新初始化扫码
                fn && fn();
                mui.toast('删除成功')
            }, function (a, b, c) {
                that.mask = false;
                fn && fn();
            }, this, fn || null,fnOnline||null)

        },
        ajaxChkAsn: function (fn,fnOnline) {
            var that = this;
            that.res.splice(0);
            app.ajax({
                v_asn: this.asn
            }, "xsasndetget", function (data) {
                that.mask = false;
                if (!data) return;
                let table = data.tmpxsasndetgetmstr,
                    len = table.length,
                    i = 0;
                console.log(len)
                if (!len) {
                    mui.toast('数据获取为空')
                    return
                }
                for (; i < len; i++) {
                    let obj = {
                        tmpxsasndetget_asn: table[i].tmpxsasndetget_asn,
                        tmpxsasndetget_ln: table[i].tmpxsasndetget_ln,
                        tmpxsasndetget_vend: table[i].tmpxsasndetget_vend,
                        tmpxsasndetget_vdname: table[i].tmpxsasndetget_vdname,
                        tmpxsasndetget_part: table[i].tmpxsasndetget_part,
                        tmpxsasndetget_desc1: table[i].tmpxsasndetget_desc1,
                        tmpxsasndetget_desc2: table[i].tmpxsasndetget_desc2,
                        tmpxsasndetget_qty: table[i].tmpxsasndetget_qty,
                        tmpxsasndetget_realqty: table[i].tmpxsasndetget_scan_qty,
                        tmpxsasndetget_pick: false
                    }
                    that.res.push(obj)
                }
                console.log(that.res)
                //重新初始化扫码
                fn && fn();
                mui.toast('数据获取成功')
            }, function (a, b, c) {
                that.mask = false;
                fn && fn();
            }, this, fn || null,fnOnline||null)
        },
        delBat: function () {
            var that = this;
            if(that.type==="ADD"){
                mui.toast('当前模式为增加');
                return;
            }
            var vjson = '';
            for (let i = 0, len = this.res.length; i < len; i++) {
                if (this.res[i].tmpxsasndetget_pick) {
                    vjson += "{'tmpxsasndetdel_asn':'" + this.asn +
                        "','tmpxsasndetdel_vend':'" + '' +
                        "','tmpxsasndetdel_ln':'" + 0 +
                        "','tmpxsasndetdel_part':'" + this.res[i].tmpxsasndetget_part +
                        "','tmpxsasndetdel_box':'" + '' + "'},";
                }
            }
            if(vjson===""){
                mui.toast('当前没有需要删除的数量')
                return;
            }
            vjson = vjson.substr(0, vjson.length - 1);
            vjson = "{'tmpxsasndetdel_mstr':[" + vjson + "]}";
            this.ajaxChkBoxDel(null, vjson);
        }
    },
    created: function () {
        this.scanPng = scan
        app.init(this);
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            console.log(" app color:   "+app.colorNow())
            vm.colorNow = app.colorNow();
            console.log("menu  app color:   "+vm.colorNow)
            // vm.$refs.header.changeColor();
            // vm.activeColor = vm.color
        })
    },
}
</script>














<style scoped>
img {
    position: absolute;
    right: 5%;
    height: 36px;
}

.tbody {
    display: block;
    width: 100%;
    height: 200px;
    padding-bottom: 300px;
    overflow: scroll;
}

.tr {
    display: block;
    width: 100%;
    height: 35px;
    line-height: 35px;
    
}

.td-5-0 {
    width: 15%;
    text-align: center
}

.td-5-0 a {
    text-align: center;
    width: 100%;
}

.td-5-0 a span {
    text-align: center;
}
</style>
