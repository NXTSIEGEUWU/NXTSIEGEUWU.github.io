(function($){

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  // Share
  var shareBoxTemplate =
    '<div class="article-share-box">' +
      '<input class="article-share-input" type="text" value="{url}" readonly>' +
      '<div class="article-share-links">' +
        '<a href="https://twitter.com/intent/tweet?url={url}&text={title}" class="article-share-twitter" target="_blank" title="Twitter"></a>' +
        '<a href="https://www.facebook.com/sharer/sharer.php?u={url}" class="article-share-facebook" target="_blank" title="Facebook"></a>' +
        '<a href="http://service.weibo.com/share/share.php?url={url}&title={title}" class="article-share-pinterest" target="_blank" title="微博"></a>' +
        '<a href="javascript:void(0)" class="article-share-linkedin copy-link" title="复制链接"></a>' +
      '</div>' +
    '</div>';

  $('.article-share-link').on('click', function(e){
    e.stopPropagation();

    var $link = $(this);
    var $box = $link.next('.article-share-box');

    // Close all other share boxes first
    $('.article-share-box').not($box).removeClass('on');
    $('.article-share-link').not($link).removeClass('on');

    if ($box.length) {
      $box.toggleClass('on');
    } else {
      var url = $link.data('url');
      var title = $link.data('title') || '';
      var html = shareBoxTemplate.replace(/\{url\}/g, encodeURIComponent(url)).replace(/\{title\}/g, encodeURIComponent(title));
      var $newBox = $(html).insertAfter($link);
      $newBox.addClass('on');
      // Select input content on show
      $newBox.find('.article-share-input').focus().select();
    }
  });

  $(document).on('click', '.copy-link', function(){
    var $input = $(this).closest('.article-share-box').find('.article-share-input');
    $input.focus().select();
    if (document.execCommand('copy')) {
      var $btn = $(this);
      $btn.css('color', '#4caf50');
      setTimeout(function(){ $btn.css('color', ''); }, 1500);
    }
  });

  $(document).on('click', '.article-share-input', function(){
    $(this).select();
  });

  // Close share box when clicking outside
  $(document).on('click', function(e){
    if (!$(e.target).closest('.article-share-box, .article-share-link').length) {
      $('.article-share-box').removeClass('on');
    }
  });
})(jQuery);