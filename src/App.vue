<template>
<div id="app">
    <!-- v-if创建销毁的缓存页面是无法刷新的 -->
    <transition
        name="slide-fade"
    >
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        </transition>
        <transition
            name="slide-fade"
            v-if="!needReload"
        >
            <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
            <!-- 非缓存组件刷新 -->
            <router-view v-if="needReload&&!$route.meta.keepAlive"></router-view>
</div>
</template>



<script>
export default {
    name: 'App',
    data: function () {
        return {
            needReload: false,
        }
    },
    provide: function () {
        return {
            reload: this.reload
        }
    },
    methods: {
        reload: function () {
            this.needReload = true;
            this.$nextTick().then(() => {
                this.needReload = false
            })
        }
    },
    created: function () {
        this.$router.push('/login')
    }
}
</script>



 <style scoped>
/*!
 * =====================================================
 * App (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */

/* .slide-fade {
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
} */
</style>
