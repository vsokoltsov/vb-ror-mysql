$(document).ready(function()
{
    buildSlider();
    $(".user_cabinet").click(function()
    {
        buildDialog();
    });
});

function buildSlider()
{
    var current_val = parseInt($("#current_day").val(),10);
    var sum_of_days = parseInt($("#date_sum").val(),10);
    console.log(current_val);
    console.log(sum_of_days);
    $(".current_user_slider").slider(
        {
            range: "min",
            min: 1,
            max: sum_of_days,
            value: current_val,
            disable: true
        });
}
function buildDialog()
{
    var dialog = $("<div id='#dialog_window'></div>");
    dialog.insertBefore(".wrapper");
    dialog.dialog({
        title: 'Личный кабинет',
        dialogClass: 'user_cabinet',
        width: 958,
        modal: true
    });
    $.ajax({
        url: '/users/edit',
        type: 'GET',
        success: function(html)
        {
            dialog.html(html);
            $("#cabinet_tabs").tabs({selected: 0});
        }

    });

}