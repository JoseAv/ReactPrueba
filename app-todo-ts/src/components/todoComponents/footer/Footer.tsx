import React from 'react'
import { FilterButton } from '../../../types/initialData'
import './footer.css'

interface typesFilter {
    filtersChange: (value: string) => void
}

export const Footer: React.FC<typesFilter> = ({ filtersChange }) => {

    return (
        <div className='containerFooter Footer'>
            {
                Object.entries(FilterButton).map(([key, value]) => {
                    return <button key={key} onClick={() => filtersChange(value)} className='my-button'>{value}</button>;
                })
            }
        </div>

    )



}