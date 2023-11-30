html += ("<td width='320'>"+
	"<spring:message code="device_datalog"/>：<span title='"+v.sn+"' style='text-overflow: ellipsis;max-width: 130px;overflow: hidden;display: inline-block;vertical-align: bottom;'>"+v.sn+"</span>"+
	"<i class='tips' data-isHtml='true' data-bg='#4c4e83' data-fx='3' data-area='280px'>"+
		"<table class='tipstable'>"+
			"<tr>"+
				"<th><spring:message code="common_sim_signal"/></th>"+
				"<td>"+getSimSignalText(v.simSignal,v.deviceTypeIndicate)+"</td>"+
			"</tr>"+
			"<tr>"+
				"<th><spring:message code="common_deviceType"/></th>"+
				"<td>"+v.deviceType+"</td>"+
			"</tr>"+
			"<tr>"+
				"<th><spring:message code="device_datalogVersion"/></th>"+
				"<td>"+v.firmwareVersion+"</td>"+
			"</tr>"+
			"<tr>"+
				"<th><spring:message code="device_datalogIPAndPort"/></th>"+
				"<td>"+v.ipAndPort+"</td>"+
			"</tr>"+
			"<tr>"+
				"<th><spring:message code="new_State"/></th>"+
				"<td>"+(v.stateGrid==undefined ? '' : v.stateGrid)+"</td>"+
			"</tr>"+
			"<tr>"+
				"<th><spring:message code=""/></th>"+
				"<td>"+(v.stateGridModel==undefined ? '' : v.stateGridModel)+"</td>"+
			"</tr>"+
		"</table>"+
	"</i>"+
"</td>");
				