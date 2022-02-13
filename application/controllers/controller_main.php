<?php

class Controller_Main extends Controller
{
	function action_index()
	{
        //так как сайта не будет делаем сразу переадрисацию на авторизацию в случае отсуствия сессии
        if(isset($_SESSION['auth'])) {
            if ($_SESSION['auth'] == true) {
                header('Location:./index.php?home');
            }else{
                header('Location:./index.php?login');
            }
        }else{
            header('Location:./index.php?login');
        }
		$this->view->generate('main_view.php', 'template_view.php');
	}
}