

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
function send_message(icon,title,message,footer) {
    Toast.fire({
        icon: icon,
        title: title,
        html:   message,
        footer: footer
    });
};
$.ajax({
    type: "GET",
    dataType: "json",
    url: "./index.php?",
    data: {"settings":"get_listrole"},
    success: function (role_array) {
        data_role = role_array;
        if (~role_array) {
            $.each(data_role, function(key, value) {
                $('#select_roleuser').append($("<option></option>").attr("value", value.id).text(value.description));
            });
        }
    }
});
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
function autosave(dataform) {
    jQuery('form').each(function () {
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
    });
}
$(document).ready(function() {
    $("form").change(function() {
        var dataform =  $('form').serializeArray();
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
});
