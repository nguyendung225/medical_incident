//@ts-nocheck
import { useEffect } from 'react'
import { Hooks, TableInstance } from 'react-table'


export const useStartExpanded = <D extends object = {}>(hooks: Hooks<D>): void => {
    hooks.useInstance.push(useInstance)
}
useStartExpanded.pluginName = 'useStartExpanded'

const useInstance = <D extends object = {}>(instance: TableInstance<D>): void => {
    const {
        state: { startExpanded },
        toggleAllRowsExpanded,
        data
    } = instance

    useEffect(() => {
        if (startExpanded && toggleAllRowsExpanded) {
            toggleAllRowsExpanded(true)

        }
    }, [startExpanded, toggleAllRowsExpanded, data])
}