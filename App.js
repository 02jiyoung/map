/** 
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { magnetometer, SensorTypes, setUpdateIntervalForType } from 'react-native-sensors';

// 센서 업데이트 주기 설정 (빠른 반응을 위해 100ms)
setUpdateIntervalForType(SensorTypes.magnetometer, 100);

export default function App() {
    const [heading, setHeading] = useState(0); // 나침반 각도
    const [location, setLocation] = useState({
        latitude: 37.5665, // 초기 위치 (예: 서울)
        longitude: 126.9780,
    });

    useEffect(() => {
        // 1. 나침반 데이터 구독: 사용자가 몸을 돌릴 때마다 지도를 회전시킴
        const subscription = magnetometer.subscribe(({ x, y }) => {
            let angle = Math.atan2(y, x) * (180 / Math.PI);
            if (angle < 0) angle += 360;
            setHeading(angle);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                // [업그레이드 포인트] 사용자의 시선 방향으로 지도를 회전 (길치 방지)
                camera={{
                    center: location,
                    pitch: 45, // 입체감 있는 3D 뷰
                    heading: heading, // 나침반 각도 연동
                    altitude: 1000,
                    zoom: 18,
                }}
            >                         */

/*

<Marker coordinate={location} title="나의 위치" />


<Polyline
coordinates={[
{ latitude: 37.5665, longitude: 126.9780 },
{ latitude: 37.5675, longitude: 126.9790 },
]}
strokeColor="#FF0000" // 길치에게 잘 보이는 강렬한 빨간색
strokeWidth={6}
/>
</MapView >

<View style={styles.overlay}>
<Text style={styles.guideText}>
{heading > 350 || heading < 10 ? "앞으로 쭉 직진하세요!" : "몸을 더 왼쪽으로 틀어보세요"}
</Text>
</View>
</View >
);
}


const styles = StyleSheet.create({
container: { ...StyleSheet.absoluteFillObject },
map: { ...StyleSheet.absoluteFillObject },
overlay: {
position: 'absolute',
bottom: 50,
alignSelf: 'center',
backgroundColor: 'rgba(0,0,0,0.7)',
padding: 20,
borderRadius: 15,
},
guideText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});

*/