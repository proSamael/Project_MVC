//region Const
(function (global) {
    global.data_price = new Array();
    global.data_cat = new Array();
    global.data_subcat = new Array();
    global.data_pack = new Array();
    global.data_settings = new Array();
    global.date_clipboard = null;
    global.data_price_modif = null;
}(this));
let data_access = new Array();
let Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    showCloseButton: true,

});
toastr.options = {}
const menu_list = $(".menu_list");
const menu_cat = $(".menu_cat");
const menu_pack = $(".menu_pack");
let menuVisible_list = false;
let menuVisible_cat = false;
let menuVisible_pack = false;
let token = $.cookie('password_cookie_token');
const toggleMenu_list = command => {
    command === "show" ? menu_list.show(300) : menu_list.hide(300);
    menuVisible_list = !menuVisible_list;
};
const toggleMenu_cat = command => {
    command === "show" ? menu_cat.show(300) : menu_cat.hide(300);
    menuVisible_cat = !menuVisible_cat;
};
const toggleMenu_pack = command => {
    command === "show" ? menu_pack.show(300) : menu_pack.hide(300);
    menuVisible_pack = !menuVisible_pack;
};
const setPosition_list = ({top, left}) => {
    menu_list.css("left", `${left}px`);
    menu_list.css("top", `${top}px`);
    toggleMenu_list("show");
};
const setPosition_cat = ({top, left}) => {
    menu_cat.css("left", `${left}px`);
    menu_cat.css("top", `${top}px`);
    toggleMenu_cat("show");
};
const setPosition_pack = ({top, left}) => {
    menu_pack.css("left", `${left}px`);
    menu_pack.css("top", `${top}px`);
    toggleMenu_pack("show");
};
//endregion
//region Functions
function get_role_access(t) {
    var result;
    $.ajax ({
        url: "./index.php?price=get_role_access&t="+t,
        type: 'GET',
        dataType: 'JSON',
        async: false,
        success: function(data) {
            result = data;
        }
    });
    return result;

}
function send_message(icon, title, message, footer) {
    Toast.fire({
        icon: icon,
        title: title,
        html: message,
        footer: footer
    });
};
function isINT(x, y) {
    if (Number.isInteger(y / x)) {
        return true;
    }
    return false;
}
function set_row(dataform,t) {

        jQuery.ajax({
            url: "./index.php?price=set_price_row&t="+t,
            data: dataform,
            type: 'GET',
            success: function(data) {
                $('#modal-lg').modal('toggle')
                let obj = $.parseJSON(data);
                if (obj.resultCode == 1) {
                    send_message("warning", "???????????? ????????????", obj.result_msg, obj.data);
                }
                if (obj.resultCode == 0) {
                    if(obj.data > 0){
                        send_message("success", "???????????? ??????????????????", obj.result_msg, obj.data);
                        setTimeout(function () {
                            $('#table_pricelist').DataTable().ajax.reload();
                        }, 1500);
                    }else{
                        send_message("warning", "???????????? ????????????", "???????????? ???? ???????? ????????????????", "");
                    }

                }
            },
            error: function(data) {
                send_message("warning", "Error jQuery Ajax ", data, "");
                console.log('????????????: ' + data);
            }
        });

}
function add_category(dataform,t) {

        jQuery.ajax({
            url: "./index.php?price=add_category&t="+t,
            data: dataform,
            type: 'GET',
            success: function(data) {
                let obj = $.parseJSON(data);
                if (obj.success === 1) {
                    send_message("warning", "???????????? ????????????", obj.error_msg, obj.data_msg);
                }
                if (obj.success === 0) {
                    setTimeout(function() {
                        $('#table_category').DataTable().ajax.reload();
                    }, 1500);
                    send_message("success", "?????????????????? ??????????????????", obj.error_msg, obj.data_msg);
                    $('#category_add_modal').modal('toggle');
                }
            },
            error: function(data) {
                let obj = $.parseJSON(data)
                send_message("warning", "Ajax Error", obj, "");
            }
        });

}
function add_pack(dataform,t) {

    jQuery.ajax({
        url: "./index.php?price=add_pack&t="+t,
        data: dataform,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "???????????? ????????????", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_pack').DataTable().ajax.reload();
                }, 1500);
                send_message("success", "?????????????????? ??????????????????", obj.error_msg, obj.data_msg);
                $('#pack_add_modal').modal('toggle');
            }
        },
        error: function(data) {
            let obj = $.parseJSON(data)
            send_message("warning", "Ajax Error", obj, "");
        }
    });

}
function edit_pack(dataform,t) {
    jQuery.ajax({
        url: "./index.php?price=edit_pack&t="+t,
        data: dataform,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "???????????? ????????????", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_pack').DataTable().ajax.reload();
                }, 1500);
                send_message("success", "?????????????????? ??????????????????", obj.error_msg, obj.data_msg);
                $('#pack_add_modal').modal('toggle');
            }
        },
        error: function(data) {
            let obj = $.parseJSON(data)
            send_message("warning", "Ajax Error", obj, "");
        }
    });

}
function edit_category(dataform,t) {
    jQuery.ajax({
        url: "./index.php?price=edit_category&t="+t,
        data: dataform,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "???????????? ????????????", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_category').DataTable().ajax.reload();
                }, 1500);
                send_message("success", "?????????????????? ??????????????????", obj.error_msg, obj.data_msg);
                $('#category_add_modal').modal('toggle');
            }
        },
        error: function(data) {
            let obj = $.parseJSON(data)
            send_message("warning", "Ajax Error", obj, "");
        }
    });

}
function get_price_settings(set_name) {
    var data_set = {};
     data_set["set_name"] = set_name

    var result = $.ajax({
        url: "./index.php?price=get_price_settings",
        data: data_set,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {},
        async: false,
        error: function (err) {
            console.log(err);
        }
    }).responseJSON;
    return result // undefine
   //return data_settings;
}
function save_settings(set_name,t) {

        $.ajax({
            url: "./index.php?price=save_settings_price&t="+t,
            data: set_name,
            type: 'GET',
            success: function(data) {
                let obj = $.parseJSON(data);
                if (obj.success === 1) {
                    send_message("warning", "???????????? ????????????", obj.error_msg, obj.data_msg);
                }
                if (obj.success === 0) {
                    data_price_modif = obj.data_value;
                    setTimeout(function() {
                        $('#table_pricelist').DataTable().ajax.reload();
                    }, 1500);
                    send_message("success", "?????????????????? ??????????????????", obj.error_msg, obj.data_msg);
                    $('#price_client_modif_modal').modal('toggle');
                }
            },
            error: function(data) {
                let obj = $.parseJSON(data)
                send_message("warning", "Ajax Error", obj, "");
            }
        });
}
function add_row(dataform,t) {
    $('#add_row').each(function() {
        $.ajax({
            url: "./index.php?price=add_price_row&t="+t,
            data: dataform,
            type: 'GET',

            success: function(data) {
                let obj = $.parseJSON(data);
                if (obj.success === 1) {
                    send_message("warning", "???????????? ????????????", obj.error_msg, obj.data_msg);
                }
                if (obj.success === 0) {
                    setTimeout(function() {
                        $('#table_pricelist').DataTable().ajax.reload();
                    }, 1500);
                    send_message("success", "?????????????????? ??????????????????", obj.error_msg, obj.data_msg);
                }
                //$('#modal-lg').modal('toggle')
                //send_message("success","?????????????????? ??????????????????",data,"");

                //setTimeout( function () {
                //    $('#table_pricelist').DataTable().ajax.reload();
                //}, 1500 );

            },
            error: function(data) {
                let obj = $.parseJSON(data)
                send_message("warning", "?????????????????? ??????????????????", obj, "");
                console.log('????????????: ' + obj);
            }
        });
    });
}
function delete_row(data_id,t){
    $.ajax({
        url: "./index.php?price=delete_price_row&t="+t,
        data: data_id,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "???????????? ????????????????", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_pricelist').DataTable().ajax.reload();
                }, 1500);
                $('#modal_delete').modal('toggle');
                send_message("success", "???????????? ?????????????? ??????????????", obj.error_msg, obj.data_msg);
            }

        },
        error: function(data) {
            send_message("warning", "Jquery Ajax Error", data, '');
        }
});
}
function delete_category(data_id,t){
    $.ajax({
        url: "./index.php?price=delete_category_row&t="+t,
        data: data_id,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "???????????? ????????????????", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_category').DataTable().ajax.reload();
                }, 1500);
                $('#modal_delete').modal('toggle');
                send_message("success", "???????????? ?????????????? ??????????????", obj.error_msg, obj.data_msg);
            }

        },
        error: function(data) {
            send_message("warning", "Jquery Ajax Error", data, '');
        }
    });
}
function delete_pack(data_id,t){
    $.ajax({
        url: "./index.php?price=delete_pack_row&t="+t,
        data: data_id,
        type: 'GET',
        success: function(data) {
            let obj = $.parseJSON(data);
            if (obj.success === 1) {
                send_message("warning", "???????????? ????????????????", obj.error_msg, obj.data_msg);
            }
            if (obj.success === 0) {
                setTimeout(function() {
                    $('#table_pack').DataTable().ajax.reload();
                }, 1500);
                $('#modal_delete').modal('toggle');
                send_message("success", "???????????? ?????????????? ??????????????", obj.error_msg, obj.data_msg);
            }

        },
        error: function(data) {
            send_message("warning", "Jquery Ajax Error", data, '');
        }
    });
}
function objectifyForm(formId) {
    //serialize data function

    var data = {};
    var dataArray = $('#' + formId).serializeArray();
    for (var i = 0; i < dataArray.length; i++) {
        data[dataArray[i].name] = dataArray[i].value;
    }
    return data;
};
function formatToRub(n) { // ???????????????????????? ?????????????? ?? ??????????
    // in 10050 out 100,50
    n = n / 100;
    var out = n.toFixed(2);
    return out;

}
function isNumberToDecimal(n) {
    return parseFloat(n);
}
function formatToKop(n) { // ???????????????????????? ?????????? ?? ??????????????
    // in 100.50 , 100,50
    // out 10050
    n = parseFloat(n.replace(/[^0-9]/gim, ''));

    var out = n.toFixed(2).replace(/\.0+$/, '');
    return out;
}
function moneyFormat(n) { // ???????????? ????????????
    //in 1100,50 out 1100.5 ??.
    n = n.replace(',', '.'); // 1??100.5 ??.
    n = n.replace(/[^0-9.,]/gim, '');
    var out = n;
    out = out.toLocaleString() + ' ??.'; // 1??100,5 ??.
    return out;
}
function customParseFloat(number) {
    //???????? ?????????????? ?????????? ?????????? ????????????????  ???????? ???????????????????? ?? ?????????? 0
    let str = String(number);
    let length = str.toString().match(/\.(\d+)/)?.[1].length;
    if (length === 1) {
        number = number + '0';
    }
    return number; // Not a number, so you may throw exception or return number itself
}
function isNumber(value) {
    if ((undefined === value) || (null === value)) {
        return false;
    }
    if (typeof value == 'number') {
        return true;
    }
    return !isNaN(value - 0);
}
function request_responses(response){
    switch(response['resultCode']) {
        case 1:
            send_message("warning", "???????????? ???????????????? ??????????????????????", '???????????? ?????????????? ?????????????? ?? ???????????? ????????????????.' , 'Result: '+response['result_msg']);
            break;
        case 2:
            //send_message("warning", "???????????? ??????????????????????", '?? ?????? ?????? ???????? ???? ?????? ????????????????.' , 'Result: '+response['result_msg']);

            break;
        default:
        // code to be executed if n is different from case 1 and 2
    }
}
data_access = get_role_access(token);
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}
function get_acc_p(data_arr, key_p){
    $.each(data_arr, function(key, value) {
        if(key === key_p){
            if(value != 0){
                result = 'active';
            }else{
                result = '';
            }
        }
    });
    return result.toString();
}
function get_colmn_in(data_arr, key_p){
   if(isInArray(key_p, data_arr) ) {
       result = '';
   }else{
       result = 'active';
   }
    return result.toString();
}
//endregion
//region Ajax
$.ajax({
    type: "GET",
    dataType: "json",
    url: "./index.php?",
    data: {
        "price": "get_list_cat",
        "t": token,
    },

    success: function(list_cat_array) {
        //let data_list_cat = $.parseJSON(list_cat_array);
        data_list_cat = list_cat_array.data;
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
//endregion
$(document).ready(function() {
    $.fn.dataTable.Buttons.defaults.dom.button.className = 'btn';
    var price_settings_modif = get_price_settings('price_client_modif');
    data_price_modif = price_settings_modif['value'];
    var buttonCommon = {
        exportOptions: {
            columns: ':visible',
            format: {
                body: function ( data, row, column, node ) {
                    // Strip $ from salary column to make it numeric
                    return column === 3 ?
                        data :
                        data;
                }
            }
        }
    };
    $('#table_pricelist').DataTable({
        ajax: {
            type: 'GET',
            dataType: "json",
            url: './index.php?price=get_list_price'+'&t='+token,
            dataSrc: 'data'
        },

        columns: [{
            data: 'id',
            title: 'id'
        },
            {
                data: 'category',
                title: '??????????????????'
            },
            {
                data: 'name',
                title: '????????????????????????'
            },
            {
                data: 'in_pack',
                title: '????????????????'
            },
            {
                data: 'price',
                title: '???????? c ????????????'
            },
            {
                data: 'price_client',
                title: '???????? ??????????????',
                render: function ( data, type, row ) {

                    var result = data / 100 * data_price_modif;
                    return (parseFloat(data) + parseFloat(result)).toFixed(2);
                }
            },
            {
                data: 'price_in_pack_client',
                title: '???????? ???? ????????????????',
                render: function ( data, type, row ) {
                    var result = data / 100 * data_price_modif;
                    return ((parseFloat(data) + parseFloat(result)) * row.pack_in_count).toFixed(2);
                }
            },

        ],

        language: {
            "decimal": "",
            "emptyTable": "No data available in table",
            "info": "?????????? _TOTAL_",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Show _MENU_ entries",
            "loadingRecords": "????????????????...",
            "processing": "????????????????...",
            "search": "??????????:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "????????.",
                "last": "????????.",
                "next": "????????.",
                "previous": "????????."
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "buttons": {

                "copy": "????????????????????",
                "print": "????????????",
                "colvis": "??????????????????",
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
            text: '??????????????????: ??????',
            buttons: [{
                text: ' ?????? ??????????????????',
                action: function() {
                    this.search('').columns().search('').draw();
                    this.button(0).text('??????????????????: ?????? ');
                }
                },
                {
                    text: '????????????',
                    action: function() {
                        this.column(1).search('????????????').draw();
                        this.button(0).text('??????????????????: ???????????? ');
                    }
                },
                {
                    text: '??????????-??????????',
                    action: function() {
                        this.column(1).search('??????????-??????????').draw();
                        this.button(0).text('??????????????????: ??????????-?????????? ');
                    }
                },
                {
                    text: '??????????',
                    action: function() {
                        this.column(1).search('??????????', false, false).draw();
                        this.button(0).text('??????????????????: ?????????? ');
                    }
                },
                {
                    text: '????????????',
                    action: function() {
                        this.column(1).search('????????????').draw();
                        this.button(0).text('??????????????????: ???????????? ');
                    }
                },
                {
                    text: '????????',
                    action: function() {
                        this.column(1).search('????????').draw();
                        this.button(0).text('??????????????????: ???????? ');
                    }
                },
                {
                    text: '???????? ?? ??????????????????',
                    action: function() {
                        this.column(1).search('???????? ?? ??????????????????').draw();
                        this.button(0).text('??????????????????: ???????? ?? ?????????????????? ');
                    }
                },
                {
                    text: '?????????????? ?? ????????????????',
                    action: function() {
                        this.column(1).search('?????????????? ?? ????????????????').draw();
                        this.button(0).text('??????????????????: ?????????????? ?? ???????????????? ');
                    }
                },
                {
                    text: '????????????????????????',
                    action: function() {
                        this.column(1).search('????????????????????????').draw();
                        this.button(0).text('??????????????????: ???????????????????????? ');
                    }
                },
            ],
            fade: false
        },
            {
                text: '????????????????',
                action: function(e, dt, node, config) {
                    dt.ajax.reload();
                }
            },
            {
                className : get_acc_p(data_access, 'p_list_edit') ? 'btn-sm' : 'btn-sm d-none',
                text: '????????????????',
                action: function() {
                    $('#modal-add').modal('show')
                }
            },
            {
                extend: 'collection',
                text: '??????',
                buttons: [{
                    className : get_colmn_in(data_access.column_visible.split(","), '0') ? ' ' : 'd-none',
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
                        className : get_colmn_in(data_access.column_visible.split(","), '1') ? ' ' : 'd-none',
                        text: '??????????????????',
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
                        className : get_colmn_in(data_access.column_visible.split(","), '2') ? ' ' : 'd-none',
                        text: '????????????????????????',
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
                        className : get_colmn_in(data_access.column_visible.split(","), '3') ? ' ' : 'd-none',
                        text: '????????????????',
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
                        className : get_colmn_in(data_access.column_visible.split(","), '4') ? ' ' : 'd-none',
                        text: '???????? c ????????????',
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
                        className : get_colmn_in(data_access.column_visible.split(","), '5') ? ' ' : 'd-none',
                        text: '???????? ??????????????',
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
                        className : get_colmn_in(data_access.column_visible.split(","), '6') ? ' ' : 'd-none',
                        text: '???????? ???? ????????????????',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            if (table.columns([6]).visible()[0] === false) {
                                table.columns([6]).visible(true);
                            } else {
                                table.columns([6]).visible(false);
                            }
                        }
                    },

                    {
                        text: '???????????? ??????',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            table.columns([0, 1, 2, 3, 4, 5, 6]).visible(false, false);
                        }
                    },
                    {
                        text: '???????????????? ??????',
                        action: function() {
                            var table = $('#table_pricelist').DataTable();
                            table.columns([0, 1, 2, 3, 4, 5, 6]).visible(true, true);
                            table.columns([0, 1, 2, 3, 4, 5, 6]).visible(true, true);
                        }
                    },
                ]
            },
            {
                extend: 'collection',
                text: '??????????????',
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
            {
                className : get_acc_p(data_access, 'p_list_modif') ? 'btn-sm' : 'btn-sm d-none',
                text: '??????????????',
                action: function(e, dt, node, config) {
                    let modif_price = {};
                    modif_price = get_price_settings('price_client_modif');

                    $('#price_client_modif_input').val(modif_price['value']);
                    $('#price_client_modif_modal').modal('show');
                    //dt.ajax.reload();//price_client_modif_modal
                }
            },
        ],


        rowCallback: function(row, data) {
            if (data) {

                if (data.price > 0) {
              /*
                    $('td', row).eq(4).addClass('').html(data.price);
                    var result = (data.price / 100) * data_price_modif; //???????????????????? ??????????????????
                    $('td', row).eq(5).addClass('').html((result + (data.price)));
                    $('td', row).eq(6).addClass('').html((result + (data.price)) * data.pack_in_count);
                    data.price_in_pack_client = (result + data.price) * data.pack_in_count;
                    data.price_client = result + data.price;
                    data.price = data.price;
              */
                }
            }
        },
        initComplete: function(data) {
            if(data.json['resultCode'] >= 1){
                request_responses(data.json);
            }
        },

    }).buttons().container().appendTo('#table_pricelist_wrapper .col-md-6:eq(0)');

        var table = $('#table_pricelist').DataTable();
        if(data_access.column_visible){
            column_visible_array = data_access.column_visible.split(",");
            $.each(column_visible_array, function(key, value) {
                        table.columns([value]).visible(false);
            });
        }
    //$.fn.dataTable.table_category.errMode = 'throw';

    $('#table_category').DataTable({
        ajax: {
            type: 'GET',
            dataType: "json",
            url: './index.php?price=get_list_category'+'&t='+token,
            dataSrc: 'data'
        },

        columns: [
            {
                data: 'id',
                title: 'id'
            },
            {
                data: 'name',
                title: '????????????????????????'
            },
            {
                data: 'visible',
                title: '????????????????????'
            }
        ],
        language: {
            "decimal": "",
            "emptyTable": "No data available in table",
            "info": "?????????? _TOTAL_",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Show _MENU_ entries",
            "loadingRecords": "????????????????...",
            "processing": "????????????????...",
            "search": "??????????:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "????????.",
                "last": "????????.",
                "next": "????????.",
                "previous": "????????."
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "buttons": {

                "copy": "????????????????????",
                "print": "????????????",
                "colvis": "??????????????????",
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

        buttons: [
            {
                text: '????????????????',
                action: function(e, dt, node, config) {
                    dt.ajax.reload();
                }
            },
            {
                className : get_acc_p(data_access, 'p_cat_edit') ? 'btn-sm' : 'btn-sm disabled',
                text: '????????????????',
                action: function() {

                    $('#category_add_modal_label').text('???????????????? ??????????????????')
                    $("#name_category_input").val('');
                    $('#save_category_edit').hide();
                    $('#save_category_add').show();
                    $('#category_add_modal').modal('show');

                }
            },
        ],

        rowCallback: function(row, data) {
            if (data) {

            }
        },
        initComplete: function(data) {
            if(data.json['resultCode'] >= 1){
                request_responses(data.json);
                if(data.json['resultCode'] === 2){
                    $("#view_category").hide();

                }

            }

            if(data.json['edit_cat_list'] === '1'){
                cat_edit_acces = '';
            }
        },

    }).buttons().container().appendTo('#table_category_wrapper .col-md-6:eq(0)');
    $.fn.dataTable.ext.errMode = 'none';
    $('*').click(function(event) {
        toggleMenu_pack();
        toggleMenu_list();
        toggleMenu_cat();
    });
    $('#table_pack').DataTable({
        ajax: {
            type: 'GET',
            dataType: "json",
            url: './index.php?price=get_list_in_pack'+'&t='+token,
            dataSrc: 'data'
        },

        columns: [
            {
                data: 'id',
                title: 'id'
            },
            {
                data: 'name',
                title: '????????????????????????'
            },
            {
                data: 'count',
                title: '??????-???? ?? ????????????????'
            },
            {
                data: 'type',
                title: '?????? ????????????????'
            }
        ],

        language: {
            "decimal": "",
            "emptyTable": "No data available in table",
            "info": "?????????? _TOTAL_",
            "infoEmpty": "Showing 0 to 0 of 0 entries",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Show _MENU_ entries",
            "loadingRecords": "????????????????...",
            "processing": "????????????????...",
            "search": "??????????:",
            "zeroRecords": "No matching records found",
            "paginate": {
                "first": "????????.",
                "last": "????????.",
                "next": "????????.",
                "previous": "????????."
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "buttons": {

                "copy": "????????????????????",
                "print": "????????????",
                "colvis": "??????????????????",
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

        buttons: [

            {
                text: '????????????????',
                action: function(e, dt, node, config) {
                    dt.ajax.reload();
                }
            },
            {
                className : get_acc_p(data_access, 'p_pack_edit') ? 'btn-sm' : 'btn-sm disabled',
                text: '????????????????',
                action: function() {

                    $('#pack_add_modal_label').text('???????????????? ????????????????')
                    $("#name_pack_input").val('');
                    $("#count_in_pack_input").val('0');
                    $('#save_pack_edit').hide();
                    $('#save_pack_add').show();
                    $('#pack_add_modal').modal('show');
                }
            },

        ],

        rowCallback: function(row, data) {
            if (data) {

            }
        },
        initComplete: function(data) {
            if(data.json['resultCode'] >= 1){
                if(data.json['resultCode'] === 2){

                    $("#view_pack").hide();
                }
                request_responses(data.json);
            }
        },

    }).buttons().container().appendTo('#table_pack_wrapper .col-md-6:eq(0)');
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
    $("#price_row").change(function() {
        if(isNumber($(this).val())){
            n = $(this).val();
            n = n * 1;
            var out = n.toFixed(2);
            $(this).val(out);
        }else {
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
    $('#table_pricelist').on('contextmenu', 'tbody tr', function(e) {
        var table = $('#table_pricelist').DataTable();
        var data = table.rows(this, {
            selected: true
        }).data()[0];
        if(!get_acc_p(data_access, 'p_list_edit')){
            $('#edit_row').hide();
            $('#delete_row').hide();
        }
        $('#id_row').text(function() {
            return data['name'];
        });
        let date_clipboard = data['name'] + ' ????????: ' + data['price'];
        $('#copy_row').on('click', function() {
            toggleMenu_list();
            navigator.clipboard.writeText(date_clipboard)
                .then(() => {
                    send_message("success", "???????????? ?????????????????????? ?? ?????????? ????????????!", data['name'], "???????????????????????????? ???????????????? '????????????????' ?????? ??????.????. CTRL+V");
                })
                .catch(err => {
                    send_message("warning", "Clipboard err!", '???????????? ?????????????????????? ?? ?????????? ????????????', err);
                });
        })
        $('#edit_row').on('click', function() {
            toggleMenu_list();
            $('#modal-lg').modal('show')
            $('#select_cat_row option[value=' + data['cat_id'] + ']').prop('selected', true);
            $('#pack_row option[value=' + data['pack_id'] + ']').prop('selected', true);
            $("#name_row").val(data['name']);
            $("#id_r").val(data['id']);
            //$("#category_row").val(data['category']);
            $("#in_pack_row").val(data['in_pack']);
           /* $("#price_row").on('input', function() {
                //???????????????????? ?????????????????? ???????????????? ?????????????????? ?????????????? ???? ?????????????????? ???????????? ?? ????????????
                var c = this.selectionStart,
                    r = /[^0-9.,]/gim,
                    v = $(this).val();
                if (r.test(v)) {
                    $(this).val(v.replace(r, ''));
                    send_message("warning", "Regexp: ???????????? ?????????? ????????????!", '???? ???????????????? ???????????????????????? ??????????????. ???????????? 0-9 \',\' \'.\'', "???????????? ???????????? ?????????? ???????????????? ????????????: 105,51 ?????? 105.51 ");
                    c--;
                }
                this.setSelectionRange(c, c);
            });*/
            $("#price_row").val(data['price']);
        })
        $('#reload_table').on('click', function() {
            toggleMenu_list();
            table.ajax.reload();
        })
        $('#find_cat').on('click', function() {
            toggleMenu_list();
            table.search(data['category']).draw();
        });
        $('#delete_row').on('click', function() {
            toggleMenu_list();
            $('#modal_delete').modal('show');
            $('#row_delete_data').text(data['name']);
            $('#confirm_delete').on('click', function() {
                var data_delete = {};
                data_delete["id"] = data['id'];
                delete_row(data_delete,token);
            });

        });
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition_list(origin);
        return false;
    });
    $('#table_pricelist tbody').on('click', 'tr', function() {
        toggleMenu_pack();
        toggleMenu_list();
        toggleMenu_cat();
        window.addEventListener("click", e => {
            if (menuVisible_list) toggleMenu_list("hide");
            if (menuVisible_list) toggleMenu_pack("hide");
            if (menuVisible_list) toggleMenu_cat("hide");
        });
        var table = $('#table_pricelist').DataTable();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#table_category tbody').on('click', 'tr', function() {
        toggleMenu_pack();
        toggleMenu_list();
        toggleMenu_cat();
        window.addEventListener("click", e => {
            if (menuVisible_list) toggleMenu_list("hide");
            if (menuVisible_list) toggleMenu_pack("hide");
            if (menuVisible_list) toggleMenu_cat("hide");
        });
        var table = $('#table_category').DataTable();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
    $('#table_pack tbody').on('click', 'tr', function() {
        toggleMenu_pack();
        toggleMenu_list();
        toggleMenu_cat();
        window.addEventListener("click", e => {
            if (menuVisible_list) toggleMenu_list("hide");
            if (menuVisible_list) toggleMenu_pack("hide");
            if (menuVisible_list) toggleMenu_cat("hide");
        });
        var table = $('#table_pack').DataTable();
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

        $('#select_cat_row option[value=' + data['cat_id'] + ']').prop('selected', true);
        $('#pack_row option[value=' + data['pack_id'] + ']').prop('selected', true);
        $("#name_row").val(data['name']);
        $("#id_r").val(data['id']);
        //$("#category_row").val(data['category']);
        $("#in_pack_row").val(data['in_pack']);
        $("#price_row").on('input', function() {
            //???????????????????? ?????????????????? ???????????????? ?????????????????? ?????????????? ???? ?????????????????? ???????????? ?? ????????????
            var c = this.selectionStart,
                r = /[^0-9.,]/gim,
                v = $(this).val();
            if (r.test(v)) {
                $(this).val(v.replace(r, ''));
                send_message("warning", "Regexp: ???????????? ?????????? ????????????!", '???? ???????????????? ???????????????????????? ??????????????. ???????????? 0-9 \',\' \'.\'', "???????????? ???????????? ?????????? ???????????????? ????????????: 105,51 ?????? 105.51 ");
                c--;
            }
            this.setSelectionRange(c, c);
        });

        $("#price_row").val(data['price']);

    });
    $('#modal_edit_save').click(function() {
        var data_from = objectifyForm('save_row');
        data_from['price_row'] = isNumberToDecimal(data_from['price_row']);
        set_row(data_from,token);
    });
    $('#save_category_add').click(function() {
        var data_from = objectifyForm('add_category');
        add_category(data_from,token);
    });
    $('#save_pack_add').click(function() {
        var data_from = objectifyForm('add_pack');
        add_pack(data_from,token);
    });
    $('#modal_add_save').click(function() {
        var data_from = objectifyForm('add_row');
        if (data_from['price_row_add'] != 0) {
            data_from['price_row_add'] = formatToKop(data_from['price_row_add']);
        } else {
            data_from['price_row_add'] = '';
        }
        add_row(data_from,token);
    });
    $('#save_price_client_modif').click(function() {
        var data_from = objectifyForm('form_price_client');
        //if data_from['price_client_modif_input'].isInteger(1)
        if (data_from['price_client_modif_input'] != 0) {
            let data_from_save = {};
            data_from_save['set_name'] = 'price_client_modif';
            data_from_save['value'] = parseInt(data_from['price_client_modif_input'],10);
            save_settings(data_from_save,token);
        } else {
        }
    });
    $('#table_category').on('contextmenu', 'tbody tr', function(e) {
        var table = $('#table_category').DataTable();
        var data = table.rows(this, {
            selected: true
        }).data()[0];
        $('#id_row_cat').text(function() {
            return data['name'];
        });
        let date_clipboard = data['name'];
        if(!get_acc_p(data_access, 'p_cat_edit')){
            $('#edit_row_cat').hide();
            $('#delete_row_cat').hide();
        }
        $('#copy_row_cat').on('click', function() {
            toggleMenu_cat();
            navigator.clipboard.writeText(date_clipboard)
                .then(() => {
                    send_message("success", "???????????? ?????????????????????? ?? ?????????? ????????????!", data['name'], "???????????????????????????? ???????????????? '????????????????' ?????? ??????.????. CTRL+V");
                })
                .catch(err => {
                    send_message("warning", "Clipboard err!", '???????????? ?????????????????????? ?? ?????????? ????????????', err);
                });
        })
        $('#edit_row_cat').on('click', function() {
            toggleMenu_cat();
            $('#category_add_modal').modal('show');
            $('#category_add_modal_label').text('???????????????? ??????????????????')
            $("#id_category_input").val(data['id']);
            $("#name_category_input").val(data['name']);
            $('#save_category_add').hide();
            $('#save_category_edit').show();

            $('#save_category_edit').click(function() {
                var data_from = objectifyForm('add_category');
                edit_category(data_from,token);
            });
        })
        $('#reload_table_cat').on('click', function() {
            toggleMenu_cat();
            table.ajax.reload();
        })
        $('#find_cat_cat').on('click', function() {
            toggleMenu_cat();
            table.search(data['name']).draw();
        });
        $('#delete_row_cat').on('click', function() {
            toggleMenu_cat();
            $('#modal_delete').modal('show');
            $('#title_delete_modal').text('???????????????? ????????????:'+data['name']);
            $('#row_delete_data').text(data['name']);

            $('#confirm_delete').on('click', function() {
                var data_delete = {};
                data_delete["id"] = data['id'];
                delete_category(data_delete,token);
            });
        });
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition_cat(origin);
        return false;
    });
    $('#table_pack').on('contextmenu', 'tbody tr', function(e) {
        var table = $('#table_pack').DataTable();
        var data = table.rows(this, {
            selected: true
        }).data()[0];
        $('#id_row_pack').text(function() {
            return data['name'];
        });
        if(!get_acc_p(data_access, 'p_pack_edit')){
            $('#edit_row_pack').hide();
            $('#delete_row_pack').hide();
            $('#pack_add_modal').modal('toggle');

        }
        let date_clipboard = data['name'];
        $('#copy_row_pack').on('click', function() {
            toggleMenu_pack();
            navigator.clipboard.writeText(date_clipboard)
                .then(() => {
                    send_message("success", "???????????? ?????????????????????? ?? ?????????? ????????????!", data['name'], "???????????????????????????? ???????????????? '????????????????' ?????? ??????.????. CTRL+V");
                })
                .catch(err => {
                    send_message("warning", "Clipboard err!", '???????????? ?????????????????????? ?? ?????????? ????????????', err);
                });
        })
        $('#edit_row_pack').on('click', function() {
            toggleMenu_pack();
            $('#pack_add_modal').modal('show');
            $('#pack_add_modal_label').text('???????????????? ????????????????')
            $("#id_pack_input").val(data['id']);
            $("#name_pack_input").val(data['name']);
            $("#count_in_pack_input").val(data['count']);
            $('#save_pack_add').hide();
            $('#save_pack_edit').show();
            $('#save_pack_edit').click(function() {
                var data_from = objectifyForm('add_pack');
                edit_pack(data_from,token);
            });
        })
        $('#reload_table_pack').on('click', function() {
            toggleMenu_pack();
            table.ajax.reload();
        })
        $('#find_cat_pack').on('click', function() {
            toggleMenu_pack();
            table.search(data['name']).draw();
        });
        $('#delete_row_pack').on('click', function() {
            toggleMenu_pack();
            $('#modal_delete').modal('show');
            $('#title_delete_modal').text('???????????????? ????????????:'+data['name']);
            $('#row_delete_data').text(data['name']);
            $('#confirm_delete').on('click', function() {
                var data_delete = {};
                data_delete["id"] = data['id'];
                delete_pack(data_delete,token);
            });
        });
        e.preventDefault();
        const origin = {
            left: e.pageX,
            top: e.pageY
        };
        setPosition_pack(origin);
        return false;
    });
});