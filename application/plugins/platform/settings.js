(function(global) {
    global.data_settings = new Array();
    global.data_role = new Array();
    global.data_form = new Array();

}(this));
let data_settings = new Array();
let Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 10000,
    showCloseButton: true,

});
toastr.options = {

}

let column_visible = $('select[name="column_visible[]"]').bootstrapDualListbox({
    nonSelectedListLabel: 'Отображать',
    selectedListLabel: 'Не отображать',
    showFilterInputs: false,
    preserveSelectionOnMove: 'moved',
    moveOnSelect: false,
    infoText: false,

});

function get_group_settings(list_role, role_id){

    $("#group_price_setting").show();
    $("#group_column_visible").show();
    $("#group_general_settings").show();
    $.each(list_role, function(key, value) {
        if(value.id === role_id){
            if(value['p_list_view'] == 1){
                document.getElementById('p_list_view').checked = true;
            }else{
                document.getElementById('p_list_view').checked = false;
            }
            if(value['p_list_edit'] == 1){
                document.getElementById('p_list_edit').checked = true;
            }else{
                document.getElementById('p_list_edit').checked = false;
            }
            if(value['p_list_modif'] == 1){
                document.getElementById('p_list_modif').checked = true;
            }else{
                document.getElementById('p_list_modif').checked = false;
            }
            if(value['p_cat_view'] == 1){
                document.getElementById('p_cat_view').checked = true;
            }else{
                document.getElementById('p_cat_view').checked = false;
            }
            if(value['p_cat_edit'] == 1){
                document.getElementById('p_cat_edit').checked = true;
            }else{
                document.getElementById('p_cat_edit').checked = false;
            }
            if(value['p_pack_view'] == 1){
                document.getElementById('p_pack_view').checked = true;
            }else{
                document.getElementById('p_pack_view').checked = false;
            }
            if(value['p_pack_edit'] == 1){
                document.getElementById('p_pack_edit').checked = true;
            }else{
                document.getElementById('p_pack_edit').checked = false;
            }
            column_visible.val(value['column_visible'].split(','));
            column_visible.bootstrapDualListbox('refresh');
        }

    });

}
function send_message(icon,title,message,footer) {
    Toast.fire({
        icon: icon,
        title: title,
        html:   message,
        footer: footer
    });
};
function autosave(dataform) {

    jQuery.ajax({
        url: "./index.php?settings=set_reg_settings",
        data: dataform,
        type: 'GET',
        success: function (data) {
            send_message("success","Настройки сохранены",data,"");

        },
        error: function(data) {
            send_message("warning","Настройки сохранены",data,"");
            console.log('Ошибка: ' + data);
        }
    });

}
function set_group_settings(data_form_group, id_role) {

    jQuery.ajax({
        url: "./index.php?settings=set_group_settings&id="+id_role,
        data: data_form_group,
        type: 'GET',
        success: function (data) {
            let obj = $.parseJSON(data);
            if (obj.resultCode === 1) {
                send_message("warning", "Ошибка сохранения", obj.result_msg, '');
            }
            if (obj.resultCode === 0) {
                send_message("success", "Изменения успешно сохранены", obj.result_msg, '');
            }

        },
        error: function(data) {
            send_message("warning", "Jquery Ajax Error", data, '');
            console.log('Ошибка: ' + data);
        }
    });

}
function get_role_grops(id_role){
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "./index.php?",
            data: {"settings":"get_listrole"},
            success: function (role_array) {
                data_role = role_array;
                if (~role_array) {
                    role_length = data_role.length;
                    $('#select_group').empty()
                    $('#select_group').append($("<option></option>").attr("value", "-1").text("Выбрать группу"));
                    $.each(data_role, function(key, value) {

                        $('#select_group').append($("<option></option>").attr("value", value.id).text(value.description));
                        $('#select_roleuser').append($("<option></option>").attr("value", value.id).text(value.description));
                    });
                    $('#role_count').text(role_length)

                }
                //$("#select_group :last").attr("selected", "selected");
                $('#select_group option[value='+id_role +']').attr('selected', 'selected');
            }
        });
}
function set_column_visible(list_column,id_role){//in string split (,)
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "./index.php?",
        data: {
            "settings":"set_column_visible",
            "id":id_role,
            "list_column":list_column
        },
        success: function (data) {
            //let obj = $.parseJSON(data);
            if (data.resultCode === 1) {
                send_message("warning", "Ошибка сохранения", data.result_msg, '');
            }
            if (data.resultCode === 0) {
                send_message("success", "Изменения успешно сохранены", data.result_msg, '');
            }
        },
        error: function(data) {
            send_message("warning", "Jquery Ajax Error", data, '');
            console.log('Ошибка: ' + data);
        }
    });
}
$( "#select_group" ).change(function() {
    let_last_val = $( "#select_group" ).val();
    get_group_settings(data_role,  $( "#select_group" ).val());
    get_role_grops($( "#select_group" ).val());

});
$(document).ready(function() {
    get_role_grops();
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "./index.php?",
        data: {"settings":"get_reg_settings"},
        success: function (settings_array) {
            data_settings = settings_array;
            if(data_settings['reg_active'].value == 1){
                document.getElementById('switch_regon').checked = true;
            }else{
                document.getElementById('switch_regon').checked = false;
            }
            if(data_settings['reg_log_on_email'].value == 1){
                document.getElementById('switch_emailon').checked = true;
            }else{
                document.getElementById('switch_emailon').checked = false;
            }
            if(data_settings['reg_auto_log_new_user'].value == 1){
                document.getElementById('switch_autoon').checked = true;
            }else{
                document.getElementById('switch_autoon').checked = false;
            }
            if(data_settings['reg_token_save'].value == 1){
                document.getElementById('switch_tokenon').checked = true;
            }else{
                document.getElementById('switch_tokenon').checked = false;
            }
            $("#input_coocke").val(data_settings['reg_cookie_time'].value);
            $('#select_passwdtype option[value='+ data_settings['reg_type'].value +']').prop('selected', true);
            $('#select_roleuser option[value='+ data_settings['reg_access_new_user'].value +']').prop('selected', true);
            //
        }
    });
    $("#group_price_setting").hide();
    $("#group_general_settings").hide();
    $("#group_column_visible").hide();
    $("#reg_login_settings").change(function() {
        var dataform =  $("#reg_login_settings").serializeArray()
        names = (function(){
            var n = [],
                l = dataform.length - 1;
            for(; l>=0; l--){
                n.push(dataform[l].name);
            }
            return n;
        })();
        $('input[type="checkbox"]:not(:checked)').each(function(){
            if($.inArray(this.name, names) === -1){
                dataform.push({name: this.name, value: 'off'});
           }
        });
        //в dataform получаем слишком много пустыъ элементов массива
        //костыль: фильтруем, отсееваем пустые елементы
        set_array_dataform = dataform.filter(v => v.name != "");
        autosave(set_array_dataform)
    });
    $("#group_price_setting").change(function() {
        var checkedAry= [];
        $.each($("input[name='chek_form_group']"), function () {
            if ($(this).is(':checked')){

                checkedAry.push({name: $(this).attr('id'), value: 1});
            }else{
                checkedAry.push({name: $(this).attr('id'), value: 0});
            }
        });
        // Проверяем состояние чекбоксов после любого изменени
        // checkedAry ассоциативный массив группы chek_form_group 1 - выбран 0 -нет
        //console.log(checkedAry)

        set_group_settings(checkedAry, $( "#select_group" ).val());
    });
    $("#save_column").click(function() {
        var selectedValues = column_visible.val();
        //console.log(selectedValues.toString());
        set_column_visible(selectedValues.toString(),$( "#select_group" ).val());
    });


});
