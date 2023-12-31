import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {RootStackProps} from '@/types/navigationType';

type LogInScreenProps = RootStackProps<'LoginScreen'>;

const LogInScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1B2126',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Log In
        </Text>
        <TextInput
          style={{
            color: '#8899AA',
            marginTop: 20,
            marginBottom: 10,
            width: 200,
            height: 50,
            borderColor: '#8899AA',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          placeholder="Username"
          placeholderTextColor="#8899AA"
        />
        <TextInput
          style={{
            color: '#8899AA',
            marginTop: 20,
            marginBottom: 10,
            width: 200,
            height: 50,
            borderColor: '#8899AA',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
          placeholder="Password"
          placeholderTextColor="#8899AA"
        />
        <TouchableOpacity
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: 200,
            height: 50,
            backgroundColor: '#8899AA',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#1B2126',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogInScreen;
