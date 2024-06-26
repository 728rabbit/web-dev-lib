1.  load & init library
    ----------------------------------------------------------------------------
    <link href="icon/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="iweb.min.css" rel="stylesheet" type="text/css"/>
    <script src="jquery.min.js" type="text/javascript"></script>
    <script src="iweb.min.js" type="text/javascript"></script>

    // set language
    <html lang="en">
    <html lang="zh-hant">
    <html lang="zh-hans">


    // set csrf-token
    <meta name="csrf-token" content="96ca6fd5cc5283000910785ba2344044"/>
    
 
2.  Document ready functions:
    ----------------------------------------------------------------------------
    function iweb_global_func() { your common function(s) code here }

    function iweb_self_func() { your individual function(s) code here }

    function iweb_extra_func() { your extra function(s) code here }


3.  Window load functions:
    ----------------------------------------------------------------------------
    function iweb_layout_done() { your common layout function(s) code here }

    function iweb_self_layout_done() { your individual layout function(s) code here }

    function iweb_extra_layout_done() { your extra layout function(s) code here }

    function iweb_func_done() { your common function(s) code here }

    function iweb_self_func_done() { your individual function(s) code here }

    function iweb_extra_func_done() { your extra function(s) code here }


4.  Window resize functions:
    ----------------------------------------------------------------------------
    function iweb_global_layout() { your common layout function(s) code here }

    function iweb_self_layout() { your individual resize function(s) code here }

    function iweb_extra_layout() { your individual resize function(s) code here }


5.  Window scroll functions:
    ----------------------------------------------------------------------------
    function iweb_global_scroll(y) { your common scroll function(s) code here }

    function iweb_self_scroll(y) { your individual scroll function(s) code here }

    function iweb_extra_scroll(y) { your individual scroll function(s) code here }


    /********************************************************
    1. Detect the scrolling to bottom of the page?

    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {}


    2. How to detect when a DIV is scrolled to the bottom edge?

    jQuery('.scrollbar-dynamic').scrollbar({
        "onScroll": function(y, x){
            if(y.scroll == y.maxScroll){
                console.log('Scrolled to bottom');
            }
        }
    });
    *********************************************************/

6.  Show & hide processing:
    ----------------------------------------------------------------------------
    iweb.processing(status,option);
    - status: true or false
    - option: integer


7.  Responsive Aera:
    ----------------------------------------------------------------------------
    <div class="iweb-responsive" data-width="600" data-height="400">
        you content here
    </div>
    // force refresh, you can call this function: iweb.responsive();


    * extra embed responsive video in object
    e.g.
    <div class="iweb-editor"><iframe></iframe></div>

    // force refresh, you can call this function: iweb.iframe(element);
    - element: optional, default value is "iweb-editor"

8.  Validation:
    ----------------------------------------------------------------------------
    iweb.isValue(value);     // if value is empty, null & undefined, return false
    
    iweb.isNumber(value, digital_mode);  // if value is non-number, return false
    - digital_mode: true or false

    e.g
    iweb.isNumber('9999999')  // return true
    iweb.isNumber('9999.999')  // return true
    iweb.isNumber('0999.999') // retrun false
    iweb.isNumber('9,999.999') // retrun false
    iweb.isNumber('-9999999')  // return true
    
    // only 0-9
    iweb.isNumber('9999999',true)  // return true
    iweb.isNumber('9999.999',true)  // return false
    iweb.isNumber('0999.999',true) // retrun false
    iweb.isNumber('9,999.999',true) // retrun false
    iweb.isNumber('-9999999',true) // retrun false


    iweb.toNumber(value, currency_mode, decimal);  // convert value to number, if not number, return 0
    - currency: optional, true or false
    - decimal: optional, integer
    e.g. 
    iweb.toNumber(-987654321) => -987654321;
    iweb.toNumber(-987654321,false,2) => -987654321.00;
    iweb.toNumber(-987654321,true,2) => -987,654,321.00;

    iweb.isEmail(value);   // if value is invalid email, return false

    iweb.isPassword(value);
    // Password must contain at least 6 characters, including upper/lowercase and numbers (e.g. Abc123)
    // 密碼必須至少包含6個字符，包括大寫/小寫和數字（例如Abc123）

    iweb.isDate(value, format);  // if value is non-date, return false
    - format_mode: 'y-m-d' or 'd/m/y'

    iweb.isExist(element);   // if element not exist, return false

    iweb.isMatch(value1,value2, sensitive);   // compare tow vaule
    - sensitive: optional

    iweb.stringLength(string, maxlength);
    - maxlength: optional
    // if maxlength > 0, return true or false, check string whether larger than maxlength
    // else, return string length
    // 中文 = 2 bytes, 英文 = 1 byte


    data-validation="required|password|email|number|date"


9.  Alert Dialog:
    ----------------------------------------------------------------------------
    iweb.alert(message,callback,options);
    - message: required
    - callback: optional
    - options: optional

    e.g.
    iweb.alert('Hello World');
    
    iweb.alert('Hello World',function() {
        // close event here
    });

    iweb.alert('Hello World',null,{
        customizeClass: '',
        btnClose: 'Close'
    });
    
    iweb.alert('Hello World',function() {
        // close event here
    },{
        customizeClass: '',
        btnClose: 'Close'
    });


10. Confirm Dialog:
    ----------------------------------------------------------------------------
    iweb.confirm(message,callback,options);
    - message: required
    - callback: required
    - options: optional

    e.g. 

    iweb.confirm('Are your sure delete this item?',function(result) {
        // close event here
    });

    iweb.confirm('Are your sure delete this item?',function(result) {
        // close event here
    },{
        customizeClass: '',
        btnYes: 'Yes',
        btnNo: 'No'
    });


11. Popup Dialog:
    ----------------------------------------------------------------------------
    iweb.dialog(htmlcode,init,callback,customizeClass);
    - htmlcode: required
    - init: optional
    - callback: optional
    - customizeClass: optional

    e.g. 
    iweb.dialog('<div>Hello World</div>');

    iweb.dialog('<div>Hello World</div>',null,null,{class:your_class_name});

    iweb.dialog('<div>Hello World</div>',function() {
        // init event here
    },function() {
        // close event here
    },your_class_name);


12. Scroll to specific element:
    ----------------------------------------------------------------------------
    iweb.scrollto(element,adjustment_value,callback);  // value: adjustment parameters, default = 50
    - element: optional, if null, scroll to top
    - adjustment_value: optional
    - callback: optional
    
    e.g.
    iweb.scrollto();

    iweb.scrollto('#section1',null,function() { 
        after scroll, your code here
    }); 
    

13. Detect Mobile Device:
    ----------------------------------------------------------------------------
    iweb.detectDevice_device(specific_type);  // support android,blackberry,ios,opera & windows, default = all
    - specific_type: optional


14. Ajax post:
    ----------------------------------------------------------------------------
    iweb.post(post_data,callback){

    e.g.
    iweb.post({
        url: your_url_here,
        type: your_retrun_type_here, // default = json
        values: {
            name_1: value_1
            name_2: value_2
        },
        showProcessing: optional, default = true (true or 1: show loading & auto close, 2: show loading & not auto close, false or 0:, not show loading)
    },function(response_data) {
        // your code here
    });


15. Ajax Form:
    ----------------------------------------------------------------------------
    iweb.form(target_form_id,type,checkfunc,callback);

    e.g.
    <form id="testform" method="post" action="test.php" data-showProcessing="0">
        ......
    </form>

    data-showProcessing: default = true

    (true or 1: show loading & auto close, 2: show loading & not auto close, false or 0:, not show loading)


    iweb.form('#testform','json',function(form_data, form_object) {
        // form_data.push({ name:'exra_parameter', value: 'AAAA' });
        var check_status = true;
        // your code here
        return check_status;
    },function(response_data, form_objec) {
        // your code here
    });

    /* php verify csrf_token */
    function verifyCSRFToken() {
        $token = '96ca6fd5cc5283000910785ba2344044';  // your random code here
        $server_name = (($_SERVER['SERVER_NAME'])?$_SERVER['SERVER_NAME']:'/');
        $csrf_token = explode('%',base64_decode($_POST['itoken']));
        if(is_array($csrf_token) && !empty($csrf_token[0]) && !empty($csrf_token[1])){
            if(trim(md5(md5(md5('iweb@'.$_SERVER['SERVER_NAME']).'@'.$token).'#dt'.$csrf_token[1])) == trim($csrf_token[0])) {
                return true;
            }
        }
        return false;
    }


16. Cookie, getUrlParameter, randomNum & randomString 
    ----------------------------------------------------------------------------
    iweb.setCookie(name, value, days);
    - days: optional, default = 7

    iweb.getCookie(name);

    iweb.getUrl();
    iweb.getUrlParameter(name);

    iweb.randomNum();
    iweb.randomNum(2,5);

    iweb.randomString();
    
    
17. Pagination:
    ----------------------------------------------------------------------------
    <div class="mypage" data-totalpage="10"></div>

    iweb.pagination('your_class_name_here');

    e.g.
    iweb.pagination('.mypage');

    or

    iweb.pagination('.mypage',{
        mode: 1,
        size: 5,
        total: 10,
        placeholder: 'go to'
    });


18. tiny scrollbar
    ----------------------------------------------------------------------------
    iweb.scrollbar(element,mode,callback);

    e.g.

    #div1 {
        height: 300px;
    }

    #div1 > div {
        height: 100%;
    }

    iweb.scrollbar('#div1 > div');

    or

    iweb.scrollbar('#div1 > div','macosx');

    or

    iweb.scrollbar('#div1 > div','macosx',function({ your common function(s) code here }));
   
19. selector
    ----------------------------------------------------------------------------
    iweb.selector(select_object,callback);
    - select_object: optional, default = $('body').find('select');
    - callback: optional

    e.g.
    <select data-virtual="1">
        <optgroup label="Sport">
            <option value="Swimming">Swimming</option>
            <option value="Harbour Race">Harbour Race</option>
            <option value="Masters Swimming">Masters Swimming</option>
            <option value="Open Water Swimming">Open Water Swimming</option>
            <option value="Diving">Diving</option>
            <option value="Water Polo">Water Polo</option>
            <option value="Artistic Swimming">Artistic Swimming</option>
            <option value="General">General</option>
        </optgroup>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>

    a. "multiple" mode:

    <select data-virtual="1" multiple>
        <optgroup label="Sport">
            <option value="Swimming">Swimming</option>
            <option value="Harbour Race">Harbour Race</option>
            <option value="Masters Swimming">Masters Swimming</option>
            <option value="Open Water Swimming">Open Water Swimming</option>
            <option value="Diving">Diving</option>
            <option value="Water Polo">Water Polo</option>
            <option value="Artistic Swimming">Artistic Swimming</option>
            <option value="General">General</option>
        </optgroup>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>

    b. "filter" mode:

    <select data-virtual="1" data-filter="1" data-placeholder="please enter keywords">
        <optgroup label="Sport">
            <option value="Swimming">Swimming</option>
            <option value="Harbour Race">Harbour Race</option>
            <option value="Masters Swimming">Masters Swimming</option>
            <option value="Open Water Swimming">Open Water Swimming</option>
            <option value="Diving">Diving</option>
            <option value="Water Polo">Water Polo</option>
            <option value="Artistic Swimming">Artistic Swimming</option>
            <option value="General">General</option>
        </optgroup>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>

    c. "multiple" & "filter" mode:

    <select data-virtual="1" data-filter="1" data-placeholder="please enter keywords" multiple>
        <optgroup label="Sport">
            <option value="Swimming">Swimming</option>
            <option value="Harbour Race">Harbour Race</option>
            <option value="Masters Swimming">Masters Swimming</option>
            <option value="Open Water Swimming">Open Water Swimming</option>
            <option value="Diving">Diving</option>
            <option value="Water Polo">Water Polo</option>
            <option value="Artistic Swimming">Artistic Swimming</option>
            <option value="General">General</option>
        </optgroup>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>
    
    or

    <select data-virtual="0">
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
    </select>


20. checkbox
    ----------------------------------------------------------------------------
    iweb.checkbox(checkbox_object,callback);
    - checkbox_object: optional, default = $('body').find('input[type="checkbox"]');
    - callback: optional  

    e.g.

    <input type="checkbox" id="vehicle-bike" name="vehicle1" value="Bike" checked>
    <label for="vehicle-bike"> I have a bike</label>

21. radio
    ----------------------------------------------------------------------------
    iweb.radio(radio_object,callback);
    - radio_object: optional, default = $('body').find('input[type="raido"]');
    - callback: optional  

    e.g.

    <input type="radio" id="male" name="gender" value="male" checked>
    <label for="male">Male</label>

22. change font size: 14px, 16px, 20px
    ----------------------------------------------------------------------------
    <div class="font">
        <a class="font-switch small" href="#" data-size="small">Small</a>  
        <a class="font-switch middle current" href="#" data-size="middle">Middle</a>
        <a class="font-switch large" href="#" data-size="large">Large</a>
    </div>

23. uploader: function(options,callback) 
    uploaderArea: function(file_input_id, options, callback)

    options = { 
        url: '',
        value: null,
        dataType: 'json',
        allowed_types: '',   // optional: jpg|png|pdf
        max_filesize: 5,
        type_error_message: 'File type is not allowed.',
        max_error_message: 'Maximum allowed file size 5M.',
        auto_close: true
    }

    /* post hanlder */
    $target_dir = 'temp/';
    $target_file = $target_dir . basename($_FILES['myfile']['name']);
    if (move_uploaded_file($_FILES['myfile']['tmp_name'], $target_file)) {
        echo 'The file '. basename($_FILES['myfile']['name']). ' has been uploaded.';
    } else {
        echo 'Sorry, there was an error uploading your file.';
    }

24. autocomplete

<div class="iweb-autocomple" 
        data-url="your_url_here"
        data-param1="_token:xxx"
        data-param2="type:123"
        data-ifunc="your_init_callback_func_name_here"
        data-sfunc="your_select_callback_func_name_here"
        data-rfunc="your_remove_callback_func_name_here">
    <input type="hidden" class="fill-id" name="id[]" value="">
    <input type="text" class="fill-txt" value="">
</div>