import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'

export const Post = ({ post, onOpen }) => {
  const { img, date } = post
  const { wrapper, image, textWrap, title } = styles

  return (
    <TouchableOpacity activeOpacity={(0, 7)} onPress={() => onOpen(post)}>
      <View style={wrapper}>
        <ImageBackground style={image} source={{ uri: img }}>
          <View style={textWrap}>
            <Text style={title}>{new Date(date).toLocaleDateString()}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: '#fff',
    fontFamily: 'open-regular'
  }
})
