/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         navigator.serviceWorker.register('/sw.js', { scope: './' })
//             .then(function (registration) {
//                 console.log('registered service worker');

//                 registration.onupdatefound = function () {
//                     // The updatefound event implies that registration.installing is set; see
//                     // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
//                     const installingWorker = registration.installing;

//                     installingWorker.onstatechange = function () {
//                         switch (installingWorker.state) {
//                             case 'installed':
//                                 if (!navigator.serviceWorker.controller) {
//                                     alert('Caching complete!');
//                                 }
//                                 break;

//                             case 'redundant':
//                                 throw Error('The installing service worker became redundant.');
//                         }
//                     };
//                 };
//             })
//             .catch(function (whut) {
//                 console.error('uh oh... ');
//                 console.error(whut);
//             });
//     });

//     window.addEventListener('appinstalled', (evt) => {
//         console.log('User added to homescreen');
//     });

//     // Check to see if the service worker controlling the page at initial load
//     // has become redundant, since this implies there's a new service worker with fresh content.
//     if (navigator.serviceWorker && navigator.serviceWorker.controller) {
//         console.log("navigator.serviceWorker.controller.onstatechange:: " + navigator.serviceWorker.controller.onstatechange)
//         navigator.serviceWorker.controller.onstatechange = function (event) {
//             if (event.target.state === 'redundant') {
//                 toaster('A new version of this app is available.', 0); // duration 0 indications shows the toast indefinitely.
//             }
//         };
//     }
// }


window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    $(".checkdiv").click(function (e){
        if(!$(e.target).is('input:checkbox')){
            var $checkbox = $(this).find('input:checkbox');
            $checkbox.prop('checked', !$checkbox.prop('checked'));
        }
    });  
});

$(function(){
    $('#btn_start').click(function(e){

        var age;
        var bmi;
        var sbp;
        var dbp;
        var preggw;
        var model_num = $("#model_num").val();
        var is_empty=false;
        var input_empty;

        $("#info").find("input[type=text]").each(function(){
            input_empty = $(this)
            if ($(this).val().trim() == '') {
                alert($(this).attr("id")+" 항목을 입력하세요.");
                is_empty=true;
                setTimeout(function(){
                    input_empty.focus();
                }, 50);
                // $(this).focus();
                e.stopPropagation();
                return false;
            }
         
        });

        if(!is_empty) {
            $(this).prop("disabled", true);
            // add spinner to button
            $(this).html(
                `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`
            );
            
            if($("#AGE").val()<10) {
                age=1;
            }else if($("#AGE").val()<20) {
                age=2;
            }else if($("#AGE").val()<30) {
                age=3;
            }else if($("#AGE").val()<40) {
                age=4;
            }else if($("#AGE").val()<50) {
                age=5;
            }else if($("#AGE").val()<60) {
                age=6;
            }else if($("#AGE").val()<70) {
                age=7;
            }else if($("#AGE").val()<80) {
                age=8;
            }else {
                age=9;
            }
    
            if($("#BMI").val()<18.6) {
                bmi=1;
            }else if($("#BMI").val()<23) {
                bmi=2;
            }else if($("#BMI").val()<25) {
                bmi=3;
            }else if($("#BMI").val()<30) {
                bmi=4;
            }else {
                bmi=5;
            }
    
            if($("#SBP").val()<120) {
                sbp=1;
            }else if($("#SBP").val()<130) {
                sbp=2;
            }else if($("#SBP").val()<140) {
                sbp=3;
            }else if($("#SBP").val()<160) {
                sbp=4;
            }else {
                sbp=5;
            }
    
            if($("#DBP").val()<80) {
                dbp=1;
            }else if($("#DBP").val()<90) {
                dbp=2;
            }else if($("#DBP").val()<100) {
                dbp=3;
            }else {
                dbp=4;
            }
    
            if($("#FEVER").is(":checked")) {
                $("#FEVER").val(1);
            }else{
                $("#FEVER").val(0);
            }
    
            if($("#COUGH").is(":checked")) {
                $("#COUGH").val(1);
            }else{
                $("#COUGH").val(0);
            }
    
            if($("#HEADA").is(":checked")) {
                $("#HEADA").val(1);
            }else{
                $("#HEADA").val(0);
            }

            if($("#SOB").is(":checked")) {
                $("#SOB").val(1);
            }else{
                $("#SOB").val(0);
            }

            if($("#HTN").is(":checked")) {
                $("#HTN").val(1);
            }else{
                $("#HTN").val(0);
            }

            if($("#DEMEN").is(":checked")) {
                $("#DEMEN").val(1);
            }else{
                $("#DEMEN").val(0);
            }

            if($("#DM").is(":checked")) {
                $("#DM").val(1);
            }else{
                $("#DM").val(0);
            }

            if($("#ACC").is(":checked")) {
                $("#ACC").val(1);
            }else{
                $("#ACC").val(0);
            }

            if($("#RNR").is(":checked")) {
                $("#RNR").val(1);
            }else{
                $("#RNR").val(0);
            }
    
            if($("#ST").is(":checked")) {
                $("#ST").val(1);
            }else{
                $("#ST").val(0);
            }
    
            if($("#MALIG").is(":checked")) {
                $("#MALIG").val(1);
            }else{
                $("#MALIG").val(0);
            }
    
            if($("#SPUTUM").is(":checked")) {
                $("#SPUTUM").val(1);
            }else{
                $("#SPUTUM").val(0);
            }
    
            if($("#MAM").is(":checked")) {
                $("#MAM").val(1);
            }else{
                $("#MAM").val(0);
            }
    
            if($("#CCD").is(":checked")) {
                $("#CCD").val(1);
            }else{
                $("#CCD").val(0);
            }
    
            if($("#CKD").is(":checked")) {
                $("#CKD").val(1);
            }else{
                $("#CKD").val(0);
            }
    
            if($("#DIARR").is(":checked")) {
                $("#DIARR").val(1);
            }else{
                $("#DIARR").val(0);
            }
    
            if($("#VN").is(":checked")) {
                $("#VN").val(1);
            }else{
                $("#VN").val(0);
            }
    
            if($("#CLD").is(":checked")) {
                $("#CLD").val(1);
            }else{
                $("#CLD").val(0);
            }
    
            if($("#FM").is(":checked")) {
                $("#FM").val(1);
            }else{
                $("#FM").val(0);
            }
    
            if($("#ASTHMA").is(":checked")) {
                $("#ASTHMA").val(1);
            }else{
                $("#ASTHMA").val(0);
            }
    
            if($("#HF").is(":checked")) {
                $("#HF").val(1);
            }else{
                $("#HF").val(0);
            }
            
            if($("#COPD").is(":checked")) {
                $("#COPD").val(1);
            }else{
                $("#COPD").val(0);
            }
    
            if($("#RDAD").is(":checked")) {
                $("#RDAD").val(1);
            }else{
                $("#RDAD").val(0);
            }
    
            if($("#PREG").is(":checked")) {
                $("#PREG").val(1);
            }else{
                $("#PREG").val(0);
            }
    
            if(isNaN(Number($("#PREGGW").val()))) {
                preggw=0;
            }else{
                preggw=Number($("#PREGGW").val());
            }
    
            // alert(Number($("#PREGGW").val()));
            // alert($("#PREGGW").val());    
            
            
            let patient_info = {
                AGE : age,
                SEX : Number($('input:radio[name="flexRadioDefault"]:checked').val()),
                SOB : Number($("#SOB").val()),
                BMI : bmi,
                HCT : Number($("#HCT").val()),
                LYMPHO : Number($("#LYMPHO").val()),
                HGB : Number($("#HGB").val()),
                PLT : Number($("#PLT").val()),
                TEMPI : Number($("#TEMPI").val()),
                HRI : Number($("#HRI").val()),
                HTN : Number($("#HTN").val()),
                SBP : sbp,
                DM : Number($("#DM").val()),
                DEMEN : Number($("#DEMEN").val()),
                DBP : dbp,
                RNR : Number($("#RNR").val()),
                ACC : Number($("#ACC").val()),
                FEVER : Number($("#FEVER").val()),
                COUGH : Number($("#COUGH").val()),
                HEADA : Number($("#HEADA").val()),
                ST : Number($("#ST").val()),
                MALIG : Number($("#MALIG").val()),
                SPUTUM : Number($("#SPUTUM").val()),
                MAM : Number($("#MAM").val()),
                CCD : Number($("#CCD").val()),
                WBC : Number($("#WBC").val()),
                CKD : Number($("#CKD").val()),
                DIARR : Number($("#DIARR").val()),
                VN : Number($("#VN").val()),
                CLD : Number($("#CLD").val()),
                FM : Number($("#FM").val()),
                ASTHMA : Number($("#ASTHMA").val()),
                HF : Number($("#HF").val()),
                COPD : Number($("#COPD").val()),
                RDAD : Number($("#RDAD").val()),
                PREG : Number($("#PREG").val()),
                PREGGW : preggw
    
            };
    
            // console.log(JSON.stringify(patient_info));
            // let patient_info = {
            //     AGE : 9,
            //     SEX : 0,
            //     SOB : 5,
            //     BMI : 1,
            //     HCT : 20,
            //     LYMPHO : 20,
            //     HGB : 20,
            //     PLT : 20000,
            //     TEMPI : 4,
            //     HRI : 1,
            //     HTN : 1,
            //     SBP : 1,
            //     DM : 8,
            //     DEMEN : 5,
            //     DBP : 1,
            //     RNR : 1,
            //     ACC : 1,
            //     FEVER : 1,
            //     COUGH : 1,
            //     HEADA : 0,
            //     ST : 1,
            //     MALIG : 0,
            //     SPUTUM : 0,
            //     MAM : 0,
            //     CCD : 0,
            //     WBC : 6000,
            //     CKD : 1,
            //     DIARR : 0,
            //     VN : 0,
            //     CLD : 0,
            //     FM : 0,
            //     ASTHMA : 0,
            //     HF : 0,
            //     COPD : 0,
            //     RDAD : "0",
            //     PREG : "0",
            //     PREGGW: "0",
            // };        
            console.log(JSON.stringify(patient_info));
    
            $.ajax({
                url:'http://ixioninsight1.cafe24.com:8000/corona/predict/'+ model_num +'/',
                dataType:'JSON',
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                type : 'POST',
                data: patient_info,
                complete:function(){
                    $('#btn_start').button('reset');
                },

                success :function(res) {
                    // 성공
                    // alert(res.result);
                    console.log(JSON.stringify(res));
                    const result = parseFloat(res.result);
                    const score = Math.round(result*100)/100;

                    var html = `<p><span class="result_css">Predicted probability : ${score}%</span></p>`;
                    
                    console.log(html);
                    $('#btn_start').prop("disabled", true);
                    $('#btn_start').html(
                        `COMPLETE`
                    );
                    $('.value_result').html(html);

                    // score 값이 50.0 이상인 경우 새창 띄움
                    if (score >= 50.0) {
                        window.open("../mapHospital.html", "NearHospital", "width=700, height=520");
                    }
                        
                },
                error : function(request, status, error) {
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    alert('Prediction Fail !');
                    $('#btn_start').prop("disabled", false);
                    $('#btn_start').html(
                        `START PREDICTION`
                    );

                } 
            });
        }

    });

});

