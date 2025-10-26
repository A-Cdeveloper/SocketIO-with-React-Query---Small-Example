type InputErrorProps = {
  error?: string;
  id?: string;
};

const InputError = ({ error, id }: InputErrorProps) => {
  if (!error) return null;

  return (
    <p id={id} className="text-sm text-destructive">
      {error}
    </p>
  );
};

export default InputError;
