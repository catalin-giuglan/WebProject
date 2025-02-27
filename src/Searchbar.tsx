import './App.css'
import { useState } from 'react';

function CreateSearch({ placeholder, state, setState }: { placeholder: string, state: any, setState: any }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <input type="text" placeholder={placeholder} onChange={setState} value={state} style={{ width: '280px' }} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            />
            {isFocused && (
                <img src="./loupe.png" style={{ position: 'absolute', left: '20px', width: '20px', height: '20px', filter: 'invert(1)', top: '21px'}}/>
            )}
        </div>
    );
}

export default CreateSearch;