(function() {

    var $body = $('body');
    var blackBody = $('<div class="dark-body"></div>');

    function scrollToTop() {
        verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
        element = $('body');
        offset = element.offset();
        offsetTop = offset.top;
        $('html, body').animate({ scrollTop: offsetTop }, 300, 'linear');
        return false;
    }

    //collapse cho trang Thanh toan
    function collapseGroup($classEl, $classElClicked) {
        $.each($classEl, function() {
            var $this = $(this),
                $header = $this.find($classElClicked),//ten class click
                collapse = 'true';

            $header.on('click', function() {
                if ($this.attr('data-collapse') == collapse) {
                    $this.attr('data-collapse', 'false');
                } else {
                    $this.attr('data-collapse', collapse);
                }
            })
        });
    }


    //social share count
    function socialShare(url) {
        var fbUrl = 'https://graph.facebook.com',//api facebook
            glUrl = 'https://clients6.google.com/rpc', //api google
            fbApp = '1704455663209298|c865d132445ba4ce628e7fae8bcb9a2a';//app ID|app Secret

        var iconFacebook = 'facebook',
            iconGoogle = 'google-plus',
            socialClassFacebook = 'fb-share',
            socialClassGoogle = 'gl-share',
            socialResult = $('.social-share-network'),
            fbHtml,
            glHtml
        
        // Field Data (require)
        var googleData = {
            'method': 'pos.plusones.get',
            'id': url,
            'params': {
                'nolog': true,
                'id': url,
                'source': 'widget',
                'userId': '@viewer',
                'groupId': '@self'
            },
            'jsonrpc': '2.0',
            'key': 'p',
            'apiVersion': 'v1'
        };

        var facebookData = {
            access_token: fbApp,
            id: url
        };

        //on Click
        function socialShareClick(element,url,social) {
            var urlFacebookShare = 'https://www.facebook.com/share.php?u=';
            var urlGoogleShare = 'https://plus.google.com/share?url=';
            
            if (social == 'facebook') {
                element.click(function() {
                    
                    //Open Popup new window
                    window.open(urlFacebookShare+url, 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width()/2 - 275) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

                    //alert('OK! Clicked');
                });
            } else {
                element.click(function() {
                    
                    //Open Popup new window
                    window.open(urlGoogleShare+url, 'glShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width()/2 - 275) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

                    //alert('OK! Clicked');
                });
            }

            
        };
        
        //Google
        $.ajax({
            type: 'POST',
            url: 'https://clients6.google.com/rpc',
            //processData: true,
            contentType: 'application/json',
            data: JSON.stringify(googleData),
            success: function(response) {
                var count = response.result.metadata.globalCounts.count;
                
                glHtml = '<div class="'+socialClassGoogle+'"><i class="fa fa-'+iconGoogle+'"></i><span>'+count+'</span></div>';
                socialResult.append(glHtml);
                
                var element = $('.'+socialClassGoogle);
                
                socialShareClick(element, url, 'google');
                
            },
            error: function(status) {
                console.log('Lỗi: '+status);
            }
        });

        //Facebook
        $.ajax({
            type: 'GET',
            url: fbUrl+'?id='+url,
            dataType: 'jsonp',
            data: facebookData,
            success: function(res) {
                var count = res.share.share_count;

                fbHtml = '<div class="'+socialClassFacebook+'"><i class="fa fa-'+iconFacebook+'"></i><span>'+count+'</span></div>';
                socialResult.prepend(fbHtml);

                var element = $('.'+socialClassFacebook);

                socialShareClick(element, url, 'facebook');
            },
            error: function(status) {
                console.log('Lỗi: '+status);
            }
        });
        
        
    };

    //scroll totop
    $(document).on('scroll', function () {

        if ($(window).scrollTop() > 300) {
            $('.totop').addClass('active');
        } else {
            $('.totop').removeClass('active');
        }
    });

    $('.totop').on('click', scrollToTop);

    $('*[data-toggle]').each(function() {
        var $this = $(this),
            active = 'active';
            

        $this.on('click', function(e) {
            e.preventDefault();
            var target = $this.attr('data-target'),
                toggle = 'data-toggle',
                toggleOpen = 'true',
                toggleClose = 'false';

            if (target == null || target == '') {
                console.log('Error: Toggle On Click');

            } else if ($this.attr(toggle) == toggleOpen){
                $(target).hide();
                $(target).removeClass(active);
                $body.removeClass(active);
                blackBody.remove();
                $this.attr(toggle, toggleClose);

            } else {
                $(target).show();
                $body.addClass(active);
                $body.append(blackBody);
                $this.attr(toggle, toggleOpen);

                setTimeout(function(){
                    $(target).addClass(active);
                }, 100);
            }

            blackBody.click(function() {
                $this.attr(toggle, toggleClose);
                $(target).hide();
                $(target).removeClass(active);
                $body.removeClass(active);
                
                $(this).remove();
            });
        });
    });

    // neu trang ton tai social-share-network
    if ($('.social-share-network').length !== 0) {
        //Khi CODE thay the thanh window.location.href
        var $url = $('link[rel="canonical"]').attr('href'); 
        //initialize social share count
        socialShare($url);
    }

    // neu trang ton tai collapse group
    if ($('.collapse-group').length !==0) {
        collapseGroup($('.collapse-group'), $('.collapse-header'));
    }

    // neu trang ton tai social-share
    if ($('.social-share').length !== 0) {
        var social = $('.social-share');

        social.find('a').on('click', function(e) {
            e.preventDefault();

            var url = $(this).attr('href');
            window.open(url, 'facebook Share Window', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width()/2 - 275) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        });

            
        // neu trang ton tai social thi load funtion
        if (social.length !== 0) {

            social.each( function(index) {
                var $this = $(this),
                    // lay gia tri link cua moi item
                    $url = $this.parents('.blog-item').find('.btn-view-more').attr('href');
                
                var fbUrl = 'https://graph.facebook.com/v2.7/',//api facebook
                    glUrl = 'https://clients6.google.com/rpc', //api google
                    fbApp = '1704455663209298|c865d132445ba4ce628e7fae8bcb9a2a';//app ID|app Secret


                var classFacebook = 'fb-share',
                    classGoogle = 'gl-share',
                    fbHtml = $this.find($('.'+classFacebook)),
                    glHtml = $this.find($('.'+classGoogle)),
                    fbCount,
                    glCount;
                
                // Field Data (require)
                var googleData = {
                    'method': 'pos.plusones.get',
                    'id': $url,
                    'params': {
                        'nolog': true,
                        'id': $url,
                        'source': 'widget',
                        'userId': '@viewer',
                        'groupId': '@self'
                    },
                    'jsonrpc': '2.0',
                    'key': 'p',
                    'apiVersion': 'v1'
                };

                var facebookData = {
                    access_token: fbApp,
                    id: $url
                };

                //Facebook
                $.ajax({
                    type: 'GET',
                    url: fbUrl+'?id='+$url,
                    dataType: 'jsonp',
                    data: facebookData,
                    success: function(response) {
                        var count = response.share.share_count;

                        fbCount = '<span>'+count+'</span>';
                        fbHtml.append(fbCount);

                    },
                    error: function(status) {
                        console.log('Lỗi: '+status);
                    }
                });

                //Google
                $.ajax({
                    type: 'POST',
                    url: 'https://clients6.google.com/rpc',
                    //processData: true,
                    contentType: 'application/json',
                    data: JSON.stringify(googleData),
                    success: function(response) {
                        var count = response.result.metadata.globalCounts.count;
                        
                        glCount = '<span>'+count+'</span>';
                        glHtml.append(glCount);
                        
                    },
                    error: function(status) {
                        console.log('Lỗi: '+status);
                    }
                });
                
            })
            }
        }

    
}());    