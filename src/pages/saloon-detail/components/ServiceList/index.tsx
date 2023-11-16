import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ServiceItem from './ServiceItem';

import {View, Text, Button} from '@/components';
import {colors} from '@/utils';

const ServiceList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const SHOW_COUNT = 1;
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setServices([
      {
        _id: '65524dc4940e10c58ce122ce',
        serviceName: 'LPG Targeted Treatment',
        description: 'Mit dem ersten verfügbaren Stylisten / Mitarbeiter',
        price: '164.34 TL',
        durationMinutes: '23 mins',
        category: '6534b942afe69b53dc342da0',
        serviceType: 'Female',
      },
      {
        _id: '65524dc4940d0c58ce122ce',
        serviceName: '23 Targeted Treatment',
        description: 'Mit dem ersten verfügbaren Stylisten / Mitarbeiter',
        price: '20.34 TL',
        durationMinutes: '15 mins',
        category: '6534b942dfe69b53dc342da0',
        serviceType: 'Male',
      },
    ]);
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      'all',
      ...new Set(services.map(service => service.category)),
    ];
    setCategories(uniqueCategories);
  }, [services]);

  const renderCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 8, paddingHorizontal: 16}}
        style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryItem}>
            <Text>{category === 'all' ? 'Tümü' : category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderServices = () => {
    const filteredServices = services.filter(
      service =>
        selectedCategory === 'all' || service.category === selectedCategory,
    );
    const servicesToShow = showAll
      ? filteredServices
      : filteredServices.slice(0, SHOW_COUNT);
    return (
      <>
        {servicesToShow.map(service => (
          <ServiceItem key={service._id} {...service} />
        ))}
        {filteredServices.length > SHOW_COUNT && (
          <Button
            label={showAll ? 'Daha Az Göster' : 'Tümünü Gör'}
            variant="secondary"
            onPress={() => setShowAll(!showAll)}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name={'business-center'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Services
        </Text>
      </View>
      {renderCategories()}
      <View style={styles.servicesContainer}>{renderServices()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  servicesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryItem: {
    backgroundColor: '#FFFFFF', // Örnek arka plan rengi, uygun renk kodu ile değiştirin
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC', // Örnek kenarlık rengi, uygun renk kodu ile değiştirin
  },
});

export default ServiceList;
