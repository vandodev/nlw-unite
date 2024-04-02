import {View, Text, StyleSheet} from "react-native"

export default function Home(){
    return(
        // <View style={{backgroundColor:"red", flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>Olá mundo</Text>
        </View>
    )
}
 const styles = StyleSheet.create({
    container:{
        backgroundColor:"#000",
        flex: 1, 
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:24,
        color:"white"
    }
 })