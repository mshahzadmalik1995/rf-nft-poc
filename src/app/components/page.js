'use client';
const Hello = () => {
    const submit = () => {
        alert("hi shahzad")
    }
    
    return (
        <div>
            <h1>hi Components</h1>
            <button onClick={submit} className="border-black-800 rounded-lg p-2 border-4">hi Shahzad</button>
        </div>
    )
}

export default Hello;