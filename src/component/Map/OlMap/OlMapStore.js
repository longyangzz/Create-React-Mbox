import {action, observable} from "mobx";
class  OlMapStore {
    @observable isShow = true;

    constructor() {
        this.isShow = true
    }



}

export default new OlMapStore()
