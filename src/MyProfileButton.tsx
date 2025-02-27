import './App.css';

interface CreateProfileButtonProps {
    name: string;
    onClick: () => void;
}

function CreateProfileButton({name, onClick}: CreateProfileButtonProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: "30px", gap: 30, color: 'white'}} onClick={onClick}>
                <img src= "./user.png" style={{ padding: 0, width: 60, height: 60, marginRight: 30, filter: 'invert(1)'}}/>
                {name}
            </span>
        </div>
    );
}

export default CreateProfileButton;
