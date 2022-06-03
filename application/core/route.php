<?php

/*
Класс-маршрутизатор для определения запрашиваемой страницы.
> цепляет классы контроллеров и моделей;
> создает экземпляры контролеров страниц и вызывает действия этих контроллеров.
*/
class Route
{

	static function start()
	{
		// контроллер и действие по умолчанию
		$controller_name = 'Main';
		$action_name = 'index';
		//Для наших задач требуеются GET запросы поэтмоу убираем ЧПУ и читаем GET
        // Читаем GET запрос
        if(isset($_GET)){
            $routes = array_keys($_GET); //Массив ключей(контроллеры)
            $action = array_values($_GET);//Массив значений(экшены)
            // получаем имя контроллера
            if ( !empty($routes[0]))
            {
                $controller_name = $routes[0];
            }
            // получаем имя экшена
            if ( !empty($action[0]) )
            {
                $action_name = $action[0];
            }
            // добавляем префиксы
            $model_name = 'Model_'.$controller_name;
            $controller_name = 'Controller_'.$controller_name;
            $action_name = 'action_'.$action_name;
        }

        if (GlobalAR::$AR->debug == 1){
            echo "Model: $model_name <br>";
            echo "Controller: $controller_name <br>";
            echo "Action: $action_name <br>";
        }


		// подцепляем файл с классом модели (файла модели может и не быть)

		$model_file = strtolower($model_name).'.php';
		$model_path = "application/models/".$model_file;
		if(file_exists($model_path))
		{
			include "application/models/".$model_file;
		}

		// подцепляем файл с классом контроллера
		$controller_file = strtolower($controller_name).'.php';
		$controller_path = "application/controllers/".$controller_file;
		if(file_exists($controller_path))
		{
			include "application/controllers/".$controller_file;
            // создаем контроллер
            $controller = new $controller_name;
            $action_ex = $action_name;
            if(method_exists($controller, $action_ex))
            {
                // вызываем действие контроллера
                $controller->$action_ex();
            }
            else
            {
                // здесь также разумнее было бы кинуть исключение
                Route::ErrorPage404();
            }
        }
		else
		{
			/*
			правильно было бы кинуть здесь исключение,
			но для упрощения сразу сделаем редирект на страницу 404
			*/
            //echo $controller_path;
			Route::ErrorPage404();
		}
		


	
	}

	function ErrorPage404()
	{
        include "application/controllers/controller_404.php";
        $controller = new Controller_404;
        $controller->action_index();
    }
    function logout(){
        $host = GlobalAR::$AR->host;
        header('Refresh: 0; url='.$host.'');
        //header('Location:'.$host);
    }
    
}
