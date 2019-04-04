$(function(){
	$('#create_btn').click(function(){
		//判断输入是否符合标准
		var url=$('#search').val();
		if(url==''){
			alert('输入的网址不能够为空!');
			return;
		}
		var type=$('input:radio:checked').val();
		//设置lodding
		$('.short_url,#error_mesg').hide();
		$('#mess').show().html("<img src='./style/lodding.gif'/>");
		var data={type:type,url:url};
		var request=$.ajax({
			type: 'post',
			dataType: 'json',
			url: 'create.php',
			data: data,
		});
		//success
		request.done(function(response) {
    		if(response.code){
    			$('#mess').hide();
    			$('.short_url').show();
    			$('#o_short_url').val(response.data);
    		}else{
    			$('#mess').hide();
    			$('#error_mesg').show().html(response.message);
	    	}
		});
		//failed
	    request.fail(function(jqXHR, textStatus) {
	    		$('#mess').hide();
	    		$('#error_mesg').show().html('请求出错'+textStatus);
	    	});
		
			
		//点击短链接框  选择
		$('#o_short_url').click(function(){
			$(this).select();	
		})
		
		
	})
	/** 还原 **/
	$('#expand_btn').click(function(){
		//判断输入是否符合标准
		var url=$('#search').val();
		if(url==''){
			alert('输入的网址不能够为空!');
			return;
		}
		//设置lodding
		$('.long_url,#error_mesg').hide();
		$('#mess').show().html("<img src='./style/lodding.gif'/>");
		var data={url:url};
		
		var request=$.ajax({
			type: 'post',
			dataType: 'json',
			url: 'expand.php',
			data: data,
		});
		//success
		request.done(function(response) {
    		if(response.code){
    			$('#mess').hide();
    			$('.long_url').show();
    			$('#o_long_url').val(response.data);
    		}else{
    			$('#mess').hide();
    			$('#error_mesg').show().html(response.message);
	    	}
		});
		//failed
	    request.fail(function(jqXHR, textStatus) {
	    		$('#mess').hide();
	    		$('#error_mesg').show().html('请求出错');
	    	});
		
		
	});
	/** 复制短地址 */
	$('#copy_btn').click(copyToClipboard)
	
	function copyToClipboard() {    
		var txt = $("#o_short_url").val();
		if(window.clipboardData) {    
				 window.clipboardData.clearData();    
				 window.clipboardData.setData("Text", txt);    
				 alert("复制成功");
		 } else if(navigator.userAgent.indexOf("Opera") != -1) {    
			  window.location = txt;    
			 alert("复制成功");
		 } else if (window.netscape) {
			  try {    
				   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");    
			  } catch (e) {    
				   alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");    
			  }    
			  var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);    
			  if (!clip)    
				   return;    
			  var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);    
			  if (!trans)    
				   return;    
			  trans.addDataFlavor('text/unicode');    
			  var str = new Object();    
			  var len = new Object();    
			  var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);    
			  var copytext = txt;    
			  str.data = copytext;    
			  trans.setTransferData("text/unicode",str,copytext.length*2);    
			  var clipid = Components.interfaces.nsIClipboard;    
			  if (!clip)    
				   return false;    
			  clip.setData(trans,null,clipid.kGlobalClipboard);    
			  alert("复制成功");
		 }else{
			  alert("您的浏览器不支持复制按钮,请手动复制短网址");
		  return false;
		 }    
}
})
