<div class="content-wrapper">
<div class="container-fluid">
        <div class="row">
            <div class="col-12">

                <div class="card card-primary card-tabs">
                    <div class="card-header p-0 pt-1">
                        <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="false">Общие</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="true">Регистрация и вход</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="custom-tabs-one-groups-tab" data-toggle="pill" href="#custom-tabs-one-groups" role="tab" aria-controls="custom-tabs-one-groups" aria-selected="false">Группы пользователей</a>
                            </li>

                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-one-tabContent">
                          <div class="tab-pane fade" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                          </div>
                          <div class="tab-pane fade active show" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                              <form id="reg_login_settings">
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_regon" name="<?php echo $settings['reg_active']['set_name'] ?>" >
                                      <label class="custom-control-label" for="switch_regon" title="<?php echo $settings['reg_active']['desc'] ?>"><?php echo $settings['reg_active']['title'] ?></label>

                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label for="select_passwdtype" class="col-sm-2 col-form-label" title="<?php echo $settings['reg_type']['desc'] ?>"><?php echo $settings['reg_type']['title'] ?></label>
                                  <div class="col-sm-2">
                                      <select class="custom-select form-control-border" id="select_passwdtype" name="<?php echo $settings['reg_type']['set_name'] ?>">
                                          <option value="1">MD5</option>
                                          <option value="2">SHA-2</option>
                                          <option value="3">Без шифрования</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_emailon" name="<?php echo $settings['reg_log_on_email']['set_name'] ?>">
                                      <label class="custom-control-label" for="switch_emailon" title="<?php echo $settings['reg_log_on_email']['desc'] ?>"><?php echo $settings['reg_log_on_email']['title'] ?></label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label for="select_roleuser" class="col-sm-2 col-form-label" title="<?php echo $settings['reg_access_new_user']['desc'] ?>"><?php echo $settings['reg_access_new_user']['title'] ?></label>
                                  <div class="col-sm-2">
                                      <select class="custom-select form-control-border" id="select_roleuser" name="<?php echo $settings['reg_access_new_user']['set_name'] ?>">

                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_autoon" name="<?php echo $settings['reg_auto_log_new_user']['set_name'] ?>">
                                      <label class="custom-control-label" for="switch_autoon" title="<?php echo $settings['reg_auto_log_new_user']['desc'] ?>"><?php echo $settings['reg_auto_log_new_user']['title'] ?></label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_tokenon" name="<?php echo $settings['reg_token_save']['set_name'] ?>">
                                      <label class="custom-control-label" for="switch_tokenon" title="<?php echo $settings['reg_token_save']['desc'] ?>"><?php echo $settings['reg_token_save']['title'] ?></label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label for="input_coocke" class="col-sm-2 col-form-label" title="<?php echo $settings['reg_cookie_time']['desc'] ?>"><?php echo $settings['reg_cookie_time']['title'] ?></label>
                                  <div class="col-sm-2">
                                      <input type="text" class="form-control form-control-border" id="input_coocke" placeholder="7200" name="<?php echo $settings['reg_cookie_time']['set_name'] ?>">
                                  </div>
                              </div>
                              </form>
                          </div>
                            <div class="tab-pane fade" id="custom-tabs-one-groups" role="tabpanel" aria-labelledby="custom-tabs-one-groups-tab">


                                        <div class="row">
                                            <div class="col-md-3">

                                                <!-- Profile Image -->
                                                <div class="card card-primary card-outline">
                                                    <div class="card-body box-profile">
                                                        <div class="text-center">

                                                                <label for="select_group" class="col-sm-12 col-form-label" title="">Выберите группу</label>
                                                                <div class="col-sm-12">
                                                                    <select class="custom-select form-control-border" id="select_group" name="">
                                                                    </select>
                                                                </div>

                                                        </div>

                                                        <p class="text-muted text-center"></p>

                                                        <ul class="list-group list-group-unbordered mb-3">
                                                            <li class="list-group-item">
                                                                <b>Всего пользователей</b> <a class="float-right">0</a>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <b>Всего групп</b> <a class="float-right" id="role_count">0</a>
                                                            </li>
                                                            <li class="list-group-item">
                                                                <b>Польз. в выбр. группе</b> <a class="float-right">0</a>
                                                            </li>
                                                        </ul>


                                                    </div>
                                                    <!-- /.card-body -->
                                                </div>
                                                <!-- /.card -->



                                                <!-- /.card -->
                                            </div>
                                            <!-- /.col -->
                                            <div class="col-md-9">
                                                <div class="card">
                                                    <div class="card-header p-2">
                                                        <ul class="nav nav-pills">
                                                            <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Общие</a></li>
                                                            <li class="nav-item"><a class="nav-link" href="#pricelist" data-toggle="tab">Прайс лист</a></li>
                                                            <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Настройки</a></li>
                                                        </ul>
                                                    </div><!-- /.card-header -->
                                                    <div class="card-body">
                                                        <div class="tab-content">
                                                            <div class="active tab-pane" id="activity">

                                                            </div>
                                                            <!-- /.tab-pane -->
                                                            <div class="tab-pane" id="pricelist">
                                                                <form id="group_price_setting" class="my-form hide">

                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_list_view" name="chek_form_group" value="p_list_view" >
                                                                        <label class="custom-control-label" for="p_list_view" title=" ">Просмотр прайс листа</label>
                                                                    </div>
                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_list_edit" name="chek_form_group" value="p_list_edit" >
                                                                        <label class="custom-control-label" for="p_list_edit" title=" ">Редактирование прайс листа</label>
                                                                    </div>
                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_list_modif" name="chek_form_group" value="p_list_modif" >
                                                                        <label class="custom-control-label" for="p_list_modif" title=" ">Редактирование модификатора</label>
                                                                    </div>
                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_cat_view" name="chek_form_group" value="p_cat_view" >
                                                                        <label class="custom-control-label" for="p_cat_view" title=" ">Просмотр категорий</label>
                                                                    </div>
                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_cat_edit" name="chek_form_group" value="p_cat_edit" >
                                                                        <label class="custom-control-label" for="p_cat_edit" title=" ">Редактирование категорий</label>
                                                                    </div>
                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_pack_view" name="chek_form_group" value="p_pack_view" >
                                                                        <label class="custom-control-label" for="p_pack_view" title=" ">Просмотр типа упаковки</label>
                                                                    </div>
                                                                    <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                                                        <input type="checkbox" class="custom-control-input" id="p_pack_edit" name="chek_form_group" value="p_pack_edit" >
                                                                        <label class="custom-control-label" for="p_pack_edit" title=" ">Редактирование типа упаковки</label>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <!-- /.tab-pane -->

                                                            <div class="tab-pane" id="settings">

                                                            </div>
                                                            <!-- /.tab-pane -->
                                                        </div>
                                                        <!-- /.tab-content -->
                                                    </div><!-- /.card-body -->
                                                </div>
                                                <!-- /.card -->
                                            </div>
                                            <!-- /.col -->
                                        </div>
                                        <!-- /.row -->


                            </div>
                        </div>
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </div>
    </div>
</div>
 <script src="application/plugins/jquery/jquery.min.js"></script>
 <script src="application/plugins/sweetalert2/sweetalert2.min.js"></script>
 <script src="application/plugins/toastr/toastr.min.js"></script>
 <script src="application/plugins/platform/settings.js"></script>