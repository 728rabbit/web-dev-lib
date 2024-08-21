class iweb {
    constructor() {
        this.current_language = 'en';
        this.language = {
            'en': {
                btn_confirm: 'OK',
                btn_yes: 'Yes',
                btn_no: 'No',
                please_select: 'Please Select',
                type_error: 'File type is not allowed.',
                max_error: 'Maximum allowed file size {num}M.',
                is_required: 'This field is required.',
                password_error: 'Password must contain at least 6 characters, including upper/lowercase and numbers (e.g. Abc123).',
                email_error: 'Invalid email address format.',
                number_error: 'Invalid number format.',
                date_error: 'Invalid date format.',
                required_error: 'Please fill in the required information.',
                custom_error: ''
            },
            'zh-hant': {
                btn_confirm: '確定',
                btn_yes: '是',
                btn_no: '否',
                please_select: '請選擇',
                type_error: '不允許的檔案類型。',
                max_error: '檔案大小不能超過{num}M。',
                is_required: '此欄位必須填寫。',
                password_error: '密碼必須至少包含6個字符，包括大寫/小寫和數字(例如Abc123)。',
                email_error: '無效的郵件地址格式。',
                number_error: '無效的數字格式。',
                date_error: '無效的日期格式。',
                required_error: '請正確填寫必須填寫的項目。',
                custom_error: ''
            },
            'zh-hans': {
                btn_confirm: '确定',
                btn_yes: '是',
                btn_no: '否',
                please_select: '请选择',
                type_error: '不允许的档案类型。',
                max_error: '档案大小不能超过{num}M。',
                is_required: '此栏位必须填写。',
                password_error: '密码必须至少包含6个字符，包括大写/小写和数字(例如Abc123)。',
                email_error: '无效的邮件地址格式。',
                number_error: '无效的数字格式。',
                date_error: '无效的日期格式。',
                required_error: '请正确填写必须填写的项目。',
                custom_error: ''
            }
        };
        
        this.csrf_token = '';

        this.init_status = false;
        this.is_busy = false;

        this.autocomplete_timer = null;
    
        this.uploader_options = {};
        this.uploader_files = {};
        this.uploader_files_skip = {};

        this.win_width = 0;
        this.win_scroll_top = 0;
    }
    
    init() {
        const iweb_object = this;
        
        /* set current language */
        const htmlLang = document.documentElement.lang.toLowerCase();
        if (iweb_object.isValue(htmlLang) && iweb_object.isValue(iweb_object.language[htmlLang])) {
            iweb_object.current_language = htmlLang;
        }

        /* set csrf token */
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (iweb_object.isValue(csrfToken?.content)) {
            const hostname = location.hostname || '/';
            iweb_object.csrf_token = iweb_object.md5(iweb_object.md5(`iweb@${hostname}`) + '@' + csrfToken.content);
        }

        /* wrap element exclude script */
        const bodyChildren = Array.from(document.body.children);
        const elementsToWrap = bodyChildren.filter(el => !['SCRIPT', 'NOSCRIPT'].includes(el.tagName));
        if (elementsToWrap.length > 0) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('iweb-viewer');
            elementsToWrap.forEach(el => wrapper.appendChild(el));
            document.body.prepend(wrapper);
        }
        
        /* add body class */
        document.body.removeAttribute('data-processing');
        document.body.classList.add('iweb');
        if (iweb_object.detectDevice()) {
            document.body.classList.add('iweb-mobile');
        }
        
        /* set font size */
        const fontSize = iweb_object.getCookie('iweb_font_size');
        if (iweb_object.isValue(fontSize)) { 
            if (iweb_object.isMatch(fontSize, 'small') || iweb_object.isMatch(fontSize, 'large')) {
                document.documentElement.classList.add(`${fontSize}-font`);
            }
            document.querySelectorAll('a.font-switch').forEach((element) => {
                if (iweb_object.isMatch(element.dataset.size, fontSize)) {
                    element.classList.add('current');
                } else {
                    element.classList.remove('current');
                }
            });
        }
        
        /* init component & bind event */
		iweb_object.inputBox();
		//iweb_object.selector();
		//iweb_object.checkbox();
		//iweb_object.radio();
		//iweb_object.iframe();
		//iweb_object.responsive();
        iweb_object.bindEvent();
        
        /* callback */
        iweb_object.win_width = parseInt(document.querySelector('div.iweb-viewer').offsetWidth);
        if (typeof iweb_global_layout === 'function') {
            iweb_global_layout(iweb_object.win_width);
        }
        if (typeof iweb_self_layout === 'function') {
            iweb_self_layout(iweb_object.win_width);
        }
        if (typeof iweb_extra_layout === 'function') {
            iweb_extra_layout(iweb_object.win_width);
        }
        if (typeof iweb_global_func === 'function') {
            iweb_global_func();
        }
        if (typeof iweb_self_func === 'function') {
            iweb_self_func();
        }
        if (typeof iweb_extra_func === 'function') {
            iweb_extra_func();
        }
    }
    
    inputBox(input_object, callback) {
        const iweb_object = this;
        
        if (!iweb_object.isValue(input_object)) {
            input_object = document.querySelectorAll('input[type="text"], input[type="password"], input[type="date"], input[type="email"], input[type="number"], input[type="file"], textarea');
        }
        
        if (iweb_object.isValue(input_object)) {
            input_object.forEach(function(input) {
                /* if the element is already contained in a "iweb-input/iweb-autocomplete" class, skip */
                if (!input.closest('.iweb-input') && !input.closest('.iweb-autocomplete')) {
                    var inputType = input.type.toLowerCase();
                    var wrapperDiv = document.createElement('div');
                    wrapperDiv.className = 'iweb-input iweb-input-' + (iweb_object.isValue(inputType) ? inputType : 'text');

                    /* move the input element into a new wrapper div */ 
                    input.parentNode.insertBefore(wrapperDiv, input);
                    wrapperDiv.appendChild(input);

                    if (iweb_object.isMatch(inputType, 'password')) {
                        var button = document.createElement('button');
                        button.className = 'small switch-pwd-type';
                        button.type = 'button';

                        var eyeSlashIcon = document.createElement('i');
                        eyeSlashIcon.className = 'fa fa-eye-slash hide';
                        eyeSlashIcon.style.display = 'block';

                        var eyeIcon = document.createElement('i');
                        eyeIcon.className = 'fa fa-eye show';
                        eyeIcon.style.display = 'none';

                        button.appendChild(eyeSlashIcon);
                        button.appendChild(eyeIcon);

                        wrapperDiv.appendChild(button);
                    }

                    input.style.display = 'block'; 
                    input.style.width = '100%';
                    input.autocomplete = 'off';
                }
            });
        }

        document.querySelectorAll('div.iweb-autocomplete input.fill-id').forEach(function(input) {
            input.type = 'hidden';
            input.readOnly = true;
            var relatedTextInput = input.closest('div.iweb-autocomplete').querySelector('input.fill-txt');
            if (iweb_object.isValue(input.value) && parseInt(input.value) > 0) {
                relatedTextInput.readOnly = true;
            } else {
                relatedTextInput.readOnly = false;
            }
        });

        if (typeof callback === 'function') {
            callback();
        }
    }

    bindEvent() {
        const iweb_object = this;

        document.addEventListener('click', function(e) {
            var target = e.target;
            
            // Handle anchor click
            if ((target.tagName.toString().toUpperCase()) === 'A') {
                var href = target.getAttribute('href');
                if (!iweb_object.isValue(href) || iweb_object.isMatch(href, '#')) {
                    e.preventDefault();
                }
            }

            // Handle font size switch
            if (target.matches('a.font-switch')) {
                e.preventDefault();
                document.querySelectorAll('a.font-switch').forEach(function(el) {
                    el.classList.remove('current');
                });
                document.documentElement.classList.remove('small-font', 'large-font');
                var size = target.dataset.size;
                if (iweb_object.isMatch(size, 'small') || iweb_object.isMatch(size, 'large')) {
                    document.documentElement.classList.add(size + '-font');
                }
                iweb_object.setCookie('iweb_font_size', size);
                document.querySelectorAll('a.font-switch').forEach(function(el) {
                    if (iweb_object.isMatch(el.dataset.size, iweb_object.getCookie('iweb_font_size'))) {
                        el.classList.add('current');
                    } else {
                        el.classList.remove('current');
                    }
                });
            }
            
            // Hide or show password value
            if (target.matches('button.switch-pwd-type') || target.matches('button.switch-pwd-type > i')) {
                const input = target.closest('div').querySelector('input');
                const showIcon = target.closest('div').querySelector('i.show');
                const hideIcon = target.closest('div').querySelector('i.hide');
                if (input.type === 'password') {
                    input.type = 'text';
                    showIcon.style.display = 'block';
                    hideIcon.style.display = 'none';
                } else {
                    input.type = 'password';
                    showIcon.style.display = 'none';
                    hideIcon.style.display = 'block';
                }
            }
            
            
            // Hide autocomplete dropdown if clicking outside
            if (!target.closest('div.iweb-autocomplete')) {
                document.querySelectorAll('div.iweb-autocomplete ul').forEach(function(el) {
                    el.remove();
                });
            }

            // Handle autocomplete option selection
            if (target.matches('div.iweb-autocomplete ul > li > a')) {
                var selectCallback = target.closest('div.iweb-autocomplete').dataset.sfunc;

                target.closest('div.iweb-autocomplete').querySelector('input.fill-id').value = target.dataset.id;
                target.closest('div.iweb-autocomplete').querySelector('input.fill-txt').value = target.textContent;
                target.closest('div.iweb-autocomplete').querySelector('input.fill-txt').readOnly = true;
                var resetLink = document.createElement('a');
                resetLink.className = 'fill-reset';
                resetLink.innerHTML = '<i class="fa fa-times" style="color:#d73d32"></i>';
                target.closest('div.iweb-autocomplete').querySelector('input.fill-txt').parentElement.appendChild(resetLink);
                target.closest('div.iweb-autocomplete').querySelector('ul').remove();

                if (typeof window[selectCallback] === 'function') {
                    window[selectCallback](target.dataset.id);
                }
            }

            // Handle autocomplete value removal
            if (target.matches('div.iweb-autocomplete a.fill-reset') || target.matches('div.iweb-autocomplete a.fill-reset > i')) {
                var removeCallback = target.closest('div.iweb-autocomplete').dataset.rfunc;
                
                target.closest('div.iweb-autocomplete').querySelector('input.fill-id').value = '';
                target.closest('div.iweb-autocomplete').querySelector('input.fill-txt').value = '';
                target.closest('div.iweb-autocomplete').querySelector('input.fill-txt').readOnly = false;
                target.remove();

                if (typeof window[removeCallback] === 'function') {
                    window[removeCallback]();
                }
            }
            
            // Hide all selectors if clicking outside
            if (!target.closest('div.iweb-selector')) {
                document.querySelectorAll('div.iweb-selector').forEach(function(el) {
                    el.classList.remove('show');
                });
            }

            // Handle selector clicks
            if (target.matches('div.iweb-selector > div.virtual > div.result > a')) {
                var isVisible = target.closest('div.iweb-selector').querySelector('div.virtual > div.options > ul').offsetParent !== null;
                if (isVisible) {
                    target.closest('div.iweb-selector').classList.remove('show');
                } else {
                    target.closest('div.iweb-selector').classList.add('show');
                }
            }
        });

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 && document.querySelector('div.iweb-alert-dialog')) {
                e.preventDefault();
            }
        });

        document.addEventListener('focus', function(e) {
            if (e.target.matches('div.iweb-selector > div.real > select')) {
                document.querySelectorAll('div.iweb-selector').forEach(function(el) {
                    el.classList.remove('show');
                });
            }
        }, true);

        document.addEventListener('blur', function(e) {
            if (e.target.matches('div.iweb-selector > div.virtual > div.options ul > li > a:last-of-type')) {
                document.querySelectorAll('div.iweb-selector').forEach(function(el) {
                    el.classList.remove('show');
                });
            }
        }, true);

        document.addEventListener('change', function(e) {
            if (e.target.matches('div.iweb-selector > div.real > select')) {
                var selectedOption = [];
                var selectedOptionLabel = '';
                e.target.querySelectorAll('option').forEach(function(option) {
                    if (option.selected) {
                        selectedOption.push(option.value.toString());
                    }
                });
                e.target.closest('div.iweb-selector').querySelectorAll('div.virtual > div.options ul > li > a').forEach(function(el) {
                    if (iweb_object.isValue(el.dataset.value)) {
                        if (!iweb_object.isMatch(selectedOption.indexOf(el.dataset.value.toString()), -1)) {
                            el.parentElement.classList.add('node-selected');
                            if (iweb_object.isValue(selectedOptionLabel)) {
                                selectedOptionLabel += ', ';
                            }
                            selectedOptionLabel += el.textContent;
                        } else {
                            el.parentElement.classList.remove('node-selected');
                        }
                    }
                });
                if (!iweb_object.isValue(selectedOptionLabel)) {
                    selectedOptionLabel = iweb_object.isValue(e.target.dataset.default) ? e.target.dataset.default : iweb_object.language[iweb_object.current_language]['please_select'];
                }
                e.target.closest('div.iweb-selector').querySelector('div.virtual > div.result > a').textContent = selectedOptionLabel;
            }
        });

        document.addEventListener('input', function(e) {
            if (e.target.matches('div.iweb-autocomplete input.fill-txt')) {
                var initCallback = e.target.closest('div.iweb-autocomplete').dataset.ifunc;
                var object = e.target;
                object.closest('div.iweb-autocomplete').querySelector('small.tips')?.remove();

                if (iweb_object.isValue(iweb_object.autocomplete_timer)) {
                    clearTimeout(iweb_object.autocomplete_timer);
                }

                iweb_object.autocomplete_timer = setTimeout(function() {
                    clearTimeout(iweb_object.autocomplete_timer);

                    /* max 5 param */
                    var extraValues = {};
                    for (let i = 1; i <= 5; i++) {
                        let param = object.closest('div.iweb-autocomplete').dataset[`param${i}`];
                        if (iweb_object.isValue(param)) {
                            let [key, value] = param.split(':');
                            extraValues[key] = value;
                        }
                    }

                    /* merge post data */
                    var postData = {
                        url: object.closest('div.iweb-autocomplete').dataset.url,
                        values: Object.assign({ keywords: object.value.trim() }, extraValues),
                        dataType: 'json',
                        showProcessing: false
                    };

                    /* get search result */
                    if (iweb_object.isValue(object.value.trim()) && !iweb_object.is_busy) {
                        iweb_object.is_busy = true;
                        iweb_object.post(postData, function(responseData) {
                            var ul = object.parentElement.querySelector('ul.fill-options');
                            if (ul) ul.remove();
                            if (iweb_object.isValue(responseData)) {
                                var picker = document.createElement('ul');
                                picker.className = 'fill-options';
                                
                                responseData = Object.values(responseData);
                                responseData.forEach(function(value) {
                                    var li = document.createElement('li');
                                    var a = document.createElement('a');
                                    a.dataset.id = value.id;
                                    a.textContent = value.name;
                                    li.appendChild(a);
                                    picker.appendChild(li);
                                });
                                
                                object.closest('div.iweb-autocomplete').querySelector('ul')?.remove();
                                object.parentElement.appendChild(picker);

                                if (typeof window[initCallback] === 'function') {
                                    window[initCallback](responseData);
                                }
                            }
                        }, function() {
                            iweb_object.is_busy = false;
                        });
                    }
                }, 500);
            }
        });
    }
    
    /* checking */
    isValue(value) {
        if (typeof value !== 'undefined') {
            if (value !== null) {
                if (typeof value === 'object' || Array.isArray(value)) {
                    return Object.keys(value).length > 0;
                } else {
                    return value.toString().trim() !== '';
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    isMatch(value1, value2, sensitive) {
        const iweb_object = this;
        
        if (iweb_object.isValue(value1) && iweb_object.isValue(value2)) {
            const trimmedValue1 = value1.toString().trim();
            const trimmedValue2 = value2.toString().trim();

            if (iweb_object.isValue(sensitive) && (sensitive || parseInt(sensitive) === 1)) {
                return trimmedValue1 === trimmedValue2;
            } else {
                return trimmedValue1.toLowerCase() === trimmedValue2.toLowerCase();
            }
        } else {
            return false;
        }
    }
    
    isNumber(value, digital_mode) {
        const iweb_object = this;
        
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            let reg = /(^((-)?[1-9]{1}\d{0,2}|0\.|0$))(((\d)+)?)(((\.)(\d+))?)$/;
            if (iweb_object.isMatch(digital_mode, true)) {
                reg = /^[0-9]+$/;
            }
            return reg.test(value);
        }
    }
    
    isEmail(value) {
        const iweb_object = this;
        
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            const reg = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,}$/;
            return reg.test(value);
        }
    }

    isPassword(value) {
        const iweb_object = this;
        
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
            return reg.test(value);
        }
    }

    isDate(value, format) {
        const iweb_object = this;
        
        if (!iweb_object.isValue(value)) {
            return false;
        } else {
            let reg = /^(\d{4})(\-)(\d{2})(\-)(\d{2})$/;
            if (!iweb_object.isMatch(format, 'y-m-d')) {
                value = value.split('/').reverse().join('-');
            }

            if (reg.test(value)) {
                let ymd_checking = true;
                const parts = value.split('-');
                const day = parseInt(parts[2]);
                const month = parseInt(parts[1]);
                const year = parseInt(parts[0]);
                if (isNaN(day) || isNaN(month) || isNaN(year)) {
                    ymd_checking = false;
                } else {
                    if (year <= 0 || month <= 0 || month > 12 || day <= 0) {
                        ymd_checking = false;
                    } else if ([1, 3, 5, 7, 8, 10, 12].includes(month) && day > 31) {
                        ymd_checking = false;
                    } else if ([4, 6, 9, 11].includes(month) && day > 30) {
                        ymd_checking = false;
                    } else if (month == 2) {
                        const isLeapYear = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));
                        if ((isLeapYear && day > 29) || (!isLeapYear && day > 28)) {
                            ymd_checking = false;
                        }
                    }
                }
                return (new Date(value) instanceof Date) && ymd_checking;
            } else {
                return false;
            }
        }
    }

    /* post & form */
    async post(post_data, callback, final_callback) {
        const iweb_object = this;
        let local_time = iweb_object.getDateTime(null, 'time');

        if (iweb_object.isValue(post_data)) {
            post_data = Object.assign({
                url: '',
                values: {},
                dataType: 'json',
                showProcessing: true
            }, post_data);

            post_data.values.itoken = window.btoa(iweb_object.md5(iweb_object.csrf_token + '#dt' + local_time) + '%' + local_time);

            if (iweb_object.isValue(post_data.url)) {
                if (iweb_object.isMatch(post_data.showProcessing, true) || iweb_object.isMatch(post_data.showProcessing, 1) || iweb_object.isMatch(post_data.showProcessing, 2)) {
                    iweb_object.showProcessing(true, 70);
                }

                try {
                    const response = await fetch(post_data.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(post_data.values)
                    });

                    const responseData = await response.json();
                    if (response.ok) {
                        if (typeof callback === 'function') {
                            callback(responseData);
                        }
                    } else {
                        throw new Error(response.statusText);
                    }
                } catch (error) {
                    iweb_object.showProcessing(false);
                    let alert_error_message = error.message;
                    if (error.message.includes('NetworkError')) {
                        alert_error_message = 'Unstable network, please check your network connection.';
                    } else if (error.message.includes('404')) {
                        alert_error_message = 'The requested page not found.';
                    } else if (error.message.includes('500')) {
                        alert_error_message = 'Internal Server Error.';
                    }
                    alert(alert_error_message);
                    return false;
                } finally {
                    if (iweb_object.isMatch(post_data.showProcessing, true) || iweb_object.isMatch(post_data.showProcessing, 1) || iweb_object.isMatch(post_data.showProcessing, 2)) {
                        if (!iweb_object.isMatch(post_data.showProcessing, 2)) {
                            iweb_object.showProcessing(false);
                        }
                    }
                    if (typeof final_callback === 'function') {
                        final_callback();
                    }
                }
            }
        }
    }
    
    
    showProcessing(status, value) {
        const iweb_object = this;

        if (iweb_object.isMatch(status, 1) || iweb_object.isMatch(status, true)) {
            if (document.querySelectorAll('div.iweb-processing').length === 0) {
                var box_html = '';
                var opacity = 1;
                if (iweb_object.isNumber(value, true)) {
                    opacity = (Math.round(parseInt(value) / 100 * 100) / 100);
                    box_html += '<div class="iweb-processing" style="background:rgba(255,255,255,' + opacity + ')">';
                } else {
                    box_html += '<div class="iweb-processing">';
                }
                box_html += '<div class="loading">';
                box_html += '<svg width="48px" height="48px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">';
                box_html += '<circle cx="50" cy="50" fill="none" stroke="#dddddd" stroke-width="10" r="36" stroke-dasharray="169.64600329384882 58.548667764616276">';
                box_html += '<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>';
                box_html += '</circle>';
                box_html += '</svg>';
                box_html += '</div>';
                box_html += '</div>';

                var container = document.createElement('div');
                container.innerHTML = box_html;
                document.body.insertBefore(container.firstChild, document.body.firstChild);
            }
        } else {
            var microsecond = 0;
            if (iweb_object.isNumber(value, true)) {
                microsecond = parseInt(value);
            }
            setTimeout(function() {
                var processingDivs = document.querySelectorAll('div.iweb-processing');
                processingDivs.forEach(function(div) {
                    div.remove();
                });
            }, microsecond);
        }
    }
    
    /* convert */
    toNumber(value, currency_mode, decimal) {
        const iweb_object = this;
        
        value = value.toString().replace(/[^\d|\-|\.]/g, '');
        if (iweb_object.isNumber(value)) {
            if (iweb_object.isNumber(decimal) && parseInt(decimal) > 0) {
                let power10 = Math.pow(10, decimal);
                value = value * power10;
                value = (Math.round(value) / power10).toString();
                let dpp = value.indexOf('.');
                if (dpp < 0) {
                    dpp = value.length;
                    value += '.';
                }
                while (value.length <= dpp + decimal) {
                    value += '0';
                }
            }
            if (iweb_object.isMatch(currency_mode, true)) {
                return value.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
            } else {
                return value;
            }
        }
        return 0;
    }
    
    getDateTime(string, format) {
        var now = new Date();
        if (iweb_object.isValue(string)) {
            now = new Date(string);
        }
        
        if (iweb_object.isMatch(format, 'time')) {
            return now.getTime();
        } else {
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if (month.toString().length == 1) {
                month = '0' + month;
            }
            if (day.toString().length == 1) {
                day = '0' + day;
            }
            if (hour.toString().length == 1) {
                hour = '0' + hour;
            }
            if (minute.toString().length == 1) {
                minute = '0' + minute;
            }
            if (second.toString().length == 1) {
                second = '0' + second;
            }
            if (!iweb_object.isValue(format)) {
                format = 'y-m-d h:i:s'
            }
            var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            switch (format) {
                case 'y-m-d h:i:s':
                    dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                    break;
                case 'y-m-d h:i':
                    dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                    break;
                case 'd/m/y h:i:s':
                    dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                    break;
                case 'd/m/y h:i':
                    dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
                    break;
                case 'y-m-d':
                    dateTime = year + '-' + month + '-' + day;
                    break;
                case 'd/m/y':
                    dateTime = day + '/' + month + '/' + year;
                    break;
                case 'h:i:s':
                    dateTime = hour + ':' + minute + ':' + second;
                    break;
                case 'h:i':
                    dateTime = hour + ':' + minute;
                    break;
                case 'Y':
                    dateTime = year;
                    break;
                case 'm':
                    dateTime = month;
                    break;
                case 'd':
                    dateTime = day;
                    break;
                case 'h':
                    dateTime = hour;
                    break;
                case 'i':
                    dateTime = minute;
                    break;
                case 's':
                    dateTime = second;
                    break;
            }
            return dateTime;
        }
    }
    
    /* md5 */
    md5(input) {
        function add32(a, b) {
            return (a + b) & 0xFFFFFFFF;
        }

        function cmn(q, a, b, x, s, t) {
            return add32((add32(add32(a, q), add32(x, t)) << s) | (add32(add32(a, q), add32(x, t)) >>> (32 - s)), b);
        }

        function ff(a, b, c, d, x, s, t) {
            return cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }

        function gg(a, b, c, d, x, s, t) {
            return cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }

        function hh(a, b, c, d, x, s, t) {
            return cmn(b ^ c ^ d, a, b, x, s, t);
        }

        function ii(a, b, c, d, x, s, t) {
            return cmn(c ^ (b | (~d)), a, b, x, s, t);
        }

        function md5cycle(x, k) {
            var a = x[0], b = x[1], c = x[2], d = x[3];

            a = ff(a, b, c, d, k[0], 7, -680876936);
            d = ff(d, a, b, c, k[1], 12, -389564586);
            c = ff(c, d, a, b, k[2], 17, 606105819);
            b = ff(b, c, d, a, k[3], 22, -1044525330);
            a = ff(a, b, c, d, k[4], 7, -176418897);
            d = ff(d, a, b, c, k[5], 12, 1200080426);
            c = ff(c, d, a, b, k[6], 17, -1473231341);
            b = ff(b, c, d, a, k[7], 22, -45705983);
            a = ff(a, b, c, d, k[8], 7, 1770035416);
            d = ff(d, a, b, c, k[9], 12, -1958414417);
            c = ff(c, d, a, b, k[10], 17, -42063);
            b = ff(b, c, d, a, k[11], 22, -1990404162);
            a = ff(a, b, c, d, k[12], 7, 1804603682);
            d = ff(d, a, b, c, k[13], 12, -40341101);
            c = ff(c, d, a, b, k[14], 17, -1502002290);
            b = ff(b, c, d, a, k[15], 22, 1236535329);

            a = gg(a, b, c, d, k[1], 5, -165796510);
            d = gg(d, a, b, c, k[6], 9, -1069501632);
            c = gg(c, d, a, b, k[11], 14, 643717713);
            b = gg(b, c, d, a, k[0], 20, -373897302);
            a = gg(a, b, c, d, k[5], 5, -701558691);
            d = gg(d, a, b, c, k[10], 9, 38016083);
            c = gg(c, d, a, b, k[15], 14, -660478335);
            b = gg(b, c, d, a, k[4], 20, -405537848);
            a = gg(a, b, c, d, k[9], 5, 568446438);
            d = gg(d, a, b, c, k[14], 9, -1019803690);
            c = gg(c, d, a, b, k[3], 14, -187363961);
            b = gg(b, c, d, a, k[8], 20, 1163531501);
            a = gg(a, b, c, d, k[13], 5, -1444681467);
            d = gg(d, a, b, c, k[2], 9, -51403784);
            c = gg(c, d, a, b, k[7], 14, 1735328473);
            b = gg(b, c, d, a, k[12], 20, -1926607734);

            a = hh(a, b, c, d, k[5], 4, -378558);
            d = hh(d, a, b, c, k[8], 11, -2022574463);
            c = hh(c, d, a, b, k[11], 16, 1839030562);
            b = hh(b, c, d, a, k[14], 23, -35309556);
            a = hh(a, b, c, d, k[1], 4, -1530992060);
            d = hh(d, a, b, c, k[4], 11, 1272893353);
            c = hh(c, d, a, b, k[7], 16, -155497632);
            b = hh(b, c, d, a, k[10], 23, -1094730640);
            a = hh(a, b, c, d, k[13], 4, 681279174);
            d = hh(d, a, b, c, k[0], 11, -358537222);
            c = hh(c, d, a, b, k[3], 16, -722521979);
            b = hh(b, c, d, a, k[6], 23, 76029189);
            a = hh(a, b, c, d, k[9], 4, -640364487);
            d = hh(d, a, b, c, k[12], 11, -421815835);
            c = hh(c, d, a, b, k[15], 16, 530742520);
            b = hh(b, c, d, a, k[2], 23, -995338651);

            a = ii(a, b, c, d, k[0], 6, -198630844);
            d = ii(d, a, b, c, k[7], 10, 1126891415);
            c = ii(c, d, a, b, k[14], 15, -1416354905);
            b = ii(b, c, d, a, k[5], 21, -57434055);
            a = ii(a, b, c, d, k[12], 6, 1700485571);
            d = ii(d, a, b, c, k[3], 10, -1894986606);
            c = ii(c, d, a, b, k[10], 15, -1051523);
            b = ii(b, c, d, a, k[1], 21, -2054922799);
            a = ii(a, b, c, d, k[8], 6, 1873313359);
            d = ii(d, a, b, c, k[15], 10, -30611744);
            c = ii(c, d, a, b, k[6], 15, -1560198380);
            b = ii(b, c, d, a, k[13], 21, 1309151649);
            a = ii(a, b, c, d, k[4], 6, -145523070);
            d = ii(d, a, b, c, k[11], 10, -1120210379);
            c = ii(c, d, a, b, k[2], 15, 718787259);
            b = ii(b, c, d, a, k[9], 21, -343485551);

            x[0] = add32(a, x[0]);
            x[1] = add32(b, x[1]);
            x[2] = add32(c, x[2]);
            x[3] = add32(d, x[3]);
        }

        function md5blk(s) {
            var md5blks = [], i;
            for (i = 0; i < 64; i += 4) {
                md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
            }
            return md5blks;
        }

        function md51(s) {
            var n = s.length,
                state = [1732584193, -271733879, -1732584194, 271733878],
                i;

            for (i = 64; i <= s.length; i += 64) {
                md5cycle(state, md5blk(s.substring(i - 64, i)));
            }

            s = s.substring(i - 64);
            var tail = new Array(16).fill(0);
            for (i = 0; i < s.length; i++) {
                tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
            }
            tail[i >> 2] |= 0x80 << ((i % 4) << 3);
            if (i > 55) {
                md5cycle(state, tail);
                tail.fill(0);
            }
            tail[14] = n * 8;
            md5cycle(state, tail);
            return state;
        }

        function rhex(n) {
            var s = '', j;
            for (j = 0; j < 4; j++) {
                s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
            }
            return s;
        }

        function hex(x) {
            for (var i = 0; i < x.length; i++) {
                x[i] = rhex(x[i]);
            }
            return x.join('');
        }

        var hex_chr = '0123456789abcdef'.split('');
        return hex(md51(input));
    }

    /* cookie */
    setCookie(cname, cvalue, exdays) {
        const iweb_object = this;
        
        if (navigator.cookieEnabled) {
            if (iweb_object.isValue(cname)) {
                if (!iweb_object.isValue(exdays)) {
                    exdays = 12;
                }
                const d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                const expires = 'expires=' + d.toUTCString();
                document.cookie = `${cname}=${cvalue};${expires};path=/`;
            }
        } else {
            alert('Cookies Blocked or not supported by your browser.');
        }
    }
    
    getCookie(cname) {
        const iweb_object = this;
        
        if (navigator.cookieEnabled) {
            if (iweb_object.isValue(cname)) {
                const name = cname + '=';
                const ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i].trim();
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
            }
        } else {
            alert('Cookies Blocked or not supported by your browser.');
        }
        return '';
    }
    
    detectDevice (index) {
		var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/Mac|iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            }
        };
		switch (index) {
			case 'android':
				return isMobile.Android();
				break;
			case 'blackberry':
				return isMobile.BlackBerry();
				break;
			case 'ios':
				return isMobile.iOS();
				break;
			case 'opera':
				return isMobile.Opera();
				break;
			case 'windows':
				return isMobile.Windows();
				break;
			default:
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
}