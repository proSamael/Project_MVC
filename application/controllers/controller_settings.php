<?php


class controller_settings extends Controller
{
    private $db;

    function __construct()
    {
        $this->view = new View();
        $this->db = new Database();
    }

    function action_index()
    {
        session_start();
        if ($_SESSION['auth'] == true) {
            $session = $this->db->getRow('SELECT * FROM users WHERE id = ?i LIMIT 0,1', $_SESSION['userid']);
            $session_data = $session;
            //var_dump($session_data);
            $this->view->generate('settings_view.php', 'template_view.php', true, null, $session_data);
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
}