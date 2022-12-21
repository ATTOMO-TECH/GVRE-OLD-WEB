import React, { createContext, useState } from 'react'

const Provider = (props) => {
    const [state, setState] = useState({})
    return (
        <div>
            <generalContext.Provider value={[state, setState]}>
                {props.children}
            </generalContext.Provider>
        </div>
    )
}

export default Provider;
export const generalContext = createContext();