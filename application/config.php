<?php
/**
 * @author Samael__ <pro100.ink@gmail.com>
 * @version 1.0
 * Application configuration
 * @package Config
 * @subpackage GlobalAR
 * Show or debug information
 * @property boolean debug
 * @property string host
 */
//Обьявляем константы
class Config {
    /**
     * Database host
     * @var string
     */
    const DB_HOST = '127.0.0.1';
    /**
     * Database name
     * @var string
     */
    const DB_NAME = 'pmvc';

    /**
     * Database user
     * @var string
     */
    const DB_USER = 'pmvc';

    /**
     * Database password
     * @var string
     */
    const DB_PASSWORD = 'qwe123';

    /**
     * Show or hide error messages on screen
     * @var boolean
     */
    const SHOW_ERRORS = true;

}
// Класс работы с глобальными переменными
class GlobalAR extends Config
{
    /**
     * @var GlobalAR $AR
     */
    public static $AR = [];

    private static $data = [];

    public function __get($name){
        return self::$data[$name];
    }

    public function __set($name, $value){
        self::$data[$name] = $value;
    }

    public function getAll(){
        return self::$data;
    }

    /**
     * @return $this;
     */
    public static function init(){
        if(!self::$AR){
            self::$AR = new self();
        }

        return self::$AR;
    }
}
//
//Инициализация класса глобальный переменных
GlobalAR::init();

// Создаем глобальные пременные по умолчанию.
GlobalAR::$AR->debug = 0; // отображения debug информации
GlobalAR::$AR->host = 'https://'.$_SERVER['HTTP_HOST'].'/project_mvc/index.php';

if(GlobalAR::$AR->debug == 1) {
    var_dump(GlobalAR::$AR->getAll());
}
//echo Config::DB_HOST;