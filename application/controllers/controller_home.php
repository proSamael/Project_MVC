<?php

class Controller_home extends Controller
{

    function action_index()
    {
        session_start();

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

    // Действие для разлогинивания администратора
    function action_logout()
    {
        session_start();
        session_destroy();
        header('Location:./index.php?login');
    }

}