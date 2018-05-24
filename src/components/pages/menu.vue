<template>
<div
    class="container"
    v-cloak
>
    <esunHeader
        v-bind:iscenter="false"
        v-bind:ismenu="true"
        v-bind:headername="name"
        v-bind:usercenter='center'
    >
        </esunHeader>

        <div class="content">

            <div
                class="iconbtn"
                v-for="(item,index) in permissions"
                @tap="clkImgBtn(item)"
                v-show="item.show"
                v-bind:key="index"
            >
                <img v-bind:src="item.img" />
                <span>{{item.name}}</span>
        </div>
        </div>
        <div
            class="popover-bg"
            v-show="showDomainsDiv"
        >
            <div class="popover-inner">
                <div class="title">
                    请选择作用域
                </div>
                <div
                    class="mui-card"
                    style="margin-top: 5%;box-shadow:none"
                >
                    <form class="mui-input-group">
                        <div
                            v-for='(item,index) in domains'
                            class="mui-input-row mui-radio mui-left"
                            v-bind:key="index"
                        >
                            <label>{{item}}</label>
                            <input
                                name="radio"
                                :value='item'
                                v-model='domain'
                                type="radio"
                            >
            </div>
            </form>
            </div>
            <div class="btn-bg ">
                <button
                    @click='seledDomain'
                    type="button"
                    class="mui-btn mui-btn-whilte mui-btn-outlined"
                    style="color: white;background-color: #007AFF;border: 1px solid ;"
                >确认</button>
            </div>
            </div>
            </div>
            </div>
</template>



<script>
import mui from "../../assets/js/mui.min"
import app from "../../assets/js/app"
import asn from "../../assets/img/ASNSc.png"
import plan from "../../assets/img/planSc.png"
import ticket from "../../assets/img/tickSc.png"
import esunHeader from "../subcomponents/header"
export default {
    components: {
        esunHeader
    },
    data: function () {
        return {
            name: "菜单",
            domain: "",
            domains: [],
            permissions: [{
                id: "xsplanrp",
                name: "",
                img: plan,
                show: false
            }, {
                id: "xsasnrp",
                name: "",
                img: asn,
                show: false
            }, {
                id: "xsinvoicerp",
                name: "",
                img: ticket,
                show: false
            }],
            showDomainsDiv: true,
        }
    },
    methods: {
        center: function () {
            this.$router.push('/usercenter')
        },
        clkImgBtn: function (item) {
            switch (item.id) {
                case "xsplanrp":
                    item.id = "xsplanrp.html"
                    break;
                case "xsasnrp":
                    item.id = "xsasnrp.html"
                    break;
                case "xsinvoicerp":
                    item.id = "xsinvoicerp.html"
                    break;
            }
            app.openWindow({
                url: item.id,
                id: item.id,
                extras: {
                    name: item.name
                }
            })
        },
        seledDomain: function () {
            if (!this.domain) {
                mui.alert("请选择一个域");
                return;
            }
            this.showDomainsDiv = false;
            var domainNow = ""
            domainNow = this.domain;
            console.log(domainNow)
            localStorage.setItem('domainNow', domainNow)
        },
    },
    created: function () {
        var that = this;
        var domainNow = "";
        app.userMsg().domains.forEach(function (value, index) {
            that.domains.push(value);
        })
        console.log(that.domains)
        
        if (that.domains.length === 1) {
            that.domain = that.domains[0];
            domainNow = that.domain;
            that.showDomainsDiv = false;
            localStorage.setItem('domainNow', domainNow)
        }
       
        app.userMsg().permissions.forEach(function (value, index) {
            that.permissions.forEach(function (value1, index1) {
                if (value1.id === value.id) {
                    value1.name = value.label;
                    value1.show = true;
                }
            })
        })
    }
}
</script>



<style scoped>
/*!
 * =====================================================
 * menu (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */
 
 .content {
    margin-top: 54px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.iconbtn {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    width: 30%;
}

.iconbtn img {
    width: 4rem;
}

.iconbtn span {
    font-size: 0.7rem;
}

.popover-bg {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(101, 112, 107, 0.2);
}

.popover-bg .popover-inner {
    width: 70%;
    position: absolute;
    left: 15%;
    top: 15%;
    bottom: 30%;
    z-index: 101;
    background-color: #FFFFFF;
    border-radius: 5%;
    opacity: 1;
}

.popover-bg .title {
    width: 100%;
    border-bottom: 2px solid #007AFF;
    text-align: center;
    padding-top: 5%;
    padding-bottom: 5%;
}

.popover-bg .btn-bg {
    width: 100%;
    padding-top: 5%;
    text-align: center;
}

.popover-bg .btn-bg button {
    width: 70%;
    height: 40px;
    border-radius: 20px;
    margin: 0 6%;
}

</style>
