import mui from "./mui.min"
const app = {}
app.deelData = function(data){
 if(typeof data !== 'string')throw "请输入字符串"
  return data.toLocaleLowerCase().trim()
}
app.back = function(router){
      router.go(-1)
}
app.fail = function(a,b,c){
  mui.alert('服务器连接失败','前台提示')
}
app.deelAjaxSuc = function (e,router) {
	var rtdt = JSON.parse(e.d);
	if (rtdt.isoffline === 'true') {
		mui.alert('异地登陆', '前台提示', function () {
        router.push("/login")
		})
		return;
	}
	if (rtdt.canpass == 'false') {
		mui.alert(rtdt.errormessage || '系统异常，请稍后重试.', "后台提示");
		return;
	}
	return rtdt;
};
app.reload = function(router,path){
      router.go(path);
}
app.userMsg = function(){
return	JSON.parse(localStorage.getItem("userMsg"));
}
app.domainNow = function(){
 return localStorage.getItem('domainNow') || console.log("当前域为空");
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
/*
  dataUpload:传递的数据
  api:调用的api的名字
  suc:成功的方法
  err:失败的方法
*/ 
app.ajax = function(dataExt,api,suc,err){
	var dataBase = {
		userid: app.userMsg().userid,
		corp: app.userMsg().corp,
		domain: app.domainNow(),
		seesionID: app.userMsg().sessionid,
	};
	let data = JSON.stringify(dataBase).replace(/}$/,"")+JSON.stringify(dataExt).replace(/^{/,",")
	mui.ajax({
		type: "post",
		url: global.context.webUrl+ '/'+api,
		beforeSend: function (xhr) {
			xhr.setRequestHeader("accept", "application/json");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		data:data,
		dataType: 'json',
		contentType: 'application/json,charset=UTF-8',
		success: function (e) {
			var rtdt = JSON.parse(e.d);
			if (rtdt.isoffline === 'true') {
				mui.alert('异地登陆', '前台提示', function () {
				router.push("/login")
				})
				return;
			}
			if (rtdt.canpass == 'false') {
				mui.alert(rtdt.errormessage || '系统异常，请稍后重试.', "后台提示");
				return;
			}
	        suc  &&  suc(rtdt)
		},
		error: function (xhr, type, errorThrown) {
			err && err();
			app.fail(xhr, type, errorThrown)
		}
	});
}

export default app 