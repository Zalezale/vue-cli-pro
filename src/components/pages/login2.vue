<template>
<div>
    <div style="height: 100%;width: 100%;z-index: 0;position: fixed;">
			<img src="../../assets/img/loginscreen.png" style="height: 100%;width: 100%" />
		</div>
		<div id="login" style="height: 100%;width: 100%;z-index: ; display: flex;justify-content: center;">
			<div style="height: 4rem;width: 5rem;z-index: 1;position: fixed;left: 12%;top: 1%;">
				<img src="../../assets/img/logo2.png" style="width: 80px;height: 80px" />
			</div>
			<div style="position: fixed;z-index: 1;width: 60%;left: 25%;top: 27%;">
				<div class="mui-input-row" style="border-bottom: 1px solid lightgrey;">
					<label>		<span class="mui-icon mui-icon-person"></span>		</label>
					<input type="text" id="username" placeholder="请输入用户名" v-model="userName">
				</div>
				<div class="mui-input-row" style="border-bottom: 1px solid lightgrey;margin-bottom: 5%;">
					<label>		<span class="mui-icon mui-icon-locked"></span>		</label>
					<input type="password" class="mui-input-password" id="passord" placeholder="请输入密码" v-model="passWord">
				</div>
			</div>
			<div style="height: 10rem;width: 10rem;z-index: 1;margin-top: 100%;">
				<img v-show="login == 0" src="../../assets/img/loginButton.png" style="height: 100%;width: 100%;" @click="clickLoginButton" />
				<img v-show="login == 1" src="../../assets/img/loginButton2.png" style="height: 100%;width: 100%;" />
			</div>
			<div v-show="login == 1" class="spinner" style="z-index: 2;position: fixed;top: 58%;left: 46%;">
				<div class="spinner-container container1">
					<div class="circle1"></div>
					<div class="circle2"></div>
					<div class="circle3"></div>
					<div class="circle4"></div>
				</div>
				<div class="spinner-container container2">
					<div class="circle1"></div>
					<div class="circle2"></div>
					<div class="circle3"></div>
					<div class="circle4"></div>
				</div>
				<div class="spinner-container container3">
					<div class="circle1"></div>
					<div class="circle2"></div>
					<div class="circle3"></div>
					<div class="circle4"></div>
				</div>
			</div>
			<div style="z-index: 1;position: fixed;-webkit-transform:rotate(46deg);top: 83%;left: 10%;color: #695CC6;font-weight: 700;">版本：v 1.0.8</div>
			<div style="z-index: 1;position: fixed;-webkit-transform:rotate(46deg);top: 88%;left: -5%;color: white;font-weight: 500;font-size: 1rem;">版权所属：某某某某某某</div>
		</div>
    </div>
</template>

<script>
import mui from "../../assets/js/mui.min";
import app from "../../assets/js/app";
// import promise from '../../assets/js/mypromise.js'
// import logo from '../../assets/img/logo1.jpg'
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
  data: function() {
    return {
      userName: "",
      passWord: "",
      login: 0,
      global: "http://www.bpmap.cn:8041/WebServiceWebSupply.asmx",
      detail: {
        sessionid: "",
        userid: "",
        corp: "",
        domain: "",
        domains: []
      }
    };
  },
  methods: {
    clickLoginButton: function() {
      var that = this;
      that.login = 1;
      that.detail.sessionid =
        parseInt(new Date().getTime()).toString() +
        (parseInt(Math.random() * 10000) + 1).toString();
      that.detail.userid = that.userName;
      that.detail.corp = "";
      that.detail.domain = "";
      that.detail.domains = [];
      var data1 = {
        userid: that.detail.userid,
        corp: that.detail.corp,
        seesionID: that.detail.sessionid,
        killMe: false
      };
      var data2 = {
        userid: that.detail.userid,
        corp: that.detail.corp,
        userPassword: that.passWord,
        seesionID: that.detail.sessionid,
        userLang: ""
      };
      var data3 = {
        userid: that.detail.userid,
        corp: that.detail.corp,
        seesionID: that.detail.sessionid
      };
      var data4 = {
        userid: that.detail.userid,
        corp: that.detail.corp,
        domain: that.detail.domain,
        seesionID: that.detail.sessionid,
        searchMenu: "",
        language: "ch"
      };
      if (!(that.userName && that.passWord)) {
        mui.toast("请输入用户名及密码");
      } else {
        that
          .ajax(that.global + "/autoUpdate")
          .then(function() {
            return that.ajax(that.global + "/clearUserStatID", data1);
          })
          .then(function() {
            return that.ajax(that.global + "/logon", data2);
          })
          .then(function() {
            return that.ajax(that.global + "/GetDtBrUserDomain", data3);
          })
          .then(function() {
            return that.ajaxFinal(that.global + "/GetDtSearchMenuweb", data4);
          })
          .catch();
      }
    },
    ajax: function(url, data) {
      var that = this;
      return new Promise(function(resolve, reject) {
        mui.ajax(url, {
          type: "post",
          data: data,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
          },
          data: JSON.stringify(data),
          dataType: "json",
          contentType: "application/json,charset=UTF-8",
          success: function(e) {
            var rtdt = JSON.parse(e.d);
            if (rtdt.canLogon == "false") {
              that.login = 0;
              mui.alert(rtdt.errormessage, "提示");
              reject();
            } else {
              resolve();
              console.log(url);
            }
          },
          error: function() {
            reject();
            console.log("错误");
          }
        });
      });
    },
    ajaxFinal: function(url, data) {
      var that = this;
      var promise = new Promise(function(resolve, reject) {
        mui.ajax(url, {
          type: "post",
          data: data,
          beforeSend: function(xhr) {
            xhr.setRequestHeader("accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
          },
          data: JSON.stringify(data),
          dataType: "json",
          contentType: "application/json,charset=UTF-8",
          success: function(e) {
            var rtdt = JSON.parse(e.d);
            that.login = 0;
            if (rtdt.canLogon == "false") {
              mui.alert(rtdt.errormessage, "提示");
              throw "";
            } else {
              resolve();
              console.log("final正确");
              that.$router.push("/menu");
            }
          },
          error: function() {
            console.log("final错误");
            reject();
          }
        });
      });
      return promise;
    }
  },
  created: function() {
    // this.title = global.context.title;
    // this.version = global.context.version
    // this.username = global.context.username
    // this.password = global.context.password
    // this.subtitle = global.context.subTitle
    // this.img = logo
    // app.init(this)
  },
  mounted: function() {
    // app.fontNow();
    // app.fontNowSub();
  }
};
</script>

 
<style scoped>
html,
body {
  margin: 0px;
  height: 100%;
}

.spinner {
  margin: 50px auto;
  width: 30px;
  height: 30px;
  position: relative;
}

.container1 > div,
.container2 > div,
.container3 > div {
  width: 6px;
  height: 6px;
  background-color: white;
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.circle1 {
  top: 0;
  left: 0;
}

.circle2 {
  top: 0;
  right: 0;
}

.circle3 {
  right: 0;
  bottom: 0;
}

.circle4 {
  left: 0;
  bottom: 0;
}

.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.container3 .circle1 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
  }
}

@keyframes bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  40% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
