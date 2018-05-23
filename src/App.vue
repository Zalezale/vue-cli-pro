<template>
<div id="app">
    <transition name="slide-fade">
        <router-view></router-view>
    </transition>
</div>
</template>

<script>
export default {
    name: 'App',
    created:function(){
        this.$router.push('/login')
    }
}
</script>

<style <style scoped>
/*!
 * =====================================================
 * App (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.slide-fade {
    position: absolute;
    left: 0;
    right: 0;
}

.slide-fade-enter-active {
    transition: all 1.2s ease;
}

.slide-fade-leave-active {
    transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    left: 0;
    right: 0;
    transform: translateX(50px);
    opacity: 0;
}
</style>
