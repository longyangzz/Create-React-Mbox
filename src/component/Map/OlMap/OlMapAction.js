import {action, runInAction, toJS} from 'mobx';
import { observable } from "mobx"

import OlMapStore from "./OlMapStore"

class OlMapAction {
    constructor(store) {
        this.store = store
        this.ShowHideSwitch();

    }

    @action
    ShowHideSwitch(){
        this.store.isShow = !this.store.isShow;
    }
}

export default new OlMapAction(OlMapStore)
