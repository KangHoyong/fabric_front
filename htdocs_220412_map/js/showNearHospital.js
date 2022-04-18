console.log(navigator.geolocation);

let longitude  = 126.9408692;
let latitude = 37.5623371;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    latitude = position.coords.latitude;
    longitude  = position.coords.longitude;
    showNearHospitals(latitude, longitude);
  }, (error) => {
    console.error(error);
  }, {
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: 100000
  });
}
else {
  alert('GPS가 확인되지 않았습니다');
  showNearHospitals(37.5623371, 126.9408692); // (default: gps 정보가 들어오지 않을 시) 세브란스 병원
}

function showNearHospitals(latitude, longitude) {

  window.notProfitHospital = ['가정,생활', '외과', '안과', '치과', '비뇨기과', '요양', '산부인과', '피부과', '정신건강', '재활', '클리닉', '신경'];
  window.markers = [];
  window.overlays = [];

  window.mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
          center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨 5
      };

  // 지도 생성
  window.map = new kakao.maps.Map(mapContainer, mapOption);

  // // 지도 타입 변경 컨트롤 생성
  // var mapTypeControl = new kakao.maps.MapTypeControl();
  // // 지도의 상단 우측에 지도 타입 변경 컨트롤 추가
  // map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);    

  // // 지도에 확대 축소 컨트롤 생성
  // var zoomControl = new kakao.maps.ZoomControl();
  // // 지도의 우측에 확대 축소 컨트롤 추가
  // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 장소 검색 객체 생성
  window.ps = new kakao.maps.services.Places(map); 
  // 병원 카테고리 검색
  ps.categorySearch('HP8', placesSearchCB, {useMapBounds:true}); 

  kakao.maps.event.addListener(map, 'drag', showHospitalOnMap); // 지도 위치 변경 시 재검색
  kakao.maps.event.addListener(map, 'zoom_changed', showHospitalOnMap); // 지도 축적 변경 시 재검색
}

function showHospitalOnMap() { // 현재 맵에 대한 병원 카테고리 재검색
  ps.categorySearch('HP8', placesSearchCB, {useMapBounds:true}); 
}

// 카테고리 검색 완료 시 호출되는 콜백함수
function placesSearchCB (data, status, pagination) {
  function eraseMarkers() { // 지도에 있던 마크 모두 삭제
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      overlays[i].setMap(null);
    } 
    markers.splice(0, markers.length);
    overlays.splice(0, overlays.length);
  }

  function searchPlaces() { // 부적합한 병원을 제외한 검색 결과 기록
    if (status === kakao.maps.services.Status.OK) {
        for (var i=0; i<data.length; i++) {
          // console.log(data[i]); //.category_name);
          let profitHospital = true;
          for (var j=0; j<notProfitHospital.length; j++) {
            if (data[i].category_name.includes(notProfitHospital[j])) {
              profitHospital = false;
              break;
            }
          }
          if (!profitHospital) {
            continue;
          }
          displayMarker(data[i]);    
        }       
      }
  }

  function showMarkers() { // 기록에 대한 마크 맵에 표시
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      overlays[i].setMap(map);
    }
  }

  const erase = () => {
    return new Promise((resolve, reject) => {
      eraseMarkers();
      resolve();
    });
  };
  const search = () => {
    return new Promise((resolve, reject) => {
      searchPlaces();
      resolve();
    });
  }
  const show = () => {
    return new Promise((resolve, reject) => {
      showMarkers();
      resolve();
    });
  }
  erase().then(search).then(show);
}

function displayMarker(place) { // 지도에 들어가는 마커 표시 설정
  var imageSrc = '../assets/marker.png', // 마커이미지
    imageSize = new kakao.maps.Size(34, 36), // 마커이미지 크기
    imageOption = {offset: new kakao.maps.Point(14, 70)}; // 마커이미지 옵션. 마커 위 말풍선(병원이름)의 위치 설정
  // 마커 이미지정보를 가지고 있는 마커이미지 생성
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
      markerPosition = new kakao.maps.LatLng(place.y, place.x); // 마커가 표시될 위치

  // 마커 생성
  var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage // 마커이미지 설정 
  });

  // 마커 정보 기록
  markers.push(marker);

  var content = '<div class="customoverlay">' +
      `  <a href="https://map.kakao.com/?itemId=${place.id}" target="_blank">` + // 카카오맵 지도 검색
      `    <span class="title">${place.place_name}</span>` +
      '  </a>' +
      '</div>';
  // 커스텀 오버레이가 표시될 위치 
  var position = new kakao.maps.LatLng(place.y, place.x);  
  // 커스텀 오버레이를 생성
  var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: content,
      yAnchor: 1 
  });

  // 커스텀 오버레이 정보 기록
  customOverlay.setMap(null);
  overlays.push(customOverlay);
}


// function limitDistance(x1, y1, x2, y2, stand) { // haversine. 위도 경도를 km 거리 계산
//   // stand: limat distance(km)
//   const radius = 6371;
//   const toRadian = Math.PI / 180;

//   const deltaLatitude = Math.abs(x1 - x2) * toRadian;
//   const deltaLongitude = Math.abs(y1 - y2) * toRadian;

//   const sinDeltaLat = Math.sin(deltaLatitude / 2);
//   const sinDeltaLng = Math.sin(deltaLongitude / 2);
//   const squareRoot = Math.sqrt(
//     sinDeltaLat * sinDeltaLng + 
//     Math.cos(x1*toRadian) * Math.cos(x2*toRadian) * sinDeltaLat * sinDeltaLng
//   );

//   const distance = 2 * radius * Math.asin(squareRoot);
//   if (distance > stand) {
//     return false;
//   }
//   return true;
// }