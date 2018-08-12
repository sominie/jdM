
        var banner = document.getElementsByClassName("banner")[0];
        
        var pics = document.getElementById("pics").getElementsByTagName("li");
        var layout = document.getElementsByClassName("jd_layout")[0];
        //var width = document.documentElement.clientWidth;
        var width = layout.offsetWidth;
        banner.style.height = 404*width/828 + "px";
        var now = 0;
        var prev = 7;
        var next  =1;

        init();
        function init() {
            for(var i=0; i<pics.length; i++) {
                pics[i].style.transform = "translateX("+width+"px)";
            }
            pics[now].style.transform = "translateX(0px)";
            pics[prev].style.transform = "translateX("+(-width)+"px)";
            pics[next].style.transform = "translateX("+width+"px)";
        }


        var timer = setInterval(function(){
            shownext();
        },3000);

        function shownext() {
            pics[prev].style.transition = "none";
            pics[now].style.transform = "translateX("+(-width)+"px)";
            pics[prev].style.transform = "translateX("+width+"px)";
            pics[next].style.transform = "translateX(0px)";            
            pics[now].style.transition = "all 1s ease";
            pics[next].style.transition = "all 1s ease";
            prev = now;
            now = next;
            next++;
            if(next>7) {
                next=0;
            }
            changeCtrl();
        }

        var banner = document.getElementById("pics");

        // banner.addEventListener("touchstart", function(event) {
        //     clearInterval(timer);
        //     startX = event.touches[0].clientX;
        // });
        banner.addEventListener("touchstart",touchstartHandler,false);
        banner.addEventListener("touchmove",touchmoveHandler,false);
        banner.addEventListener("touchend",touchendHandler,false);
        
        var startX;
        var startTime;
        function touchstartHandler(event) {
            event.preventDefault();
            if(event.touches.length>1){
                return;
            }
            clearInterval(timer);
            startX = event.touches[0].clientX;
            //delatX = event.touches[0].clientX;
            //console.log(startX);
            pics[now].style.transition = "none";
            pics[next].style.transition = "none";
            pics[prev].style.transition = "none";
            startTime = new Date();

        }
        //var moveX;
        function touchmoveHandler(event) {
            event.preventDefault();
            clearInterval(timer);
            var moveX = event.touches[0].clientX;
            pics[now].style.transform = "translateX("+(moveX-startX)+"px)";
            pics[next].style.transform = "translateX("+(width+moveX-startX)+"px)";
            pics[prev].style.transform = "translateX("+(-width+moveX-startX)+"px)";
            
            // pics[now].style.transition = "all 0.1s ease 0s";
            // pics[next].style.transition = "all 0.1s ease 0s";
            // pics[prev].style.transition = "all 0.1s ease 0s";
        }
        var delatX;
        function touchendHandler(event) {
            event.preventDefault();
            var endTime = new Date() - startTime;
            delatX = event.changedTouches[0].clientX - startX;
            //console.log(delatX);
            if(delatX>width/2 || (endTime<300&&delatX>30)) {
                pics[now].style.transform = "translateX("+(width)+"px)";
                pics[prev].style.transform = "translateX(0px)";
                pics[now].style.transition = "all 1s ease 0s";
                pics[prev].style.transition = "all 1s ease 0s";
                next = now;
                now = prev;
                prev --;
                if(prev<0){
                    prev = 7;
                }
                changeCtrl();
                //console.log(1);

            }else if(delatX<-width/2 || (endTime<300&&delatX<-30)) {
                //console.log(2);
                shownext();
            }else {
                //console.log(3);
                pics[now].style.transform = "translateX(0px)";
                pics[prev].style.transform = "translateX("+(-width)+"px)";
                pics[next].style.transform = "translateX("+(width)+"px)";
                pics[now].style.transition = "all 0.1s ease 0s";
                pics[next].style.transition = "all 0.1s ease 0s";
                pics[prev].style.transition = "all 0.1s ease 0s";
                
            }
            timer = setInterval(function(){
            shownext();
            },3000);
        }

        var ctrl = document.getElementById("ctrl").getElementsByTagName("li");
        function changeCtrl() {
            for(var i=0; i<8; i++){
				ctrl[i].className = "";
			}
			ctrl[now].className= "current";
        }

        var banner = document.querySelector(".banner");
        var bannerH = banner.offsetHeight;
        var search = document.querySelector(".jd_search");

        window.onscroll = function() {
            var opacity = 0;
            var offsetTop = document.body.scrollTop || document.documentElement.scrollTop;
            //console.log(search);
            //console.log(bannerH);
            if(offsetTop < bannerH) {
                opacity = offsetTop/bannerH*0.8;
                search.style.backgroundImage =  "-webkit-linear-gradient(rgba(255,0,0,"+ opacity+") 100%,rgba(255,255,255,0) 0%)";
            }
        }
