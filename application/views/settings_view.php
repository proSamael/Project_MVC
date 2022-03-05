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


                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-one-tabContent">
                          <div class="tab-pane fade" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                          </div>
                          <div class="tab-pane fade active show" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_regon">
                                      <label class="custom-control-label" for="switch_regon">Разрешить регистрацию</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label for="select_passwdtype" class="col-sm-2 col-form-label">Тип шифрования</label>
                                  <div class="col-sm-2">
                                      <select class="custom-select form-control-border" id="select_passwdtype">
                                          <option value="1">MD5</option>
                                          <option value="2">SHA-2</option>
                                          <option value="3">Без шифрования</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_emailon">
                                      <label class="custom-control-label" for="switch_emailon">Авторизация по Email</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label for="select_roleuser" class="col-sm-2 col-form-label">Новый польз.</label>
                                  <div class="col-sm-2">
                                      <select class="custom-select form-control-border" id="select_roleuser">

                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_autoon">
                                      <label class="custom-control-label" for="switch_autoon">Автовход</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                                      <input type="checkbox" class="custom-control-input" id="switch_tokenon">
                                      <label class="custom-control-label" for="switch_tokenon">Вход по токену</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <label for="input_coocke" class="col-sm-2 col-form-label">Время жизнь куки</label>
                                  <div class="col-sm-2">
                                      <input type="email" class="form-control form-control-border" id="input_coocke" placeholder="7200">
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </div>
    </div>
 <script src="application/plugins/jquery/jquery.min.js"></script>
 <script src="application/plugins/jquery-ui/jquery-ui.min.js"></script>
 <script src="application/plugins/jsgrid/jsgrid.min.js"></script>
 <script src="application/plugins/toastr/toastr.min.js"></script>
 <script src="application/plugins/sweetalert2/sweetalert2.min.js"></script>
 <script src="application/plugins/platform/settings.js"></script>