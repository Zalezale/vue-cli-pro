<template>
<div
    class="container"
    v-cloak
>
    <EsunHeader
        v-bind:ismenu="false"
        v-bind:iscenter="false"
        v-bind:headername="header"
        v-bind:goback="back"
        v-bind:usercenter="gousercenter"
    ></EsunHeader>
        <div class="content">
            <div v-show="showForm">
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>供应商</label>
                        <input
                            v-model.trim="supplier"
                            type="text"
                            class="mui-input-clear"
                            placeholder="请输入供应商"
                            tabindex="-1"
                        />
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>ASN</label>
                        <input
                            v-model.trim="ASNSt"
                            type="text"
                            class="mui-input-clear"
                            placeholder="请输入ASN"
                            tabindex="-1"
                        />
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            v-model.trim="toASN"
                            type="text"
                            class="mui-input-clear"
                            placeholder="请输入ASN"
                            tabindex="-1"
                        />
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>需求日期</label>
                        <input
                            type="date"
                            v-model.trim="needTimeSt"
                            class="mui-input-clear"
                            tabindex="-1"
                        />
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="date"
                            v-model.trim="toNeedTime"
                            class="mui-input-clear"
                            tabindex="-1"
                        />
                    </div>
                </form>
            </div>
            <div
                style="width: 95%;left: 2.5%;height: 1.5rem;background: lightgray;position: fixed;"
                v-show="!showForm"
            >
                <div class="table">
                    <div class="thead">
                        <div class="th th-10-4">ASN号</div>
                        <div class="th th-10-4">零件号</div>
                        <div class="th th-5-1">数量</div>
                    </div>
                </div>
        </div>
        <div
            class="table"
            v-show="!showForm"
        >
            <div class="thead">
                <div class="th th-10-4">ASN号</div>
                <div class="th th-10-4">零件号</div>
                <div class="th th-5-1">数量</div>
            </div>
            <div class="tbody">
                <div
                    class="tr"
                    v-for="(item,index) in res"
                    v-bind:key="index"
                >
                    <div class="td td-10-4">{{item.ASN}}</div>
                    <div class="td td-10-4">{{item.part}}</div>
                    <div class="td td-5-1">{{item.qty}}</div>
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
</template>






<script>
import mui from "../../assets/js/mui.min"
import app from "../../assets/js/app"
export default {
    data: function () {
        return {
            header: 'asn',
            ASNSt: '',
            toASN: '',
            supplier: '',
            res: [],
            showForm: true,
            needTimeSt: '',
            toNeedTime: '',
            mask: false,
        }
    },
    methods: {
        reload: function () {
            this.header = 'asn',
                this.ASNSt = '',
                this.toASN = '',
                this.supplier = '',
                this.showForm = true,
                this.mask = false, this.res.splice(0),
                this.needTimeSt = app.getDate(),
                this.toNeedTime = app.getDate();
        },
        gousercenter: function () {
            app.center(this)
        },
        back: function () {
            app.back(this)
        },
        ok: function () {
            this.ajaxGetDetial()
        },
        cancel: function () {
            if (this.res.length === 0) {
                mui.toast("当前没有需要展示的数据")
                return;
            }
            this.showForm = !this.showForm;
        },
        ajaxGetDetial: function () {
            this.mask = true;
            var that = this;
            this.res.splice(0)
            var data = {
                v_vend: this.supplier,
                v_asn: this.ASNSt,
                v_asn1: this.toASN,
                v_date: this.needTimeSt,
                v_date1: this.toNeedTime,
            };
            app.ajax(data, "xsyasnget", function (data) {
                that.mask = false;
                if (!data) return;
                var table = data.tmpxsyasngetyasnmstr,
                    len = table.length,
                    i = 0;
                if (len === 0) {
                    mui.toast("没有返回有效数据")
                    return;
                }
                for (; i < len; i++) {
                    var obj = {
                        ASN: table[i].tmpxsyasngetyasn_id,
                        part: table[i].tmpxsyasngetyasn_part,
                        qty: table[i].tmpxsyasngetyasn_qty,
                    }
                    that.res.push(obj)
                }
                that.showForm = false;
            }, function (a, b, c) {
                that.mask = false;
            },this,function(){
that.mask = false;
            },null)
        }
    },
    created: function () {
        this.needTimeSt = app.getDate();
        this.toNeedTime = app.getDate();
        app.init(this);
    }
}
</script>


<style scoped>

</style>
