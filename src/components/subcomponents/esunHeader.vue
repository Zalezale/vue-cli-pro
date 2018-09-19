<template>
    <header id="header" class="mui-bar mui-bar-nav" v-bind:style="{background:activeColor}">
        <a v-if="!menu" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="color: white;" @tap="back"><span></span></a>
        <a v-if="menu" class="mui-action-menu mui-icon  mui-pull-left" style="font-size: 20px;font-weight: 800;color: white;" @tap='clickName'>{{name}}</a>
        <h1 v-if="!menu" class="mui-title" style="color: white;">{{name}}</h1>
        <a v-if="!center" class="mui-action-menu mui-icon mui-icon-right-nav mui-icon-contact mui-pull-right" style="color: white;" @tap="centerfn"></a>
    </header>
</template>

<script>
    import app from "../../assets/js/app"
    import mui from "../../assets/js/mui.min"
    mui.back = function() {
        return
    };
    export default {
        data: function() {
            return {
                name: this.headername,
                back: this.goback,
                centerfn: this.usercenter,
                menu: this.ismenu,
                center: this.iscenter,
                activeColor:this.color
            }
        },
        props: {
            headername: String,
            goback: {
                type: Function,
                required: false
            },
            usercenter: {
                type: Function,
                required: false
            },
            ismenu: Boolean,
            iscenter: Boolean,
            color : String
        },
        methods: {
            clickName() {
                this.$emit('click')
            },
            changeColor(){ 
                setTimeout(() => {
                    console.log("change:   "+this.color)
                    document.getElementById('header').style.background = this.color; 
                }, 1000);
                
            }
        },
        watch:{
            color:function (newColor,oldColor) {
                console.log("new:"+newColor+"  old:  "+oldColor);
                this.activeColor = newColor
            },
            activeColor:function (newColor,oldColor) {
                console.log("new111:"+newColor+"  old111:  "+oldColor);
            }
        },
        created: function() {
            mui.back = function() {
                return;
            }
            if(app.colorNow() == null){
                this.activeColor = 'orange'
            }
            else{
                this.activeColor = app.colorNow();
            }
        },
        
        mounted:function(){
            console.log("activecolor"+this.activeColor);
        }
    }
</script>
