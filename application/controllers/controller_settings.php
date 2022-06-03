<?php


class controller_settings extends Controller
{
    private $db;


    function __construct()
    {
        $this->model = new Model_Settings();
        $this->view = new View();
        $this->db = new Database();
    }
    private function array_push_assoc($array, $key, $value){
        $array[$key] = $value;
        return $array;
    }
    function action_index()
    {
        $settings = $this->model->get_data_settings();
        session_start();
        if ($_SESSION['auth'] == true) {
            $session = $this->db->getRow('SELECT * FROM users WHERE id = ?i LIMIT 0,1', $_SESSION['userid']);
            $session_data = $session;
            #var_dump($session_data);
            $this->view->generate('settings_view.php', 'template_view.php', true, null, $session_data, $settings);
            //$this->view->generate_layout('head_view.php', 'navbar_view.php', 'sidebar_view.php',1,'page_tamplate_view.php','home_view.php','footer_view.php', $session_data);
        } else {
            session_destroy();
            Route::logout();
        }
    }
    function action_get_reg_settings(){
        $reg_settings = $this->db->getInd('set_name','SELECT * FROM `settings` WHERE `group` = 1');
        echo json_encode($reg_settings);
    }
    function action_get_listrole(){
        $listrole = $this->db->getAll('SELECT * FROM `roles`');
        echo json_encode($listrole);
    }
    function action_set_reg_settings(){
        $data = Array();
        $result ='';
        $set_settings =  $_GET;
        $set_settings = array_slice($set_settings, 1);
        $reg_settings = $this->db->getInd('set_name','SELECT * FROM `settings` WHERE `group` = 1');
        foreach ($reg_settings as $key => $value) {
            //echo $value['value'];
            if( in_array( $key ,array_keys($set_settings)) )
            {
                //$data = $this->array_push_assoc($data, $key, $value['value']);
                if($set_settings[$key] == 'on')
                { $set_value = 1; }
                elseif($set_settings[$key] == 'off')
                { $set_value = 0; }else{
                    $set_value = $set_settings[$key];
                }
                //var_dump($set_value);
                $sql  = "UPDATE `settings` SET `value` = ?s WHERE `set_name` = ?s;";
                $this->db->query($sql,$set_value,$key);
                $result = "Все параметры успешно сохранены: ";
            }else{
                $result = "Ошибка записи в параметре: ".$key;

            }
        }
        echo $result;


    }
    function action_set_group_settings(){
        $data = Array();
        $result ='';
        $set_group_settings =  $_GET;
        $set_group_settings = array_slice($set_group_settings, 1);
        $id_group = $set_group_settings['id'];
        $set_group_settings = array_slice($set_group_settings, 1);
        if($id_group >= 0) {
            $group_settings = $this->db->getAll('SELECT * FROM `roles` WHERE `id` = ?i', $id_group);
            foreach ($group_settings[0] as $key => $value) {
                if( in_array( $key ,array_keys($set_group_settings)) )
                {
                    $sql  = "UPDATE `roles` SET ?n = ?s WHERE `id` = ?i;";

                    $this->db->query($sql,$key,$set_group_settings[$key],$id_group);

                    $data=Array("data" => $set_group_settings, "resultCode" => 0, "result_msg" => 'Настройки группы "'.$group_settings[0]['description'].'" успешно сохранены'); //associative array
                }else{
                    $data=Array("data" => $key, "resultCode" => 1, "result_msg" => 'Error save to param :'.$key); //associative array
                }
            }
        }else{
            $data=Array("data" => $id_group, "resultCode" => 1, "result_msg" => 'Error id role :'.$id_group); //associative array
        }
        echo json_encode($data);
    }
}