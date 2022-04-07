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
	pr.price AS price_in_pack
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


        $data=Array("data" => $list_price); //associative array

        echo json_encode($data);
    }
    function action_get_list_cat(){
        $list_cat = $this->db->getAll('SELECT * FROM `p_category`');
        echo json_encode($list_cat);
    }
    function action_get_list_subcat(){
        $list_subcat = $this->db->getAll('SELECT * FROM `p_subcategory`');
        echo json_encode($list_subcat);
    }
    function action_get_list_pack(){
        $list_pack = $this->db->getAll('SELECT * FROM `p_in_pack`');
        echo json_encode($list_pack);
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
                //$sql  = "UPDATE `p_product` SET `value` = ?s WHERE `set_name` = ?s;";
                //$this->db->query($sql,$set_value,$key);
                $result = "Все параметры успешно сохранены: ";
            }else{
                $result = "Ошибка записи в параметре: ".$id;

        }
        echo $result;
    }
}