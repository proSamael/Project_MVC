<?php

class Controller_login extends Controller
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
        if(isset($_SESSION['auth'])) {
            //echo "false";
            //var_dump($_SESSION);
            if ($_SESSION['auth'] == true) {
                header('Location:./index.php?home');
            }
        }
        $parent_id = 1;

;


        if(isset($_POST['login']) && isset($_POST['password']))
        {
            $login = $_POST['login'];
            $password =$_POST['password'];
            /*
            Производим аутентификацию, сравнивая полученные значения со значениями прописанными в коде.
            Такое решение не верно с точки зрения безопсаности и сделано для упрощения примера.
            Логин и пароль должны храниться в БД, причем пароль должен быть захеширован.
            */
            // запрос MySQL: выбираем столбцы в таблице
            $user_pass = $this->db->getRow('SELECT * FROM users WHERE login = ?s LIMIT 0,1',$login);
            //$email_pass = $this->db->getOne("SELECT email FROM users WHERE email = ?s",$login);

            if(isset($user_pass) && ($user_pass!=false)){

                var_dump($user_pass);
                $salt = '0x'.md5($login.$password);
                if($user_pass['password'] == $salt){
                    $_SESSION['auth'] = true;
                    header('Location:./index.php?home');
                }else{
                    $_SESSION['auth'] = false;
                }
            }


            if($login=="admin" && $password=="123451")
            {
                $data["login_status"] = "access_granted";
                echo $_SESSION['auth'];
                $_SESSION['auth'] = true;
                //Проверяем, если галочка была поставлена
                if(isset($_POST["remember"])){

                    //Создаём токен
                    $password_cookie_token = md5($login.$password.time());
                    /*
                        Устанавливаем куку.
                        Параметры функции setcookie():
                        1 параметр - Название куки
                        2 параметр - Значение куки
                        3 параметр - Время жизни куки. Мы указали 30 дней
                    */
                    setcookie("password_cookie_token", $password_cookie_token, time() + (1000 * 60 * 60 * 24 * 30));
                }else {
                    //Если галочка "запомнить меня" небыла поставлена, то мы удаляем куки
                    if (isset($_COOKIE["password_cookie_token"])) {

                        //Удаляем куку password_cookie_token
                        setcookie("password_cookie_token", "", time() - 3600);
                    }
                }
                    //$_SESSION['admin'] = $password;
                //header("Content-Type: text/html; charset=utf-8");
                header('Location:./index.php?home');
            }else{
                $data["login_status"] = "access_denied";
                }
            }else{
                    $data["login_status"] = "";
                }

        //var_dump($data);
        $this->view->generate('login_view.php', 'template_view.php', $data);
    }

}