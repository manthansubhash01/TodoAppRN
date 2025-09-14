import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const TODO_KEY = '@todos'

const All = () => {
    const [todos, setTodos] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        async function loadTodos(){
            try{
                const data = await AsyncStorage.getItem(TODO_KEY)
                setTodos(JSON.parse(data))
            }catch(err){
                console.log(err)
            }
        }
        loadTodos()
    },[todos])

    const handleComplete = async(id) => {
        try{
            const data = await AsyncStorage.getItem(TODO_KEY)
            let res = JSON.parse(data)
            res = res.map((ele,index) => {
                if(index == id){
                    ele.isCompleted = true;
                }
                return ele
            })
            await AsyncStorage.setItem(TODO_KEY,JSON.stringify(res))
            setTodos(res)
        }catch(err){
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try{
            const data = await AsyncStorage.getItem(TODO_KEY)
            let res = JSON.parse(data)
            res = res.filter((ele,index) => index != id)
            await AsyncStorage.setItem(TODO_KEY,JSON.stringify(res))
        }catch(err){
            console.log(err)
            setTodos(res)
        }
    }

  return (
    <View>
        <ScrollView style = {styles.scrollContainer}>
            {
                todos.map((ele,index) => {
                    return (
                        <View key={index} style = {styles.taskContainer}>
                            <TouchableOpacity onPress={() => handleComplete(index)}>
                               <Ionicons name = "checkmark" size={30} color="green"></Ionicons>
                            </TouchableOpacity>
                            <Text style = {styles.text}>{ele.task}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Description",{task : ele})}> 
                                <Ionicons name = "eye" size={30} color="black"></Ionicons>
                            </TouchableOpacity>
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
        justifyContent : 'space-around',
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

export default All