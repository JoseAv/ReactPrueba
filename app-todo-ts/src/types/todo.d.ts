import { typesFilters } from './initialData'

export interface typeTodo {
    nameTask: string,
    id: string
    edit: boolean
    completed: boolean
}


export interface typesTodo {
    dataTodo: typeTodo[]
}

export interface typesFilterButton {
    all: string,
    completed: string,
    deleted: string,
    incomplet: string

}

export type TypesFiltes = typeof typesFilters[keyof typeof typesFilters]
