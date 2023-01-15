var p = new Promise(function(resolve, reject) {
  resolve();
});

// promise拆分
function createProcessPromise() {
  var resolve = void 0,
      reject = void 0;
  var instance = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });
  return {
    instance: instance,
    success: resolve,
    fail: reject
  };
}
const appLaunch = createProcessPromise();

var requestApi = function(url,param){
	var promise = new Promise(function(resolve, reject) {
	 
		  $.ajax({
			url:url,
			data:param,
			type:'get',
			success:function(res){
				if(res.result === 1){
					 resolve(res);
				}else{
					reject('後臺數據相應：'+JSON.stringify(res));
				}
			}
		  })
	});
	return promise;
}

// var res = requestApi('testData.json',{id:1}).then(result => {
// 	console.log(result,111111);
// 	return requestApi('testData2.json',{id:2})
// })
// .then(result => {
// 	console.log(result,"2222");	
// 	appLaunch.success();
// })
// .catch(e => {
// // app初始化流程某个流程的接口可能出现问题，初始化失败
// 	appLaunch.fail();
// });
// console.log(res,"....")

/**
 * @param {Object} obj 
 * {
 *    url: "" 请求地址,
 *    methods: "get/post" 请求方法,
 *    data: {} 请求参数
 * }
 * @returns {JSON} 
 */ 
var promise_ajax = function (obj) {
    //返回promise对象
    return new Promise((res, rej) => {
        let xhr = null
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            //兼容ie5、ie6
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
		
		
        // 监听请求状态变化
        xhr.onreadystatechange = function () {
            try {
 
                if (xhr.readyState == 4 && xhr.status == 200) {
					var resData = typeof this.responseText == "object" ? this.responseText : JSON.parse(this.responseText);
					
					res(resData)
                } else {
                    if (xhr.status == 404) throw '404,未找到页面'
                }
            } catch (e) {
				
                rej(e)
            }
        }
 
        if (obj.methods != undefined && obj.methods != '') {
            var method = String(obj.methods).toUpperCase;
            if (method == 'GET') {
                let data = '?'
                for (let key in obj.data) {
                    data += key + '=' + obj.data[key] + '&'
                }
                data.substring(data.length - 1)
                obj.data = data
            }
        } else {
            throw new Error("请求方式不能为空！")
        }
 
        xhr.open(obj.methods, obj.url, true) //发起请求
		// xhr.setRequestHeader("Accept","text/plain");
		// xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        //发送请求
        method == 'GET' ? xhr.send() : xhr.send(obj.data);
		
    })
}

promise_ajax({
	url:"testData.json",
	data:{
		name:"xhb"
	},
	methods:"get"
})
.then(result => {
	console.log(result,"自定義permise ajax");	
})


// Promise
function getNewDate(url,param){    
	return new Promise(function(resolve,reject){
		$.ajax( {                    
			url: url || '',                    
			type: 'GET',                    
			dataType: 'json',
			async: true,
			data:param,                
		}).done(function(res){
			// var thisDate = res.data.date;    //需要返回thisDate 
			resolve(res);                
		}).fail(function(err){
			//console.log("error");                   
			 reject(err);
		}).always(function(){ });
	});
}
// const pa2 = getNewDate('testData.json',{name:"xhb"}).then(
// 	function(resolveData){
// 		//code....        
// 		console.log('resolveData',resolveData);    
// 	},
// 	function(rejectData){
// 		console.log('rejectData',rejectData);    
// 	}
// );


//====================================================================柯里化函数====================================================================

//函數柯里化
function myCurried(fn) {
  return function curry(...args1) {
    if (args1.length >= fn.length) {
      return fn.call(null, ...args1)
    } else {
      return function (...args2) {
        return curry.apply(null, [...args1, ...args2])
      }
    }
  }
}



function sum(a, b, c, d, e) {
  return a + b + c + d + e
}
// let resFunc = myCurried(sum)
// console.log(resFunc(1,3,4)(1)(23))

function testDo(a,b,c){
	return a*b/c;
}

// let _testDo = myCurried(testDo)
// console.log( _testDo(10,1)(2) ) ;


/**
 * 柯里化函数
 * @param {function} fn 需要要执行的函数
 * @param {boolean} isLoading 页面导航栏是否展示loading条
 * @returns function
 */
var promisify = function promisify(fn) {
  var isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {
      obj.success = function (res) {
        resolve(res);
      };
      obj.fail = function (err) {
        reject(err);
      };
      fn(obj);
    });
  };
};

//定义permise +ajax==============================================================================================================
const PA_Request = promisify($.ajax, true);
const PA_request_fn = async (url, data, options = {}) => {
	const defaultOptions = {
	  // 请求方法, 默认get
	  type: 'GET',
	  // 是否显示loading
	  isShowLoading: true,
	  // 接口报错是否展示toast
	  isShowToast: true,
	};
	const _options = Object.assign({}, defaultOptions, options);
	
	const params = {
	  url: url,
	  data,
	  type: _options.type,
	};
	
	try{
		const res = await PA_Request(params);
		console.log('request:', res, params);
		
		if (res.result !== 1) {
		  console.warn(`运行时错误提示,接口为${url}`);
		  throw {
		    status: -1,
		    msg: `系统错误${res.statusCode}，请稍后再试～`,
		  };
		}
		
		
		return Promise.resolve(res);
	}catch(e){
		//TODO handle the exception
		console.warn('request请求后报错', e);
		
		
		return Promise.reject({
		  msg: `调用接口失败,接口为${url}, ${JSON.stringify(e)}`,
		  error:e,
		});
	}finally {
   
	}
}

const testDataApi = data => PA_request_fn('testData.json', data, { method: 'GET' });
var apiCom = {
	async getData(e){
	    try {
	      const res = await testDataApi({lang:'cn'});                 
	      console.info("permise ajax 接口",res)
	    } catch (error) {
	      console.warn(error);
	    }
	},
	
}
apiCom.getData()
