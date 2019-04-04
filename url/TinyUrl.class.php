<?php
/**
 * 生成短网址
 * 
 * @author silenceper
 *
 */
class TinyUrl{
	public $url=null;
	//sina key
	public $sinakey='2462706760';
	//网易key
	public $wykey='71e11b08ebc14f209ab57b73400a232b';
	//bit.ly key
	public $bitkey='R_7685e120ea72c1b49b55a681d09e35d0';
	
	public $error;
	
	public function createDwz(){
		$url="http://dwz.cn/create.php";
		$data=array('url'=>$this->url);
		$res=$this->_curl($url,'post',$data);
		if(!$res){
			return false;
		}
		$json=json_decode($res);
		
		if($json->status!=0){
			//出错
			$this->error=$json->err_msg;
			return false;
		}else{
			return $json->tinyurl;
		}
	}
	
	/**
	 * 生成sina短网址
	 */
	public function createtcn(){
		$source=$this->sinakey;
		$url_long=$this->url;
		$url="https://api.weibo.com/2/short_url/shorten.json?source=$source&url_long=$url_long";
		$res=$this->_curl($url);
		if(!$res){
			return false;
		}
		$json=json_decode($res);
		if(isset($json->error_code)){
			$this->error=$json->error;
			return false;
		}else{
			$urls=$json->urls[0];
			return $urls->url_short;
		}
	}
	
	/**
	 * 生成126.am 网址
	 */
	public function create126am(){
		$url='http://126.am/api!shorten.action';
		$data=array('longUrl'=>$this->url,'key'=>$this->wykey);
		$res=$this->_curl($url,'post',$data);
		if(!$res){
			return false;
		}	
		$json=json_decode($res);
		if($json->status_code!=200){
			//出现错误
			$this->error=$json->status_txt;
			return false;
		}else{
			return $json->url;
		}
	}
	
	/**
	 * 生成is.gd
	 */
	public function createisgd(){
		$url='http://is.gd/create.php?format=simple&url='.$this->url;
		$res=$this->_curl($url);
		if(!$res){
			return false;
		}else{
			return $res;
		}
	}
	
	/**
	 * 还原短网址dwz.cn
	 */
	public function expandDwz(){
		$url="dwz.cn/query.php";
		$data=array('tinyurl'=>$this->url);
		$res=$this->_curl($url,'post',$data);
		if(!$res){
			return false;
		}
		$json=json_decode($res);
		
		if($json->status!=0){
			//出错
			$this->error=$json->err_msg;
			return false;
		}else{
			return $json->longurl;
		}
	}
	
	/**
	 * 还原 t.cn
	 * @return boolean
	 */
	public function expandtcn(){
		$source=$this->sinakey;
		$url_short=$this->url;
		$url="https://api.weibo.com/2/short_url/expand.json?source=$source&url_short=$url_short";
		$res=$this->_curl($url);
		
		if(!$res){
			return false;
		}
		$json=json_decode($res);
		if(isset($json->error_code)){
			$this->error=$json->error;
			return false;
		}else{
			$urls=$json->urls[0];
			return $urls->url_long;
		}
	}
	
	/**
	 * 还原 126.am
	 */
	public function expand126am(){
		$url='http://126.am/api!expand.action';
		$data=array('shortUrl'=>$this->url,'key'=>$this->wykey);
		$res=$this->_curl($url,'post',$data);
		if(!$res){
			return false;
		}
		$json=json_decode($res);
		if($json->status_code!=200){
			//出现错误
			$this->error=$json->status_txt;
			return false;
		}else{
			return $json->url;
		}
	}
	
	/**
	 * 发送http请求
	 */
	public function _curl($url,$method='get',$data=null){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1000);
		curl_setopt($ch, CURLOPT_TIMEOUT, 500);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		if($method=='post'){
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
		}
		$result = curl_exec($ch);
		curl_close($ch);
		if(!$result){
			//curl 出现错误
			return false;
		}
		return $result;
	}
	
	
}

?>