import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {MapMarker, SaloonListItem} from '@/components';
import {colors, mapStyle} from '@/utils';

const MapListing = () => {
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const markers = [
    {
      _id: '1',
      businessLocation: 'Alfred-Escherstrasse 64, 8002, Zürich',
      businessID: '1',
      businessImage:
        'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-2.webp',
      businessName: 'Chic Coiffeour',
      businessTel: 'string',
      businessMail: 'string',
      businessWebsite: 'string',
      socialFacebook: 'string',
      socialInstagram: 'string',
      businessImages: [],
      coordinate: {latitude: 40.78825, longitude: 29.4225},
      rating: '3.4',
    },
    {
      _id: '2',
      businessLocation: 'Alfred-Escherstrasse 64, 8002, Zürich',
      businessID: '2',
      businessImage:
        'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-3.webp',
      businessName: 'Golden Barber Salon',
      businessTel: 'string',
      businessMail: 'string',
      businessWebsite: 'string',
      socialFacebook: 'string',
      socialInstagram: 'string',
      businessImages: [],
      coordinate: {latitude: 40.84825, longitude: 29.6225},
      rating: '4.8',
    },
  ];

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      mapRef.current.fitToCoordinates(
        markers.map(marker => marker.coordinate),
        {
          edgePadding: {top: 100, right: 100, bottom: 300, left: 100},
          animated: true,
        },
      );
    }
  }, [mapRef, markers, activeIndex]);

  const renderMarkers = useMemo(() => {
    return markers.map((value, index) => (
      <MapMarker
        key={`mapmarker_${index}`}
        coordinate={value.coordinate}
        rating={value.rating}
        active={activeIndex === index}
        onPress={() => setActiveIndex(index)}
      />
    ));
  }, [markers, activeIndex]);

  const renderActiveSaloon = useMemo(() => {
    return (
      <View style={styles.bottomView}>
        {activeIndex != null && <SaloonListItem {...markers[activeIndex]} />}
      </View>
    );
  }, [markers, activeIndex]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        showsUserLocation
        showsScale={false}
        showsCompass={false}
        initialRegion={{
          latitude: 40.78825,
          longitude: 29.4324,
          latitudeDelta: 0.1,
          longitudeDelta: 0.421,
        }}>
        {renderMarkers}
      </MapView>
      {renderActiveSaloon}
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
    bottom: 20,
    position: 'absolute',
    shadowColor: colors.secondaryColor,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {width: 0, height: 20},
  },
});
