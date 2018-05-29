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
                        <label>开票清单</label>
                        <input
                            type="text"
                            v-model.trim="v_invoice"
                            class="mui-input-clear"
                            placeholder="请输入开票清单"
                        />
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="text"
                            v-model.trim="v_invoice1"
                            class="mui-input-clear"
                            placeholder="请输入开票清单"
                        />
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>供应商</label>
                        <input
                            type="text"
                            v-model.trim="v_vend"
                            class="mui-input-clear"
                            placeholder="请输入供应商"
                        />
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="text"
                            v-model.trim="v_vend1"
                            class="mui-input-clear"
                            placeholder="请输入供应商"
                        />
                    </div>
                </form>
                <form class="mui-input-group">
                    <div class="mui-input-row">
                        <label>订单</label>
                        <input
                            type="text"
                            v-model.trim="v_nbr"
                            class="mui-input-clear"
                            placeholder="请输入订单"
                        />
                    </div>
                    <div class="mui-input-row">
                        <label>至</label>
                        <input
                            type="text"
                            v-model.trim="v_nbr1"
                            class="mui-input-clear"
                            placeholder="请输入订单"
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
                        <div class="th th-5-4">清单号</div>
                        <div class="th th-5-1">状态</div>
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
                <div class="th th-5-4">清单号</div>
                <div class="th th-5-1">状态</div>
                </div>
                <div class="tbody">
                    <div
                        class="tr"
                        v-for="(item,index) in res"
                        v-bind:key="index"
                    >
                        <div class="td td-5-4">{{item.nbr}}</div>
                        <div class="td td-5-1">{{item.state}}</div>
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
            header: 'ticket',
            v_invoice: '',
            v_invoice1: '',
            v_vend: '',
            v_vend1: '',
            v_nbr1: '',
            v_nbr: '',
            showForm: true,
            res: [],
            mask: false,
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
            app.reload(this.$router, "/xsinvoicerp");
        },
        ajaxGetDetial: function () {
            this.mask = true;
            var that = this;
            this.res.splice(0)
            var data = {
                v_invoice: this.v_invoice,
                v_invoice1: this.v_invoice1,
                v_vend: this.v_vend,
                v_vend1: this.v_vend1,
                v_nbr: this.v_nbr,
                v_nbr1: this.v_nbr1,
            };
            app.ajax(data, "xsinvget", function (data) {
                 that.mask= false;
                if (!data) return;
                var table = data.tmpinvgetyblmstr,
                len = table.length,
                i = 0;
                if (len === 0) {
                    mui.toast("没有返回有效数据")
                    return;
                }
                for (; i < len; i++) {
                    var obj = {
                        nbr: table[i].tmpinvgetybl_nbr,
                        state: table[i].tmpinvgetybl_stat
                    }
                    that.res.push(obj)
                }
                that.showForm = false;
            }, function (a, b, c) {
                that.mask= false;
            })
        }
    },
    created:function(){
           app.init(this);
    }
}
</script>
<style scoped>

</style>

