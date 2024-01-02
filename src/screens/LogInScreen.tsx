import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RootStackProps} from '@/types/navigationType';
import {z} from 'zod';
type LogInScreenProps = RootStackProps<'LoginScreen'>;

const LogInScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const logInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });

  type LogInSchemaType = z.infer<typeof logInSchema>;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
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
          cursorColor={'#8899AA'}
          selectionColor={'#8899AA'}
          value={usernameInput}
          onChangeText={text => {
            setUsernameInput(text);
          }}
        />
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            width: 200,
            height: 50,
            borderColor: '#8899AA',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            style={{
              color: '#8899AA',
            }}
            placeholder="Password"
            placeholderTextColor="#8899AA"
          />
          <TouchableOpacity onPress={handleShowPassword}>
            <Text
              style={{
                color: '#8899AA',
              }}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
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
