export interface ISortableGroup {
    name: string
    pull: string | boolean | any[]    //true, false, 'clone', array
    put: string | boolean | any[]                         // true, false, array
}

export class SortableGroup implements ISortableGroup {
    name: string
    pull: string | boolean | any[]
    put: string | boolean | any[]

    constructor(name: string = "insites-sort-group", pull: string | boolean | any[] = true, put: string|boolean | any[] = true){
        this.name = name
        this.pull = pull
        this.put = put
    }
}