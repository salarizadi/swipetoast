/**
 *  Copyright (c) 2025
 *  @Version : 1.0.0
 *  @Author  : https://salarizadi.ir
 *  @Repository : https://github.com/salarizadi/swipetoast
 *  @Description:
 *  jQuery SwipeToast is a modern toast notification plugin for jQuery. It supports swipe-to-dismiss
 *  functionality, various positions, progress bars, RTL support, custom styling, and more. Ideal for
 *  enhancing user experience with minimalistic and responsive toast notifications.
 *  @License : MIT
 * */

(function ($) {
    'use strict';

    const PLUGIN_NAME = 'swipeToast';
    const VERSION = '1.0.0';

    const Defaults = {
        message: '',
        type: 'default',
        duration: 4000,
        swipeable: true,
        position: 'bottom-center',
        rtl: false,
        closeButton: false,
        progressBar: false,
        onOpen: null,
        onClose: null,
        className: '',
        offset: 24,
        swipeThreshold: 0.5
    };

    const POSITIONS = [
        'top-left', 'top-center', 'top-right',
        'center-left', 'center', 'center-right',
        'bottom-left', 'bottom-center', 'bottom-right'
    ];

    let containers = {};

    class SwipeToast {

        constructor (options) {
            this.settings = $.extend({}, Defaults, options);
            this.validateSettings();
            this.init();
        }

        validateSettings () {
            if (!POSITIONS.includes(this.settings.position)) {
                console.warn(`Invalid position: ${this.settings.position}. Defaulting to 'bottom-center'`);
                this.settings.position = 'bottom-center';
            }
        }

        init () {
            this.initContainer();
            this.createToast();
            this.show();
            this.handleWindowResize();
        }

        calculateContainerPosition (position) {
            const offset = this.settings.offset;
            const style = {
                position: 'fixed',
                zIndex: 9999,
                pointerEvents: 'none',
                boxSizing: 'border-box',
                width: position === 'center' ? 'auto' : '100%',
                maxWidth: '360px',
                padding: position.includes('center') ? '0 16px' : '0'
            };

            // Handle center position separately
            if (position === 'center') {
                return {
                    ...style,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                };
            }

            const [vertical, horizontal] = position.split('-');

            // Vertical positioning
            switch (vertical) {
                case 'top':
                    style.top = `${offset}px`;
                    break;
                case 'center':
                    style.top = '50%';
                    style.transform = 'translateY(-50%)';
                    break;
                case 'bottom':
                    style.bottom = `${offset}px`;
                    break;
            }

            // Horizontal positioning
            if (horizontal) {
                switch (horizontal) {
                    case 'left':
                        style.left = `${offset}px`;
                        break;
                    case 'center':
                        style.left = '50%';
                        style.transform = vertical === 'center' ?
                            'translate(-50%, -50%)' : 'translateX(-50%)';
                        break;
                    case 'right':
                        style.right = `${offset}px`;
                        break;
                }
            }

            return style;
        }

        initContainer () {
            const position = this.settings.position;

            if (!containers[position]) {
                const $newContainer = $('<div></div>')
                    .addClass('swipetoast-container')
                    .addClass(`swipetoast-${position}`);

                const style = this.calculateContainerPosition(position);
                $newContainer.css(style);

                containers[position] = $newContainer;
                $('body').append($newContainer);
            }

            this.$container = containers[position];
        }

        createToast () {
            this.$toast = $('<div class="swipetoast"></div>')
                .addClass(this.settings.type)
                .addClass(this.settings.className)
                .toggleClass('rtl', this.settings.rtl);

            this.$message = $('<div class="swipetoast-message"></div>')
                .text(this.settings.message)
                .appendTo(this.$toast);

            if (this.settings.closeButton) {
                this.$closeBtn = $('<button class="swipetoast-close">&times;</button>')
                    .appendTo(this.$toast);
            }

            if (this.settings.progressBar) {
                this.$progress = $('<div class="swipetoast-progress"></div>')
                    .appendTo(this.$toast);
            }

            this.bindEvents();
        }

        bindEvents () {
            if (this.settings.swipeable) {
                this.initSwipeHandler();
            }

            if (this.settings.closeButton) {
                this.$closeBtn.on('click', (e) => {
                    e.stopPropagation();
                    this.hide();
                });
            }

            this.$toast.on('click', (e) => {
                if (!$(e.target).hasClass('swipetoast-close')) {
                    this.hide();
                }
            });
        }

        initSwipeHandler () {
            let startX, startY, currentX, currentY;
            let isDragging = false;
            let direction = '';
            let toastWidth;

            const handleStart = (e) => {
                const event = e.type === 'touchstart' ? e.originalEvent.touches[0] : e;
                startX = event.pageX;
                startY = event.pageY;
                currentX = startX;
                currentY = startY;
                isDragging = true;
                direction = '';
                toastWidth = this.$toast.outerWidth();
                this.$toast.addClass('swiping').css('transition', 'none');
            };

            const handleMove = (e) => {
                if (!isDragging) return;

                const event = e.type === 'touchmove' ? e.originalEvent.touches[0] : e;
                currentX = event.pageX;
                currentY = event.pageY;

                const diffX = currentX - startX;
                const diffY = currentY - startY;

                if (!direction) {
                    direction = Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical';
                }

                if (direction === 'horizontal') {
                    e.preventDefault();
                    const opacity = 1 - (Math.abs(diffX) / toastWidth * 0.5);
                    this.$toast.css({
                        transform: `translateX(${diffX}px)`,
                        opacity: opacity
                    });
                }
            };

            const handleEnd = () => {
                if (!isDragging) return;

                isDragging = false;
                this.$toast
                    .removeClass('swiping')
                    .css('transition', '');

                const diff = currentX - startX;
                const threshold = toastWidth * this.settings.swipeThreshold;

                if (Math.abs(diff) > threshold) {
                    const endX = diff > 0 ? toastWidth : -toastWidth;
                    this.$toast.css('transform', `translateX(${endX}px)`);
                    setTimeout(() => this.hide(), 150);
                } else {
                    this.$toast.css({
                        transform: '',
                        opacity: ''
                    });
                }
            };

            this.$toast
                .on('touchstart mousedown', handleStart)
                .on('touchmove mousemove', handleMove)
                .on('touchend touchcancel mouseup mouseleave', handleEnd);
        }

        handleWindowResize () {
            if (!this.$toast) return;

            const updatePosition = () => {
                const style = this.calculateContainerPosition(this.settings.position);
                this.$container.css(style);
            };

            updatePosition();

            let resizeTimeout;
            $(window).off('resize.swipetoast').on('resize.swipetoast', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(updatePosition, 100);
            });
        }

        show () {
            this.$toast.appendTo(this.$container);

            // Force reflow
            this.$toast[0].offsetHeight;

            if (this.settings.progressBar && this.settings.duration) {
                this.$progress.css('animation-duration', `${this.settings.duration}ms`);
            }

            if (typeof this.settings.onOpen === 'function') {
                this.settings.onOpen.call(this.$toast);
            }

            if (this.settings.duration) {
                this.timeout = setTimeout(() => this.hide(), this.settings.duration);
            }

            return this;
        }

        hide () {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            if (this.$toast) {
                this.$toast.remove();
                if (typeof this.settings.onClose === 'function') {
                    this.settings.onClose.call(this.$toast);
                }
            }

            return this;
        }
    }

    $.swipeToast = function (options) {
        return new SwipeToast(options);
    };

    $.swipeToast.version = VERSION;

})(jQuery);
