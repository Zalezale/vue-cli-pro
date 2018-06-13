<template>
<div @click="location" v-cloak>
    <span v-bind:class="{'mui-icon mui-icon-location':true,'location-active':isActive}"></span><span class="position">{{position}}</span>
</div>
</template>



<script>
export default {
    data: function () {
        return {
            position: '重新定位请点击左侧图标',
            isActive: false,
        }
    },
    methods: {
        getPosition: function () {
            let that = this
            plus.geolocation.getCurrentPosition(function(position){
                that.position = position.addresses
                 that.$emit('getPositions', position.addresses)
            }, function (e) {
               mui.alert(e.message,'前台提示')
            }, {
                geocode: true
            });
        },
        location: function () {
            let that = this
            this.isActive = true;
            setTimeout(function () {
                that.isActive = false
            }, 500)
            this.getPosition()
        }
    },
    created: function () {
        var that = this 
        setTimeout(() => {
        that.getPosition();
        }, 500);
    }

}
</script>




<style scoped>
.position {
    color: orange;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 12px;
}

.location-active {
    color: lightblue;
}
</style>
