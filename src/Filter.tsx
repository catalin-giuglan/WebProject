import './App.css';

interface CreateFilterButtonProps {
    name: string;
    onClick: () => void;
}

function CreateFilter({ name, onClick }: CreateFilterButtonProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: "30px", color: 'white'}} onClick={onClick}>
                {name}
            </span>
        </div>
    );
}

export default CreateFilter;
