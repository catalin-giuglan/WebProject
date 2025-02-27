import './App.css';

interface CreateHomeButtonProps {
    name: string;
    onClick: () => void;
}

function CreateHomeButton({name, onClick}: CreateHomeButtonProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 20 }}>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: "30px", gap: 30, color: 'white'}} onClick={onClick}>
                <img src="./home.png" style={{ padding: 0, width: 60, height: 60, marginRight: 30, filter: 'invert(1)'}} />
                {name}
            </span>
        </div>
    );
}

export default CreateHomeButton;
