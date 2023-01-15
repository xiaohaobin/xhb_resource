/**
 * 柯里化 ajax請求成功返回輸出請求數據
 * 需要依賴jquery
 */
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
		    msg: `系统错误${res.msg}，请稍后再试～`,//打印的是後臺的msg字段
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
//定義某接口
const getPlantDataApi = data => PA_request_fn('testData.json', data, { method: 'GET' });
var oComfn = {
	async getPlantDataApi(e){
	    try {
	      const res = await getPlantDataApi({lang:'cn'});                 
	      console.info("請求成功獲取數據",res)
	    } catch (error) {
	      console.warn(error);
	    }
	},
}

//調用
// oComfn.getPlantDataApi()