import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const Description = ({route}) => {
  const {task} = route.params

  return (
    <View>
      <Text>{task.description}</Text>
    </View>
  )
}

export default Description