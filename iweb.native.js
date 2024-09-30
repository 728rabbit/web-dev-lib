class iweb {
    constructor() {
        this.current_language = 'en';
        this.language = {
            en: {
                btn_confirm: 'OK',
                btn_yes: 'Yes',
                btn_no: 'No',
                please_select: 'Please Select',
                type_error: 'File type is not allowed.',
                max_error: 'Maximum allowed file size {num}M.',
                required_error: 'This field is required.',
                password_error: 'Password must contain at least 6 characters, including upper/lowercase and numbers (e.g. Abc123).',
                email_error: 'Invalid email address format.',
                number_error: 'Invalid number format.',
                date_error: 'Invalid date format.'
            },
            zh_hant: {
                btn_confirm: '確定',
                btn_yes: '是',
                btn_no: '否',
                please_select: '請選擇',
                type_error: '不允許的檔案類型。',
                max_error: '檔案大小不能超過{num}M。',
                required_error: '此項目必須填寫。',
                password_error: '密碼必須至少包含6個字符，包括大寫/小寫和數字(例如Abc123)。',
                email_error: '無效的郵件地址格式。',
                number_error: '無效的數字格式。',
                date_error: '無效的日期格式。'
            },
            zh_hans: {
                btn_confirm: '确定',
                btn_yes: '是',
                btn_no: '否',
                please_select: '请选择',
                type_error: '不允许的档案类型。',
                max_error: '档案大小不能超过{num}M。',
                required_error: '此项目必须填写。',
                password_error: '密码必须至少包含6个字符，包括大写/小写和数字(例如Abc123)。',
                email_error: '无效的邮件地址格式。',
                number_error: '无效的数字格式。',
                date_error: '无效的日期格式。'
            }
        };
        
        this.imd5 = (new iMD5());
        this.csrf_token = '';
        this.delay_timer = null;
        this.is_busy = false;
        
        this.idatepicker = null;

        this.uploader_options = {};
        this.uploader_files = {};
        this.uploader_files_skip = {};

        this.win_width = 0;
        this.win_scroll_top = 0;
    }
    
    init() {
        const iweb_object = this;
        
        // set current language
        const htmlLang = (document.documentElement.lang.toLowerCase()).toString().replace('-', '_');
        if (iweb_object.isValue(htmlLang) && iweb_object.isValue(iweb_object.language[htmlLang])) {
            iweb_object.current_language = htmlLang;
        }

        // set csrf token
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (iweb_object.isValue(csrfToken?.content)) {
            const hostname = (location.hostname || '/');
            iweb_object.csrf_token = iweb_object.imd5.hash(iweb_object.imd5.hash('iweb@' + hostname) + '@' + csrfToken.content);
        }
        
        // init body
        iweb_object.initBody();
        
        // set font size
        iweb_object.initFontSize();

        // init component
		iweb_object.initComponent();
        
        // init form
		iweb_object.initForm();
        
        // callback
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
    
    initBody(){
        const iweb_object = this;

        document.body.removeAttribute('data-processing');
        document.body.classList.add('iweb');
        if (iweb_object.detectDevice()) {
            document.body.classList.add('iweb-mobile');
        }
        
        // wrap element exclude script
        const bodyChildren = Array.from(document.body.children);
        const elementsToWrap = bodyChildren.filter(el => !['SCRIPT', 'NOSCRIPT'].includes(el.tagName));
        if (elementsToWrap.length > 0) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('iweb-viewer');
            elementsToWrap.forEach(el => wrapper.appendChild(el));
            document.body.prepend(wrapper);
        }

        // bind event
        document.body.addEventListener('click', function(e) {
            // handle anchor click
            if ((e.target.tagName.toString().toUpperCase()) === 'A') {
                var href = e.target.getAttribute('href');
                if (!iweb_object.isValue(href) || iweb_object.isMatch(href, '#')) {
                    e.preventDefault();
                }
            }

            // hide autocomplete options
            if (!e.target.closest('div.iweb-input-autocomplete')) {
                document.querySelectorAll('div.iweb-input-autocomplete ul.fill-options').forEach(function(e1) {
                    e1.remove();
                });
            }
            
            // hide select options
            if (!e.target.closest('div.iweb-select')) {
                document.querySelectorAll('div.iweb-select').forEach(function(e1) {
                    e1.classList.remove('show');
                });
            }
        });
    }

    initFontSize() {
        const iweb_object = this;
        
        const fontSize = iweb_object.getCookie('iweb_font_size');
        if (iweb_object.isValue(fontSize)) {
            document.documentElement.classList.add(fontSize+'-font');
            if(document.querySelectorAll('a.font-switch').length > 0) {
                // set current
                document.querySelectorAll('a.font-switch').forEach((element) => {
                    if (iweb_object.isMatch(element.dataset.size, fontSize)) {
                        element.classList.add('current');
                    } else {
                        element.classList.remove('current');
                    }
                    
                    // bind event
                    element.addEventListener('click', (e) => {
                        e.preventDefault();
                        const newfontSize = e.target.dataset.size;
                        
                        // set new font size
                        iweb_object.setCookie('iweb_font_size', newfontSize);
                        document.documentElement.classList.remove('small-font', 'middle-font' ,'large-font');
                        document.documentElement.classList.add(newfontSize + '-font');
                        document.querySelectorAll('a.font-switch').forEach(function(element1) {
                            if (iweb_object.isMatch(element1.dataset.size, iweb_object.getCookie('iweb_font_size'))) {
                                element1.classList.add('current');
                            } else {
                                element1.classList.remove('current');
                            }
                        });
                    });
                });
            }
        }
    }
    
    initComponent(){
        const iweb_object = this;
        iweb_object.inputBox();
		iweb_object.selectBox();
		iweb_object.checkBox();
		iweb_object.radioBox();
		//iweb_object.iframe();
		//iweb_object.responsive();
    }
    
    initForm(form_object = null) {
        const iweb_object = this;

        if (!iweb_object.isValue(form_object)) {
            form_object = document.querySelectorAll('form[data-ajax="1"]');
        }
        
        if(form_object.length > 0) {
            form_object.forEach(function(form) {
                const showTips = ((!iweb_object.isMatch(form.dataset.showtips, false)) && (!iweb_object.isMatch(form.dataset.showtips, 0)));
                form.removeAttribute('data-ajax');
                form.removeAttribute('data-showtips');
                form.method = 'post';
                form.autocomplete = 'off';

                form.addEventListener('submit', function (e) {
                    e.preventDefault();
         
                    // remove error classes and tips
                    const errorElements = form.querySelectorAll('.error');
                    errorElements.forEach(function(el) {
                        el.classList.remove('error');
                    });

                    const tipsElements = form.querySelectorAll('small.tips');
                    tipsElements.forEach(function(tips) {
                        tips.remove();
                    });
                    
                    // do checking before submit
                    let can_submit = true;
                    const requiredInputs =  form.querySelectorAll('input[data-validation]:not(:disabled), select[data-validation]:not(:disabled), textarea[data-validation]:not(:disabled)');
                    if(requiredInputs.length > 0) {
                        requiredInputs.forEach(function(input) {
                            const validationArray = ((input.dataset.validation).toString().split('|'));
                            if (iweb_object.isMatch(input.type, 'checkbox')) {
                                if(validationArray.includes('required') && !input.closest('div.iweb-checkbox-set').querySelector('input[type="checkbox"]:checked')) {
                                    if(showTips && !input.closest('div.iweb-checkbox-set').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = iweb_object.language[iweb_object.current_language]['required_error'];
                                        input.closest('div.iweb-checkbox-set').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-checkbox').classList.add('error');
                                    can_submit = false;
                                }
                            } 
                            else if (iweb_object.isMatch(input.type, 'radio')) {
                                if ((validationArray.includes('required')) && !input.closest('div.iweb-radio-set').querySelector('input[type="radio"]:checked')) {
                                    if(showTips && !input.closest('div.iweb-radio-set').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = iweb_object.language[iweb_object.current_language]['required_error'];
                                        input.closest('div.iweb-radio-set').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-radio').classList.add('error');
                                    can_submit = false;
                                }
                            } 
                            else if (iweb_object.isMatch(input.type, 'select-one') || iweb_object.isMatch(input.type, 'select-multiple')) {
                                if ((validationArray.includes('required')) && !iweb_object.isValue(input.value)) {
                                    if(showTips && !input.closest('div.iweb-select').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = iweb_object.language[iweb_object.current_language]['required_error'];
                                        input.closest('div.iweb-select').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-select').classList.add('error');
                                    can_submit = false;
                                }
                            }
                            else {
                                if ((validationArray.includes('required')) && !iweb_object.isValue(input.value)) {
                                    if(showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = iweb_object.language[iweb_object.current_language]['required_error'];
                                        input.closest('div.iweb-input').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-input').classList.add('error');
                                    can_submit = false;
                                }
                                else {
                                    if ((validationArray.includes('number')) && !iweb_object.isNumber(input.value)) {
                                        if(showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = iweb_object.language[iweb_object.current_language]['number_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                    }
                                    else if ((validationArray.includes('email')) && !iweb_object.isEmail(input.value)) {
                                        if(showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = iweb_object.language[iweb_object.current_language]['email_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                    }
                                    else if ((validationArray.includes('password')) && !iweb_object.isPassword(input.value)) {
                                        if(showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = iweb_object.language[iweb_object.current_language]['password_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                    }
                                    else if ((validationArray.includes('date')) && !iweb_object.isDate(input.value)) {
                                        if(showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = iweb_object.language[iweb_object.current_language]['date_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                    }
                                }
                            }
                        });
                    }

                    // extra checking if need
                    const validation_func = form.dataset.vfunc;
                    if (iweb_object.isMatch((typeof window[validation_func]), 'function')) {
                        can_submit = (can_submit && window[validation_func]());
                    }
                    
                    if(can_submit) {
                        let post_data = 
                        {
                            dataType: 'json',
                            showBusy: true,
                            url: form.action,
                            values: {}
                        };

                        const formData = new FormData(form);
                        formData.forEach((value, key) => {
                            post_data.values[key] = value;
                        });

                        iweb_object.ajaxPost(post_data, function(response_data) {
                            // callback if need
                            const complete_func = form.dataset.cfunc;
                            if (iweb_object.isMatch((typeof window[complete_func]), 'function')) {
                                window[complete_func](response_data);
                            }
                            else {
                                if(iweb_object.isValue(response_data.status) && iweb_object.isMatch(response_data.status, 200)) {
                                    if(iweb_object.isValue(response_data.url)) {
                                        window.location.href = response_data.url;
                                    }
                                    else {
                                        window.location.reload();
                                    }
                                }
                                else {
                                    iweb_object.alert(response_data.message);
                                }
                            }
                        });
                    }
                    else {
                        const errorElement = document.querySelector('.error');
                        if (errorElement) {
                            errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }
                });
            });
        }
    }
    
    inputBox(input_object = null, callback = null) {
        const iweb_object = this;
        
        if (!iweb_object.isValue(input_object)) {
            input_object = document.querySelectorAll('input[type="text"], input[type="password"], input[type="date"], input[type="color"], input[type="tel"], input[type="email"], input[type="number"], input[type="file"], textarea');
        }
        
        if (input_object.length > 0) {
            input_object.forEach(function(input) {
                // if the input is already contained in a "iweb-input" class, skip
                if (!input.closest('div.iweb-input')) {
                    const wrapperDiv = document.createElement('div');
                    wrapperDiv.classList.add('iweb-input');
                    if (iweb_object.isMatch(input.dataset.autocomplete, 1) || iweb_object.isMatch(input.dataset.autocomplete, true)) {
                        wrapperDiv.classList.add('iweb-input-autocomplete');
                    }
                    else {
                        wrapperDiv.classList.add('iweb-input-' + (iweb_object.isValue(input.type) ? input.type : 'text'));
                    }

                    // move the input input into a new wrapper div 
                    input.parentNode.insertBefore(wrapperDiv, input);
                    wrapperDiv.appendChild(input);
                    
                    // handle autocomplete input
                    if (iweb_object.isMatch(input.dataset.autocomplete, 1) || iweb_object.isMatch(input.dataset.autocomplete, true)) {
                        input.type = 'hidden';
                        input.classList.add('fill-id');
                        input.removeAttribute('data-autocomplete');

                        // create search input
                        const fillInput = document.createElement('input');
                        fillInput.type = 'text';
                        fillInput.classList.add('fill-text');
                        fillInput.style.display = 'block'; 
                        fillInput.style.width = '100%';
                        fillInput.autocomplete = 'off';
                        fillInput.addEventListener('input', (e) => {
                            e.preventDefault();
                            e.target.closest('div.iweb-input-autocomplete').querySelector('ul.fill-options')?.remove();
                            e.target.closest('div.iweb-input-autocomplete').querySelector('small.tips')?.remove();

                            // set delay
                            if (iweb_object.isValue(iweb_object.delay_timer)) {
                                clearTimeout(iweb_object.delay_timer);
                            }
                            iweb_object.delay_timer = setTimeout(function() {
                                clearTimeout(iweb_object.delay_timer);
                                
                                // max 5 param
                                let extraValues = {};
                                for (let i = 1; i <= 5; i++) {
                                    let param = e.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id').dataset['param'+i];
                                    if (iweb_object.isValue(param)) {
                                        let [key, value] = param.split(':');
                                        extraValues[key] = value;
                                    }
                                }
                                
                                // merge post data
                                const keywords = e.target.value;
                                const postData = 
                                {
                                    dataType: 'json',
                                    showBusy: false,
                                    url: e.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id').dataset.url,
                                    values: Object.assign({ keywords: keywords }, extraValues)
                                };

                                // search result
                                if (iweb_object.isValue(keywords)) {
                                    iweb_object.ajaxPost(postData, function(responseData) {
                                        if (iweb_object.isValue(responseData)) {
                                            const picker = document.createElement('ul');
                                            picker.className = 'fill-options';

                                            responseData = Object.values(responseData);
                                            responseData.forEach(function(value) {
                                                const li = document.createElement('li');
                                                const a = document.createElement('a');
                                                a.dataset.id = value.id;
                                                a.textContent = value.name;
                                                a.addEventListener('click', (e1) => {
                                                    const findElementId = e1.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id');
                                                    const findElementText = e1.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-text');
                                                    findElementId.value = e1.target.dataset.id;
                                                    findElementText.value = e1.target.textContent;
                                                    findElementText.readOnly = true;
                                                    
                                                    // append reset button
                                                    e1.target.closest('div.iweb-input-autocomplete').querySelector('a.fill-reset')?.remove();
                                                    const fillReset = document.createElement('a');
                                                    fillReset.classList.add('fill-reset');
                                                    fillReset.addEventListener('click', (e2) => {
                                                        e2.preventDefault();
                                                        
                                                        // reset
                                                        const findElementId = e2.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id');
                                                        const findElementText = e2.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-text');
                                                        const findElementReset = e2.target.closest('div.iweb-input-autocomplete').querySelector('a.fill-reset');
                                                        findElementId.value = '';
                                                        findElementText.value = '';
                                                        findElementText.readOnly = false;
                                                        findElementReset.remove();

                                                        // callback if need
                                                        const remove_callback = findElementId.dataset.rfunc;
                                                        if (iweb_object.isMatch((typeof window[remove_callback]), 'function')) {
                                                            window[remove_callback]();
                                                        }
                                                    });
                                                    
                                                    const fillResetIcon = document.createElement('i');
                                                    fillResetIcon.classList.add('fa');
                                                    fillResetIcon.classList.add('fa-times');
                                                    fillResetIcon.style.color = '#d73d32';
                                                    
                                                    fillReset.appendChild(fillResetIcon);
                                                    findElementId.closest('div.iweb-input-autocomplete').appendChild(fillReset);
                                                    
                                                    // remove options list
                                                    findElementId.closest('div.iweb-input-autocomplete').classList.remove('error');
                                                    findElementId.closest('div.iweb-input-autocomplete').querySelector('small.tips')?.remove();
                                                    findElementId.closest('div.iweb-input-autocomplete').querySelector('ul.fill-options')?.remove();
                                                    
                                                    // callback if need
                                                    const select_callback = findElementId.dataset.sfunc;
                                                    if (iweb_object.isMatch((typeof window[select_callback]), 'function')) {
                                                        window[select_callback](findElementId.value);
                                                    }
                                                });
                                                
                                                li.appendChild(a);
                                                picker.appendChild(li);
                                            });

                                            e.target.closest('div.iweb-input-autocomplete').appendChild(picker);
                                        }
                                    });
                                }
                            }, 500);
                        });
                        wrapperDiv.appendChild(fillInput);
                        
                        // append reset button
                        if(iweb_object.isValue(input.dataset.default)) {
                            fillInput.value = input.dataset.default;
                            fillInput.readOnly = true;
                            const fillReset = document.createElement('a');
                            fillReset.classList.add('fill-reset');
                            fillReset.addEventListener('click', (e) => {
                                e.preventDefault();
                                
                                // reset
                                const findElementId = e.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id');
                                const findElementText = e.target.closest('div.iweb-input-autocomplete').querySelector('input.fill-text');
                                const findElementReset = e.target.closest('div.iweb-input-autocomplete').querySelector('a.fill-reset');
                                findElementId.value = '';
                                findElementText.value = '';
                                findElementText.readOnly = false;
                                findElementReset.remove();
                                
                                // callback if need
                                const remove_callback = findElementId.dataset.rfunc;
                                if (iweb_object.isMatch((typeof window[remove_callback]), 'function')) {
                                    window[remove_callback]();
                                }
                            });
                            
                            const fillResetIcon = document.createElement('i');
                            fillResetIcon.classList.add('fa');
                            fillResetIcon.classList.add('fa-times');
                            fillResetIcon.style.color = '#d73d32';
                            
                            fillReset.appendChild(fillResetIcon);
                            wrapperDiv.appendChild(fillReset);
                        }
                        
                        input.removeAttribute('data-default');
                    }
                    else {
                        // set password & color input
                        if (iweb_object.isMatch(input.type, 'password')) {
                            const button = document.createElement('button');
                            button.type = 'button';
                            button.classList.add('switch-pwd-type');
                            button.addEventListener('click', (e) => {
                                e.preventDefault();
                                const input = e.target.closest('div.iweb-input').querySelector('input');
                                const showIcon = e.target.closest('div.iweb-input').querySelector('i.show');
                                const hideIcon = e.target.closest('div.iweb-input').querySelector('i.hide');
                                if (iweb_object.isMatch(input.type, 'password')) {
                                    input.type = 'text';
                                    showIcon.style.display = 'block';
                                    hideIcon.style.display = 'none';
                                } else {
                                    input.type = 'password';
                                    showIcon.style.display = 'none';
                                    hideIcon.style.display = 'block';
                                }
                            });

                            const eyeSlashIcon = document.createElement('i');
                            eyeSlashIcon.classList.add('fa');
                            eyeSlashIcon.classList.add('fa-eye-slash');
                            eyeSlashIcon.classList.add('hide');
                            eyeSlashIcon.style.display = 'block';

                            const eyeIcon = document.createElement('i');
                            eyeIcon.classList.add('fa');
                            eyeIcon.classList.add('fa-eye');
                            eyeIcon.classList.add('show');
                            eyeIcon.style.display = 'none';

                            button.appendChild(eyeSlashIcon);
                            button.appendChild(eyeIcon);
                            wrapperDiv.appendChild(button);
                        }
                        else if (iweb_object.isMatch(input.type, 'color')) {
                            input.classList.add('icolorpicker');
                            input.style.position = 'relative';
                            input.style.zIndex = 1;
                            input.addEventListener('input', (e) => {
                                e.preventDefault();
                                const input = e.target.closest('div').querySelector('input.icolorcode');
                                // ensure it's a valid hex code
                                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                    input.value = e.target.value;
                                }
                            });

                            const colorCode = document.createElement('input');
                            colorCode.type = 'text';
                            colorCode.maxLength = 7;
                            colorCode.value = input.value;
                            colorCode.classList.add('icolorcode');
                            colorCode.style.position = 'absolute';
                            colorCode.style.top = '0px';
                            colorCode.style.left = '0px';
                            colorCode.style.right = '0px';
                            colorCode.style.bottom = '0px';
                            colorCode.style.paddingLeft = '42px';
                            colorCode.addEventListener('input', (e) => {
                                e.preventDefault();
                                const input = e.target.closest('div').querySelector('input.icolorpicker');
                                // ensure it's a valid hex code
                                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                                    input.value = e.target.value;
                                }
                            });
                            wrapperDiv.appendChild(colorCode);
                        }
                    }
                    
                    // set style
                    input.style.display = ((!iweb_object.isMatch(input.type, 'color'))?'block':'inline-block'); 
                    input.style.width = ((!iweb_object.isMatch(input.type, 'color'))?'100%':'36px');
                    input.autocomplete = 'off';
                    
                    // bind event
                    input.addEventListener('input', (e) => {
                        e.target.closest('div.iweb-input').classList.remove('error');
                        e.target.closest('div.iweb-input').querySelector('small.tips')?.remove();
                    });
                }
            });
        }
        
        // date picker
        if(!iweb_object.isValue(iweb_object.idatepicker)) {
            iweb_object.idatepicker = new iDatePicker(iweb_object.current_language);
        }
        iweb_object.idatepicker.render('input[type="date"]');
     
        // callback
        if (iweb_object.isMatch((typeof callback), 'function')) {
            callback();
        }
    }
    
    selectBox(select_object = null, callback = null) {
        const iweb_object = this;

        if (!iweb_object.isValue(select_object)) {
            select_object = document.querySelectorAll('select');
        }
        
        if(select_object.length > 0) {
            select_object.forEach(function(select, select_index) {
                // get config
                let isMultiple = ((iweb_object.isMatch(select.multiple, 1) || iweb_object.isMatch(select.multiple, true))?true:false);
                let isVirtual = ((iweb_object.isMatch(select.dataset.virtual, 1) || iweb_object.isMatch(select.dataset.virtual, true))?true:false);
                let isFilter = ((iweb_object.isMatch(select.dataset.filter, 1) || iweb_object.isMatch(select.dataset.filter, true))?true:false);
                let isPositionTop = ((iweb_object.isMatch(select.dataset.top, 1) || iweb_object.isMatch(select.dataset.top, true))?true:false);
                select.removeAttribute('data-virtual');
                select.removeAttribute('data-filter');
                
                // bind event
                select.addEventListener('focus', (e) => {
                    e.preventDefault();
                    document.querySelectorAll('div.iweb-select').forEach(otherSelector => {
                        otherSelector.classList.remove('show');
                    });
                });
                
                select.addEventListener('change', (e) => {
                    let selectedOptions = [];
                    let selectedOptionLabel = '';

                    // traverse through the options
                    Array.from(e.target.querySelectorAll('option')).forEach(function(option) {
                        if (option.children.length > 0) {
                            Array.from(option.children).forEach(function(childOption) {
                                if (childOption.selected) {
                                    selectedOptions.push(childOption.value.toString());
                                }
                            });
                        } else {
                            if (option.selected) {
                                selectedOptions.push(option.value.toString());
                            }
                        }
                    });
                    
                    // find and update the corresponding virtual options
                    if(e.target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li > a').length > 0) {
                        e.target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li > a').forEach(function(anchor) {
                            var optionValue = anchor.getAttribute('data-value');
                            if (iweb_object.isValue(optionValue)) {
                                if (!iweb_object.isMatch(selectedOptions.indexOf(optionValue), -1)) {
                                    anchor.parentElement.classList.add('node-selected');
                                    if (iweb_object.isValue(selectedOptionLabel)) {
                                        selectedOptionLabel += ', ';
                                    }
                                    selectedOptionLabel += anchor.textContent;
                                } else {
                                    anchor.parentElement.classList.remove('node-selected');
                                }
                            }
                        });

                        // set the default option label if none selected
                        if (!iweb_object.isValue(selectedOptionLabel)) {
                            selectedOptionLabel = ((iweb_object.isValue(e.target.getAttribute('data-default')))?e.target.getAttribute('data-default'):iweb_object.language[iweb_object.current_language]['please_select']);
                        }

                        // update the virtual result label
                        e.target.closest('div.iweb-select').querySelector('div.virtual > a.result').innerHTML = selectedOptionLabel;
                    }
                    
                    e.target.closest('div.iweb-select').classList.remove('error');
                    e.target.closest('div.iweb-select').querySelector('small.tips')?.remove();
                });
  
                // if the element is already contained in a "iweb-select" class, skip
                if (!select.closest('div.iweb-select')) {
                    if (isVirtual) {
                        // append new option if need
                        if (!isMultiple) {
                            let has_default_selected = false;
                            Array.from(select.options).forEach(function(option) {
                                if (iweb_object.isValue(option.getAttribute('selected'))) {
                                    has_default_selected = true;
                                }
                            });

                            const defaultOption = document.createElement('option');
                            defaultOption.value = '';
                            if (!has_default_selected) { 
                                defaultOption.setAttribute('selected', 'selected'); 
                            }
                            defaultOption.textContent = (iweb_object.isValue(select.dataset.default) ? select.dataset.default : iweb_object.language[iweb_object.current_language]['please_select']);
                            select.insertBefore(defaultOption, select.firstChild);
                        }
                        
                        // move the select element into a new wrapper div
                        const wrapperDiv = document.createElement('div');
                        wrapperDiv.classList.add('iweb-select');
                        if (isMultiple) { 
                            wrapperDiv.classList.add('iweb-select-multiple'); 
                        };

                        const realDiv = document.createElement('div');
                        realDiv.classList.add('real', 'hidden');
                        
                        select.parentNode.insertBefore(realDiv, select);
                        realDiv.appendChild(select);
                        
                        realDiv.parentNode.insertBefore(wrapperDiv, realDiv);
                        wrapperDiv.appendChild(realDiv);
                        
                        // create virtual div
                        let virtualSelect = '';
                        const virtualDiv = document.createElement('div');
                        virtualDiv.classList.add('virtual');

                        // create result section
                        const resultLink = document.createElement('a');
                        resultLink.classList.add('result');
                        resultLink.textContent = virtualSelect;
                        resultLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            
                            const virtualOptions = e.target.closest('div.iweb-select').querySelector('div.virtual > div.options > ul');
                            if (virtualOptions.offsetWidth > 0 || virtualOptions.offsetHeight > 0) {
                                e.target.closest('div.iweb-select').classList.remove('show');
                            } else {
                                e.target.closest('div.iweb-select').classList.add('show');
                            }
                            
                            document.querySelectorAll('div.iweb-select').forEach(otherSelector => {
                                const otherOptions = otherSelector.querySelector('div.virtual > div.options > ul');
                                if(otherOptions) {
                                    if (!iweb_object.isMatch(otherOptions.dataset.index, virtualOptions.dataset.index)) {
                                        otherSelector.classList.remove('show');
                                    }
                                }
                            });
                        });
                        virtualDiv.appendChild(resultLink);

                        // create options list
                        const optionsDiv = document.createElement('div');
                        optionsDiv.classList.add('options');
                        if(isPositionTop) {
                            optionsDiv.classList.add('top');
                        }
                        const optionsList = document.createElement('ul');
                        optionsList.setAttribute('data-index', 'iss' + select_index);

                        // create filter input
                        if (isFilter) {
                            const filterLi = document.createElement('li');
                            filterLi.classList.add('filter');

                            const placeholderText = (select.dataset.placeholder || '');
                            const filterInput = document.createElement('input');
                            filterInput.id = 'fkw_' + select_index;
                            filterInput.type = 'text';
                            filterInput.placeholder = placeholderText.trim();
                            filterInput.addEventListener('input', (e) => {
                                e.preventDefault();
                                
                                const fkw = e.target.value;
                                if (iweb_object.isValue(fkw)) {
                                    // find all node elements
                                    e.target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li.node > a').forEach(function(anchor) {
                                        // get the text of the anchor
                                        var textContent = anchor.textContent || anchor.innerText;
                                        if (textContent.toUpperCase().indexOf(fkw.toUpperCase()) > -1) {
                                            anchor.parentElement.classList.remove('hide');
                                            var parentNode = anchor.closest('li.node-parent');
                                            if (parentNode) {
                                                parentNode.classList.remove('hide');
                                            }
                                        } else {
                                            anchor.parentElement.classList.add('hide');
                                        }
                                    });
                                } else {
                                    // if filter is empty, remove 'hide' class from all node elements
                                    e.target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li.node').forEach(function(nodeElement) {
                                        nodeElement.classList.remove('hide');
                                    });
                                }
                            });
                            
                            filterLi.appendChild(filterInput);
                            optionsList.appendChild(filterLi);
                        }

                        // loop through options and create the list
                        if(select.children.length > 0) {
                            Array.from(select.children).forEach(function(optionGroup) {
                                if (optionGroup.children.length > 0) {
                                    const parentLi = document.createElement('li');
                                    parentLi.classList.add('node', 'node-parent');

                                    const parentLink = document.createElement('a');
                                    parentLink.textContent = optionGroup.getAttribute('label');
                                    parentLi.appendChild(parentLink);

                                    const childUl = document.createElement('ul');

                                    Array.from(optionGroup.children).forEach(function(option) {
                                        if (iweb_object.isValue(option.value)) {
                                            const childLi = document.createElement('li');
                                            childLi.classList.add('node');

                                            const childLink = document.createElement('a');
                                            childLink.dataset.value = option.value;
                                            childLink.textContent = option.textContent;
                                            childLink.addEventListener('click', (e) => {
                                                const isMultiple = e.target.closest('div.iweb-select').classList.contains('iweb-select-multiple');
                                                const selectElement = e.target.closest('div.iweb-select').querySelector('div.real > select');
                                                let selectedOptions = [];

                                                if (isMultiple) {
                                                    // handle multiple selection
                                                    selectElement.querySelectorAll('option').forEach(function(optionGroup) {
                                                        if (optionGroup.children.length > 0) {
                                                            Array.from(optionGroup.children).forEach(function(option) {
                                                                if (option.selected) {
                                                                    selectedOptions.push(option.value.toString());
                                                                }
                                                            });
                                                        } else if (optionGroup.selected) {
                                                            selectedOptions.push(optionGroup.value.toString());
                                                        }
                                                    });

                                                    var selectedValue = e.target.getAttribute('data-value').toString();
                                                    if (!selectedOptions.includes(selectedValue)) {
                                                        selectedOptions.push(selectedValue);
                                                    } else {
                                                        selectedOptions = selectedOptions.filter(function(value) {
                                                            return value !== selectedValue;
                                                        });
                                                    }
                                                    
                                                    // update the select element with selected options
                                                    selectElement.querySelectorAll('option').forEach(function(option) {
                                                        if (selectedOptions.includes(option.value.toString())) {
                                                            option.selected = true;
                                                        } else {
                                                            option.selected = false;
                                                        }
                                                    });
                                                    selectElement.dispatchEvent(new Event('change'));

                                                } else {
                                                    // handle single selection
                                                    e.target.closest('div.iweb-select').classList.remove('show');
                                                    selectElement.value = e.target.getAttribute('data-value');
                                                    selectElement.dispatchEvent(new Event('change'));
                                                }
                                            });

                                            if (option.selected) {
                                                childLi.classList.add('node-selected');
                                                childLi.dataset.ori = 'selected';
                                                virtualSelect += (virtualSelect ? ', ' : '');
                                                virtualSelect += option.textContent;
                                            }

                                            childLi.appendChild(childLink);
                                            childUl.appendChild(childLi);
                                        }
                                    });

                                    parentLi.appendChild(childUl);
                                    optionsList.appendChild(parentLi);
                                } 
                                else {
                                    if (iweb_object.isValue(optionGroup.value)) {
                                        const singleLi = document.createElement('li');
                                        singleLi.classList.add('node');

                                        const singleLink = document.createElement('a');
                                        singleLink.dataset.value = optionGroup.value;
                                        singleLink.textContent = optionGroup.textContent;
                                        singleLink.addEventListener('click', (e) => {
                                            const isMultiple = e.target.closest('div.iweb-select').classList.contains('iweb-select-multiple');
                                            const selectElement = e.target.closest('div.iweb-select').querySelector('div.real > select');
                                            let selectedOptions = [];

                                            if (isMultiple) {
                                                // handle multiple selection
                                                selectElement.querySelectorAll('option').forEach(function(optionGroup) {
                                                    if (optionGroup.children.length > 0) {
                                                        Array.from(optionGroup.children).forEach(function(option) {
                                                            if (option.selected) {
                                                                selectedOptions.push(option.value.toString());
                                                            }
                                                        });
                                                    } else if (optionGroup.selected) {
                                                        selectedOptions.push(optionGroup.value.toString());
                                                    }
                                                });

                                                var selectedValue = e.target.getAttribute('data-value').toString();
                                                if (!selectedOptions.includes(selectedValue)) {
                                                    selectedOptions.push(selectedValue);
                                                } else {
                                                    selectedOptions = selectedOptions.filter(function(value) {
                                                        return value !== selectedValue;
                                                    });
                                                }
           
                                                // update the select element with selected options
                                                selectElement.querySelectorAll('option').forEach(function(option) {
                                                    if (selectedOptions.includes(option.value.toString())) {
                                                        option.selected = true;
                                                    } else {
                                                        option.selected = false;
                                                    }
                                                });
                                                selectElement.dispatchEvent(new Event('change'));

                                            } 
                                            else {
                                                // handle single selection
                                                e.target.closest('div.iweb-select').classList.remove('show');
                                                selectElement.value = e.target.getAttribute('data-value');
                                                selectElement.dispatchEvent(new Event('change'));
                                            }
                                        });

                                        if (optionGroup.selected) {
                                            singleLi.classList.add('node-selected');
                                            singleLi.dataset.ori = 'selected';
                                            virtualSelect += (virtualSelect ? ', ' : '');
                                            virtualSelect += optionGroup.textContent;
                                        }

                                        singleLi.appendChild(singleLink);
                                        optionsList.appendChild(singleLi);
                                    }
                                }
                            });
                        }

                        // set the default select text if nothing is selected
                        if (!iweb_object.isValue(virtualSelect)) {
                            virtualSelect = (iweb_object.isValue(select.dataset.default) ? select.dataset.default : iweb_object.language[iweb_object.current_language]['please_select']);
                        }
                        resultLink.textContent = virtualSelect; 
          
                        // append options list to options div
                        optionsDiv.appendChild(optionsList);
                        virtualDiv.appendChild(optionsDiv);
                        wrapperDiv.appendChild(virtualDiv);
                    } else {
                        // move the select element into a new wrapper div
                        const wrapperDiv = document.createElement('div');
                        wrapperDiv.classList.add('iweb-select');

                        const realDiv = document.createElement('div');
                        realDiv.classList.add('real');

                        select.parentNode.insertBefore(realDiv, select);
                        realDiv.appendChild(select);

                        realDiv.parentNode.insertBefore(wrapperDiv, realDiv);
                        wrapperDiv.appendChild(realDiv);
                    }
                }
            });
        }
        
        // callback
        if (iweb_object.isMatch((typeof callback), 'function')) {
            callback();
        }
    }
    
    checkBox(checkbox_object = null, callback = null) {
        var iweb_object = this;
        
        if (!iweb_object.isValue(checkbox_object)) {
            checkbox_object = document.querySelectorAll('input[type="checkbox"]');
        }
        
        if(checkbox_object.length > 0) {
            checkbox_object.forEach(function(checkbox) {
                // check if the parent elements have the class 'iweb-checkbox'
                if (!checkbox.closest('div.iweb-checkbox')) {
                    const findCheckboxLabel = checkbox.nextElementSibling;
                    
                    const wrapperDiv = document.createElement('div');
                    wrapperDiv.classList.add('iweb-checkbox');
                    if(checkbox.checked) {
                        wrapperDiv.classList.add('checked');
                    }
                    
                    // move the checkbox element into a new wrapper div 
                    checkbox.parentNode.insertBefore(wrapperDiv, checkbox);
                    wrapperDiv.appendChild(checkbox);
                    if(findCheckboxLabel) {
                        findCheckboxLabel.parentNode.insertBefore(wrapperDiv, findCheckboxLabel);
                        wrapperDiv.appendChild(findCheckboxLabel);
                    }
                    
                    
                    // bind event
                    checkbox.addEventListener('change', (e) => {
                        e.preventDefault();
                        const relatedObject = document.querySelectorAll('input[type="checkbox"][name="' + (e.target.name) + '"]');
                        relatedObject.forEach(function(related_checkbox) {
                            if(related_checkbox.checked) {
                                related_checkbox.closest('div.iweb-checkbox').classList.add('checked');
                            } else {
                                related_checkbox.closest('div.iweb-checkbox').classList.remove('checked');
                            }
                            related_checkbox.closest('div.iweb-checkbox').classList.remove('error');
                        });
                        e.target.closest('div.iweb-checkbox-set').querySelector('small.tips')?.remove();
                    });
                }
            });
        }

        // callback
        if (iweb_object.isMatch((typeof callback), 'function')) {
            callback();
        }
    }
    
    radioBox(raido_object = null, callback = null) {
        var iweb_object = this;
        
        if (!iweb_object.isValue(raido_object)) {
            raido_object = document.querySelectorAll('input[type="radio"]');
        }
        
        if(raido_object.length > 0) {
            raido_object.forEach(function(raido) {
                // check if the parent elements have the class 'iweb-raido'
                if (!raido.closest('div.iweb-raido')) {
                    const findCheckboxLabel = raido.nextElementSibling;
                    
                    const wrapperDiv = document.createElement('div');
                    wrapperDiv.classList.add('iweb-radio');
                    if(raido.checked) {
                        wrapperDiv.classList.add('checked');
                    }
                    
                    // move the raido element into a new wrapper div 
                    raido.parentNode.insertBefore(wrapperDiv, raido);
                    wrapperDiv.appendChild(raido);
                    if(findCheckboxLabel) {
                        findCheckboxLabel.parentNode.insertBefore(wrapperDiv, findCheckboxLabel);
                        wrapperDiv.appendChild(findCheckboxLabel);
                    }
                    
                    // bind event
                    raido.addEventListener('change', (e) => {
                        e.preventDefault();
                        const selectedValue = e.target.value;
                        const relatedObject = document.querySelectorAll('input[type="radio"][name="' + (e.target.name) + '"]');
                        relatedObject.forEach(function(related_radio) {
                            if (iweb_object.isMatch(related_radio.value, selectedValue)) {
                                related_radio.checked = true;
                                related_radio.closest('div.iweb-radio').classList.add('checked');
                            } else {
                                related_radio.checked = false;
                                related_radio.closest('div.iweb-radio').classList.remove('checked');
                            }
                            related_radio.closest('div.iweb-radio').classList.remove('error');
                        });
                        e.target.closest('div.iweb-radio-set').querySelector('small.tips')?.remove();
                    });
                }
            });
        }

        // callback
        if (iweb_object.isMatch((typeof callback), 'function')) {
            callback();
        }
    }

    // validation
    isValue(value) {
        if (((typeof value).toString().toLocaleString()) !== 'undefined' && value !== null) {
            if (((typeof value).toString().toLocaleString()) === 'object' || Array.isArray(value)) {
                return ((Object.keys(value).length) > 0);
            } else {
                return ((value.toString().trim()) !== '');
            }
        }
        
        return false;
    }
    
    isMatch(value1, value2, sensitive = false) {
        const iweb_object = this;
        
        if (iweb_object.isValue(value1) && iweb_object.isValue(value2)) {
            const trimmedValue1 = (value1.toString().trim());
            const trimmedValue2 = (value2.toString().trim());
            return (sensitive)?(trimmedValue1 === trimmedValue2):(trimmedValue1.toLowerCase() === trimmedValue2.toLowerCase());
        }
        
        return false;
    }
    
    isNumber(value, digital_mode = false) {
        const iweb_object = this;
        const reg = ((digital_mode)?/^[0-9]+$/:/(^((-)?[1-9]{1}\d{0,2}|0\.|0$))(((\d)+)?)(((\.)(\d+))?)$/);
        
        if (iweb_object.isValue(value)) {
            return reg.test(value);
        }
        
        return false;
    }
    
    isEmail(value) {
        const iweb_object = this;
        const reg = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,}$/;
        
        if (iweb_object.isValue(value)) {
            return reg.test(value);
        }
        
        return false;
    }

    isPassword(value) {
        const iweb_object = this;
        const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        
        if (iweb_object.isValue(value)) {
            return reg.test(value);
        }
        
        return false;
    }

    isDate(value, format = 'Y-m-d') {
        const iweb_object = this;
        const reg = /^(\d{4})(\-)(\d{2})(\-)(\d{2})$/;
        
        if (iweb_object.isValue(value)) {
            if (!iweb_object.isMatch(format, 'Y-m-d')) {
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
                }
                else {
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
                
                return ((new Date(value) instanceof Date) && ymd_checking);
            }
        }
        
        return false;
    }
    
    // convert
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
    
    toDateTime(value = null, format = 'Y-m-d H:i:s') {
        const iweb_object = this;
        
        let now = ((iweb_object.isValue(value))?new Date(value):new Date());
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
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
        
        let dateTime = '';
        switch (format) {
            case 'Y-m-d H:i:s':
                dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'Y-m-d H:i':
                dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
                break;
            case 'd/m/Y H:i:s':
                dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 'd/m/Y H:i':
                dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
                break;
            case 'Y-m-d':
                dateTime = year + '-' + month + '-' + day;
                break;
            case 'd/m/Y':
                dateTime = day + '/' + month + '/' + year;
                break;
            case 'H:i:s':
                dateTime = hour + ':' + minute + ':' + second;
                break;
            case 'H:i':
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
    
    // cookie
    setCookie(cname, cvalue, exdays = 14) {
        const iweb_object = this;
        
        if (navigator.cookieEnabled) {
            if (iweb_object.isValue(cname)) {
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

    // ajax post
    async ajaxPost(post_data = null, callback = null, final_callback = null) {
        const iweb_object = this;
        
        // merge post data
        post_data = Object.assign(
        {   
            dataType: 'json',
            showBusy: true,
            url: '',
            values: {}
        }, post_data);
        
        if (!iweb_object.is_busy && iweb_object.isValue(post_data.url)) {
            const local_time = iweb_object.toDateTime();
            let formData = new FormData();
            
            formData.append('itoken', window.btoa(iweb_object.imd5.hash(iweb_object.csrf_token + '#dt' + local_time) + '%' + local_time));
            if(post_data.values) {
                for (let key in post_data.values) {
                    formData.append(key, post_data.values[key]);
                }
            }
            
            // try to fetch
            try {
                if (iweb_object.isMatch(post_data.showBusy, true) || iweb_object.isMatch(post_data.showBusy, 1) || iweb_object.isMatch(post_data.showBusy, 2)) {
                    iweb_object.showBusy(true, 70);
                }
                
                iweb_object.is_busy = true;

                const response = await fetch(post_data.url, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    // return the response based on the specified format
                    let responseData;
                    switch (post_data.dataType.toLowerCase()) {
                        case 'json':
                            responseData = await response.json();
                            break;
                        case 'blob':
                            responseData = await response.blob();
                            break;
                        default:
                            responseData = await response.text();
                            break;
                    }
                    
                    // callback
                    if (typeof callback === 'function') {
                        callback(responseData);
                    }
                } else {
                    throw new Error(response.statusText);
                }
            } catch (error) {
                // show error
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
                // reset
                iweb_object.is_busy = false;
                if (iweb_object.isMatch(post_data.showBusy, true) || iweb_object.isMatch(post_data.showBusy, 1) || iweb_object.isMatch(post_data.showBusy, 2)) {
                    if (!iweb_object.isMatch(post_data.showBusy, 2)) {
                        iweb_object.showBusy(false);
                    }
                }

                // callback
                if (iweb_object.isMatch((typeof final_callback), 'function')) {
                    final_callback();
                }
            }
        }
    }
    
    // dialog
    alert(message = '', callback = null, options = {}) {
        // prevent duplicate alert dialogs
        if (document.querySelectorAll('div.iweb-alert-dialog').length > 0) {
            return;
        }

        const iweb_object = this;

        // setting
        const setting = {
            customizeClass: '',
            btnClose: iweb_object.language[iweb_object.current_language]['btn_confirm']
        };
        if (iweb_object.isValue(options)) {
            Object.assign(setting, options);
        }

        // create the alert dialog element
        const alertDialog = document.createElement('div');
        alertDialog.classList.add('iweb-alert-dialog');
        if(iweb_object.isValue(setting.customizeClass)) {
            alertDialog.classList.add(setting.customizeClass);
        }
        
        const innerDiv = document.createElement('div');
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        contentDiv.style.transform = 'translateY(-320%)';
        contentDiv.style.opacity = '0';
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = message;

        // create the close button
        const closeButton = document.createElement('button');
        closeButton.classList.add('btn');
        closeButton.classList.add('btn-close');
        closeButton.textContent = setting.btnClose;
        closeButton.addEventListener('click', function(e) {
            // close & reset
            contentDiv.style.transform = 'translateY(-320%)';
            contentDiv.style.transform = '0'; 
            contentDiv.addEventListener('transitionend', function () {
                e.target.closest('div.iweb-alert-dialog').remove();
                if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                    document.body.classList.remove('iweb-disable-scroll');
                }

                // callback if need
                if (iweb_object.isMatch((typeof callback), 'function')) {
                    callback();
                }
            }, { once: true });
        });

        // append to body
        const viewer = document.querySelector('div.iweb-viewer');
        innerDiv.appendChild(contentDiv);
        contentDiv.appendChild(messageDiv);
        contentDiv.appendChild(closeButton);
        alertDialog.appendChild(innerDiv);
        viewer.insertBefore(alertDialog, viewer.firstChild);
        document.body.classList.add('iweb-disable-scroll');
        
        // show dialog
        iweb_object.delay_timer = setTimeout(function() {
            clearTimeout(iweb_object.delay_timer);
            contentDiv.style.transform = 'translateY(0)';
            contentDiv.style.opacity = '1';
        }, 10);
    }
    
    confirm(message = '', callback = null, options = {}) {
        // prevent duplicate alert dialogs
        if (document.querySelectorAll('div.iweb-alert-dialog').length > 0) {
            return;
        }

        const iweb_object = this;

        // setting
        const setting = {
            customizeClass: '',
            btnYes: iweb_object.language[iweb_object.current_language]['btn_yes'],
            btnNo: iweb_object.language[iweb_object.current_language]['btn_no']
        };
        if (iweb_object.isValue(options)) {
            Object.assign(setting, options);
        }

        // create the alert dialog element
        const alertDialog = document.createElement('div');
        alertDialog.classList.add('iweb-alert-dialog');
        if(iweb_object.isValue(setting.customizeClass)) {
            alertDialog.classList.add(setting.customizeClass);
        }
        
        const innerDiv = document.createElement('div');
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        contentDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        contentDiv.style.transform = 'translateY(-320%)';
        contentDiv.style.opacity = '0';
        
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = message;

        // create the yes/no button
        const yesButton = document.createElement('button');
        yesButton.classList.add('btn');
        yesButton.classList.add('btn-yes');
        yesButton.textContent = setting.btnYes;
        yesButton.addEventListener('click', function(e) {
            // close & reset
            contentDiv.style.transform = 'translateY(-320%)';
            contentDiv.style.transform = '0'; 
            contentDiv.addEventListener('transitionend', function () {
                e.target.closest('div.iweb-alert-dialog').remove();
                if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                    document.body.classList.remove('iweb-disable-scroll');
                }

                // callback if need
                if (iweb_object.isMatch((typeof callback), 'function')) {
                    callback(true);
                }
            }, { once: true });
        });
        
        const noButton = document.createElement('button');
        noButton.classList.add('btn');
        noButton.classList.add('btn-no');
        noButton.textContent = setting.btnNo;
        noButton.addEventListener('click', function(e) {
            // close & reset
            contentDiv.style.transform = 'translateY(-320%)';
            contentDiv.style.transform = '0'; 
            contentDiv.addEventListener('transitionend', function () {
                e.target.closest('div.iweb-alert-dialog').remove();
                if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                    document.body.classList.remove('iweb-disable-scroll');
                }

                // callback if need
                if (iweb_object.isMatch((typeof callback), 'function')) {
                    callback(false);
                }
            }, { once: true });
        });

        // append to body
        const viewer = document.querySelector('div.iweb-viewer');
        innerDiv.appendChild(contentDiv);
        contentDiv.appendChild(messageDiv);
        contentDiv.appendChild(yesButton);
        contentDiv.appendChild(noButton);
        alertDialog.appendChild(innerDiv);
        viewer.insertBefore(alertDialog, viewer.firstChild);
        document.body.classList.add('iweb-disable-scroll');
        
        // show dialog
        iweb_object.delay_timer = setTimeout(function() {
            clearTimeout(iweb_object.delay_timer);
            contentDiv.style.transform = 'translateY(0)';
            contentDiv.style.opacity = '1';
        }, 10);
    }
    
    dialog(htmlCode, initFunc, callback, customizeClass) {
        // Check if a dialog already exists
        if (document.querySelector('div.iweb-info-dialog')) {
            return;
        }

        var iwebObject = this;

        // Create the dialog structure using native JS
        var dialogWrapper = document.createElement('div');
        dialogWrapper.className = 'iweb-info-dialog' + (customizeClass ? ' ' + customizeClass : '');

        // Create loading element
        var loadingDiv = document.createElement('div');
        loadingDiv.className = 'dialog-loading';
        loadingDiv.innerHTML = `
            <svg width="48px" height="48px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#dddddd" stroke-width="10" r="36" stroke-dasharray="169.64600329384882 58.548667764616276">
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        `;
        dialogWrapper.appendChild(loadingDiv);

        // Create dialog mask
        var maskDiv = document.createElement('div');
        maskDiv.className = 'dialog-mask';
        dialogWrapper.appendChild(maskDiv);

        // Create dialog content container
        const innerDiv = document.createElement('div');
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        contentDiv.innerHTML = `
            <a class="btn btn-close"><div></div></a>
            <div>${htmlCode}</div>
        `;
        innerDiv.appendChild(contentDiv);                                                                    
        dialogWrapper.appendChild(innerDiv);

        document.querySelector('div.iweb-viewer').prepend(dialogWrapper);
        document.body.classList.add('iweb-disable-scroll');

        // Close dialog function
        function closeDialog() {
            document.querySelector('div.iweb-tips-message')?.remove();
            dialogWrapper.remove();
            document.body.classList.remove('iweb-disable-scroll');
            if (typeof callback === 'function') {
                callback();
            }
        }

        // Add event listeners for closing the dialog
        maskDiv.addEventListener('click', closeDialog);
        contentDiv.querySelector('a.btn-close').addEventListener('click', closeDialog);

        // Delay to remove loading indicator and fade in dialog content
        setTimeout(function () {
            loadingDiv.remove(); // Remove loading indicator
            contentDiv.style.opacity = '1'; // Fade in dialog content
            if (typeof initFunc === 'function') {
                initFunc();
            }
        }, 250);

        // Initial style for dialog content (hidden before fade in)
        contentDiv.style.opacity = '0'; // Initially hidden
    }

    
    // others
    showBusy (status, value) {
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

class iMD5 {
    constructor() {
        this.hex_chr = '0123456789abcdef'.split('');
    }

    add32(a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    cmn(q, a, b, x, s, t) {
        return this.add32((this.add32(this.add32(a, q), this.add32(x, t)) << s) | (this.add32(this.add32(a, q), this.add32(x, t)) >>> (32 - s)), b);
    }

    ff(a, b, c, d, x, s, t) {
        return this.cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    gg(a, b, c, d, x, s, t) {
        return this.cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    hh(a, b, c, d, x, s, t) {
        return this.cmn(b ^ c ^ d, a, b, x, s, t);
    }

    ii(a, b, c, d, x, s, t) {
        return this.cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    md5cycle(x, k) {
        let a = x[0], b = x[1], c = x[2], d = x[3];

        a = this.ff(a, b, c, d, k[0], 7, -680876936);
        d = this.ff(d, a, b, c, k[1], 12, -389564586);
        c = this.ff(c, d, a, b, k[2], 17, 606105819);
        b = this.ff(b, c, d, a, k[3], 22, -1044525330);
        a = this.ff(a, b, c, d, k[4], 7, -176418897);
        d = this.ff(d, a, b, c, k[5], 12, 1200080426);
        c = this.ff(c, d, a, b, k[6], 17, -1473231341);
        b = this.ff(b, c, d, a, k[7], 22, -45705983);
        a = this.ff(a, b, c, d, k[8], 7, 1770035416);
        d = this.ff(d, a, b, c, k[9], 12, -1958414417);
        c = this.ff(c, d, a, b, k[10], 17, -42063);
        b = this.ff(b, c, d, a, k[11], 22, -1990404162);
        a = this.ff(a, b, c, d, k[12], 7, 1804603682);
        d = this.ff(d, a, b, c, k[13], 12, -40341101);
        c = this.ff(c, d, a, b, k[14], 17, -1502002290);
        b = this.ff(b, c, d, a, k[15], 22, 1236535329);

        a = this.gg(a, b, c, d, k[1], 5, -165796510);
        d = this.gg(d, a, b, c, k[6], 9, -1069501632);
        c = this.gg(c, d, a, b, k[11], 14, 643717713);
        b = this.gg(b, c, d, a, k[0], 20, -373897302);
        a = this.gg(a, b, c, d, k[5], 5, -701558691);
        d = this.gg(d, a, b, c, k[10], 9, 38016083);
        c = this.gg(c, d, a, b, k[15], 14, -660478335);
        b = this.gg(b, c, d, a, k[4], 20, -405537848);
        a = this.gg(a, b, c, d, k[9], 5, 568446438);
        d = this.gg(d, a, b, c, k[14], 9, -1019803690);
        c = this.gg(c, d, a, b, k[3], 14, -187363961);
        b = this.gg(b, c, d, a, k[8], 20, 1163531501);
        a = this.gg(a, b, c, d, k[13], 5, -1444681467);
        d = this.gg(d, a, b, c, k[2], 9, -51403784);
        c = this.gg(c, d, a, b, k[7], 14, 1735328473);
        b = this.gg(b, c, d, a, k[12], 20, -1926607734);

        a = this.hh(a, b, c, d, k[5], 4, -378558);
        d = this.hh(d, a, b, c, k[8], 11, -2022574463);
        c = this.hh(c, d, a, b, k[11], 16, 1839030562);
        b = this.hh(b, c, d, a, k[14], 23, -35309556);
        a = this.hh(a, b, c, d, k[1], 4, -1530992060);
        d = this.hh(d, a, b, c, k[4], 11, 1272893353);
        c = this.hh(c, d, a, b, k[7], 16, -155497632);
        b = this.hh(b, c, d, a, k[10], 23, -1094730640);
        a = this.hh(a, b, c, d, k[13], 4, 681279174);
        d = this.hh(d, a, b, c, k[0], 11, -358537222);
        c = this.hh(c, d, a, b, k[3], 16, -722521979);
        b = this.hh(b, c, d, a, k[6], 23, 76029189);
        a = this.hh(a, b, c, d, k[9], 4, -640364487);
        d = this.hh(d, a, b, c, k[12], 11, -421815835);
        c = this.hh(c, d, a, b, k[15], 16, 530742520);
        b = this.hh(b, c, d, a, k[2], 23, -995338651);

        a = this.ii(a, b, c, d, k[0], 6, -198630844);
        d = this.ii(d, a, b, c, k[7], 10, 1126891415);
        c = this.ii(c, d, a, b, k[14], 15, -1416354905);
        b = this.ii(b, c, d, a, k[5], 21, -57434055);
        a = this.ii(a, b, c, d, k[12], 6, 1700485571);
        d = this.ii(d, a, b, c, k[3], 10, -1894986606);
        c = this.ii(c, d, a, b, k[10], 15, -1051523);
        b = this.ii(b, c, d, a, k[1], 21, -2054922799);
        a = this.ii(a, b, c, d, k[8], 6, 1873313359);
        d = this.ii(d, a, b, c, k[15], 10, -30611744);
        c = this.ii(c, d, a, b, k[6], 15, -1560198380);
        b = this.ii(b, c, d, a, k[13], 21, 1309151649);
        a = this.ii(a, b, c, d, k[4], 6, -145523070);
        d = this.ii(d, a, b, c, k[11], 10, -1120210379);
        c = this.ii(c, d, a, b, k[2], 15, 718787259);
        b = this.ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = this.add32(a, x[0]);
        x[1] = this.add32(b, x[1]);
        x[2] = this.add32(c, x[2]);
        x[3] = this.add32(d, x[3]);
    }

    md51(s) {
        let n = s.length;
        let state = [1732584193, -271733879, -1732584194, 271733878];
        let i;

        for (i = 64; i <= s.length; i += 64) {
            this.md5cycle(state, this.md5blk(s.substring(i - 64, i)));
        }

        s = s.substring(i - 64);

        let tail = new Array(16).fill(0);
        for (i = 0; i < s.length; i++) {
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        }
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);

        if (i > 55) {
            this.md5cycle(state, tail);
            tail = new Array(16).fill(0);
        }

        tail[14] = n * 8;

        this.md5cycle(state, tail);

        return state;
    }

    md5blk(s) {
        let md5blks = [];
        for (let i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    rhex(n) {
        let s = '';
        for (let j = 0; j < 4; j++) {
            s += this.hex_chr[(n >> (j * 8 + 4)) & 0x0F] + this.hex_chr[(n >> (j * 8)) & 0x0F];
        }
        return s;
    }

    hex(x) {
        for (let i = 0; i < x.length; i++) {
            x[i] = this.rhex(x[i]);
        }
        return x.join('');
    }

    hash(s) {
        return this.hex(this.md51(s));
    }
}

class iDatePicker {
    constructor(lang = 'en', dateFormat = 'YYYY-MM-DD') {
        this.lang = lang; // Language setting, defaulting to English
        this.dateFormat = dateFormat; // Date format, defaulting to 'YYYY-MM-DD'
        this.calendarElement = null; // Reference to the calendar element
        this.currentDate = new Date(); // Current displayed date in the calendar
        this.selectedDate = null; // Currently selected date
        this.activeInputElement = null; // Currently focused input element
        document.addEventListener('click', (e) => this.onClickOutside(e));
    }
    
    render(elements) {
        // Add event listeners to new input elements if not already present
        const inputElements = document.querySelectorAll(elements);
        if(inputElements) {
            inputElements.forEach(inputElement => {
                if (!inputElement.classList.contains('idatepicker')) {
                    inputElement.type = 'text';
                    inputElement.classList.add('idatepicker');
                    inputElement.addEventListener('focus', () => this.onFocusInput(inputElement));
                }
            });
        }
    }

    onFocusInput(inputElement) {
        // Update the calendar date based on the input value if present
        const inputValue = inputElement.value;

        // Check if the input value matches the expected date format
        if (inputValue && this.isValidDateFormat(inputValue)) {
            this.currentDate = this.parseDate(inputValue); // Parse the input date
            this.selectedDate = new Date(this.currentDate);
        } else {
            // If the input format is incorrect, use the current date
            this.currentDate = new Date();
            this.selectedDate = null; // Clear the selected date
        }

        this.activeInputElement = inputElement; // Set the active input element
        this.showCalendar(inputElement); // Display the calendar
    }

    onClickOutside(event) {
        // Hide the calendar if clicking outside of the input or calendar element
        if (this.calendarElement && !event.target.closest('input.idatepicker') && !event.target.closest('div.idatepicker-calendar')) {
            this.hideCalendar();
        }
    }

    showCalendar(inputElement) {
        // Remove existing calendar if present
        if (this.calendarElement) {
            this.calendarElement.remove();
        }

        // Create a new calendar element with basic styling
        this.calendarElement = this.createElement('div', {
            position: 'absolute',
            backgroundColor: '#fff',
            fontSize: '12px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            zIndex: '10'
        }, 'idatepicker-calendar');

        document.body.appendChild(this.calendarElement);

        // Position the calendar below the input element
        const rect = inputElement.getBoundingClientRect();
        this.calendarElement.style.top = `${rect.bottom + window.scrollY}px`;
        this.calendarElement.style.left = `${rect.left + window.scrollX}px`;

        this.buildCalendar(); // Build the calendar UI
    }

    hideCalendar() {
        // Remove the calendar from the DOM
        if (this.calendarElement) {
            this.calendarElement.remove();
            this.calendarElement = null;
        }
    }

    buildCalendar() {
        const currentYear = this.currentDate.getFullYear();
        const currentMonth = this.currentDate.getMonth();
        this.calendarElement.innerHTML = ''; // Clear previous calendar content

        const headerDiv = this.createHeader(); // Create header with navigation
        const table = this.createCalendarTable(currentYear, currentMonth); // Create calendar table

        this.calendarElement.appendChild(headerDiv);
        this.calendarElement.appendChild(table);
    }

    createHeader() {
        // Create the header with previous and next month buttons and current month/year display
        const headerDiv = this.createElement('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0px 10px 0px' });

        const prevButton = this.createButton('🞀', 'prev-month', () => this.changeMonth(-1)); // Button to go to the previous month
        const monthYearSpan = this.createElement('span', { fontSize: '14px', fontWeight: 'bold' });
        monthYearSpan.textContent = `${this.currentDate.toLocaleString(this.lang === 'en' ? 'en' : 'zh', { month: 'short' })} / ${this.currentDate.getFullYear()}`;

        const nextButton = this.createButton('🞂', 'next-month', () => this.changeMonth(1)); // Button to go to the next month

        headerDiv.appendChild(prevButton);
        headerDiv.appendChild(monthYearSpan);
        headerDiv.appendChild(nextButton);

        return headerDiv;
    }

    createButton(text, id, onClick) {
        // Create a button with specified text, ID, and click event handler
        const button = this.createElement('button', {
            position: 'relative',
            backgroundColor: '#2ca4e9',
            fontSize: '12px',
            color: '#fff',
            padding: '3px 6px',
            border: 'none',
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            boxSizing: 'border-box',
            cursor: 'pointer'
        });
        button.id = id;
        button.textContent = text;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            onClick();
        });
        return button;
    }

    changeMonth(delta) {
        // Adjust the displayed month by the delta value (e.g., -1 for previous month, 1 for next month)
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.buildCalendar(); // Rebuild the calendar with the new month
    }

    createCalendarTable(year, month) {
        // Create the main table structure for the calendar
        const table = this.createElement('table', { width: '100%', borderCollapse: 'collapse' });
        const thead = this.createTableHeader(); // Create table header with day names
        const tbody = this.createTableBody(year, month); // Create table body with date cells

        table.appendChild(thead);
        table.appendChild(tbody);
        return table;
    }

    createTableHeader() {
        // Create the header row with day names based on language setting
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const days = (this.lang === 'en') ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['日', '一', '二', '三', '四', '五', '六'];
        days.forEach(day => {
            const th = this.createElement('th', {
                width: '36px',
                height: '28px',
                fontSize: '12px',
                color: '#2ca4e9',
                padding: '4px',
                border: '1px solid #e6e6e6',
                boxSizing: 'border-box',
                textAlign: 'center'
            });
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        return thead;
    }

    createTableBody(year, month) {
        // Create the body of the calendar with day cells
        const tbody = document.createElement('tbody');
        const firstDayOfMonth = new Date(year, month, 1).getDay(); // Get the day of the week for the first day of the month
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the current month

        const prevMonthDays = new Date(year, month, 0).getDate(); // Total days in the previous month
        let startDay = prevMonthDays - firstDayOfMonth + 1; // Start day for the leading dates from the previous month

        let day = 1;
        let nextMonthDay = 1;

        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            const row = document.createElement('tr');

            for (let colIndex = 0; colIndex < 7; colIndex++) {
                let td;

                if (rowIndex === 0 && colIndex < firstDayOfMonth) {
                    // Display days from the previous month
                    const dateObj = this.formatDate(new Date(year, month - 1, startDay++));
                    td = this.createDateCell(startDay - 1, dateObj, true);
                } else if (day > daysInMonth) {
                    // Display days from the next month
                    const dateObj = this.formatDate(new Date(year, month + 1, nextMonthDay));
                    td = this.createDateCell(nextMonthDay++, dateObj, true);
                } else {
                    // Display days from the current month
                    const dateObj = this.formatDate(new Date(year, month, day));
                    td = this.createDateCell(day++, dateObj, false);
                }

                row.appendChild(td);
            }

            tbody.appendChild(row);
        }

        return tbody;
    }

    createDateCell(day, dateObj, isOtherMonth) {
        // Create a table cell representing a day in the calendar
        const td = this.createElement('td', {
            backgroundColor: this.selectedDate && dateObj === this.formatDate(this.selectedDate) ? '#2ca4e9' : '',
            width: '36px',
            height: '28px',
            fontSize: '12px',
            color: isOtherMonth ? '#aaa' : this.selectedDate && dateObj === this.formatDate(this.selectedDate) ? '#fff' : '',
            padding: '4px',
            border: '1px solid #e6e6e6',
            boxSizing: 'border-box',
            textAlign: 'center',
            cursor: 'pointer'
        });
        td.dataset.date = dateObj; // Store the date value in the cell
        td.textContent = day;
        td.addEventListener('click', () => this.onDateSelect(dateObj)); // Add event listener for date selection
        return td;
    }

    onDateSelect(dateObj) {
        // Parse the date from the formatted string
        const selectedDate = this.parseDate(dateObj);
        if (!isNaN(selectedDate)) {
            this.activeInputElement.value = this.formatDate(selectedDate);
            this.activeInputElement.dispatchEvent(new Event('input'));
            this.selectedDate = selectedDate;
            this.buildCalendar();
            this.hideCalendar();
        }
    }

    createElement(tag, styles = {}, className) {
        // Create an HTML element with optional class and styles
        const el = document.createElement(tag);
        if (className) el.className = className;
        Object.assign(el.style, styles);
        return el;
    }
    
    isValidDateFormat(dateString) {
        // Define the regex pattern based on the specified date format
        let regex;
        if ((this.dateFormat.toString().toUpperCase()) === 'DD/MM/YYYY') {
            // Match DD/MM/YYYY format, e.g., 25/12/2024
            regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        } else {
            // Default to YYYY-MM-DD format, e.g., 2024-12-25
            regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        }

        // Return whether the input matches the regex pattern
        return regex.test(dateString);
    }
    
    parseDate(dateString) {
        // Parse date based on the specified format
        const [year, month, day] = (this.dateFormat.toString().toUpperCase()) === 'DD/MM/YYYY'
            ? dateString.split('/').map(Number).reverse()
            : dateString.split('-').map(Number);

        // Return a new Date object based on parsed values
        return new Date(year, month - 1, day);
    }

    formatDate(date) {
        // Format a date object into a string based on the specified dateFormat
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Return the date formatted according to the specified dateFormat
        if ((this.dateFormat.toString().toUpperCase())=== 'DD/MM/YYYY') {
            return `${day}/${month}/${year}`;
        }
        return `${year}-${month}-${day}`; // Default format: YYYY-MM-DD
    }
}
