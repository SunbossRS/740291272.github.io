"use strict";

(function($) {
  if ($('body').hasClass('blog')) {
    blog_anchor_redirect();
    detect_pi_browser();
  }

  if ($('body').hasClass('single-post')) {
    $('a.open-comments-top').click(toggle_comments_top);
    $('a.open-comments-bottom').click(toggle_comments_bottom);
  }

  $('#nav li.search').click(open_searchbar);
  $('#nav li.menu').click(open_mobile_menu);
  $('#nav li.close-menu').click(close_mobile_menu);
  $('.page-archive h2 a').click(open_archive_year);

  function blog_anchor_redirect() {
    var hash = window.location.hash;
    if (hash.length > 0) {
      var protocol = window.location.protocol + '//';
      var domain = window.location.host + '/';
      var slug = hash.replace('#', '');
      var permalink = protocol + domain + slug;
      if ($(hash).length == 0) {
        window.location.replace(permalink);
      }
    }
  }

  function detect_pi_browser() {
    var agent = navigator.userAgent.toLowerCase();

    var pi_browsers = [
      'epiphany',
      'midori',
      'dillo',
    ];

    for (var i=0; i<=pi_browsers.length; i++) {
      var browser = pi_browsers[i];

      if (agent.indexOf(browser) > -1) {
        $('body').addClass('rpi');
      }
    }
  }

  function open_searchbar() {
    $('#header form.search').toggleClass('open');
    $('#header form.search input.search').focus();
    return false;
  }

  function open_mobile_menu() {
    $('#nav ul').addClass('open');
    $('#header form.search').removeClass('open');
    return false;
  }

  function close_mobile_menu() {
    $('#nav ul').removeClass('open');
    return false;
  }

  function open_archive_year() {
    var year = $(this).attr('id').split('-')[1];
    $('#year-' + year).toggleClass('open');
    $(this).toggleClass('open');
    return false;
  }

  function toggle_comments_top() {
    toggle_comments();
    return true;
  }

  function toggle_comments_bottom() {
    toggle_comments();
    return false;
  }

  function toggle_comments() {
    $('.comments h2.comments-title').toggleClass('open');
    $('ol.commentlist').toggleClass('open');
    $('.comment-respond').toggleClass('open');
  }

})(jQuery);
