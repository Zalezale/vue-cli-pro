<template>
    <div class="blue">
			<div class="mwhite"></div>
			<div class="myF">
				<div class="wel">Welcome to</div>
				<div class="esun">Esun</div>
				<div class="please">please sign to continue</div>
				<div class="input-Vfield" style="margin-left: 0px;">
					<input id="UserId" type="text" placeholder="账号" v-model.trim="username" style="margin-left: 0% !important;padding-left: 0 !important;">
					<span></span>
				</div>
				<div class="input-Vfield success input-Vfield-icon" style="margin-left: 0px;">
					<input id="passWord" type="password" v-model.trim="password" placeholder="密码">
					<span></span><i class="ion-android-done"></i>
				</div>
				
			</div>
			<div class="login-btn-bg mlogin">
					<button type="button" @tap="login" id='loginBtn' class="mui-btn mui-btn-whilte mui-btn-outlined login-btn flogin" >登录</button>
			</div>
			<div class="mver">
				版本号：0.0.1
			</div>
			<div class="mve">
				版权所属：上海
			</div>
		</div>
</template>
<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
import logo from "../../assets/img/logo1.jpg";
mui.plusReady(function() {
  plus.screen.lockOrientation("portrait-primary");
  //   解决软键盘弹出遮挡input
  window.addEventListener("resize", function() {
    if (document.activeElement.tagName == "INPUT") {
      window.setTimeout(function() {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  });
});
export default {
  data: function () {
        return {
            detail: {
                sessionid: '',
                userid: '',
                corp: "",
                domain: "",
                domains: [],
            },
            title: '',
            subtitle:'',
            version: '',
            username: '',
            password: '',
            loginStatus: "登陆",
            showProcess: false,
            mask: false,
        }
    },
    methods: {
        login: function () {
            var that = this
            if (!that.username || !that.password) {
                mui.toast('请输入完用户名和密码');
                return;
            }
            document.querySelector('#loginBtn').style.background = "red"
            that.ajaxUpdate().then(function (data) {
                that.sucUpdate(data);
            }, function (data) {
                that.fail(data)
            })
        },
        loginProcess: function () {
            var that = this;
            that.ajaxClear().then(function (data) {
                return that.ajaxLogon();
            }).then(function (data) {
                that.sucLogin(data) 
                return that.ajaxDomain();
            }).then(function (data) {
                that.sucGetDomain(data)
                return that.ajaxMenu()
            }).then(function (data) {
            that.sucGetMenu(data) 
            }).catch((err)=>{
              typeof err === 'object' ? that.fail(err):that.fail(err,4)
            })
        },
        sucUpdate: function (e) {
            var that = this;
            var rtdt = JSON.parse(e.d);
            if (rtdt.canpass == 'false') {
                mui.alert('服务器APK文件已删除,请联系管理员.', '提示');
                return;
            }
            var isNeedUpdate = rtdt.state.toLowerCase();
            var versionApi = rtdt.mark.toUpperCase();
            if (isNeedUpdate = 'yes' && versionApi != that.version.toUpperCase()) {
                var btnArray = ['否', '是'];
                mui.confirm('存在新版本，是否更新', '提示信息', btnArray, function (e) {
                    if (e.index == 1) {
                        that.downloadAPK()
                        return;
                    } else {
                        that.loginProcess();
                    }
                });
            } else {
                that.loginProcess();
            }
        },
        sucLogin: function (data) {
            var rtdt = JSON.parse(data.d);
            if (rtdt.canLogon == 'false') {
                mui.alert(rtdt.errormessage, '提示');
                throw 'sucLogin'
            }
            app.log('logonSc')
        },
        sucGetDomain: function (data) {
            var that = this
            var rtdt = JSON.parse(data.d);
            if (rtdt.canpass == 'false') {
                mui.alert(rtdt.errormessage ? rtdt.errormessage : '未知错误', '后台提示');
                return 4;
            }
            var rtDomain = rtdt.rtdtbrdomain;
            if (!rtDomain.length) {
                mui.alert('用户未分配域.', '提示');
               throw new Error('sucGetDomain')
            }
            that.detail.domains = rtDomain.map(function (item) {
                return item.DTusrdomref_domain.toLowerCase();
            });
            app.log('DomainSc')
        },
        sucGetMenu: function (data) {
            var that = this;
            var rtdt = JSON.parse(data.d);
            if (rtdt.canpass == 'false') {
                mui.alert(rtdt.errormessage ? rtdt.errormessage : '未知错误', '后台提示');
                throw new Error('sucGetMenu')
            }
            var a = rtdt.rtdtsearchdet;
            var userPermissonAry = [];
            if (a) {
                for (var i = 0, len = a.length; i < len; i++) {
                    if (a[i].searchNbr.indexOf('110') === 0) {
                        var obj = {
                            id: a[i].SearchProgramID,
                            label: a[i].searchLabel
                        }
                        userPermissonAry.push(obj);
                    }
                }
            }

            that.detail.permissions = userPermissonAry;
            that.fail("页面跳转之后页面恢复", 4)
            localStorage.setItem('userMsg', JSON.stringify(that.detail));
            that.$router.push('/menu')
        },
        ajaxUpdate: function () {
            this.mask = true
            this.loginStatus = "校验更新"
            return new Promise(function (suc, err) {
                app.log('update')
                var data = {};
                mui.ajax({
                    type: "post",
                    url: global.context.webUrl + '/autoUpdate',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
                    },
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json,charset=UTF-8',
                    success: function (e) {
                        suc(e)
                    },
                    error: function (xhr, type, errorThrown) {
                        err(xhr);
                    }
                });
            })
        },
        ajaxClear: function () {
            var that = this;
             this.loginStatus = "清除session"
            return new Promise(function (suc, err) {
                that.detail.sessionid = parseInt(new Date().getTime()).toString() + (parseInt(Math.random() * 10000) + 1).toString();
                that.detail.userid = that.username;
                that.detail.corp = ""
                that.detail.domain = ""
                that.detail.domains = []
                app.log("clear")
                var data = {
                    userid: that.detail.userid,
                    corp: that.detail.corp,
                    seesionID: that.detail.sessionid,
                    killMe: false,
                }
                mui.ajax({
                    type: "post",
                    url: global.context.webUrl + '/clearUserStatID',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
                    },
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json,charset=UTF-8',
                    success: function (e) {
                        suc(e)
                    },
                    error: function (xhr, type, errorThrown) {
                        err(xhr);
                    }
                });
            })
        },
        ajaxLogon: function () {
            var that = this;
             this.loginStatus = "校验登陆"
            return new Promise(function (suc, err) {
                app.log("logon")
                var data = {
                    userid: that.detail.userid,
                    corp: that.detail.corp,
                    userPassword: that.password,
                    seesionID: that.detail.sessionid,
                    userLang: '',
                };
                mui.ajax({
                    type: "post",
                    url: global.context.webUrl + '/logon',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
                    },
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json,charset=UTF-8',
                    success: function (e) {
                        suc(e)
                    },
                    error: function (xhr, type, errorThrown) {
                        err(xhr);
                    }
                });
            })
        },
        ajaxDomain: function () {
            var that = this;
             this.loginStatus = "获取域"
            return new Promise(function (suc, err) {
                app.log("domain")
                var data = {
                    userid: that.detail.userid,
                    corp: that.detail.corp,
                    seesionID: that.detail.sessionid,
                };
                mui.ajax({
                    type: "post",
                    url: global.context.webUrl + '/GetDtBrUserDomain',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
                    },
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json,charset=UTF-8',
                    success: function (e) {
                        suc(e);
                    },
                    error: function (xhr, type, errorThrown) {
                        err(xhr)
                    }
                });
            })
        },
        ajaxMenu: function () {
            var that = this;
             this.loginStatus = "获取权限"
            return new Promise(function (suc, err) {
                app.log("menu")
                var data = {
                    userid: that.detail.userid,
                    corp: that.detail.corp,
                    domain: that.detail.domain,
                    seesionID: that.detail.sessionid,
                    searchMenu: '',
                    language: 'ch',
                };
                mui.ajax({
                    type: "post",
                    url: global.context.webUrl + '/GetDtSearchMenuweb',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("accept", "application/json");
                        xhr.setRequestHeader("Content-Type", "application/json");
                    },
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json,charset=UTF-8',
                    success: function (e) {
                        suc(e);
                    },
                    error: function (xhr, type, errorThrown) {
                        err(xhr);
                    }
                });
            })
        },

        downloadAPK: function () {
            var that = this
            that.showProcess = true;
            var url = global.context.downloadUrl;
            var dtask = plus.downloader.createDownload(url, {}, function (d, status) {
                if (status == 200) { // 下载成功
                    var path = d.filename;
                    path = path.substring(0, path.length - 4) + ".apk"
                    plus.runtime.install(path); // 安装下载的apk文件
                } else { //下载失败
                    mui.alert("下载失败.", "提示");
                    that.showProcess = false
                    that.fail('下载', 4)
                }
            });
            dtask.addEventListener("statechanged", function () {
                var downloadpercent = parseInt(dtask.downloadedSize / dtask.totalSize * 100);
                that.$refs.progress.setAttribute('value', downloadpercent)
                if (downloadpercent === 100) {
                    mui.toast('下载成功.');
                    that.showProcess = false;
                    that.fail('下载', 4)
                }
            }, true);
            dtask.start();
        },
        //将ajax的失败回掉与业务的失败回掉放到一起处理
        fail: function (a, type) {
            document.querySelector('#loginBtn').style.background = "skyblue"
            this.mask = false;
            this.loginStatus = '登陆'
            type !== 4 && app.fail(a)
        }
    },
    created: function () {
        this.title = global.context.title;
        this.version = global.context.version
        this.username= global.context.username
        this.password=global.context.password
        this.subtitle=global.context.subTitle
        this.img = logo
        app.init(this)
    }
};
</script>

<style scoped>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}

.input-Vfield input {
  background-color: transparent;
  border: none;
  border-radius: 0;
  height: 35px;
  width: 100%;
  padding: 0;
  margin-bottom: 0px;
  box-shadow: none;
  outline: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.input-Vfield {
  position: relative;
  width: auto;
  margin: 20px 50px;
  /* background-color: #007AFF; */
}
.input-Vfield input + span {
  position: absolute;
  top: 100%;
  left: 0;
  display: inline-block;
  max-width: 100%;
  z-index: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #d9d9d9;
}

.blue {
  height: 100rem;
  background: #2c2787;
}

.mwhite {
  position: fixed;
  top: 15rem;
  left: -8rem;
  width: 25rem;
  height: 25rem;
  background: white;
  border-radius: 40px;
  padding-top: 10rem;
  transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  box-shadow: 5px 5px 2.5px #888888;
}

.myF {
  position: fixed;
  top: 16rem;
  left: 2rem;
}

.wel {
  font-size: 1.1rem;
  padding-bottom: 0.3rem;
}

.esun {
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 0.3rem;
}

.please {
  padding-top: 0.4rem;
  font-size: 0.8rem;
  padding-bottom: 1.4rem;
}
.login-btn-bg {
  width: 50%;
  padding-top: 5%;
  text-align: center;
}

.login-btn-bg button {
  width: 70%;
  height: 40px;
  border-radius: 20px;
  margin: 0 6%;
}
.mlogin {
  position: fixed;
  top: 30rem;
  left: 11.5rem;
}
.flogin {
  background: red;
  color: white;
  font-weight: 500;
  font-size: 1.3rem;
  box-shadow: 2px 2px 1px #888888;
}
.mver {
  position: fixed;
  top: 35rem;
  left: 2rem;
  font-size: 0.9rem;
}
.mve {
  position: fixed;
  top: 34rem;
  left: 2rem;
  font-size: 0.9rem;
}
</style>


