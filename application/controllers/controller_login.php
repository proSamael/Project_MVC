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
        $reg_settings = $this->db->getInd('set_name','SELECT * FROM `settings` WHERE `group` = 1');
        session_start();
        if(isset($_SESSION['auth'])) {
            if ($_SESSION['auth'] == true) {
                header('Location:./index.php?home');
            }
            if($reg_settings['reg_token_save']['value']){
                if(isset($_COOKIE["password_cookie_token"])){
                    $token_pass = $this->db->getRow('SELECT * FROM users WHERE token = ?s LIMIT 0,1', $_COOKIE["password_cookie_token"]);
                    if(isset($token_pass) && ($token_pass != false)){
                        $_SESSION['auth'] = true;
                        header('Location:./index.php?home');
                    }
                }
            }
        }


        if(isset($_POST['login']) && isset($_POST['password'])) {
            $login = $_POST['login'];
            $password = $_POST['password'];
            /*
            Производим аутентификацию, сравнивая полученные значения со значениями прописанными в коде.
            Такое решение не верно с точки зрения безопсаности и сделано для упрощения примера.
            Логин и пароль должны храниться в БД, причем пароль должен быть захеширован.
            */
            // запрос MySQL: выбираем столбцы в таблице
            if($reg_settings['reg_log_on_email']['value']==1){
                $user_pass = $this->db->getRow('SELECT * FROM users WHERE login = ?s or email = ?s LIMIT 0,1', $login, $login);
            }else{
                $user_pass = $this->db->getRow('SELECT * FROM users WHERE login = ?s LIMIT 0,1', $login);
            }

            //Проверяем по логину или почте
            if (isset($user_pass) && ($user_pass != false)) {
                //Если такой пользователь существует проверяем пароль.

                if($reg_settings['reg_type']['value']==1){

                    $salt = '0x' . md5($user_pass['login'] . $password);
                }elseif($reg_settings['reg_type']['value']==2){
                    $salt = '0x' . hash('sha256', $user_pass['login'] . $password);
                }elseif ($reg_settings['reg_type']['value']==3){
                    $salt = '0x' . $password;
                }
                if ($user_pass['password'] == $salt) {
                    //Пароль верный присваем сейсcии true
                    $_SESSION['auth'] = true;
                    $_SESSION['userid'] = $user_pass['id'];
                    //Проверяем, если галочка была поставлена
                    if (isset($_POST["remember"])) {
                        //Создаём токен
                        if($reg_settings['reg_type']['value']==1){
                            $password_cookie_token = md5($login . $password . time());
                        }elseif($reg_settings['reg_type']['value']==2){
                            $password_cookie_token = md5($login . $password . time());
                        }elseif ($reg_settings['reg_type']['value']==3){
                            $password_cookie_token = md5($login . $password . time());
                        }

                        /*
                            Устанавливаем куку.
                            Параметры функции setcookie():
                            1 параметр - Название куки
                            2 параметр - Значение куки
                            3 параметр - Время жизни куки. Мы указали 30 дней
                        */
                        $data = array('login' => $user_pass['login']);
                        $sql = "UPDATE users SET token=?s WHERE ?u;";
                        $this->db->query($sql,$password_cookie_token,$data);
                        setcookie("password_cookie_token", $password_cookie_token, time() + (1000 * 60 * 60 * 24 * $reg_settings['reg_cookie_time']['value']));
                    } else {
                        //Если галочка "запомнить меня" небыла поставлена, то мы удаляем куки
                        if (isset($_COOKIE["password_cookie_token"])) {
                            //Удаляем куку password_cookie_token
                            setcookie("password_cookie_token", "", time() - 3600);
                        }
                    }
                    header('Location:./index.php?home');
                } else {
                    $data["login_status"] = "access_denied";
                    $_SESSION['auth'] = false;
                }
            }
        }else{
            $data["login_status"] = "";
        }
        $this->view->generate('login_view.php', 'template_view.php',null,null, $data);
    }

}