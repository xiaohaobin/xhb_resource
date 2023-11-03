/**
 * $(".oneShow").hide();
	$(".twoShow").hide();
	$(".threeShow").hide();
	$(".oneThreeShow").hide();
	$(".twoThreeShow").hide();
	$(".fiveShow").show();
	根据以上dom节点的class特征值可建立数据字典表  canShowList
 * 
*/
const canShowList = {
	'oneShow':1,
	'twoShow':2,
	'threeShow':3,
	'fiveShow':5,
	'oneThreeShow':[1,3],
	'twoThreeShow':[2,3],
}

//针对index索引值，设置对应canShowList的属性值相匹配的item进行操作
function setCanShowListItemByIndex(index){
	index = index*1;
	for(let key in canShowList){
		if(typeof canShowList[key] == 'number'){
			canShowList[key] === index ? $('.'+ key).show() : $('.'+ key).hide();
		}else{
			canShowList[key].includes(index) ? $('.'+ key).show() : $('.'+ key).hide();
		}
	}
}

