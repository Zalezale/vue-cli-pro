import mui from "./mui.min"
const app = {}
app.deelData = function (data1,data2) {
	if (typeof data1 !== 'string'||typeof data2 !== 'string') throw "请输入字符串"
	return data1.toLowerCase().trim()===data2.toLowerCase().trim()?true:false
}
app.center = function(vue){
    vue.$router.push({
		path: '/usercenter',
	})
}
app.back = function (vue) {
	vue.$destroy()
	vue.$router.go(-1)
}
app.fail = function (a, b, c,fn) {
	mui.alert('异常:(状态码'+a.status+')', '前台提示',function(){
		fn && fn();
	})
}
app.userMsg = function () {
	return JSON.parse(localStorage.getItem("userMsg"));
}
app.domainNow = function () {
	return localStorage.getItem('domainNow') || app.log("当前域为空");
}
app.getDate = function () {
	var curTime = '';
	var vdate = new Date();
	var years = vdate.getFullYear().toString();
	var months = vdate.getMonth() + 1;
	var datev = vdate.getDate();
	curTime += years + '-' + (months < 10 ? '0' + months : months) + '-' + (datev < 10 ? '0' + datev : datev);
	return curTime;
}
app.isOnline = function () {
	let status = (!!window.plus ? plus.networkinfo.getCurrentType() : 4);
	if (status === 0 || status === 1) {
		return false
	}
	return true
}
/*
  dataUpload:传递的数据
  api:调用的api的名字
  suc:成功的方法
  err:失败的方法
  vue:当前vue实例
  fnInFalse：canpass为false的回掉
  fnInOnline:isoffline为true的回掉
*/
app.ajax = function (dataExt, api, suc, err,vue,fnInFalse,fnInOnline) {
	if (!app.isOnline()) {
		mui.alert('请连接到网络', '前台提示')
		return

	}
	var dataBase = {
		userid: app.userMsg().userid,
		corp: app.userMsg().corp,
		domain: app.domainNow(),
		seesionID: app.userMsg().sessionid,
	};
	let data = JSON.stringify(dataBase).replace(/}$/, "") + JSON.stringify(dataExt).replace(/^{/, ",")
	mui.ajax({
		type: "post",
		url: global.context.webUrl + '/' + api,
		beforeSend: function (xhr) {
			xhr.setRequestHeader("accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		data: data,
		dataType: 'json',
		contentType: 'application/json,charset=UTF-8',
		success: function (e) {
			var rtdt = JSON.parse(e.d);
			app.log(rtdt)
			if (rtdt.isoffline === 'true') {
				mui.alert('异地登陆', '前台提示', function () {
					fnInOnline&&fnInOnline()
					vue.$destroy();
					vue.$router.push("/login")
				})
				return;
			}
			if (rtdt.canpass == 'false') {
				mui.alert(rtdt.errormessage || '系统异常，请稍后重试.', "后台提示",function(){
					fnInFalse && fnInFalse();
				});
				return;
			}
			suc && suc(rtdt)
		},
		error: function (xhr, type, errorThrown) {
			app.fail(xhr, type, errorThrown,err)
		}
	});
}
app.init = function (vue) {
	vue.header = vue.$router.history.current.query.name;
	mui.back = function () {return }
	vue.$store.commit('chgComponent',vue)
	if (!!window.plus) {
		mui.plusReady(function () {
			//vue.init && vue.init();
			plus.key.addEventListener('backbutton',function(){
				plus.runtime.quit();
		   })
		})
	}
}
app.log = function(str){
    global.context.environment ==="test" ? console.log(str) : "";
}
export default app 