const Persons = ({ personToShow, onDelete }) => {
  return (
    <ul>
      {personToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
