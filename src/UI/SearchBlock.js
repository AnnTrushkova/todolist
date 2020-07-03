import React from 'react'
import TextField from '@material-ui/core/TextField'

const SearchBlock = (props) => {
    let onFilterChanged = (e) => {
        props.setFilter(e.currentTarget.value)
    }

    return <TextField id="search" label="search" onChange={onFilterChanged} style={{ marginTop: 10 }} />
}

export default SearchBlock
