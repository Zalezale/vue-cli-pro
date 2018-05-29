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
                            type="text"
                            v-model.trim="supplierSt"
                            class="mui-input-clear"
                            placeholder="请输入供应商"
                        >
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="text"
                            v-model.trim="toSupplier"
                            class="mui-input-clear"
                            placeholder="请输入供应商"
                        >
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>采购订单</label>
                        <input
                            type="text"
                            v-model.trim="nbrSt"
                            class="mui-input-clear"
                            placeholder="请输入采购订单"
                        >
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="text"
                            v-model.trim="toNbr"
                            class="mui-input-clear"
                            placeholder="请输入采购订单"
                        >
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>需求日期</label>
                        <input
                            type="date"
                            v-model.trim="needTimeSt"
                            class="mui-input-clear"
                        >
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="date"
                            v-model.trim="toNeedTime"
                            class="mui-input-clear"
                        >
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>有效</label>
                        <select
                            v-model.trim='active'
                            style="display:inline-block;width: 50%;"
                        >
                            <option
                                v-for='(item ,key) in aryActive'
                                v-bind:key="key"
                            >{{item}}</option>
                                </select>
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>有效</label>
                        <select
                            v-model.trim='type'
                            style="display:inline-block;width: 50%;"
                        >
                            <option
                                v-for='(item ,key) in aryType'
                                v-bind:key="key"
                            >{{item}}</option>
                                </select>
                    </div>
                </form>
            </div>
            <div
                style="width: 95%;left: 2.5%;height: 1.5rem;background: lightgray;position: fixed;"
                v-show="!showForm"
            >
                <div class="table">
                    <div class="thead">
                        <div class="th th-10-3">零件</div>
                        <div class="th th-10-3">需求日期</div>
                        <div class="th th-5-1">数量</div>
                        <div class="th th-5-1">类型</div>
                    </div>
                </div>
        </div>
        <div
            class="table"
            v-show="!showForm"
        >
            <div
                class="thead"
                style="border-bottom: 3px solid black;"
            >
                <div class="th th-10-3">零件</div>
                <div class="th th-10-3">需求日期</div>
                <div class="th th-5-1">数量</div>
                <div class="th th-5-1">类型</div>
                </div>
                <div class="tbody">
                    <div
                        class="tr"
                        v-for="(item,index) in res"
                        v-bind:key="index"
                    >
                        <div class="td td-10-3">{{item.part}}</div>
                        <div class="td td-10-3">{{item.time}}</div>
                        <div class="td td-5-1">{{item.qty}}</div>
                        <div class="td td-5-1">{{item.type}}</div>
                </div>
                </div>
                </div>
                </div>
                <EsunFooter
                    v-bind:confirmBtn="ok"
                    v-bind:cancelBtn="cancel"
                    v-bind:refreshBtn="refresh"
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
            supplierSt: '',
            needTimeSt: '',
            nbrSt: '',
            toSupplier: '',
            toNeedTime: '',
            toNbr: '',
            aryActive: ["all", 'yes', 'no'],
            active: 'all',
            aryType: ['all', 'F', 'P', ''],
            type: 'all',
            header: "plan",
            res: [],
            mask: false,
            showForm: true,
        }
    },
    methods: {
        gousercenter: function () {
            this.$router.push("/usercenter")
        },
        back: function () {
            app.back(this.$router)
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
        refresh: function () {
            app.reload(this.$router, "/xsplanrp");
        },
        ajaxGetDetial: function () {
            this.mask = true
            var that = this;
            this.res.splice(0)
            var data = {
                v_vend: this.supplierSt,
                v_vend1: this.toSupplier,
                v_po_nbr: this.nbrSt,
                v_po_nbr1: this.toNbr,
                v_date: this.needTimeSt,
                v_date1: this.toNeedTime,
                v_active: this.active,
                v_type: this.type
            };
            app.ajax(data, "xspoplanget", function (data) {
                that.mask = false
                if (!data) return;
                var table = data.tmpxspoplanyfpdet,
                    len = table.length,
                    i = 0;
                if (len === 0) {
                    mui.toast("没有返回有效数据")
                    return;
                }
                for (; i < len; i++) {

                    var obj = {
                        part: table[i].tmpxspoplanyfp_part,
                        time: table[i].tmpxspoplanyfp_sdate.substring(0, table[i].tmpxspoplanyfp_sdate.length - 9),
                        qty: table[i].tmpxspoplanyfp_qty,
                        type: table[i].tmpxspoplanyfp_type,
                    }
                    that.res.push(obj)
                }
                that.showForm = false;
            }, function (a, b, c) {
                that.mask = false
            })
        }
    },
    created: function () {
        this.needTimeSt = app.getDate();
        this.toNeedTime = app.getDate();
    }
}
</script>





<style scoped>

</style>
