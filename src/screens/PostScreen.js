import React, { useEffect, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { THEME } from '../theme'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { Item, HeaderButtons } from 'react-navigation-header-buttons'
import {
  toggleBooked,
  removePost,
  loadPosts
} from '../store/actions/postActions'

export const PostScreen = ({ navigation }) => {
  const postId = navigation.getParam('postId')

  const post = useSelector(({ post }) =>
    post.allPosts.find(p => p.id === postId)
  )

  const { image, textWrap, title } = styles

  const booked = useSelector(({ post }) =>
    post.bookedPosts.some(p => p.id === postId)
  )

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const dispatch = useDispatch()
  const toggleHandler = useCallback(() => dispatch(toggleBooked(post)), [
    dispatch,
    post
  ])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you sure',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            navigation.goBack()
            dispatch(removePost(postId))
            dispatch(loadPosts())
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    )
  }

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={image} />
      <View style={textWrap}>
        <Text style={title}>{post.text}</Text>
      </View>
      <Button
        title='Delete'
        color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {
  const date = navigation.getParam('date')
  const booked = navigation.getParam('booked')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconName = booked ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: 'Post of ' + new Date(date).toLocaleDateString(),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='toggle' iconName={iconName} onPress={toggleHandler} />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})
