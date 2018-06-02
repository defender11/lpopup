/**
 * Popup Plugin
 * -----------------------
 * @User: o.l [Oganesov Levon]
 * @mail: levon.oganesov@mail.ru
 * @Date: 02.06.18
 * @LastUpdate: 02.06.2018
 * @Version: 1.0.0
 * -----------------------
 */
/**
 * Init Method:
 *        init: function ();
 * Example:
 *        $.lPopup();
 * -----------------------
 */
/**
 * Add Method:
 *        add: (text, type);
 *            text - Message text,
 *            type:
 *                - success
 *                - error
 * Example:
 *        $.lNotify('add', 'Успешно сохранили', 'success');
 * -----------------------
 */
/**
 * Position default: topLeft,
 * Position available - [ topLeft, topRight, bottomRight, bottomLeft ]
 *
 * Animation default: fade
 * Animation available: [ fade, slide, fromTop, fromBottom ]
 */
/*
* Style:
* .b-lNotify
* .b-lNotify_message
* .b-lNotify_message_success
* .b-lNotify_message_error
* */

if (window.jQuery) {
    (function($){
        // Private methods
        function _radnomId () {
            return Math.random().toString().substr(2);
        }

        var defaults = {
                isNeedTemplate: false
            },
            options;

        var template = {

        };

        /**
         * Всплывающее окно
         *
         * @LastUpdate: 30.05.2018
         * @type {{init: init, handlerOpen: handlerOpen, handlerClose: handlerClose, handlerSave: handlerSave, show: show, close: close, save: save}}
         */
        var popUp = {
            /**
             * Init popup окна
             *
             * @param param
             */
            init: function (param) {
                var $main = $('.b-popup');

                var $headerBtnClose = $main.find('.b-header__close');
                param.closeBtn ? $headerBtnClose.show() : $headerBtnClose.hide();

                this.handlerOpen(param);
            },

            /**
             * Оброботчик открытия окна
             *
             * @param param
             */
            handlerOpen: function (param) {
                var this_o = this;

                var $main = $('.b-popup');

                // Навесим оброботчик отркытия на кнопки
                var $btnsOpen = $('[data-popup]');
                $btnsOpen.on('click.handlerOpenPopUp', function (e) {
                    this_o.show(e, $main, param);
                });
            },

            /**
             * Обработчик закрытия окна
             *
             * @param openBtn
             * @param $main
             * @param param
             */
            handlerClose: function (openBtn, $main, param) {
                var this_o = this;

                var $btnsCloseOverflow = $main.find('.b-popup-overflow-close');
                var $btnsHeaderClose = $main.find('.b-header__close');
                var $btnsCancel = $main.find('.b-btns__cancel');

                $btnsCloseOverflow.on('click.handlerClosePopUp', function (e) {
                    this_o.close(e, openBtn, $main, param);
                });
                $btnsHeaderClose.on('click.handlerClosePopUp', function (e) {
                    this_o.close(e, openBtn, $main, param);
                });
                $btnsCancel.on('click.handlerClosePopUp', function (e) {
                    this_o.close(e, openBtn, $main, param);
                });
            },

            /**
             * Обработчик сохранения
             *
             * @param openBtn
             * @param $main
             * @param param
             */
            handlerSave: function (openBtn, $main, param) {
                var this_o = this;

                var $btnsSave = $main.find('.b-btns__add');
                $btnsSave.on('click.handlerSavePopUp', function (e) {
                    this_o.save(e, openBtn, $main, param);
                });
            },

            /**
             * Отключение обработчиков закрытия и сохранения
             *
             * @param $main
             */
            handlersOff: function ($main) {
                var $btnsCloseOverflow = $main.find('.b-popup-overflow-close');
                var $btnsHeaderClose = $main.find('.b-header__close');
                var $btnsCancel = $main.find('.b-btns__cancel');

                $btnsCloseOverflow.off('click.handlerClosePopUp');
                $btnsHeaderClose.off('click.handlerClosePopUp');
                $btnsCancel.off('click.handlerClosePopUp');

                var $btnsSave = $main.find('.b-btns__add');
                $btnsSave.off('click.handlerSavePopUp');
            },

            /**
             * Показ окна + callback
             *
             * @param e
             * @param $main
             * @param param
             */
            show: function (e, $main, param) {
                var this_o = this;
                var self = $(e.target);

                // Уберем оброботчик отркытия на кнопки
                var $btnsOpen = $('[data-popup]');
                $btnsOpen.off('click.handlerOpenPopUp');

                this.handlerClose(self, $main, param);

                this.handlerSave(self, $main, param);

                // Показали блок
                $main.fadeIn(300);
                // ------------

                var callBackParam = {
                    this_o: this_o,
                    self: self,
                    main: $main
                };

                param.callbackOpen(callBackParam);
            },

            /**
             * Закрытие окна + callback
             *
             * @param e
             * @param openBtn
             * @param $main
             * @param param
             */
            close: function (e, openBtn, $main, param) {
                var this_o = this;

                this.handlersOff($main);

                // Скрыли блок
                $main.fadeOut(300);
                // ------------

                var callBackParam = {
                    this_o: this_o,
                    openBtn: openBtn,
                    main: $main
                };

                param.callbackClose(callBackParam);

                this.handlerOpen(param);
            },

            /**
             * Сохранение окна + callback
             *
             * @param e
             * @param openBtn
             * @param $main
             * @param param
             */
            save: function (e, openBtn, $main, param) {
                var this_o = this;

                this.handlersOff($main);

                // Скрыли блок
                $main.fadeOut(300);
                // ------------

                var callBackParam = {
                    this_o: this_o,
                    openBtn: openBtn,
                    main: $main
                };

                param.callbackSave(callBackParam);

                this.handlerOpen(param);
            }
        };

        // Public methods
        var methods = {
            init: function (param) {

                // актуальные настройки, будут индивидуальными при каждом запуске
                options = $.extend({}, defaults, param);

                // Добавим основной блок в DOM
                // $('body').append('<div class="b-lNotify b-lNotify_' + options.position + '"></div>');


                popUp.init(options);

            }
        };

        // Взял из примера
        $.fn.lPopup = function(method){
            // немного магии
            if ( methods[method] ) {
                // если запрашиваемый метод существует, мы его вызываем
                // все параметры, кроме имени метода прийдут в метод
                // this так же перекочует в метод
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                // если первым параметром идет объект, либо совсем пусто
                // выполняем метод init
                return methods.init.apply( this, arguments );
            } else {
                console.log( 'Метод "' +  method + '" не найден в плагине jQuery.lNotify' );
                // если ничего не получилось
                $.error( 'Метод "' +  method + '" не найден в плагине jQuery.lNotify' );
            }
        };
    })(jQuery);
} else {
    console.log("--Подключите jQeury");
}