<template>
<div v-cloak>
    <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
    </div>
    <footer>
        <div
            class="fbt"
            @click="back()"
        >取　 消</div>
<div
    class="fbt"
    @click="scanPicture()"
>从相册选择二维码</div>
    </footer>
    </div>
</template>












<script>
import app from '../../assets/js/app'
export default {
    data: function () {
        return {
            scan: null,
        }
    },
    props: {
        scanStatus: Boolean,
        scanMode: Number, //两种模式，连续扫描与单笔扫描(1与0)
    },
    watch: {
        scanStatus: function () {
            this.scanStatus && this.init()
        }
    },
    methods: {
        back: function () {
            this.$emit('scaned', "",this.scanMode)
            this.scan.close()
        },
        scanPicture: function () {
            var that = this
            plus.gallery.pick(function (path) {
                plus.barcode.scan(path, that.scanSuc, function (error) {
                    plus.nativeUI.alert('无法识别此图片');
                });
            }, function (err) {
                console.log('Failed: ' + err.message);
            });
        },
        scanSuc: function (type, result, file) {
            var that = this;
            switch (type) {
                case plus.barcode.QR:
                    type = 'QR';
                    break;
                case plus.barcode.EAN13:
                    type = 'EAN13';
                    break;
                case plus.barcode.EAN8:
                    type = 'EAN8';
                    break;
                default:
                    type = '其它' + type;
                    break;
            }
            result = result.replace(/\n/g, '');
            if (this.scanMode === 1) {
                that.$emit('scaned', result,this.scanMode, function () {
                    setTimeout(() => {
                        that.scan.start({
                            conserve: false
                        });
                    }, 3000);
                })
            } else {
                this.$emit('scaned', result,this.scanMode)
                this.scan.close()
            }
        },
        init: function () {
            if (!window.plus) return;
            let that = this;
            setTimeout(() => {
                that.scan = new plus.barcode.Barcode('bcid');
                that.scan.onmarked = that.scanSuc;
                that.scan.start({
                    conserve: false
                });
            }, 100);
        }
    },
    created: function () {
        console.log(this.scanMode)
        app.init(this)
    }
}
</script>












<style scoped>
#bcid {
    width: 100%;
    position: absolute;
    top: 0px;
    bottom: 44px;
    text-align: center;
    background: black;
}

.tip {
    color: #FFFFFF;
    font-weight: bold;
    text-shadow: 0px -1px #103E5C;
}

footer {
    width: 100%;
    height: 44px;
    position: absolute;
    bottom: 0px;
    line-height: 44px;
    text-align: center;
    color: #FFF;
}

.fbt {
    width: 50%;
    height: 100%;
    background-color: #FFCC33;
    float: left;
}

.fbt:active {
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
}
</style>
