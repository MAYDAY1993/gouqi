import * as React from 'react'
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  TextInput,
  StyleSheet,
  TextInputProperties,
  TouchableHighlight
} from 'react-native'
import {
  Color
} from '../styles'
// tslint:disable-next-line
const Icon = require('react-native-vector-icons/FontAwesome')

type Ref = string | ((instance: any) => any)

interface IForm extends TextInputProperties {
  icon: string,
  containerStyle?: ViewStyle,
  wrapperStyle?: ViewStyle,
  inputRef?: Ref,
  onClear?: () => void
 }

 interface IFormStates {
   focus: boolean
 }

export class Form extends React.Component<IForm, IFormStates> {
  constructor(props: IForm) {
    super(props)
  }

  render () {
    const {
      containerStyle = {},
      wrapperStyle = {},
      icon,
      placeholder,
      editable,
      onChangeText,
      value,
      secureTextEntry,
      onClear,
      onSubmitEditing,
      autoCorrect = false,
      autoCapitalize,
      autoFocus = false,
      inputRef
    } = this.props

    const clearIcon = <View style={[styles.formIcon, { marginRight: 5}]}>
      <Icon name='times-circle' size={14} color='#bbb' onPress={onClear}/>
    </View>

    return <View style={[styles.formContainer, containerStyle]}>
        <View style={[styles.formInnerWrapper, wrapperStyle]}>
          <View style={styles.formIcon}>
            <Icon name={icon} size={14} color='#ccc'/>
          </View>
          <TextInput
            ref={inputRef}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            style={styles.searchInput}
            placeholder={placeholder}
            editable={editable}
            onChangeText={onChangeText}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            secureTextEntry={secureTextEntry}
            value={value}
            onSubmitEditing={onSubmitEditing}
          />
          { value && this.state.focus ? clearIcon : null }
      </View>
    </View>
  }

  private onFocus = () => {
    this.setState({ focus : true})
  }

  private onBlur = () => {
    this.setState({ focus : false })
  }
}

interface IButtonProps {
  disabled?: boolean,
  children?: JSX.Element | string,
  onPress?: () => void
}

export const Button = ({
  disabled = false,
  children,
  onPress
}: IButtonProps) => {
  return (
    <TouchableHighlight
      style={[styles.buttonContainer]}
      onPress={onPress}
    >
      <Text
        style={[styles.buttonText, disabled && styles.buttonDisabled]}
      >
        {children}
      </Text>
    </TouchableHighlight>
  )
}
const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5
  } as ViewStyle,
  formInnerWrapper: {
      flexDirection: 'row',
      height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6E6EA',
    borderRadius: 5
  } as ViewStyle,
  formOutterWrapper: {
      flexDirection: 'row',
    height: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E6E6EA',
    borderRadius: 5
  } as ViewStyle,
  searchInput: {
    marginLeft: 5,
    flex: 1,
    height: 30,
    fontSize: 14
  } as TextStyle,
  formIcon: {
    height: 30,
    marginLeft: 5,
    justifyContent: 'center'
  } as TextStyle,
  buttonContainer: {
    backgroundColor: Color.main,
    margin: 10,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 5
  } as ViewStyle,
  buttonDisabled: {
    color: '#ddd'
  } as TextStyle,
  buttonText: {
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: 'white'
  } as TextStyle
})
