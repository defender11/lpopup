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
                main: {
                    target: '.show',
                    targetContent: '.content',
                    type: "inline", // ['inline', 'iframe']
                    interface: {
                        headerCloseBtn: true,
                    }
                },
                callBacks: {
                    // При открытии окна
                    open: function(param) {
                        /**
                         * Возврощяемые значения в param
                         *
                         * @param: this_o, self, main
                         * */

                        console.log('--callbackOpen');
                    },
                    // При закрытии окна
                    close: function(param) {
                        /**
                         * Возврощяемые значения в param
                         *
                         * @param: this_o, openBtn, main
                         * */

                        console.log('--callbackClose');
                    },
                    // При сохранении или добавлении
                    save: function(param) {
                        /**
                         * Возврощяемые значения в param
                         *
                         * @param: this_o, openBtn, main
                         * */

                        console.log('--callbackClose');
                    }
                }
            },
            options;

        // Public methods
        var methods = {
            init: function (param) {

                var $body = $('body');

                // Для обработчиков создадим уникальные значение для имен
                param.main.uniqueName = _radnomId();
                
                // актуальные настройки, будут индивидуальными при каждом запуске
                options = $.extend({}, defaults, param);

                var popupTemplate = template.get(options.main);

                // Добавим основной блок в DOM
                $body.append(popupTemplate);

                popUp.init(options);
            }
        };

        var template = {
            get: function (main) {
                var $body = $('body');

                var tragetName = main.target.substring(1);
                var targetContent = $body.find(main.targetContent);

                var header = "";

                var body = "<div class=\"b-lpopup__lbody\">\n" +
                                targetContent.html() +
                            "</div>\n";

                var footer = "";

                var tmpl = "";

                if (main.type !== "iframe") {
                    header = "<div class=\"b-lpopup__lheader\">\n" +
                                    "<div class=\"b-lheader__ltitle\">\n" +
                                        "<div class=\"b-ltitle__text\">Заголовок</div>\n" +
                                        "<div class=\"b-ltitle__sub-text\">Под заголовок</div>\n" +
                                    "</div>\n" +
                                    (main.interface.headerCloseBtn ? "<div class=\"b-lheader__close\">X</div>\n" : "") +
                                "</div>\n";

                    footer = "<div class=\"b-lpopup__lfooter\">\n" +
                                    "<a href=\"javascript:void(0);\" class='b-lpopup__btn_cancel'>Отмена</a>\n" +
                                    "<a href=\"javascript:void(0);\" class='b-lpopup__btn_make'>Отправить</a>\n" +
                                "</div>\n";
                }

                tmpl = "<!-- POPUP -->\n" +
                        "<div class=\"b-lpopup b-lpopup__user__" + tragetName + " \">\n" +
                            "<div class=\"b-lpopup-overflow-close\"></div>\n" +
                            "<div class=\"b-lpopup__content\">\n" +
                                header +
                                body +
                                footer +
                            "</div>\n" +
                        "</div>";

                targetContent.remove();
                
                return tmpl;
            }
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
                // var $main = $('.b-lpopup');

                // var $headerBtnClose = $main.find('.b-header__close');
                // param.closeBtn ? $headerBtnClose.show() : $headerBtnClose.hide();

                this.handlerOpen(param);
            },

            /**
             * Оброботчик открытия окна
             *
             * @param param
             */
            handlerOpen: function (param) {
                var this_o = this;

                var userPopupBlockClass = param.main.target.substring(1);

                var $main = $('.b-lpopup.b-lpopup__user__' + userPopupBlockClass);

                // Навесим оброботчик отркытия на кнопки
                var $btnsOpen = $(param.main.target);

                $btnsOpen.off('click.handlerOpenLPopUp' + param.main.uniqueName);

                $btnsOpen.on('click.handlerOpenLPopUp' + param.main.uniqueName, function (e) {
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

                var $btnsCloseOverflow = $main.find('.b-lpopup-overflow-close');
                var $btnsHeaderClose = $main.find('.b-lheader__close');
                var $btnsCancel = $main.find('.b-lpopup__btn_cancel');

                $btnsCloseOverflow.on('click.handlerCloseLPopUp' + param.main.uniqueName, function (e) {
                    this_o.close(e, openBtn, $main, param);
                });
                $btnsHeaderClose.on('click.handlerCloseLPopUp' + param.main.uniqueName, function (e) {
                    this_o.close(e, openBtn, $main, param);
                });
                $btnsCancel.on('click.handlerCloseLPopUp' + param.main.uniqueName, function (e) {
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

                var $btnsSave = $main.find('.b-lbtns__add');
                $btnsSave.on('click.handlerSavePopUp', function (e) {
                    this_o.save(e, openBtn, $main, param);
                });
            },

            /**
             * Отключение обработчиков закрытия и сохранения
             *
             * @param $main
             */
            handlersOff: function ($main, uniqueName) {
                var $btnsCloseOverflow = $main.find('.b-lpopup-overflow-close');
                var $btnsHeaderClose = $main.find('.b-lheader__close');
                var $btnsCancel = $main.find('.b-lpopup__btn_cancel');

                $btnsCloseOverflow.off('click.handlerCloseLPopUp' + uniqueName);
                $btnsHeaderClose.off('click.handlerCloseLPopUp' + uniqueName);
                $btnsCancel.off('click.handlerCloseLPopUp' + uniqueName);

                var $btnsSave = $main.find('.b-lpopup__btn_make');
                $btnsSave.off('click.handlerSaveLPopUp' + uniqueName);
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
                var $btnsOpen = $(param.main.target);
                $btnsOpen.off('click.handlerOpenLPopUp' + param.main.uniqueName);

                // Навесим оброботчик закрытие
                this.handlerClose(self, $main, param);

                // Навесим оброботчик сохранение или добавления
                this.handlerSave(self, $main, param);

                // Показали блок
                $main.fadeIn(300);
                // ------------

                var callBackParam = {
                    this_o: this_o,
                    self: self,
                    main: $main
                };

                param.callBacks.open(callBackParam);
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

                this.handlersOff($main, param.main.uniqueName);
                
                // Скрыли блок
                $main.fadeOut(300);
                // ------------

                var callBackParam = {
                    this_o: this_o,
                    openBtn: openBtn,
                    main: $main
                };

                param.callBacks.close(callBackParam);

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

                this.handlersOff($main, param.main.uniqueName);

                // Скрыли блок
                $main.fadeOut(300);
                // ------------

                var callBackParam = {
                    this_o: this_o,
                    openBtn: openBtn,
                    main: $main
                };

                param.callBacks.save(callBackParam);

                this.handlerOpen(param);
            }
        };

        // Взял из примера
        $.lPopup = function(method){
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
