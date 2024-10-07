import React, { FC, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Input, InputProps } from '@rneui/themed'
import { Controller, useFormContext } from 'react-hook-form'
import { i18n } from '@/context/LanguageContext'

interface IProps {
  name: string
  label?: string
}

const PasswordInput: FC<IProps & InputProps> = props => {
  const { name, label, placeholder } = props
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [show, setShow] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          {...props}
          placeholder={i18n.t(placeholder || label || name)}
          label={i18n.t(label || name)}
          secureTextEntry={!show}
          textContentType='password'
          // onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          keyboardType='default'
          rightIcon={
            <Icon name={show ? 'visibility-off' : 'visibility'} onPress={() => setShow(!show)} />
          }
          {...(errors?.[name]?.message ? { errorMessage: errors?.[name]?.message as string } : {})}
        />
      )}
    />
  )
}

export default PasswordInput

const styles = StyleSheet.create({})
