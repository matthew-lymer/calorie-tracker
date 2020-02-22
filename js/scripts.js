    //JS cookie control
    //E.g. Cookies.set('cookieName', 'cookieValue', { expires: 7, secure: false });
    //Where expires is in days
    !function(e){if("function"==typeof define&&define.amd)define(e);else if("object"==typeof exports)module.exports=e();else{var n=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=n,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(a){}return r=t.write?t.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires&&"; expires="+i.expires.toUTCString(),i.path&&"; path="+i.path,i.domain&&"; domain="+i.domain,i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,u=0;u<p.length;u++){var f=p[u].split("="),l=f[0].replace(d,decodeURIComponent),m=f.slice(1).join("=");'"'===m.charAt(0)&&(m=m.slice(1,-1));try{if(m=t.read?t.read(m,l):t(m,l)||m.replace(d,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(a){}if(n===l){c=m;break}n||(c[l]=m)}catch(a){}}return c}return o.get=o.set=o,o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n(function(){})});

    function totalCalories(){
        var calories = 0;

        $(".window .body #content .list-item input.calories").each(function(){
            var calorie = parseFloat($(this).val());
            if(isNaN(calorie)){
                calorie = 0;
            }

            calories += calorie;
        });

        $(".window .body #calorie-total .total").text(Math.ceil(calories).toLocaleString('en'));
    }

    $(document).ready(function(){

        //Add extra list items
        //Adjust the adding buttons after adding first item
        if($(".window .body #content .list-items").length){
            $(".window .body #content").on("click touch", ".empty-list-item, .add-list-item", function(){
                if($(".window .body #content .add-list-item").hasClass("suspend")){
                    alert("A maximum of 50 items can be added at a time");
                }
                else{
                    var listItemHTML = '<div class="list-item">' +
                                        '    <a class="close button left">' +
                                        '        <img src="images/close-white.svg" alt="Delete" width="30" height="30" />' +
                                        '    </a>' +
                                        '    <input class="food description left" type="text" name="description" value="" placeholder="Food description" />' +
                                        '    <input class="food calories right" type="tel" name="calories" value="" placeholder="kCal" />' +
                                        '    <div class="clear"></div>' +
                                        '</div>';

                    $(".window .body #content .list-items").append(listItemHTML);

                    $(".window .body #content .overflow-box").stop().animate({ scrollTop: $('.window .body #content .overflow-box').prop("scrollHeight")}, 500);

                    var listItemCount = $(".window .body #content .list-items .list-item").length;

                    if(listItemCount > 1){
                        $(".window .body #content .empty-list-item").removeClass("on");
                    }

                    if(listItemCount >= 50){
                        $(".window .body #content .add-list-item").addClass("suspend");
                    }
                    else{
                        $(".window .body #content .add-list-item").removeClass("suspend");
                    }
                }
            });
        }

        //Remove existing list-items
        //Reset the adding buttons if no items left
        //Adjust the calorie total after removing a list-item
        $(".window .body #content .list-items").on("click touch", ".list-item a.close", function(){
            $(this).parent(".list-item").remove();

            var listItemCount = $(".window .body #content .list-items .list-item").length;

            if(listItemCount <= 1){
                $(".window .body #content .empty-list-item").addClass("on");
            }

            if(listItemCount >= 50){
                $(".window .body #content .add-list-item").addClass("suspend");
            }
            else{
                $(".window .body #content .add-list-item").removeClass("suspend");
            }

            totalCalories();
        });

        $(".window .body #content .list-items").on("change keyup", ".list-item input.calories", function(){
            totalCalories();
        });

        //Touch events
        // $(".ball").on("click touch", function(){
        //     var id = $(this).data("ball");
        //
        //     var currentDate = new Date();
        //     var expirationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0, 0, 0);
        //
        //     if( $(this).hasClass("on") ){
        //         $(this).removeClass("on");
        //         Cookies.set('ball-'+id, 0, { expires: expirationDate, secure: false });
        //     }
        //     else{
        //         $(this).addClass("on");
        //         Cookies.set('ball-'+id, 1, { expires: expirationDate, secure: false });
        //     }
        // });
    });
