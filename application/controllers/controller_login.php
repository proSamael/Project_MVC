<?php

class Controller_login extends Controller
{

    function action_index()
    {
        //$data["login_status"] = "";
        session_start();
        if(isset($_SESSION['auth'])) {
            //echo "false";
            var_dump($_SESSION);
            if ($_SESSION['auth'] == true) {
                header('Location:./index.php?home');
            }
        }
        if(isset($_POST['login']) && isset($_POST['password']))
        {
            $login = $_POST['login'];
            $password =$_POST['password'];
            /*
            Производим аутентификацию, сравнивая полученные значения со значениями прописанными в коде.
            Такое решение не верно с точки зрения безопсаности и сделано для упрощения примера.
            Логин и пароль должны храниться в БД, причем пароль должен быть захеширован.
            */
            if($login=="admin" && $password=="12345")
            {
                $data["login_status"] = "access_granted";
                echo $_SESSION['auth'];
                $_SESSION['auth'] = true;
                //$_SESSION['admin'] = $password;
                header('Location:./index.php?home');
            }else{
                $data["login_status"] = "access_denied";
                }
            }else{
                    $data["login_status"] = "";
                }


        $this->view->generate('login_view.php', 'template_view.php', $data);
    }

}