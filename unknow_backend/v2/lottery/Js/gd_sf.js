var bool = auto_new = false;
var sound_off=0;
var ball_odds = cl_hao = cl_dx = cl_ds = cl_zhdx = cl_zhds = cl_lh ='';
$(function(){
	$('#cqc_sound').bind('click',function(){//绑定声音按钮
        var e=$(this);
        if(e.attr('off')=='1'){//声音开启
            e.attr('off','0');
            e.children('img').attr('src','images/on.png');
            sound_off=0;
        }else{//关闭
            e.attr('off','1');
            e.children('img').attr('src','images/off.png');
            sound_off=1;
        }
    });
});
//限制只能输入1-9纯数字 
function digitOnly ($this) {
	var n = $($this);
	var r = /^\+?[1-9][0-9]*$/;
	if (!r.test(n.val())) {
		n.val("");
	}
}
//盘口信息
function loadinfo(){
	$.get("/index.php/lottery/odds/gid/gsf/", function(data)
		{
			if(data.opentime>0){
				$("#open_qihao").html(data.number);
				ball_odds = data.oddslist;
				loadodds(data.oddslist);
				endtime(data.opentime);
				auto(1);
			}else{
				$(".bian_td_odds").html("-");
				$(".bian_td_inp").html("封盘");
				$("#autoinfo").html("已经封盘，请稍后进行投注！");
				$.jBox.alert('当前彩票已经封盘，请稍后再进行下注！<br><br>广东快乐十分开盘时间为：08:30 - 22:30', '提示');
				return false;
	
			}
		}, "json");
}
//更新赔率
function loadodds(oddslist){
	if (oddslist == null || oddslist == "") {
			$(".bian_td_odds").html("-");
			$(".bian_td_inp").html("封盘");
			return false;
	}
	for(var i = 1; i<10; i++){
		if(i==9){
			for(var s = 1; s<9; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i, s);
			}
		}else if(i==1){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==2){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==3){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==4){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==5){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==6){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==7){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}
		}else if(i==8){
			for(var s = 1; s<36; s++){
				odds = oddslist.ball[i][s];
				$("#ball_"+i+"_h"+s).html(odds);
				loadinput(i , s);
			}			
		}
	} 
	
}
//号码赔率
function hm_odds(ball){
	if (ball_odds == null || ball_odds == "") {
			$(".bian_td_odds").html("-");
			$(".bian_td_inp").html("封盘");
			return false;
	}
	for(var s = 1; s<36; s++){
		odds = ball_odds.ball[ball][s];
		$("#ball_1_h"+s).html(odds);
		loadinput(ball , s);
	} 
	for( var i = 0; i < 8; i++){
		if(i == ball-1){
		$('#menu_hm > li').eq(i).removeClass("current_n").addClass("current");
		}else{
		$('#menu_hm > li').eq(i).removeClass("current").addClass("current_n");
		}
	}
	
}
//更新投注框
function loadinput(ball , s){
	b = "ball_"+ball+"_"+s;
	n = "<input name=\""+b+"\" id=\""+b+"\" class=\"inp1\" onkeyup=\"digitOnly(this)\" onfocus=\"this.className='inp1m'\" onblur=\"this.className='inp1';\" type=\"text\" maxLength=\"5\"/>"
	if(ball==1){
		$("#ball_1_t"+s).html(n);
	}else if(ball==2){
		$("#ball_"+ball+"_t"+s).html(n);
	}else if(ball==3){
		$("#ball_"+ball+"_t"+s).html(n);
	}else if(ball==4){
		$("#ball_"+ball+"_t"+s).html(n);
	}else if(ball==5){
		$("#ball_"+ball+"_t"+s).html(n);
	}else if(ball==6){
		$("#ball_"+ball+"_t"+s).html(n);
	}else if(ball==7){
		$("#ball_"+ball+"_t"+s).html(n);
	}else if(ball==8){
		$("#ball_"+ball+"_t"+s).html(n);						
	}else if(ball==9){
		$("#ball_"+ball+"_t"+s).html(n);
	}
}

function getIS(s){
    var i=Math.floor(s/60);
    if(i < 10) i = '0'+i;
    var ss	=	s%60;
    if(ss < 10) ss = '0'+ss;
    return i+":"+ss;
}

//封盘时间
function endtime(iTime)
{
	var cqc_color=$('#cqc_time').css('color');
	var iMinute,iSecond;
    var sMinute="",sSecond="",sTime="";
    iMinute = parseInt((iTime/60)%60);
	if (iMinute == 0){
		sMinute = "00";
    }
    if (iMinute > 0 && iMinute < 10){
    	sMinute = "0" + iMinute;
    }
	if (iMinute > 10){
    	sMinute = iMinute;
    }
    iSecond = parseInt(iTime%60);
    if (iSecond >= 0 && iSecond < 10 ){
    	sSecond = "0" + iSecond;
    }
	if (iSecond >= 10 ){
    	sSecond =iSecond;
    }
    sTime= sMinute + sSecond;
    if(iTime==0){
		$("#look").html('<embed width="0" height="0" src="js/2.swf" type="application/x-shockwave-flash" hidden="true" />');
		var xnumbers = parseInt($("#numbers").html());
		//var numinfo= xnumbers+1+'正在开奖...';
		var numinfo= '<span>正在开奖...</span>';
		$("#autoinfo").html(numinfo);
		var i=0;
		$('.open_number > img ').each(function(){
			var e=$(this);
			e.prop('src','/lottery/Images/Ball_1/x.gif');
			i++;
		});
    }
	if(iTime==60){
		$(".bian_td_odds").html("-");
		$(".bian_td_inp").html("封盘");
		$("#look").html('<embed width="0" height="0" src="js/1.swf" type="application/x-shockwave-flash" hidden="true" />');
    }
	if(iTime<0){
		clearTimeout(fp);
		loadinfo();
    }else
    {
		iTime--;
		var t = 'time';

		if(iTime>60){
			$('#cqc_time').html(getIS(iTime-60));
			if(cqc_color!='white'){
				$('#cqc_time').css('color','black');
			}

			//if(iTime == 66){//离开赛还有66秒，播放声音
				//if(!sound_off){
					//getSwfId('swfcontent').Pten();
				//}
			//}
		}

		if( iTime<=60 && iTime>0){
		     $('#cqc_time').html(getIS(iTime));
			if(cqc_color!='blue'){
				$('#cqc_time').css('color','red');
			}
		}

		if(iTime<60){
		$(".bian_td_odds").html("-");
		$(".bian_td_inp").html("封盘");
			t = 'times';
		}
		$("#sss").html(iTime);

		fp = setTimeout("endtime("+iTime+")",1000);
    }
}
//更新开奖号码
function auto(ball){
	$.get("/index.php/lottery/auto/gid/gsf", {ball : ball}, function(data)
		{
			$("#numbers").html(data.numbers);
			var openqihao = $("#open_qihao").html();
			if(auto_new == false || openqihao - data.numbers == 1){
				var numinfo='';
				numinfo = numinfo+'总和：<span><font>'+data.hms[0]+'</font></span>&nbsp;<span><font>'+data.hms[1]+'</font></span>&nbsp;<span><font>'+data.hms[2]+'</font></span>&nbsp;<span><font>'+data.hms[3]+'</font></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龙虎：<span><font>'+data.hms[4]+'</font></span>';
				$("#autoinfo").html(numinfo);
				var i=0;
				var fun=8;
				$('.open_number > img ').each(function(){
					var e=$(this);
					var nu=data.hm[i];
					setTimeout(function(){e.prop('src','/lottery/Images/Ball_1/'+nu+'.png');},fun*600);
					i++;
					fun--;
				});
				auto_new = true;
				if(openqihao - data.numbers != 1){xhm = setTimeout("auto(1)",3000);}
			}else{
				xhm = setTimeout("auto(1)",3000);
			}
			var auto_top = '<table width="100%" border="0" cellspacing="1" cellpadding="0" class="clbian"><tr class="clbian_tr_title"><td colspan="2">开奖结果</td></tr><tr class="clbian_tr_title"><td>开奖期数</td><td>开奖号码</td></tr>';
				for (var key in data.hmlist){
					auto_top = auto_top+'<tr class="clbian_tr_txt"><td class="qihao">'+key+'</td><td class="haoma">'+data.hmlist[key]+'</td></tr>'
				}
			auto_top = auto_top+'</table>'
			//$("#auto_list").html(auto_top);
			//$(parent.leftFrame.document).find("#auto_list").html(auto_top);
		}, "json");
}
//投注提交
function order(){
	var tt = $("input.inp1");
	var mix = 10; cou = m = 0, txt = '', c=true;
	for (var i = 1; i < 10; i++){
		if(i==9){
			for(var s = 1; s < 9; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_"+i+"_h" + s).html();
					var q = did(i);
					var w = wan9(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '<br>';
					cou++;
				}
			}
		}else{
			for(var s = 1; s < 36; s++){
				if ($("#ball_" + i + "_" + s).val() != "" && $("#ball_" + i + "_" + s).val() != null) {
					//判断最小下注金额
					if (parseInt($("#ball_" + i + "_" + s).val()) < mix) {
						c = false;
					}
					m = m + parseInt($("#ball_" + i + "_" + s).val());
					//获取投注项，赔率
					var odds = $("#ball_1_h" + s).html();
					var q = did(i);
					var w = wan(s);
					txt = txt + q + '[' + w +'] @ ' + odds + ' x ￥' + parseInt($("#ball_" + i + "_" + s).val()) + '<br>';
					cou++;
				}
			}
		}
	}
	if (!c) {$.jBox.tip("最低下注金额："+mix+"￥");return false;}
	if (cou <= 0) {$.jBox.tip("请输入下注金额!!!");return false;}
	var t = "<p>共 ￥" + m + " / " + cou + " 笔，确定下注吗？</p> <p>下注明细如下：</p>";
	txt = t + txt;
//	var ok = confirm(txt);
	$("#xjssc_mask").show();
	$("#xjssc_show").show();
	
	$("#xjssc_list").html(txt)
	
	
}




function order_btn(){
	$.ajax({
		type:'POST',
		url:'/index.php/lotterybet/gsf.html?type=1',
		data: $("#orders").serializeArray(),
		dataType:'json',
		success:function(msg){
			if(msg.status == 1){
					var orderTop = $(window.parent.document).scrollTop();
					$.jBox(msg.text, {title: ' 以下为您刚刚下注成功的注单'});
					$("#xjssc_show").hide();
					$("#xjssc_mask").hide();
//								console.log("aaa")
			}else if(msg.status == 0){
				$.jBox.alert(msg.text,{title:'用户已退出，请重新登录!'});
			}else if(msg.status == -1){
				$.jBox.alert(msg.text,{title:'投注失败'});
			}else{
				$.jBox.tip(msg.text);
			}
			
		}
	})
	
	document.orders.reset()
		
}
//读取第几球
function did (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '第一球'; break;
		case 2 : r = '第二球'; break;
		case 3 : r = '第三球'; break;
		case 4 : r = '第四球'; break;
		case 5 : r = '第五球'; break;
		case 6 : r = '第六球'; break;
		case 7 : r = '第七球'; break;
		case 8 : r = '第八球'; break;
		case 9 : r = '总和、龙虎'; break;
	}
	return r;
}
//读取玩法
function wan (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '01'; break;
		case 2 : r = '02'; break;
		case 3 : r = '03'; break;
		case 4 : r = '04'; break;
		case 5 : r = '05'; break;
		case 6 : r = '06'; break;
		case 7 : r = '07'; break;
		case 8 : r = '08'; break;
		case 9 : r = '09'; break;
		case 10 : r = '10'; break;
		case 11 : r = '11'; break;
		case 12 : r = '12'; break;
		case 13 : r = '13'; break;
		case 14 : r = '14'; break;
		case 15 : r = '15'; break;
		case 16 : r = '16'; break;
		case 17 : r = '17'; break;
		case 18 : r = '18'; break;
		case 19 : r = '19'; break;
		case 20 : r = '20'; break;
		case 21 : r = '大'; break;
		case 22 : r = '小'; break;
		case 23 : r = '单'; break;
		case 24 : r = '双'; break;
		case 25 : r = '尾大'; break;
		case 26 : r = '尾小'; break;
		case 27 : r = '合数单'; break;
		case 28 : r = '合数双'; break;
		case 29 : r = '东'; break;
		case 30 : r = '南'; break;
		case 31 : r = '西'; break;
		case 32 : r = '北'; break;
		case 33 : r = '中'; break;
		case 34 : r = '发'; break;
		case 35 : r = '白'; break;
	}
	return r;
}
//读取玩法
function wan9 (type)
{
	var r = '';
	switch (type)
	{
		case 1 : r = '总和大'; break;
		case 2 : r = '总和小'; break;
		case 3 : r = '总和单'; break;
		case 4 : r = '总和双'; break;
		case 5 : r = '总和尾大'; break;
		case 6 : r = '总和尾小'; break;
		case 7 : r = '龙'; break;
		case 8 : r = '虎'; break;
	}
	return r;
}
function getSwfId(id) { //与as3交互 跨浏览器
    if (navigator.appName.indexOf("Microsoft") != -1) { 
        return window[id]; 
    } else { 
        return document[id]; 
    } 
} 