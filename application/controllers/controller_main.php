<?php

class Controller_Main extends Controller
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
        //так как сайта не будет делаем сразу переадрисацию на авторизацию в случае отсуствия сессии
        if(isset($_SESSION['auth'])){
            if ( $_SESSION['auth'] == true )
            {
                $session = $this->db->getRow('SELECT * FROM users WHERE id = ?i LIMIT 0,1',  $_SESSION['userid']);
                $session_data = $session;
                //var_dump($session_data);
                $this->view->generate('main_view.php', 'template_view.php',true,null, $session_data);
                //$this->view->generate_layout('head_view.php', 'navbar_view.php', 'sidebar_view.php',null,'page_tamplate_view.php','main_view.php','footer_view.php', $session_data);
            }
        }else{
            header('Location:./index.php?login');
        }

	}
}