
import { ComponentInternalInstance } from 'vue'
import {IInputSelectFunc} from "../../autocomplete/src/be-autocomplete-type";

export interface ISelect extends ComponentInternalInstance {
  uid: number
  refs:{
    beSelectPopover: IInputSelectFunc
  }
}

