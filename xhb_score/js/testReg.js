var isMD5Type = true;//是否采用md5加密登录
			var isUserLocal = false;//是否使用浏览器记录的密码（密文）登录
			
			var login_type = localStorage.getItem("login_type") || 1;//分区标识，如有存储传存储值，默认传1
			//判断路径上是否有isDesignData
			var fromDesign = false;
			var urlParam = window.location.href;
			if(urlParam.indexOf("isDesignData") != -1){
				fromDesign = true
			}
			var latejson=JSON.parse('["cn","en","it","ft","pl","pt","gm","jk"]');
			loadLangs(latejson);//["cn","en"]
			var isNeedSaveuser;
			var regType=1;//0安装，1分销，2员工
			var forgetPwdType=0;//0邮箱， 1手机
			var checkSerial="";
			//重新渲染表单
			function renderForm(){
		  		layui.use('form', function(){
					var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
					//国家选择荷兰才显示注册安装商的工商号码
				  	form.on('select(sel_insCountry)', function (data) {
		                if(data.value=='Netherlands'){
		                	$("#tr_kvkNumber").show();
		                	$("#kvkNumber").attr('placeholder',"KVK nummer");
		                	$(".txt_kvkNumber").text("KVK nummer");
		                }else if(data.value=='Belgium' && new Date().getTime()>=1584230400000){//2020-03-15
		                	$("#tr_kvkNumber").show();
		                	$("#kvkNumber").attr('placeholder',"BTW Nummer");
		                	$(".txt_kvkNumber").text("BTW Nummer");
		                }else{
		                	$("#tr_kvkNumber").hide();
		                	$("#kvkNumber").val('').attr('placeholder',"工商号码");
		                	$(".txt_kvkNumber").text("工商号码");
		                }
		                
		                var reg = ODMPARAMS.checkRegCountryDump(data.value);
 				  		console.log("reg1",reg);
						//分区操作，(卜乐提的需求，安装商选择国家判断跳转对应服务器)
						if(reg != ""){//有域名
							//説明要跳转其他域名
							if(window.location.hostname != reg){//域名不相同，要跳转
								fenquLayer.$data.isHideMask = false;
								fenquLayer.$data.serverStatus = 2;
								fenquLayer.$data.checkStatus = 2;
								var currHostname = location.protocol + "//" + window.location.hostname;
								var newHostname = location.protocol + "//"  + reg;
								fenquLayer.render_xhb_pro_1(currHostname,newHostname);
							}

						}
		            });
 				  	form.on('select(sel_disCountry)', function (data) {
 				  		var reg = ODMPARAMS.checkRegCountryDump(data.value);
 				  		console.log("reg2",reg);
 				  		//分区操作，
 				  		 if(reg != ""){//有域名
 				  			//説明要跳转其他域名
 				  			if(window.location.hostname != reg){//域名不相同，要跳转
 				  				fenquLayer.$data.isHideMask = false;
 				  				fenquLayer.$data.serverStatus = 2;
 				  				fenquLayer.$data.checkStatus = 2;
 				  				var currHostname = location.protocol + "//" + window.location.hostname;
 				  				var newHostname = location.protocol + "//"  + reg;
 				  				fenquLayer.render_xhb_pro_1(currHostname,newHostname);
 				  			}
 				  		
 				  		} 
 				  		
 		            });
				});
		  		
		 	}
			$(function() {
				//国家
				/* $.each(country, function (i, v) {
					$(".sameCountry").append("<option value='" + v + "'>" + capitalize(v) + "</option>");
					
				}); */
				var tem = "";
				for(var i=0;i<country.length;i++){
					s = (i === 0 ? " selected" : "");
					tem += "<option  value='" + country[i] + "' >" + capitalize(country[i]) + "</option>";
				}
				$(".sameCountry").append(tem);
				
				renderForm();
				
				var lang =LANG;
				if (lang == "cn" || !lang) {
					lang = "cn";
				}
				var loginTermtext="Privacy Policy";
				if(lang=='cn'){loginTermtext="隐私条例";}
				if(lang=='cn' || lang=='ft'){
		//                  $(".tipsSurvey").show()
		          }else{
		                  //$(".tipsSurvey").show()
		                  $(".tipsSurvey").css({"background":"url(/ShineOSS/resources/images/4.0/tips_surveyEn.png) no-repeat -15px 0px","height": "400px"})
		                  $(".tipsSurvey a").css({"margin-top": "155px"})
		//                  $(".tipsSurvey a").attr("href","https://www.wjx.cn/vj/rFVwRCE.aspx")
		                  $(".tipsSurvey .closethis").css({"margin-top": "116px"})
		          }
 				$(".closethis").click(function(){$(".tipsSurvey").hide();})
				if(!ODMPARAMS.showSurvey){
					$(".tipsSurvey").show();
					$(".tipsSurvey").find('a').attr('href',ODMPARAMS.surveyUrl);
				}
				$("#loginTerms").text(loginTermtext);
				setTimeout(function(){
					$.ajax({
						url: "/ShineOSS/common/sysNotice/getNoticeByNew",
						type: "post",
						dataType: 'json',
						success: function (data) {
							if (data.obj) {
								if (lang == "cn") {
									$('.sysText').html(data.obj.content);
								} else {
									$('.sysText').html(data.obj.enContent);
								}
								$(".systemUpdate,.sysBg").show();//显示通知
							}
						}
					});
				},1)
				//系统维护
				$(".sysTitle>i").click(function () {
					$(".systemUpdate,.sysBg").hide();//关闭通知
				})
				//切换语言
				$(".all-lang ul li").unbind("click").bind("click", function () {
					$(".same-show-text").text($(this).find("a").text());
				})
				$(".login-bg").height($(window).height());
				window.onresize = function () {
					$(".login-bg").height($(window).height());
				};
				addEnterEvent("#userName-id,#passWd-id", fn_login);

				//input标题效果
				var userName = document.getElementById("userName-id");
				$(".login-input-box").click(function () {
					$(this).find("input").focus();
				})
				$(".login-input-box input").focus(function () {
					$(this).parent().addClass("translate");
					$(this).parent().parent().addClass("focus");
				})
				$(".login-input-box input").bind('blur change',function () {
					if ($(this).val() == "") {
						$(this).parent().removeClass("translate");
					} else {
						$(this).parent().addClass("translate");
					}
					$(this).parent().parent().removeClass("focus");
				})
				//显示记录的账号密码
				var showlist = localStorage.getItem('nameorpass');
				showlist = eval('(' + showlist + ')');
				if (showlist != null) {
					for (var i = 0; i < showlist.length; i++) {
						var onhtml = "";
						onhtml += '<li>' + showlist[i].name + '</li>'
						$("#nameList").append(onhtml)
					}
				}
                // 历史输入账号
                $(".ico-downArrow").click(function(){
                    $("#nameList").show();
                    return false;
                })
                $("body").click(function(){
                    $("#nameList").hide();
                })
                //本地存储的账户密码
                $("#nameList li").on("click",function () {
                	isMD5Type = true;
                	isUserLocal = true;
                    $(".login-input-box").addClass("translate");
                    if(!$(".ico-eye").hasClass("show"))$("#passWd-id").attr("type","password");
                    $("#userName-id").val(showlist[$(this).index()].name);
                    $("#passWd-id").val(showlist[$(this).index()].pass).attr("type","password");
                    $(".loginInput-btn").addClass("btn-yes");
                })

				//监听userName
			    if(isHaveUserInCookie()){
			    	selectSaveUser();
			    	$("#userName-id").val(getUOPs('uns')[0]);
			    	$("#passWd-id").val(getUOPs('pds')[0]).attr("type","password");
			    	isMD5Type = true;
                	isUserLocal = true;
				    $("#userName-id").bind('input propertychange',function(){
				    	if($(this).val() == "")
							$(this).css("textTransform","");
						else
							$(this).css("textTransform","uppercase");
				    	var un = $.trim($(this).val()).toUpperCase();
				    	var uns = getUOPs('uns');
						var pds = getUOPs('pds');
						$("#passWd-id").val('');
						isMD5Type = true;
	                	isUserLocal = false;
	                	
						for(var i=0; i<uns.length;i++){
							if(uns[i]==un){
								if(pds[i]!=undefined){
				                	isUserLocal = true;
									$("#passWd-id").val(pds[i]).attr("type","password");
									break;
								}
							}
						}
					});
			    }else{
			    	isMD5Type = true;
			    	isUserLocal = false;
			    	$("#userName-id").bind('input propertychange',function(){
				    	if($(this).val() == "")
							$(this).css("textTransform","");
						else
							$(this).css("textTransform","uppercase");
					});
				}
			    //密码是否显示
                $(".ico-eye").click(function(){
                	
                    if($(this).hasClass("show")){
                        $(this).removeClass("show");
                        $("#passWd-id").attr("type","password");
                    }else{
                        $(this).addClass("show");
                        $("#passWd-id").attr("type","text");
                        if(isUserLocal){
                        	$("#passWd-id").val('');
                        	isUserLocal = false;
                        } //用户要查看记录浏览器中的加密密码时候，清空不让他看，让其手动输入密码进行操作
                    }
                });
			    
                $("#passWd-id").bind('input propertychange',function(){
                	var psd = $(this).val();
                	var cookiePsd = getUOPs('pds')[0];
			    	if(isUserLocal && cookiePsd && psd != cookiePsd){//用户修改浏览器存储回写的密码，则清空密码框
			    		$(this).val('');
			    		isUserLocal = false;
			    	}
				});
			    
				//登录按钮
				$(".loginInput-btn").bind("click",function(){
					//检验用户是否有没有同意数据保护协议
					
					fn_login();
				});
			    //cookies_tip
			    $('document').ready(function (){
					$('.tip_btn').on('click', function (){
						$('.cookies_tip').fadeOut('fast');
					})
				})
				//注册按钮
				$("#noAccountNumber").bind("click",function(){
					registerDialog()
				});
				$(".register").click(function(){
					registerDialog()
				})
				function registerDialog(){
					$("#tr_kvkNumber").hide();
					$("#kvkNumber").val('').attr('placeholder',"工商号码");
                	$(".txt_kvkNumber").text("工商号码");
                	$(".reg_showNoCountry").hide();
		  			 
					$(".dialog-regist input[type='text']").val('');
					$("#errMsg_reg").text('');
					dialogContent({
						title:'注册',
						content:$('.dialog-regist')
					});
					$("#val_supCompany_regInstaller").focus();
					$(".btn_reg").unbind('click').click(function(){clickRegOk()});
					$(".btn_down").unbind('click').click(function(){
						$("#azCountrytwo,#azCountry").val('');
						layui.form.render()
						$(".reg_showNoCountry").hide();
						if(!ODMPARAMS.regIsSimple)$(".ishow").show();
						if($("#cbo_agreeTerms").hasClass("isChecked")){
							$(".btn_down").hide();
							$("#cbo_agreeTerms").parent().hide();
							$(".regist-type-box").hide();
							$(".btn_reg").show();
							$(".btn_up").show();
							if($(".integrator").hasClass("registTypeBg")){
								$(".integrator-box").show();
							}else{
								$(".agent-box").show();
							}
						}
					});
					$(".btn_up").unbind('click').bind('click',function(){
						$(".reg_showNoCountry").hide();
						$(".btn_down").show();
						$("#cbo_agreeTerms").parent().show();
						$(".regist-type-box").show();
						$(".btn_reg").hide();
						$(".btn_up").hide();
						$(".integrator-box").hide();
						$(".agent-box").hide();
					})
					$(".btn_up").click();
				}
		
				//清除异常信息
				$(".dialog-regist input[type='text']").bind('focus',function(){
					$("#errMsg_reg").text('');
				})

				addEnterEvent($(".dialog-regist input"),clickRegOk)

				//注册类型选择
				$(".regist-select li").bind("click",function(){
					$(this).addClass("registTypeBg").siblings("li").removeClass("registTypeBg");

					if($(this).hasClass("employee")){
						regType=2;
						$(".employee-box").show().siblings("table").hide();
					}else if($(this).hasClass("integrator")){
						regType=1;
						// $(".integrator-box").show().siblings("table").hide();
						$(".integrator-box").siblings("table").hide();
						$(".btn_down").show();
						$("#cbo_agreeTerms").parent().show();
						$(".regist-type-box").show();
						$(".btn_reg").hide();
						$(".btn_up").hide();
						$(".integrator-box").hide();
					}else{
						regType=0;
						if(!ODMPARAMS.regIsSimple){
							console.log(111111,'英文')
							$(".btn_down").show();
							$(".btn_reg").hide();
						}else{
							console.log(22222,'中文')
							$(".agent-box").hide();
							$(".btn_reg").show();
							$(".btn_down").hide();
						}
					}
					$("#val_supCompany_regInstaller,#val_company_regDistributor,#val_jobId_regEmployee").focus();
					$("#errMsg_reg").text('');
				})

				//注册员工，获取手机验证码
				$("#btn_phoneNum_getCode_regEmployee").removeAttr('disabled');
			    $("#btn_phoneNum_getCode_regEmployee").bind('click',function(){
					var val = $.trim($("#val_phoneNum_regEmployee").val());
					if(checkPhoneNum($("#val_phoneNum_regEmployee"),val)){
						sendValidCode("register/sendPhoneNumValidCode",{phoneNum:val},$("#btn_phoneNum_getCode_regEmployee"),$("#errMsg_reg"))
					}
				});

				//找回密码事件
				$("#btn_forgetPwd").bind('click',function(){
					resetForget();
					dialogContent({
						title:'找回密码',
						content:$('#dialog_forgetPwd'),
						btns:{'i18n_confirm':clickForgetOk,'i18n_cancel':dialogClose},
						onBtn:0
					});
					$("#val_phone_forget,#val_email_forget").focus();
				});

				if($(".imageneverSave").css("display")=='block'){
					$("#passWd-id").attr("type","password");
					$("#passWd-id").parent().addClass("translate");
					$(".loginInput-btn").addClass("btn-yes");
				}

				//找回密码切换
			    $(".forget-passwd-box li").bind("click",function(){
			    	$(this).addClass("lgBg").siblings("li").removeClass("lgBg");
			    	$(this).find("span").addClass("spanBg").parent("li").siblings("li").find("span").removeClass("spanBg");
			    	resetForget();
			    	if($(this).hasClass("by-email-btn")){
			    		forgetPwdType=0;
			    		$("#dialog_forgetPwd .phone_forget").hide().siblings(".email_forget").show();
			    	}else{
			    		forgetPwdType=1;
			    		$("#dialog_forgetPwd .email_forget").hide().siblings(".phone_forget").show();
			    	}

			    })




			    $(".forget-passwd-box a").bind("click",function(){
			    	$(this).addClass("check-forget").siblings("a").removeClass("check-forget");
			    	resetForget();
			    	if($(this).hasClass("by-email-btn")){
			    		forgetPwdType=0;
			    		$("#dialog_forgetPwd .phone_forget").hide().siblings(".email_forget").show();
			    	}else{
			    		forgetPwdType=1;
			    		$("#dialog_forgetPwd .email_forget").hide().siblings(".phone_forget").show();
			    	}
			    })

			  //找回密码，获取手机验证码
			    $("#btn_phone_getCode_forget").bind('click',function(){
					var val = $.trim($("#val_phone_forget").val());
					if(checkPhoneNum($("#val_phone_forget"),val)){
						sendValidCode("register/sendPhoneNumValidCode_check",{phoneNum:val},$("#btn_phone_getCode_forget"),$("#errMsg_forget"), $("#val_jobId_forget"))
					}
				});

				//找回密码，获取邮箱验证码
			    $("#btn_email_getCode_forget").bind('click',function(){
					var val = $.trim($("#val_email_forget").val());
					if(checkEmail($("#val_email_forget"),val)){
						sendValidCode("register/sendEmailValidCode_check",{email:val},$("#btn_email_getCode_forget"),$("#errMsg_forget"), $("#val_jobId_forget"))
					}
				});
			  //清除异常信息
				$("#dialog_forgetPwd input[type='text']").bind('focus',function(){
					$("#errMsg_forget").text('');
				})

			  	$("#cbo_agreeTerms").bind('click',function(){
			  		if($(this).hasClass('isChecked')){
			  			$(this).attr('src','resources/images/yuan.png').removeClass('isChecked');
						$(".btn_reg").removeClass("btn_yes");
						$(".btn_down").removeClass("btn_yes");
					}else{
						$(this).attr('src','resources/images/password.png').addClass('isChecked');
						$(".btn_reg").addClass("btn_yes");
						$(".btn_down").addClass("btn_yes");
					}
			  	})
			  	setTimeout(function(){$("#userName-id").focus()},50);
			});
			
			var oLoginCheckUrl = {
					hasPushList:false,//是否已经push url list
					list:[{url:"",hasDo:false}],
					currServerUrl:"",//当前要请求登录的域名
			};
			var isReadPact = 0;
			var changeNotice = 0;
			var reloadTimer = null;
			
			//登录成功才记住账户密码
			function rememberDataAfterLoginSucc(userName,pwd){
				 var old=localStorage.getItem('nameorpass');
				var setdata={ "name":userName,"pass":pwd};
                 if(old==null){
                     old=[];
                 }else{                       
                     old = JSON.parse(old);
                 }
					var storageBool=true;
                 for(var i=0;i<old.length;i++){
                     if(userName==old[i].name){
                         storageBool=false;
                     }
                 }
                 if(storageBool){
                     if($('.imageSave').is(':hidden')){
                     	old.push(setdata);
                     	localStorage.setItem('nameorpass', JSON.stringify(old));
                     }
                 }
			} 
			
			//登录
			function fn_login(serverUrl,fn){
				
			
				var userName = $.trim($("#userName-id").val()).toUpperCase();//用户名
				var pwd = $.trim($("#passWd-id").val());//密码
				var errObj;
				if(userName.length < 8 || userName.length > 9){
					dialogTips("#userName-id","用户名必须输入8到9位 ");//"用户名必须输入8到9位"
				}else if(pwd.length<6 || pwd.length>50){
					dialogTips("#passWd-id",getI18n("password_err_len"));
				}else{
                   
					var loginVal = $(".loginInput-btn").val();
					var resultObj;
					//请求的数据
					requestData = {userName:userName,password:pwd,loginTime:getDateText(null,4),isReadPact:isReadPact,changeNotice:changeNotice,lang:LANG,type:localStorage.getItem("login_type") || 1};
					console.log(serverUrl || "/ShineOSS/login","1111");
					//密码是否md5加密  isUserLocal isMD5Type					
					
					if(isUserLocal && isMD5Type){//使用记录密码登录
						requestData.passwordMd5 = pwd;
						requestData.password = '';
					}
					else if(!isUserLocal && isMD5Type){
						requestData.passwordMd5 = MD5(pwd);
						requestData.password = '';
					}
					else if(!isUserLocal && !isMD5Type){//明文登录，二次登录
						requestData.passwordMd5 = '';
					}
					
					$.ajax({
						url : serverUrl || "/ShineOSS/login",
						data : requestData,
						async:false,
						type : "post",
						beforeSend : function(){
							$(".loginInput-btn").addClass('allBtnnotClick').val(getI18n("loging"));
							$(".loginInput-btn").attr("disabled","disabled");
							localStorage.removeItem("menuIndex");
						},
						complete:function(){
							$(".loginInput-btn").removeClass('allBtnnotClick').val(loginVal);
							$(".loginInput-btn").removeAttr("disabled");
						},
						success : function(data){
							//{"result":1,"msg":"false"}请求成功
							resultObj=data;
							//有分区标识，去掉分区标识
							
							
							$.cookie("adPic","true")
							
							if(data.result==0){
								if(data.msg.substr(0, 1) == "{"){
									//返回当前登录失败次数	
									var msg = JSON.parse(data.msg);
									var failNum = msg.failures;
									var err_msg = '';
									if(failNum < 3){
										err_msg = '用户名或密码错误'//用户名或密码错误				
									}else if(failNum == 3){
										err_msg = '密码输入错误3次，剩余2次机会，输入错误5次后系统将锁定您的账号，请检查输入密码。'//密码输入错误3次，剩余2次机会，输入错误5次后系统将锁定您的账号，请检查输入密码。
									}else if(failNum == 4){
										err_msg = '密码输入错误4次，剩余1次机会，输入错误5次后系统将锁定您的账号，请检查输入密码。'//密码输入错误4次，剩余1次机会，输入错误5次后系统将锁定您的账号，请检查输入密码。
									}else{
										err_msg = '密码输入错误5次，系统将暂时锁定您的账号，请15分钟后再次尝试。'//密码输入错误5次，系统将暂时锁定您的账号，请15分钟后再次尝试。
									}
									$("#err_login").text(err_msg);
								}else{
									//返回当前系统较为繁忙，请稍后重试	
									dialogTips("#userName-id",data.msg);
								}	
							}
							else if(data.result == "4"){//补充协议弹窗
								fenquLayer.$data.isHideMask = false;
								fenquLayer.$data.serverStatus = 3;
							}
							else if(data.result == "5"){//变更通知弹窗
								fenquLayer.$data.isHideMask = false;
								fenquLayer.$data.serverStatus = 4;
							}
							else if(data.result == "3"){//检测账号存在多个服务区
								fenquLayer.$data.isHideMask = false;
								fenquLayer.$data.serverStatus = 1;
								//根据当前域名修改currHostname和areaList的状态
								fenquLayer.updateHostname(function(){});
									
								
								//根据后台返回的域名数据list
								if(data.obj && typeof data.obj == "object"){
									for(var i=0;i<data.obj.length;i++){
										data.obj[i].active = false;
										data.obj[i].on = false;
									}
									fenquLayer.$data.areaList = data.obj;
									fenquLayer.$data.sureChooseBtnActive = false;
								}
							}
							else if(data.result==7){
								//$("#err_login").text('系统将暂时锁定您的帐号，请稍后再次尝试。');//系统将暂时锁定您的帐号，请稍后再次尝试。
								//以服务器返回动态字段做提示语
								$("#err_login").text(data.msg);
								
							}
							else if(data.result == "6"){								
								
								//var LoginUrl = getNeverRequest(oLoginCheckUrl);
								if(LANG == "cn" || LANG == "ft"){
									var ts = "账户不存在，请尝试其他服务器登录!";
								}
								else{
									var ts = "The account does not exist, please try another server to log in.";
								}
								//根据后台返回的域名数据list
								if(data.obj && typeof data.obj == "object"){
									for(var i=0;i<data.obj.length;i++){
										data.obj[i].active = false;
										data.obj[i].on = false;
									}
									fenquLayer.$data.areaList = data.obj;
									fenquLayer.$data.sureChooseBtnActive = false;
								}
								
								fenquLayer.$data.fenquContent = ts;
								fenquLayer.$data.isHideMask = false;
								fenquLayer.$data.serverStatus = 1;
							}
							else if(data.result == 8){
								//md5密码与服务器的md5不匹配，重新使用铭文密码登录
								isMD5Type = false;
								isUserLocal = false;
								fn_login(serverUrl,fn);															
							}
							else if(data.result == "1"){
								if( localStorage.getItem("login_type")) localStorage.removeItem("login_type");
								
								//存储server list
								if(data.obj && data.obj.length > 0){
									oLoginCheckUrl = pushServerListFn(oLoginCheckUrl,data);
								}
								
								var b = checkServerByUser(serverUrl || "/ShineOSS/login" );
								if(fn && !b) return fn();
								
								localStorage.setItem("hasOpenPointLayer",1);
								reloadTimer = setTimeout(function(){ clearTimeout(reloadTimer);window.location.reload(); },10);
								//登录成功才记住账户密码
								let md5Password = (requestData.passwordMd5 == '') ? MD5(requestData.password) : requestData.passwordMd5;
								rememberDataAfterLoginSucc(userName, md5Password );
								
								if(isNeedSaveuser) saveUser(userName, md5Password );
								
							}	
							
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							dialogTips(getI18n('timeout'));
						}
					});
				}
				return false;
			}

			//登陆成功，且当前浏览器域名和登所请求地址域名不一致，则弹出30秒倒计时（检测账户在其他分区情况）
			function checkServerByUser(serverLoginUrl){
				if( serverLoginUrl == "/ShineOSS/login" || serverLoginUrl == "/login"){//针对本地判断
					return false;
				}
				serverLoginUrl = serverLoginUrl.replace("/login","");//已经登陆的接口域名+协议
				if(serverLoginUrl.indexOf("http") == -1){//mei带协议
					serverLoginUrl = location.protocol +"//"+ serverLoginUrl;
				}
				
				var currHostname = window.location.hostname;//当前域名
				if(serverLoginUrl != (location.protocol + "//" + currHostname) ){//当前浏览器域名不等于当前登录接口域名
					fenquLayer.$data.isHideMask = false;
					fenquLayer.$data.serverStatus = 2;
					fenquLayer.$data.checkStatus = 1;
					var curUrl = location.protocol +"//" + currHostname;
					var newUlr = serverLoginUrl;
					
					fenquLayer.render_xhb_pro_1(curUrl,newUlr);
					return true;
				}
				
				return false;
			}
			
			//push server list
			function pushServerListFn(oLoginCheckUrl,data){
				if(!oLoginCheckUrl.hasPushList){
					oLoginCheckUrl.hasPushList = true;
					var isSame = false;
					for(var i=0;i<data.obj.length;i++){						
						isSame = location.hostname == data.obj[i] ? true : false;
						oLoginCheckUrl.list.push({
							url:data.obj[i],
							hasDo:isSame
						});
					}
					
				}
				return oLoginCheckUrl;
			}
			
			//获取从未请求过的服务器地址
			function getNeverRequest(oLoginCheckUrl){
				console.log(oLoginCheckUrl,"oLoginCheckUrl")
				var url = "";
				for(var i=0;i<oLoginCheckUrl.list.length;i++){
					if(!oLoginCheckUrl.list[i].hasDo){
						
						url = location.protocol + '//' +oLoginCheckUrl.list[i].url + '/login';
						//url = 'https://' +oLoginCheckUrl.list[i].url + '/login';
						oLoginCheckUrl.list[i].hasDo = true;
						oLoginCheckUrl.currServerUrl = oLoginCheckUrl.list[i].url;
						break;
					}
				}
				return url;
			}
			
			
			function clickRegOk(){
				if(regType==0){
					regInstaller();
				}else if(regType==1){
					regDistributor();
				}else if(regType==2){
					regEmployee();
				}
			}
			//注册安装商
			function regInstaller(){
				$("#errMsg_reg").text('');
				var regExp = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/
				var company = $.trim($("#val_supCompany_regInstaller").val());
				var azCountry = $("#azCountry").find('option:selected').val();
				var deviceSN = $("#deviceSN").val();
				var accountName = $("#accountName").val();
				//var introduction = $("#introduction").val();
				var accountURL = $("#accountURL").val();
				var accountAddress = $("#accountAddress").val();
				var kvkNumber = $.trim($("#kvkNumber").val());
				var lang = LANG;
				//英文版添加国家必选验证
				if(!ODMPARAMS.regIsSimple && $("#azCountry").find('option:selected').val()==""){
					dialogTips(".val_azCountry_regDistributor","选择国家"+"！");//请选择国家
					return false;
				}
				if(!ODMPARAMS.regIsSimple){
					checkSerialNumber(deviceSN);
					if(!fromDesign && (deviceSN==""||deviceSN==null)){
						dialogTips(".val_deviceSN_regDistributor","请输入设备序列号"+"！");//请输入设备序列号
						return;
					} 
					else if(!fromDesign && checkSerial!=1){
						dialogTips(".val_deviceSN_regDistributor","请输入正确的设备序列号"+"！");//请输入正确的设备序列号
						return;
					} else if(accountName==""||accountName==null){
						dialogTips(".val_accountName_regDistributor","请输入公司名称"+"！");//请输入公司名称
						return;
					}else if(accountURL!='' && !(regExp.test(accountURL))){
						dialogTips("#accountURL","请输入正确的公司网址"+"！");//请输入正确的公司网址
						return;
					} else if(accountAddress==""||accountAddress==null){
						dialogTips("#accountAddress","请输入公司详细地址"+"！");//请输入公司详细地址
						return;
					}
				}
				if(!$("#cbo_agreeTerms").hasClass('isChecked')){
					dialogTips("#cbo_agreeTerms","您还未勾选《同意本公司各用户条款》");
					return;
				}
				reg('register/regInstaller',{
					company:company,
					azCountry:azCountry,
					deviceSN:deviceSN,
					accountName:accountName,
					//introduction:introduction,
					accountURL:accountURL,
					accountAddress:accountAddress,
					kvkNumber:kvkNumber,
					lang:lang,
					isDesignData:'1'	
				},function(data){
					if(data.result==1){
						localStorage.setItem("menuIndex","userCenter/selfData")
						if(fromDesign){
							window.location.href = window.location.href.replace("&isDesignData=1","")
						}else{
							window.location.reload();
						}
					}else if(data.result!=undefined){
						$("#errMsg_reg").text(data.msg);
					}else{
						dialogTips(getI18n('operat_err'));
					}
				});
			}
			function checkSerialNumber(deviceSN){
				$.ajax({
					url : "/ShineOSS/register/checkSerialNumber",
					data : {deviceSN:deviceSN},
					type : "post",
					async: false,
					success : function(data){
						if(data.result==1){
							checkSerial = 1;
						}else{
							checkSerial = 0;
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						if(textStatus=='timeout')
							dialogTips(getI18n('timeout'));
						else
							dialogTips(getI18n('operat_err'));
					}
				});
			}
			//注册分销商
			function regDistributor(){
				$("#errMsg_reg").text('');
				var company = $.trim($("#val_company_regDistributor").val());
				var orderNum = $.trim($("#val_orderNum_regDistributor").val());
				var azCountry = $.trim($("#azCountrytwo").val());
				//if(LANG!="cn" && LANG!="ft"){
					if($("#azCountrytwo").find('option:selected').val()==""){
						dialogTips(".val_azCountry_regDistributortwo","选择国家"+"！");//请选择国家
						return false;
					}
				//}
				if(company.length==0){
					dialogTips("#val_company_regDistributor",'公司名称不能为空');
					return;
				}else if(orderNum.length==0){
					dialogTips("#val_orderNum_regDistributor","订单号不能为空");
					return;
				}
				if(!$("#cbo_agreeTerms").hasClass('isChecked')){
					dialogTips("#cbo_agreeTerms","您还未勾选《同意本公司各用户条款》");
					return;
				}

				reg('register/regDistribute',{company:company,orderNum:orderNum,azCountry:azCountry},function(data){
					if(data.result==1){
						localStorage.setItem("menuIndex","userCenter/selfData")
						if(fromDesign){
							window.location.href = window.location.href.replace("&isDesignData=1","")
						}else{
							window.location.reload();
						}
					}else if(data.result!=undefined){
						$("#errMsg_reg").text(data.msg);
					}else{
						dialogTips(getI18n('operat_err'));
					}
				});
			}
			//注册员工
			function regEmployee(){
				//校验
				if(checkRegEmployee()){
					var jobId = $.trim($("#val_jobId_regEmployee").val()).toUpperCase();
					var password = $.trim($("#val_password_regEmployee").val());
					var phoneNum = $.trim($("#val_phoneNum_regEmployee").val());
					var phoneNumCode = $.trim($("#val_phoneNum_code_regEmployee").val());
					reg('register/regEmployee',{jobId:jobId,password:password,phoneNum:phoneNum,phoneNumCode:phoneNumCode},function(data){
						if(data.result==1){
							window.location.reload();
						}else if(data.result!=undefined){
							$("#errMsg_reg").text(data.msg);
						}else{
							dialogTips(getI18n('operat_err'));
						}
					});
				}
			}

			function reg(url,data,success){
				$.ajax({
					url : "/ShineOSS/"+url,
					data : data,
					type : "post",
					beforeSend : function(){
						$(".all-bottom-btn button").attr('disabled','disabled').addClass('allBtnnotClick');
					},
					complete:function(){
						$(".all-bottom-btn button").removeAttr("disabled").removeClass('allBtnnotClick');
					},
					success : success,
					error:function(XMLHttpRequest, textStatus, errorThrown){
						if(textStatus=='timeout')
							dialogTips(getI18n('timeout'));
						else
							dialogTips(getI18n('operat_err'));
					}
				});
			}

			//选择记住密码
			function selectSaveUser(){
				isNeedSaveuser=true;
				$(".imageSave").hide().siblings(".imageneverSave").show();
			}
			//取消选择记住密码
			function unSelectSaveUser(){
				isNeedSaveuser=false;
				saveRealUser([],[]);
				$(".imageneverSave").hide().siblings(".imageSave").show();
			}

			//将user保存进cookie
			function saveUser(name,pwd){
				delUser(name);
				var uns = getUOPs('uns');
				var pds = getUOPs('pds');
				uns.unshift(name);
				pds.unshift(pwd);
				while(uns.length>10){
					uns.pop();
					pds.pop();
				}
				saveRealUser(uns,pds);
			}
			function getUOPs(key){
				var rs = $.cookie(key);
				if(rs==undefined)return [];
				else return rs.split('_|');
			}
			function delUser(name){
				var uns = getUOPs('uns');
				var pds = getUOPs('pds');
				for(var i=0; i<uns.length; i++){
					if(uns[i]==name){
						uns.splice(i,1);
						if(pds.length>i)
							pds.splice(i,1);
						saveRealUser(uns,pds);
						break;
					}
				}
			}
			function saveRealUser(uns,pds){
				if(uns.length==0){
					$.cookie('uns',1,{expires:0,path:'/'});
					$.cookie('pds',1,{expires:0,path:'/'});
				}else{
					$.cookie('uns',uns.join('_|'),{expires:14,path:'/'});
					$.cookie('pds',pds.join('_|'),{expires:14,path:'/'});
				}
			}
			//是否保存了用户名
			function isHaveUserInCookie(){
				return $.cookie('uns')!=undefined;
			}


			function checkRegEmployee(){
				var errArr=[];
				if($.trim($("#val_jobId_regEmployee").val()).length!=8 || $.trim($("#val_jobId_regEmployee").val()).toUpperCase().indexOf('GRT')==-1)
					errArr=[$("#val_jobId_regEmployee"),'工号格式错误'];//工号格式错误
				else if($("#val_password_regEmployee").val().length<6)
					errArr=[$("#val_password_regEmployee"),'密码不能为空且需要长度至少6位'];//密码不能为空且需要长度至少6位
				else if($("#val_password_regEmployee").val()!=$("#val_password_again_regEmployee").val())
					errArr=[$("#val_password_again_regEmployee"),'两次密码输入不一致'];//两次密码输入不一致
				if(errArr.length!=0){
					dialogTips(errArr[0],errArr[1]);
					return false;
				}
				return checkPhoneNum($("#val_phoneNum_regEmployee"),$.trim($("#val_phoneNum_regEmployee").val()));
			}

			//检查邮箱
			function checkEmail(obj){
				var val = $.trim($(obj).val());
				if(validEmail(val)){
					return true
				}else{
					dialogTips(obj,'邮箱格式不正确');//邮箱格式不正确
					return false;
				}
			}
			//检查手机号
			function checkPhoneNum(obj,val){
				if(/^\+?[0-9]{8,16}$/.test(val)){
					return true
				}else{
					dialogTips(obj,'手机号码不正确');//手机号码不正确
					return false;
				}
			}

			function sendValidCode(url,data,sendBtn,errMsg,  jobId, isCaptchad){
				 //验证码逻辑
				if((url=='register/sendPhoneNumValidCode_check' || url=='register/sendPhoneNumValidCode') && !isCaptchad){
					  //无感验证，成功继续此方法往下走逻辑
					myCaptchaIntelligent(function(res){
						sendValidCode(url,data,sendBtn,errMsg,jobId,true);
					},data,"/ShineOSS");
					return;
				}
				var srcText = '获取验证码';//获取验证码
				$.ajax({
					url : "/ShineOSS/"+url,
					data : data,
					type : "post",
					beforeSend : function(){
						sendBtn.attr('disabled','disabled');
						sendBtn.val('正在发送');//正在发送
					},
					complete:function(){
						if(sendBtn.attr('data-send')==undefined){
							sendBtn.removeAttr("disabled");
							sendBtn.val(srcText);
						}
					},
					success : function(data){
						if(data.result==1){
							if(jobId!=undefined){
								if(data.obj.length>1){
									dialogTips(jobId.next(),data.msg,5000,false);
								}
								var html='';
								$.each(data.obj,function(k,v){
									html+='<option value="'+v+'">'+v+'</option>';
								});
								jobId.html(html);

								jobId.removeAttr('disabled');
								layui.form.render('select');
							}
							reGetCodeTime(sendBtn,120,srcText);
						}else if(data.result==2){
							reGetCodeTime(sendBtn,data.obj,srcText);
						}else if(data.result==0){
							errMsg.text(data.msg);
						}else if(data.result==-1){
							/////////////////////////////////////////////////////jobId
						}else{
							dialogTips(getI18n('timeout'));
						}
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
							dialogTips(getI18n('timeout'));
					}
				});
			}
			function reGetCodeTime(obj,timeS,srcText){
				$(obj).val('已发送('+timeS+')');//已发送
				$(obj).attr('disabled','disabled');
				$(obj).attr('data-send','data-send');
				if(timeS>0)
					window.setTimeout(function(){reGetCodeTime(obj,--timeS,srcText)},1000);
				else{
					$(obj).removeAttr("disabled");
					$(obj).val(srcText);
					$(obj).removeAttr('data-send');
				}
			}

			//开始找回密码
			function clickForgetOk(){
				if(checkForget(forgetPwdType)){
					var dataD = dataD || {jobId:$("#val_jobId_forget").val().toUpperCase(),newPassword:$("#val_password_again_forget").val()};
					if(forgetPwdType==0){
						dataD.email=$.trim($("#val_email_forget").val());
						dataD.code=$("#val_email_code_forget").val();
					}else{
						dataD.phoneNum=$.trim($("#val_phone_forget").val());
						dataD.code=$("#val_phone_code_forget").val();
					}
					$.ajax({
						url : "/ShineOSS/register/findPassWord",
						data : dataD,
						type : "post",
						beforeSend : function(){
							$("#dialog_forgetPwd .all-bottom-btn button").attr('disabled','disabled');
						},
						complete:function(){
							$("#dialog_forgetPwd .all-bottom-btn button").removeAttr("disabled");
						},
						success : function(data){
							if(data.result==1){
								dialogClose();
								$("#userName-id").val(dataD.jobId);
								$("#passWd-id").val(dataD.newPassword);
								$(".loginInput-btn").click();

							}else if(data.result==0){
								$("#errMsg_forget").text(data.msg);
							}else{
								dialogTips(getI18n('timeout'));
							}
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
								dialogTips(getI18n('timeout'));
						}
					});
				}
			}

			function checkForget(type){
				var errArr=[];
				if(type==0 && !validEmail($.trim($("#val_email_forget").val())))
					errArr=[$("#val_email_forget"),'邮箱格式不正确'];//邮箱格式不正确
				else if(type==0 && $("#val_email_code_forget").val().length!=6)
					errArr=[$("#val_email_code_forget"),'请完成验证码'];//请完成验证码
				else if(type==1 && !/^\+?[0-9]{8,16}$/.test($.trim($("#val_phone_forget").val())))
					errArr=[$("#val_phone_forget"),'手机号码不正确'];//手机号码不正确
				else if(type==1 && $("#val_phone_code_forget").val().length!=6)
					errArr=[$("#val_phone_code_forget"),'请完成验证码'];
				else if($("#val_password_forget").val().length<6)
					errArr=[$("#val_password_forget"),'密码不能为空且需要长度至少6位'];//密码不能为空且需要长度至少6位
				else if($("#val_password_forget").val()!=$("#val_password_again_forget").val())
					errArr=[$("#val_password_again_forget"),'两次密码输入不一致'];//两次密码输入不一致
				if(errArr.length!=0){
					dialogTips(errArr[0],errArr[1]);
					return false;
				}
				return true;
			}

			function resetForget(){
				$("#errMsg_forget").text('');
				$("#val_email_forget,#val_phone_forget,#val_email_code_forget,#val_phone_code_forget").val('');
				$("#val_jobId_forget").html('<option value="">工号</option>');
				$("#val_jobId_forget").attr('disabled','disabled');
				layui.form.render('select');
			}

			$("body").on('mouseover','.pssswordTip',function(){
				dialogTips($(this),getI18n('pass_tips'),30000,false);
			})
			$("body").on('mouseout','.tipImg',function(){
				layer.closeAll('tips');
			})
			$("body").on('mouseover','.codeTip',function(){
				dialogTips($(this),"验证码有效时间为发送后一小时内，若有接收延迟，也可重新打开此页面直接填写。",30000,false);
			})
			$("body").on('mouseover','.snTip',function(){
				dialogTips($(this),"输入Growatt任一设备序列号",30000,false);
			})
			
			window.onload = function(){
				if(fromDesign){
					 $(".register").click()
			         $(".agent").click();
					 $(".snTip").hide();
			         $(".star").hide()
				}          
	        }
			
		
		//初始化和监听分区
		 initServerListFn();
		function initServerListFn(){
			var tem = '';
			for(var i=0;i<serverHostnameList.length;i++){
				tem += '<li><span data-url="'+ serverHostnameList[i].url +'">'+ serverHostnameList[i].txt +'</span></li>';
			}
			$(".serverList ul").html(tem);
			$(".serverList2 ul").html(tem);
			
			
			$(".serverList2 ul li").each(function(){
				if($(this).find("span").attr("data-url") == window.location.hostname){
					$(this).addClass("active").siblings("li").removeClass("active");
				}
			});
			
			//初始化分区选项值
			$(".serverList ul li").each(function(){
				if($(this).find("span").attr("data-url") == window.location.hostname){
					$(".serverList .currSpan").text( $(this).text() );
				}
			});
			$(".serverList").on("mouseover",function(){
				$(".serverList ul").removeClass("hide");
				// $(".serverList .currSpan").removeClass("down");
			});
			$(".serverList").on("mouseout",function(){
				$(".serverList ul").addClass("hide");
				// $(".serverList .currSpan").addClass("down");
			});
			$(".serverList ul li,.serverList2 ul li").on("click",function(){
				//$(".serverList .currSpan").text( $(this).text() );
				console.log($(this).find("span").attr("data-url"));
				window.location.href =  "https://" + $(this).find("span").attr("data-url");
			});
			
		}
		
		
		
		//取消数据保护协议，取消变更通知
		$("#yc_notice_close,#yc_notice_close2").on("click",function(){
			fenquLayer.$data.isHideMask = true;
		});
		//同意数据保护协议
		$("#yc_notice_cancel").on("click",function(){
			var checked = $("#sjbh").prop("checked");
			if(!checked){
				layer.msg("请先查看，并勾选数据保护协议才能操作");//请先查看，并勾选数据保护协议才能操作
				return false;
			}
			fenquLayer.$data.isHideMask = true;
			isReadPact = 1;
			fn_login();
			
		}); 
		
		//同意变更通知
		$("#yc_notice_cancel2").on("click",function(){
			
			fenquLayer.$data.isHideMask = true;
			changeNotice = 1;
			fn_login();
			
		}); 
				
		
		//分区选项卡提示内容事件
		 $(".serverList2NoticeBox").on("mouseover",function(){
			$(".serverList2NoticeListBox").removeClass("hide");
		});
		$(".serverList2NoticeBox").on("mouseout",function(){
			$(".serverList2NoticeListBox").addClass("hide");
		}); 
		