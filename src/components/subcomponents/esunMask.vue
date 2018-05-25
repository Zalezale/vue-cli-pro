<template>
<div
    class="total_zhebiceng"
    v-show="show"
    v-bind:style="{top:top,opacity:opacity}"
>
    <div class="mask_inner" v-show="!login"><span class="mui-spinner active"></span><span class="mask_inner_span">处理中.....</span></div>
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            mymask: this.show,
            login:this.isLogin
        }
    },
    props: {
        show: Boolean,
        isLogin: {type:Boolean,default:false},
    },
    computed: {
        top: function () {
            return this.isLogin ? 0 : 56
        },
        opacity:function(){
            return this.isLogin?0.899:0.8999
        }
    }
}
</script>

<style scoped>

</style>
