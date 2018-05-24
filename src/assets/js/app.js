import mui from "./mui.min"
const app = {}
app.deelData = function(data){
 if(typeof data !== 'string')throw "请输入字符串"
  return data.toLocaleLowerCase().trim()
}
app.fail = function(a,b,c){
  mui.alert('服务器连接失败','前台提示')
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
export default app 