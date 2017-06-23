// Get nhieu item cung luc tu trang Blog
// dua tren link cua moi Item Blog

(function() {


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

}());