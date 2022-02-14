<?php

class Controller_home extends Controller
{

    function action_index()
    {
        session_start();

        /*
        Для простоты, в нашем случае, проверяется равенство сессионной переменной admin прописанному
        в коде значению — паролю. Такое решение не правильно с точки зрения безопасности.
        Пароль должен храниться в базе данных в захешированном виде, но пока оставим как есть.
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