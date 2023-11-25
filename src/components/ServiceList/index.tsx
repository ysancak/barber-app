import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';

import ServiceItem from './ServiceItem';

import {View, Text, Button} from '@/components';
import {colors} from '@/utils';

type Props = {
  services: Service[];
};

const ServiceList: React.FC<Props> = ({services}) => {
  const {t} = useTranslation();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  const SHOW_COUNT = 3;
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const uniqueCategories = [
      'all',
      ...new Set(services.map(service => service.categoryName)),
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
              {category === 'all' ? t('general.all') : category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderServices = () => {
    const filteredServices = services.filter(
      service =>
        selectedCategory === 'all' || service.categoryName === selectedCategory,
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
            label={showAll ? t('general.seeLess') : t('general.seeMore')}
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
