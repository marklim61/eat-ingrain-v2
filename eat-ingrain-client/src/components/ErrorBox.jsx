const ErrorBox = ({ error }) => {
    return (
        <div className="mx-auto w-4/5 flex justify-center items-center h-[100px]">
            {error}
        </div>
    );
}

export default ErrorBox