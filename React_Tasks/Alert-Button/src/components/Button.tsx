interface Props {
  children: string;
  onClick: () => void;
}
function Button({ children, onClick }: Props) {
  return (
    <div>
      <button className='btn btn-primary' onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
