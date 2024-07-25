const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  handleNumberChange,
  newNumber,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <h1>Add a new</h1>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
