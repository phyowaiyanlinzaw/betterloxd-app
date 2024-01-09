import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {FC, useEffect, useState} from 'react';
import {RootStackProps} from '@/types/navigationType';
import {z} from 'zod';
import useGetUsersList from '@/hooks/useGetUsersList';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {getWidthHeightStuff} from '@/utils/getWidthHeightStuff';
import {useNavigation} from '@react-navigation/native';
import {WarningIcon} from '@/assets/icons';
import {useAppDispatch, useAppSelector} from '@/redux/hook/hook';
import {setUser} from '@/redux/features/userSlice';
import currentUser, {getUser} from '@/utils/getCurrentUser';
import {getCurrentUser} from '@/api/usersApi';

type LogInScreenProps = RootStackProps<'LoginScreen'>;
type Navigation = LogInScreenProps['navigation'];

const LogInScreen: FC<LogInScreenProps> = () => {
  const navigation = useNavigation<Navigation>();

  const dispatch = useAppDispatch();
  const testUser = useAppSelector(state => state.user);

  // console.log('Log In Screen test user : ', testUser);

  const cu = async () => {
    return await getUser();
  };

  useEffect(() => {
    cu().then(user => {
      // console.log('Log In Screen current user : ', user);
    });
  }, []);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isRegisterBtnPressed, setIsRegisterBtnPressed] =
    useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const logInSchema = z.object({
    email: z.string().email() || z.string().min(8),
    password: z.string(),
  });

  type LogInSchemaType = z.infer<typeof logInSchema>;

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isValid, isDirty},
  } = useForm<LogInSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(logInSchema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {usersList} = useGetUsersList();
  const {RPH, RPW} = getWidthHeightStuff();

  const handleLogin: SubmitHandler<LogInSchemaType> = value => {
    for (let user of usersList!) {
      if (user.email === value.email && user.password === value.password) {
        dispatch(setUser(user));
        navigation.navigate('HomeScreen', {
          screen: 'Home',
        });
        break;
      }
      if (user === usersList![usersList!.length - 1]) {
        setIsModalVisible(true);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#1B2126',
      }}>
      <View
        style={{
          justifyContent: 'flex-end',
          marginBottom: RPH(15),
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          LOG IN
        </Text>
        <Modal
          isVisible={isModalVisible}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0,
          }}
          onBackdropPress={() => setIsModalVisible(false)}
          onBackButtonPress={() => setIsModalVisible(false)}
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          backdropTransitionOutTiming={0}
          backdropTransitionInTiming={0}
          backdropOpacity={0.5}
          animationInTiming={500}
          animationOutTiming={500}
          hideModalContentWhileAnimating={true}
          propagateSwipe={true}
          swipeDirection={'down'}
          swipeThreshold={50}>
          <View
            style={{
              backgroundColor: '#15181D',
              height: RPH(30),
              width: RPW(60),
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: 0.8,
            }}>
            <WarningIcon
              height={50}
              width={50}
              style={{
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Wrong Credentials
            </Text>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: '#8899AA',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#1B2126',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}, formState: {errors}}) => (
            <>
              <TextInput
                autoCapitalize="none"
                style={{
                  color: '#8899AA',
                  marginTop: 20,
                  marginBottom: 5,
                  width: 250,
                  height: 50,
                  borderColor: errors.email ? '#FF0000' : '#8899AA',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                }}
                placeholder={'Email or Username'}
                placeholderTextColor={errors.email ? '#FF0000' : '#8899AA'}
                cursorColor={'#8899AA'}
                selectionColor={'#8899AA'}
                value={value}
                onChangeText={onChange}
              />
              {errors.email && (
                <Text
                  style={{
                    color: '#FF0000',
                  }}>
                  Please enter a valid email
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 5,
                  width: 250,
                  height: 50,
                  borderColor: errors.password ? '#FF0000' : '#8899AA',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  secureTextEntry={!showPassword}
                  style={{
                    color: '#8899AA',
                  }}
                  placeholder={'Password'}
                  placeholderTextColor={errors.password ? '#FF0000' : '#8899AA'}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  autoCapitalize="none"
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
              {errors.password && (
                <Text
                  style={{
                    color: '#FF0000',
                  }}>
                  Please enter a valid password
                </Text>
              )}
            </>
          )}
        />

        <TouchableOpacity
          style={{
            marginTop: 10,
          }}>
          <Text
            style={{
              color: '#8899AA',
              fontSize: 12,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              marginBottom: 5,
              width: 250,
              height: 50,
              backgroundColor: '#8899AA',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSubmit(handleLogin)}>
            <Text
              style={{
                color: '#1B2126',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableHighlight
            underlayColor={'#8899AA'}
            activeOpacity={0.6}
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}
            onHideUnderlay={() => setIsRegisterBtnPressed(false)}
            onShowUnderlay={() => setIsRegisterBtnPressed(true)}
            style={{
              marginTop: 5,
              marginBottom: 10,
              width: 250,
              height: 50,
              borderWidth: 1,
              borderColor: '#8899AA',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: isRegisterBtnPressed ? '#1B2126' : '#8899AA',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default LogInScreen;
