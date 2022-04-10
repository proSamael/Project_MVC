(function(global) {
    global.data_price = new Array();
    global.data_cat = new Array();
    global.data_subcat = new Array();
    global.data_pack = new Array();
    global.date_clipboard = null;
}(this));
let Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    showCloseButton: true,

});
toastr.options = {}

function send_message(icon, title, message, footer) {
    Toast.fire({
        icon: icon,
        title: title,
        html: message,
        footer: footer
    });
};

function set_row(dataform) {
    jQuery('form').each(function() {
        jQuery.ajax({
            url: "./index.php?price=set_price_row",
            data: dataform,
            type: 'GET',
            success: function(data) {
                $('#modal-lg').modal('toggle')
                send_message("success", "Настройки сохранены", data, "");

                setTimeout(function() {
                    $('#table_pricelist').DataTable().ajax.reload();
                }, 1500);

            },
            error: function(data) {
                send_message("warning", "Настройки сохранены", data, "");
                console.log('Ошибка: ' + data);
            }
        });
    });
}

function add_row(dataform) {
    $('#add_row').each(function() {
        $.ajax({
            url: "./index.php?price=add_price_row",
            data: dataform,
            type: 'GET',
            success: function(data) {
                let obj = $.parseJSON(data);
                if (obj.success === 1) {
                    send_message("warning", "Ошибка записи", obj.error_msg, obj.data_msg);
                }
                if (obj.success === 0) {
                    setTimeout(function() {
                        $('#table_pricelist').DataTable().ajax.reload();
                    }, 1500);
                    send_message("success", "Настройки сохранены", obj.error_msg, obj.data_msg);
                }
                //$('#modal-lg').modal('toggle')
                //send_message("success","Настройки сохранены",data,"");

                //setTimeout( function () {
                //    $('#table_pricelist').DataTable().ajax.reload();
                //}, 1500 );

            },
            error: function(data) {
                let obj = $.parseJSON(data)
                send_message("warning", "Настройки сохранены", obj, "");
                console.log('Ошибка: ' + obj);
            }
        });
    });
}
function delete_row(data_id){
    $.ajax({
        url: "./index.php?price=delete_price_row",
        data: data_id,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "Ошибка удаления", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_pricelist').DataTable().ajax.reload();
                }, 1500);
                $('#modal_delete').modal('toggle');
                send_message("success", "Запись успешна удалена", obj.error_msg, obj.data_msg);
            }

        },
        error: function(data) {
            send_message("warning", "Jquery Ajax Error", data, '');
        }
});
}
function objectifyForm(formId) {
    //serialize data function
    console.log("Getting form data...")
    var data = {};
    var dataArray = $('#' + formId).serializeArray();
    for (var i = 0; i < dataArray.length; i++) {
        data[dataArray[i].name] = dataArray[i].value;
    }
    return data;
};

function formatToRub(n) { // конвертируют копейки в рубли
    // in 10050 out 100,50
    n = n / 100;
    var out = n.toFixed(2);
    return out;
    //console.log(out);
}

function formatToKop(n) { // конвертируют рубли в копейки
    // in 100.50 , 100,50
    // out 10050
    n = parseFloat(n.replace(/[^0-9]/gim, ''));
    //console.log(n.toFixed(2));
    var out = n.toFixed(2).replace(/\.0+$/, '');
    return out;
}

function moneyFormat(n) { // Формат рублей
    //in 1100,50 out 1100.5 р.
    n = n.replace(',', '.'); // 1 100.5 р.
    n = n.replace(/[^0-9.,]/gim, '');
    var out = n;
    out = out.toLocaleString() + ' р.'; // 1 100,5 р.
    return out;
}

function customParseFloat(number) {
    //Если копейки равны целым десяткам  тгда дописываем в конце 0
    let str = String(number);
    let length = str.toString().match(/\.(\d+)/)?.[1].length;
    if (length === 1) {
        number = number + '0';
    }
    return number; // Not a number, so you may throw exception or return number itself
}
$("#price_row").change(function() {
    $(this).val($(this).val().replace(',', '.'));

    var TESTCURRENCY = $(this).val().toString().match(/(?=[\s\d])(?:\s\.|\d+(?:[.]\d+)*)/gmi);
    if (TESTCURRENCY.length <= 1) {
        $(this).val(
            parseFloat(TESTCURRENCY.toString().match(/^\d+(?:\.\d{0,2})?/))

        );
        $(this).val(customParseFloat($(this).val()));
    } else {
        $(this).val('Invalid a value!');
    }
});
$("#price_row_add").change(function() {
    $(this).val($(this).val().replace(',', '.'));

    var TESTCURRENCY = $(this).val().toString().match(/(?=[\s\d])(?:\s\.|\d+(?:[.]\d+)*)/gmi);
    if (TESTCURRENCY.length <= 1) {
        $(this).val(
            parseFloat(TESTCURRENCY.toString().match(/^\d+(?:\.\d{0,2})?/))

        );
        $(this).val(customParseFloat($(this).val()));
    } else {
        $(this).val('Invalid a value!');
    }
});
$.ajax({
    type: "GET",
    dataType: "json",
    url: "./index.php?",
    data: {
        "price": "get_list_cat"
    },

    success: function(list_cat_array) {
        data_list_cat = list_cat_array;
        if (~data_list_cat) {
            $.each(data_list_cat, function(key, value) {
                $('#select_cat_row').append($("<option></option>").attr("value", value.id).text(value.name));
                $('#select_cat_select').append($("<option></option>").attr("value", value.id).text(value.name));
                $('#select_cat_row_add').append($("<option></option>").attr("value", value.id).text(value.name));
            });
        }
    }

});

$.ajax({
    type: "GET",
    dataType: "json",
    url: "./index.php?",
    data: {
        "price": "get_list_subcat"
    },
    success: function(cat_array) {
        data_subcat = cat_array;

    }
});
$.ajax({
    type: "GET",
    dataType: "json",
    url: "./index.php?",
    data: {
        "price": "get_list_pack"
    },
    success: function(pack_array) {
        data_pack = pack_array;
        if (~data_pack) {
            $.each(data_pack, function(key, value) {
                $('#pack_row').append($("<option></option>").attr("value", value.id).text(value.name));
                $('#pack_row_add').append($("<option></option>").attr("value", value.id).text(value.name));
            });
        }

    }
});
$(document).ready(function() {
    var buttonCommon = {
        exportOptions: {
            columns: [1,2,3,4,5],
            format: {
                body: function ( data, row, column, node ) {
                    // Strip $ from salary column to make it numeric
                    return column === 3 ?
                        formatToRub(data) :
                        data;
                }
            }
        }
    };
    $('#table_pricelist').DataTable({
        ajax: {
            type: 'GET',
            dataType: "json",
            url: './index.php?price=get_list_price',
            //dataSrc: 'data'
        },

        columns: [{
            data: 'id',
            title: 'id'
        },
            {
                data: 'category',
                title: 'Категория'
            },

            {
                data: 'name',
                title: 'Наименование'
            },
            {
                data: 'in_pack',
                title: 'Упаковка'
            },
            {
                data: 'price',
                title: 'Цена за единицу.'
            },
            {

                data: 'price_in_pack',
                title: 'Цена за упаковку.'
            }

        ],

        language: {
            "decimal": "",
            "emptyTable": "No data available in table",
            "info": "Страница _START_ из _TOTAL_",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Show _MENU_ entries",
            "loadingRecords": "Загрузка...",
            "processing": "Загрузка...",
            "search": "Поиск:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "Перв.",
                "last": "Посл.",
                "next": "След.",
                "previous": "Пред."
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "buttons": {

                "copy": "Копировать",
                "print": "Печать",
                "colvis": "Категория",
            }
        },
        dom: 'Bfrtip',

        searching: true,
        select: true,
        lengthChange: false,
        pageLength: 2000,
        paging: false,
        autoWidth: false,
        rowReorder: true,

        buttons: [{
            extend: 'collection',
            text: 'Категория: ВСЕ',
            buttons: [{
                text: ' ВСЕ КАТЕГОРИИ',
                action: function() {
                    this.search('').columns().search('').draw();
                    this.button(0).text('Категория: ВСЕ ');
                }
            },
                {
                    text: 'ГРУНТЫ',
                    action: function() {
                        this.column(1).search('ГРУНТЫ').draw();
                        this.button(0).text('Категория: ГРУНТЫ ');
                    }
                },
                {
                    text: 'ГРУНТ-ЭМАЛИ',
                    action: function() {
                        this.column(1).search('ГРУНТ-ЭМАЛИ').draw();
                        this.button(0).text('Категория: ГРУНТ-ЭМАЛИ ');
                    }
                },
                {
                    text: 'ЭМАЛИ',
                    action: function() {
                        this.column(1).search('ЭМАЛЬ', false, false).draw();
                        this.button(0).text('Категория: ЭМАЛЬ ');
                    }
                },
                {
                    text: 'КРАСКИ',
                    action: function() {
                        this.column(1).search('КРАСКИ').draw();
                        this.button(0).text('Категория: КРАСКИ ');
                    }
                },
                {
                    text: 'ЛАКИ',
                    action: function() {
                        this.column(1).search('ЛАКИ').draw();
                        this.button(0).text('Категория: ЛАКИ ');
                    }
                },
                {
                    text: 'КЛЕИ и ГЕРМЕТИКИ',
                    action: function() {
                        this.column(1).search('КЛЕИ и ГЕРМЕТИКИ').draw();
                        this.button(0).text('Категория: КЛЕИ и ГЕРМЕТИКИ ');
                    }
                },
                {
                    text: 'МОРИЛКИ И ПРОПИТКИ',
                    action: function() {
                        this.column(1).search('МОРИЛКИ И ПРОПИТКИ').draw();
                        this.button(0).text('Категория: МОРИЛКИ И ПРОПИТКИ ');
                    }
                },
                {
                    text: 'РАСТВОРИТЕЛИ',
                    action: function() {
                        this.column(1).search('РАСТВОРИТЕЛИ').draw();
                        this.button(0).text('Категория: РАСТВОРИТЕЛИ ');
                    }
                },
            ],
            fade: false
        },
            {
                text: 'Обновить',
                action: function(e, dt, node, config) {
                    dt.ajax.reload();
                }
            },
            {
                text: 'Добавить',
                action: function() {
                    $('#modal-add').modal('show')
                }
            },
            {
                extend: 'collection',
                text: 'Вид',
                buttons: [{
                    text: 'ID',
                    action: function() {
                        var table = $('#table_pricelist').DataTable();
                        if (table.columns([0]).visible()[0] === false) {
                            table.columns([0]).visible(true);
                        } else {
                            table.columns([0]).visible(false);
                        }

                    }
                },
                    {
                        text: 'Категория',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            if (table.columns([1]).visible()[0] === false) {
                                table.columns([1]).visible(true);
                            } else {
                                table.columns([1]).visible(false);
                            }
                        }
                    },
                    {
                        text: 'Наименование',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            if (table.columns([2]).visible()[0] === false) {
                                table.columns([2]).visible(true);
                            } else {
                                table.columns([2]).visible(false);
                            }
                        }
                    },
                    {
                        text: 'Упаковка',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            if (table.columns([3]).visible()[0] === false) {
                                table.columns([3]).visible(true);
                            } else {
                                table.columns([3]).visible(false);
                            }
                        }
                    },
                    {
                        text: 'Цена за ед.',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            if (table.columns([4]).visible()[0] === false) {
                                table.columns([4]).visible(true);
                            } else {
                                table.columns([4]).visible(false);
                            }
                        }
                    },
                    {
                        text: 'Цена за упаковку',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            if (table.columns([5]).visible()[0] === false) {
                                table.columns([5]).visible(true);
                            } else {
                                table.columns([5]).visible(false);
                            }
                        }
                    },
                    {
                        text: 'Скрыть все',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            table.columns([0, 1, 2, 3, 4, 5]).visible(false, false);
                        }
                    },
                    {
                        text: 'Показать все',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            table.columns([0, 1, 2, 3, 4, 5]).visible(true, true);
                        }
                    },
                ]
            },
            {
                extend: 'collection',
                text: 'Экспорт',
                buttons: [
                    $.extend( true, {}, buttonCommon, {
                        extend: 'copyHtml5'
                    } ),
                    $.extend( true, {}, buttonCommon, {
                        extend: 'excelHtml5'
                    } ),
                    $.extend( true, {}, buttonCommon, {
                        extend: 'csvHtml5'
                    } ),
                    $.extend( true, {}, buttonCommon, {
                        extend: 'pdfHtml5'
                    } ),
                    $.extend( true, {}, buttonCommon, {
                        extend: 'print'
                    } ),
                ]
            },
        ],


        rowCallback: function(row, data) {
            if (data) {
                if (data.price > 0) {

                    $('td', row).eq(4).addClass('').html(formatToRub(data.price));
                    $('td', row).eq(5).addClass('').html(formatToRub(data.price * data.pack_in_count));
                    if (data.price.match(/^-?\d*(\.\d+)?$/)) {
                        data.price = data.price;
                    } else {
                        data.price = formatToRub(data.price);
                    }
                    data.price_in_pack = formatToRub(data.price * data.pack_in_count);
                    //data.price_offset = data.price;
                } else {
                    $('td', row).eq(4).addClass('').html('0');
                    $('td', row).eq(5).addClass('').html('0');
                }

            }
        },
        initComplete: function() {},

    }).buttons().container().appendTo('#table_pricelist_wrapper .col-md-6:eq(0)');
    $('#select_cat_select').on('change', function(e) {
        var valueSelected = this.value;
        data_list_cat.forEach(function(item, index, array) {
            var table = $('#table_pricelist').DataTable();
            if (item.id == valueSelected) {

                table.column(1).search(item.name).draw();
            }
            if (valueSelected == 0) {
                table.search('').columns().search('').draw();
            }

        });



    });
    const menu = $(".menu");
    let menuVisible = false;
    const toggleMenu = command => {
        command === "show" ? menu.show(300) : menu.hide(300);
        menuVisible = !menuVisible;
    };
    const setPosition = ({
                             top,
                             left
                         }) => {
        menu.css("left", `${left}px`);
        menu.css("top", `${top}px`);
        toggleMenu("show");
    };
    window.addEventListener("click", e => {
        if (menuVisible) toggleMenu("hide");
    });
    $('#table_pricelist').on('contextmenu', 'tbody tr', function(e) {
        var table = $('#table_pricelist').DataTable();
        var data = table.rows(this, {
            selected: true
        }).data()[0];
        $('#id_row').text(function() {
            return "item number " + (data['id']);
        });
        let date_clipboard = data['name'] + ' Цена: ' + formatToRub(data['price']);
        $('#copy_row').on('click', function() {
            navigator.clipboard.writeText(date_clipboard)
                .then(() => {
                    send_message("success", "Запись скопирована в буфер обмена!", data['name'], "Воспользуйтесь функцией 'Вставить' или соч.кл. CTRL+V");
                })
                .catch(err => {
                    send_message("warning", "Clipboard err!", 'Ошибка копирования в буфер обмена', err);
                });
        })
        $('#edit_row').on('click', function() {
            $('#modal-lg').modal('show')
            $('#select_cat_row option[value=' + data['cat_id'] + ']').prop('selected', true);
            $('#pack_row option[value=' + data['pack_id'] + ']').prop('selected', true);
            $("#name_row").val(data['name']);
            $("#id_r").val(data['id']);
            //$("#category_row").val(data['category']);
            $("#in_pack_row").val(data['in_pack']);
            $("#price_row").on('input', function() {
                //регулярный выражения проверка денежного формата во избежании ошибки в записи
                var c = this.selectionStart,
                    r = /[^0-9.,]/gim,
                    v = $(this).val();
                if (r.test(v)) {
                    $(this).val(v.replace(r, ''));
                    send_message("warning", "Regexp: Ошибка ввода данных!", 'Не возможно использовать символы. Только 0-9 \',\' \'.\'', "Данная строка имеет денежный формат: 105,51 или 105.51 ");
                    c--;
                }
                this.setSelectionRange(c, c);
            });
            $("#price_row").val(formatToRub(data['price']));
        })
        $('#reload_table').on('click', function() {
            table.ajax.reload();
        })
        $('#find_cat').on('click', function() {

            table.search(data['category']).draw();
        });
        $('#delete_row').on('click', function() {
            $('#modal_delete').modal('show');
            $('#row_delete_data').text(data['name']);
            $('#confirm_delete').on('click', function() {
                var data_delete = {};
                data_delete["id"] = data['id'];
                delete_row(data_delete);
            });

        });
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition(origin);
        return false;
    });
    $('#table_pricelist tbody').on('click', 'tr', function() {
        var table = $('#table_pricelist').DataTable();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#button').click(function() {
        table.row('.selected').remove().draw(false);
    });
    $('#table_pricelist').on('dblclick', 'tbody tr', function(row) {
        $('#modal-lg').modal('show')
        var table = $('#table_pricelist').DataTable();
        var data = table.rows(this, {
            selected: true
        }).data()[0];
        //console.log(data);
        $('#select_cat_row option[value=' + data['cat_id'] + ']').prop('selected', true);
        $('#pack_row option[value=' + data['pack_id'] + ']').prop('selected', true);
        $("#name_row").val(data['name']);
        $("#id_r").val(data['id']);
        //$("#category_row").val(data['category']);
        $("#in_pack_row").val(data['in_pack']);
        $("#price_row").on('input', function() {
            //регулярный выражения проверка денежного формата во избежании ошибки в записи
            var c = this.selectionStart,
                r = /[^0-9.,]/gim,
                v = $(this).val();
            if (r.test(v)) {
                $(this).val(v.replace(r, ''));
                send_message("warning", "Regexp: Ошибка ввода данных!", 'Не возможно использовать символы. Только 0-9 \',\' \'.\'', "Данная строка имеет денежный формат: 105,51 или 105.51 ");
                c--;
            }
            this.setSelectionRange(c, c);
        });
        $("#price_row").val(formatToRub(data['price']));

    });
    $('#modal_edit_save').click(function() {
        var data_from = objectifyForm('save_row');
        data_from['price_row'] = formatToKop(data_from['price_row']);

        set_row(data_from);

    });
    $('#modal_add_save').click(function() {
        var data_from = objectifyForm('add_row');
        if (data_from['price_row_add'] != 0) {
            data_from['price_row_add'] = formatToKop(data_from['price_row_add']);
        } else {
            data_from['price_row_add'] = '';
        }


        add_row(data_from);
        console.log(data_from);

    });
});