<div class="menu" style="display: none">
    <ul class="menu-options">
        <li class="menu-option" id="id_row">ID: </li>
        <hr />
        <li class="menu-option" id="copy_row">Копировать запись</li>
        <li class="menu-option" id="edit_row"><a href="#">Изменить запись</a></li>
        <li class="menu-option" id="delete_row" >Удалить запись</li>
        <li class="menu-option" id="find_cat">Найти похожие</li>
        <li class="menu-option" id="reload_table">Перзагрузить таблицу</li>
        <hr />
        <li class="menu-option" onclick="alert('click function')">Another action</li>
    </ul>
</div>
<div class="modal" tabindex="-1" role="dialog" id="modal_delete">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Удаления записи</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Вы действительно хотите удалить запись?</p>
                <p id="row_delete_data"></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancel_delete">Отмена</button>
                <button type="button" class="btn btn-primary" id="confirm_delete">Да</button>
            </div>
        </div>
    </div>
</div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-header p-2">
                <ul class="nav nav-pills">
                    <li class="nav-item"><a class="nav-link active" href="#pricelist" data-toggle="tab">Прайс Лист</a></li>
                    <li class="nav-item"><a class="nav-link" href="#category_tab" data-toggle="tab">Категории</a></li>
                    <li class="nav-item"><a class="nav-link" href="#pack_tab" data-toggle="tab">Упаковка</a></li>
                    <li class="nav-item"><a class="nav-link" href="#settings_tab" data-toggle="tab">Настройка таблицы</a></li>

                </ul>
            </div><!-- /.card-header -->
            <div class="card-body">
                <div class="tab-content">
                    <div class="active tab-pane" id="pricelist">
                       <!-- <div class="form-group">
                        <select class="custom-select form-control-border" id="select_cat_select" name="Категория:">
                            <option value="0">Все</option>
                        </select>
                        </div>-->
                        <table id="table_pricelist" class="cell-border compact " style="width:100%" onmousedown="return false" onselectstart="return false">
                            <thead>

                            <tr>
                                <th>id</th>
                                <th>category</th>
                                <th>subcategory</th>
                                <th>name</th>
                                <th>price</th>
                                <th>price_in_pack</th>
                            </tr>
                            </thead>
                            <tfoot>
                            </tfoot>
                        </table>
                    </div>
                    <div class="tab-pane" id="modif" style="height: 100%">
                        <table id="table_modif" class="table table-striped table-bordered" style="width:100%" >
                            <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tfoot>
                            </tfoot>
                        </table>
                    </div>
                    <!-- /.tab-pane -->
                </div>
            </div>
        </div>
    </div>
    <!-- modal -->
    <div class="modal fade" id="modal-lg">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Редактирование </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="save_row">
                            <input type="text"  name="id" class="form-control form-control-border" id="id_r"  hidden>
                        <div class="form-group">
                            <label for="name_row"  class="col-form-label">Наименование:</label>
                            <input type="text" name="name" class="form-control form-control-border" id="name_row">
                        </div>
                        <div class="form-group">
                            <label for="select_cat_row" class="col-form-label">Категория:</label>
                            <select class="custom-select form-control-border" id="select_cat_row" name="category">

                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pack_row" class="col-form-label">Упаковка:</label>
                            <select class="custom-select form-control-border" id="pack_row" name="count_in_pack">

                            </select>
                        </div>
                        <div class="form-group">
                            <label for="price_row" class="col-form-label">Цена за единицу:</label>
                            <input type="text"  class="form-control form-control-border" id="price_row" name="price_row">
                        </div>
                    </form>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-primary" id="modal_edit_save">Сохранить изменения</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
    <!-- modal -->
    <div class="modal fade" id="modal-add">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Добавление </h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="add_row">

                    <div class="form-group">
                        <label for="name_row"  class="col-form-label">Наименование:</label>
                        <input type="text" name="name_add" class="form-control form-control-border" id="name_row">
                    </div>
                    <div class="form-group">
                        <label for="select_cat_row" class="col-form-label">Категория:</label>
                        <select class="custom-select form-control-border" id="select_cat_row_add" name="category_add">

                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pack_row" class="col-form-label">Упаковка:</label>
                        <select class="custom-select form-control-border" id="pack_row_add" name="count_in_pack_add">

                        </select>
                    </div>
                    <div class="form-group">
                        <label for="price_row" class="col-form-label">Цена за единицу:</label>
                        <input type="text"  class="form-control form-control-border" id="price_row_add" name="price_row_add">
                    </div>
                </form>
            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
                <button type="button" class="btn btn-primary" id="modal_add_save">Сохранить изменения</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
    <!-- /.modal -->
    <script src="application/plugins/jquery/jquery.min.js"></script>
    <script src="application/plugins/sweetalert2/sweetalert2.min.js"></script>
    <script src="application/plugins/toastr/toastr.min.js"></script>
    <script src="application/plugins/platform/pricemod.js"></script>

