<?php


class Controller_Changelist extends Controller
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
            $this->view->generate('changelist_view.php', 'template_view.php', false, null, $session_data);
        } else {
            session_destroy();
            Route::logout();
        }
    }
}