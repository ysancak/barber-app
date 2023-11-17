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
        category: 'Face',
        serviceType: 'Female',
      },
      {
        _id: '65524dc4940d0c58ce122ce',
        serviceName: '23 Targeted Treatment',
        description: 'Mit dem ersten verfügbaren Stylisten / Mitarbeiter',
        price: '20.34 TL',
        durationMinutes: '15 mins',
        category: 'Nails',
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
        contentContainerStyle={styles.scrollViewContent}
        style={styles.categoryContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategoryItem,
            ]}>
            <Text
              style={
                selectedCategory === category && styles.selectedCategoryText
              }>
              {category === 'all' ? 'Tümü' : category}
            </Text>
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
      <View gap={10}>
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
    gap: 8,
  },

  categoryContainer: {
    marginBottom: 12,
  },
  categoryItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor3,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primaryColor,
    borderColor: colors.primaryColor,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  scrollViewContent: {
    gap: 10,
    paddingHorizontal: 16,
  },
});

export default ServiceList;
