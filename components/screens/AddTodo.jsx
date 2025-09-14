import React,{useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TODO_KEY = '@todos'

const AddTodo = () => {
    const [task, setTask] = useState('')
    const [desc, setDesc] = useState('')
    // const [todoData, setTodoData] = useState('')

    useEffect(() => {

    },[task,desc])

    const handleSave = async () => {
        try{
            const todo = {task : task, description : desc, isCompleted : false}
            const data = await AsyncStorage.getItem(TODO_KEY)
            if(data){
                let todos = JSON.parse(data)
                todos = [...todos,todo]
                const res = await AsyncStorage.setItem(TODO_KEY, JSON.stringify(todos))
            }else{
                const res = await AsyncStorage.setItem(TODO_KEY, JSON.stringify([todo]))
            } 
            setTask('')
            setDesc('')
        }catch(err){
            console.log(err)
        }
    }

  return (
    <View style = {styles.container}> 
        <TextInput 
            style = {styles.input} 
            placeholder='Enter task'
            onChangeText={setTask}
        >
        </TextInput>
        <TextInput
          multiline
          numberOfLines={3} 
          onChangeText={setDesc}
          style = {[styles.input, { height : 60}]} placeholder='Enter note'></TextInput>
        <TouchableOpacity 
            style = {styles.button} 
            onPress = {handleSave}
        >
            <Text style = {styles.buttonText}>Save</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        marginTop : 50
    },
    input : {
        width : 300,
        borderWidth : 1,
        borderColor : 'black',
        padding : 10,
        margin : 5
    }, 
    button : {
        width : 300,
        backgroundColor : 'lightblue',
        borderRadius : 7,
        padding : 10,
        margin : 5,
        marginTop : 20
    },
    buttonText : {
        textAlign : 'center',
    }
})

export default AddTodo