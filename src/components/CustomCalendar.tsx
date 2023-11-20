import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

const CustomCalendar = () => {
  return (
    <View style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
            backgroundColor: colors.whiteColor,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: 110,
              gap: 6,
            }}>
            <View
              style={{
                backgroundColor: colors.borderColor2,
                borderRadius: 99,
              }}>
              <Icon
                name="chevron-left"
                size={30}
                color={colors.secondaryColor}
              />
            </View>
          </TouchableOpacity>

          <View style={{flex: 1, alignItems: 'center'}}>
            <Text semibold fontSize={18}>
              20 Kasım 2023
            </Text>
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: 110,
              gap: 6,
            }}>
            <View
              style={{
                backgroundColor: colors.borderColor2,
                borderRadius: 99,
              }}>
              <Icon
                name="chevron-right"
                size={30}
                color={colors.secondaryColor}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{backgroundColor: colors.bgColor}}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.bgColor,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text variant="title" fontSize={16}>
              10:00
            </Text>
          </View>
          <Icon name="expand-less" size={30} />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.borderColor,
              borderRadius: 99,
              width: 24,
              height: 24,
            }}
          />
          <Text color={colors.textColor} medium>
            10:00
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <View
            style={{
              backgroundColor: colors.primaryColor,
              borderRadius: 99,
              width: 24,
              height: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="done" size={16} color={colors.whiteColor} />
          </View>
          <Text color={colors.textColor} medium>
            10:15
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.borderColor,
              borderRadius: 99,
              width: 24,
              height: 24,
            }}
          />
          <Text color={colors.textColor} medium>
            10:30
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.borderColor,
              borderRadius: 99,
              width: 24,
              height: 24,
            }}
          />
          <Text color={colors.textColor} medium>
            10:45
          </Text>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.bgColor,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text variant="title" fontSize={16}>
              13:00
            </Text>
          </View>
          <Icon name="expand-less" size={30} />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.borderColor,
              borderRadius: 99,
              width: 24,
              height: 24,
            }}
          />
          <Text color={colors.textColor} medium>
            13:40
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.whiteColor,
            paddingHorizontal: 16,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: colors.borderColor,
              borderRadius: 99,
              width: 24,
              height: 24,
            }}
          />
          <Text color={colors.textColor} medium>
            13:45
          </Text>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.bgColor,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text variant="title" fontSize={16}>
              14:00
            </Text>
          </View>
          <Icon name="expand-more" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.bgColor,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text variant="title" fontSize={16}>
              15:00
            </Text>
          </View>
          <Icon name="expand-more" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: colors.bgColor,
            borderBottomWidth: 1,
            borderColor: colors.borderColor3,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text variant="title" fontSize={16}>
              17:00
            </Text>
          </View>
          <Icon name="expand-more" size={30} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CustomCalendar;

const styles = StyleSheet.create({});
