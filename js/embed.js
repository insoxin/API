const getAliOSSCreds = (params) => {
  return request({
    url: "admin/base/getOssToken",
    method: "get",
    params
  });
};
function userupLoad(user)  {{
    let params = {};
    params.type = fileType;
    
    return getAliOSSCreds(params).then((res) => {
      const Oss = require("ali-oss");
      const client = new Oss({
        region: res.region,
        secure: true,
        accessKeyId: res.accessKeyId,
        accessKeySecret: res.accessKeySecret,
        stsToken: res.securityToken,
        bucket: res.bucket,
        endpoint: res.endpoint
      });
      	methods: 
		//文件大小限制
		 {
		  let isLimit = file.size / 1024 / 1024 <= 1000;
		  if (!isLimit) {
		    this.$message.warning("上传文件不超过1G");
		    return false;
		  } }
      let key = res.dir + "/" + item.name;
      if (option != null) {
        return client.multipartUpload(key, item, { //切片上传
          progress: function (p, checkpoint) {
            option.onProgress({percent: Math.floor(p * 100)}); // 触发el-upload组件的onProgress方法
          }
        })
      } else {
        return client.put(key, item);
      }
    });
  }
}
function copyurl(node){
	var clipboard = new ClipboardJS(".copy-btn", {
		text: function(trigger) {
			return $("#"+node).val();
		}
	});
	clipboard.on('success', function (e) {
		layer.msg('复制成功！', {icon: 1});
	});
	clipboard.on('error', function (e) {
		layer.msg('复制失败，请长按链接后手动复制', {icon: 2});
	});
}
function getFileName(path){
	var pos1 = path.lastIndexOf('/');
	var pos2 = path.lastIndexOf('\\');
	var pos  = Math.max(pos1, pos2)
	if( pos<0 )
		return path;
	else
		return path.substring(pos+1);
}
layui.use(['form','upload'], function(){
    var form = layui.form;
    var upload = layui.upload;
	var predata;
    form.render();
    upload.render({
        elem: '#multiple'
        ,url: "api.jsp"
        ,accept: 'file'
        //,acceptMime: 'image/*'
        ,size: 102400
        ,drag: true
		,auto: false
		,data: {}
		,headers: {'X-OSS-server-side-encrpytion': 'AES256'}
		,bindAction: '#uploadBtn'
		,choose: function(obj) {
			var filename = $("input[name=file]").val();
			if(filename == ''){
				layer.alert('请选择文件！', {icon: 2, skin: 'layui-layer-molv', closeBtn: 0});
				throw new Error('upload failed');
			}
			filename = getFileName(filename);
			layer.msg('腾讯反病毒引擎查杀文件中...', {icon: 16,time: 2000,shade:[0.3, "#000"]});
			var that = this;
			$.ajax({
				type : "POST",
				url : "https://api.isoyu.com/upload/api.jsp?aup=pre_upload&appCode=B586A14C4EC466D33682F8626CCB3794&auturl=api.isoyu.com",
				data : {filename:filename},
				dataType : 'json',
				success : function(data) {
					layer.closeAll();
					if(data.code == 0){
						predata = data.data;
						that.data = {'Cache-Control':'max-age=2592000', 'Content-Disposition':'attachment', 'OSSAccessKeyId':predata.accessKeyId, 'Signature':predata.signature, 'host':predata.host, 'id':predata.id, 'key':predata.ossPath, 'policy':predata.policy, 'success_action_status':'200'};
						that.url = 'https://' + predata.host + '/';
						$('#uploadBtn').click();
					}else{
						layer.alert(data.msg, {icon: 2, skin: 'layui-layer-molv', closeBtn: 0});
						$("input[name=file]").val('')
					}
				},
				error: function () {
					layer.closeAll();
					layer.alert('上传失败！接口错误', {icon: 2});
				}
			});
		}
        ,before: function(obj) {
			layui.element.progress('demo', '0%');
            layer.load();
        }
        ,progress: function(n) {
            var percent = n + '%';
            layui.element.progress('demo', percent);
            if (n==100){
				layer.msg('上传成功', {icon: 16,time: 10000,shade:[0.3, "#000"]});
            }
        }
        ,done: function(res){
            layer.closeAll();
			$.ajax({
				type : "POST",
				url : "https://api.isoyu.com/upload/api.jsp?aup=complete_upload&appCode=B586A14C4EC466D33682F8626CCB3794&auturl=api.isoyu.com",
				data : {id: predata.id},
				dataType : 'json',
				success : function(data) {
					layer.closeAll();
					if(data.code == 0){
						var imgurlcdn = 'https://cdn.pan.360pan.ml/' + predata.ossPath;
						var imgurl = 'https://' + predata.host + '/' + predata.ossPath;
						var imgurlsy = 'https://' + predata.host + '/' + predata.ossPath + '?x-oss-process=image/watermark,size_30,text_eXl5LnNn,color_FFFFFF,shadow_50,t_100,g_se,x_10,y_10';
						var id = predata.id;
						$("#img-thumb a").attr('href',imgurl);
						$("#img-thumb img").attr('src',imgurl);
						$("#cdnurl").val(imgurlcdn);
						$("#url").val(imgurl);
						$("#urlsy").val(imgurlsy);
						$("#html").val("<img src='" + imgurl + "'/>");
						$("#markdown").val("![](" + imgurl + ")");
						$("#bbcode").val("[img]" + imgurl + "[/img]");
						$("#dlink").val(id);
						$("#imgshow").show();
						$("input[name=file]").val('')
					}else{
						layer.alert(data.msg, {icon: 2, skin: 'layui-layer-molv', closeBtn: 0});
					}
				},
				error: function () {
					layer.closeAll();
					layer.alert('上传失败！接口错误', {icon: 2});
				}
			});
			$("input[name=file]").val('')
        }
        ,error: function(){
            layer.closeAll();
            layer.alert("文件上传失败！", {icon: 2, skin: 'layui-layer-molv', closeBtn: 0});
			$("input[name=file]").val('')
        }
    });
	
});
