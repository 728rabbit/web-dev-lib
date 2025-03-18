class iwebApp {
	constructor() {
		this.current_language = 'en';
		this.language = {
			en: {
				btn_confirm: 'OK',
				btn_yes: 'Yes',
				btn_no: 'No',
				please_select: 'Please Select',
                no_record_found:  'No record found',
				type_error: 'File type is not allowed.',
				max_error: 'Maximum allowed file size {num}M.',
				required_error: 'This field is required.',
				password_error: 'Password must contain at least 6 characters, including upper/lowercase and numbers (e.g. Abc123).',
				email_error: 'Invalid email address format.',
				number_error: 'Invalid number format.',
				date_error: 'Invalid date format.',
                time_error: 'Invalid time format.',
                ge0_error: 'Value must be greater than or equal to 0.',
                gt0_error: 'Value must be greater than 0.'
			},
			zh_hant: {
				btn_confirm: '確定',
				btn_yes: '是',
				btn_no: '否',
				please_select: '請選擇',
                no_record_found:  '找不到相關記錄',
				type_error: '不允許的檔案類型。',
				max_error: '檔案大小不能超過{num}M。',
				required_error: '此項目必須填寫。',
				password_error: '密碼必須至少包含6個字符，包括大寫/小寫和數字(例如Abc123)。',
				email_error: '無效的郵件地址格式。',
				number_error: '無效的數字格式。',
				date_error: '無效的日期格式。',
                time_error: '無效的時間格式。',
                ge0_error: '數值必須大於或等於 0。',
                gt0_error: '數值必須大於 0。'
			},
			zh_hans: {
				btn_confirm: '确定',
				btn_yes: '是',
				btn_no: '否',
				please_select: '请选择',
                no_record_found:  '找不到相关记录',
				type_error: '不允许的档案类型。',
				max_error: '档案大小不能超过{num}M。',
				required_error: '此项目必须填写。',
				password_error: '密码必须至少包含6个字符，包括大写/小写和数字(例如Abc123)。',
				email_error: '无效的邮件地址格式。',
				number_error: '无效的数字格式。',
				date_error: '无效的日期格式。',
                time_error: '无效的时间格式。',
                ge0_error: '数值必须大於或等於 0。',
                gt0_error: '数值必须大於 0。'
			}
		};

		this.imd5 = (new iMD5());
		this.csrf_token = '';
        this.timer = null;
        this.scroll_timer = null;
		this.is_busy = false;
   
		this.idatepicker;
        this.itimepicker;

		this.uploader_options = {};
		this.uploader_files = {};
		this.uploader_files_skip = {};

		this.view_width = 0;
        
        this.eventMap = {};
	}

	init() {
		const this_object = this;

		// Helper function to safely call if the function is defined
        const safeCallFunction = (func, value) => {
            if ((typeof window[func]) === 'function') {
                window[func](value);
            }
        };
        
		// Call optional layout and extra functions if they are defined
		document.addEventListener('DOMContentLoaded', function() {
            // Set current language
            const htmlLang = document.documentElement.lang?.toLowerCase().replace('-', '_');
            if (this_object.isValue(htmlLang) && this_object.isValue(this_object.language[htmlLang])) {
                this_object.current_language = htmlLang;
            }

            // Set CSRF token
            const csrfTokenContent = document.querySelector('meta[name="csrf-token"]')?.content;
            if (this_object.isValue(csrfTokenContent)) {
                const hostname = (location.hostname || '/');
                this_object.csrf_token = this_object.imd5.hash(this_object.imd5.hash('iweb@' + hostname) + '@' + csrfTokenContent);
            }

            // Init body, component and form
            this_object.initBody();
            this_object.initComponent();
            this_object.initForm();
            
            // Get iweb-viewer width
            this_object.view_width = parseInt(document.querySelector('div.iweb-viewer').offsetWidth);
            
            // Call function
            setTimeout(function() {
                console.log('DOM done');
                
                document.body.style.setProperty('--iscrollbar-width', (window.innerWidth - this_object.view_width) + 'px');
                
                this_object.responsive();
                safeCallFunction('iweb_common_layout', this_object.view_width);
                safeCallFunction('iweb_layout', this_object.view_width);
                safeCallFunction('iweb_chind_layout', this_object.view_width);
                safeCallFunction('iweb_extra_layout', this_object.view_width);
                
                safeCallFunction('iweb_common_func');
                safeCallFunction('iweb_func');
                safeCallFunction('iweb_child_func');
                safeCallFunction('iweb_extra_func');
            }, 100);
		});

		window.onload = function() {
            setTimeout(function() {
                console.log('window done');
                
                safeCallFunction('iweb_common_layout_done', this_object.view_width);
                safeCallFunction('iweb_layout_done', this_object.view_width);
                safeCallFunction('iweb_child_layout_done', this_object.view_width);
                safeCallFunction('iweb_extra_layout_done', this_object.view_width);
                
                safeCallFunction('iweb_common_func_done');
                safeCallFunction('iweb_func_done');
                safeCallFunction('iweb_child_func');
                safeCallFunction('iweb_extra_func_done');
            }, 100);
		};

		window.addEventListener('resize', function() {
            clearTimeout(this_object.timer);
            this_object.timer = setTimeout(() => {
                console.log('window resize');
                
                if (this_object.view_width !== parseInt(document.querySelector('div.iweb-viewer').offsetWidth)) {
                    this_object.view_width = parseInt(document.querySelector('div.iweb-viewer').offsetWidth);
                    
                    this_object.responsive();
                    safeCallFunction('iweb_common_layout', this_object.view_width);
                    safeCallFunction('iweb_layout', this_object.view_width);
                    safeCallFunction('iweb_child_layout', this_object.view_width);
                    safeCallFunction('iweb_extra_layout', this_object.view_width);
                }
            }, 200);
		});

		window.addEventListener('scroll', function() {
            clearTimeout(this_object.scroll_timer);
            this_object.scroll_timer = setTimeout(() => {
                console.log('window scroll');
                
                safeCallFunction('iweb_common_scroll', window.scrollY);
                safeCallFunction('iweb_scroll', window.scrollY);
                safeCallFunction('iweb_child_scroll', window.scrollY);
                safeCallFunction('iweb_extra_scroll', window.scrollY);
            }, 100);
		});
	}

	initBody() {
		const this_object = this;

		// Add class to body based on device type
		document.body.classList.add('iweb');

		// Wrap elements except for <script>, <noscript>, and <style>
		const elementsToWrap = Array.from(document.body.children).filter(function(e) { 
            return !['SCRIPT', 'NOSCRIPT', 'STYLE'].includes(e.tagName.toUpperCase()); 
        });
		if (elementsToWrap.length > 0) {
			const wrapper = document.createElement('div');
			wrapper.classList.add('iweb-viewer');
			elementsToWrap.forEach(function(e) { 
                wrapper.appendChild(e); 
            });
			document.body.prepend(wrapper);
		}

		// Handle click
		document.addEventListener('click', function(e) {
			const target = e.target;
     
			// Handle anchor click
			if (target.closest('a')) {
				const href = target.closest('a').getAttribute('href');
				if (!this_object.isValue(href) || this_object.isMatch(href, '#')) {
					e.preventDefault();
					if (target.closest('div.iweb-tips-message')) {
                        target.closest('div.iweb-tips-message').classList.remove('error');
                        target.closest('div.iweb-tips-message').classList.remove('success');
                        target.closest('div.iweb-tips-message').innerHTML = '';
					}
                    else if(target.closest('a.fill-reset')) {
                        // Reset id input & search input
                        const fillId = target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id');
                        const fillText = target.closest('div.iweb-input-autocomplete').querySelector('input.fill-text');
                        const fillReset = target.closest('div.iweb-input-autocomplete').querySelector('a.fill-reset');
                        fillId.value = '';
                        fillText.value = '';
                        fillText.readOnly = false;
                        fillReset.remove();

                        // Callback if need
                        const remove_callBack = fillId.getAttribute('data-rfunc');
                        if ((typeof window[remove_callBack]) === 'function') {
                            window[remove_callBack](fillId);
                        }
                    }
                    else if(target.closest('a.font-switch')) {
                        const newFontSize = target.getAttribute('data-size');
                        if (this_object.isValue(newFontSize)) {
                            this_object.setCookie('iweb_font_size', newFontSize);
                            document.documentElement.classList.remove(...fontSizeClasses);
                            document.documentElement.classList.add(newFontSize + '-font');
                            fontButtons.forEach(function(e) {
                                e.classList.toggle('current', this_object.isMatch(e.getAttribute('data-size'), newFontSize));
                            });
                        }
                    }
                    else if(target.closest('a.control-stretch') && target.closest('div.widget.expand')) {
                        if(target.closest('div.widget.expand').classList.contains('show')) {
                            target.closest('div.widget.expand').classList.remove('show');
                        }
                        else {
                            target.closest('div.widget.expand').classList.add('show');
                        }
                    }
				}
			}
            
            if (target.closest('button.switch-pwd-type')) {
                const InputPwd = target.closest('div.iweb-input').querySelector('input');
                const ShowIconPwd = target.closest('div.iweb-input').querySelector('i.show');
                const HideIconPwd = target.closest('div.iweb-input').querySelector('i.hide');
                if (this_object.isMatch(InputPwd.type, 'password')) {
                    InputPwd.type = 'text';
                    ShowIconPwd.style.display = 'block';
                    HideIconPwd.style.display = 'none';
                } else {
                    InputPwd.type = 'password';
                    ShowIconPwd.style.display = 'none';
                    HideIconPwd.style.display = 'block';
                }
            }

			// Hide autocomplete options
			if (!target.closest('div.iweb-input-autocomplete')) {
				document.querySelectorAll('div.iweb-input-autocomplete ul.fill-options').forEach(function(e1) {
					e1.remove();
				});
			}

			// Hide select options
			if (!target.closest('div.iweb-select')) {
				document.querySelectorAll('div.iweb-select').forEach(function(e1) { 
                    e1.classList.remove('show'); 
                });
			}
            else {
                const virtualOptions = target.closest('div.iweb-select').querySelector('div.virtual > div.options > ul');
                if(this_object.isValue(virtualOptions)) {
                    if (target.closest('a.result')) {
                        if(target.closest('div.iweb-select').classList.contains('show')) {
                            target.closest('div.iweb-select').classList.remove('show');
                        }
                        else {
                            target.closest('div.iweb-select').classList.add('show');
                        }
                    }
                    document.querySelectorAll('div.iweb-select').forEach(function(otherSelector) {
                        const otherOptions = otherSelector.querySelector('div.virtual > div.options > ul');
                        if (otherOptions) {
                            if (!this_object.isMatch(otherOptions.getAttribute('data-index'), virtualOptions.getAttribute('data-index'))) {
                                otherSelector.classList.remove('show');
                            }
                        }
                    });

                    if (target.closest('a') && target.closest('li.node')) {
                        const isMultiple = target.closest('div.iweb-select').classList.contains('iweb-select-multiple');
                        const selectElement = target.closest('div.iweb-select').querySelector('div.real > select');

                        let selectedOptions = [];
                        if (isMultiple) {
                            // Handle multiple selection
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

                            const selectedValue = target.getAttribute('data-value').toString();
                            if (!selectedOptions.includes(selectedValue)) {
                                selectedOptions.push(selectedValue);
                            } else {
                                selectedOptions = selectedOptions.filter(function(value) {
                                    return value !== selectedValue;
                                });
                            }

                            // Update the select element with selected options
                            selectElement.querySelectorAll('option').forEach(function(option) {
                                if (selectedOptions.includes(option.value.toString())) {
                                    option.selected = true;
                                } else {
                                    option.selected = false;
                                }
                            });
                            selectElement.dispatchEvent(new Event('change', { bubbles: true }));

                        } else {
                            // Handle single selection
                            target.closest('div.iweb-select').classList.remove('show');
                            selectElement.value = target.getAttribute('data-value');
                            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }
                }
                else {
                    document.querySelectorAll('div.iweb-select').forEach(function(otherSelect) {
                        otherSelect.classList.remove('show');
                    });
                }
            }
		});
        
        // Handle input
        document.addEventListener('input', function(e) {
            const target = e.target;
            if(target.closest('div.iweb-input')) {
                target.closest('div.iweb-input').classList.remove('error');
                target.closest('div.iweb-input').querySelector('small.tips')?.remove();
            }

            if(target.closest('div.iweb-input-color')) {
                if(this_object.isMatch(target.type, 'color')) {
                    const inputColorCode = target.closest('div.iweb-input-color').querySelector('input[type="text"]');
                    if (/^#[0-9A-F]{6}$/i.test(target.value)) {
                        inputColorCode.value = target.value;
                    }
                }
                else {
                    const input = target.closest('div.iweb-input-color').querySelector('input[type="color"]');
                    if (!target.value.startsWith('#')) {
                        target.value = '#' + target.value;
                    }
                    if (/^#[0-9A-F]{6}$/i.test(target.value)) {
                        input.value = target.value;
                    }
                }
            }
            else if(target.closest('div.iweb-input-autocomplete') && target.closest('input.fill-text')) {
                clearTimeout(this_object.timer);
                this_object.timer = setTimeout(() => {
                    // Remove error, tips & options list
                    target.closest('div.iweb-input-autocomplete').classList.remove('error');
                    target.closest('div.iweb-input-autocomplete').querySelector('small.tips')?.remove();
                    target.closest('div.iweb-input-autocomplete').querySelector('ul.fill-options')?.remove();

                    // Gather extra parameters
                    let extraValues = {};
                    for (let i = 1; i <= 5; i++) {
                        let param = target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id').getAttribute('data-param' + i);
                        if (this_object.isValue(param)) {
                            let [key, value] = param.split(':');
                            extraValues[key] = value;
                        }
                    }

                    // Merge post data
                    const keywords = target.value;
                    const url = target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id').getAttribute('data-url');
                    const postData = {
                        dataType: 'json',
                        showBusy: false,
                        url: url,
                        values: Object.assign({ keywords: keywords }, extraValues)
                    };

                    // Search result handling
                    if (this_object.isValue(keywords)) {
                        this_object.ajaxPost(postData, function(responseData) {
                            if (this_object.isValue(responseData)) {
                                responseData = Object.values(responseData);

                                // Create options list
                                const fillOptions = document.createElement('ul');
                                fillOptions.classList.add('fill-options');
                                responseData.forEach(function(value) {
                                    const li = document.createElement('li');
                                    const a = document.createElement('a');
                                    a.setAttribute('data-id', value.id);
                                    a.textContent = value.name;
                                    a.addEventListener('click', this_object.deBounce(function(e1) {
                                        const target = e1.target;
                                        target.closest('div.iweb-input-autocomplete').querySelector('a.fill-reset')?.remove();

                                        // Set id input & search input
                                        const fillId = target.closest('div.iweb-input-autocomplete').querySelector('input.fill-id');
                                        const fillText = target.closest('div.iweb-input-autocomplete').querySelector('input.fill-text');
                                        fillId.value = target.getAttribute('data-id');
                                        fillText.value = target.textContent;
                                        fillText.readOnly = true;

                                        // Create reset button
                                        const fillReset = document.createElement('a');
                                        fillReset.classList.add('fill-reset');

                                        // Create Reset icon
                                        const fillResetIcon = document.createElement('i');
                                        fillResetIcon.classList.add('fa', 'fa-times');
                                        fillResetIcon.style.color = '#d73d32';

                                        // Append elements
                                        fillReset.appendChild(fillResetIcon);
                                        fillId.closest('div.iweb-input-autocomplete').appendChild(fillReset);

                                        // Remove error, tips & options list
                                        fillId.closest('div.iweb-input-autocomplete').classList.remove('error');
                                        fillId.closest('div.iweb-input-autocomplete').querySelector('small.tips')?.remove();
                                        fillId.closest('div.iweb-input-autocomplete').querySelector('ul.fill-options')?.remove();

                                        // Callback if need
                                        const select_callBack = fillId.getAttribute('data-sfunc');
                                        if ((typeof window[select_callBack]) === 'function') {
                                            window[select_callBack](fillId.value, fillId);
                                        }
                                    }));

                                    // Append elements
                                    li.appendChild(a);
                                    fillOptions.appendChild(li);
                                });

                                // Append elements
                                target.closest('div.iweb-input-autocomplete').appendChild(fillOptions);
                            }
                            else {
                                const fillOptions = document.createElement('ul');
                                fillOptions.classList.add('fill-options');
                                const li = document.createElement('li');
                                li.classList.add('empty');
                                li.textContent = this_object.language[this_object.current_language]['no_record_found'];
                                fillOptions.appendChild(li);
                                
                                // Append elements
                                target.closest('div.iweb-input-autocomplete').appendChild(fillOptions);
                            }
                        });
                    }
                }, 1000);
            }
            else if(target.closest('div.iweb-select') && target.closest('li.filter')) {
                const fkw = target.value;
                if (this_object.isValue(fkw)) {
                    // Find all node elements
                    target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li.node > a').forEach(function(anchor) {
                        const textContent = anchor.textContent || anchor.innerText;
                        if (textContent.toLowerCase().indexOf(fkw.toLowerCase()) > -1) {
                            anchor.parentElement.classList.remove('hide');
                            const parentNode = anchor.closest('li.node-parent');
                            if (parentNode) {
                                parentNode.classList.remove('hide');
                            }
                        } else {
                            anchor.parentElement.classList.add('hide');
                        }
                    });
                } else {
                    // If filter is empty, remove 'hide' class from all node elements
                    target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li.node').forEach(function(nodeElement) {
                        nodeElement.classList.remove('hide');
                    });
                }
            }
        });
        
        // Handle change
        document.addEventListener('change', function(e) {
            const target = e.target;

            if(target.closest('div.iweb-select')) {
                let selectedOptions = [];
                let selectedOptionLabel = '';
            
                // Remove error & tips
                target.closest('div.iweb-select').classList.remove('error');
                target.closest('div.iweb-select').querySelector('small.tips')?.remove();

                // Traverse through the options
                Array.from(target.querySelectorAll('option')).forEach(function(option) {
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

                // Find and update the corresponding virtual options
                if (target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li > a').length > 0) {
                    target.closest('div.iweb-select').querySelectorAll('div.virtual > div.options ul > li > a').forEach(function(anchor) {
                        const optionValue = anchor.getAttribute('data-value');
                        if (this_object.isValue(optionValue)) {
                            if (!this_object.isMatch(selectedOptions.indexOf(optionValue), -1)) {
                                anchor.parentElement.classList.add('node-selected');
                                if (this_object.isValue(selectedOptionLabel)) {
                                    selectedOptionLabel += ', ';
                                }
                                selectedOptionLabel += anchor.textContent;
                            } else {
                                anchor.parentElement.classList.remove('node-selected');
                            }
                        }
                    });

                    // Set the default option label if none selected
                    if (!this_object.isValue(selectedOptionLabel)) {
                        selectedOptionLabel = ((this_object.isValue(target.getAttribute('data-default'))) ? target.getAttribute('data-default') : this_object.language[this_object.current_language]['please_select']);
                    }

                    // Update the virtual result label
                    target.closest('div.iweb-select').querySelector('div.virtual > a.result').innerHTML = selectedOptionLabel;
                }
            }
            else if(target.closest('div.iweb-checkbox')) {
                const relatedObject = document.querySelectorAll('input[type="checkbox"][name="' + (target.name) + '"]');
                relatedObject.forEach(function(related_checkbox) {
                    related_checkbox.closest('div.iweb-checkbox').classList.remove('checked');
                    if (related_checkbox.checked) {
                        related_checkbox.closest('div.iweb-checkbox').classList.add('checked');
                    }
                    related_checkbox.closest('div.iweb-checkbox').classList.remove('error');
                });

                // Remove tips
                if(target.closest('div.iweb-checkbox-set')) {
                    target.closest('div.iweb-checkbox-set').querySelector('small.tips')?.remove();
                }
            }
            else if(target.closest('div.iweb-radio')) {
                const selectedValue = target.value;
                const relatedObject = document.querySelectorAll('input[type="radio"][name="' + (target.name) + '"]');
                relatedObject.forEach(function(related_radio) {
                    if (this_object.isMatch(related_radio.value, selectedValue)) {
                        related_radio.checked = true;
                        related_radio.closest('div.iweb-radio').classList.add('checked');
                    } else {
                        related_radio.checked = false;
                        related_radio.closest('div.iweb-radio').classList.remove('checked');
                    }
                    related_radio.closest('div.iweb-radio').classList.remove('error');
                });

                // Remove tips
                if(target.closest('div.iweb-radio-set')) {
                    target.closest('div.iweb-radio-set').querySelector('small.tips')?.remove();
                }
            }
        });
        
		// Init default font size
		const fontSizeClasses = ['small-font', 'middle-font', 'large-font'];
		const defaultFontSize = (this_object.getCookie('iweb_font_size'));
		const fontButtons = document.querySelectorAll('a.font-switch');
		if (this_object.isValue(defaultFontSize)) {
			document.documentElement.classList.remove(...fontSizeClasses);
			document.documentElement.classList.add(defaultFontSize + '-font');
			fontButtons.forEach(function(btn) {
				btn.classList.toggle('current', this_object.isMatch(btn.getAttribute('data-size'), defaultFontSize));
			});
		}
	}

	initComponent() {
		const this_object = this;
		this_object.inputBox();
		this_object.selectBox();
		this_object.checkBox();
		this_object.radioBox();
		this_object.iframe();
        
        // insert div before & after into editor div
        const editors = document.querySelectorAll('div.iweb-editor');
        editors.forEach(editor => {
            const clearBefore = document.createElement('div');
            clearBefore.className = 'clearboth';
            editor.insertAdjacentElement('afterbegin', clearBefore);
            
            const clearAfter = document.createElement('div');
            clearAfter.className = 'clearboth';
            editor.insertAdjacentElement('beforeend', clearAfter);
        });
	}

	inputBox(inputObject, callBack) {
		const this_object = this;

		// Default to selecting all relevant elements if none provided
		if (!this_object.isValue(inputObject)) {
            const default_input = 
            [
                'input[type="text"]',
                'input[type="password"]',
                'input[type="date"]',
                'input[type="time"]',
                'input[type="color"]',
                'input[type="tel"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="file"]',
                'textarea'
            ];
			inputObject = document.querySelectorAll(default_input.join(', '));
		}

		if (inputObject.length > 0) {
			inputObject.forEach(function(input) {
				if (!input.closest('div.iweb-input')) {
					// Create div and move the input into it
                    const inputType = input.type;
					const isAutocomplete = (this_object.isMatch(input.getAttribute('data-autocomplete'), 1) || this_object.isMatch(input.getAttribute('data-autocomplete'), true));
					const wrapperDiv = document.createElement('div');
					wrapperDiv.classList.add('iweb-input');
					wrapperDiv.classList.add((isAutocomplete ? 'iweb-input-autocomplete' : 'iweb-input-' + (this_object.isValue(input.type) ? input.type : 'text')));
					input.parentNode.insertBefore(wrapperDiv, input);
					wrapperDiv.appendChild(input);

                    // Add additional elements to the input
					if (!isAutocomplete) {
						if (this_object.isMatch(inputType, 'password')) {
                            // Create password switch type button
							const BtnSwitchType = document.createElement('button');
							BtnSwitchType.type = 'button';
							BtnSwitchType.classList.add('switch-pwd-type');
                            
							const eyeSlashIcon = document.createElement('i');
							eyeSlashIcon.classList.add('fa', 'fa-eye-slash', 'hide');
							eyeSlashIcon.style.display = 'block';
							const eyeIcon = document.createElement('i');
							eyeIcon.classList.add('fa', 'fa-eye', 'show');
							eyeIcon.style.display = 'none';

                            // Append elements
							BtnSwitchType.appendChild(eyeSlashIcon);
							BtnSwitchType.appendChild(eyeIcon);
							wrapperDiv.appendChild(BtnSwitchType);
						}
						else if (this_object.isMatch(inputType, 'color')) {
                            // Set color input
							input.style.position = 'relative';
							input.style.zIndex = 1;
                            
                            // Create color code input
							const inputColorCode = document.createElement('input');
							inputColorCode.type = 'text';
							inputColorCode.maxLength = 7;
							inputColorCode.value = input.value;
							inputColorCode.style.position = 'absolute';
							inputColorCode.style.top = '0px';
							inputColorCode.style.left = '0px';
							inputColorCode.style.right = '0px';
							inputColorCode.style.bottom = '0px';
							inputColorCode.style.paddingLeft = '42px';
                            
                            // Append elements
                            wrapperDiv.appendChild(inputColorCode);
						}
                    }
                    else {
						// Create search input
                        const mustRequired = (this_object.isMatch(input.getAttribute('data-required'), 1)) ? true : false;
                        const canNew = (this_object.isMatch(input.getAttribute('data-cannew'), 1)) ? true : false;

						const fillText = document.createElement('input');
						fillText.type = 'text';
                        if(mustRequired && canNew) {
                            fillText.name = input.name.toString().replace(/(\w+)(\[\])?$/, '$1_txt$2');
                        }
                        fillText.placeholder = (input.getAttribute('data-placeholder') || '');
						fillText.classList.add('fill-text');
						fillText.style.display = 'block';
						fillText.style.width = '100%';
						fillText.autocomplete = 'off';
                        if(mustRequired && canNew) {
                            fillText.setAttribute('data-validation', 'required');
                        }
                        wrapperDiv.appendChild(fillText);

						// Create reset button
						const defaultText = input.getAttribute('data-default');
						input.removeAttribute('data-default');
						if (this_object.isValue(defaultText)) {
							fillText.setAttribute('data-value', input.value);
							fillText.setAttribute('data-default', defaultText);
                            fillText.setAttribute('value', defaultText);
							fillText.readOnly = true;

							const fillReset = document.createElement('a');
							fillReset.classList.add('fill-reset');

                            // Create Reset icon
							const fillResetIcon = document.createElement('i');
							fillResetIcon.classList.add('fa', 'fa-times');
							fillResetIcon.style.color = '#d73d32';

                            // Append elements
                            fillReset.appendChild(fillResetIcon);
							wrapperDiv.appendChild(fillReset);
						}
                        
                        // Hide input
                        input.type = 'hidden';
						input.classList.add('fill-id');
						input.removeAttribute('data-required');
                        input.removeAttribute('data-cannew');
                        input.removeAttribute('data-autocomplete');
                        if(mustRequired && canNew) {
                            input.removeAttribute('data-required');
                        }
                        else {
                            if(mustRequired) {
                                input.setAttribute('data-validation', 'required');
                            }
                        }
					}
                    
					// Set input styles
					input.style.display = (this_object.isMatch(inputType, 'color') ? 'inline-block' : 'block');
					input.style.width = (this_object.isMatch(inputType, 'color') ? '36px' : '100%');
					input.autocomplete = 'off';
				}
			});
		}

		// Init date picker
		if (!this_object.isValue(this_object.idatepicker)) {
			this_object.idatepicker = new iDatePicker(this_object.current_language);
		}
		this_object.idatepicker.render('input[type="date"]');
        
        // Init time picker
        if (!this_object.isValue(this_object.itimepicker)) {
			this_object.itimepicker = new iTimePicker();
		}
		this_object.itimepicker.render('input[type="time"]');
        
		// Callback if need
		if ((typeof callBack) === 'function') {
			callBack();
		}
	}

	selectBox(select_object, callBack) {
		const this_object = this;

		// Default to selecting all relevant elements if none provided
		if (!this_object.isValue(select_object)) {
			select_object = document.querySelectorAll('select');
		}

		if (select_object.length > 0) {
			select_object.forEach(function(select, select_index) {
                if (!select.closest('div.iweb-select')) {
                    // Get config
                    const isMultiple = ((this_object.isMatch(select.multiple, 1) || this_object.isMatch(select.multiple, true)) ? true : false);
                    const isVirtual = ((this_object.isMatch(select.getAttribute('data-virtual'), 1) || this_object.isMatch(select.getAttribute('data-virtual'), true)) ? true : false);
                    const isFilter = ((this_object.isMatch(select.getAttribute('data-filter'), 1) || this_object.isMatch(select.getAttribute('data-filter'), true)) ? true : false);
                    const isPositionTop = ((this_object.isMatch(select.getAttribute('data-top'), 1) || this_object.isMatch(select.getAttribute('data-top'), true)) ? true : false);

					if (isVirtual) {
						// Create div & move the select into div
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

						// Create a virtual div & move the result section into div
						let virtualSelect = '';
						const virtualDiv = document.createElement('div');
						virtualDiv.classList.add('virtual');
                        
						const resultLink = document.createElement('a');
						resultLink.classList.add('result');
						resultLink.textContent = virtualSelect;
                        virtualDiv.appendChild(resultLink);
                        
						// Create options list
						const optionsDiv = document.createElement('div');
						optionsDiv.classList.add('options');
						if (isPositionTop) {
							optionsDiv.classList.add('top');
						}
						const optionsList = document.createElement('ul');
						optionsList.setAttribute('data-index', 'iss' + select_index);

						// Create filter input
						if (isFilter) {
							const filterLi = document.createElement('li');
							filterLi.classList.add('filter');

							const placeholderText = (select.getAttribute('data-placeholder') || '');
							const filterInput = document.createElement('input');
							filterInput.id = 'fkw_' + select_index;
							filterInput.type = 'text';
							filterInput.placeholder = placeholderText.trim();

                            // Append elements
                            filterLi.appendChild(filterInput);
							optionsList.appendChild(filterLi);
						}

						// Loop through options and create the list
						if (select.children.length > 0) {
							Array.from(select.children).forEach(function(optionGroup) {
								if (optionGroup.children.length > 0) {
									const parentLi = document.createElement('li');
									parentLi.classList.add('node', 'node-parent');

									const parentLink = document.createElement('a');
									parentLink.textContent = optionGroup.getAttribute('label');
									parentLi.appendChild(parentLink);

									const childUl = document.createElement('ul');
									Array.from(optionGroup.children).forEach(function(option) {
										if (this_object.isValue(option.value)) {
											const childLi = document.createElement('li');
											childLi.classList.add('node');
                                            if (option.selected) {
												childLi.classList.add('node-selected');
												childLi.setAttribute('data-ori', 'selected');
												virtualSelect += (virtualSelect ? ', ' : '');
												virtualSelect += option.textContent;
											}

											const childLink = document.createElement('a');
											childLink.setAttribute('data-value', option.value);
											childLink.textContent = option.textContent;

                                            // Append elements
											childLi.appendChild(childLink);
											childUl.appendChild(childLi);
										}
									});
                                    
                                    // Append elements
                                    parentLi.appendChild(childUl);
									optionsList.appendChild(parentLi);
								} else {
									const singleLi = document.createElement('li');
									singleLi.classList.add('node');
									const singleLink = document.createElement('a');
									singleLink.setAttribute('data-value', optionGroup.value);
									singleLink.textContent = optionGroup.textContent;
									if (optionGroup.selected) {
										singleLi.classList.add('node-selected');
										singleLi.setAttribute('data-ori', 'selected');
										virtualSelect += (virtualSelect ? ', ' : '');
										virtualSelect += optionGroup.textContent;
									}
                                    
                                    // Append elements
									singleLi.appendChild(singleLink);
									optionsList.appendChild(singleLi);
								}
							});
						}

						// Set the default select text if nothing is selected
						if (!this_object.isValue(virtualSelect)) {
							virtualSelect = (this_object.isValue(select.getAttribute('data-default')) ? select.getAttribute('data-default') : this_object.language[this_object.current_language]['please_select']);
						}
						resultLink.textContent = virtualSelect;

						// Append elements
						optionsDiv.appendChild(optionsList);
						virtualDiv.appendChild(optionsDiv);
						wrapperDiv.appendChild(virtualDiv);
					} else {
						// Create div & move the select into the div
						const wrapperDiv = document.createElement('div');
						wrapperDiv.classList.add('iweb-select');
						const realDiv = document.createElement('div');
						realDiv.classList.add('real');

						select.parentNode.insertBefore(realDiv, select);
						realDiv.appendChild(select);

						realDiv.parentNode.insertBefore(wrapperDiv, realDiv);
						wrapperDiv.appendChild(realDiv);
					}
                    
                    // Remove select Attribute
                    select.removeAttribute('data-virtual');
                    select.removeAttribute('data-filter');
                }
			});
		}

		// Callback if need
		if ((typeof callBack) === 'function') {
			callBack();
		}
	}

	checkBox(checkbox_object, callBack) {
		const this_object = this;

		// Default to selecting all relevant elements if none provided
		if (!this_object.isValue(checkbox_object)) {
			checkbox_object = document.querySelectorAll('input[type="checkbox"]');
		}

		if (checkbox_object.length > 0) {
			checkbox_object.forEach(function(checkbox) {
				if (!checkbox.closest('div.iweb-checkbox')) {
					const findCheckboxLabel = checkbox.nextElementSibling;

					// Create div
					const wrapperDiv = document.createElement('div');
					wrapperDiv.classList.add('iweb-checkbox');
					if (checkbox.checked) {
						wrapperDiv.classList.add('checked');
					}

					// Move the checkbox into div and then append label next to it
					checkbox.parentNode.insertBefore(wrapperDiv, checkbox);
					wrapperDiv.appendChild(checkbox);
					if (findCheckboxLabel && this_object.isMatch(findCheckboxLabel.tagName, 'label')) {
						findCheckboxLabel.parentNode.insertBefore(wrapperDiv, findCheckboxLabel);
						wrapperDiv.appendChild(findCheckboxLabel);
					}
				}
			});
		}

		// Callback if need
		if ((typeof callBack) === 'function') {
			callBack();
		}
	}

	radioBox(radio_object, callBack) {
		const this_object = this;

		// Default to selecting all relevant elements if none provided
		if (!this_object.isValue(radio_object)) {
			radio_object = document.querySelectorAll('input[type="radio"]');
		}

		if (radio_object.length > 0) {
			radio_object.forEach(function(radio) {
				if (!radio.closest('div.iweb-radio')) {
					const findRadioLabel = radio.nextElementSibling;

					// Create div
					const wrapperDiv = document.createElement('div');
					wrapperDiv.classList.add('iweb-radio');
					if (radio.checked) {
						wrapperDiv.classList.add('checked');
					}

					// Move the radio into div and then append label next to it
					radio.parentNode.insertBefore(wrapperDiv, radio);
					wrapperDiv.appendChild(radio);
					if (findRadioLabel && this_object.isMatch(findRadioLabel.tagName, 'label')) {
						findRadioLabel.parentNode.insertBefore(wrapperDiv, findRadioLabel);
						wrapperDiv.appendChild(findRadioLabel);
					}
				}
			});
		}

		// Callback if need
		if ((typeof callBack) === 'function') {
			callBack();
		}
	}

	iframe(element = 'div.iweb-editor', callBack) {
		const this_object = this;

		if (this_object.isValue(element)) {
			// Get all specified tags within the given element
			['iframe', 'video', 'object', 'embed'].forEach(function(value) {
				const elements = document.querySelectorAll(element + ' ' + value);
				elements.forEach(function(e) {
					// Check if the parent does not have the class 'iweb-responsive'
					if (!e.closest('div.iweb-responsive')) {
						// Wrap the element in a div with 'iweb-responsive' class
						const wrapper = document.createElement('div');
						wrapper.className = 'iweb-responsive';
						wrapper.setAttribute('data-width', e.offsetWidth);
						wrapper.setAttribute('data-height', e.offsetHeight);

						e.classList.add('vframe');
						e.parentNode.insertBefore(wrapper, e);
						wrapper.appendChild(e);
					}
				});
			});

			if ((typeof callBack) === 'function') {
				callBack();
			}
		}
	}

	responsive() {
		const this_object = this;
		const responsiveElements = document.querySelectorAll('div.iweb-responsive');
		if (responsiveElements.length > 0) {
			responsiveElements.forEach(function(e) {
				let currentWidth = e.clientWidth;
				let newHeight = 0;
				let defineRatioWidth = e.getAttribute('data-width');
				let defineRatioHeight = e.getAttribute('data-height');

				if (this_object.isValue(defineRatioWidth) && this_object.isValue(defineRatioHeight)) {
					if (defineRatioHeight > 0 && defineRatioWidth > 0) {
						newHeight = parseInt((currentWidth * defineRatioHeight) / defineRatioWidth);
					}
				}

				if (newHeight > 0) {
					e.style.height = newHeight + 'px';
				} else {
					e.style.height = 'auto';
				}
			});
		}
	}

	pagination(element) {
		document.querySelectorAll(element).forEach(function(e) {
			new iPagination(e, 
            {
				mode: (e.getAttribute('data-mode') || 1),
				size: (e.getAttribute('data-size') || 5),
				total: (e.getAttribute('data-totalpage') || 1),
				placeholder: (e.getAttribute('data-placeholder') || '')
			});
		});
	}
    
    // ajax post
	ajaxPost(post_data, callBack, final_callBack, progress_callBack) {
		const this_object = this;

		// Merge post data
		post_data = Object.assign({
			dataType: 'json',
			showBusy: true,
			url: '',
			values: {}
		}, post_data);
        if(!post_data.showBusy) {
            this_object.is_busy = false;
        }

		if (!this_object.is_busy && this_object.isValue(post_data.url)) {
			const local_time = this_object.toDateTime();
			let formData = new FormData();

			formData.append('itoken', window.btoa(this_object.imd5.hash(this_object.csrf_token + '#dt' + local_time) + '%' + local_time));
			if (post_data.values) {
				for (let key in (post_data.values)) {
                    if ((post_data.values).hasOwnProperty(key)) {
                        const value = post_data.values[key];
                        // Check if the value is an object or array and stringify it
                        if (typeof value === 'object' && !(value instanceof File || value instanceof FileList)) {
                            for (let sub_key in value) {
                                formData.append((key + '[' + sub_key + ']'), value[sub_key]);
                            }
                        } else {
                            formData.append(key, value);
                        }
                    }
				}
			}

			// Helper function to safely call if the function is defined
			const safeFinalFunction = () => {
				this_object.is_busy = false;
				if (!this_object.isMatch(post_data.showBusy, 2)) {
                    this_object.showBusy(false);
                }

				// Final callBack if needed
				if ((typeof final_callBack) === 'function') {
					final_callBack();
				}
			};

			// Try to send data with progress tracking using XMLHttpRequest
			try {
                this_object.is_busy = true;
                this_object.showBusy(true, ((post_data.showBusy) ? 20 : 0));

				// Use XMLHttpRequest for progress tracking
				const xhr = new XMLHttpRequest();
				xhr.open('POST', post_data.url, true);

				// Monitor upload progress
				xhr.upload.onprogress = function(event) {
					if (event.lengthComputable) {
						const percentComplete = Math.ceil((event.loaded / event.total) * 100);
						// Progress callBack if needed
						if ((typeof progress_callBack) === 'function') {
							progress_callBack(percentComplete);
						}
					}
				};

				// Handle the response
				xhr.onload = function() {
					safeFinalFunction();
					if (xhr.status >= 200 && xhr.status < 300) {
						let responseData;
						switch (post_data.dataType.toLowerCase()) {
							case 'json':
								responseData = JSON.parse(xhr.responseText);
								break;
							case 'blob':
								responseData = xhr.response;
								break;
							default:
								responseData = xhr.responseText;
								break;
						}

						// Callback if needed
						if ((typeof callBack) === 'function') {
							callBack(responseData);
						}
					} else {
						throw new Error(xhr.statusText);
					}
				};

				// Handle network errors
				xhr.onerror = function() {
					safeFinalFunction();
					alert('Unstable network, please check your network connection.');
				};

				// Handle server errors
				xhr.onabort = function() {
					safeFinalFunction();
					alert('Request aborted.');
				};

				xhr.ontimeout = function() {
					safeFinalFunction();
					alert('Request timed out.');
				};

				// Send the form data
				xhr.send(formData);
			} catch (error) {
				safeFinalFunction();
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
			}
		}
	}

	initForm(form_object) {
		const this_object = this;

		// Default to selecting all relevant elements if none provided
		if (!this_object.isValue(form_object)) {
			form_object = document.querySelectorAll('form[data-ajax="1"]');
		}

		if (form_object.length > 0) {
			form_object.forEach(function(form) {
				const showTips = ((!this_object.isMatch(form.getAttribute('data-showtips'), false)) && (!this_object.isMatch(form.getAttribute('data-showtips'), 0)));
                const busy_mode = (this_object.isValue(form.getAttribute('data-busy')))?form.getAttribute('data-busy'):true;
				form.removeAttribute('data-ajax');
				form.removeAttribute('data-showtips');
                form.removeAttribute('data-busy');
				form.method = 'post';
				form.autocomplete = 'off';
                
                // Bind event for form submit
				form.addEventListener('submit', this_object.deBounce(function() {
                    // Remove error & tips
                    const errorElements = form.querySelectorAll('.error');
                    errorElements.forEach(function(e) {
                        if (!e.closest('div.iweb-tips-message')) {
                            e.classList.remove('error');
                        }
                    });

                    const tipsElements = form.querySelectorAll('small.tips');
                    tipsElements.forEach(function(tips) {
                        tips.remove();
                    });

                    // Do checking before submit
                    let can_submit = true;
                    const requiredInputs = form.querySelectorAll('input[data-validation]:not(:disabled), select[data-validation]:not(:disabled), textarea[data-validation]:not(:disabled)');
                    if (requiredInputs.length > 0) {
                        requiredInputs.forEach(function(input) {
                            const validationArray = (input.getAttribute('data-validation').toString().split('|'));
                            if (this_object.isMatch(input.type, 'checkbox')) {
                                if (validationArray.includes('required') && input.closest('div.iweb-checkbox-set') && !input.closest('div.iweb-checkbox-set').querySelector('input[type="checkbox"]:checked')) {
                                    if (showTips && !input.closest('div.iweb-checkbox-set').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = this_object.language[this_object.current_language]['required_error'];
                                        input.closest('div.iweb-checkbox-set').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-checkbox').classList.add('error');
                                    can_submit = false;
                                }
                            } else if (this_object.isMatch(input.type, 'radio')) {
                                if (validationArray.includes('required') && input.closest('div.iweb-radio-set') && !input.closest('div.iweb-radio-set').querySelector('input[type="radio"]:checked')) {
                                    if (showTips && !input.closest('div.iweb-radio-set').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = this_object.language[this_object.current_language]['required_error'];
                                        input.closest('div.iweb-radio-set').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-radio').classList.add('error');
                                    can_submit = false;
                                }
                            } else if (this_object.isMatch(input.type, 'select-one') || this_object.isMatch(input.type, 'select-multiple')) {
                                if (validationArray.includes('required') && !this_object.isValue(input.value)) {
                                    if (showTips && !input.closest('div.iweb-select').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = this_object.language[this_object.current_language]['required_error'];
                                        input.closest('div.iweb-select').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-select').classList.add('error');
                                    can_submit = false;
                                }
                            } else {
                                if (validationArray.includes('required') && !this_object.isValue(input.value)) {
                                    if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                        const errorTips = document.createElement('small');
                                        errorTips.classList.add('tips');
                                        errorTips.textContent = this_object.language[this_object.current_language]['required_error'];
                                        input.closest('div.iweb-input').appendChild(errorTips);
                                    }
                                    input.closest('div.iweb-input').classList.add('error');
                                    can_submit = false;
                                } else if (this_object.isValue(input.value)){
                                    let next_regex = true;
                                    if ((validationArray.includes('number')) && !this_object.isNumber(input.value)) {
                                        if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = this_object.language[this_object.current_language]['number_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                        next_regex = false;
                                    } else if ((validationArray.includes('email')) && !this_object.isEmail(input.value)) {
                                        if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = this_object.language[this_object.current_language]['email_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                        next_regex = false;
                                    } else if ((validationArray.includes('password')) && !this_object.isPassword(input.value)) {
                                        if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = this_object.language[this_object.current_language]['password_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                        next_regex = false;
                                    } else if ((validationArray.includes('date')) && !this_object.isDate(input.value)) {
                                        if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = this_object.language[this_object.current_language]['date_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                        next_regex = false;
                                    }
                                    else if ((validationArray.includes('time')) && !this_object.isTime(input.value)) {
                                        if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                            const errorTips = document.createElement('small');
                                            errorTips.classList.add('tips');
                                            errorTips.textContent = this_object.language[this_object.current_language]['time_error'];
                                            input.closest('div.iweb-input').appendChild(errorTips);
                                        }
                                        input.closest('div.iweb-input').classList.add('error');
                                        can_submit = false;
                                        next_regex = false;
                                    }
                                    else if ((validationArray.includes('ge0'))) {
                                        if(!this_object.isNumber(input.value)) {
                                            if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                                const errorTips = document.createElement('small');
                                                errorTips.classList.add('tips');
                                                errorTips.textContent = this_object.language[this_object.current_language]['number_error'];
                                                input.closest('div.iweb-input').appendChild(errorTips);
                                            }
                                            input.closest('div.iweb-input').classList.add('error');
                                            can_submit = false;
                                            next_regex = false;
                                        }
                                        else {
                                            const regex = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
                                            if (!regex.test(input.value)) {
                                                if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                                    const errorTips = document.createElement('small');
                                                    errorTips.classList.add('tips');
                                                    errorTips.textContent = this_object.language[this_object.current_language]['ge0_error'];
                                                    input.closest('div.iweb-input').appendChild(errorTips);
                                                }
                                                input.closest('div.iweb-input').classList.add('error');
                                                can_submit = false;
                                                next_regex = false;
                                            }
                                        }
                                    }
                                    else if ((validationArray.includes('gt0'))) {
                                        if(!this_object.isNumber(input.value)) {
                                            if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                                const errorTips = document.createElement('small');
                                                errorTips.classList.add('tips');
                                                errorTips.textContent = this_object.language[this_object.current_language]['number_error'];
                                                input.closest('div.iweb-input').appendChild(errorTips);
                                            }
                                            input.closest('div.iweb-input').classList.add('error');
                                            can_submit = false;
                                            next_regex = false;
                                        }
                                        else if (parseFloat(input.value) <= 0) {
                                            if (showTips && !input.closest('div.iweb-input').querySelector('small.tips')) {
                                                const errorTips = document.createElement('small');
                                                errorTips.classList.add('tips');
                                                errorTips.textContent = this_object.language[this_object.current_language]['gt0_error'];
                                                input.closest('div.iweb-input').appendChild(errorTips);
                                            }
                                            input.closest('div.iweb-input').classList.add('error');
                                            can_submit = false;
                                            next_regex = false;
                                        }
                                    }
                                    
                                    if (next_regex && validationArray.includes('regex')) {
                                        const regex = new RegExp(input.getAttribute('data-regex'));
                                        const regex_error = input.getAttribute('data-error');
                                        if (!regex.test(input.value.toString().toLowerCase())) {
                                            if (showTips && !input.closest('div.iweb-input').querySelector('small.tips') && this_object.isValue(regex_error)) {
                                                const errorTips = document.createElement('small');
                                                errorTips.classList.add('tips');
                                                errorTips.textContent = regex_error.toString();
                                                input.closest('div.iweb-input').appendChild(errorTips);
                                            }
                                            input.closest('div.iweb-input').classList.add('error');
                                            can_submit = false;
                                         }
                                    }
                                }
                            }
                        });
                    }

                    // Extra checking if need
                    const validation_func = form.getAttribute('data-vfunc');
                    if ((typeof window[validation_func]) === 'function') {
                        const extra_can_submit = window[validation_func](can_submit);
                        can_submit = (can_submit && extra_can_submit);
                    }

                    if (can_submit) {
                        let post_data = {
                            dataType: 'json',
                            showBusy: busy_mode,
                            url: form.action,
                            values: {}
                        };
                        
                        // Iterate over form data
                        const formData = new FormData(form);
                        formData.forEach(function(value, key) {
                            const regex = /(.*)((\[)(.*)(\]))$/i; // Regular expression
                            const match = key.match(regex);
                            if (match) {
                                let baseName = match[1];
                                let childIndex = match[4]
                                if (!post_data.values[baseName]) {
                                    post_data.values[baseName] = {};
                                }
                                if (!this_object.isValue(childIndex)) {
                                    childIndex = Object.keys(post_data.values[baseName]).length + 1;
                                }
                                post_data.values[baseName][childIndex] = value;
                            } else {
                                post_data.values[key] = value;
                            }
                        });

                        this_object.ajaxPost(post_data, function(responseData) {
                            // Callback if need
                            const complete_func = form.getAttribute('data-cfunc');
                            const extra_func = form.getAttribute('data-efunc');
                            if ((typeof window[complete_func]) === 'function') {
                                window[complete_func](responseData);
                            } else {
                                const showAlert = (this_object.isMatch(responseData.alert, true) || this_object.isMatch(responseData.alert, 1));
                                if (this_object.isValue(responseData.status) && this_object.isMatch(responseData.status, 200)) {
                                    if (this_object.isValue(responseData.url)) {
                                        if(showAlert) {
                                            this_object.tipsMsg(responseData.message, true, function() {
                                                if (!this_object.isMatch(responseData.url, '#')) {
                                                    window.location.href = responseData.url;
                                                }
                                                else {
                                                    window.location.reload();
                                                }
                                            });
                                        }
                                        else {
                                            if (!this_object.isMatch(responseData.url, '#')) {
                                                window.location.href = responseData.url;
                                            }
                                            else {
                                                window.location.reload();
                                            }
                                        }
                                    }
                                    else {
                                        this_object.tipsMsg(responseData.message, true, function() {
                                            window.location.reload();
                                        });
                                    }
                                } else {
                                    this_object.tipsMsg(responseData.message, false);
                                }
                                
                                if ((typeof window[extra_func]) === 'function') {
                                    window[extra_func](responseData);
                                }
                            }
                        });
                    } else {
                        if (!((typeof window[validation_func]) === 'function')) {
                            this_object.scrollTo('.error');
                        }
                    }
				}));

                // Bind event for form reset
				form.addEventListener('reset', this_object.deBounce(function() {
                    const resetElements = form.querySelectorAll('input, select, textarea');
                    if (resetElements.length > 0) {
                        resetElements.forEach(function(element) {
                            if (this_object.isMatch(element.type, 'checkbox') ||
                                this_object.isMatch(element.type, 'radio') ||
                                this_object.isMatch(element.type, 'select-one') ||
                                this_object.isMatch(element.type, 'select-multiple')) {
                                element.dispatchEvent(new Event('change', { bubbles: true }));
                            } else {
                                if (element.closest('div.iweb-input-autocomplete')) {
                                    // Remove error & tips
                                    element.closest('div.iweb-input-autocomplete').classList.remove('error');
                                    element.closest('div.iweb-input-autocomplete').querySelector('small.tips')?.remove();

                                    const fillId = element.closest('div.iweb-input-autocomplete').querySelector('input.fill-id');
                                    const fillText = element.closest('div.iweb-input-autocomplete').querySelector('input.fill-text');
                                    element.closest('div.iweb-input-autocomplete').querySelector('a.fill-reset')?.remove();

                                    if (this_object.isValue(fillText.getAttribute('data-value')) && this_object.isValue(fillText.getAttribute('data-default'))) {
                                        fillId.value = fillText.getAttribute('data-value');
                                        fillText.value = fillText.getAttribute('data-default');
                                        fillText.readOnly = false;

                                        // Create reset button
                                        const fillReset = document.createElement('a');
                                        fillReset.classList.add('fill-reset');

                                        // Create Reset icon
                                        const fillResetIcon = document.createElement('i');
                                        fillResetIcon.classList.add('fa');
                                        fillResetIcon.classList.add('fa-times');
                                        fillResetIcon.style.color = '#d73d32';

                                        // Append elements
                                        fillReset.appendChild(fillResetIcon);
                                        element.closest('div.iweb-input-autocomplete').appendChild(fillReset);
                                    }
                                } else {
                                    element.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                            }
                        });
                    }
				}, 100, false));
			});
		}
	}

	uploader(options, callBack) {
		const this_object = this;

		// Create input file
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.multiple = true;
		fileInput.addEventListener('change', this_object.deBounce(function(e) {
            const fileInput = this;
            const target = e.target;
            
			// Max 7 files
			const maxFiles = 7;
			let selectedFiles = fileInput.files;
			if (selectedFiles.length > maxFiles) {
				selectedFiles = Array.from(selectedFiles).slice(0, maxFiles);
			}
			this_object.uploader_files['selected_files'] = selectedFiles;
			this_object.uploader_files_skip['selected_files'] = [-1];
			this_object.uploader_options['selected_files'] = {
				dataType: 'json',
				url: '',
				values: {},
				allowed_types: '',
				max_filesize: 64,
				type_error_message: this_object.language[this_object.current_language]['type_error'],
				max_error_message: this_object.language[this_object.current_language]['max_error'],
				btnStartAll: '<i class="fa fa-cloud-upload"></i>',
				btnClose: '<i class="fa fa-close"></i>',
				btnStart: '<i class="fa fa-cloud-upload"></i>',
				btnRemove: '<i class="fa fa-trash"></i>',
				auto_close: false
			};
			if (this_object.isValue(options)) {
				Object.assign(this_object.uploader_options['selected_files'], options);
			}
			if (this_object.isValue(this_object.uploader_options['selected_files'].allowed_types)) {
				this_object.uploader_options['selected_files'].allowed_types = this_object.uploader_options['selected_files'].allowed_types.split('|');
			}
			this_object.uploader_options['selected_files'].max_error_message = this_object.uploader_options['selected_files'].max_error_message.replace('{num}', this_object.uploader_options['selected_files'].max_filesize);

			// Create upload panel
			if (this_object.isValue(this_object.uploader_options['selected_files'].url) && this_object.uploader_files['selected_files'].length > 0) {
				// Create div for button
				const uploaderDiv = document.createElement('div');
				uploaderDiv.classList.add('action');

				const startAllButton = document.createElement('button');
				startAllButton.type = 'button';
				startAllButton.classList.add('start-all');
				startAllButton.innerHTML = this_object.uploader_options['selected_files'].btnStartAll;

				const closeAllButton = document.createElement('button');
				closeAllButton.type = 'button';
				closeAllButton.classList.add('close');
				closeAllButton.innerHTML = this_object.uploader_options['selected_files'].btnClose;

				uploaderDiv.appendChild(startAllButton);
				uploaderDiv.appendChild(closeAllButton);

				// Create div for list
				const listContainer = document.createElement('div');
				listContainer.classList.add('list');

				// Append elements
				const dialogContent = document.createElement('div');
				dialogContent.appendChild(uploaderDiv);
				dialogContent.appendChild(listContainer);

				// Preview list
				this_object.dialog(dialogContent.innerHTML, function() {
					this_object.uploaderPreview(this_object.uploader_files['selected_files']);

					// Event handlers
					const startAllButton = document.querySelector('div.iweb-info-dialog.uploader > div > div.content > div > div.action > button.start-all');
					const closeAllButton = document.querySelector('div.iweb-info-dialog.uploader > div > div.content > div > div.action > button.close');
					const listContainer = document.querySelector('div.iweb-info-dialog.uploader > div > div.content > div > div.list');

					startAllButton.addEventListener('click', this_object.deBounce(function() {
                        const items = listContainer.querySelectorAll('div.item');
                        let loop_upload_index = [];
                        items.forEach(function(item) {
                            loop_upload_index.push(item.getAttribute('data-index').toString());
                        });
                        this_object.uploaderStart(-1, loop_upload_index, loop_upload_index[loop_upload_index.length - 1]);
					}));

					closeAllButton.addEventListener('click', this_object.deBounce(function() {
						document.querySelector('div.iweb-info-dialog.uploader > div > div.content > a.btn-close').dispatchEvent(new Event('click', { bubbles: true }));
					}));

					listContainer.querySelectorAll('div.item > button.start').forEach(function(button) {
						button.addEventListener('click', this_object.deBounce(function(e1) {
							const target = e1.target;
                            this_object.uploaderStart(target.closest('div.item').getAttribute('data-index'));
						}));
					});

					listContainer.querySelectorAll('div.item > button.remove').forEach(function(button) {
						button.addEventListener('click', this_object.deBounce(function(e2) {
							const target = e2.target;
                            this_object.uploader_files_skip['selected_files'].push(target.closest('div.item').getAttribute('data-index').toString());
                            target.closest('div.item').remove();
                            if (listContainer.querySelectorAll('div.item').length === 0) {
                                document.querySelector('div.iweb-info-dialog.uploader > div > div.content > a.btn-close').dispatchEvent(new Event('click', { bubbles: true }));
                            }
						}));
					});
				}, function() {
					// Callback if need
					if ((typeof callBack) === 'function') {
						callBack();
					}
				}, 'uploader');
			}
		}));
        
        // Auto click
		fileInput.click();
	}

	uploaderArea(file_input_id, options, callBack) {
		const this_object = this;

		// Create input file
		const fileInput = document.getElementById(file_input_id);
        fileInput.removeAttribute('name');
		fileInput.multiple = true;
		fileInput.addEventListener('change', this_object.deBounce(function(e) {
            const fileInput = this;
            const target = e.target;
            
            // Max 7 files
			const maxFiles = 7;
			let selectedFiles = fileInput.files;
			if (selectedFiles.length > maxFiles) {
				selectedFiles = Array.from(selectedFiles).slice(0, maxFiles);
			}
			this_object.uploader_files['inline_selected_files_' + this_object.imd5.hash(file_input_id)] = selectedFiles;
			this_object.uploader_files_skip['inline_selected_files_' + this_object.imd5.hash(file_input_id)] = [-1];
			this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)] = {
				dataType: 'json',
				url: '',
				values: {},
				allowed_types: '',
				max_filesize: 64,
				type_error_message: this_object.language[this_object.current_language]['type_error'],
				max_error_message: this_object.language[this_object.current_language]['max_error'],
				btnStartAll: '<i class="fa fa-cloud-upload"></i>',
				btnClose: '<i class="fa fa-close"></i>',
				btnStart: '<i class="fa fa-cloud-upload"></i>',
				btnRemove: '<i class="fa fa-trash"></i>',
				auto_close: false
			};
			if (this_object.isValue(options)) {
				this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)] = Object.assign(
					this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)],
					options
				);
			}
			if (this_object.isValue(this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].allowed_types)) {
				this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].allowed_types = this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].allowed_types.split('|');
			}
			this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].max_error_message = this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].max_error_message.replace('{num}', this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].max_filesize);

			if (this_object.isValue(this_object.uploader_options['inline_selected_files_' + this_object.imd5.hash(file_input_id)].url) && fileInput.files.length > 0) {
                const uploaderAreDiv = target.closest('div.iweb-files-dropzone').querySelector('div.iweb-files-uploader');
                
				// Create div for button
				const uploaderDiv = document.createElement('div');
				uploaderDiv.className = 'action';

				const startAllButton = document.createElement('button');
				startAllButton.className = 'start-all';
				startAllButton.type = 'button';
				startAllButton.title = 'Start All';
				startAllButton.innerHTML = '<i class="fa fa-cloud-upload"></i>';

				const closeAllButton = document.createElement('button');
				closeAllButton.className = 'close';
				closeAllButton.type = 'button';
				closeAllButton.innerHTML = '<i class="fa fa-close"></i>';

				const listContainer = document.createElement('div');
				listContainer.classList.add('list');

                // Append elements
                uploaderDiv.appendChild(startAllButton);
                uploaderDiv.appendChild(closeAllButton);
				uploaderAreDiv.appendChild(uploaderDiv);
				uploaderAreDiv.appendChild(listContainer);

				// Preview list
				this_object.uploaderPreview(this_object.uploader_files['inline_selected_files_' + this_object.imd5.hash(file_input_id)], 0, file_input_id);

                // Event handlers
                startAllButton.addEventListener('click', this_object.deBounce(function() {
					const items = listContainer.querySelectorAll('div.item');
                    let loop_upload_index = [];
                    items.forEach(function(item) {
                        loop_upload_index.push(item.getAttribute('data-index').toString());
                    });
                    this_object.uploaderStart(-1, loop_upload_index, loop_upload_index[loop_upload_index.length - 1], file_input_id);
				}));
                
                closeAllButton.addEventListener('click', this_object.deBounce(function() {
					uploaderAreDiv.innerHTML = '';
                    fileInput.value = '';
                    // Callback if need
                    if ((typeof callBack) === 'function') {
                        callBack();
                    }
				}));
                
				listContainer.querySelectorAll('div.item > button.start').forEach(function(button) {
					button.addEventListener('click', this_object.deBounce(function(e1) {
						const target = e1.target;
                        this_object.uploaderStart(target.closest('div.item').getAttribute('data-index'), null, null, file_input_id);
					}));
				});

				listContainer.querySelectorAll('div.item > button.remove').forEach(function(button) {
					button.addEventListener('click', this_object.deBounce(function(e2) {
						const target = e2.target;
                        this_object.uploader_files_skip['inline_selected_files_' + this_object.imd5.hash(file_input_id)].push(target.closest('div.item').getAttribute('data-index').toString());
                        target.closest('div.item').remove();
                        if (listContainer.querySelectorAll('div.item').length === 0) {
                            uploaderAreDiv.innerHTML = '';
                            fileInput.value = '';
                        }
					}));
				});
			}
		}));
        
        // Append elements
		const parent = fileInput.parentElement;
		parent.id = file_input_id + '-iweb-files-dropzone';
		parent.classList.add('iweb-files-dropzone');

		const uploaderDiv = document.createElement('div');
		uploaderDiv.className = 'iweb-files-uploader';
		parent.appendChild(uploaderDiv);
	}

	uploaderPreview(selectingFiles, key = 0, file_input_id) {
		const this_object = this;
		const regex = /^(.*)(.jpg|.jpeg|.gif|.png|.bmp)$/;

		if (key >= selectingFiles.length) return; // Exit if there are no more files

		let file = selectingFiles[key];
		let extension = file.name.split('.').pop().toLowerCase();
		let checking = true;

		const itemDiv = document.createElement('div');
		itemDiv.classList.add('item');
		itemDiv.setAttribute('data-index', key);

		const photoDiv = document.createElement('div');
		photoDiv.classList.add('photo');
		const imgElement = document.createElement('img');

		if (regex.test(file.name.toLowerCase()) && (typeof(FileReader) !== 'undefined')) {
			const reader = new FileReader();
			reader.onload = function(e) {
				imgElement.src = e.target.result;
				photoDiv.appendChild(imgElement);
			};
			reader.readAsDataURL(file);
		} else {
			const fileIcons = {
				pdf: '<i class="fa fa-file-pdf-o" style="color:#ef4130;"></i>',
				doc: '<i class="fa fa-file-word-o" style="color:#5091cd;"></i>',
				docx: '<i class="fa fa-file-word-o" style="color:#5091cd;"></i>',
				xls: '<i class="fa fa-file-excel-o" style="color:#66cdaa;"></i>',
				xlsx: '<i class="fa fa-file-excel-o" style="color:#66cdaa;"></i>',
				ppt: '<i class="fa fa-file-powerpoint-o" style="color:#f7b002;"></i>',
				pptx: '<i class="fa fa-file-powerpoint-o" style="color:#f7b002;"></i>',
				txt: '<i class="fa fa-file-text-o"></i>',
				avi: '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>',
				mov: '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>',
				mp4: '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>',
				ogg: '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>',
				wmv: '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>',
				webm: '<i class="fa fa-file-video-o" style="color:#5091cd;"></i>',
				mp3: '<i class="fa fa-file-audio-o" style="color:#66cdaa;"></i>',
				wav: '<i class="fa fa-file-audio-o" style="color:#66cdaa;"></i>',
				rar: '<i class="fa fa-file-zip-o" style="color:#f7b002;"></i>',
				zip: '<i class="fa fa-file-zip-o" style="color:#f7b002;"></i>'
			};
			photoDiv.innerHTML = fileIcons[extension] || '<i class="fa fa-file-code-o"></i>';
		}

		itemDiv.appendChild(photoDiv);

		const infoDiv = document.createElement('div');
		infoDiv.classList.add('info');

		const titleDiv = document.createElement('div');
		titleDiv.classList.add('title');
		titleDiv.textContent = file.name;
		infoDiv.appendChild(titleDiv);

		const sizeDiv = document.createElement('div');
		sizeDiv.classList.add('size');
		sizeDiv.textContent = this_object.formatBytes(file.size, 0);
		infoDiv.appendChild(sizeDiv);

		const hashKey = this_object.isValue(file_input_id) ?
			'inline_selected_files_' + this_object.imd5.hash(file_input_id) :
			'selected_files';

		const options = this_object.uploader_options[hashKey];
		const allowedTypes = options.allowed_types || [];
		const maxFileSize = options.max_filesize * 1024 * 1024;

		if (allowedTypes.length && allowedTypes.indexOf(extension) < 0) {
			const tipsDiv = document.createElement('div');
			tipsDiv.classList.add('tips');
			tipsDiv.innerHTML = '<small>' + options.type_error_message + '</small>';
			infoDiv.appendChild(tipsDiv);
			checking = false;
		} else if (file.size > maxFileSize) {
			const tipsDiv = document.createElement('div');
			tipsDiv.classList.add('tips');
			tipsDiv.innerHTML = '<small>' + options.max_error_message + '</small>';
			infoDiv.appendChild(tipsDiv);
			checking = false;
		} else {
			const progressBar = document.createElement('div');
			progressBar.classList.add('progress-bar');
			progressBar.innerHTML = '<div class="percent"></div>';
			infoDiv.appendChild(progressBar);
		}

		itemDiv.appendChild(infoDiv);

		if (checking) {
			const startButton = document.createElement('button');
			startButton.type = 'button';
			startButton.classList.add('start');
			startButton.innerHTML = '<i class="fa fa-cloud-upload"></i>';
			itemDiv.appendChild(startButton);
		}

		const removeButton = document.createElement('button');
		removeButton.type = 'button';
		removeButton.classList.add('remove');
		removeButton.innerHTML = '<i class="fa fa-trash"></i>';
		itemDiv.appendChild(removeButton);

		const dropzone = this_object.isValue(file_input_id) ?
			'#' + file_input_id + '-iweb-files-dropzone > div.iweb-files-uploader > div.list' :
			'div.iweb-info-dialog.uploader > div > div.content > div > div.list';

		document.querySelector(dropzone).appendChild(itemDiv);

		// Continue to preview the next file
		this_object.uploaderPreview(selectingFiles, key + 1, file_input_id);
	}

	uploaderStart(index, loop_upload_index, last_upload_index, file_input_id) {
		const this_object = this;

		let mainIndex = 'selected_files';
		if (this_object.isValue(file_input_id)) {
			mainIndex = 'inline_selected_files_' + this_object.imd5.hash(file_input_id);
		}

		// Helper function to safely call if the function is defined
		const safeEndFunction = () => {
			const uploaderDialog = (this_object.isValue(file_input_id)) ? document.querySelector('#' + file_input_id + '-iweb-files-dropzone') : document.querySelector('div.iweb-info-dialog.uploader');
			if (uploaderDialog) {
				const startCount = uploaderDialog.querySelectorAll('div.list > div.item > button.start').length;
				if (parseInt(startCount) === 0) {
					uploaderDialog.querySelector('div.action > button.start-all')?.remove();
					if (this_object.uploader_options[mainIndex].auto_close) {
						uploaderDialog.querySelector('div.action > button.close').dispatchEvent(new Event('click', { bubbles: true }));
					}
				}
				uploaderDialog.classList.remove('busy');
			}
		};

		const uploaderDialog = (this_object.isValue(file_input_id)) ? document.querySelector('#' + file_input_id + '-iweb-files-dropzone') : document.querySelector('div.iweb-info-dialog.uploader');
		uploaderDialog.classList.add('busy');

		// Init
		let isBatch = true;
		if (!this_object.isValue(loop_upload_index)) {
			loop_upload_index = [index];
			last_upload_index = index;
			isBatch = false;
		} else {
			index = index + 1;
		}

		// Upload one by one
		if (parseInt(index) <= parseInt(last_upload_index)) {
			if (!loop_upload_index.includes(index.toString())) {
				if (isBatch) {
					this_object.uploaderStart(index, loop_upload_index, last_upload_index, file_input_id);
				} else {
					safeEndFunction();
				}
			} else {
				if (this_object.isValue(this_object.uploader_files[mainIndex]) && !this_object.uploader_files_skip[mainIndex].includes(index.toString())) {
					this_object.uploader_files_skip[mainIndex].push(index.toString());

					const selectingFiles = this_object.uploader_files[mainIndex];
					const extension = selectingFiles[index].name.split('.').pop().toLowerCase();
					let checking = true;
					if (this_object.isValue(this_object.uploader_options[mainIndex].allowed_types) && !this_object.uploader_options[mainIndex].allowed_types.includes(extension.toString())) {
						checking = false;
					} else if (selectingFiles[index].size > this_object.uploader_options[mainIndex].max_filesize * 1024 * 1024) {
						checking = false;
					}

					if (checking) {
						let post_data = {
							dataType: 'json',
							showBusy: false,
							url: this_object.uploader_options[mainIndex].url,
							values: {}
						};

						const formData = new FormData();
						formData.append('page_action', 'file_upload');
						if (this_object.isValue(this_object.uploader_options[mainIndex].values)) {
                            const extra_values = this_object.uploader_options[mainIndex].values;
                            for (let key in extra_values) {
                                if (extra_values.hasOwnProperty(key)) {
                                    formData.append(key, extra_values[key]);
                                }
                            }
						}
						formData.append('myfile', selectingFiles[index], selectingFiles[index].name);
						formData.forEach(function(value, key) {
							post_data.values[key] = value;
						});
                        
						this_object.ajaxPost(post_data, function(responseData) {
							const itemDiv = uploaderDialog.querySelector('div.list > div.item[data-index="' + index + '"]');
							itemDiv.querySelector('div.info > div.progress-bar')?.remove();

							const message = (responseData.message || responseData);
							const infoDiv = itemDiv.querySelector('div.info');
							const tipsDiv = document.createElement('div');
							tipsDiv.classList.add('tips');
							tipsDiv.innerHTML = '<small>' + message + '</small>';
							infoDiv.appendChild(tipsDiv);

							// Next
							if (isBatch) {
								this_object.uploaderStart(index, loop_upload_index, last_upload_index, file_input_id);
							} else {
								safeEndFunction();
							}
						}, null, function(percentage) {
							const itemDiv = uploaderDialog.querySelector('div.list > div.item[data-index="' + index + '"]');
							itemDiv.querySelector('button.start')?.remove();
							itemDiv.querySelector('button.remove')?.remove();

							const progressBarPercent = itemDiv.querySelector('div.info > div.progress-bar > div.percent');
							if (progressBarPercent) {
								progressBarPercent.style.width = percentage + '%';
							}
						});
					} else {
						const itemDiv = uploaderDialog.querySelector('div.list > div.item[data-index="' + index + '"]');
						itemDiv.querySelector('button.start')?.remove();
						itemDiv.querySelector('button.remove')?.remove();

						// Next
						if (isBatch) {
							this_object.uploaderStart(index, loop_upload_index, last_upload_index, file_input_id);
						} else {
							safeEndFunction();
						}
					}
				} else {
					if (isBatch) {
						this_object.uploaderStart(index, loop_upload_index, last_upload_index, file_input_id);
					} else {
						safeEndFunction();
					}
				}
			}
		} else {
			safeEndFunction();
		}
	}

	// dialog
	alert(message, callBack, customizeClassName) {
		// Prevent duplicate dialogs
		if (document.querySelectorAll('div.iweb-alert-dialog').length > 0) {
			return;
		}

		const this_object = this;
        if(this_object.isValue(message)) {
            // Create div
            const alertDialog = document.createElement('div');
            alertDialog.classList.add('iweb-alert-dialog');
            if (this_object.isValue(customizeClassName)) {
                alertDialog.classList.add(customizeClassName);
            }

            const innerDiv = document.createElement('div');
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');
            contentDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            contentDiv.style.transform = 'translateY(-320%)';
            contentDiv.style.opacity = '0';

            const detailsDiv = document.createElement('div');
            detailsDiv.innerHTML = message;

            // Create close button
            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.classList.add('btn');
            closeButton.classList.add('btn-close');
            closeButton.textContent = this_object.language[this_object.current_language]['btn_confirm'];
            closeButton.addEventListener('click', this_object.deBounce(function(e) {
                const target = e.target;
                contentDiv.style.transform = 'translateY(-320%)';
                contentDiv.style.transform = '0';
                contentDiv.addEventListener('transitionend', function() {
                    target.closest('div.iweb-alert-dialog').remove();
                    if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                        document.body.classList.remove('iweb-disable-scroll');
                    }

                    // Callback if need
                    if ((typeof callBack) === 'function') {
                        callBack();
                    }
                }, {
                    once: true
                });
            }));

            // Append to body
            const viewer = document.querySelector('div.iweb-viewer');
            innerDiv.appendChild(contentDiv);
            contentDiv.appendChild(detailsDiv);
            contentDiv.appendChild(closeButton);
            alertDialog.appendChild(innerDiv);
            viewer.insertBefore(alertDialog, viewer.firstChild);
            document.body.classList.add('iweb-disable-scroll');

            // Show dialog
            setTimeout(function() {
                this_object.showBusy(false);
                contentDiv.style.transform = 'translateY(0)';
                contentDiv.style.opacity = '1';
            }, 100);
        }
	}

	confirm(message, callBack, customizeClassName) {
		// Prevent duplicate dialogs
		if (document.querySelectorAll('div.iweb-alert-dialog').length > 0) {
			return;
		}

		const this_object = this;
        if(this_object.isValue(message)) {
            // Create div
            const alertDialog = document.createElement('div');
            alertDialog.classList.add('iweb-alert-dialog');
            if (this_object.isValue(customizeClassName)) {
                alertDialog.classList.add(customizeClassName);
            }

            const innerDiv = document.createElement('div');
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');
            contentDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            contentDiv.style.transform = 'translateY(-320%)';
            contentDiv.style.opacity = '0';

            const detailsDiv = document.createElement('div');
            detailsDiv.innerHTML = message;

            // Create the yes/no button
            const yesButton = document.createElement('button');
            yesButton.type = 'button';
            yesButton.classList.add('btn');
            yesButton.classList.add('btn-yes');
            yesButton.textContent = this_object.language[this_object.current_language]['btn_yes'];
            yesButton.addEventListener('click', this_object.deBounce(function(e) {
                const target = e.target;
                contentDiv.style.transform = 'translateY(-320%)';
                contentDiv.style.transform = '0';
                contentDiv.addEventListener('transitionend', function() {
                    target.closest('div.iweb-alert-dialog').remove();
                    if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                        document.body.classList.remove('iweb-disable-scroll');
                    }

                    // Callback if need
                    if ((typeof callBack) === 'function') {
                        callBack(true);
                    }
                }, {
                    once: true
                });
            }));

            const noButton = document.createElement('button');
            noButton.type = 'button';
            noButton.classList.add('btn');
            noButton.classList.add('btn-no');
            noButton.textContent = this_object.language[this_object.current_language]['btn_no'];
            noButton.addEventListener('click', this_object.deBounce(function(e) {
                const target = e.target;
                contentDiv.style.transform = 'translateY(-320%)';
                contentDiv.style.transform = '0';
                contentDiv.addEventListener('transitionend', function() {
                    target.closest('div.iweb-alert-dialog').remove();
                    if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                        document.body.classList.remove('iweb-disable-scroll');
                    }

                    // Callback if need
                    if ((typeof callBack) === 'function') {
                        callBack(false);
                    }
                }, {
                    once: true
                });
            }));

            // Append to body
            const viewer = document.querySelector('div.iweb-viewer');
            innerDiv.appendChild(contentDiv);
            contentDiv.appendChild(detailsDiv);
            contentDiv.appendChild(yesButton);
            contentDiv.appendChild(noButton);
            alertDialog.appendChild(innerDiv);
            viewer.insertBefore(alertDialog, viewer.firstChild);
            document.body.classList.add('iweb-disable-scroll');

            setTimeout(function() {
                this_object.showBusy(false);
                contentDiv.style.transform = 'translateY(0)';
                contentDiv.style.opacity = '1';
            }, 100);
        }
	}

	dialog(htmlContent, initFunc, callBack, customizeClassName) {
		// Prevent duplicate dialogs
		if (document.querySelector('div.iweb-info-dialog')) {
			return;
		}

		const this_object = this;
        if(this_object.isValue(htmlContent)) {
            // Create div
            const infoDialog = document.createElement('div');
            infoDialog.classList.add('iweb-info-dialog');
            if (this_object.isValue(customizeClassName)) {
                infoDialog.classList.add(customizeClassName);
            }

            const innerDiv = document.createElement('div');
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');
            contentDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            contentDiv.style.transform = 'translateY(-320%)';
            contentDiv.style.opacity = '0';

            const detailsDiv = document.createElement('div');
            if ((typeof htmlContent) === 'string') {
                detailsDiv.insertAdjacentHTML('beforeend', htmlContent);
            } else {
                detailsDiv.appendChild(htmlContent);
            }

            // Create the close button
            const closeButton = document.createElement('a');
            closeButton.classList.add('btn');
            closeButton.classList.add('btn-close');
            closeButton.addEventListener('click', this_object.deBounce(function(e) {
                const target = e.target;
                contentDiv.style.transform = 'translateY(-320%)';
                contentDiv.style.transform = '0';
                contentDiv.addEventListener('transitionend', function() {
                    target.closest('div.iweb-info-dialog').remove();
                    if (document.querySelectorAll('div.iweb-alert-dialog').length === 0 && document.querySelectorAll('div.iweb-info-dialog').length === 0) {
                        document.body.classList.remove('iweb-disable-scroll');
                    }

                    // Callback if need
                    if ((typeof callBack) === 'function') {
                        callBack();
                    }
                }, {
                    once: true
                });
            }));

            // Append to body
            const viewer = document.querySelector('div.iweb-viewer');
            innerDiv.appendChild(contentDiv);
            contentDiv.appendChild(detailsDiv);
            contentDiv.appendChild(closeButton);
            infoDialog.appendChild(innerDiv);
            viewer.insertBefore(infoDialog, viewer.firstChild);
            document.body.classList.add('iweb-disable-scroll');

            // Show dialog
            setTimeout(function() {
                this_object.showBusy(false);
                
                // init component & form
                this_object.initComponent();
                this_object.initForm();

                // Callback if need
                if ((typeof initFunc) === 'function') {
                    initFunc();
                }

                contentDiv.style.transform = 'translateY(0)';
                contentDiv.style.opacity = '1';
            }, 100);
        }
	}
    
    tipsMsg(message, isSuccess = false, callBack) {
        const this_object = this;
        if(this_object.isValue(message)) {
            const tipsMessageArea = document.querySelector('div.iweb-tips-message');
            if (tipsMessageArea) {
                const defaultOffset = (tipsMessageArea.getAttribute('data-offset') || 0);
                tipsMessageArea.classList.remove('error');
                tipsMessageArea.classList.remove('success');
                tipsMessageArea.classList.add(((isSuccess)? 'success' : 'error'));
                tipsMessageArea.innerHTML = '';
                const divElement = document.createElement('div');
                const closeButton = document.createElement('a');
                closeButton.className = 'close';
                closeButton.textContent = '×';
                const messageSpan = document.createElement('span');
                messageSpan.textContent = message;
                divElement.appendChild(closeButton);
                divElement.appendChild(messageSpan);
                tipsMessageArea.appendChild(divElement);
                this_object.scrollTo('div.iweb-tips-message', parseInt(defaultOffset));
                // Callback if need
                if ((typeof callBack) === 'function') {
                    callBack();
                }
            } else {
                this_object.alert(message, callBack);
            }
        }
        else {
            // Callback if need
            if ((typeof callBack) === 'function') {
                callBack();
            }
        }
    }

	// bind event
    bindEvent(eventType, selector, callBack) {
        const this_object = this;
        
        // If the eventType is not yet handled, set it up
        if (!this_object.eventMap[eventType]) {
            this_object.eventMap[eventType] = [];

            // Add a single event listener for the document on this event type
            document.addEventListener(eventType, function(e) {
                // Loop through all the registered selectors for this event type
                this_object.eventMap[eventType].forEach(function(item) {
                    const target = e.target.closest(item.selector);
                    if (target) {
                        // Call the corresponding callback with the target and event
                        item.callBack(target, e);
                    }
                });
            });
        }

        // Add the selector and its callback to the event map
        this_object.eventMap[eventType].push({ selector, callBack });
    }
    
    unBindEvent(eventType, selector) {
        if (this.eventMap[eventType]) {
            // Filter out the event listener that matches the selector
            this.eventMap[eventType] = this.eventMap[eventType].filter(item => item.selector !== selector);

            // If there are no more selectors for this event type, clean up
            if (this.eventMap[eventType].length === 0) {
                delete this.eventMap[eventType];
            }
        }
    }
    
    triggerEvent(eventType, selector) {
        const target = document.querySelector(selector);
        if (target) {
            // Create a new event with the specified type
            const customEvent = new Event(eventType, { 
                bubbles: true, // Allow the event to bubble up
                cancelable: true // Allow the event to be canceled
            });
            target.dispatchEvent(customEvent);
        }
    }

	// validation
	isValue(value) {
		if ((typeof value) === 'undefined' || value === null) {
			return false;
		} else if (value instanceof HTMLElement) {
			return value.outerHTML.trim() !== '';
		} else if ((typeof value) === 'object') {
			return Array.isArray(value) ? value.length > 0 : Object.keys(value).length > 0;
		}

		return value.toString().trim() !== '';
	}

	isMatch(value1, value2, sensitive = false) {
		const this_object = this;

		if (this_object.isValue(value1) && this_object.isValue(value2)) {
			const trimmedValue1 = (value1.toString().trim());
			const trimmedValue2 = (value2.toString().trim());
			return (sensitive) ? (trimmedValue1 === trimmedValue2) : (trimmedValue1.toLowerCase() === trimmedValue2.toLowerCase());
		}

		return false;
	}

	isNumber(value, digital_mode = false) {
		const this_object = this;
		const reg = ((digital_mode) ? /^[0-9]+$/ : /(^((-)?[1-9]{1}\d{0,2}|0\.|0$))(((\d)+)?)(((\.)(\d+))?)$/);

		if (this_object.isValue(value)) {
			return reg.test(value);
		}

		return false;
	}

	isEmail(value) {
		const this_object = this;
		const reg = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,}$/;

		if (this_object.isValue(value)) {
			return reg.test(value);
		}

		return false;
	}

	isPassword(value) {
		const this_object = this;
		const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

		if (this_object.isValue(value)) {
			return reg.test(value);
		}

		return false;
	}

	isDate(value, format = 'Y-m-d') {
		const this_object = this;
		const reg = /^(\d{4})(\-)(\d{2})(\-)(\d{2})$/;

		if (this_object.isValue(value)) {
			if (!this_object.isMatch(format, 'Y-m-d')) {
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

				return ((new Date(value) instanceof Date) && ymd_checking);
			}
		}

		return false;
	}
    
    isTime(value) {
        const this_object = this;
        const reg = /^(\d{2}):(\d{2})$/;

        if (this_object.isValue(value)) {
            const match = reg.exec(value);
            if (match) {
                const hours = parseInt(match[1], 10);
                const minutes = parseInt(match[2], 10);
                return (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59);
            }
        }
        return false;
    }

	// convert
	toNumber(value, currency_mode, decimal = 2, auto_beauty = true) {
		const this_object = this;

		value = value.toString().replace(/[^\d|\-|\.]/g, '');
		if (this_object.isNumber(value)) {
			if (this_object.isNumber(decimal) && parseInt(decimal) > 0) {
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
            if(auto_beauty) {
                value = value.toString().replace(/(\.\d+?)0+$/g, '$1');
                value = value.toString().replace(/(\.0)$/g, '');
            }
			if (this_object.isMatch(currency_mode, true)) {
                const [integerPart, decimalPart] = value.toString().split('.');
                const formattedInteger = integerPart.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
                return decimalPart?(formattedInteger + '.' + decimalPart):formattedInteger;
			} else {
				return value;
			}
		}
		return 0;
	}

	toDateTime(value, format = 'Y-m-d H:i:s') {
		const this_object = this;

		let now = ((this_object.isValue(value)) ? new Date(value) : new Date());
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
		const this_object = this;

		if (navigator.cookieEnabled) {
			if (this_object.isValue(cname)) {
				const d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				const expires = 'expires=' + d.toUTCString();
                const pathParts = window.location.pathname.split('/');
                const projectFolder = ((pathParts.length > 1 && pathParts[1] !== '') ? '/' + pathParts[1] + '/' : '/');
				document.cookie = cname + '=' + cvalue + ';' + expires + ';path=' + projectFolder;
			}
		} else {
			alert('Cookies Blocked or not supported by your browser.');
		}
	}

	getCookie(cname) {
		const this_object = this;
        
		if (navigator.cookieEnabled) {
			if (this_object.isValue(cname)) {
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
    
    deleteCookie(cname) {
        const this_object = this;
        this_object.setCookie(cname, '', -1);
    }

    // others
    deBounce(callBack, delay = 100, prevent = true) {
        let timeout;
        return function(e) {
            // Prevent default behavior
            if(prevent) {
                if (e && typeof e.preventDefault === 'function') {
                    e.preventDefault();
                }
            }
            
            //Clear the previous timer
            clearTimeout(timeout);
            
            // Capture `this` for the setTimeout callback
            const context = this;
            const args = arguments;
            
            //Set a new timer
            timeout = setTimeout(() => callBack.apply(context, args), delay);
        };
    }

	showBusy(status, value) {
		const this_object = this;

		if (this_object.isMatch(status, 1) || this_object.isMatch(status, true)) {
			if (document.querySelectorAll('div.iweb-processing').length === 0) {
				// Init opacity based on value
				let opacity = 1;
				if (this_object.isNumber(value, true)) {
					opacity = (Math.round(parseInt(value) / 100 * 100) / 100);
				}

				// Create the main div
				const processingDiv = document.createElement('div');
				processingDiv.classList.add('iweb-processing');
                if(parseFloat(opacity) === 0) {
                    processingDiv.style.opacity = 0;
                }
                else {
                    processingDiv.style.background = 'rgba(255, 255, 255, ' + opacity + ')';
                }
                

				// Create the inner loading div
				const loadingDiv = document.createElement('div');
				loadingDiv.classList.add('loading');

				// Create the SVG element
				const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				svgElement.setAttribute('width', '48px');
				svgElement.setAttribute('height', '48px');
				svgElement.setAttribute('viewBox', '0 0 100 100');
				svgElement.setAttribute('preserveAspectRatio', 'xMidYMid');

				// Create the circle element
				const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
				circleElement.setAttribute('cx', '50');
				circleElement.setAttribute('cy', '50');
				circleElement.setAttribute('fill', 'none');
				circleElement.setAttribute('stroke', '#dddddd');
				circleElement.setAttribute('stroke-width', '10');
				circleElement.setAttribute('r', '36');
				circleElement.setAttribute('stroke-dasharray', '169.64600329384882 58.548667764616276');

				// Create the animateTransform element
				const animateTransform = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
				animateTransform.setAttribute('attributeName', 'transform');
				animateTransform.setAttribute('type', 'rotate');
				animateTransform.setAttribute('repeatCount', 'indefinite');
				animateTransform.setAttribute('dur', '1s');
				animateTransform.setAttribute('values', '0 50 50;360 50 50');
				animateTransform.setAttribute('keyTimes', '0;1');

				// Append animateTransform to the circle
				circleElement.appendChild(animateTransform);

				// Append circle to the SVG element
				svgElement.appendChild(circleElement);

				// Append the SVG to the loading div
				loadingDiv.appendChild(svgElement);

				// Append the loading div to the main processing div
				processingDiv.appendChild(loadingDiv);

				// Insert the processingDiv into the document body
				document.body.insertBefore(processingDiv, document.body.firstChild);
			}
		} else {
			let microsecond = 0;
			if (this_object.isNumber(value, true)) {
				microsecond = parseInt(value);
			}
			setTimeout(function() {
				const processingDivs = document.querySelectorAll('div.iweb-processing');
				processingDivs.forEach(function(div) {
					div.remove();
				});
			}, microsecond);
		}
	}

	scrollTo(element, offset, callBack) {
		const this_object = this;
        const targetElement = document.querySelector(element);
       
		let element_scroll_top_value = 0;
        if (targetElement) {
            offset = (this_object.isValue(offset)) ? parseInt(offset) : 80;
            element_scroll_top_value = Math.max(0, parseInt(targetElement.getBoundingClientRect().top) + window.pageYOffset - offset);
        }
        
		// Smooth scrolling
		window.scrollTo({
			top: element_scroll_top_value,
			behavior: 'smooth'
		});

		// Callback if need
		setTimeout(function() {
			if (Math.abs(window.pageYOffset - element_scroll_top_value) <= 1) {
				if ((typeof callBack) === 'function') {
					callBack();
				}
			}
		}, 100);
	}

	formatBytes(bytes, decimals) {
		// Return '0 Bytes' if bytes is falsy (0, null, undefined, etc.)
		if (!bytes) return '0 Bytes';

		const k = 1024; // Base of the byte conversion
		const dm = (decimals < 0) ? 0 : decimals; // Determine decimal places
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; // Size units

		// Calculate the index for the size
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		// Format the bytes and append the appropriate size unit
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	};
    
    getURL(extra) {
		const this_object = this;
		return (window.location.href.split('?')[0]).toString() + ((this_object.isValue(extra)) ? ('/' + extra) : '');
	}
    
	getURLParameter(name) {
		const this_object = this;

		let parameter_value = '';
		if (this_object.isValue(name)) {
			let urlParameters = window.location.search.substring(1).split('&');
			for (let i = 0; i < parseInt(urlParameters.length); i++) {
				let currentParameter = urlParameters[i].split('=');
				let currentParameter_index = currentParameter[0];
				let currentParameter_value = currentParameter[1];
				if (this_object.isValue(currentParameter_index) && this_object.isValue(currentParameter_value)) {
					if (this_object.isMatch(currentParameter_index, name)) {
						parameter_value = currentParameter_value;
						break;
					}
				}
			}
		}
		return parameter_value;
	}
    
	randomNum(min, max) {
		const this_object = this;

		if (!this_object.isValue(min) || parseInt(min) < 0) {
			min = 0;
		}
		if (!this_object.isValue(max) || parseInt(max) < 1) {
			max = 1;
		}
		min = parseInt(min);
		max = parseInt(max);
		if (parseInt(min) > parseInt(max)) {
			min = 0;
			max = 1;
		}
		return parseInt(Math.random() * (max + 1 - min) + min);
	}
    
	randomString(length) {
		const this_object = this;

		const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		if (!this_object.isNumber(length)) {
			length = 12;
		}
        
		let result = '';
		for (let i = 0; i < length; i++) {
			let rnum = Math.floor(Math.random() * chars.length);
			result += chars.substring(rnum, rnum + 1);
		}
		return result;
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
		let a = x[0],
			b = x[1],
			c = x[2],
			d = x[3];

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
		this.lang = lang;
		this.dateFormat = dateFormat;
		this.calendarElement;
		this.currentDate = new Date();
		this.selectedDate;
		this.activeInputElement;
        
		document.addEventListener('click', (e) => {
			if (this.calendarElement &&
				!e.target.closest('input.idatepicker') &&
				!e.target.closest('div.idatepicker-calendar') &&
				e.target.id !== 'idatepicker-prev-month' &&
				e.target.id !== 'idatepicker-next-month') {
				this.hideCalendar();
			}
            else if(e.target.closest('input.idatepicker')) {
                this.onFocusInput(e.target);
            }
		});
	}

	render(elements) {
		// Add event listeners to new input elements if not already present
		const inputElements = document.querySelectorAll(elements);
		if (inputElements) {
			inputElements.forEach((inputElement) => {
				if (!inputElement.classList.contains('idatepicker')) {
					inputElement.type = 'text';
					inputElement.classList.add('idatepicker');
				}
			});
		}
	}

	onFocusInput(inputElement) {
		// Update the calendar date based on the input value if present
		let inputValue = inputElement.value;
		// Check if the input value matches the expected date format
		if (!(inputValue && this.isValidDateFormat(inputValue))) {
            inputValue = this.formatDate(new Date());
        }
        
        this.currentDate = this.parseDate(inputValue); // Parse the input date
        this.selectedDate = new Date(this.currentDate);
		this.activeInputElement = inputElement; // Set the active input element
		this.showCalendar(inputElement); // Display the calendar
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
			border: '2px solid #e6e6e6',
			borderRadius: '4px',
			boxSizing: 'border-box',
			marginTop: '2px',
			zIndex: '100'
		}, 'idatepicker-calendar');

		document.body.appendChild(this.calendarElement);

		// Position the calendar below the input element
		const rect = inputElement.getBoundingClientRect();
		this.calendarElement.style.top = (rect.bottom + window.scrollY) + 'px';
		this.calendarElement.style.left = (rect.left + window.scrollX) + 'px';

		this.buildCalendar(); // Build the calendar UI
	}

	hideCalendar() {
		// Remove the calendar from the DOM
		if (this.calendarElement) {
			this.calendarElement.remove();
			this.calendarElement;
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
		const headerDiv = this.createElement('div', {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '5px 0px 10px 0px'
		});

		const prevButton = this.createButton('🞀', 'idatepicker-prev-month', () => this.changeMonth(-1)); // Button to go to the previous month
		const monthYearSpan = this.createElement('span', {
			fontSize: '15px',
			fontWeight: 'bold'
		});
		monthYearSpan.textContent = this.currentDate.toLocaleString(this.lang === 'en' ? 'en' : 'zh', {
			month: 'short'
		}) + ' / ' + this.currentDate.getFullYear();

		const nextButton = this.createButton('🞂', 'idatepicker-next-month', () => this.changeMonth(1)); // Button to go to the next month

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
		button.type = 'button';
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
		const table = this.createElement('table', {
			width: '100%',
			borderCollapse: 'collapse'
		});
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
		days.forEach((day) => {
			const th = this.createElement('th', {
				width: '36px',
				height: '28px',
				fontSize: '12px',
				color: '#2ca4e9',
				padding: '4px',
				border: '2px solid #e6e6e6',
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
			border: '2px solid #e6e6e6',
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
            this.activeInputElement.dispatchEvent(new Event('change', { bubbles: true }));
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
		const [year, month, day] = (this.dateFormat.toString().toUpperCase()) === 'DD/MM/YYYY' ?
		dateString.split('/').map(Number).reverse(): dateString.split('-').map(Number);

		// Return a new Date object based on parsed values
		return new Date(year, month - 1, day);
	}

	formatDate(date) {
		// Format a date object into a string based on the specified dateFormat
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		// Return the date formatted according to the specified dateFormat
		if ((this.dateFormat.toString().toLowerCase()) === 'DD/MM/YYYY') {
			return day + '/' + month + '/' + year;
		}
		return year + '-' + month + '-' + day; // Default format: YYYY-MM-DD
	}
}

class iTimePicker {
    constructor() {
        this.activeInput = null; 
        document.addEventListener('click', (e) => {
			if (!e.target.closest('input.itimepicker') &&
				!e.target.closest('div.time-picker-list')) {
				this.hidePicker();
			}
            else if(e.target.closest('input.itimepicker')) {
                this.showTimePicker(e.target);
                this.formatInputTime(e.target);
            }
		});
    }
    
    render(elements) {
		// Add event listeners to new input elements if not already present
		const inputElements = document.querySelectorAll(elements);
		if (inputElements) {
			inputElements.forEach((inputElement) => {
				if (!inputElement.classList.contains('itimepicker')) {
					inputElement.type = 'text';
					inputElement.classList.add('itimepicker');
				}
			});
		}
	}

    showTimePicker(input) {
        this.hidePicker();
        
        this.activeInput = input; // Track the input currently being edited
        const startTime  = (parseInt(input.getAttribute('data-start')) || 800); // Use data-start or default to 800
        const endTime  = (parseInt(input.getAttribute('data-end')) || 2200); // Use data-end or default to 2200
        const interval = parseInt(input.getAttribute('data-interval')) || 5; // Use data-interval or default to 10
        const picker = this.createPicker(startTime , endTime , interval);
        document.body.appendChild(picker);

        const { top, left, height } = input.getBoundingClientRect();
        picker.style.position = 'absolute';
        picker.style.top = `${top + window.scrollY + height}px`;
        picker.style.left = `${left + window.scrollX}px`;

        picker.addEventListener('click', (e) => {
            if (e.target.classList.contains('time-option')) {
                this.activeInput.value = e.target.textContent;
                this.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
                this.hidePicker();
            }
        });
    }

    hidePicker() {
        const picker = document.querySelector('div.time-picker-list');
        if (picker) {
            picker.remove();
        }
    }

    createPicker(startTime , endTime , interval) {
        const picker = document.createElement('div');
        picker.classList.add('time-picker-list');
        picker.style.border = '2px solid #e6e6e6';
        picker.style.backgroundColor = '#fff';
        picker.style.padding = '10px';
        picker.style.marginTop = '2px';
        picker.style.maxHeight = '200px';
        picker.style.overflow = 'auto';
        picker.style.zIndex = '100';

        const times = this.generateTimeOptions(startTime , endTime , interval);
        times.forEach(time => {
            const timeOption = document.createElement('div');
            timeOption.textContent = time;
            timeOption.classList.add('time-option');
            timeOption.style.padding = '5px';
            timeOption.style.cursor = 'pointer';
            timeOption.style.borderBottom = '1px solid #f0f0f0';
            picker.appendChild(timeOption);
        });

        return picker;
    }

    generateTimeOptions(startTime, endTime, interval) {
        const times = [];
        const startHour = Math.floor(startTime / 100);
        const startMinute = startTime % 100;
        const endHour = Math.floor(endTime / 100);
        const endMinute = endTime % 100;

        let currentHour = startHour;
        let currentMinute = startMinute;

        while (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
            if(parseInt(currentHour) < 24) {
                times.push(this.formatTime(currentHour, currentMinute));
            }
            currentMinute += interval;
            if (currentMinute >= 60) {
                currentMinute = 0;
                currentHour++;
            }
        }

        return times;
    }
    
    formatTime(hour, minute) {
        const formattedHour = String(hour).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');
        return (formattedHour + ':' + formattedMinute);
    }
    
    formatInputTime(input) {
        const value = input.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length > 4) return; // Limit to 4 digits for HHMM

        if (value.length === 4) {
            // Format to HH:MM
            const hour = value.slice(0, 2);
            const minute = value.slice(2, 4);
            input.value = this.formatTime(parseInt(hour), parseInt(minute));
        }
    }
}

class iPagination {
	constructor(el, options) {
		this.settings = Object.assign({
			mode: 1,
			size: 5,
			total: 1,
			placeholder: ''
		}, options);

		this.currentPage = 1;
		this.url = new URL(window.location.href);
		this.searchParams = new URLSearchParams(this.url.search);
		if (this.searchParams.has('page')) {
			this.currentPage = Math.max(parseInt(this.searchParams.get('page')), 1);
		}
		this.searchParams.delete('page');
		this.baseUrl = this.url.origin + this.url.pathname + '?' + this.searchParams.toString();

		this.renderPagination(el);
	}

	createPageUrl(page) {
		return (this.baseUrl + '&page=' + page).replace('?&', '?');
	}

	jumpToPage(inputElement) {
		inputElement.addEventListener('keypress', (e) => {
			if (e.which === 13) {
				let jumpToPage = Math.min(Math.max(parseInt(inputElement.value) || 1, 1), inputElement.getAttribute('data-max'));
				window.location.href = this.createPageUrl(jumpToPage);
			}
		});
	}

	createPaginationElement(tag, className = '', content = '') {
		const element = document.createElement(tag);
		if (className) element.className = className;
		if (content) element.innerHTML = content;
		return element;
	}

	renderPagination(element) {
		if (!element.querySelector('.iweb-pagination')) {
			let pageSize = element.getAttribute('data-size') || this.settings.size;
			let totalPage = element.getAttribute('data-totalpage') || this.settings.total;

			let firstPage = 1;
			let prevPage = Math.max(this.currentPage - 1, firstPage);
			let nextPage = Math.min(this.currentPage + 1, totalPage);
			let lastPage = totalPage;
			let diffPageNum = Math.floor(pageSize / 2);
			let startPageNum = Math.max(this.currentPage - diffPageNum, firstPage);
			let endPageNum = Math.min(this.currentPage + diffPageNum, lastPage);

			if (endPageNum - startPageNum + 1 < pageSize) {
				if (this.currentPage < firstPage + diffPageNum) {
					endPageNum = Math.min(lastPage, startPageNum + pageSize - 1);
				} else {
					startPageNum = Math.max(firstPage, endPageNum - pageSize + 1);
				}
			}

			if (totalPage > 1) {
				// Create pagination container
				const paginationContainer = this.createPaginationElement('div', 'iweb-pagination');
				const paginationList = this.createPaginationElement('ul');

				// First Page
				let firstPageLink = this.createPaginationElement('a', 'first', this.settings.mode === 2 && this.currentPage > diffPageNum ? '<span>' + firstPage + '..</span>' : '<i></i><i></i>');
				firstPageLink.href = this.createPageUrl(firstPage);
				firstPageLink.title = 'First Page';
				let firstLi = this.createPaginationElement('li');
				firstLi.appendChild(firstPageLink);
				paginationList.appendChild(firstLi);

				// Previous Page
				let prevPageLink = this.createPaginationElement('a', 'prev', '<i></i>');
				prevPageLink.href = this.createPageUrl(prevPage);
				prevPageLink.title = 'Previous Page';
				let prevLi = this.createPaginationElement('li');
				prevLi.appendChild(prevPageLink);
				paginationList.appendChild(prevLi);

				// Page Numbers
				for (let i = startPageNum; i <= endPageNum; i++) {
					let pageLink = this.createPaginationElement('a', 'num' + (i === this.currentPage ? ' current' : ''), '<span>' + i + '</span>');
					pageLink.href = this.createPageUrl(i);
					let pageLi = this.createPaginationElement('li');
					pageLi.appendChild(pageLink);
					paginationList.appendChild(pageLi);
				}

				// Next Page
				let nextPageLink = this.createPaginationElement('a', 'next', '<i></i>');
				nextPageLink.href = this.createPageUrl(nextPage);
				nextPageLink.title = 'Next Page';
				let nextLi = this.createPaginationElement('li');
				nextLi.appendChild(nextPageLink);
				paginationList.appendChild(nextLi);

				// Last Page
				let lastPageLink = this.createPaginationElement('a', 'last', this.settings.mode === 2 && this.currentPage < totalPage - diffPageNum ? '<span>..' + lastPage + '</span>' : '<i></i><i></i>');
				lastPageLink.href = this.createPageUrl(lastPage);
				lastPageLink.title = 'Last Page';
				let lastLi = this.createPaginationElement('li');
				lastLi.appendChild(lastPageLink);
				paginationList.appendChild(lastLi);

				// Jump to Page Input
				let inputLi = this.createPaginationElement('li');
				let jumpInput = this.createPaginationElement('input', 'jumpto_page');
				jumpInput.type = 'text';
				jumpInput.placeholder = this.settings.placeholder;
				jumpInput.setAttribute('data-max', totalPage);
				this.jumpToPage(jumpInput);
				inputLi.appendChild(jumpInput);
				paginationList.appendChild(inputLi);

				// Append the list to the pagination container and the container to the element
				paginationContainer.appendChild(paginationList);
				element.appendChild(paginationContainer);
			}
		}
	}
}