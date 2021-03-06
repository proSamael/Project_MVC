<?php


class Controller_registr extends Controller
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
        if (isset($_POST['login'])) {
            $login = $_POST['login'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $pattern = '/^[_!)(.a-z\d]{4,16}$/i';
            $pattern_name = "/^[а-яА-ЯёЁa-zA-Z0-9\-_]+$/";
            if (!empty($_POST['login']) && !empty($_POST['email']) && !empty($_POST['password']) && !empty($_POST['re_password'])) {
                $user_pass = $this->db->getRow('SELECT * FROM users WHERE login= ?s OR email= ?s ',$login,$email);
                if (filter_var($email, FILTER_VALIDATE_EMAIL) !== false)
                {
                    $domain = ltrim(stristr($email, '@'), '@');
                    if($_POST['password'] != $_POST['re_password']){
                        $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Пороли не совпадают!</p>";
                    }elseif($user_pass != null){
                        $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Такой пользователь уже существует!</p>";
                    }elseif(!checkdnsrr($domain)){
                        $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Такой почты не существует!</p>";
                    }elseif(!preg_match($pattern, $login) or !preg_match($pattern, $password)){
                        $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Пароль и логин должен быть не короче 4, не длиннее 16 символов. Логин и пароль могут содержать цифры и символы:'_', '!', '(', ')'!</p>";
                    }elseif(!preg_match($pattern_name,$username)) {
                        $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Имя должно содержать только следующие знаки 'а-я, А-Я, a-z, A-Z, 0-9, -, _'!</p>";
                    }elseif(!isset($_POST['terms'])){
                        $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Вы должны согласиться с правилами!</p>";
                    }else{
                        if($reg_settings['reg_type']['value']==1){
                            $salt = '0x'.md5($_POST['login'].$_POST['password']);
                        }elseif($reg_settings['reg_type']['value']==2){
                            $salt = '0x' . hash('sha256', $user_pass['login'] . $password);
                        }else{
                            $salt = '0x' . $password;
                        }
                        $data = array(
                            'login' => $login,
                            'password' => $salt,
                            'password_r' => $salt,
                            'email' => $email,
                            'username' => $username,
                            'role' => $reg_settings['reg_access_new_user']['value'],
                            'count_login' => 0,
                            'token' => null,
                            );


                        if($reg_settings['reg_active']['value']==1){
                            $sql = "INSERT INTO users SET reg_date=CURDATE(),?u;";
                            $this->db->query($sql,$data);
                            session_start();
                            $result_id =  $this->db->insertId();
                            //Автовход при регистрации
                            if($reg_settings['reg_auto_log_new_user']['value']==1){
                                if($result_id!=null) {
                                    $_SESSION['auth'] = true;
                                    $_SESSION['userid'] = $result_id;
                                    header('Location:./index.php?home');
                                }
                            }else{
                                if($result_id!=null) {
                                    $_SESSION['auth'] = false;
                                    session_destroy();
                                    //$_SESSION['userid'] = $result_id;
                                    header('Location:./index.php?login');
                                }
                            }
                            $data["reg_error"] = "<p class='login-box-msg' style=\"color:green\">Вы успешно зарегистрировались, <a href=\"./index.php?login\" class=\"nav-link\">теперь можно войти в систему</a>!</p>";

                        }else{
                            $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Регистрация временно недоступна!</p>";
                        }


                   }
                }else{
                    $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Не верный Email!</p>";
                }
            } else {
                $data["reg_error"] = "<p class='login-box-msg' style=\"color:red\">Заполните все поля</p>";
            }
        }else{
            $data["reg_error"] = "";
        }
        $this->view->generate('register_view.php', 'template_view.php',null,null, $data);
    }
}