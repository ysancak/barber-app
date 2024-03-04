import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import {useFetch} from '@/hooks';
import {homeSlidesService} from '@/services/common.service';
import {colors} from '@/utils';

const Slider = () => {
  const {data, fetch} = useFetch(homeSlidesService);

  useEffect(() => {
    fetch();
  }, []);

  if (data?.length > 0) {
    return (
      <SliderBox
        images={data}
        sliderBoxHeight={180}
        dotColor={colors.primaryColor}
        inactiveDotColor={colors.borderColor2}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        paginationBoxVerticalPadding={10}
      />
    );
  }
};

export default Slider;

const styles = StyleSheet.create({});
