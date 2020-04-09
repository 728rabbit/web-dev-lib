1.  load & init library
    ----------------------------------------------------------------------------
    <link href="css/iweb.min.css" rel="stylesheet" type="text/css"/>
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="js/iweb.min.js" type="text/javascript"></script>

    // set language
    <html lang="en">
    <html lang="zh-hant">
    <html lang="zh-hans">

    // show page loading
    <body data-processing="1"></body>
 
2.  Document ready functions:
    ----------------------------------------------------------------------------
    function iweb_func() { your common function(s) code here }

    function iweb_ifunc() { your individual function(s) code here }


3.  Window load functions:
    ----------------------------------------------------------------------------
    function iweb_layout_done() { your common layout function(s) code here }

    function iweb_ilayout_done() { your individual layout function(s) code here }

    function iweb_func_done() { your common function(s) code here }

    function iweb_ifunc_done() { your individual function(s) code here }



4.  Window resize functions:
    ----------------------------------------------------------------------------
    function iweb_layout() { your common layout function(s) code here }

    function iweb_ilayout() { your individual resize function(s) code here }


5.  Window scroll functions:
    ----------------------------------------------------------------------------
    function iweb_scroll(y) { your common scroll function(s) code here }

    function iweb_iscroll(y) { your individual scroll function(s) code here }


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
    iweb.processing(status,opacity);
    - status: true or false
    - opacity: optional, true or false


7.  Responsive Aera:
    ----------------------------------------------------------------------------
    <div class="iweb-responsive" data-width="600" data-height="400">
        you content here
    </div>
    // force refresh, you can call this function: iweb.responsive();


8.  Validation:
    ----------------------------------------------------------------------------
    iweb.isValue(value);     // if value is empty, null & undefined, return false
    
    iweb.isNumber(value);  // if value is non-number, return false

    iweb.isEmail(value);   // if value is invalid email, return false

    iweb.isPassword(value);
    // Password must contain at least 6 characters, including upper/lowercase and numbers (e.g. Abc123)
    // 密碼必須至少包含6個字符，包括大寫/小寫和數字（例如Abc123）

    iweb.isExist(element);   // if element not exist, return false

    iweb.isMatch(value1,value2);   // compare tow vaule

9.  Alert Dialog:
    ----------------------------------------------------------------------------
    iweb.alert(message,callback,setting);
    - message: required
    - callback: optional
    - setting: optional

    e.g.
    iweb.alert('Hello World');
    
    iweb.alert('Hello World',function() {
        // close event here
    });

    iweb.alert('Hello World',null,{class:your_class_name});
    
    iweb.alert('Hello World',function() {
        // close event here
    },{class:your_class_name});


10. Confirm Dialog:
    ----------------------------------------------------------------------------
    iweb.confirm(message,callback,setting);
    - message: required
    - callback: required
    - setting: optional

    e.g. 

    iweb.confirm('Are your sure delete this item?',function(result) {
        // close event here
    });

    iweb.confirm('Are your sure delete this item?',function(result) {
        // close event here
    },{class:your_class_name,yes:your_label_value_1,no:your_label_value_2});


11. Popup Dialog:
    ----------------------------------------------------------------------------
    iweb.dialog(htmlcode,init,callback,setting);
    - htmlcode: required
    - init: optional
    - callback: optional
    - setting: optional

    e.g. 
    iweb.dialog('<div>Hello World</div>');

    iweb.dialog('<div>Hello World</div>',null,null,{class:your_class_name});

    iweb.dialog('<div>Hello World</div>',function() {
        // init event here
    },function() {
        // close event here
    },{class:your_class_name});


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
    iweb.post(data,callback);

    e.g.
    iweb.post({
        url: your_url_here,
        type: your_retrun_type_here, // default = json
        val: {
            name_1: value_1
            name_2: value_2
        },
        loading: false
    },function(response_data) {
        // your code here
    });


15. Ajax Form:
    ----------------------------------------------------------------------------
    iweb.form(target_form_id,type,checkfunc,callback);
    - target_form_id: required
    - type optional
    - checkfunc optional
    - callback: required

    e.g.
    iweb.form('#form_id','json',function(arr) {
        // arr.push({ name:'exra_parameter', value: 'AAAA' });
        var check_status = true;
        // your code here
        return check_status;
    },function(response_data) {
        // your code here
    });
    

16. Pagination:
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

17. tiny scrollbar
    
    iweb.scrollbar(element,mode,callback);

    e.g.

    iweb.scrollbar('div1');

    or

    iweb.scrollbar('div1','macosx');

    or

    iweb.scrollbar('div1','macosx',function({ your common function(s) code here }));
   
    
