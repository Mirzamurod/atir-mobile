import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { InputProps, Input as RNEInput } from '@rneui/themed'
import { i18n } from '@/context/LanguageContext'

interface IProps {
  name: string
  label?: string
}

const Input: FC<IProps & InputProps> = props => {
  const { name, label, placeholder } = props
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <RNEInput
          {...props}
          placeholder={i18n.t(placeholder || label || name)}
          label={i18n.t(label || name)}
          // keyboardType='phone-pad'
          // onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          {...(errors?.[name]?.message ? { errorMessage: errors?.[name]?.message as string } : {})}
        />
      )}
    />
  )
}

export default Input

const styles = StyleSheet.create({})
