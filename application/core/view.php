<?php

class View
{
	//public $template_view; // здесь можно указать общий вид по умолчанию.
	/*
	$content_file - виды отображающие контент страниц;
	$template_file - общий для всех страниц шаблон;
	$data - массив, содержащий элементы контента страницы. Обычно заполняется в модели.
	*/
	function generate($content_view, $template_view,$layout,$tab_control, $data = null , $settings = null)
	{
        /*
           if(is_array($data)) {

               // преобразуем элементы массива в переменные
               extract($data);
           }
       */
		if($layout!=null){

            include 'application/views/layout/head_view.php';
            include 'application/views/layout/navbar_view.php';
            include 'application/views/layout/sidebar_view.php';
            if($tab_control!=null){
                include 'application/views/layout/tab_control_view.php';
            }
            include 'application/views/'.$template_view;
            include 'application/views/layout/footer_view.php';
        } else{
            /*
            динамически подключаем общий шаблон (вид),
            внутри которого будет встраиваться вид
            для отображения контента конкретной страницы.
            */
            include 'application/views/'.$template_view;
        }

	}
}
