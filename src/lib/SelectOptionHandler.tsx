import ISelectOption from 'src/models/ISelectOption'
import IScrollable from "../models/IScrollable";

class SelectOptionHandler {
  static getSelectedOptionValue(selectedOption: ISelectOption) {
    return selectedOption.value
  }

  static mapApiResponseToSelectOptions(apiResponse: IScrollable | undefined) {
    if (!apiResponse) return;
    if (apiResponse && apiResponse.data && apiResponse.data.results) {
      const selectOptionsList: Array<ISelectOption> = new Array<ISelectOption>()
      apiResponse.data.results.map((result => {
        if (result.id && result.title) {
          selectOptionsList.push({value: result.id.toString(), label: result.title})
        }
      }));
      return selectOptionsList;
    }
  }
}

export default SelectOptionHandler
