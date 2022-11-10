import ImageColors from 'react-native-image-colors';

export const getColorImage = async (uri: string) => {
  const result = await ImageColors.getColors(uri, {});

  if (result.platform === 'android' || result.platform === 'web') {
    return {
      primary: result.dominant,
      secondary: result.vibrant,
      terciary: result.lightVibrant,
    };
  } else {
    return {
      primary: result.primary,
      secondary: result.secondary,
      terciary: result.detail,
    };
  }
};