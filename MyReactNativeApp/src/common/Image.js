import ImagePicker from 'react-native-image-picker';
/**
 * Image Picker from Local Library
 * @author dattd
 * @param title
 * @param cb
 */

export const imagePicker = (title, cb) => {
  let options = {
    title: title,
    cancelButtonTitle: 'Huỷ',
    takePhotoButtonTitle: 'Chụp ảnh mới',
    chooseFromLibraryButtonTitle: 'Chọn ảnh có sẵn',
    mediaType: 'photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let source = {
        uri: response.uri,
        path: response.path,
        height: response.height,
        width: response.width,
        fileSize: response.fileSize,
        fileName: response.fileName,
      };
      cb(source, response.data);
    }
  });
};
