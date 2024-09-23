import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LastActivityScreen = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        loadActivities();
    }, []);

    const loadActivities = async () => {
        const storedActivities = await AsyncStorage.getItem('activities');
        if (storedActivities) {
            setActivities(JSON.parse(storedActivities));
        }
    };

    const saveActivity = async (activity) => {
        const newActivities = [...activities, activity];
        await AsyncStorage.setItem('activities', JSON.stringify(newActivities));
        loadActivities();
    };

    return (
        <View>
            <Button title="Adicionar Atividade" onPress={() => saveActivity(`Atividade ${activities.length + 1}`)} />
            {activities.length > 0 ? (
                <FlatList
                    data={activities}
                    renderItem={({ item }) => <Text>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text>Não existem atividades.</Text>
            )}
        </View>
    );
};

export default LastActivityScreen;
