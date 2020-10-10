import ISelectOption from 'src/models/ISelectOption'

class SelectOptionHandler {
  static getSelectedOptionValue(selectedOption: ISelectOption) {
    return selectedOption.value
  }
}

export default SelectOptionHandler
