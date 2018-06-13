<template>
<div v-cloak>
    <div v-show="!useScan">
        <EsunHeader
            v-bind:ismenu="false"
            v-bind:iscenter="false"
            v-bind:headername="header"
            v-bind:goback="back"
            v-bind:usercenter="gousercenter"
        ></EsunHeader>
            <h5 style="margin-top:56px;">拍照组件</h5>
            <EsunTakePhoto></EsunTakePhoto>
            <h5>扫码组件</h5>
            <input
                ref="code1"
                type="text"
                placeholder="请扫码"
                v-model="code1"
            />
            <button @click="scan('code1')">扫描1</button>
            <input
                ref="code2"
                type="text"
                placeholder="请扫码"
                v-model="code2"
            />
            <button @click="scan('code2')">扫描2</button>
    </div>
    <EsunScan
    v-show="useScan"
        v-bind:scanStatus="useScan"
        v-on:scaned="scaned"
    ></EsunScan>
     <h5>定位组件</h5>
    <EsunLocation v-on:getPositions="getPositions"></EsunLocation>
    {{'父组件'+position}}
</div>
</template>











<script>
import mui from "../../assets/js/mui.min"
import app from '../../assets/js/app'
export default {
    data: function () {
        return {
            header: '基础组件',
            code1: 'aaa',
            code2: '',
            code3: '',
            useScan: false,
            whichOne: '',
            position:''
        }
    },
    methods: {
        getPositions:function(position){
            console.log(position)
            this.position = position
        },
        scan: function (whichOne) {
            this.useScan = true
            this.whichOne = whichOne
        },
        scaned: function (value) {
            switch (this.whichOne) {
                case 'code1':
                    this.code1 = value;
                    break;
                case 'code2':
                    this.code2 = value;
                    break;
                case 'code3':
                    this.code3 = value;
                    break;
            }
            this.useScan = false
        },
        gousercenter: function () {
            app.center(this)
        },
        back: function () {
            app.back(this)
        },
    },
    created: function () {
        app.init(this);
    }
}
</script>
