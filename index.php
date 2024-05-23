<!DOCTYPE html>
<html lang="zh-hant">
    <head>
        <title>iweb Lib</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="96ca6fd5cc5283000910785ba2344044"/>
        <link href="dist/icon/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        
        <link href="dist/iweb.min.css" rel="stylesheet" type="text/css"/>
        <script src="dist/jquery.min.js" type="text/javascript"></script>
        <script src="dist/jquery-migrate.js" type="text/javascript"></script>
        <script src="dist/iweb.min.js" type="text/javascript"></script>
        <script>
     
            function iweb_global_func() { 
                iweb.pagination('.mypage');

                $(document).on('click','#btn-alert',function(){
                    iweb.alert('Hello World');
                });
                
                $(document).on('click','#btn-confirm',function(){
                    iweb.confirm('Are your sure delete this item?',function(result){
                        // close event here
                        console.log(result);
                    });
                });
                
                $(document).on('click','#btn-popup',function(){
                    iweb.dialog('<div style="height:1000px;">Hello World<form><input type="password" name="password" style="width:100%"><input type="radio" id="male" name="gender3" value="male" data-validation="required"><label for="male">Male</label><br><input type="radio" id="female" name="gender3" value="female" data-validation="required"><label for="female">Female</label><br></form></div><div class="iweb-autocomplete top" data-url="http://localhost/mylib/fetch.php" data-param2="type:123"><input type="hidden" class="fill-id" name="guardian_id[]" value="" data-validation="required"> <input type="text" class="fill-txt"  name="guardian_name[]" value=""></div>');
                });
                
                
                $(document).on('click','#btn-top',function(){
                    iweb.scrollto();
                });
                
                $(document).on('click','#btn-post',function(){
                    iweb.post({
                        url: 'http://localhost/mylib/test.php',
                        values: {
                            name_1: 1,
                            name_2: 2
                        },
                        dataType: 'text'
                    },function(response_data) {
                        alert('post done');
                    });
                });
                
                
                iweb.form('#test-form', 'text' ,function(form_data, form_object) {
                    // form_data.push({ name:'exra_parameter', value: 'AAAA' });
                    var check_result = true;
                    // your code here
                    
                    console.log(form_object);
        
                    return check_result;
                },function(response_data, form_object) {
                    alert('Hello');
                    console.log(form_object);
                });
                

                
                setInterval(function() {
                    $('.iweb-countdown').each(function() {
                        var distance = parseInt($(this).data('value'))-1;
                        if(distance >= 0) {
                            $(this).data('value',distance);
                            var days = Math.floor(distance/(60*60*24));
                            var hours = Math.floor((distance%(60*60*24))/(60*60));
                            var minutes = Math.floor((distance%(60*60))/60);
                            var seconds = Math.floor(distance%60);
             
                            if(days < 10) { days = '0' + days.toString(); }
                            if(hours < 10) { hours = '0' + hours.toString(); }
                            if(minutes < 10) { minutes = '0' + minutes.toString(); }
                            if(seconds < 10) { seconds = '0' + seconds.toString(); }

                            $(this).find('.day > span').html(days.toString());
                            $(this).find('.hour > span').html(hours.toString());
                            $(this).find('.minute > span').html(minutes.toString());
                            $(this).find('.second > span').html(seconds.toString());
                        }
                    });
                },1000);

            }
            function iweb_self_func() { 
                iweb.uploaderArea('myfiles1', {
                    url: 'http://localhost/mylib/upload.php',
                    dataType: 'text',
                    values: {
                        name: 'abc'
                    },
                    allowed_types: 'jpg|png'
                }, function() {
                    alert('end upload 1');
                });
                
                iweb.uploaderArea('myfiles2', {
                    url: 'http://localhost/mylib/upload.php',
                    dataType: 'text',
                    values: {
                        name: 'abc'
                    }
                }, function() {
                    alert('end upload 2');
                });
                
                $(document).on('click', '#btn-select-files', function() {
                    iweb.uploader({
                        url: 'http://localhost/mylib/upload.php',
                        dataType: 'text',
                        values: {
                            name: 'abc'
                        },
                        allowed_types: 'jpg|png'
                    });
                });
                
                iweb.scrollbar('#sb-content > div');
            }
            
            function init_autoc() {
                console.log('init_autoc');
            }
            function select_autoc() {
                console.log('select_autoc');
            }
            function remove_autoc() {
                console.log('remove_autoc');
            }

        </script>
        <style>
            h3 {
                border-bottom: 2px dotted #e6e6e6;
                padding-top: 30px;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }
           
         
            #sb-content {
                height: 200px;
                width: 100%;
            }

            #sb-content > div {
                height: 100%;
            }

            
        </style>
    </head>
    <body data-processing="1">
        <div style="padding: 10px;">
            <h3>1. 字體大小切換</h3>
            <div class="font">
               <a class="font-switch small" href="#" data-size="small">A-</a><!--
               --><a class="font-switch middle current" href="#" data-size="middle">A</a><!--
               --><a class="font-switch large" href="#" data-size="large">A+</a>
           </div>
            <form id="test-form" method="post" action="test.php">
               
            <h3>2. Select 簡單美化</h3>
            <table>
                <tr>
                    <td>默認：</td>
                    <td>
                        <div>
                            <select name="s1" data-virtual="0" data-validation="required">
                                <option>請選擇運動項目 1</option>
                                <optgroup label="Sport">
                                    <option value="Sport">Sport</option>
                                    <option value="Harbour Race" selected>Harbour Race</option>
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
                      </div>  
                    </td>
                    <td>&nbsp;</td>
                    <td>帶搜尋功能：</td>
                    <td>
                        <div>
                            <select name="s2" data-virtual="1" data-filter="1" data-default="請選擇運動項目 2"  data-validation="required">
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
                        </div>
                    </td>
                    <td>&nbsp;</td>
                    <td>多選：</td>
                    <td>
                        <div>
                            <select name="s3[]" data-virtual="0" data-filter="1" multiple  data-default="請選擇運動項目 3" data-validation="required">
                                <optgroup label="Sport">
                                    <option value="Swimming">Swimming</option>
                                    <option value="Harbour Race">Harbour Race</option>
                                    <option value="Masters Swimming" selected>Masters Swimming</option>
                                    <option value="Open Water Swimming">Open Water Swimming</option>
                                    <option value="Diving" selected>Diving</option>
                                    <option value="Water Polo">Water Polo</option>
                                    <option value="Artistic Swimming">Artistic Swimming</option>
                                    <option value="General">General</option>
                                </optgroup>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </td>
                </tr>
            </table>

            <h3>3. Checkbox 簡單美化</h3>
            <div class="iweb-checkbox-set" data-showtips="false">
                <input type="checkbox" id="vehicle1" name="vehicle[]" value="Bike" data-validation="required">
                <label for="vehicle1"> I have a bike  I have a bike I have a bike I have a bike I have a bike I have a bike</label>
                
                <input type="checkbox" id="vehicle2" name="vehicle[]" value="Car" data-validation="required">
                <label for="vehicle2"> I have a car</label>
                
                <input type="checkbox" id="vehicle3" name="vehicle[]" value="Boat" data-validation="required">
                <label for="vehicle3"> I have a boat</label>
            </div>
            
            
            <p>&nbsp;</p>
            
            <div>
                <input type="checkbox" id="vehicle21" name="vehicle2[]" value="Bike">
                <label for="vehicle21"> I have a bike</label>
            </div>
            <div>
                <input type="checkbox" id="vehicle22" name="vehicle2[]" value="Car">
                <label for="vehicle22"> I have a car</label>
            </div>
            <div>
                <input type="checkbox" id="vehicle23" name="vehicle2[]" value="Boat">
                <label for="vehicle23"> I have a boat</label>
            </div>

            <h3>4. Radio 簡單美化</h3>
            <div class="iweb-radiobox-set"  data-showtips="false">
                <input type="radio" id="male" name="gender" value="male" data-validation="required">
                <label for="male">Male Male Male MaleMale Male Male MaleMale Male MaleMale Male Male MaleMale Male MaleMale Male Male MaleMale Male MaleMale Male Male Male</label>
                
                <input type="radio" id="female" name="gender" value="female" data-validation="required">
                <label for="female">Female</label>
                
                <input type="radio" id="other" name="gender" value="other" data-validation="required">
                <label for="other">Other</label>
            </div>

            <h3>5. Text Box</h3>
            <div><input type="text" name="name" style="width:100%" data-validation="required" data-tips="please enter your name"/></div>
            <div>&nbsp;</div>
            <div><input type="password" name="password" style="width:100%" data-validation="required|password"/></div>
            <div>&nbsp;</div>
            <div><input type="text" name="email" style="width:100%" data-validation="required|email"  data-showtips="false"/></div>
            <div>&nbsp;</div>
            <div><input type="text" name="number" style="width:100%" data-validation="required|number"/></div>
            <div>&nbsp;</div>
            <div><input type="text" name="text" class="datepicker" style="width:100%" data-validation="required|date" placeholder="(e.g. 28/02/2022)"  data-showtips="true"></div>
            <div>&nbsp;</div>
            <div><textarea name="content" style="width:100%" data-validation="required"  data-showtips="true"></textarea></div>
            
            <div>&nbsp;</div>
            <div class="iweb-autocomplete" 
                data-url="http://localhost/mylib/fetch.php"
                data-param2="type:123"
                data-ifunc="init_autoc"
                data-sfunc="select_autoc"
                data-rfunc="remove_autoc">
                <input type="hidden" class="fill-id" name="guardian_id[]" value="" data-validation="required">
                <input type="text" class="fill-txt"  name="guardian_name[]" value="">
            </div>

            <h3>6. 上載文檔</h3>
            <div>
                <div>
                    <input type="file" id="myfiles1" class="dropfiles">
                </div>
                
                
                <div>
                    <input type="file" id="myfiles2" class="dropfiles">
                </div>
                
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                
                <button type="button" id="btn-select-files">選擇文檔</button>
            </div>
            
            
            

            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
            </form>

            <h3>7. 分頁</h3>
            <div><div class="mypage" data-totalpage="10"></div></div>

            <h3>8. Popup Dialog</h3>
            <div id="actions">
                <button id="btn-alert" style="padding: 5px 20px;">Alert</button>
                <button id="btn-confirm" style="padding: 5px 20px;">Confirm</button>
                <button id="btn-popup" style="padding: 5px 20px;">Content</button>
                <button id="btn-post" style="padding: 5px 20px;">Post</button>
            </div>
            
            
            
         
            <h3>9. Scrollbar</h3>
            <div id="sb-content">
                <div>
                    wiki軟體由軟體設計模式社群開發，用來書寫與討論模式語言。沃德·坎寧安於1995年3月25日成立第一個wiki網站：WikiWikiWeb，用來補充他自己經營的軟體設計模式網站。他發明wiki這個名字以及相關概念，並且實作第一個wiki引擎。坎寧安說自己是根據檀香山的Wiki Wiki公車取名的，「wiki」在夏威夷語爲「快速」之意，這是他到檀香山學會的第一個夏威夷語[來源請求]，故他將「wiki-wiki」作爲「快速」的意思以避免將「這東西」取名爲「快速網」（quick-web）[4][3][5]。

                        坎寧安說，wiki的構想來自他自己在1980年代晚期利用蘋果電腦HyperCard程式作出的一個小功能[6]。HyperCard類似名片整理程式，可用來紀錄人物與相關事物。HyperCard管理許多稱為「卡片」的資料，每張卡片上都可劃分欄位、加上圖片、有樣式的文字或按鈕等等，而且這些內容都可在查閱卡片的同時修改編輯。HyperCard類似於後來的網頁，但是缺乏一些重要特徵。

                        坎寧安認為原來的HyperCard程式十分有用，但創造卡片與卡片之間的連結卻很困難。於是他不用HyperCard程式原本的創造連結功能，而改用「隨選搜尋」的方式自己增添了一個新的連結功能。使用者只要將連結輸入卡片上的一個特殊欄位，而這個欄位每一行都有一個按鈕。按下按鈕時如果卡片已經存在，按鈕就會帶使用者去那張卡片，否則就發出嗶聲，而繼續壓著按鈕不放，程式就會為使用者產生一張卡片。

                        坎寧安向他的朋友展示了這個程式和他自己寫的人事卡片，往往會有人指出卡片之中的內容不太對，他們就可當場利用HyperCard初始的功能修正內容，並利用坎寧安加入的新功能補充連結。

                        坎寧安後來在別處又寫了這樣的功能，而且這次他還增加了多使用者寫作功能。新功能之一是程式會在每一次任何一張卡片被更改時，自動在「最近更改」卡片上增加一個連往被更改卡片的連結。坎寧安自己常常看「最近更改」卡片，而且還會注意到空白的說明欄位會讓他想要描述一下更改的摘要[7]。
                
                        wiki軟體由軟體設計模式社群開發，用來書寫與討論模式語言。沃德·坎寧安於1995年3月25日成立第一個wiki網站：WikiWikiWeb，用來補充他自己經營的軟體設計模式網站。他發明wiki這個名字以及相關概念，並且實作第一個wiki引擎。坎寧安說自己是根據檀香山的Wiki Wiki公車取名的，「wiki」在夏威夷語爲「快速」之意，這是他到檀香山學會的第一個夏威夷語[來源請求]，故他將「wiki-wiki」作爲「快速」的意思以避免將「這東西」取名爲「快速網」（quick-web）[4][3][5]。

                        坎寧安說，wiki的構想來自他自己在1980年代晚期利用蘋果電腦HyperCard程式作出的一個小功能[6]。HyperCard類似名片整理程式，可用來紀錄人物與相關事物。HyperCard管理許多稱為「卡片」的資料，每張卡片上都可劃分欄位、加上圖片、有樣式的文字或按鈕等等，而且這些內容都可在查閱卡片的同時修改編輯。HyperCard類似於後來的網頁，但是缺乏一些重要特徵。

                        坎寧安認為原來的HyperCard程式十分有用，但創造卡片與卡片之間的連結卻很困難。於是他不用HyperCard程式原本的創造連結功能，而改用「隨選搜尋」的方式自己增添了一個新的連結功能。使用者只要將連結輸入卡片上的一個特殊欄位，而這個欄位每一行都有一個按鈕。按下按鈕時如果卡片已經存在，按鈕就會帶使用者去那張卡片，否則就發出嗶聲，而繼續壓著按鈕不放，程式就會為使用者產生一張卡片。

                        坎寧安向他的朋友展示了這個程式和他自己寫的人事卡片，往往會有人指出卡片之中的內容不太對，他們就可當場利用HyperCard初始的功能修正內容，並利用坎寧安加入的新功能補充連結。

                        坎寧安後來在別處又寫了這樣的功能，而且這次他還增加了多使用者寫作功能。新功能之一是程式會在每一次任何一張卡片被更改時，自動在「最近更改」卡片上增加一個連往被更改卡片的連結。坎寧安自己常常看「最近更改」卡片，而且還會注意到空白的說明欄位會讓他想要描述一下更改的摘要[7]。
                
                
                </div>
            </div>
        
            <div style="height: 800px;"></div>
        </div>
        
        
     </body>
</html>
