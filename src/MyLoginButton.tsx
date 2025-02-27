import './App.css';

interface CreateLoginButtonProps {
    onClick: () => void;
}

function CreateLoginButton({ onClick }: CreateLoginButtonProps) {
    return (
        <div style={{alignItems: 'center' }}>
            <span>
                <img src="./login.png" style={{ padding: 0, width: 100, height: 100, filter: 'invert(1)'}} onClick={onClick} />
            </span>
        </div>
    );
}

export default CreateLoginButton;
