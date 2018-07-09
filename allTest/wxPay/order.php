<?php
	//统一下单
	
$appid = "";  //你的appid
$mch_id = "";  //商户id
$wx_api_key = "";    //商户api秘钥
$out_trade_no = "";  //自己业务系统生成的交易no，可以唯一标识
$client_ip = "";  //客户端ip
$notify_url = "";    //接收支付结果通知url
$openid = "";    //微信授权获得的openid

$UNIFIED_ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";  //统一下单地址

$data = array();
$data['appid'] = $appid; 
$data['mch_id'] =$mch_id;
$data['nonce_str'] = randomStr(20);  //随机20位字符串
$data['body'] = "微信公众号支付测试";
$data['detail'] = "微信公众号支付测试detail";
$data['out_trade_no'] = $out_trade_no;    
$data['total_fee'] = 1;  //注意 单位是分
$data['spbill_create_ip'] = $client_ip;
$data['openid'] = $openid;
$data['notify_url'] = $notify_url;
$data['trade_type'] = "JSAPI";  //交易类型
$data['sign'] =sign($data, $wx_api_key);    //签名

//转为xml格式
$xml_str = arrayToXmlStr($data); 

//发送请求 使用封装好的curl_post
$result = curl_post($UNIFIED_ORDER_URL, $xml_str);

//解析得到的值
$get_data = simplexml_load_string($raw_data, 'SimpleXMLElement', LIBXML_NOCDATA);
$get_para = array();
$get_sign = "";
foreach ($get_data->children() as $child) 
{    
  if($child->getName() == 'sign') {        
    $get_sign = strval($child);    
  } else {        
    $get_para[strval($child->getName())] = strval($child);    
   }
}

if($get_para['return_code'] !== "SUCCESS") {
    //return code fail
}

//验证签名
if(!verifySign($get_sign, $get_para, $wx_api_key)) {
    //验证签名非法
}

//可以自行处理解析获得的参数
//todo...


//一些函数

/**
 * array转成xml str
 * @param $arr
 */
public static function arrayToXmlStr($arr) {    
  $xml_data = new \SimpleXMLElement("<xml></xml>");    
  Func::arrayToXml($arr, $xml_data);    
  return $xml_data->asXML();
}

/**
 * 生成指定长度的随机字符串(包含大写英文字母, 小写英文字母, 数字)
 * @param $length int 需要生成的字符串的长度
 * @return string 包含 大小写英文字母 和 数字 的随机字符串
 */
public static function randomStr($length){    
  //生成一个包含 大写英文字母, 小写英文字母, 数字 的数组    
  $arr = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));    
  $str = '';    
  $arr_len = count($arr);    
  for ($i = 0; $i < $length; $i++)    {        
    $rand = mt_rand(0, $arr_len-1);        
    $str.=$arr[$rand];    
  }    
  return $str;
}

/**
 * 微信签名
 * @param $para mixed 带签名参数数组
 * @param $wx_key string wxkey
 */
public static function sign($para, $wx_key) {    
  $unsign_str = Func::createLinkString(Func::argSort($para)) . "&key=" . $wx_key;    
  $sign = strtoupper(md5($unsign_str));    
  return $sign;
}

/**
 * 微信签名验证
 * @param $sign
 * @param $para
 * @param $wx_key
 * @return false-验证失败 true-验证成功
 */
public static function verifySign($sign, $para, $wx_key) {    
  $unsign_str = Func::createLinkString(Func::argSort($para)) . "&key=" . $wx_key;    
  $sign_str = strtoupper(md5($unsign_str));    
  if($sign === $sign_str) {        
    return true;    
  }    
  return false;
}

//生成支付参数

$data = array();
$data['appId'] = $appid;
$data['timeStamp'] = time();
$data['nonceStr'] = randomStr(20);
$data['package'] = "prepay_id=$prepay_id";
$data['signType'] = "MD5";
$data['timestamp'] = time();
$data['sign'] =sign($data, $wx_api_key);

$pay_param = json_encode($data);








?>