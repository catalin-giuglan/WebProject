import './App.css';

interface CreateLogoButton {
    onClick: () => void;
}

function CreateLogoButton({ onClick }: CreateLogoButton) {
    return (
        <div>
            <span style={{ marginRight: '10px', position: 'relative'}}>
                <img src="./youtube.png" style={{ padding: 0, width: 80, height: 70, filter: 'invert(1)', marginTop: 5}} onClick={onClick} />
            </span>
        </div>
    );
}

export default CreateLogoButton;
