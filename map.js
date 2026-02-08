// 1. 지도 초기화
var container = document.getElementById('map');
var guideText = document.getElementById('guide-overlay');

var options = {
    center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
    level: 4 // 맛집들이 다 보이도록 레벨을 약간 조정
};

var map = new kakao.maps.Map(container, options);

// 2. 맛집 데이터 (작성하신 데이터 활용)
var positions = [
    {
        title: '태극당 (빵 맛집 예시)',
        latlng: new kakao.maps.LatLng(37.5615, 127.0033)
    },
    {
        title: '피자 맛집 예시',
        latlng: new kakao.maps.LatLng(37.5682, 126.9992)
    }
];

// 3. 마커 이미지 및 마커 생성
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
var imageSize = new kakao.maps.Size(24, 35);
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

positions.forEach(function (pos) {
    new kakao.maps.Marker({
        map: map,
        position: pos.latlng,
        title: pos.title,
        image: markerImage
    });
});

// 4. [길치 전용] 현재 위치 마커와 경로 표시 (첫 번째 맛집 기준)
var startPos = new kakao.maps.LatLng(37.5665, 126.9780); // 출발지
var targetPos = positions[0].latlng; // 첫 번째 맛집을 목적지로 설정

// 현재 위치 마커 (파란색 아이콘 등 구분 가능하게 설정 가능)
var currentMarker = new kakao.maps.Marker({
    position: startPos,
    map: map
});

// 가야 할 길 표시 (굵은 파란선)
var polyline = new kakao.maps.Polyline({
    path: [startPos, targetPos],
    strokeWeight: 8,
    strokeColor: '#0077ffff',
    strokeOpacity: 0.7,
    strokeStyle: 'solid'
});
polyline.setMap(map);

// 5. 방향 센서 연동 (스마트폰 방향에 따른 가이드)
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (event) {
        var heading = event.alpha; // 기기가 가리키는 방향

        if (heading !== null) {
            // 참고: 실제 구현 시에는 목적지의 방위각과 heading을 비교해야 합니다.
            // 여기서는 단순 예시로 북쪽 기준 가이드를 제공합니다.
            updateNavigationGuide(heading);
        }
    }, true);
}

function updateNavigationGuide(heading) {
    // 0도(북쪽) 근처일 때 직진 신호
    if (heading > 340 || heading < 20) {
        guideText.innerHTML = "<strong>직진하세요!</strong> 맛집이 이 방향에 있습니다 🍞";
        guideText.style.backgroundColor = "rgba(0, 128, 0, 0.9)"; // 초록색
    } else {
        guideText.innerHTML = "<strong>방향을 돌리세요!</strong> 화살표를 따라 몸을 틀어보세요 🔄";
        guideText.style.backgroundColor = "rgba(255, 69, 0, 0.9)"; // 주황/빨간색
    }
}