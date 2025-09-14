import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Description from './Description';

const TODO_KEY = '@todos'

const Completed = () => {
  const [todos, setTodos] = useState([])

    useEffect(() => {
        async function loadTodos(){
            try{
                const data = await AsyncStorage.getItem(TODO_KEY)
                setTodos(JSON.parse(data).filter((ele) => ele.isCompleted))
            }catch(err){
                console.log(err)
            }
        }
        loadTodos()
    },[todos])

  return (
    <View>
        <ScrollView style = {styles.scrollContainer}>
            {
                todos.map((ele,index) => {
                    return (
                        <View key={index} style = {styles.taskContainer}>
                            <Text style = {styles.text}>{ele.task}</Text>
                            <TouchableOpacity onPress={() => handleDelete(index)}> 
                                <Ionicons name = "trash-outline" size={30} color="red"></Ionicons>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    scrollContainer : {
        padding : 15
    },
    taskContainer : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        height : 60,
        backgroundColor : '#dfdfdf',
        borderRadius : 10,
        padding : 10,
        margin : 7
    },
    text : {
        fontSize : 18,
    },
    checkButton : {
        height : 30,
        width : 30,
        backgroundColor : 'lightgreen'
    },
    delete : {
        height : 30,
        width : 30,
        backgroundColor : 'red'
    }
})

export default Completed