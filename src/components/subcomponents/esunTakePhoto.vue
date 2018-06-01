<template>
<div class="img-container">
    <img
        class="img-left"
        v-bind:src="deletePng"
        @tap="cleanHistory"
    />
    <div class="imgs">
        <img
            v-drag
            class="img2"
            v-for="(img,index) in res"
            v-bind:key="index"
            v-bind:src="img.toLocalURL()"
            @click="displayFile(img)"
            @dragend="clearImg(img,index)"
        />
    </div>
    <img
        class="img-right"
        v-bind:src="cameraPng"
        @tap="getImage"
    />
</div>
</template>








<script>
import mui from '../../assets/js/mui.min'
import camera from '../../assets/img/camera.png'
import deletePng from '../../assets/img/delete.png'
export default {
    data: function () {
        return {
            cameraPng: '',
            deletePng: '',
            res: [],
            gentry: null,
        }
    },
    methods: {
        getImage: function () {
            var that = this
            var cmr = plus.camera.getCamera();
            cmr.captureImage(function (p) {
                plus.io.resolveLocalFileSystemURL(p, function (entry) {
                    that.createItem(entry);
                }, function (e) {
                    mui.alert('存文件失败')
                });
            }, function (e) {
                mui.alert('拍照失败')
            }, {
                filename: '_doc/camera/',
                index: 1
            });
        },
        displayFile: function (img) {
            mui.alert('预览', '提示');
        },
        clearImg: function (img,index) {
            var that = this ;
            img.remove(function () {
                mui.alert('删除成功', '前台提示')
                that.res.splice(index,1);
            }, function () {
                mui.alert('删除失败', '前台提示')
            })

        },
        cleanHistory: function () {
            if(this.res.length===0)return;
            this.gentry.removeRecursively(function () {
                console.log('清除成功')
            }, function (e) {
                mui.alert('删除失败')
            });
        },
        createItem: function (p) {
            this.res.push(p)
        },
        updateHistory: function (gentry) {
            var that = this
            var reader = gentry.createReader();
            that.gentry = gentry
            reader.readEntries(function (entries) {
                for (var i in entries) {
                    if (entries[i].isFile) {
                        that.createItem(entries[i]);
                    }
                }
            }, function (e) {
                mui.alert('读取文件失败')
            });
        }
    },
    created: function () {
        var that = this
        mui.plusReady(function () {
            plus.io.resolveLocalFileSystemURL('_doc/', function (entry) {
                entry.getDirectory('camera', {
                    create: true
                }, function (dir) {
                    that.updateHistory(dir);
                }, function (e) {
                    mui.alert('读取目录失败')
                });
            }, function (e) {
                mui.alert('访问本机路径失败')
            });

        })
        that.cameraPng = camera
        that.deletePng = deletePng
    }
}
</script>








<style scoped>
.img-left {
    position: absolute;
    padding: 0.5rem;
    border: 1px solid gainsboro;
    border-radius: 20%;
    top: 10%;
    height: 80%;
    left: 2.5%;
    width: 15%;
    box-shadow: 2px 2px 2px 2px lightgrey;
}

.img-right {
    position: absolute;
    padding: 0.5rem;
    border: 1px solid gainsboro;
    border-radius: 20%;
    top: 10%;
    height: 80%;
    right: 2.5%;
    width: 15%;
    box-shadow: 2px 2px 2px 2px lightgrey;
}

.img2 {
    height: 3rem;
    width: 3rem;
    padding: 0.1rem;
}

.img-container {
    position: relative;
    width: 100%;
    height: 4rem;
    overflow: hidden;
}

.imgs {
    position: relative;
    display: inline-block;
    left: 20%;
    width: 60%;
    height: 3.5rem;
    border-right: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    text-align: center;
    margin-top: 0.25rem;
    white-space: nowrap;
    overflow-x: scroll;
}
</style>
