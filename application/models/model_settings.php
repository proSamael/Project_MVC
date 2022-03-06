<?php


class Model_Settings extends Model
{
    private $db;

    function __construct()
    {
        $this->db = new Database();
    }

    public function get_data_settings()
    {
        $reg_settings = $this->db->getInd('set_name','SELECT * FROM `settings`');
        return $reg_settings;
    }
}