<?php


class controller_price extends Controller
{
    private $db;


    function __construct()
    {
        $this->model = new Model_Price();
        $this->view = new View();
        $this->db = new Database();
    }
    private function chek_token($t){
        $token_pass = $this->db->getRow('SELECT * FROM users WHERE token = ?s LIMIT 0,1', $t);
        if(isset($token_pass) && ($token_pass != false)){
           return true;
        }else{
           return false;
        }
    }
    private function method_allow($t,$method){

    }
    private function array_push_assoc($array, $key, $value)
    {
        $array[$key] = $value;
        return $array;
    }
    private function change_key( $array, $old_key, $new_key ) {

        if( ! array_key_exists( $old_key, $array ) )
            return $array;

        $keys = array_keys( $array );
        $keys[ array_search( $old_key, $keys ) ] = $new_key;

        return array_combine( $keys, $array );
    }
    function action_index()
    {
        $settings = null;
        session_start();
        if ($_SESSION['auth'] == true) {
            $session = $this->db->getRow('SELECT * FROM users WHERE id = ?i LIMIT 0,1', $_SESSION['userid']);
            $session_data = $session;
            $this->view->generate('price_view.php', 'template_view.php', true, null, $session_data, $settings);
       } else {
            session_destroy();
            Route::logout();
        }
    }

    function action_get_list_price(){
        $t =  $_GET['t'];
        if($this->chek_token($t)){
            $list_price = $this->db->getAll('SELECT
        pr.id, 
        cat.`name` AS category,
        cat.`id` AS cat_id, 
        subcat.`name` AS subcategory, 
        pr.`name`, 
        pack.`name` AS in_pack, 
        pr.price,
        pack.id AS pack_id,
        pack.count AS pack_in_count,
        pr.price AS price_client,
        pr.price AS price_in_pack_client
    FROM
        p_product AS pr
        LEFT JOIN
        p_category AS cat
        ON 
            pr.category = cat.id
        LEFT JOIN
        p_subcategory AS subcat
        ON 
            pr.subcategory = subcat.id
        LEFT JOIN
        p_in_pack AS pack
        ON 
            pr.count_in_pack = pack.id ;');
            $data=Array("data" => $list_price, "resultCode" => 0, "result_msg" => 'OK'); //associative array
        }else{
            $data=Array("data" => '', "resultCode" => 1, "result_msg" => 'No token avalible'); //associative array
        }
        echo json_encode($data);
    }
    function action_get_list_cat(){
        $t =  $_GET['t'];
        if($this->chek_token($t)) {
            $list_cat = $this->db->getAll('SELECT * FROM `p_category`');
            $data=Array("data" => $list_cat, "resultCode" => 0, "result_msg" => 'OK'); //associative array
        }else{
            $data=Array("data" => '', "resultCode" => 1, "result_msg" => 'No token avalible'); //associative array
        }
        echo json_encode($data);
    }
    function action_get_list_category(){
        $t =  $_GET['t'];
        if($this->chek_token($t)) {
            $list_cat = $this->db->getAll('SELECT * FROM `p_category`');
            $data=Array("data" => $list_cat, "resultCode" => 0, "result_msg" => 'OK'); //associative array
        }else{
            $data=Array("data" => '', "resultCode" => 1, "result_msg" => 'No token avalible'); //associative array
        }
        echo json_encode($data);
    }
    function action_get_list_in_pack(){
        $t =  $_GET['t'];
        if($this->chek_token($t)) {
            $list_pack = $this->db->getAll('SELECT * FROM `p_in_pack`');
            $data=Array("data" => $list_pack, "resultCode" => 0, "result_msg" => 'OK'); //associative array
        }else{
            $data=Array("data" => '', "resultCode" => 1, "result_msg" => 'No token avalible'); //associative array
        }
        echo json_encode($data);
    }
    function action_get_list_subcat(){
        $list_subcat = $this->db->getAll('SELECT * FROM `p_subcategory`');
        echo json_encode($list_subcat);
    }
    function action_get_list_pack(){
        $list_pack = $this->db->getAll('SELECT * FROM `p_in_pack`');
        echo json_encode($list_pack);
    }
    function action_get_price_settings(){
        $get_settngs = $_GET;
        $get_settngs_slice = array_slice($get_settngs, 1);
        $settings = $get_settngs_slice['set_name'];//"price_client_modif";
        $result = $this->db->getAll("SELECT * FROM settings WHERE `set_name` = ?s AND `group` = 2",$settings);
        //$sql = "SELECT * FROM settings WHERE `set_name` = ?s AND `group` = 2";
        //$sql_result = $this->db->query($sql,$settings);
       // $result = $this->db->fetch($sql_result);
        //$result_out = Array();
        //$result_out = array('settings' => $result);

        $data = array('id' => $result[0]['id'],'set_name' => $result[0]['set_name'],'value' => $result[0]['value']);
        echo json_encode($data);
    }
    function action_set_price_row(){
        $data = Array();
        $result ='';
        $set_row_data =  $_GET;
        $set_row_data_slice = array_slice($set_row_data, 1);
        $set_row_data_change = $this->change_key($set_row_data_slice,'price_row','price');
        $id = $set_row_data_change['id'];


        //$data = arr($set_row_data_change, ['id']);
        //echo $id;
        //var_dump($set_row_data_change);

            if( $id != null )
            {
                $sql = "UPDATE `p_product` SET ?u WHERE `id` = ?i";
                $this->db->query($sql,$set_row_data_change,$id);
                $sql_result = $this->db->affectedRows();
                //$sql  = "UPDATE `p_product` SET `value` = ?s WHERE `set_name` = ?s;";
                //$this->db->query($sql,$set_value,$key);
                $result = "Все параметры успешно сохранены: ";
            }else{
                $result = "Ошибка записи в параметре: ".$id;

        }
        echo $result;
    }
    function action_add_price_row(){
        $result = Array();
        $add_row_data =  $_GET;
        $data = array('name' => $add_row_data['name_add'], 'category' => $add_row_data['category_add'],'count_in_pack' => $add_row_data['count_in_pack_add'], 'price' => $add_row_data['price_row_add'],'subcategory' => 0);
        if( $data )
        {
            if ($data['name'] != null){
                if($data['price'] != null){
                    $sql = "INSERT INTO `p_product` SET ?u";
                    $this->db->query($sql,$data);
                    $sql_result = $this->db->insertId();
                    $result = array('success'=> 0,  'error_msg'=> "Запись успешно добавлена", 'data_msg'=> 'Вернулось:'.$sql_result);
                }else{
                    $result = array('success'=> 1,  'error_msg'=> "Ошибка записи в параметре: Цена не должна быть пустой", 'data_msg'=> 'Вернулось:'.$data['price']);
                }
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Ошибка записи в параметре: Наименование не должно быть пустым", 'data_msg'=> 'Вернулось:'.$data['name']);
            }
        }
        echo json_encode($result) ;
    }
    function action_add_category(){
        $result = Array();
        $add_category_data =  $_GET;
        $data = Array();
        $data = array('name' => $add_category_data['name'], 'visible' => 1);
        if( $data )
        {
            if ($data['name'] != null){
                $sql = "INSERT INTO `p_category` SET ?u";
                $this->db->query($sql,$data);
                $sql_result = $this->db->insertId();
                if($sql_result != 0){
                    $result = array('success'=> 0,  'error_msg'=> "Запись успешно добавлена", 'data_msg'=> 'Вернулось:');
                }else{
                    $result = array('success'=> 1,  'error_msg'=> "Ошибка записи в SQL!", 'data_msg'=> 'Результат: '.$sql_result);
                }
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Ошибка записи в параметре: Наименование не должно быть пустым", 'data_msg'=> 'Вернулось:'.$data['name']);
            }
        }
        echo json_encode($result) ;
    }
    function action_add_pack(){
        $result = Array();
        $add_pack_data =  $_GET;
        $data = Array();
        $data = array('name' => $add_pack_data['name'], 'count' => $add_pack_data['count'],'type' => '');
        if( $data )
        {
            if ($data['name'] != null){
                $sql = "INSERT INTO `p_in_pack` SET ?u";
                $this->db->query($sql,$data);
                $sql_result = $this->db->insertId();
                if($sql_result != 0){
                    $result = array('success'=> 0,  'error_msg'=> "Запись успешно добавлена", 'data_msg'=> 'Вернулось:');
                }else{
                    $result = array('success'=> 1,  'error_msg'=> "Ошибка записи в SQL!", 'data_msg'=> 'Результат: '.$sql_result);
                }
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Ошибка записи в параметре: Наименование не должно быть пустым", 'data_msg'=> 'Вернулось:'.$data['name']);
            }
        }
        echo json_encode($result) ;
    }
    function action_edit_pack(){
        $data = Array();
        $result ='';
        $set_row_data =  $_GET;
        $set_row_data_slice = array_slice($set_row_data, 1);
        //$set_row_data_change = $this->change_key($set_row_data_slice,'price_row','price');
        $id = $set_row_data_slice['id'];

        if( $id != null )
        {
            $sql = "UPDATE `p_in_pack` SET ?u WHERE `id` = ?i";
            $this->db->query($sql,$set_row_data_slice,$id);
            $sql_result = $this->db->affectedRows();
            $result = array('success'=> 0,  'error_msg'=> "Запись успешно добавлена", 'data_msg'=> 'Вернулось: '.$sql_result);
        }else{
            $result = array('success'=> 1,  'error_msg'=> "Ошибка записи! Неверный ID", 'data_msg'=> 'Вернулось:'.$id);
        }
        echo json_encode($result) ;
    }
    function action_edit_category(){
        $data = Array();
        $result ='';
        $set_row_data =  $_GET;
        $set_row_data_slice = array_slice($set_row_data, 1);
        //$set_row_data_change = $this->change_key($set_row_data_slice,'price_row','price');
        $id = $set_row_data_slice['id'];

        if( $id != null )
        {
            $sql = "UPDATE `p_category` SET ?u WHERE `id` = ?i";
            $this->db->query($sql,$set_row_data_slice,$id);
            $sql_result = $this->db->affectedRows();
            $result = array('success'=> 0,  'error_msg'=> "Запись успешно изменена", 'data_msg'=> 'Вернулось: '.$sql_result);
        }else{
            $result = array('success'=> 1,  'error_msg'=> "Ошибка записи! Неверный ID", 'data_msg'=> 'Вернулось:'.$id);
        }
        echo json_encode($result) ;
    }
    function action_save_settings_price(){
        $save_settngs = $_GET;
        $save_settngs_slice = array_slice($save_settngs, 1);
        $set_name = $save_settngs_slice['set_name'];
        $value = $save_settngs_slice['value'];
        $data = array('value' => $value);
        if( $set_name != null && $value != null ) {
            $sql = "UPDATE `settings` SET ?u WHERE `set_name` = ?s";
            $this->db->query($sql,$data,$set_name);
            $sql_result = $this->db->affectedRows();
            if($sql_result!=0){
                $result = array('success'=> 0,  'error_msg'=> "Запись успешно сохранена", 'data_msg'=> 'Вернулось: '.$sql_result,  'data_value'=> $value);
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Что-то пошло не так: MySQL affected error ", 'data_msg'=> 'Вернулось: '.$sql_result);
            }
        }else{
            $result = array('success'=> 1,  'error_msg'=> "Ошибка чтения data", 'data_msg'=> 'Вернулось: '.$data['value']);
        }
        echo json_encode($result) ;
    }
    function action_delete_price_row(){
        $result = Array();
        $delete_row_data =  $_GET;
        //$delete_row_data = array_slice($delete_row_data, 1);
        //var_dump($delete_row_data);
        if( $delete_row_data )
        {
            if ($delete_row_data['id'] != null){
                $sql_result = 0;
                $sql = "DELETE FROM `p_product` WHERE `id`=?i";
                $this->db->query($sql,$delete_row_data['id']);
                $sql_result = $this->db->affectedRows();
                if($sql_result!=0){
                    $result = array('success'=> 0,  'error_msg'=> "Запись успешно удалена", 'data_msg'=> 'Вернулось: '.$sql_result);
                }else{
                    $result = array('success'=> 1,  'error_msg'=> "Что-то пошло не так: MySQL affected error ", 'data_msg'=> 'Вернулось: '.$sql_result);
                }
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Ошибка удаления. Не верный id", 'data_msg'=> 'Вернулось: '.$delete_row_data['id']);
            }
        }else{
            $result = array('success'=> 1,  'error_msg'=> "Ошибка чтения data", 'data_msg'=> 'Вернулось: '.$delete_row_data['id']);
        }
        echo json_encode($result) ;
    }
    function action_delete_category_row(){
        $result = Array();
        $delete_row_data =  $_GET;
        //$delete_row_data = array_slice($delete_row_data, 1);
        //var_dump($delete_row_data);
        if( $delete_row_data )
        {
            if ($delete_row_data['id'] != null){
                $sql_result = 0;
                $sql = "DELETE FROM `p_category` WHERE `id`=?i";
                $this->db->query($sql,$delete_row_data['id']);
                $sql_result = $this->db->affectedRows();
                if($sql_result!=0){
                    $result = array('success'=> 0,  'error_msg'=> "Запись успешно удалена", 'data_msg'=> 'Вернулось: '.$sql_result);
                }else{
                    $result = array('success'=> 1,  'error_msg'=> "Что-то пошло не так: MySQL affected error ", 'data_msg'=> 'Вернулось: '.$sql_result);
                }
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Ошибка удаления. Не верный id", 'data_msg'=> 'Вернулось: '.$delete_row_data['id']);
            }
        }else{
            $result = array('success'=> 1,  'error_msg'=> "Ошибка чтения data", 'data_msg'=> 'Вернулось: '.$delete_row_data['id']);
        }
        echo json_encode($result) ;
    }
    function action_delete_pack_row(){
        $result = Array();
        $delete_row_data =  $_GET;
        //$delete_row_data = array_slice($delete_row_data, 1);
        //var_dump($delete_row_data);
        if( $delete_row_data )
        {
            if ($delete_row_data['id'] != null){
                $sql_result = 0;
                $sql = "DELETE FROM `p_in_pack` WHERE `id`=?i";
                $this->db->query($sql,$delete_row_data['id']);
                $sql_result = $this->db->affectedRows();
                if($sql_result!=0){
                    $result = array('success'=> 0,  'error_msg'=> "Запись успешно удалена", 'data_msg'=> 'Вернулось: '.$sql_result);
                }else{
                    $result = array('success'=> 1,  'error_msg'=> "Что-то пошло не так: MySQL affected error ", 'data_msg'=> 'Вернулось: '.$sql_result);
                }
            }else{
                $result = array('success'=> 1,  'error_msg'=> "Ошибка удаления. Не верный id", 'data_msg'=> 'Вернулось: '.$delete_row_data['id']);
            }
        }else{
            $result = array('success'=> 1,  'error_msg'=> "Ошибка чтения data", 'data_msg'=> 'Вернулось: '.$delete_row_data['id']);
        }
        echo json_encode($result) ;
    }
}