<?php
namespace app\admin\controller;
use app\admin\Login;
use app\common\model\CompanyMoney;
use app\common\model\CompanySet;
use app\common\model\Bank;
use app\common\model\ActionLog as LogModel;
class Company extends Login{
    public function income(){

		$names = CompanySet::NAME_ARRAY;
		$this->assign('names',$names);

		$list = CompanyMoney::getList();
		$this->assign('list',$list);
        // 统计数据
        $stat_fields = [
            'ifnull(sum(amount), 0.00) as sum_amount'
        ];
        $statData = CompanyMoney::getStatData($stat_fields);
        $this->assign('statData', $statData);


        return $this->fetch();
    }
	public function set(){
    	$this->view->page_header = '公司入款列表';
    	$request   	=   request();
    	$list  		=	CompanySet::getList($request);
    	$this->assign('list',$list);
    	$this->assign('types',CompanySet::NAME_ARRAY);
		return $this->fetch();
    }
    public function set_edit(){
    	$request = request();
        $params  = $request->param();
        if(request()->isGet()){
            if(!empty($params['id'])){
                $info   =  CompanySet::get($params['id']);
                $this->assign('info',$info);  
            }
            $this->assign('banks',Bank::BANK_ARRAY);
          	$this->assign('types',CompanySet::NAME_ARRAY);
            return view();                
        }else{
            $id   =  !empty($params['id'])? $params['id']:'';
            if($id){
                $companyset = CompanySet::get(intval($id));

            }else{
                $companyset = new CompanySet($params);
            }
          	if($params['type'] == '1'){
            	$companyset->bank_name        =   $params['bank_name'];
	            $companyset->bank_username    =   $params['bank_username'];
	            $companyset->bank_account     =   $params['bank_account'];
	            $companyset->bank_address     =   $params['bank_address'];
	            unset($params['qrcode']);
	            $companyset->validate('Company.bank');
            }else{
            	$companyset->qrcode  =  $params['qrcode'];
            	unset($params['bank_name']); 
	            unset($params['bank_username']); 
	           	unset($params['bank_account']);
	           	unset($params['bank_address']);
	           	$companyset->validate('Company.mobliePay');
			}
            unset($params['file']); 
           
            $list = $companyset->save($params);

            if($list){
                LogModel::log(LogModel::BUSINESS_TYPE_EDIT,$companyset,LogModel::BUSINESS_TYPES[LogModel::BUSINESS_TYPE_EDIT]);
                return $this->success('操作成功');
            }else{
                return $this->error($companyset->getError());
            }
        }
    }

    public function set_del(){
        $request    =   request();
        $params     =   $request->param();
        $companyset      =   CompanySet::get(intval($params['id']));
        $list       =   $companyset->delete();
        if($list){
            LogModel::log(LogModel::BUSINESS_TYPE_DELE,$companyset,LogModel::BUSINESS_TYPES[LogModel::BUSINESS_TYPE_DELE]);
            return $this->success('操作成功');
        }else{
            return $this->error($companyset->getError());
        }
    }
}