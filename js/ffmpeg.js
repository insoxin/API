const exec = require('child_process').exec;
const superagent = require('superagent');
const fs = require('fs');
const glob = require("glob");

const tempGif = './temp.gif';//伪装图片的模板
const videoDir = './1.mp4';//视频路径
const tsDir = './tmp/';//切片及m3u8文件存储路径
const size = 1;//视频切片大小，数字越大单个切片时常越长体积越大
const content = `ffmpeg -i ${videoDir} -c copy -map 0 -f segment -segment_list ${tsDir}index.m3u8 -segment_time ${size} ${tsDir}%03d.ts`;//切片命令

try {
    fs.mkdirSync(tsDir)
} catch (error) {

}

// 调用shell脚本方法
async function shell(content) {
    return new Promise((resolve, reject) => {
        exec(content, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(stdout)
            }
        });
    })
}
async function sleep(s = 1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, s * 1000);
    })
}

// 上传方法（频繁重传）
async function upload(path) {
    try {
        // 58同城的
        let one = fs.readFileSync(path)
        let tmpo = fs.readFileSync(tempGif)

        let s = await superagent.post("https://upload.58cdn.com.cn/json")
            .set({
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
            })
            .send({
                'Pic-Encoding': "base64",
                'Pic-Path': "/nowater/webim/big/",
                'Pic-Size': "0*0",
                'Pic-Data': Buffer.concat([tmpo, one]).toString('base64')
            })

        return 'https://pic3.58cdn.com.cn/nowater/webim/big/' + s.text
    } catch (error) {
        // 出错表示上传频繁拒绝了，暂停3秒继续请求
        sleep(3)
        console.log(error)
        return upload(path)
    }
}


(async () => {
    // 进行视频切片
    console.log('开始视频切片')
    await shell(content);
    console.log('视频切片完成')

    // 获取到切片列表
    let tsList = glob.sync(`${tsDir}*.ts`);

    // 获取到m3u8实体内容
    let m3u8Content = fs.readFileSync(`${tsDir}index.m3u8`).toString();

    console.log('开始上传切片')
    // 上传切片
    for (let index in tsList) {
        let ele = tsList[index]
        let tsName = ele.split('/')[ele.split('/').length - 1]
        // 执行上传
        let url = await upload(ele)

        // 获取到上传地址后替换原版的地址
        m3u8Content = m3u8Content.replace(tsName, url)

        // 删除已上传的ts
        fs.unlinkSync(ele)
        console.log(`上传成功，当前上传进度：${parseInt(index) + 1}/${tsList.length}`)
        console.log('==============================')

    }
    console.log('切片上传完成')

    // 清空文件缓存
    fs.unlinkSync(`${tsDir}index.m3u8`)

})()
