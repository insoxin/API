<!DOCTYPE html>
<html>

<head>
    <title><?php echo $title; ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.css" />
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script type="text/javascript" src="http://apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>

<body>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="javascript:void(0);">Think Angular</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <?php foreach ($navs as $nav) { ?><li class="<?php echo $nav["title"] == $title ? 'active' : ''; ?>">
                        <a href="<?php echo $nav["url"]; ?>"><?php echo $nav["title"]; ?></a>
                    </li><?php } ?>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0);">退出</a></li>
                    <li class="dropdown">
                        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">用户 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="javascript:void(0);">我的消息</a></li>
                            <li><a href="javascript:void(0);">我的关注</a></li>
                            <li><a href="javascript:void(0);">我的文章</a></li>
                            <li><a href="javascript:void(0);">个人设置</a></li>
                            <li><a href="javascript:void(0);">退出登录</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
    <div class="jumbotron">
        <p>
            如果对Think Angular有好的建议, 可以在此处直接提交, 我将会收到一封邮件, 将根据建议优化模板引擎.
        </p>
        <form action="" onsubmit="return false">
            <div class="form-group">
                <label for="exampleInputEmail1">你的名字</label>
                <input type="text" name="name" class="form-control" id="exampleInputEmail1" placeholder="Name" />
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">你的邮箱</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1" placeholder="Email" />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">建议</label>
                <textarea name="msg" class="form-control" cols="30" rows="10" placeholder="在这里输入你的建议"></textarea>
            </div>
            <a class="btn btn-primary btn-lg" target="_blank" href="javascript:submit()">提交建议</a>
        </form>
        <script>
        function submit() {
            var name = $('input[name=name]').val();
            var email = $('input[name=email]').val();
            var msg = $('textarea[name=msg]').val();
            if (!name) {
                alert('请输入你的名字');
                return false;
            }
            if (!email) {
                alert('请输入你的邮箱');
                return false;
            }
            if (!msg) {
                alert('请输入你的建议');
                return false;
            }
            var data = {
                name: name,
                email: email,
                msg: msg
            };
            $.post('http://app.zhaishuaigan.cn/api/feedback/add', data, function(result) {
                if (result.code === 0) {
                    alert('反馈成功');
                    $('input[name=name]').val('');
                    $('input[name=email]').val('');
                    $('textarea[name=msg]').val('');
                } else {
                    alert(result.msg);
                }
            });
            return false;
        }
        </script>
    </div>
</div>
    <div class="well">
        版权所有 zhaishuaigan@qq.com, 运行时间: <?php echo microtime(true) - $start_time; ?> s
    </div>
</body>

</html>
