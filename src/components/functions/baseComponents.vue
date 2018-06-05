<template>
<div>
    <div v-show="!showScan">
        <EsunHeader
            v-bind:ismenu="false"
            v-bind:iscenter="false"
            v-bind:headername="header"
            v-bind:goback="back"
            v-bind:usercenter="gousercenter"
        ></EsunHeader>
            <h5>拍照组件</h5>
            <EsunTakePhoto></EsunTakePhoto>
            <h5>扫码组件</h5>
            <input
                type="text"
                placeholder="请扫码"
                v-model="code1"
            />
            <button @click="scan('code1')">扫描1</button>
            <input
                type="text"
                placeholder="请扫码"
                v-model="code2"
            />
            <button @click="scan('cod2')">扫描2</button>
            <input
                type="text"
                placeholder="请扫码"
                v-model="code3"
            />
            <button @click="scan('code3')">扫描3</button>
    </div>
    <router-view v-show="showScan"></router-view>
</div>
</template>








<script>
export default {
    data: function () {
        return {
            header: '基础组件',
            code1: '',
            code2: '',
            code3: '',
            showScan:false
        }
    },
    methods: {
        scan: function (input) {
          this.showScan = !this.showScan
          this.$router.push('/baseComponents/esunScan')
        },
        gousercenter: function () {
            this.$router.push("/usercenter")
        },
        back: function () {
            app.back(this.$router)
        },
    },
    created:function(){
        
    }
}
</script>
