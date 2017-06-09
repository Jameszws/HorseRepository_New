define([],function(){var t={Monday:"星期一",Tuesday:"星期二",Wednesday:"星期三",Thursday:"星期四",Friday:"星期五",Saturday:"星期六",Sunday:"星期日"},e={LastMonth:0,CurrentMonth:1,NextMonth:2},d=function(){this.defaultParams={id:"",mindate:"",maxdate:""}};return d.prototype={constructor:d,init:function(t){this.options=Horse.util.coverObject(this.defaultParams,t),this._init()},_init:function(){this.validateParams()&&this._registerDatePickerElementClick()},validateParams:function(){var t=this.options.id;return document.getElementById(t)?(document.getElementById(t).className="datepicker-skin1-input",Horse.validate.isExistAttr(t,"datepicker")?(alert("使用日期插件缺少datepicker属性"),!1):""==this.options.mindate||Horse.validate.isDate(this.options.mindate)?""==this.options.maxdate||Horse.validate.isDate(this.options.maxdate)?!(new Date(Date.parse(this.options.mindate.replace(/-/g,"/")))>new Date(Date.parse(this.options.maxdate.replace(/-/g,"/")))&&(alert("使用日期插件的mindate不能大于maxdate！"),1)):(alert("使用日期插件的maxdate参数格式不正确！"),!1):(alert("使用日期插件的mindate参数格式不正确！"),!1)):(alert("使用日期插件元素不存在！"),!1)},getPosition:function(){var t=document.getElementById(this.options.id),e=t.offsetLeft,d=t.offsetTop+t.offsetHeight-1;document.getElementById("dpcontrol").style.left=e+"px",document.getElementById("dpcontrol").style.top=d+"px"},getTimeData:function(d,a){var n=[],i=this.getFirstDayOfCurrentMonth(d,a),o=this.getCurrentMonthDays(d,a),r=0;switch(i){case t.Sunday:r=0;break;case t.Monday:r=1;break;case t.Tuesday:r=2;break;case t.Wednesday:r=3;break;case t.Thursday:r=4;break;case t.Friday:r=5;break;case t.Saturday:r=6}for(var s=42-o-r,l=0;l<r;l++){var c=this.getLastNonthLastSomeDay(d,a,1,r-l),h=new Date(d,a-2,c),m=this.boolTheDayIsSelected(this.options.mindate,this.options.maxdate,h),p={dpyear:d,dpmonth:a-1,dpday:c,dpmonthposition:e.LastMonth,dpdayIsSelected:m};n.push(p)}for(var y=0;y<o;y++){var u=new Date(d,a-1,y+1),g=this.boolTheDayIsSelected(this.options.mindate,this.options.maxdate,u),v={dpyear:d,dpmonth:a,dpday:y+1,dpmonthposition:e.CurrentMonth,dpdayIsSelected:g};n.push(v)}for(var B=0;B<s;B++){var k=new Date(d,a,B+1),f=this.boolTheDayIsSelected(this.options.mindate,this.options.maxdate,k),b={dpyear:d,dpmonth:a+1,dpday:B+1,dpmonthposition:e.NextMonth,dpdayIsSelected:f};n.push(b)}return n},boolTheDayIsSelected:function(t,e,d){var a,n,i=!1;return""!=t&&(a=new Date(Date.parse(t.replace(/-/g,"/")))),""!=e&&(n=new Date(Date.parse(e.replace(/-/g,"/")))),""!=t&&""==e?(a<=d&&(i=!0),i):""==t&&""!=e?(d<=n&&(i=!0),i):""!=t&&""!=e?(a<=d&&d<=n&&(i=!0),i):(""==t&&""==e&&(i=!0),i)},getLastNonthLastSomeDay:function(t,e,d,a){var n=new Date(t,e-1,d),i=n.getTime()-864e5*a,o=new Date;return o.setTime(i),o.getDate()},getCurrentMonthDays:function(t,e){return 2==e?t%4==0?29:28:1==e||3==e||5==e||7==e||8==e||10==e||12==e?31:30},getFirstDayOfCurrentMonth:function(e,d){var a=new Date(e,d-1);a.setDate(1);var n=new Array(7);return n[0]=t.Sunday,n[1]=t.Monday,n[2]=t.Tuesday,n[3]=t.Wednesday,n[4]=t.Thursday,n[5]=t.Friday,n[6]=t.Saturday,n[a.getDay()]},createDatePickerHtml:function(t,e,d){if(!document.getElementById("dpcontrol")){var a="";a+="<div class='datepicker-head'>",a+="     <div class='datepicker-head-div'>",a+="         <div id='lastyear' class='datepicker-head-left'>",a+="             <div class='datepicker-img-left'></div>",a+="         </div>",a+="         <div class='datepicker-head-txtarea'>",a+="             <input type='text' id='dpyear' class='datepicker-head-txt' readonly='readonly'/>",a+="         </div>",a+="         <div id='nextyear' class='datepicker-head-right'>",a+="             <div class='datepicker-img-right'></div>",a+="         </div>",a+="     </div>",a+="     <div class='datepicker-head-div'>",a+="          <div id='lastmonth' class='datepicker-head-left'>",a+="              <div class='datepicker-img-left'></div>",a+="          </div>",a+="          <div class='datepicker-head-txtarea'>",a+="              <input type='text' id='dpmonth' class='datepicker-head-txt' readonly='readonly'/>",a+="          </div>",a+="          <div id='nextmonth' class='datepicker-head-right'>",a+="              <div class='datepicker-img-right'></div>",a+="          </div>",a+="      </div>",a+="</div>",a+="<div id='dpbody' class='datepicker-body'>",a+="     <table>",a+="         <thead>",a+="             <tr>",a+="                 <td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td>",a+="             </tr>",a+="         </thead>",a+="         <tbody>",a+=this.getTbodyHtml(t,e),a+="        </tbody>",a+="     </table>",a+="</div>",a+="<div class='datepicker-foot'>",a+="    <div id='btnClose' class='datepicker-op'>关闭</div>",a+="    <div id='btnToday' class='datepicker-op'>今天</div>",a+="    <div id='btnClear' class='datepicker-op'>清空</div>",a+="</div>";var n=document.createElement("div");n.className="datepicker",n.id="dpcontrol",n.innerHTML=a,document.body.appendChild(n)}},getTbodyHtml:function(t,d){for(var a=this.getTimeData(t,d),n="",i=0;i<a.length;i++){i%7==0&&(n+="<tr>");var o="";switch(a[i].dpmonthposition){case e.LastMonth:o=a[i].dpdayIsSelected?"datepicker-notcurrentmonth":"datepicker-datedisabled";break;case e.CurrentMonth:o=a[i].dpdayIsSelected?"":"datepicker-datedisabled";break;case e.NextMonth:o=a[i].dpdayIsSelected?"datepicker-notcurrentmonth":"datepicker-datedisabled"}n+="<td class='"+o+"' dpMonthPosition='"+a[i].dpmonthposition+"' dpyear='"+a[i].dpyear+"' dpmonth='"+a[i].dpmonth+"' dpday='"+a[i].dpday+"' dpdayIsSelected='"+a[i].dpdayIsSelected+"'>"+a[i].dpday+"</td>",(i+1)%7==0&&(n+="</tr>")}return n},setdpvalueAndSelectedTdStyle:function(t,e,d){document.getElementById("dpyear").value=t+" 年",document.getElementById("dpmonth").value=e+" 月";for(var a=document.getElementById("dpcontrol").getElementsByTagName("tbody")[0].getElementsByTagName("td"),n=0;n<a.length;n++)a[n].getAttribute("dpyear")==t&&a[n].getAttribute("dpmonth")==e&&a[n].getAttribute("dpday")==d&&(a[n].className+=" datepicker-dateselected")},_registerDatePickerElementClick:function(){var t=Horse.util.delegate(this._handleDatePickerElementClick,this);document.getElementById(this.options.id).onclick=t},_registerTbodyTdClick:function(){for(var t=this.options,e=document.getElementById("dpcontrol").getElementsByTagName("tbody")[0].getElementsByTagName("td"),a=0;a<e.length;a++){var n=e[a],i=Horse.util.delegate(d.prototype._handleTbodyTdClick,this,[{options:t,td:n}]);e[a].onclick=i}},_registerBtnClear:function(){var t=Horse.util.delegate(this._handleBtnClear,this);document.getElementById("btnClear").onclick=t},_registerBtnClose:function(){var t=Horse.util.delegate(this._handleBtnClose,this);document.getElementById("btnClose").onclick=t},_registerBtnToday:function(){var t=Horse.util.delegate(this._handleBtnToday,this);document.getElementById("btnToday").onclick=t},_registerDocumentClick:function(){var t=this.options;document.onclick=function(e){Horse.util.delegate(d.prototype._handleDocumentClick,this,[{event:e,options:t}])()}},_registerBtnLastYear:function(){var t=Horse.util.delegate(this._handleBtnLastYear,this);document.getElementById("lastyear").onclick=t},_registerBtnNextYear:function(){var t=Horse.util.delegate(this._handleBtnNextYear,this);document.getElementById("nextyear").onclick=t},_registerBtnLastMonth:function(){var t=Horse.util.delegate(this._handleBtnLastMonth,this);document.getElementById("lastmonth").onclick=t},_registerBtnNextMonth:function(){var t=Horse.util.delegate(this._handleBtnNextMonth,this);document.getElementById("nextmonth").onclick=t},_handleDatePickerElementClick:function(){var t=document.getElementById("dpcontrol");t&&document.body.removeChild(t);var e,d,a,n=document.getElementById(this.options.id).value.trim();if(""===n){var i=new Date;e=i.getFullYear(),d=i.getMonth()+1,a=i.getDate()}else{if(!Horse.validate.isDate(n))return alert("输入的日期格式不正确！正确格式为'yyyy-MM-dd'！"),void(document.getElementById(this.options.id).value="");var o=new Array;o=n.split("-"),e=o[0].trim(),d=o[1].trim(),a=o[2].trim()}this.createDatePickerHtml(parseInt(e),parseInt(d),parseInt(a)),this.getPosition(),this.getPosition(),this._registerTbodyTdClick(),this._registerBtnToday(),this._registerBtnClear(),this._registerBtnClose(),this._registerDocumentClick(),this._registerBtnLastYear(),this._registerBtnLastMonth(),this._registerBtnNextMonth(),this._registerBtnNextYear(),this.setdpvalueAndSelectedTdStyle(e,d,a)},_handleTbodyTdClick:function(t){for(var e=document.getElementById("dpcontrol").getElementsByTagName("tbody")[0].getElementsByTagName("td"),d=0;d<e.length;d++)Horse.util.removeClass(e[d],"datepicker-dateselected");Horse.util.addClass(t.td,"datepicker-dateselected");var a=t.options,n=a.id;if("true"==t.td.getAttribute("dpdayIsSelected")){var i=t.td.getAttribute("dpyear"),o=t.td.getAttribute("dpmonth"),r=t.td.getAttribute("dpday");document.getElementById(n).value=i.trim()+"-"+o.trim()+"-"+r;var s=document.getElementById("dpcontrol");document.body.removeChild(s)}},_handleBtnClear:function(){for(var t=document.getElementById("dpcontrol").getElementsByTagName("tbody")[0].getElementsByTagName("td"),e=0;e<t.length;e++)Horse.util.removeClass(t[e],"datepicker-dateselected");document.getElementById(this.options.id).value=""},_handleBtnClose:function(){var t=document.getElementById("dpcontrol");t&&document.body.removeChild(t)},_handleBtnToday:function(){var t=new Date;if(this.boolTheDayIsSelected(this.options.mindate,this.options.maxdate,t)){var e=t.getFullYear(),d=t.getMonth()+1,a=t.getDate();document.getElementById(this.options.id).value=e+"-"+d+"-"+a;var n=document.getElementById("dpcontrol");document.body.removeChild(n)}},_handleDocumentClick:function(t){for(var e=t.event||window.event,a=e.srcElement||e.target;a;){if("dpcontrol"==a.id||a.id==t.options.id)return;a=a.parentNode}var n=document.getElementById(t.options.id);if(!Horse.validate.objIsNull(n)){var i=n.value;if(""!=i.trim()){if(!Horse.validate.isDate(i))return alert("输入的日期格式不正确！正确格式为'yyyy-MM-dd'！"),void(document.getElementById(t.options.id).value="");var o=i.split("-"),r=new Date(parseInt(o[0]),parseInt(o[1])-1,parseInt(o[2]));if(!d.prototype.boolTheDayIsSelected(t.options.mindate,t.options.maxdate,r))return alert("该日期不在有效范围内！请重新选择！"),void(document.getElementById(t.options.id).value="")}var s=document.getElementById("dpcontrol");s&&document.body.removeChild(s)}},_handleBtnLastYear:function(){var t=this.getdpyearandmonthbytxt();this.showdpByDirectionBtnClick(t.dpyear-1,t.dpmonth)},_handleBtnNextYear:function(){var t=this.getdpyearandmonthbytxt();this.showdpByDirectionBtnClick(t.dpyear+1,t.dpmonth)},_handleBtnLastMonth:function(){var t=this.getdpyearandmonthbytxt();this.showdpByDirectionBtnClick(t.dpyear,t.dpmonth-1)},_handleBtnNextMonth:function(){var t=this.getdpyearandmonthbytxt();this.showdpByDirectionBtnClick(t.dpyear,t.dpmonth+1)},getdpyearandmonthbytxt:function(){return{dpyear:parseInt(document.getElementById("dpyear").value.replace("年","").trim()),dpmonth:parseInt(document.getElementById("dpmonth").value.replace("月","").trim())}},showdpByDirectionBtnClick:function(t,e){for(var d,a=document.getElementById("dpcontrol").getElementsByTagName("div"),n=0;n<a.length;n++)"dpbody"==a[n].id&&(d=a[n],d.innerHTML="");var i="";i+="<table>",i+="    <thead>",i+="        <tr>",i+="            <td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td>",i+="        </tr>",i+="    </thead>",i+="    <tbody>",i+=this.getTbodyHtml(t,e),i+="   </tbody>",i+="</table>";var o=new Date(t,e-1);document.getElementById("dpyear").value=o.getFullYear()+" 年",document.getElementById("dpmonth").value=o.getMonth()+1+" 月",d.innerHTML=i,this._registerTbodyTdClick()}},d});