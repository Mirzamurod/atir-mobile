import React, { useEffect } from 'react'
import { Button } from '@rneui/themed'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ScreenWrapper from '@/components/ScreenWrapper'
import { i18n } from '@/context/LanguageContext'
import { TRegister } from '@/types/register'
import Input from '@/components/Input'
import PasswordInput from '@/components/PasswordInput'
import { userLogin } from '@/store/user/login'
import { useAppSelector } from '@/store'

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const formSchema = yup.object().shape({
    phone: yup.string().required(i18n.t('phone_required')),
    password: yup.string().required(i18n.t('password_required')),
  })
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema),
    defaultValues: { phone: '+998946565702', password: 'Test123!@#' },
  })
  const { handleSubmit, setError } = methods

  const { errors: loginErrors, success, isLoading, user } = useAppSelector(state => state.login)

  useEffect(() => {
    if (success && user) router.replace('/')
  }, [success, user])

  const onSubmit = (values: TRegister) => dispatch(userLogin(values))

  return (
    <ScreenWrapper guestGuard>
      <FormProvider {...methods}>
        <KeyboardAwareScrollView extraScrollHeight={100} contentContainerStyle={{ height: '100%' }}>
          <ScrollView contentContainerStyle={{ height: '100%' }}>
            <View style={styles.container}>
              <Input name='phone' keyboardType='phone-pad' textContentType='telephoneNumber' />
              <PasswordInput name='password' />
              <View style={styles.submit}>
                <Button onPress={handleSubmit(onSubmit)}>{i18n.t('submit')}</Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </FormProvider>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: { height: '100%', justifyContent: 'center', alignItems: 'center' },
  submit: { width: '100%', paddingHorizontal: 10 },
})
