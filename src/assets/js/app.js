import mui from "./mui.min"
const app = {}
app.deelData = function(data){
 if(typeof data !== 'string')throw "请输入字符串"
  return data.toLocaleLowerCase().trim()
}
app.fail = function(a,b,c){
  mui.alert('服务器连接失败','前台提示')
}
export default app 