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
    <div class="row">
        <div class="col-md-8">
            <?php foreach ($list as $pic) { ?><div class="item">
                <h2><?php echo $pic["title"]; ?></h2>
                <p>
                    <img src="<?php echo $pic["pic"]; ?>" style=" max-width: 80%;" alt="">
                </p>
                <hr />
            </div><?php }  if ($pagecount > 1) { ?><nav>
    <ul class="pagination">
        <?php if ($p > 1) { ?><li>
            <a href="<?php echo $page(1); ?>">首页</a>
        </li><?php }  if ($p > 1) { ?><li>
            <a href="<?php echo $page($p - 1); ?>">上一页</a>
        </li><?php }  if ($p - 4 > 2) { ?><li>
            <!-- 这里是 往前十页, 如果第一页显示了, 就隐藏这个'...' 按钮 -->
            <a href="<?php echo $page($p - 10 < 1 ? 1 : $p - 10); ?>"><span>...</span></a>
        </li><?php }  for ($i = $p - 4; $i <= $p + 4; $i++) {  if ($i > 0 && $i <= $pagecount) { ?><li class="<?php echo $p == $i ? 'disabled':""; ?>">
            <?php if ($p != $i) { ?><a href="<?php echo $page($i); ?>"><?php echo $i; ?></a><?php }  if ($p == $i) { ?><span><?php echo $i; ?></span><?php } ?>
        </li><?php }  }  if ($p + 4 < $pagecount) { ?><li>
            <!-- 这里是 后十页, 如果最后一页显示了, 就隐藏这个'...' 按钮 -->
            <a href="<?php echo $page($p + 10 > $pagecount ? $pagecount : $p + 10); ?>"><span>...</span></a>
        </li><?php }  if ($p < $pagecount) { ?><li>
            <a href="<?php echo $page($p + 1); ?>">下一页</a>
        </li><?php }  if ($p < $pagecount) { ?><li>
            <a href="<?php echo $page($pagecount); ?>">尾页 <?php echo $pagecount; ?></a>
        </li><?php } ?>
    </ul>
</nav><?php } ?>

        </div>
        <div class="col-md-4">
        	<h4>图片分类</h4>
            <ul>
                <?php foreach ($category as $cate) { ?><li>
                    <a href="#cate=<?php echo $cate["id"]; ?>"><?php echo $cate["title"]; ?></a>
                </li><?php } ?>
            </ul>
        </div>
    </div>
</div>
    <div class="well">
        版权所有 zhaishuaigan@qq.com, 运行时间: <?php echo microtime(true) - $start_time; ?> s
    </div>
</body>

</html>
