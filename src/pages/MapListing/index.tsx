import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import MapView from 'react-native-map-clustering';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';

import {MapMarker, SaloonListItem} from '@/components';
import {colors, mapStyle} from '@/utils';

const MapListing = () => {
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {saloons} = useSelector(state => state.search);

  const initialRegion = {
    latitude: 47.304092,
    longitude: 8.302951,
    latitudeDelta: 1.922,
    longitudeDelta: 0.421,
  };

  const edgePadding = {top: 100, right: 100, bottom: 300, left: 100};

  const animatedValue = useRef(
    new Animated.Value(activeIndex != null ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: activeIndex !== null ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [activeIndex, animatedValue]);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    if (mapRef.current && saloons.length > 0) {
      Geolocation.getCurrentPosition(
        position => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 1.922,
            longitudeDelta: 0.421,
          };
          mapRef.current.animateToRegion(userLocation, 500);
        },
        error => {
          mapRef.current.fitToCoordinates(
            saloons.map(saloon => ({
              latitude: saloon.businessLat,
              longitude: saloon.businessLong,
            })),
            {
              edgePadding,
              animated: true,
            },
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [mapRef, saloons]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        customMapStyle={mapStyle}
        showsUserLocation
        edgePadding={edgePadding}
        showsMyLocationButton={false}
        clusterColor={colors.primaryColor}
        animationEnabled={false}
        onPress={() => setActiveIndex(null)}
        showsScale={false}
        showsCompass={false}>
        {saloons.map((value, index) => (
          <MapMarker
            key={`mapmarker_${index}`}
            coordinate={{
              latitude: value.businessLat,
              longitude: value.businessLong,
            }}
            rating={value.averageReviewPoint}
            active={activeIndex === index}
            onPress={() => setActiveIndex(index)}
          />
        ))}
      </MapView>
      <Animated.View style={[styles.bottomView, animatedStyle]}>
        <SaloonListItem {...saloons[activeIndex || 0]} />
      </Animated.View>
    </View>
  );
};

export default MapListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  bottomView: {
    paddingHorizontal: 16,
    width: '100%',
    bottom: 45,
    position: 'absolute',
    shadowColor: colors.secondaryColor,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 20},
  },
});
