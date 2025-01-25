// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


// const ReminderCard = ({reminder, onDelete, onEdit}) =>{
//     return (
//         <View style={styles.card}>
//             <Text style={styles.reminderText}>{reminder.text}</Text>
//             <Text style={styles.dateText}>{new Date(reminder.date).toLocaleString()}</Text>
//             <View style={styles.actions}>
//                 <TouchableOpacity onPress={onEdit}>
//                     <Text style={styles.editText}>Edit</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDelete}>
//                     <Text style={styles.deleteText}>Delete</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// } ;
// const styles = StyleSheet.create({
//     card: {
//         backgroundColor: '#fff',
//         padding: 15,
//         marginVertical: 10,
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     reminderText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     dateText: {
//         fontSize: 14,
//         color: '#555',
//     },
//     actions: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//     },
//     editText: {
//         fontSize: 14,
//         color: 'blue',
//     },
//     deleteText: {
//         fontSize: 14,
//         color: 'red',
//     },
// });

// export default ReminderCard;