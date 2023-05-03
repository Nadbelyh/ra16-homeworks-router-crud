function PostForm({
  handleSubmit,
  controlId,
  ariaLabel,
  placeholder,
  value,
  handleChange,
  buttonText,
}) {
  return (
    <div>
      <div id={controlId}>
        <textarea
          className="textarea"
          label={ariaLabel}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
        />
      </div>
      <button className="button" onClick={handleSubmit}>
        {buttonText}
      </button>
    </div>
  );
}

export default PostForm;
