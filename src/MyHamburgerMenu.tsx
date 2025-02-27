import './App.css';

interface CreateHamburgerButtonProps {
    onClick: () => void;
}

function CreateHamburgerButton({ onClick }: CreateHamburgerButtonProps) {
    return (
        <div>
            <span>
                <img src="./hamburger.png" style={{ padding: 0, width: 60, height: 60, filter: 'invert(1)'}} onClick={onClick} />
            </span>
        </div>
    );
}

export default CreateHamburgerButton;
