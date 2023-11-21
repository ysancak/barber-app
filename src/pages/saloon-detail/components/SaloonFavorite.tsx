import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useAuth from '@/hooks/useAuth';
import {toggleSaloonFavoriteService} from '@/services/saloon.service';
import {alerts, colors} from '@/utils';

type Props = {
  initialValue: boolean;
  businessID: string;
};

const SaloonFavorite: React.FC<Props> = ({initialValue, businessID}) => {
  const isAuthenticated = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialValue);

  const onToggleHandler = async () => {
    if (!isAuthenticated) {
      return alerts.authWarningAlert();
    }

    const originalValue = isFavorite;
    setIsFavorite(!originalValue);
    try {
      await toggleSaloonFavoriteService({businessID});
    } catch {
      setIsFavorite(originalValue);
    }
  };

  return (
    <TouchableOpacity style={styles.headerRight} onPress={onToggleHandler}>
      {isFavorite ? (
        <Icon name="favorite" size={30} color={colors.primaryColor} />
      ) : (
        <Icon
          name="favorite-border"
          size={30}
          color={colors.captionTextColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default SaloonFavorite;

const styles = StyleSheet.create({
  headerRight: {
    paddingHorizontal: 16,
  },
});
