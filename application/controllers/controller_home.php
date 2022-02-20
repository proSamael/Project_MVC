<?php

class Controller_home extends Controller
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
        /* Проверяем существует ли токен авторизации если существуем доступ разрешен */
        if(isset($_COOKIE["password_cookie_token"])){
            $token_pass = $this->db->getRow('SELECT * FROM users WHERE token = ?s LIMIT 0,1', $_COOKIE["password_cookie_token"]);
            if(isset($token_pass) && ($token_pass != false)){
                $_SESSION['auth'] = true;
            }
        }
        /*
        Для простоты, в нашем случае, проверяется равенство сессионной переменной auth прописанному
        в коде значению — true.
        */
        if ( $_SESSION['auth'] == true )
        {
            $this->view->generate('home_view.php', 'template_view.php');
        }
        else
        {
            session_destroy();
            Route::logout();
        }
    }

    // Действие для разлогинивания
    function action_logout()
    {
        session_start();
        // Удляем сейссию
        session_destroy();
        //Удаляем куку password_cookie_token
        setcookie("password_cookie_token", "", time() - 3600);
        header('Location:./index.php?login');
    }

}