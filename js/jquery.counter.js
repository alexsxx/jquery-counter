(function ($) {

    $.fn.counter = function (m, opts) {

        var options = $.extend({
            start: 0
        }, opts || m);

        var methods = {
            init: function () {
                this.each(function () {
                    $(this).addClass('countdownHolder');

                    $('<span class="count">').html(
                        '<span class="position" data-digit="' +
                        options.start +
                        '">\
					<span class="digit static">' +
                        options.start +
                        '</span>\
				</span>'
                    ).appendTo($(this));
                });
            },
            set: function (number) {
                var position = this.find('.position');
                var digit = position.find('.digit')

                // We are already showing this number
                if (position.data('digit') == number)
                    return false;

                position.data('digit', number);

                var replacement = $('<span>', {
                    'class': 'digit',
                    css: {
                        top: 0,
                        opacity: 1
                    },
                    html: number
                });

                digit.before(replacement);

                digit.remove();
            },
            increment: function (number, callback) {

                var position = this.find('.position');
                var digit = position.find('.digit')

                // We are already showing this number
                if (position.data('digit') == number)
                    return false;

                position.data('digit', number);

                var replacement = $('<span>', {
                    'class': 'digit',
                    css: {
                        top: '-2.1em',
                        opacity: 0
                    },
                    html: number
                });

                digit.animate({
                    top: '1.2em',
                    opacity: 0
                }, 100)
                    .delay(300);

                digit
                    .before(replacement)
                    .removeClass('static')
                    .animate({ top: '2.5em', opacity: 0 }, 'fast', function () {
                        digit.remove();
                    })

                replacement
                    .delay(100)
                    .animate({ top: 0, opacity: 1 }, 'fast', function () {
                        replacement.addClass('static');
                    });

                if (callback != undefined)
                    callback();
            }
        }

        if (methods[m])
            return methods[m].apply(this, Array.prototype.slice.call(arguments, 1));
        else if (typeof m === "object" || !m)
            return methods.init.apply(this, arguments);

        return this;
    };

})(jQuery);
