//data_settings = new Array();
//'use strict';

(function(global) {
    global.data_settings = new Array();
    global.data_role = new Array();
}(this));

let data_settings = new Array();
var Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 15000,
    showCloseButton: true,

});

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
        console.log(data_role)
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

$(document).ready(function() {

    console.log($('#select_passwdtype').val())

});
