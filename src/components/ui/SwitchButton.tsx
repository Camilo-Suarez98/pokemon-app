interface SwitchButtonProps {
  textButton: string;
  onClick: () => void;
  disabled?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ textButton, onClick, disabled }) => {
  return (
    <button
      className="px-4 py-2 mt-4 rounded-md bg-blue-500 text-white disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {textButton}
    </button>
  );
};

export default SwitchButton;
