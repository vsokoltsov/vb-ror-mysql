function popupWindow(form)
{
    form.find("input.popup-available").each(function()
    {
        $(".popup-main").remove();
        var popup = $("<div class='popup-main'></div>");


        $(this).focusin(function(){
              classes_list = $(this).attr("class");
              arr_classes = classes_list.split(" ");

//            var list = popupFindData("Role");
//            console.log("in popupWindo "+list);
            popupFindData(arr_classes[1], popup);

            popup.insertAfter($(this)).hide().fadeIn('fast');
        })
            .focusout(function()
            {
                $(".popup-main").fadeOut('fast');
            })
            .on('keyup, keydown', function()
            {
                return false;
            });
        ;
    });
}

function popupFindData(className, popup)
{
   $(".popup-main>ul").remove();
   var cache = [];
   var list = $("<ul></ul>");
   popup.append(list);
   console.log("cached length"+ " " + cache.length);
       $.ajax({
           type: 'GET',
           url: '/users/user_nested_info',
           data: { class_name: className },
           dataType: 'json',
           success: function (data) {
               $.each(data, function (index, value) {
                   list.append("<li>" + this.value + "</li>");
                   cache.push(this.value);
               });
               popup.find("li").on('mouseenter',function()
               {
                   $(this).addClass("current");
               })
                   .on('mouseleave', function()
                   {
                       $(this).removeClass('current');
                   })
                   .on('click', function()
                   {
                       text = $(this).text();
                       console.log(text);
                       $(this).closest('.popup-main').prev('.popup-available').val(text);
                   });
           }
       });


}

$(document).ready(function()
{
   popupWindow($("#edit_user_form"));
});