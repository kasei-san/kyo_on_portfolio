$(function(){

  var dom = $("#gallery");
  var img_tmps = [
    "img/gallery/1.png",
    "img/gallery/2.png",
    "img/gallery/3.png",
    "img/gallery/4.png",
    "img/gallery/5.png",
    "img/gallery/6.png",
    "img/gallery/6-2.png",
    "img/gallery/7.png",
    "img/gallery/8.png",
    "img/gallery/9.png",
    "img/gallery/10.png",
    "img/gallery/11.png",
    "img/gallery/12.png"
  ];

  var imgs=[];
  for(var i=0,l=img_tmps.length; i<l; i++){
    var img = new Image();
    img.src = img_tmps[i];
    imgs[i] = img;
  }

  // onLoadだと、304の時に着火しないので、completeを0.1秒毎に見る
  var id = setInterval(function(){
    var flg = true;
    for(var i=0,l=imgs.length; i<l; i++){ if(!imgs[i].complete){ flg = false } }
    console.log(flg);
    if(flg){
      clearInterval(id);
      for(var i=0,l=imgs.length; i<l; i++){ dom.append(imgs[i]) }
      init();
    }
  }, 300);

  var init = function(){
    var description_dom = $("#description");
    var imgs = dom.find("img").hide();
    var description_imgs = description_dom.find("img").hide();
    var cnt=0;
    var current = $(imgs[0]);
    var description_current = $(description_imgs[0]);

    var setNext = function(){
      current.fadeOut("slow");
      description_current.fadeOut("slow");
      cnt++; if(cnt >= imgs.length){cnt = 0}
      next = $(imgs[cnt]);
      description_next = $(description_imgs[cnt]);
      next.fadeIn("slow");
      description_next.fadeIn("slow");
      description_current = description_next;
      current = next;
    };
    var setPrev = function(){
      current.fadeOut("slow");
      description_current.fadeOut("slow");
      cnt--; if(cnt < 0){cnt = (imgs.length - 1)}
      next = $(imgs[cnt]);
      description_next = $(description_imgs[cnt]);
      next.fadeIn("slow");
      description_next.fadeIn("slow");
      description_current = description_next;
      current = next;
    };

    jQuery.each(description_imgs, function(){
      $(this).center();
    });
    jQuery.each(imgs, function(){
      var img=$(this)
      var ratio;
      if(img.height() > img.width()){
        ratio = (dom.height()-30)/img.height();
        if(ratio < 1 ){ img.height(img.height() * ratio); }
      }else{
        ratio = (dom.width()-30)/img.width();
        if(ratio < 1 ){ img.width(img.width() * ratio); }
      }
      img.center().click(setNext);
    });
    $("#next").click(setNext).find("a").center();
    $("#prev").click(setPrev).find("a").center();

    $("#loader").hide();
    $("#gallery_area").css("visibility", "visible");
    current.show();
    description_current.show();
  }
});
