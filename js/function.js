$(function() {
  // 활성화 함수
  const onFn = function(dom, idx){
    dom.eq(idx).parent().addClass("on").siblings().removeClass("on");
  };

  // 글로벌 네비게이션
  const $gnb = $("header > nav > .gnb > li > a");

  const contTop = [0];
  for(let i = 0; i < 3; i++){
    contTop[(i + 1)] = $("section > article").eq(i).offset().top - 50;
  };

  let nowIdx = 0;

  $("a").on("click", function(evt){
    evt.preventDefault();
  });

  // 글로벌 네비게이션 클릭 이벤트
  $gnb.on("click", function(){
    nowIdx = $gnb.index(this);

    onFn($gnb, nowIdx);

    $("html, body").stop().animate({scrollTop : (contTop[nowIdx] - 30)});
  });

  // 화면이동에 따른 이벤트(글로벌 네비게이션 활성화)
  $(window).on("scroll", function(){
    const scrollTop = $(window).scrollTop();

    for(let i = 0; i < 4; i++){
    if(scrollTop >= (contTop[i] - 300)){
      onFn($gnb, i);
      }
    }
  });

  // 배너 이벤트
  const $bannerSlide = $("header > .banner_container > .banner");
  const $bannerPrev = $("header > .banner_container > .prev");
  const $bannerNext = $("header > .banner_container > .next");
  const $pause = $("header > .banner_container > .play");

  const width = $bannerSlide.children("li").width();
  let pauseKey;

  const bannerMoveFn = function(){
    pauseKey = setInterval(function(){
      const $bannerSlide = $("header > .banner_container > .banner");
      const $bannerImg = $("header > .banner_container > .banner>li");
    
      $bannerSlide.stop().animate({ left : -width }, function(){
        $bannerImg.eq(0).appendTo($bannerSlide);
        $bannerSlide.css({left:0});
      });
    }, 2000);
  }
  
  // 배너 슬라이드 자동 재생
  bannerMoveFn();
  
  // // 배너 이전 버튼 이벤트
  // $bannerPrev.on("click", function(){
  //   if(bannerIdx > 0){
  //     bannerIdx--;
  //   }else{
  //     bannerIdx = 3;
  //   }
    
  //   $bannerSlide.stop().animate({ left : width }, function(){
  //     $bannerSlide.children("li").eq(3).prependTo($bannerSlide);
  //     $bannerSlide.css({left:-width});
  //   });
  // });

  // 배너 다음 버튼 이벤트
  $bannerNext.on("click", function(){
    $bannerSlide.stop().animate({ left : -width }, function(){
      $bannerSlide.children("li").eq(0).appendTo($bannerSlide);
      $bannerSlide.css({left:0});
    });

    if ($pause.hasClass("pause")) {
			clearInterval(pauseKey);

			$pause.removeClass("pause");
		}
  });

  // 배너 일시정지 버튼 이벤트
  $pause.on("click", function() {
		if ($(this).hasClass("pause")) {
			clearInterval(pauseKey);

			$(this).removeClass("pause");
		} else {
			bannerMoveFn();

			$(this).addClass("pause");
		}
	});

  // 축체 컨텐츠
  const $festivalThum = $("section > .festival > .festival-box > .festival_thmbs-frame > .festival_thmbs > li > a");
  const $festivalView = $("section > .festival > .festival-box > .festival_view-container > .festival_view");
  const $festivalSide = $("section	> .festival	> .festival-box	> .festival_view-container	> .festival_view	> .f-frame	> .f-img");
  const $btnIndicator = $("section	> .festival	> .festival-box	> .festival_view-container	> .festival_view	> .f-frame	> .indicator");
  const $btnpagination = $("section	> .festival	> .festival-box	> .festival_view-container	> .festival_view	> .f-frame	> .pagination	> li	> a");
  const $btnPrev = $("section > .festival > .festival-box > .festival_view-container > .festival_view > .prev");
  const $btnNext = $("section > .festival > .festival-box > .festival_view-container > .festival_view > .next");

  let fThumIdx = 0;
  let fIdx = 0;

  const slideFn = function(nowIdx){
    $festivalSide.stop().animate({left:(-820 * (nowIdx % 5))});
    $btnpagination.eq(nowIdx).parent().addClass("on").siblings().removeClass("on");
    $btnIndicator.eq(nowIdx).addClass("on").siblings().removeClass("on");
  };

  // 축제 썸네일 클릭 이벤트
  $festivalThum.on("click", function(){
    fThumIdx = $festivalThum.index(this);

    onFn($festivalThum, fThumIdx);

    $festivalView.eq(fThumIdx).stop().show().siblings().stop().hide();

    $festivalSide.css({left:0});

    if(fThumIdx === 0){
      fIdx = 0;
      slideFn(fIdx);
    }else if(fThumIdx === 1){
      fIdx = 5;
      slideFn(fIdx);
    }else if(fThumIdx === 2){
      fIdx = 10;
      slideFn(fIdx);
    }
  });

  // 축제 인디게이터 클릭 이벤트
  $btnIndicator.on("click", function(){
    fIdx = $btnIndicator.index(this);

    slideFn(fIdx);
  });

  $btnpagination.on("click", function(){
    fIdx = $btnpagination.index(this);

    slideFn(fIdx);
  });

  // 축제 이전버튼 클릭 이벤트
  $btnPrev.on("click", function(){
    if((fIdx % 5) > 0){
      fIdx--;
    }else{
      fIdx += 4
    }

    slideFn(fIdx);
  });

  // 축제 다음버튼 클릭 이벤트
  $btnNext.on("click", function(){
    if((fIdx % 5) < 4){
      fIdx++;
    }else{
      fIdx -= 4;
    }

    slideFn(fIdx);
  });

  // 관광지 컨텐츠
  const $touristNav = $("section > .tourist > .tourist-box > .tourist_nav-frame > .tourist_nav > li > a");
  const $touristView = $("section > .tourist > .tourist-box > .tourist_view-container > .tourist_view");
  const $touristSlide = $("section	> .tourist	> .tourist-box	> .tourist_view-container	> .tourist_view	> .t-frame-container	> .t-frame	> .t-img");
  const $touristPrev = $("section	> .tourist	> .tourist-box	> .tourist_view-container	> .tourist_view	> .t-frame-container	> .prev");
  const $touristNext = $("section	> .tourist	> .tourist-box	> .tourist_view-container	> .tourist_view	> .t-frame-container	> .next");

  let tNavIdx = 0;
  let tIdx = 0;

  // 관광지 네비게이션 클릭 이벤트
  $touristNav.on("click", function(){
    tNavIdx = $touristNav.index(this);
    tIdx = 0;

    $touristView.eq(tNavIdx).stop().show().addClass("view").siblings().stop().hide().removeClass('view');
    $touristSlide.css({left:0});

    onFn($touristNav, tNavIdx);
  });

  // 관광지 메인이미지 이전버튼 클릭 이벤트
  $touristPrev.on("click", function(){
    if(tIdx > 0){
      tIdx--;
    }else{
      tIdx = 4;
    }

    if($touristView.hasClass("view")){
      $touristSlide.stop().animate({left:(-800 * tIdx)});
    }else{
      $touristSlide.stop().animate({left:0});
    }
  });

  // 관광지 메인이미지 다음버튼 클릭 이벤트
  $touristNext.on("click", function(){
    if(tIdx < 4){
      tIdx++;
    }else{
      tIdx = 0;
    }

    if($touristView.hasClass("view")){
      $touristSlide.stop().animate({left:(-800 * tIdx)});
    }else{
      $touristSlide.stop().animate({left:0});
    }
  });

  // 브라우저 로딩 이벤트
  $(window).on("load", function(){
    $("html, body").animate({scrollTop:0}, 200);
  });
});
