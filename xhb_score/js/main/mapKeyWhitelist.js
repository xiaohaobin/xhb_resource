//谷歌，百度地图使用白名单（ip，域名）
const IPWhiteList = [
	"183.62.216.35",
	"183.62.216.36",
	"20.6.1.140",
	"20.6.1.65",
	"20.60.5.100",
	"20.60.5.140",
	"20.60.5.191",
	"20.60.5.229",
	"20.60.5.230",
	"20.60.5.235",
	"47.243.98.28",
	"47.244.91.204",
	"8.210.168.234",
];

const DomainWhiteList = [
	"server.growatt.com",
	"server-cn.growatt.com",
	"server-us.growatt.com",
	"ftp.growatt.com",
	"server.smten.com",
	"zt.growatt.com",
	"oss.growatt.com",
	"oss-cn.growatt.com",
	"oss-us.growatt.com",
	"oss1.growatt.com",
	"oss1-cn.growatt.com",
	"oss1-us.growatt.com",
	"charge.growatt.com",
	"charger-server.atesspower.com",
	"charge.wellborne.fr",
	"shinedesign.growatt.com",
];

/**
 * 给域名或者ip字符串添加前后缀
 * @@param {Array}  arr ip域名数组
 * @@param {String} pre 前缀
 * @@param {String} suf 后缀    
 */
const addPrefixAndSuffix = (arr, pre='*', suf='*') =>{
	let list = [];
	for(let i=0;i<arr.length;i++){
		list.push( pre + arr[i] + suf );
	}
	return list;
}

