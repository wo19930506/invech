<?php

namespace app\api\exceptions;

use Exception;
use think\exception\Handle as ExceptionHandler;
use think\exception\HttpResponseException;
use bong\service\auth\exception\AuthenticationException;
use app\api\error\CodeBase;

class Handler extends ExceptionHandler
{
    public function render(Exception $e)
    {
        if ($e instanceof HttpResponseException) {
            return $e->getResponse();    
        /*
        } elseif ($e instanceof AuthenticationException) {
            //同下
        */
        }else {
            //zerro说授权异常要给单独的编码，
            defined('API_CODE_NAME') or define('API_CODE_NAME'          , 'code');
            defined('API_MSG_NAME')  or define('API_MSG_NAME'           , 'msg');
            //api中间件抛出的异常,没有进入base,api常量未定义;
            $error = CodeBase::$error;
            if($e instanceof AuthenticationException){
                $error = CodeBase::$auth_error;
            }
            $error[API_MSG_NAME] = $e->getMessage();
            return json($error);
        }
    }
}
