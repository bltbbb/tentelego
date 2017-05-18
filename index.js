window.onload = function  () {

    	var oLoading = $('loading')
        var oHeader = $('header');
    	var oNav = $('nav');
    	var aLiNav = oNav.getElementsByTagName('li');
        var oMusic = $('music');
        var oAudio = oMusic.getElementsByTagName('audio')[0];
        var oCur = $('cursor');
    	var oContent = $('content');
    	var oList = $('list');
    	var aList = getElementsByClassName(oList,'liList');
    	var iNow = 0;
        var prevIndex = 0;
    	var iContentHeight = 0;
    	var oCourseContent = $('courseContent');
    	var oCourseContent2 = getElementsByClassName(oCourseContent,'courseContent2')[0];
        var oHomecontent = $('homeContent');
        var oHomecontent1 = getElementsByClassName(oHomecontent,'homeContent1')[0];
        var oHomecontent2 = getElementsByClassName(oHomecontent,'homeContent2')[0];
        var oWorksContent = $('worksContent')
        var oMenu = getElementsByClassName(oContent,'menu')[0];
        var aMenuLi = oMenu.getElementsByTagName('li');
        var oAboutContent =$('aboutContent');
        var oAboutContent2 = getElementsByClassName(oAboutContent,'aboutContent2')[0];
        var oContactContent = $('contactContent');

        
        
        

        loading();
        window.onresize = fnResize;
        mouseWheel();
        contentAuto();
        courseContent();
        bindNav();
        music ();
        homeToMove();
        aboutContent();
        worsImgChange();

    	function loading () {
            var oDiv = oLoading.getElementsByTagName('div');
            var oSpan = oLoading.getElementsByTagName('span')[0];
            var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg',];
            var iNow = 0;

            for (var i= 0; i < arr.length; i++) {
                
                var objImg = new Image();
                objImg.src = 'img/' + arr[i];
                objImg.onload = function  () {
                    iNow++;
                    oSpan.style.width = iNow/arr.length*100 +'%';
                }
            }
            oSpan.addEventListener('webkitTransitionend',spanChange,false);
            oSpan.addEventListener('transitionend',spanChange,false);

            function spanChange() {
                oSpan.style.display = 'none';
                oDiv[0].style.height = '0';
                oDiv[1].style.height = '0';
                oMusic.onclick();
                InOut[0].In();
            }
         };
        
        

        function bindNav () {                //导航绑定事件
            var oDiv = aLiNav[0].getElementsByTagName('div')[0];
            oDiv.style.width = '100%';         //初始化（位置及显示）
            oCur.style.left = aLiNav[0].offsetLeft + aLiNav[0].offsetWidth/2 - oCur.offsetWidth/2 +'px';

    		for (var i = 0; i < aLiNav.length; i++) {
    			aLiNav[i].index = i;           //添加索引
    			aLiNav[i].onmousedown = function(){        //鼠标点击事件
    				prevIndex = iNow;
                    toMove(this.index);
    				iNow = this.index;       //索引赋值给iNow 方便后面使用
                    
		        }
    		};

            for (var i = 0; i < aMenuLi.length; i++) {
                aMenuLi[i].index = i;           //添加索引
                aMenuLi[i].onclick = function(){        //鼠标点击事件
                    prevIndex = iNow;
                    toMove(this.index);
                    iNow = this.index;            //索引赋值给iNow 方便后面使用
                }
            };
    		
    	}

        function music () {
            var onOff = true;
            oMusic.onclick = function  () {
                if (onOff){
                    this.style.background = 'url(img/musicon.gif)';
                    oAudio.play();
                }else{
                     this.style.background = 'url(img/musicoff.gif)';
                     oAudio.pause();
                }
                onOff = !onOff;
            }
        }
    	
    	function toMove (index) {                         //点击移动函数
    		for (var i = 0; i < aLiNav.length; i++){
				var oDiv = aLiNav[i].getElementsByTagName('div')[0];
	            oDiv.style.width = '';
	        }
	        
	        oCur.style.left = aLiNav[index].offsetLeft + aLiNav[index].offsetWidth/2 - oCur.offsetWidth/2 +'px';                       //三角指示器实时位置
	        
	        var oDiv = aLiNav[index].getElementsByTagName('div')[0];
            oDiv.style.width = '100%';
            
            oList.style.top = - index * iContentHeight + 'px';

            for (var i = 0; i < aMenuLi.length; i++) {
                        aMenuLi[i].className = '';
                    };
            aMenuLi[index].className = 'active'

            
            InOut[index].In();
            InOut[prevIndex].Out();
            

        }

        function mouseWheel () {                 //滚轮函数
		     var oBtn = true; 
		     var timer = null;                     //timer为延时定时器 防止滚轮连续触发
        	 if(oContent.addEventListener){
				    oContent.addEventListener('DOMMouseScroll',function  (ev) {
				    	ev = ev || window.event;
				    	clearTimeout(timer);
				    	timer = setTimeout(function(){
				    		scrollFn(ev);
				    	},200)
				    },false);
				}//W3C
				oContent.onmousewheel = function (ev) {
					ev = ev || window.event;
					clearTimeout(timer);
                    timer = setTimeout(function(){
                    	scrollFn(ev);
                    },200)
				};//IE/Opera/Chrome
			}

		function scrollFn (ev) {                    //滚轮变化函数
			//ev.detail  火狐  下 3 上 -3
			//ev.wheelDelta  谷歌 下 -120 上 120
			if(ev.detail){
				oBtn = ev.detail > 0 ? true : false;
			}else{
                oBtn = ev.wheelDelta < 0 ? true : false;
			}
            if( (iNow == 0 && !oBtn) || (iNow == aList.length-1 && oBtn) ){return;}
            prevIndex = iNow;
			if(oBtn){
                iNow++;
                if(iNow > aList.length-1){
                	iNow = aList.length-1
                }
                toMove(iNow);
			}else{
				iNow--;
				if(iNow < 0){
					iNow = 0;
				}
				toMove(iNow);
			}
            //阻止默认事件
			if(ev.preventDefault){
				ev.preventDefault();
			}
			else{
				return false;
			}

		}


       function fnResize () {                            //当分辨率发生变化时重新计算对应宽高
        	contentAuto();
        	oList.style.top = - iNow * iContentHeight + 'px';
        }

        function contentAuto() {
        	//内容高度
        	iContentHeight = viewHeight() - oHeader.offsetHeight;
        	//设置content高度,即每个Li的高度
        	oContent.style.height = iContentHeight + 'px';
        	//循环出每个LI的高度
        	for (var i = 0; i < aList.length; i++) {
        		aList[i].style.height = iContentHeight + 'px';
        	};

        }

      function courseContent(){
        	var arr = [
	        	{img:"img/worksimg1.jpg",text:"PHOTOSHOP CC 与前端那些事"},
	        	{img:"img/worksimg2.jpg",text:"Foundation 5 发布!最先进的响应式前端框架"},
	        	{img:"img/worksimg3.jpg",text:"webapp移动前端性能优化规范和设计指导"},
	        	{img:"img/worksimg4.jpg",text:"流行前端开发框架分析"}
        	]

        	for (var i = 0; i < arr.length; i++) {
        		var oDivParent = document.createElement("div");
        		oDivParent.className = "courseImgParent";
        		oDivParent.innerHTML = '<img src="'+(arr[i].img)+'" class="courseImg"><div class="courseImgMask"><span>'+(arr[i].text)+'</span><div></div>';
        		oCourseContent2.appendChild(oDivParent);
        	};
        }
        
        function homeToMove(){
            var aLi1 = oHomecontent1.getElementsByTagName('li');
            var aLi2 = oHomecontent2.getElementsByTagName('li');
            var oldIndex = 0;
            var timer = null;
            var iNow = 0;
            //初始化
            
            for (var i = 0; i < aLi2.length; i++) {
                aLi2[i].index = i;
                aLi2[i].onclick = function (){
                    
                    for (var i = 0; i < aLi2.length; i++) {
                        aLi2[i].className = ''
                    };
                    this.className = 'active';

                    if(oldIndex < this.index){        //向右
                        aLi1[oldIndex].className = 'leftHide'
                        aLi1[this.index].className = 'rightShow'
                    }else if(oldIndex > this.index){       //向左
                        aLi1[oldIndex].className = 'rightHide'
                        aLi1[this.index].className = 'leftShow'
                    }
                    oldIndex = this.index;
                    
                }
            };

            timer = setInterval(autoChange, 3000);
            
            
            function autoChange(){
                iNow++;
                for (var i = 0; i < aLi2.length; i++) {
                        aLi2[i].className = ''
                };
                if(iNow == aLi2.length){
                    iNow =0

                }
                aLi2[iNow].className = 'active';
                aLi1[oldIndex].className = 'leftHide'
                aLi1[iNow].className = 'rightShow'

                oldIndex = iNow;

            }
            
            
        }

        function aboutContent () {
            var oUl = oAboutContent2.getElementsByTagName('ul');
            var aSpan = oAboutContent2.getElementsByTagName('span');

            for (var i = 0; i < oUl.length; i++) {
                change(oUl[i]);
            };

            function change (ul) {
                
                var w = ul.offsetWidth/2;
                var h = ul.offsetHeight/2;
                var src = ul.dataset.src;
                var data = [
                    {name:"top",value: h},
                    {name:"left",value: - w*2},
                    {name:"left",value: w},
                    {name:"top",value: - h*2}
                ]
                var aImg =ul.getElementsByTagName('img');
                

                for (var i = 0; i < 4; i++) {
                    var oLi = document.createElement('li');
                    oLi.style.width = w + 'px';
                    oLi.style.height = h + 'px';
                    var oImg = document.createElement('img');
                    oImg.src = src;
                    oImg.style.left = - (i%2 * w) + 'px';
                    oImg.oldleft = - (i%2 * w);
                    oImg.style.top = - Math.floor(i/2) * h + 'px';
                    oImg.oldtop = - Math.floor(i/2) * h;
                    ul.appendChild(oLi);
                    oLi.appendChild(oImg);
                };

                ul.onmouseover = function(){
                    for (var i = 0; i < aImg.length; i++) {
                        aImg[i].style[ data[i].name ] = data[i].value + 'px';
                    };
                }
                ul.onmouseout = function(){
                    for (var i = 0; i < aImg.length; i++) {
                        aImg[i].style[ data[i].name ] = aImg[i]['old' + data[i].name ] + 'px';
                    };
                }
            }
        }

        function worsImgChange () {
            var arrImg = ['html5.png','css3.png','js.png','ajax.png','jquery.png','nodeJS.png','angularJS.png','github.png','mysql.png',]
            var aFontImg = getElementsByClassName(worksContent,'fontImg');
            for (var i = 0; i < arrImg.length; i++) {
                aFontImg[i].style.background = 'url(img/' + arrImg[i] +') no-repeat'
            };
        }

        var InOut = [
            {
                In : function  () {
                     setStyle(oHomecontent1,'transform','translateY(0)');
                     setStyle(oHomecontent2,'transform','translateY(0)');
                     oHomecontent1.style.opacity = 1;
                     oHomecontent2.style.opacity = 1;
                },
                Out : function  () {
                     setStyle(oHomecontent1,'transform','translateY(-150px)');
                     setStyle(oHomecontent2,'transform','translateY(100px)');
                     oHomecontent1.style.opacity = 0;
                     oHomecontent2.style.opacity = 0;
                }

            },
            {
                In : function  () {
                     var oPlane1 = getElementsByClassName(oWorksContent,'plane1')[0];
                     var oPlane2 = getElementsByClassName(oWorksContent,'plane2')[0];
                     var oPlane3 = getElementsByClassName(oWorksContent,'plane3')[0];

                     setStyle(oPlane1,'transform','translate(0,0)');
                     setStyle(oPlane2,'transform','translate(0,0)');
                     setStyle(oPlane3,'transform','translate(0,0)');
                },
                Out : function  () {
                     var oPlane1 = getElementsByClassName(oWorksContent,'plane1')[0];
                     var oPlane2 = getElementsByClassName(oWorksContent,'plane2')[0];
                     var oPlane3 = getElementsByClassName(oWorksContent,'plane3')[0];

                     setStyle(oPlane1,'transform','translate(-200px,-200px)');
                     setStyle(oPlane2,'transform','translate(-200px,200px)');
                     setStyle(oPlane3,'transform','translate(200px,-200px)');

                }
                

            },
            {
                In : function  () {
                     var oPencel1 = getElementsByClassName(oCourseContent,'pencel1')[0];
                     var oPencel2 = getElementsByClassName(oCourseContent,'pencel2')[0];
                     var oPencel3 = getElementsByClassName(oCourseContent,'pencel3')[0];

                     setStyle(oPencel1,'transform','translateY(0)');
                     setStyle(oPencel2,'transform','translateY(0)');
                     setStyle(oPencel3,'transform','translateY(0)');
                },
                Out : function  () {
                     var oPencel1 = getElementsByClassName(oCourseContent,'pencel1')[0];
                     var oPencel2 = getElementsByClassName(oCourseContent,'pencel2')[0];
                     var oPencel3 = getElementsByClassName(oCourseContent,'pencel3')[0];

                     setStyle(oPencel1,'transform','translateY(-200px)');
                     setStyle(oPencel2,'transform','translateY(200px)');
                     setStyle(oPencel3,'transform','translateY(200px)');

                }

            },
            {
                In : function  () {
                     var oAboutImg = getElementsByClassName(oAboutContent,'aboutImg');

                     setStyle(oAboutImg[0],'transform','rotate(0)');
                     setStyle(oAboutImg[1],'transform','rotate(0)');
                },
                Out : function  () {
                     var oAboutImg = getElementsByClassName(oAboutContent,'aboutImg');

                     setStyle(oAboutImg[0],'transform','rotate(45deg)');
                     setStyle(oAboutImg[1],'transform','rotate(-45deg)');
                  
                }

            },
            {
                In : function  () {
                     var oContactContent1 = getElementsByClassName(oContactContent,'contactContent1')[0];

                     var oContactH = oContactContent1.getElementsByTagName('h1')[0];
                     var oContactP = oContactContent1.getElementsByTagName('p')[0];

                     setStyle(oContactH,'transform','translateX(0)');
                     setStyle(oContactP,'transform','translateX(0)');
                     oContactH.style.opacity = 1;
                     oContactP.style.opacity = 1;
                },
                Out : function  () {
                     var oContactContent1 = getElementsByClassName(oContactContent,'contactContent1')[0];
                     var oContactH = oContactContent1.getElementsByTagName('h1')[0];
                     var oContactP = oContactContent1.getElementsByTagName('p')[0];

                     setStyle(oContactH,'transform','translateX(-200px)');
                     setStyle(oContactP,'transform','translateX(200px)');
                     oContactH.style.opacity = 0;
                     oContactP.style.opacity = 0;
                  
                }

            }
        ]
        

        for (var i = 0; i < InOut.length; i++) {
            InOut[i].Out();
        };
        
        function $(id) {                             //简化getElementById函数
    		return document.getElementById(id);
    	}

    	function viewWidth(){                        //可视区宽
    		return window.innerWidth || document.documentElement.clientWidth;
    	}

    	function viewHeight(){                        //可视区高
    		return window.innerHeight || document.documentElement.clientHeight;
    	}

    	function getElementsByClassName(oParent,aclass) {	 //封装getElementById函数
    		var aEl = oParent.getElementsByTagName('*');
    		var arr = [];

    		for (var i = 0; i < aEl.length; i++) {
    			if (aEl[i].className == aclass){
    				arr.push(aEl[i]);
    			}
    			
    		};
    		return arr;
    	}
        function setStyle(obj,attr,value){
        obj.style[attr] = value;
        obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
        }
    	
    }