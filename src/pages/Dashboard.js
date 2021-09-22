import React from 'react'
import { readData } from '../helpers/firebase'

export default function Dashboard() {
    return (
        <div>
            <button onClick={readData}>ReadData</button>
        </div>
    )
}
