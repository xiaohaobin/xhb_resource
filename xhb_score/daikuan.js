$(function(){
	class getLoanData {
		
		//jq Dom 表格表中tbody jq dom节点
		constructor(Dom) {
			this.Dom = (typeof Dom == "string" ? window.$('#'+Dom) : Dom);
			this.totalCount = 0;//总期数
			this.mainData = [];//count(期数)  interest(利息)  principal（本金） principalAndInterest（偿还本息） remainingPrincipal（剩余本金）
			this.init();
		}
		
		init(){
			const _this = this;
			this.Dom.find('tr').each(function(){
				let count = $(this).find('td').eq(0).text()*1;
				let principalAndInterest = $(this).find('td').eq(1).text()*1;
				let interest = $(this).find('td').eq(2).text()*1;
				let principal = $(this).find('td').eq(3).text()*1;
				let remainingPrincipal = $(this).find('td').eq(4).text()*1;
				
				_this.mainData.push({
					count,
					principalAndInterest,
					interest,
					principal,
					remainingPrincipal
				});
			});
		}
		
		//获取特定年份累计偿还本息，利息和本金
		getTotalDataByYear(year){
			let totalInterest = 0;//总利息
			let totalPrincipal = 0;//总本金
			let totalPrincipalAndInterest = 0;//总偿还本息
			
			this.mainData.map((item,index)=>{
				if(index < year){
					totalPrincipalAndInterest += item['principalAndInterest'];
					totalInterest += item['interest'];
					totalPrincipal += item['principal'];
								
				}
			});
			return {
				totalInterest,
				totalPrincipal,
				totalPrincipalAndInterest
			};
		}
	}
});