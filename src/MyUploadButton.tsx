import './App.css';

interface CreateUploadButtonProps {
    name: string;
    onClick: () => void;
}

function CreateUploadButton({name, onClick}: CreateUploadButtonProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', fontSize: "30px", gap: 30, color: 'white'}} onClick={onClick}>
                <img src= "./upload.png" style={{ padding: 0, width: 60, height: 60, marginRight: 30, filter: 'invert(1)'}}/>
                {name}
            </span>
        </div>
    );
}

export default CreateUploadButton;
